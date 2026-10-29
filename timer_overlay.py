"""
Stand-Alone Borderless Transparent Timer Overlay for Windows
Educamp 2026 - Realtime Sync with Timer & Live Chat
Features: High-DPI Anti-Aliasing (Bahnschrift / Segoe UI), Live Chat Feed (Configurable 0-5 messages),
          Timer Only Mode (Hide Judul & Status & Chat), Always On Top toggle, Minimize to Taskbar,
          Minimize to System Tray, Custom Font Colors, Pure Transparent HUD mode, Resizable scale,
          and Persistent Settings (timer_overlay_config.json).
"""

import sys
import os
import json
import urllib.request
import urllib.error
import threading
import tkinter as tk
from tkinter import font as tkfont
from PIL import Image, ImageDraw
import pystray

# 1. Enable Per-Monitor High-DPI Awareness for Windows (Fix jagged fonts & enable ClearType Anti-Aliasing)
try:
    import ctypes
    try:
        ctypes.windll.shcore.SetProcessDpiAwareness(2)  # Per-monitor DPI aware v2
    except Exception:
        ctypes.windll.user32.SetProcessDPIAware()       # Fallback Windows Vista+
except Exception:
    pass

DEFAULT_LOCAL_URL = "http://localhost:3002/api/timer-chat/vmix"
DEFAULT_CLOUD_URL = "https://educamp.ai.studio/api/timer-chat/vmix"

class TransparentTimerOverlay:
    def __init__(self, root, server_url=None):
        self.root = root

        # Load Persistent Configuration
        self.config_data = self.load_config()

        self.server_url = server_url or self.config_data.get("server_url", DEFAULT_LOCAL_URL)
        self.cloud_fallback_url = DEFAULT_CLOUD_URL
        self.active_url = self.server_url
        self.fail_count = 0
        
        # Window & Display Modes (from config with graceful defaults)
        self.is_always_on_top = self.config_data.get("is_always_on_top", True)
        self.is_pure_mode = self.config_data.get("is_pure_mode", False)
        self.is_timer_only = self.config_data.get("is_timer_only", False)
        self.max_chat_count = max(0, min(5, self.config_data.get("max_chat_count", 2)))  # 0 to 5, 0 = disabled
        self.font_scale = float(self.config_data.get("font_scale", 1.0))
        self.timer_font_color = self.config_data.get("timer_font_color", "#ffffff")
        self.current_time_str = "05:00"
        self.current_status_str = "READY"
        self.current_event_name = "EDUCAMP 2026"
        self.tray_icon = None
        self.last_recent_chats = []

        # Font Selection
        saved_font = self.config_data.get("timer_font_family", "Bahnschrift")
        self.timer_font_family = saved_font
        try:
            available = set(tkfont.families())
            if saved_font not in available:
                if "Bahnschrift" in available:
                    self.timer_font_family = "Bahnschrift"
                elif "Segoe UI Variable Display" in available:
                    self.timer_font_family = "Segoe UI Variable Display"
                elif "Segoe UI" in available:
                    self.timer_font_family = "Segoe UI"
                else:
                    self.timer_font_family = "Arial"
        except Exception:
            self.timer_font_family = "Bahnschrift"

        # Window Configuration
        self.root.title("Educamp Timer Overlay")
        self.root.attributes("-topmost", self.is_always_on_top)
        self.root.overrideredirect(True)       # Borderless, no native titlebar
        
        # Set Transparent Key Color
        self.trans_color = "#010101"
        self.root.config(bg=self.trans_color)
        try:
            self.root.wm_attributes("-transparentcolor", self.trans_color)
        except Exception as e:
            print(f"[Warning] Transparent color not supported on this platform: {e}")

        # Position default on screen (top-right) - Compact height & width
        self.base_w = 360
        self.base_h = 136
        self.timer_only_w = 260
        self.timer_only_h = 82

        screen_w = self.root.winfo_screenwidth()
        saved_x = self.config_data.get("window_x")
        saved_y = self.config_data.get("window_y")
        if saved_x is not None and saved_y is not None and 0 <= saved_x < screen_w - 50:
            start_x = int(saved_x)
            start_y = max(10, int(saved_y))
        else:
            start_x = max(20, screen_w - self.base_w - 30)
            start_y = 30

        initial_w = int((self.timer_only_w if self.is_timer_only else self.base_w) * self.font_scale)
        initial_h = int((self.timer_only_h if self.is_timer_only else self.base_h) * self.font_scale)
        self.root.geometry(f"{initial_w}x{initial_h}+{start_x}+{start_y}")

        # Dragging State
        self.offset_x = 0
        self.offset_y = 0

        # UI Colors
        self.card_bg = "#0f172a"
        self.card_border = "#334155"

        # Outer Card Frame
        self.card_frame = tk.Frame(
            self.root, 
            bg=self.card_bg, 
            highlightbackground=self.card_border, 
            highlightthickness=1, 
            padx=10, 
            pady=4
        )
        self.card_frame.pack(fill=tk.BOTH, expand=True, padx=2, pady=2)

        # Header Row: Event Title (Left) + Window Control Toolbar (Right)
        self.header_frame = tk.Frame(self.card_frame, bg=self.card_bg)
        self.header_frame.pack(fill=tk.X, pady=(1, 0))

        self.lbl_event = tk.Label(
            self.header_frame,
            text=self.current_event_name,
            font=("Segoe UI", int(9 * self.font_scale), "bold"),
            fg="#38bdf8",
            bg=self.card_bg
        )
        self.lbl_event.pack(side=tk.LEFT, anchor="w")

        # Mini Action Buttons Toolbar (Chat-Toggle, Timer-Only, Pin, Minimize, Tray, Close)
        self.toolbar_frame = tk.Frame(self.header_frame, bg=self.card_bg)
        self.toolbar_frame.pack(side=tk.RIGHT, anchor="e")

        self.btn_chat = tk.Label(
            self.toolbar_frame,
            text=f"💬{self.max_chat_count}",
            font=("Segoe UI", int(8 * self.font_scale), "bold"),
            fg="#38bdf8" if self.max_chat_count > 0 else "#64748b",
            bg=self.card_bg,
            padx=3,
            cursor="hand2"
        )
        self.btn_chat.pack(side=tk.LEFT)
        self.btn_chat.bind("<Button-1>", lambda e: self.cycle_chat_count())

        self.btn_timer_only = tk.Label(
            self.toolbar_frame, 
            text="👁️", 
            font=("Segoe UI", int(8 * self.font_scale)), 
            fg="#94a3b8", 
            bg=self.card_bg, 
            padx=3, 
            cursor="hand2"
        )
        self.btn_timer_only.pack(side=tk.LEFT)
        self.btn_timer_only.bind("<Button-1>", lambda e: self.toggle_timer_only())

        self.btn_pin = tk.Label(
            self.toolbar_frame, 
            text="📌", 
            font=("Segoe UI", int(8 * self.font_scale)), 
            fg="#fbbf24" if self.is_always_on_top else "#64748b", 
            bg=self.card_bg, 
            padx=3, 
            cursor="hand2"
        )
        self.btn_pin.pack(side=tk.LEFT)
        self.btn_pin.bind("<Button-1>", lambda e: self.toggle_always_on_top())

        self.btn_min = tk.Label(
            self.toolbar_frame, 
            text="➖", 
            font=("Segoe UI", int(8 * self.font_scale)), 
            fg="#94a3b8", 
            bg=self.card_bg, 
            padx=3, 
            cursor="hand2"
        )
        self.btn_min.pack(side=tk.LEFT)
        self.btn_min.bind("<Button-1>", lambda e: self.minimize_to_taskbar())

        self.btn_tray = tk.Label(
            self.toolbar_frame, 
            text="📥", 
            font=("Segoe UI", int(8 * self.font_scale)), 
            fg="#94a3b8", 
            bg=self.card_bg, 
            padx=3, 
            cursor="hand2"
        )
        self.btn_tray.pack(side=tk.LEFT)
        self.btn_tray.bind("<Button-1>", lambda e: self.minimize_to_tray())

        self.btn_close = tk.Label(
            self.toolbar_frame, 
            text="✕", 
            font=("Segoe UI", int(8 * self.font_scale), "bold"), 
            fg="#ef4444", 
            bg=self.card_bg, 
            padx=4, 
            cursor="hand2"
        )
        self.btn_close.pack(side=tk.LEFT)
        self.btn_close.bind("<Button-1>", lambda e: self.exit_app())

        # Main Digits Label (Smooth Anti-Aliased Vector Font)
        timer_size = int(50 * self.font_scale)
        self.lbl_timer = tk.Label(
            self.card_frame,
            text=self.current_time_str,
            font=(self.timer_font_family, timer_size, "bold"),
            fg=self.timer_font_color,
            bg=self.card_bg
        )
        self.lbl_timer.pack(anchor="center", pady=(0, 0))

        # Status / Subtitle Label - Tepat mepet di bawah angka timer
        self.lbl_status = tk.Label(
            self.card_frame,
            text="0ms SYNC • GESER UNTUK PINDAH",
            font=("Segoe UI", int(8 * self.font_scale), "bold"),
            fg="#94a3b8",
            bg=self.card_bg
        )
        self.lbl_status.pack(anchor="center", pady=(0, 2))

        # --- LIVE CHAT CONTAINER (Below status label) ---
        self.chat_divider = tk.Frame(self.card_frame, bg="#334155", height=1)
        self.chat_frame = tk.Frame(self.card_frame, bg=self.card_bg)

        # Pre-allocate 5 chat row widgets to ensure zero-lag rendering
        self.chat_rows = []
        for i in range(5):
            row = tk.Frame(self.chat_frame, bg=self.card_bg)
            
            lbl_sender = tk.Label(
                row,
                text="",
                font=("Segoe UI", int(8 * self.font_scale), "bold"),
                fg="#38bdf8",
                bg=self.card_bg,
                anchor="w"
            )
            lbl_sender.pack(side=tk.LEFT, anchor="nw")
            
            lbl_msg = tk.Label(
                row,
                text="",
                font=("Segoe UI", int(8 * self.font_scale)),
                fg="#f1f5f9",
                bg=self.card_bg,
                anchor="w",
                justify="left"
            )
            lbl_msg.pack(side=tk.LEFT, fill=tk.X, expand=True, anchor="nw")
            
            self.chat_rows.append({
                "frame": row,
                "sender": lbl_sender,
                "msg": lbl_msg
            })

        # Setup Drag Handlers on components
        draggable_widgets = [self.root, self.card_frame, self.header_frame, self.lbl_event, self.lbl_timer, self.lbl_status, self.chat_divider, self.chat_frame]
        for row_dict in self.chat_rows:
            draggable_widgets.extend([row_dict["frame"], row_dict["sender"], row_dict["msg"]])

        for widget in draggable_widgets:
            widget.bind("<Button-1>", self.on_drag_start)
            widget.bind("<B1-Motion>", self.on_drag_motion)
            widget.bind("<ButtonRelease-1>", self.on_drag_release)
            widget.bind("<Button-3>", self.show_context_menu)
            widget.bind("<Double-Button-1>", lambda e: self.toggle_pure_mode())

        # Hotkeys
        self.root.bind("<Key-c>", lambda e: self.cycle_chat_count())
        self.root.bind("<Key-C>", lambda e: self.cycle_chat_count())
        self.root.bind("<Key-t>", lambda e: self.toggle_timer_only())
        self.root.bind("<Key-T>", lambda e: self.toggle_timer_only())
        self.root.bind("<Key-p>", lambda e: self.toggle_pure_mode())
        self.root.bind("<Key-P>", lambda e: self.toggle_pure_mode())
        self.root.bind("<Key-a>", lambda e: self.toggle_always_on_top())
        self.root.bind("<Key-A>", lambda e: self.toggle_always_on_top())

        # Bind window state changes
        self.root.bind("<Map>", self.on_window_mapped)

        # Context Menu (Right Click)
        self.init_context_menu()

        # Apply pure mode if saved
        if self.is_pure_mode:
            self.apply_pure_mode_ui()

        # Apply timer only mode if saved
        if self.is_timer_only:
            self.apply_timer_only_ui()

        # Blinking Alert State
        self.blink_state = False

        # Start Poll Loops: Timer (150ms) & Chat Dedicated (1000ms)
        self.poll_timer_data()
        self.poll_chat_data()

    def get_config_path(self):
        if getattr(sys, 'frozen', False):
            base_dir = os.path.dirname(sys.executable)
        else:
            base_dir = os.path.dirname(os.path.abspath(__file__))
        return os.path.join(base_dir, "timer_overlay_config.json")

    def load_config(self):
        config_path = self.get_config_path()
        try:
            if os.path.exists(config_path):
                with open(config_path, "r", encoding="utf-8") as f:
                    return json.load(f)
        except Exception as e:
            print(f"[Config] Error loading config: {e}")
        return {}

    def save_config(self):
        config_path = self.get_config_path()
        try:
            cur_x = self.root.winfo_x()
            cur_y = self.root.winfo_y()
            data = {
                "max_chat_count": self.max_chat_count,
                "is_always_on_top": self.is_always_on_top,
                "is_timer_only": self.is_timer_only,
                "is_pure_mode": self.is_pure_mode,
                "timer_font_family": self.timer_font_family,
                "timer_font_color": self.timer_font_color,
                "font_scale": self.font_scale,
                "window_x": cur_x,
                "window_y": cur_y,
                "server_url": self.active_url
            }
            with open(config_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            print(f"[Config] Error saving config: {e}")

    def init_context_menu(self):
        self.context_menu = tk.Menu(self.root, tearoff=0)
        
        # 1. Mode Tampilan
        self.context_menu.add_command(
            label="✓ Hanya Timer (Judul & Status Sembunyi)" if self.is_timer_only else "○ Tampilkan Lengkap (Judul & Status)",
            command=self.toggle_timer_only
        )
        self.context_menu.add_command(
            label="✓ Always On Top (Selalu di Depan)" if self.is_always_on_top else "○ Always On Top (Nonaktif / Normal Window)", 
            command=self.toggle_always_on_top
        )
        self.context_menu.add_command(label="🔲 Toggle Glass Card / Pure Transparent", command=self.toggle_pure_mode)

        self.context_menu.add_separator()

        # 2. Submenu Kuota Live Chat (0 - 5 pesan)
        self.chat_menu = tk.Menu(self.context_menu, tearoff=0)
        self.update_chat_menu_items()
        self.context_menu.add_cascade(label=f"💬 Kuota Chat di Bawah ({self.max_chat_count} Pesan)", menu=self.chat_menu)

        self.context_menu.add_separator()
        self.context_menu.add_command(label="➖ Minimize ke Taskbar", command=self.minimize_to_taskbar)
        self.context_menu.add_command(label="📥 Minimize ke System Tray", command=self.minimize_to_tray)

        self.context_menu.add_separator()

        # Submenu Gaya Font Anti-Alias
        self.font_menu = tk.Menu(self.context_menu, tearoff=0)
        self.font_menu.add_command(label="Bahnschrift (Vector Smooth Anti-Alias)", command=lambda: self.set_font_family("Bahnschrift"))
        self.font_menu.add_command(label="Segoe UI (Windows Fluent Clean)", command=lambda: self.set_font_family("Segoe UI"))
        self.font_menu.add_command(label="Consolas (Monospace Terminal)", command=lambda: self.set_font_family("Consolas"))
        self.font_menu.add_command(label="Arial Bold (High Contrast)", command=lambda: self.set_font_family("Arial"))
        self.context_menu.add_cascade(label="🔤 Gaya Font Timer (Anti-Alias)", menu=self.font_menu)

        # Submenu Warna Font Lengkap
        self.color_menu = tk.Menu(self.context_menu, tearoff=0)
        self.color_menu.add_command(label="⚪ Putih Bersih (#ffffff)", command=lambda: self.set_font_color("#ffffff"))
        self.color_menu.add_command(label="⚫ Hitam Pekat (#000000 - Slide Terang)", command=lambda: self.set_font_color("#000000"))
        self.color_menu.add_command(label="🟡 Kuning Amber (#fbbf24)", command=lambda: self.set_font_color("#fbbf24"))
        self.color_menu.add_command(label="🔷 Cyan Biru (#38bdf8)", command=lambda: self.set_font_color("#38bdf8"))
        self.color_menu.add_command(label="🟢 Hijau Neon (#22c55e)", command=lambda: self.set_font_color("#22c55e"))
        self.color_menu.add_command(label="🔴 Merah Elektrik (#ef4444)", command=lambda: self.set_font_color("#ef4444"))
        self.color_menu.add_command(label="🟣 Ungu Lavender (#c084fc)", command=lambda: self.set_font_color("#c084fc"))
        self.color_menu.add_command(label="🟠 Oranye Flame (#fb923c)", command=lambda: self.set_font_color("#fb923c"))
        self.context_menu.add_cascade(label="🎨 Ganti Warna Font Timer", menu=self.color_menu)

        self.context_menu.add_separator()
        self.context_menu.add_command(label="Server: Localhost (:3002)", command=lambda: self.switch_server(DEFAULT_LOCAL_URL))
        self.context_menu.add_command(label="Server: Cloud (educamp.ai.studio)", command=lambda: self.switch_server(DEFAULT_CLOUD_URL))
        self.context_menu.add_separator()
        self.context_menu.add_command(label="Font Ukuran: Kecil (0.8x)", command=lambda: self.set_scale(0.8))
        self.context_menu.add_command(label="Font Ukuran: Normal (1.0x)", command=lambda: self.set_scale(1.0))
        self.context_menu.add_command(label="Font Ukuran: Besar (1.25x)", command=lambda: self.set_scale(1.25))
        self.context_menu.add_command(label="Font Ukuran: Raksasa (1.5x)", command=lambda: self.set_scale(1.5))
        self.context_menu.add_separator()
        self.context_menu.add_command(label="✕ Tutup Overlay (Exit)", command=self.exit_app)

    def update_chat_menu_items(self):
        self.chat_menu.delete(0, tk.END)
        options = [
            (0, "✕ 0 - Sembunyikan Chat (Hanya Timer)"),
            (1, "1 Pesan Terakhir"),
            (2, "2 Pesan Terakhir"),
            (3, "3 Pesan Terakhir"),
            (4, "4 Pesan Terakhir"),
            (5, "5 Pesan Terakhir (Maksimal)")
        ]
        for count, label_text in options:
            prefix = "✓ " if self.max_chat_count == count else "○ "
            self.chat_menu.add_command(
                label=f"{prefix}{label_text}",
                command=lambda c=count: self.set_max_chat_count(c)
            )

    def refresh_context_menu_labels(self):
        try:
            timer_only_label = "✓ Hanya Timer (Judul & Status Sembunyi)" if self.is_timer_only else "○ Tampilkan Lengkap (Judul & Status)"
            top_label = "✓ Always On Top (Selalu di Depan)" if self.is_always_on_top else "○ Always On Top (Nonaktif / Normal Window)"
            self.context_menu.entryconfigure(0, label=timer_only_label)
            self.context_menu.entryconfigure(1, label=top_label)
            self.context_menu.entryconfigure(3, label=f"💬 Kuota Chat di Bawah ({self.max_chat_count} Pesan)")
            self.update_chat_menu_items()
        except Exception:
            pass

    def set_max_chat_count(self, count):
        self.max_chat_count = max(0, min(5, int(count)))
        self._last_rendered_chat_sig = None
        self.btn_chat.config(
            text=f"💬{self.max_chat_count}",
            fg="#38bdf8" if self.max_chat_count > 0 else "#64748b"
        )
        self.refresh_context_menu_labels()
        self.save_config()
        self.update_chat_display(self.last_recent_chats)

    def cycle_chat_count(self):
        # 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0
        next_count = (self.max_chat_count + 1) % 6
        self.set_max_chat_count(next_count)
        desc = "OFF (0 PESAN)" if next_count == 0 else f"MAKS {next_count} PESAN"
        self.lbl_status.config(text=f"● LIVE CHAT: {desc}", fg="#38bdf8")

    def toggle_timer_only(self):
        self.is_timer_only = not self.is_timer_only
        if self.is_timer_only:
            self.apply_timer_only_ui()
        else:
            self.restore_full_ui()
        self.refresh_context_menu_labels()
        self.save_config()

    def apply_timer_only_ui(self):
        self._last_rendered_chat_sig = None
        self.header_frame.pack_forget()
        self.lbl_status.pack_forget()
        self.chat_divider.pack_forget()
        self.chat_frame.pack_forget()
        self.card_frame.config(padx=6, pady=2)
        self.adjust_window_size(0)

    def restore_full_ui(self):
        self._last_rendered_chat_sig = None
        self.header_frame.pack(fill=tk.X, pady=(1, 0), before=self.lbl_timer)
        self.lbl_status.pack(anchor="center", pady=(0, 2), after=self.lbl_timer)
        self.card_frame.config(padx=10, pady=4)
        self.update_chat_display(self.last_recent_chats)

    def set_font_family(self, family_name):
        self.timer_font_family = family_name
        timer_size = int(50 * self.font_scale)
        self.lbl_timer.config(font=(self.timer_font_family, timer_size, "bold"))
        self.save_config()

    def toggle_always_on_top(self):
        self.is_always_on_top = not self.is_always_on_top
        self.root.attributes("-topmost", self.is_always_on_top)
        self.btn_pin.config(fg="#fbbf24" if self.is_always_on_top else "#64748b")
        self.refresh_context_menu_labels()
        self.save_config()

    def minimize_to_taskbar(self):
        self.root.overrideredirect(False)
        self.root.iconify()

    def on_window_mapped(self, event):
        if event.widget == self.root and not self.is_minimized_to_tray:
            if self.root.state() == "normal":
                self.root.overrideredirect(True)
                self.root.attributes("-topmost", self.is_always_on_top)

    def create_tray_image(self):
        img = Image.new('RGBA', (64, 64), color=(0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        d.ellipse((6, 6, 58, 58), fill='#0f172a', outline='#38bdf8', width=4)
        d.rectangle((27, 1, 37, 7), fill='#38bdf8')
        d.line((32, 32, 32, 18), fill='#38bdf8', width=3)
        d.line((32, 32, 44, 32), fill='#fbbf24', width=3)
        return img

    def minimize_to_tray(self):
        self.is_minimized_to_tray = True
        self.root.withdraw()
        
        def on_tray_restore(icon=None, item=None):
            self.root.after(0, self.restore_from_tray)

        def on_tray_exit(icon=None, item=None):
            self.root.after(0, self.exit_app)

        def on_tray_toggle_topmost(icon=None, item=None):
            self.root.after(0, self.toggle_always_on_top)

        def on_tray_toggle_timer_only(icon=None, item=None):
            self.root.after(0, self.toggle_timer_only)

        def on_tray_cycle_chat(icon=None, item=None):
            self.root.after(0, self.cycle_chat_count)

        menu = pystray.Menu(
            pystray.MenuItem(f"⏱️ {self.current_time_str} - Buka Overlay", on_tray_restore, default=True),
            pystray.MenuItem(f"💬 Kuota Chat: {self.max_chat_count} Pesan", on_tray_cycle_chat),
            pystray.MenuItem("👁️ Toggle Hanya Timer", on_tray_toggle_timer_only),
            pystray.MenuItem("📌 Toggle Always On Top", on_tray_toggle_topmost),
            pystray.Menu.SEPARATOR,
            pystray.MenuItem("✕ Keluar", on_tray_exit)
        )

        tooltip = f"Timer Overlay: {self.current_time_str} ({self.current_status_str})"
        self.tray_icon = pystray.Icon("EducampTimer", self.create_tray_image(), tooltip, menu)
        threading.Thread(target=self.tray_icon.run, daemon=True).start()

    def restore_from_tray(self):
        self.is_minimized_to_tray = False
        if self.tray_icon:
            try:
                self.tray_icon.stop()
            except Exception:
                pass
            self.tray_icon = None

        self.root.deiconify()
        self.root.overrideredirect(True)
        self.root.attributes("-topmost", self.is_always_on_top)
        self.root.lift()

    def exit_app(self):
        self.save_config()
        if self.tray_icon:
            try:
                self.tray_icon.stop()
            except Exception:
                pass
        self.root.quit()

    def switch_server(self, target_url):
        self.active_url = target_url
        self.fail_count = 0
        self.lbl_status.config(text=f"MENGHUBUNGKAN: {target_url}...", fg="#38bdf8")
        self.save_config()

    def on_drag_start(self, event):
        self.offset_x = event.x_root - self.root.winfo_x()
        self.offset_y = event.y_root - self.root.winfo_y()

    def on_drag_motion(self, event):
        x = event.x_root - self.offset_x
        y = event.y_root - self.offset_y
        self.root.geometry(f"+{x}+{y}")

    def on_drag_release(self, event):
        self.save_config()

    def show_context_menu(self, event):
        try:
            self.refresh_context_menu_labels()
            self.context_menu.tk_popup(event.x_root, event.y_root)
        finally:
            self.context_menu.grab_release()

    def toggle_pure_mode(self):
        self.is_pure_mode = not self.is_pure_mode
        self.apply_pure_mode_ui()
        self.save_config()

    def apply_pure_mode_ui(self):
        self._last_rendered_chat_sig = None
        bg_col = self.trans_color if self.is_pure_mode else self.card_bg
        if self.is_pure_mode:
            self.card_frame.config(bg=self.trans_color, highlightthickness=0)
            self.chat_divider.config(bg=self.trans_color)
        else:
            self.card_frame.config(bg=self.card_bg, highlightthickness=1, highlightbackground=self.card_border)
            self.chat_divider.config(bg="#334155")

        self.header_frame.config(bg=bg_col)
        self.toolbar_frame.config(bg=bg_col)
        self.lbl_event.config(bg=bg_col)
        self.btn_chat.config(bg=bg_col)
        self.btn_timer_only.config(bg=bg_col)
        self.btn_pin.config(bg=bg_col)
        self.btn_min.config(bg=bg_col)
        self.btn_tray.config(bg=bg_col)
        self.btn_close.config(bg=bg_col)
        self.lbl_timer.config(bg=bg_col)
        self.lbl_status.config(bg=bg_col)
        self.chat_frame.config(bg=bg_col)

        for row in self.chat_rows:
            row["frame"].config(bg=bg_col)
            row["sender"].config(bg=bg_col)
            row["msg"].config(bg=bg_col)

        if self.is_pure_mode and self.timer_font_color == "#000000":
            self.lbl_status.config(fg="#334155")
        elif not self.is_pure_mode:
            self.lbl_status.config(fg="#94a3b8")

    def set_scale(self, scale):
        self.font_scale = scale
        event_size = max(7, int(9 * scale))
        timer_size = max(24, int(50 * scale))
        status_size = max(6, int(8 * scale))
        btn_size = max(6, int(8 * scale))
        chat_size = max(7, int(8 * scale))
        
        self.lbl_event.config(font=("Segoe UI", event_size, "bold"))
        self.btn_chat.config(font=("Segoe UI", btn_size, "bold"))
        self.btn_timer_only.config(font=("Segoe UI", btn_size))
        self.btn_pin.config(font=("Segoe UI", btn_size))
        self.btn_min.config(font=("Segoe UI", btn_size))
        self.btn_tray.config(font=("Segoe UI", btn_size))
        self.btn_close.config(font=("Segoe UI", btn_size, "bold"))
        self.lbl_timer.config(font=(self.timer_font_family, timer_size, "bold"))
        self.lbl_status.config(font=("Segoe UI", status_size, "bold"))

        for row in self.chat_rows:
            row["sender"].config(font=("Segoe UI", chat_size, "bold"))
            row["msg"].config(font=("Segoe UI", chat_size))

        self.save_config()
        self.update_chat_display(self.last_recent_chats)

    def set_font_color(self, color):
        self.timer_font_color = color
        self.lbl_timer.config(fg=color)
        if self.is_pure_mode and color == "#000000":
            self.lbl_status.config(fg="#334155")
        elif not self.is_pure_mode:
            self.lbl_status.config(fg="#94a3b8")
        self.save_config()

    def adjust_window_size(self, chat_count):
        cur_x = self.root.winfo_x()
        cur_y = self.root.winfo_y()
        scale = self.font_scale

        if self.is_timer_only:
            w = int(self.timer_only_w * scale)
            h = int(self.timer_only_h * scale)
        else:
            w = int(self.base_w * scale)
            if chat_count > 0:
                h = int((self.base_h + (chat_count * 20) + 8) * scale)
            else:
                h = int(self.base_h * scale)

        cur_w = self.root.winfo_width()
        cur_h = self.root.winfo_height()
        if abs(cur_w - w) > 2 or abs(cur_h - h) > 2:
            self.root.geometry(f"{w}x{h}+{cur_x}+{cur_y}")

    def update_chat_display(self, recent_chats):
        self.last_recent_chats = recent_chats or []

        if self.is_timer_only or self.max_chat_count == 0:
            if self.chat_divider.winfo_ismapped():
                self.chat_divider.pack_forget()
            if self.chat_frame.winfo_ismapped():
                self.chat_frame.pack_forget()
            for r in self.chat_rows:
                if r["frame"].winfo_ismapped():
                    r["frame"].pack_forget()
            self.adjust_window_size(0)
            self._last_rendered_chat_sig = None
            return

        display_chats = []
        if isinstance(recent_chats, list) and len(recent_chats) > 0:
            display_chats = recent_chats[-self.max_chat_count:]

        # Memoization Signature: Cegah render ulang identik yang memicu layar berkedip (Zero Flicker)
        sig = (
            self.max_chat_count,
            self.is_pure_mode,
            len(display_chats),
            tuple((c.get("sender", ""), c.get("text", ""), c.get("role", "")) for c in display_chats)
        )
        if getattr(self, "_last_rendered_chat_sig", None) == sig:
            return
        self._last_rendered_chat_sig = sig

        if len(display_chats) == 0:
            # Jika user mengaktifkan chat (> 0) tapi belum ada pesan di server, tampilkan placeholder
            if not self.is_pure_mode:
                self.chat_divider.config(bg="#334155")
            else:
                self.chat_divider.config(bg=self.trans_color)
            if not self.chat_divider.winfo_ismapped():
                self.chat_divider.pack(fill=tk.X, pady=(3, 3), after=self.lbl_status)
            if not self.chat_frame.winfo_ismapped():
                self.chat_frame.pack(fill=tk.X, expand=True, after=self.chat_divider)
            row_data = self.chat_rows[0]
            row_data["sender"].config(text="💬 Live Chat:", fg="#64748b")
            row_data["msg"].config(text=" Menunggu pesan masuk...", fg="#64748b")
            if not row_data["frame"].winfo_ismapped():
                row_data["frame"].pack(fill=tk.X, pady=(1, 1))
            for idx in range(1, 5):
                if self.chat_rows[idx]["frame"].winfo_ismapped():
                    self.chat_rows[idx]["frame"].pack_forget()
            self.adjust_window_size(1)
            return

        # Show divider & container only if needed
        if not self.is_pure_mode:
            self.chat_divider.config(bg="#334155")
        else:
            self.chat_divider.config(bg=self.trans_color)

        if not self.chat_divider.winfo_ismapped():
            self.chat_divider.pack(fill=tk.X, pady=(3, 3), after=self.lbl_status)
        if not self.chat_frame.winfo_ismapped():
            self.chat_frame.pack(fill=tk.X, expand=True, after=self.chat_divider)

        # Update chat rows smoothly without geometry jump
        msg_fg = "#ffffff" if not self.is_pure_mode else "#f1f5f9"
        for idx in range(5):
            row_data = self.chat_rows[idx]
            if idx < len(display_chats):
                chat = display_chats[idx]
                sender = (chat.get("sender", "") or "Peserta").strip()
                text = (chat.get("text", "") or "").strip()
                role = (chat.get("role", "") or "").upper()

                if sender.lower() == "sistem" or role == "SYSTEM":
                    prefix = "⚙️ "
                    fg_sender = "#94a3b8"
                elif role == "ADMIN" or "panitia" in sender.lower() or "nandur" in sender.lower():
                    prefix = "💬 "
                    fg_sender = "#fbbf24"
                else:
                    prefix = "💬 "
                    fg_sender = "#38bdf8"

                # Truncate sender and message for crisp fitting
                max_name_len = 16
                clean_sender = sender if len(sender) <= max_name_len else sender[:max_name_len] + "…"
                max_text_len = 46
                clean_text = text if len(text) <= max_text_len else text[:max_text_len] + "…"

                row_data["sender"].config(text=f"{prefix}{clean_sender}:", fg=fg_sender)
                row_data["msg"].config(text=f" {clean_text}", fg=msg_fg)
                if not row_data["frame"].winfo_ismapped():
                    row_data["frame"].pack(fill=tk.X, pady=(1, 1))
            else:
                if row_data["frame"].winfo_ismapped():
                    row_data["frame"].pack_forget()

        self.adjust_window_size(len(display_chats))

    def poll_timer_data(self):
        try:
            req = urllib.request.Request(self.active_url, headers={"User-Agent": "EducampTimerOverlay/1.0"})
            with urllib.request.urlopen(req, timeout=0.8) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                self.update_display(data)
                self.fail_count = 0
        except Exception:
            self.fail_count += 1
            if self.fail_count >= 5 and self.active_url == DEFAULT_LOCAL_URL:
                self.active_url = self.cloud_fallback_url
            self.lbl_status.config(text="MENUNGGU KONEKSI SERVER...", fg="#f59e0b")
        
        # Schedule next poll in 150ms
        self.root.after(150, self.poll_timer_data)


    def poll_chat_data(self):
        if self.max_chat_count > 0 and not self.is_timer_only:
            def _fetch():
                try:
                    chat_url = self.active_url.replace('/vmix', '/chat')
                    req = urllib.request.Request(chat_url, headers={"User-Agent": "EducampTimerOverlay/1.0"})
                    with urllib.request.urlopen(req, timeout=1.2) as resp:
                        raw = json.loads(resp.read().decode("utf-8"))
                        chats = raw if isinstance(raw, list) else raw.get("chatHistory", [])
                        if isinstance(chats, list) and len(chats) > 0:
                            self.has_received_any_chats = True
                            self.root.after(0, lambda: self.update_chat_display(chats))
                except Exception:
                    pass

            threading.Thread(target=_fetch, daemon=True).start()

        # Polling chat berkala setiap 800ms
        self.root.after(800, self.poll_chat_data)

    def update_display(self, data):
        event_name = data.get("eventName", "EDUCAMP 2026")
        time_str = data.get("time", "05:00")
        is_running = data.get("isRunning", False)
        is_blinking = data.get("isBlinking", False)
        remaining_sec = data.get("remainingSeconds", 300)
        status_val = data.get("status", "")
        recent_chats = data.get("recentChats", [])

        self.current_event_name = event_name
        self.current_time_str = time_str
        self.lbl_event.config(text=event_name.upper())
        self.lbl_timer.config(text=time_str)

        if is_blinking or status_val == "OVERTIME" or time_str.startswith("+"):
            self.current_status_str = "OVERTIME"
            self.blink_state = not self.blink_state
            if self.blink_state:
                self.lbl_timer.config(fg="#ef4444")
            else:
                self.lbl_timer.config(fg="#fee2e2")
            if status_val == "OVERTIME" or time_str.startswith("+"):
                self.lbl_status.config(text="⏱️ MELEBIHI BATAS WAKTU (OVERTIME)", fg="#ef4444")
            else:
                self.lbl_status.config(text="⚠️ PERINGATAN WAKTU HAMPIR HABIS", fg="#ef4444")
        elif is_running:
            self.current_status_str = "RUNNING"
            self.lbl_timer.config(fg=self.timer_font_color)
            self.lbl_status.config(text="● RUNNING • LIVE SYNC", fg="#38bdf8")
        elif remaining_sec <= 0:
            self.current_status_str = "TIMEOUT"
            self.lbl_timer.config(fg="#ef4444")
            self.lbl_status.config(text="WAKTU HABIS (TIME OUT)", fg="#ef4444")
        elif status_val == "PAUSED":
            self.current_status_str = "PAUSED"
            self.lbl_timer.config(fg="#f59e0b")
            self.lbl_status.config(text="⏸️ PAUSED", fg="#f59e0b")
        else:
            self.current_status_str = "READY"
            self.lbl_timer.config(fg=self.timer_font_color)
            self.lbl_status.config(text="READY • GESER UNTUK PINDAH", fg="#94a3b8")

        # Update chat display:
        # Prioritaskan recentChats utuh jika disediakan backend.
        # Jangan biarkan latestChat (1 pesan) mendegradasi multi-pesan yang sudah didapat dari poll_chat_data.
        if recent_chats and len(recent_chats) >= len(self.last_recent_chats):
            self.update_chat_display(recent_chats)
        elif not hasattr(self, 'has_received_any_chats') and not self.last_recent_chats:
            latest = data.get("latestChat")
            if latest and isinstance(latest, dict) and latest.get("text"):
                self.update_chat_display([latest])

        # Update tray title if minimized
        if self.tray_icon and self.is_minimized_to_tray:
            try:
                self.tray_icon.title = f"Timer: {self.current_time_str} ({self.current_status_str})"
            except Exception:
                pass

def main():
    server_target = None
    if len(sys.argv) > 1:
        server_target = sys.argv[1]

    root = tk.Tk()
    app = TransparentTimerOverlay(root, server_url=server_target)
    root.mainloop()

if __name__ == "__main__":
    main()

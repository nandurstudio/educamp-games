"""
Stand-Alone Borderless Transparent Timer Overlay for Windows
Educamp 2026 - Realtime Sync with Timer & Live Chat
Features: High-DPI Anti-Aliasing (Bahnschrift / Segoe UI), Timer Only Mode (Hide Judul & Status),
          Always On Top toggle, Minimize to Taskbar, Minimize to System Tray,
          Custom Font Colors, Pure Transparent HUD mode, Resizable scale.
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
        self.server_url = server_url or DEFAULT_LOCAL_URL
        self.cloud_fallback_url = DEFAULT_CLOUD_URL
        self.active_url = self.server_url
        self.fail_count = 0
        
        # Window & Display Modes
        self.is_always_on_top = True  # Always On Top (dapat dinonaktifkan)
        self.is_pure_mode = False     # Text-only HUD transparent mode
        self.is_timer_only = False    # Mode Hanya Timer (Hide Judul & Status)
        self.is_minimized_to_tray = False
        self.font_scale = 1.0
        self.timer_font_color = "#ffffff"
        self.current_time_str = "05:00"
        self.current_status_str = "READY"
        self.current_event_name = "EDUCAMP 2026"
        self.tray_icon = None

        # Choose best modern anti-aliased font available on Windows
        self.timer_font_family = "Bahnschrift"
        try:
            available = set(tkfont.families())
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
        start_x = max(20, screen_w - self.base_w - 30)
        start_y = 30
        self.root.geometry(f"{self.base_w}x{self.base_h}+{start_x}+{start_y}")

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
            font=("Segoe UI", 9, "bold"),
            fg="#38bdf8",
            bg=self.card_bg
        )
        self.lbl_event.pack(side=tk.LEFT, anchor="w")

        # Mini Action Buttons Toolbar (Timer-Only, Pin, Minimize, Tray, Close)
        self.toolbar_frame = tk.Frame(self.header_frame, bg=self.card_bg)
        self.toolbar_frame.pack(side=tk.RIGHT, anchor="e")

        self.btn_timer_only = tk.Label(
            self.toolbar_frame, 
            text="👁️", 
            font=("Segoe UI", 8), 
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
            font=("Segoe UI", 8), 
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
            font=("Segoe UI", 8), 
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
            font=("Segoe UI", 8), 
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
            font=("Segoe UI", 8, "bold"), 
            fg="#ef4444", 
            bg=self.card_bg, 
            padx=4, 
            cursor="hand2"
        )
        self.btn_close.pack(side=tk.LEFT)
        self.btn_close.bind("<Button-1>", lambda e: self.exit_app())

        # Main Digits Label (Smooth Anti-Aliased Vector Font)
        self.lbl_timer = tk.Label(
            self.card_frame,
            text=self.current_time_str,
            font=(self.timer_font_family, 50, "bold"),
            fg=self.timer_font_color,
            bg=self.card_bg
        )
        self.lbl_timer.pack(anchor="center", pady=(0, 0))

        # Status / Subtitle Label - Tepat mepet di bawah angka timer
        self.lbl_status = tk.Label(
            self.card_frame,
            text="0ms SYNC • GESER UNTUK PINDAH",
            font=("Segoe UI", 8, "bold"),
            fg="#94a3b8",
            bg=self.card_bg
        )
        self.lbl_status.pack(anchor="center", pady=(0, 2))

        # Setup Drag Handlers on non-button components
        draggable_widgets = (self.root, self.card_frame, self.header_frame, self.lbl_event, self.lbl_timer, self.lbl_status)
        for widget in draggable_widgets:
            widget.bind("<Button-1>", self.on_drag_start)
            widget.bind("<B1-Motion>", self.on_drag_motion)
            widget.bind("<Button-3>", self.show_context_menu)
            widget.bind("<Double-Button-1>", lambda e: self.toggle_pure_mode())

        # Hotkeys: T = Toggle Timer Only, P = Toggle Pure Transparent, A = Toggle Always On Top
        self.root.bind("<Key-t>", lambda e: self.toggle_timer_only())
        self.root.bind("<Key-T>", lambda e: self.toggle_timer_only())
        self.root.bind("<Key-p>", lambda e: self.toggle_pure_mode())
        self.root.bind("<Key-P>", lambda e: self.toggle_pure_mode())
        self.root.bind("<Key-a>", lambda e: self.toggle_always_on_top())
        self.root.bind("<Key-A>", lambda e: self.toggle_always_on_top())

        # Bind window state changes (e.g. un-minimize from taskbar)
        self.root.bind("<Map>", self.on_window_mapped)

        # Context Menu (Right Click)
        self.init_context_menu()

        # Blinking Alert State
        self.blink_state = False

        # Start Poll Loop (150ms interval for smooth realtime display)
        self.poll_timer_data()

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

    def refresh_context_menu_labels(self):
        try:
            timer_only_label = "✓ Hanya Timer (Judul & Status Sembunyi)" if self.is_timer_only else "○ Tampilkan Lengkap (Judul & Status)"
            top_label = "✓ Always On Top (Selalu di Depan)" if self.is_always_on_top else "○ Always On Top (Nonaktif / Normal Window)"
            self.context_menu.entryconfigure(0, label=timer_only_label)
            self.context_menu.entryconfigure(1, label=top_label)
        except Exception:
            pass

    def toggle_timer_only(self):
        self.is_timer_only = not self.is_timer_only
        cur_x = self.root.winfo_x()
        cur_y = self.root.winfo_y()

        if self.is_timer_only:
            # Sembunyikan Header dan Status, tampilkan hanya angka timer raksasa
            self.header_frame.pack_forget()
            self.lbl_status.pack_forget()
            w = int(self.timer_only_w * self.font_scale)
            h = int(self.timer_only_h * self.font_scale)
            self.card_frame.config(padx=6, pady=2)
            self.root.geometry(f"{w}x{h}+{cur_x}+{cur_y}")
        else:
            # Tampilkan kembali layout lengkap
            self.header_frame.pack(fill=tk.X, pady=(1, 0), before=self.lbl_timer)
            self.lbl_status.pack(anchor="center", pady=(0, 2), after=self.lbl_timer)
            w = int(self.base_w * self.font_scale)
            h = int(self.base_h * self.font_scale)
            self.card_frame.config(padx=10, pady=4)
            self.root.geometry(f"{w}x{h}+{cur_x}+{cur_y}")

        self.refresh_context_menu_labels()

    def set_font_family(self, family_name):
        self.timer_font_family = family_name
        timer_size = int(50 * self.font_scale)
        self.lbl_timer.config(font=(self.timer_font_family, timer_size, "bold"))

    def toggle_always_on_top(self):
        self.is_always_on_top = not self.is_always_on_top
        self.root.attributes("-topmost", self.is_always_on_top)
        self.btn_pin.config(fg="#fbbf24" if self.is_always_on_top else "#64748b")
        self.refresh_context_menu_labels()

    def minimize_to_taskbar(self):
        # Pada window borderless Windows, un-set overrideredirect sebelum iconify
        self.root.overrideredirect(False)
        self.root.iconify()

    def on_window_mapped(self, event):
        # Saat di-unminimize dari taskbar, kembalikan borderless & status topmost
        if event.widget == self.root and not self.is_minimized_to_tray:
            if self.root.state() == "normal":
                self.root.overrideredirect(True)
                self.root.attributes("-topmost", self.is_always_on_top)

    def create_tray_image(self):
        # Prosedural stopwatch tray icon (64x64)
        img = Image.new('RGBA', (64, 64), color=(0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        # Ring badan timer
        d.ellipse((6, 6, 58, 58), fill='#0f172a', outline='#38bdf8', width=4)
        # Tombol crown atas
        d.rectangle((27, 1, 37, 7), fill='#38bdf8')
        # Jarum jam
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

        menu = pystray.Menu(
            pystray.MenuItem(f"⏱️ {self.current_time_str} - Buka Overlay", on_tray_restore, default=True),
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

    def on_drag_start(self, event):
        self.offset_x = event.x_root - self.root.winfo_x()
        self.offset_y = event.y_root - self.root.winfo_y()

    def on_drag_motion(self, event):
        x = event.x_root - self.offset_x
        y = event.y_root - self.offset_y
        self.root.geometry(f"+{x}+{y}")

    def show_context_menu(self, event):
        try:
            self.refresh_context_menu_labels()
            self.context_menu.tk_popup(event.x_root, event.y_root)
        finally:
            self.context_menu.grab_release()

    def toggle_pure_mode(self):
        self.is_pure_mode = not self.is_pure_mode
        if self.is_pure_mode:
            # Full invisible background (text-only HUD)
            self.card_frame.config(bg=self.trans_color, highlightthickness=0)
            self.header_frame.config(bg=self.trans_color)
            self.toolbar_frame.config(bg=self.trans_color)
            self.lbl_event.config(bg=self.trans_color)
            self.btn_timer_only.config(bg=self.trans_color)
            self.btn_pin.config(bg=self.trans_color)
            self.btn_min.config(bg=self.trans_color)
            self.btn_tray.config(bg=self.trans_color)
            self.btn_close.config(bg=self.trans_color)
            self.lbl_timer.config(bg=self.trans_color)
            self.lbl_status.config(bg=self.trans_color)
            if self.timer_font_color == "#000000":
                self.lbl_status.config(fg="#334155")
        else:
            # Elegant dark pill backing
            self.card_frame.config(bg=self.card_bg, highlightthickness=1, highlightbackground=self.card_border)
            self.header_frame.config(bg=self.card_bg)
            self.toolbar_frame.config(bg=self.card_bg)
            self.lbl_event.config(bg=self.card_bg)
            self.btn_timer_only.config(bg=self.card_bg)
            self.btn_pin.config(bg=self.card_bg)
            self.btn_min.config(bg=self.card_bg)
            self.btn_tray.config(bg=self.card_bg)
            self.btn_close.config(bg=self.card_bg)
            self.lbl_timer.config(bg=self.card_bg)
            self.lbl_status.config(bg=self.card_bg)
            self.lbl_status.config(fg="#94a3b8")

    def set_scale(self, scale):
        self.font_scale = scale
        event_size = int(9 * scale)
        timer_size = int(50 * scale)
        status_size = int(8 * scale)
        btn_size = int(8 * scale)
        
        self.lbl_event.config(font=("Segoe UI", event_size, "bold"))
        self.btn_timer_only.config(font=("Segoe UI", btn_size))
        self.btn_pin.config(font=("Segoe UI", btn_size))
        self.btn_min.config(font=("Segoe UI", btn_size))
        self.btn_tray.config(font=("Segoe UI", btn_size))
        self.btn_close.config(font=("Segoe UI", btn_size, "bold"))
        self.lbl_timer.config(font=(self.timer_font_family, timer_size, "bold"))
        self.lbl_status.config(font=("Segoe UI", status_size, "bold"))

        cur_x = self.root.winfo_x()
        cur_y = self.root.winfo_y()
        if self.is_timer_only:
            w = int(self.timer_only_w * scale)
            h = int(self.timer_only_h * scale)
        else:
            w = int(self.base_w * scale)
            h = int(self.base_h * scale)
        self.root.geometry(f"{w}x{h}+{cur_x}+{cur_y}")

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
                # Otomatis fallback ke cloud jika localhost tidak aktif
                self.active_url = self.cloud_fallback_url
            self.lbl_status.config(text="MENUNGGU KONEKSI SERVER...", fg="#f59e0b")
        
        # Schedule next poll in 150ms
        self.root.after(150, self.poll_timer_data)

    def set_font_color(self, color):
        self.timer_font_color = color
        self.lbl_timer.config(fg=color)
        if self.is_pure_mode and color == "#000000":
            self.lbl_status.config(fg="#334155")
        elif not self.is_pure_mode:
            self.lbl_status.config(fg="#94a3b8")

    def update_display(self, data):
        event_name = data.get("eventName", "EDUCAMP 2026")
        time_str = data.get("time", "05:00")
        is_running = data.get("isRunning", False)
        is_blinking = data.get("isBlinking", False)
        remaining_sec = data.get("remainingSeconds", 300)
        status_val = data.get("status", "")

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

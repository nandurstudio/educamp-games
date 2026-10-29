"""
Stand-Alone Borderless Transparent Timer & Chat Overlay for Windows
Educamp 2026 - Realtime Sync with Timer & Live Chat
Features: 
  - Horizontal Side-by-Side Ultra-Compact Layout (Timer Mepet di Kiri, Live Chat di Kanan)
  - Dedicated View Modes: Keduanya (Both), Hanya Timer (Timer Only), Hanya Chat (Chat Only)
  - Pure Native Word-Wrap & Auto-Scroll to Bottom (No Cutoffs, No Overlapping, Auto-Scroll)
  - 15-Second Smooth Visual Pulse / Blinking Alert for New Incoming Messages
  - Theme Synchronization (Chat inherits Timer Font Family, Anti-Aliasing & Accent Color)
  - OBS Studio Window Capture Compatibility (Win32 WS_EX_APPWINDOW & WGC Native Capture)
  - OBS Chroma Key Green Screen Mode (for vMix / traditional keying)
  - OBS Virtual Camera Integration Guide (for Zoom, Google Meet, Teams, vMix)
  - High-DPI Anti-Aliasing (Bahnschrift / Segoe UI ClearType)
  - Configurable Live Chat Feed (0 to 5 messages)
  - Always On Top toggle, Minimize to Taskbar, Minimize to System Tray
  - Resizable scale (0.8x to 1.5x) and Persistent Settings (timer_overlay_config.json)
"""

import sys
import os
import json
import time
import urllib.request
import urllib.error
import threading
import tkinter as tk
from tkinter import font as tkfont
from tkinter import messagebox
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
        
        # View Modes: "both" (default), "timer_only", "chat_only"
        legacy_timer_only = self.config_data.get("is_timer_only", False)
        default_mode = "timer_only" if legacy_timer_only else "both"
        self.view_mode = self.config_data.get("view_mode", default_mode)
        if self.view_mode not in ["both", "timer_only", "chat_only"]:
            self.view_mode = "both"

        self.is_always_on_top = self.config_data.get("is_always_on_top", True)
        self.is_pure_mode = self.config_data.get("is_pure_mode", False)
        self.is_chroma_green = self.config_data.get("is_chroma_green", False)
        self.chat_follow_timer_theme = self.config_data.get("chat_follow_timer_theme", True)
        self.max_chat_count = max(0, min(5, self.config_data.get("max_chat_count", 3)))  # 0 to 5, 0 = disabled
        self.font_scale = float(self.config_data.get("font_scale", 1.0))
        self.timer_font_color = self.config_data.get("timer_font_color", "#ffffff")
        
        self.current_time_str = "05:00"
        self.current_status_str = "READY"
        self.current_event_name = "EDUCAMP 2026"
        self.tray_icon = None
        self.is_minimized_to_tray = False
        self.last_recent_chats = []

        # 15-Second New Chat Alert State
        self.new_chat_alert_until = 0.0
        self.newest_chat_sig = None
        self.chat_blink_state = False
        self.has_initialized_chat = False

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

        # Window Configuration & Title
        self.window_title = "Educamp Timer & Chat Overlay"
        self.root.title(self.window_title)
        self.root.attributes("-topmost", self.is_always_on_top)
        self.root.overrideredirect(True)       # Borderless
        
        # Transparent Key Colors
        self.trans_color = "#010101"
        self.chroma_color = "#00ff00"
        active_bg = self.chroma_color if self.is_chroma_green else self.trans_color
        self.root.config(bg=active_bg)
        try:
            if not self.is_chroma_green:
                self.root.wm_attributes("-transparentcolor", self.trans_color)
        except Exception as e:
            print(f"[Warning] Transparent color not supported on this platform: {e}")

        # Dimension Specs (Ultra-Compact Side-by-Side)
        self.timer_pane_w = 150
        self.chat_pane_w = 340
        self.base_h = 118
        self.timer_only_w = 176
        self.timer_only_h = 76
        self.chat_only_w = 360
        self.chat_only_h = 120

        screen_w = self.root.winfo_screenwidth()
        saved_x = self.config_data.get("window_x")
        saved_y = self.config_data.get("window_y")
        
        calc_w, calc_h = self.calculate_target_geometry()
        if saved_x is not None and saved_y is not None and 0 <= saved_x < screen_w - 50:
            start_x = int(saved_x)
            start_y = max(10, int(saved_y))
        else:
            start_x = max(20, screen_w - calc_w - 30)
            start_y = 30

        self.root.geometry(f"{calc_w}x{calc_h}+{start_x}+{start_y}")

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
            padx=6, 
            pady=3
        )
        self.card_frame.pack(fill=tk.BOTH, expand=True, padx=2, pady=2)

        # Header Row: Event Title (Left) + View Mode & Window Control Toolbar (Right)
        self.header_frame = tk.Frame(self.card_frame, bg=self.card_bg)
        self.header_frame.pack(fill=tk.X, pady=(0, 2))

        self.lbl_event = tk.Label(
            self.header_frame,
            text=self.current_event_name,
            font=("Segoe UI", int(8.5 * self.font_scale), "bold"),
            fg="#38bdf8",
            bg=self.card_bg
        )
        self.lbl_event.pack(side=tk.LEFT, anchor="w")

        # Mini Action Buttons Toolbar
        self.toolbar_frame = tk.Frame(self.header_frame, bg=self.card_bg)
        self.toolbar_frame.pack(side=tk.RIGHT, anchor="e")

        # Quick Toggle: Tampilkan Keduanya (Both)
        self.btn_mode_both = tk.Label(
            self.toolbar_frame,
            text="🪟",
            font=("Segoe UI", int(8 * self.font_scale)),
            fg="#38bdf8" if self.view_mode == "both" else "#64748b",
            bg=self.card_bg,
            padx=2,
            cursor="hand2"
        )
        self.btn_mode_both.pack(side=tk.LEFT)
        self.btn_mode_both.bind("<Button-1>", lambda e: self.set_view_mode("both"))

        # Quick Toggle: Hanya Timer
        self.btn_mode_timer = tk.Label(
            self.toolbar_frame,
            text="⏱️",
            font=("Segoe UI", int(8 * self.font_scale)),
            fg="#38bdf8" if self.view_mode == "timer_only" else "#64748b",
            bg=self.card_bg,
            padx=2,
            cursor="hand2"
        )
        self.btn_mode_timer.pack(side=tk.LEFT)
        self.btn_mode_timer.bind("<Button-1>", lambda e: self.set_view_mode("timer_only"))

        # Quick Toggle: Hanya Chat
        self.btn_mode_chat = tk.Label(
            self.toolbar_frame,
            text="💬",
            font=("Segoe UI", int(8 * self.font_scale)),
            fg="#38bdf8" if self.view_mode == "chat_only" else "#64748b",
            bg=self.card_bg,
            padx=2,
            cursor="hand2"
        )
        self.btn_mode_chat.pack(side=tk.LEFT)
        self.btn_mode_chat.bind("<Button-1>", lambda e: self.set_view_mode("chat_only"))

        # Chat Count Cycle Badge
        self.btn_chat_count = tk.Label(
            self.toolbar_frame,
            text=f"{self.max_chat_count}",
            font=("Segoe UI", int(7.5 * self.font_scale), "bold"),
            fg="#fbbf24",
            bg="#1e293b",
            padx=3,
            cursor="hand2"
        )
        self.btn_chat_count.pack(side=tk.LEFT, padx=(1, 3))
        self.btn_chat_count.bind("<Button-1>", lambda e: self.cycle_chat_count())

        # Pin Always-On-Top
        self.btn_pin = tk.Label(
            self.toolbar_frame, 
            text="📌", 
            font=("Segoe UI", int(8 * self.font_scale)), 
            fg="#fbbf24" if self.is_always_on_top else "#64748b", 
            bg=self.card_bg, 
            padx=2, 
            cursor="hand2"
        )
        self.btn_pin.pack(side=tk.LEFT)
        self.btn_pin.bind("<Button-1>", lambda e: self.toggle_always_on_top())

        # OBS Guide / Chroma Indicator
        self.btn_obs = tk.Label(
            self.toolbar_frame, 
            text="🎥", 
            font=("Segoe UI", int(8 * self.font_scale)), 
            fg="#22c55e" if self.is_chroma_green else "#94a3b8", 
            bg=self.card_bg, 
            padx=2, 
            cursor="hand2"
        )
        self.btn_obs.pack(side=tk.LEFT)
        self.btn_obs.bind("<Button-1>", lambda e: self.show_obs_guide())

        # Minimize to Taskbar
        self.btn_min = tk.Label(
            self.toolbar_frame, 
            text="➖", 
            font=("Segoe UI", int(8 * self.font_scale)), 
            fg="#94a3b8", 
            bg=self.card_bg, 
            padx=2, 
            cursor="hand2"
        )
        self.btn_min.pack(side=tk.LEFT)
        self.btn_min.bind("<Button-1>", lambda e: self.minimize_to_taskbar())

        # Minimize to Tray
        self.btn_tray = tk.Label(
            self.toolbar_frame, 
            text="📥", 
            font=("Segoe UI", int(8 * self.font_scale)), 
            fg="#94a3b8", 
            bg=self.card_bg, 
            padx=2, 
            cursor="hand2"
        )
        self.btn_tray.pack(side=tk.LEFT)
        self.btn_tray.bind("<Button-1>", lambda e: self.minimize_to_tray())

        # Close
        self.btn_close = tk.Label(
            self.toolbar_frame, 
            text="✕", 
            font=("Segoe UI", int(8 * self.font_scale), "bold"), 
            fg="#ef4444", 
            bg=self.card_bg, 
            padx=3, 
            cursor="hand2"
        )
        self.btn_close.pack(side=tk.LEFT)
        self.btn_close.bind("<Button-1>", lambda e: self.exit_app())

        # =========================================================================
        # MAIN HORIZONTAL BODY FRAME (Timer Pane Mepet on Left, Live Chat on Right)
        # =========================================================================
        self.body_frame = tk.Frame(self.card_frame, bg=self.card_bg)
        self.body_frame.pack(fill=tk.BOTH, expand=True)

        # LEFT PANE: TIMER & STATUS (Mepet, lebar proporsional 150px)
        self.timer_pane = tk.Frame(self.body_frame, bg=self.card_bg, width=int(self.timer_pane_w * self.font_scale))
        self.timer_pane.pack(side=tk.LEFT, fill=tk.Y, expand=False, padx=(0, 2))
        self.timer_pane.pack_propagate(False)

        timer_size = int(44 * self.font_scale)
        self.lbl_timer = tk.Label(
            self.timer_pane,
            text=self.current_time_str,
            font=(self.timer_font_family, timer_size, "bold"),
            fg=self.timer_font_color,
            bg=self.card_bg
        )
        self.lbl_timer.pack(anchor="center", pady=(0, 0))

        self.lbl_status = tk.Label(
            self.timer_pane,
            text="0ms SYNC • HUD",
            font=("Segoe UI", int(7.5 * self.font_scale), "bold"),
            fg="#94a3b8",
            bg=self.card_bg
        )
        self.lbl_status.pack(anchor="center", pady=(0, 1))

        # VERTICAL DIVIDER (Mepet antar Timer & Chat)
        self.chat_vdivider = tk.Frame(self.body_frame, bg="#334155", width=1)
        self.chat_vdivider.pack(side=tk.LEFT, fill=tk.Y, padx=(2, 4))

        # RIGHT PANE: ULTRA-COMPACT LIVE CHAT CONTAINER
        self.chat_pane = tk.Frame(self.body_frame, bg=self.card_bg)
        self.chat_pane.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # Ultra-Compact Text Feed with Native Word-Wrap & Auto-Scroll to Bottom
        self.chat_text = tk.Text(
            self.chat_pane,
            bg=self.card_bg,
            fg="#ffffff",
            wrap=tk.WORD,
            bd=0,
            highlightthickness=0,
            cursor="arrow",
            state=tk.DISABLED
        )
        self.chat_text.pack(fill=tk.BOTH, expand=True, padx=(1, 1), pady=(0, 1))

        # Configure Text Tags for Crisp Inline Formatting & Zero Overlapping
        self.setup_text_tags()

        # Bind Draggable & Context Menu Events to All Elements
        draggable_widgets = [
            self.root, self.card_frame, self.header_frame, self.lbl_event,
            self.body_frame, self.timer_pane, self.lbl_timer, self.lbl_status,
            self.chat_vdivider, self.chat_pane, self.chat_text
        ]

        for widget in draggable_widgets:
            widget.bind("<Button-1>", self.on_drag_start)
            widget.bind("<B1-Motion>", self.on_drag_motion)
            widget.bind("<ButtonRelease-1>", self.on_drag_release)
            widget.bind("<Button-3>", self.show_context_menu)
            widget.bind("<Double-Button-1>", lambda e: self.toggle_pure_mode())

        # Hotkeys
        self.root.bind("<Key-b>", lambda e: self.set_view_mode("both"))
        self.root.bind("<Key-B>", lambda e: self.set_view_mode("both"))
        self.root.bind("<Key-t>", lambda e: self.set_view_mode("timer_only"))
        self.root.bind("<Key-T>", lambda e: self.set_view_mode("timer_only"))
        self.root.bind("<Key-c>", lambda e: self.set_view_mode("chat_only"))
        self.root.bind("<Key-C>", lambda e: self.set_view_mode("chat_only"))
        self.root.bind("<Key-m>", lambda e: self.cycle_view_mode())
        self.root.bind("<Key-M>", lambda e: self.cycle_view_mode())
        self.root.bind("<Key-p>", lambda e: self.toggle_pure_mode())
        self.root.bind("<Key-P>", lambda e: self.toggle_pure_mode())
        self.root.bind("<Key-a>", lambda e: self.toggle_always_on_top())
        self.root.bind("<Key-A>", lambda e: self.toggle_always_on_top())
        self.root.bind("<Key-g>", lambda e: self.toggle_chroma_green())
        self.root.bind("<Key-G>", lambda e: self.toggle_chroma_green())

        # Bind window state changes
        self.root.bind("<Map>", self.on_window_mapped)

        # Context Menu (Right Click)
        self.init_context_menu()

        # Apply View Mode & Visual Modes
        self.apply_view_mode_layout()
        if self.is_pure_mode:
            self.apply_pure_mode_ui()
        if self.is_chroma_green:
            self.apply_chroma_green_ui()

        # Alert State (Timer overtime blinking)
        self.blink_state = False

        # Windows OBS Capture Compatibility Setup
        self.root.update()
        self.setup_windows_obs_compatibility()

        # Start Poll Loops & Visual Animation Tick
        self.poll_timer_data()
        self.poll_chat_data()
        self.poll_chat_animation_tick()

    def get_chat_font_family(self):
        if self.chat_follow_timer_theme:
            return self.timer_font_family
        return "Segoe UI"

    def get_chat_msg_color(self):
        if self.chat_follow_timer_theme:
            if self.timer_font_color.lower() in ["#000000", "black"]:
                return "#000000" if self.is_pure_mode else "#cbd5e1"
            return self.timer_font_color
        return "#f1f5f9"

    def setup_text_tags(self):
        font_family = self.get_chat_font_family()
        font_size = max(7, int(8.5 * self.font_scale))
        msg_color = self.get_chat_msg_color()

        self.chat_text.tag_configure("sender_admin", foreground="#fbbf24", font=(font_family, font_size, "bold"), spacing1=1, spacing3=2)
        self.chat_text.tag_configure("sender_user", foreground="#38bdf8", font=(font_family, font_size, "bold"), spacing1=1, spacing3=2)
        self.chat_text.tag_configure("sender_sys", foreground="#94a3b8", font=(font_family, font_size, "bold"), spacing1=1, spacing3=2)
        self.chat_text.tag_configure("badge_new", foreground="#fbbf24", font=("Segoe UI", max(6, font_size - 1), "bold"))
        self.chat_text.tag_configure("msg", foreground=msg_color, font=(font_family, font_size), spacing1=1, spacing3=2)
        self.chat_text.tag_configure("msg_new", foreground="#fbbf24", font=(font_family, font_size), spacing1=1, spacing3=2)
        self.chat_text.tag_configure("placeholder", foreground="#64748b", font=(font_family, font_size, "italic"))

    def setup_windows_obs_compatibility(self):
        """
        Enables OBS Studio Window Capture for borderless Tkinter window by:
        1. Setting explicit window title via SetWindowTextW.
        2. Setting extended style WS_EX_APPWINDOW and removing WS_EX_TOOLWINDOW.
        """
        try:
            import ctypes
            hwnd = ctypes.windll.user32.GetParent(self.root.winfo_id())
            if not hwnd:
                hwnd = self.root.winfo_id()
            
            # Explicit Title for OBS Window List Enumeration
            ctypes.windll.user32.SetWindowTextW(hwnd, self.window_title)
            
            # Modify extended window styles so OBS does not filter it out
            GWL_EXSTYLE = -20
            WS_EX_APPWINDOW = 0x00040000
            WS_EX_TOOLWINDOW = 0x00000080
            cur_style = ctypes.windll.user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
            new_style = (cur_style | WS_EX_APPWINDOW) & ~WS_EX_TOOLWINDOW
            ctypes.windll.user32.SetWindowLongW(hwnd, GWL_EXSTYLE, new_style)
        except Exception as e:
            print(f"[OBS Compatibility] Notice: {e}")

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
                "view_mode": self.view_mode,
                "max_chat_count": self.max_chat_count,
                "is_always_on_top": self.is_always_on_top,
                "is_pure_mode": self.is_pure_mode,
                "is_chroma_green": self.is_chroma_green,
                "chat_follow_timer_theme": self.chat_follow_timer_theme,
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
        
        # 1. Mode Tampilan Utama (Both, Hanya Timer, Hanya Chat)
        self.context_menu.add_command(
            label="✓ Tampilkan Keduanya (Timer & Chat) [B]" if self.view_mode == "both" else "○ Tampilkan Keduanya (Timer & Chat) [B]",
            command=lambda: self.set_view_mode("both")
        )
        self.context_menu.add_command(
            label="✓ Hanya Timer (Bersih) [T]" if self.view_mode == "timer_only" else "○ Hanya Timer (Bersih) [T]",
            command=lambda: self.set_view_mode("timer_only")
        )
        self.context_menu.add_command(
            label="✓ Hanya Chat (Sembunyikan Timer) [C]" if self.view_mode == "chat_only" else "○ Hanya Chat (Sembunyikan Timer) [C]",
            command=lambda: self.set_view_mode("chat_only")
        )

        self.context_menu.add_separator()

        self.context_menu.add_command(
            label="✓ Always On Top (Selalu di Depan)" if self.is_always_on_top else "○ Always On Top (Nonaktif / Normal Window)", 
            command=self.toggle_always_on_top
        )
        self.context_menu.add_command(
            label="🔲 Toggle Glass Card / Pure Transparent HUD", 
            command=self.toggle_pure_mode
        )
        self.context_menu.add_command(
            label="✓ OBS Chroma Key (Green Screen Mode)" if self.is_chroma_green else "🟢 OBS Chroma Key (Green Screen Mode)",
            command=self.toggle_chroma_green
        )

        self.context_menu.add_separator()

        # 2. Submenu Kuota Live Chat (0 - 5 pesan)
        self.chat_menu = tk.Menu(self.context_menu, tearoff=0)
        self.update_chat_menu_items()
        self.context_menu.add_cascade(label=f"💬 Kuota Chat Maksimal ({self.max_chat_count} Pesan)", menu=self.chat_menu)

        self.context_menu.add_command(
            label="✓ Warna & Font Chat Ikut Tema Timer" if self.chat_follow_timer_theme else "○ Warna & Font Chat Ikut Tema Timer",
            command=self.toggle_chat_theme_inheritance
        )

        self.context_menu.add_separator()
        self.context_menu.add_command(label="🎥 Panduan OBS & Virtual Camera (Zoom/Meet)", command=self.show_obs_guide)
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
        self.context_menu.add_command(label="Ukuran: Kecil (0.8x)", command=lambda: self.set_scale(0.8))
        self.context_menu.add_command(label="Ukuran: Normal (1.0x)", command=lambda: self.set_scale(1.0))
        self.context_menu.add_command(label="Ukuran: Besar (1.25x)", command=lambda: self.set_scale(1.25))
        self.context_menu.add_command(label="Ukuran: Raksasa (1.5x)", command=lambda: self.set_scale(1.5))
        self.context_menu.add_separator()
        self.context_menu.add_command(label="✕ Tutup Overlay (Exit)", command=self.exit_app)

    def update_chat_menu_items(self):
        self.chat_menu.delete(0, tk.END)
        options = [
            (0, "✕ 0 - Sembunyikan Chat"),
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
            self.context_menu.entryconfigure(0, label="✓ Tampilkan Keduanya (Timer & Chat) [B]" if self.view_mode == "both" else "○ Tampilkan Keduanya (Timer & Chat) [B]")
            self.context_menu.entryconfigure(1, label="✓ Hanya Timer (Bersih) [T]" if self.view_mode == "timer_only" else "○ Hanya Timer (Bersih) [T]")
            self.context_menu.entryconfigure(2, label="✓ Hanya Chat (Sembunyikan Timer) [C]" if self.view_mode == "chat_only" else "○ Hanya Chat (Sembunyikan Timer) [C]")
            
            self.context_menu.entryconfigure(4, label="✓ Always On Top (Selalu di Depan)" if self.is_always_on_top else "○ Always On Top (Nonaktif / Normal Window)")
            self.context_menu.entryconfigure(6, label="✓ OBS Chroma Key (Green Screen Mode)" if self.is_chroma_green else "🟢 OBS Chroma Key (Green Screen Mode)")
            
            self.context_menu.entryconfigure(8, label=f"💬 Kuota Chat Maksimal ({self.max_chat_count} Pesan)")
            self.context_menu.entryconfigure(9, label="✓ Warna & Font Chat Ikut Tema Timer" if self.chat_follow_timer_theme else "○ Warna & Font Chat Ikut Tema Timer")
            self.update_chat_menu_items()
        except Exception:
            pass

    def calculate_target_geometry(self):
        scale = self.font_scale
        if self.view_mode == "timer_only":
            w = int(self.timer_only_w * scale)
            h = int(self.timer_only_h * scale)
        elif self.view_mode == "chat_only":
            w = int(self.chat_only_w * scale)
            h = int(self.chat_only_h * scale)
        else: # "both"
            if self.max_chat_count == 0:
                w = int(self.timer_only_w * scale)
                h = int(self.timer_only_h * scale)
            else:
                w = int((self.timer_pane_w + self.chat_pane_w) * scale)
                h = int(self.base_h * scale)
        return w, h

    def set_view_mode(self, mode):
        self.view_mode = mode
        self.apply_view_mode_layout()
        self.btn_mode_both.config(fg="#38bdf8" if self.view_mode == "both" else "#64748b")
        self.btn_mode_timer.config(fg="#38bdf8" if self.view_mode == "timer_only" else "#64748b")
        self.btn_mode_chat.config(fg="#38bdf8" if self.view_mode == "chat_only" else "#64748b")
        self.refresh_context_menu_labels()
        self.save_config()

    def cycle_view_mode(self):
        modes = ["both", "timer_only", "chat_only"]
        current_idx = modes.index(self.view_mode) if self.view_mode in modes else 0
        next_mode = modes[(current_idx + 1) % len(modes)]
        self.set_view_mode(next_mode)
        mode_label = "KEDUANYA" if next_mode == "both" else ("HANYA TIMER" if next_mode == "timer_only" else "HANYA CHAT")
        self.lbl_status.config(text=f"MODE: {mode_label}", fg="#38bdf8")

    def apply_view_mode_layout(self):
        self._last_rendered_chat_sig = None
        scale = self.font_scale

        if self.view_mode == "timer_only":
            # Hanya Timer: Sembunyikan divider, chat, header/judul & status (Timer aja bersih & padding super rapat!)
            if self.chat_vdivider.winfo_ismapped():
                self.chat_vdivider.pack_forget()
            if self.chat_pane.winfo_ismapped():
                self.chat_pane.pack_forget()
            if self.header_frame.winfo_ismapped():
                self.header_frame.pack_forget()
            if self.lbl_event.winfo_ismapped():
                self.lbl_event.pack_forget()
            if self.lbl_status.winfo_ismapped():
                self.lbl_status.pack_forget()
            if not self.timer_pane.winfo_ismapped():
                self.timer_pane.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
            self.timer_pane.config(width=int(self.timer_only_w * scale))
            self.lbl_timer.pack(anchor="center", expand=True, padx=1, pady=0)
            self.card_frame.config(padx=2, pady=1)
            self.card_frame.pack_configure(padx=1, pady=1)
        elif self.view_mode == "chat_only":
            # Hanya Chat: Sembunyikan timer & divider
            if self.timer_pane.winfo_ismapped():
                self.timer_pane.pack_forget()
            if self.chat_vdivider.winfo_ismapped():
                self.chat_vdivider.pack_forget()
            if not self.header_frame.winfo_ismapped():
                self.header_frame.pack(fill=tk.X, pady=(0, 2), before=self.body_frame)
            if not self.lbl_event.winfo_ismapped():
                self.lbl_event.pack(side=tk.LEFT, anchor="w")
            if not self.chat_pane.winfo_ismapped():
                self.chat_pane.pack(fill=tk.BOTH, expand=True)
            self.card_frame.config(padx=6, pady=3)
            self.card_frame.pack_configure(padx=2, pady=2)
        else:
            # Both: Timer di kiri mepet, divider di tengah, chat di kanan
            if not self.header_frame.winfo_ismapped():
                self.header_frame.pack(fill=tk.X, pady=(0, 2), before=self.body_frame)
            if not self.lbl_event.winfo_ismapped():
                self.lbl_event.pack(side=tk.LEFT, anchor="w")
            if not self.timer_pane.winfo_ismapped():
                self.timer_pane.pack(side=tk.LEFT, fill=tk.Y, expand=False, padx=(0, 2))
            self.timer_pane.config(width=int(self.timer_pane_w * scale))
            self.lbl_timer.pack(anchor="center", pady=(0, 0))
            if not self.lbl_status.winfo_ismapped():
                self.lbl_status.pack(anchor="center", pady=(0, 1), after=self.lbl_timer)

            if self.max_chat_count > 0:
                if not self.chat_vdivider.winfo_ismapped():
                    self.chat_vdivider.pack(side=tk.LEFT, fill=tk.Y, padx=(2, 4), after=self.timer_pane)
                if not self.chat_pane.winfo_ismapped():
                    self.chat_pane.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, after=self.chat_vdivider)
            else:
                if self.chat_vdivider.winfo_ismapped():
                    self.chat_vdivider.pack_forget()
                if self.chat_pane.winfo_ismapped():
                    self.chat_pane.pack_forget()
            self.card_frame.config(padx=6, pady=3)
            self.card_frame.pack_configure(padx=2, pady=2)

        self.adjust_window_size()
        self.update_chat_display(self.last_recent_chats)

    def toggle_chat_theme_inheritance(self):
        self.chat_follow_timer_theme = not self.chat_follow_timer_theme
        self.refresh_context_menu_labels()
        self.save_config()
        self.setup_text_tags()
        self._last_rendered_chat_sig = None
        self.update_chat_display(self.last_recent_chats)

    def set_max_chat_count(self, count):
        self.max_chat_count = max(0, min(5, int(count)))
        self._last_rendered_chat_sig = None
        self.btn_chat_count.config(text=f"{self.max_chat_count}")
        self.refresh_context_menu_labels()
        self.save_config()
        self.apply_view_mode_layout()

    def cycle_chat_count(self):
        # 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0
        next_count = (self.max_chat_count + 1) % 6
        self.set_max_chat_count(next_count)
        desc = "OFF (0)" if next_count == 0 else f"{next_count} PESAN"
        self.lbl_status.config(text=f"KUOTA: {desc}", fg="#38bdf8")

    def set_font_family(self, family_name):
        self.timer_font_family = family_name
        timer_size = int(44 * self.font_scale)
        self.lbl_timer.config(font=(self.timer_font_family, timer_size, "bold"))
        self.setup_text_tags()
        self.save_config()
        self._last_rendered_chat_sig = None
        self.update_chat_display(self.last_recent_chats)

    def set_font_color(self, color):
        self.timer_font_color = color
        self.lbl_timer.config(fg=color)
        if self.is_pure_mode and color.lower() in ["#000000", "black"]:
            self.lbl_status.config(fg="#334155")
        elif not self.is_pure_mode:
            self.lbl_status.config(fg="#94a3b8")
        self.setup_text_tags()
        self.save_config()
        self._last_rendered_chat_sig = None
        self.update_chat_display(self.last_recent_chats)

    def toggle_always_on_top(self):
        self.is_always_on_top = not self.is_always_on_top
        self.root.attributes("-topmost", self.is_always_on_top)
        self.btn_pin.config(fg="#fbbf24" if self.is_always_on_top else "#64748b")
        self.refresh_context_menu_labels()
        self.save_config()

    def toggle_pure_mode(self):
        self.is_pure_mode = not self.is_pure_mode
        self.apply_pure_mode_ui()
        self.save_config()

    def apply_pure_mode_ui(self):
        self._last_rendered_chat_sig = None
        bg_col = self.trans_color if self.is_pure_mode else self.card_bg
        if self.is_pure_mode:
            self.card_frame.config(bg=self.trans_color, highlightthickness=0)
            self.chat_vdivider.config(bg=self.trans_color)
        else:
            self.card_frame.config(bg=self.card_bg, highlightthickness=1, highlightbackground=self.card_border)
            self.chat_vdivider.config(bg="#334155")

        self.header_frame.config(bg=bg_col)
        self.toolbar_frame.config(bg=bg_col)
        self.lbl_event.config(bg=bg_col)
        self.btn_mode_both.config(bg=bg_col)
        self.btn_mode_timer.config(bg=bg_col)
        self.btn_mode_chat.config(bg=bg_col)
        self.btn_pin.config(bg=bg_col)
        self.btn_obs.config(bg=bg_col)
        self.btn_min.config(bg=bg_col)
        self.btn_tray.config(bg=bg_col)
        self.btn_close.config(bg=bg_col)
        self.body_frame.config(bg=bg_col)
        self.timer_pane.config(bg=bg_col)
        self.lbl_timer.config(bg=bg_col)
        self.lbl_status.config(bg=bg_col)
        self.chat_pane.config(bg=bg_col)
        self.chat_text.config(bg=bg_col)

        if self.is_pure_mode and self.timer_font_color.lower() in ["#000000", "black"]:
            self.lbl_status.config(fg="#334155")
        elif not self.is_pure_mode:
            self.lbl_status.config(fg="#94a3b8")

        self.setup_text_tags()
        self.update_chat_display(self.last_recent_chats)

    def toggle_chroma_green(self):
        self.is_chroma_green = not self.is_chroma_green
        self.apply_chroma_green_ui()
        self.refresh_context_menu_labels()
        self.save_config()

    def apply_chroma_green_ui(self):
        try:
            if self.is_chroma_green:
                self.btn_obs.config(fg="#22c55e")
                self.root.config(bg=self.chroma_color)
                # Remove transparent key so green shows cleanly for BitBlt / Chroma Key filters
                self.root.wm_attributes("-transparentcolor", "")
            else:
                self.btn_obs.config(fg="#94a3b8")
                self.root.config(bg=self.trans_color)
                self.root.wm_attributes("-transparentcolor", self.trans_color)
        except Exception:
            pass

    def show_obs_guide(self):
        guide_text = (
            "🎥 PANDUAN OBS STUDIO & VIRTUAL CAMERA\n\n"
            "1. Menangkap di OBS Studio (Window Capture):\n"
            "   • Tambahkan Source (+) ➔ Window Capture.\n"
            "   • Window: Pilih '[TimerOverlay.exe]: Educamp Timer & Chat Overlay'.\n"
            "   • Capture Method: Pilih 'Windows 10 (1903 and up)'.\n"
            "   • Mode WGC ini menangkap transparansi halus secara native tanpa background hitam!\n\n"
            "2. Mode Chroma Key (Green Screen) untuk vMix / BitBlt:\n"
            "   • Klik kanan Overlay ➔ Aktifkan 'OBS Chroma Key (Green Screen Mode)'.\n"
            "   • Di OBS / vMix, klik kanan Source ➔ Filters (+) ➔ 'Chroma Key' (Green).\n\n"
            "3. Mengaktifkan Virtual Camera (Zoom / Google Meet / Teams):\n"
            "   • Di OBS Studio (Controls dock pojok kanan bawah), klik 'Start Virtual Camera'.\n"
            "   • Di Zoom / Meet: Pilih Kamera ➔ 'OBS Virtual Camera'.\n"
            "   • Timer & Live Chat kini tayang langsung di feed video Anda!"
        )
        messagebox.showinfo("Panduan OBS & Virtual Camera", guide_text)

    def set_scale(self, scale):
        self.font_scale = scale
        event_size = max(7, int(8.5 * scale))
        timer_size = max(24, int(44 * scale))
        status_size = max(6, int(7.5 * scale))
        btn_size = max(6, int(8 * scale))
        
        self.lbl_event.config(font=("Segoe UI", event_size, "bold"))
        self.btn_mode_both.config(font=("Segoe UI", btn_size))
        self.btn_mode_timer.config(font=("Segoe UI", btn_size))
        self.btn_mode_chat.config(font=("Segoe UI", btn_size))
        self.btn_chat_count.config(font=("Segoe UI", max(6, int(7.5 * scale)), "bold"))
        self.btn_pin.config(font=("Segoe UI", btn_size))
        self.btn_obs.config(font=("Segoe UI", btn_size))
        self.btn_min.config(font=("Segoe UI", btn_size))
        self.btn_tray.config(font=("Segoe UI", btn_size))
        self.btn_close.config(font=("Segoe UI", btn_size, "bold"))
        self.lbl_timer.config(font=(self.timer_font_family, timer_size, "bold"))
        self.lbl_status.config(font=("Segoe UI", status_size, "bold"))

        self.timer_pane.config(width=int(self.timer_pane_w * scale))
        self.setup_text_tags()
        self.save_config()
        self.apply_view_mode_layout()

    def adjust_window_size(self):
        cur_x = self.root.winfo_x()
        cur_y = self.root.winfo_y()
        w, h = self.calculate_target_geometry()

        cur_w = self.root.winfo_width()
        cur_h = self.root.winfo_height()
        if abs(cur_w - w) > 2 or abs(cur_h - h) > 2:
            self.root.geometry(f"{w}x{h}+{cur_x}+{cur_y}")

    def update_chat_display(self, recent_chats):
        self.last_recent_chats = recent_chats or []

        if self.view_mode == "timer_only" or (self.view_mode == "both" and self.max_chat_count == 0):
            return

        display_chats = []
        if isinstance(recent_chats, list) and len(recent_chats) > 0:
            effective_limit = 5 if self.view_mode == "chat_only" else self.max_chat_count
            display_chats = recent_chats[-effective_limit:]

        # Detect new incoming messages for 15-second blinking alert
        if display_chats:
            latest = display_chats[-1]
            latest_sig = f"{latest.get('id') or ''}_{latest.get('timestamp') or ''}_{latest.get('text') or ''}"
            if self.has_initialized_chat and self.newest_chat_sig and latest_sig != self.newest_chat_sig:
                self.new_chat_alert_until = time.time() + 15.0
            elif not self.has_initialized_chat:
                self.has_initialized_chat = True
            self.newest_chat_sig = latest_sig

        # Memoization Signature (Zero-Flicker)
        sig = (
            self.view_mode,
            self.max_chat_count,
            self.is_pure_mode,
            self.chat_follow_timer_theme,
            self.timer_font_family,
            self.timer_font_color,
            len(display_chats),
            tuple((c.get("id", ""), c.get("sender", ""), c.get("text", ""), c.get("role", "")) for c in display_chats)
        )
        if getattr(self, "_last_rendered_chat_sig", None) == sig:
            # Tetap pastikan autoscroll bottom selalu aktif
            self.chat_text.see(tk.END)
            return
        self._last_rendered_chat_sig = sig

        # Populate ultra-compact rich text
        self.chat_text.config(state=tk.NORMAL)
        self.chat_text.delete("1.0", tk.END)

        if len(display_chats) == 0:
            self.chat_text.insert(tk.END, "💬 Live Chat: ", "sender_user")
            self.chat_text.insert(tk.END, "Menunggu pesan masuk...\n", "placeholder")
        else:
            now = time.time()
            is_alerting = (now < self.new_chat_alert_until)

            for idx, chat in enumerate(display_chats):
                sender = (chat.get("sender", "") or "Peserta").strip()
                text = (chat.get("text", "") or "").strip()
                role = (chat.get("role", "") or "").upper()
                is_newest = (idx == len(display_chats) - 1)

                if sender.lower() == "sistem" or role == "SYSTEM":
                    prefix = "⚙️ "
                    tag_sender = "sender_sys"
                elif role == "ADMIN" or "panitia" in sender.lower() or "nandur" in sender.lower():
                    prefix = "👑 "
                    tag_sender = "sender_admin"
                else:
                    prefix = "💬 "
                    tag_sender = "sender_user"

                # Sender name: clean trim only if extraordinarily long (> 35 chars)
                if len(sender) > 35:
                    sender = sender[:33] + "…"

                # 15-second blinking badge on newest message
                if is_newest and is_alerting:
                    self.chat_text.insert(tk.END, "🔔[BARU] ", "badge_new")

                self.chat_text.insert(tk.END, f"{prefix}{sender}: ", tag_sender)
                
                # Message text with auto word-wrap
                tag_msg = "msg_new" if (is_newest and is_alerting) else "msg"
                self.chat_text.insert(tk.END, f"{text}\n", tag_msg)

        # 100% NATIVE AUTOSCROLL TO BOTTOM
        self.chat_text.see(tk.END)
        self.chat_text.config(state=tk.DISABLED)

    def poll_chat_animation_tick(self):
        """
        Smooth visual pulse for new chat messages (400ms tick).
        Updates text tag properties in-place without triggering re-layouts.
        """
        now = time.time()
        if now < self.new_chat_alert_until and self.view_mode != "timer_only":
            self.chat_blink_state = not self.chat_blink_state
            if self.chat_blink_state:
                self.chat_text.tag_configure("badge_new", foreground="#fbbf24")
                self.chat_text.tag_configure("msg_new", foreground="#fbbf24")
            else:
                self.chat_text.tag_configure("badge_new", foreground="#ef4444")
                self.chat_text.tag_configure("msg_new", foreground=self.get_chat_msg_color())
        elif self.new_chat_alert_until > 0 and now >= self.new_chat_alert_until:
            # Alert period elapsed: clear alert state and re-render once cleanly
            self.new_chat_alert_until = 0.0
            self._last_rendered_chat_sig = None
            self.update_chat_display(self.last_recent_chats)

        self.root.after(400, self.poll_chat_animation_tick)

    def on_window_mapped(self, event):
        if event.widget == self.root and not self.is_minimized_to_tray:
            if self.root.state() == "normal":
                self.root.overrideredirect(True)
                self.root.attributes("-topmost", self.is_always_on_top)
                self.setup_windows_obs_compatibility()

    def create_tray_image(self):
        img = Image.new('RGBA', (64, 64), color=(0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        d.ellipse((6, 6, 58, 58), fill='#0f172a', outline='#38bdf8', width=4)
        d.rectangle((27, 1, 37, 7), fill='#38bdf8')
        d.line((32, 32, 32, 18), fill='#38bdf8', width=3)
        d.line((32, 32, 44, 32), fill='#fbbf24', width=3)
        return img

    def minimize_to_taskbar(self):
        self.root.overrideredirect(False)
        self.root.iconify()

    def minimize_to_tray(self):
        self.is_minimized_to_tray = True
        self.root.withdraw()
        
        def on_tray_restore(icon=None, item=None):
            self.root.after(0, self.restore_from_tray)

        def on_tray_exit(icon=None, item=None):
            self.root.after(0, self.exit_app)

        def on_tray_toggle_topmost(icon=None, item=None):
            self.root.after(0, self.toggle_always_on_top)

        def on_tray_set_mode_both(icon=None, item=None):
            self.root.after(0, lambda: self.set_view_mode("both"))

        def on_tray_set_mode_timer(icon=None, item=None):
            self.root.after(0, lambda: self.set_view_mode("timer_only"))

        def on_tray_set_mode_chat(icon=None, item=None):
            self.root.after(0, lambda: self.set_view_mode("chat_only"))

        def on_tray_cycle_chat(icon=None, item=None):
            self.root.after(0, self.cycle_chat_count)

        menu = pystray.Menu(
            pystray.MenuItem(f"⏱️ {self.current_time_str} - Buka Overlay", on_tray_restore, default=True),
            pystray.MenuItem("🪟 Mode: Keduanya (Timer & Chat)", on_tray_set_mode_both),
            pystray.MenuItem("⏱️ Mode: Hanya Timer", on_tray_set_mode_timer),
            pystray.MenuItem("💬 Mode: Hanya Chat", on_tray_set_mode_chat),
            pystray.MenuItem(f"💬 Kuota Chat: {self.max_chat_count} Pesan", on_tray_cycle_chat),
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
        self.setup_windows_obs_compatibility()
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
        self.lbl_status.config(text=f"CONNECTING: {target_url}...", fg="#38bdf8")
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
            self.lbl_status.config(text="MENUNGGU KONEKSI...", fg="#f59e0b")
        
        # Schedule next poll in 150ms
        self.root.after(150, self.poll_timer_data)

    def poll_chat_data(self):
        if self.view_mode != "timer_only" and (self.max_chat_count > 0 or self.view_mode == "chat_only"):
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
                self.lbl_status.config(text="⏱️ MELEBIHI WAKTU", fg="#ef4444")
            else:
                self.lbl_status.config(text="⚠️ WAKTU KRITIS", fg="#ef4444")
        elif is_running:
            self.current_status_str = "RUNNING"
            self.lbl_timer.config(fg=self.timer_font_color)
            self.lbl_status.config(text="● RUNNING • LIVE", fg="#38bdf8")
        elif remaining_sec <= 0:
            self.current_status_str = "TIMEOUT"
            self.lbl_timer.config(fg="#ef4444")
            self.lbl_status.config(text="WAKTU HABIS", fg="#ef4444")
        elif status_val == "PAUSED":
            self.current_status_str = "PAUSED"
            self.lbl_timer.config(fg="#f59e0b")
            self.lbl_status.config(text="⏸️ PAUSED", fg="#f59e0b")
        else:
            self.current_status_str = "READY"
            self.lbl_timer.config(fg=self.timer_font_color)
            self.lbl_status.config(text="READY • GESER PINDAH", fg="#94a3b8")

        # Prioritaskan recentChats utuh dari backend
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

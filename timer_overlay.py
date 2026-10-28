"""
Stand-Alone Borderless Transparent Timer Overlay for Windows
Educamp 2026 - Realtime Sync with Timer & Live Chat
Requires: Python 3.x with tkinter (Built-in standard library - Zero 3rd party deps)
"""

import sys
import json
import urllib.request
import urllib.error
import tkinter as tk
from tkinter import font as tkfont

DEFAULT_LOCAL_URL = "http://localhost:3002/api/timer-chat/vmix"
DEFAULT_CLOUD_URL = "https://educamp.ai.studio/api/timer-chat/vmix"

class TransparentTimerOverlay:
    def __init__(self, root, server_url=None):
        self.root = root
        self.server_url = server_url or DEFAULT_LOCAL_URL
        self.cloud_fallback_url = DEFAULT_CLOUD_URL
        self.active_url = self.server_url
        self.fail_count = 0
        
        # Window Configuration
        self.root.title("Educamp Timer Overlay - Borderless")
        self.root.attributes("-topmost", True)  # Always on top
        self.root.overrideredirect(True)       # Borderless, no titlebar
        
        # Set Transparent Key Color
        self.trans_color = "#010101"
        self.root.config(bg=self.trans_color)
        try:
            self.root.wm_attributes("-transparentcolor", self.trans_color)
        except Exception as e:
            print(f"[Warning] Transparent color not supported on this platform: {e}")

        # Position default on screen (top-right) - Compact height & width
        win_w, win_h = 360, 126
        screen_w = self.root.winfo_screenwidth()
        start_x = max(20, screen_w - win_w - 30)
        start_y = 30
        self.root.geometry(f"{win_w}x{win_h}+{start_x}+{start_y}")

        # Dragging State
        self.offset_x = 0
        self.offset_y = 0
        self.is_pure_mode = False  # Toggle dark pill glass background
        self.font_scale = 1.0
        self.timer_font_color = "#ffffff"

        # UI Components - Compact styling
        self.card_bg = "#0f172a"
        self.card_border = "#334155"

        self.card_frame = tk.Frame(
            self.root, 
            bg=self.card_bg, 
            highlightbackground=self.card_border, 
            highlightthickness=1, 
            padx=12, 
            pady=4
        )
        self.card_frame.pack(fill=tk.BOTH, expand=True, padx=2, pady=2)

        # Event Badge / Header (Compact top margin)
        self.lbl_event = tk.Label(
            self.card_frame,
            text="EDUCAMP 2026",
            font=("Segoe UI", 10, "bold"),
            fg="#38bdf8",
            bg=self.card_bg
        )
        self.lbl_event.pack(anchor="center", pady=(1, 0))

        # Main Digits Label (Tighter vertical footprint)
        self.lbl_timer = tk.Label(
            self.card_frame,
            text="05:00",
            font=("Consolas", 52, "bold"),
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

        # Setup Drag Handlers on all components
        for widget in (self.root, self.card_frame, self.lbl_event, self.lbl_timer, self.lbl_status):
            widget.bind("<Button-1>", self.on_drag_start)
            widget.bind("<B1-Motion>", self.on_drag_motion)
            widget.bind("<Button-3>", self.show_context_menu)  # Right click menu
            widget.bind("<Double-Button-1>", lambda e: self.toggle_pure_mode()) # Double click toggle glass

        # Context Menu
        self.context_menu = tk.Menu(self.root, tearoff=0)
        self.context_menu.add_command(label="Toggle Glass Card / Pure Transparent", command=self.toggle_pure_mode)
        
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
        self.context_menu.add_command(label="Font Ukuran: Kecil", command=lambda: self.set_scale(0.8))
        self.context_menu.add_command(label="Font Ukuran: Normal", command=lambda: self.set_scale(1.0))
        self.context_menu.add_command(label="Font Ukuran: Besar", command=lambda: self.set_scale(1.25))
        self.context_menu.add_command(label="Font Ukuran: Raksasa", command=lambda: self.set_scale(1.5))
        self.context_menu.add_separator()
        self.context_menu.add_command(label="Tutup Overlay (Exit)", command=self.root.quit)

        # Blinking Alert State
        self.blink_state = False

        # Start Poll Loop (150ms interval for smooth realtime display)
        self.poll_timer_data()

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
            self.context_menu.tk_popup(event.x_root, event.y_root)
        finally:
            self.context_menu.grab_release()

    def toggle_pure_mode(self):
        self.is_pure_mode = not self.is_pure_mode
        if self.is_pure_mode:
            # Full invisible background (text-only HUD)
            self.card_frame.config(bg=self.trans_color, highlightthickness=0)
            self.lbl_event.config(bg=self.trans_color)
            self.lbl_timer.config(bg=self.trans_color)
            self.lbl_status.config(bg=self.trans_color)
            if self.timer_font_color == "#000000":
                self.lbl_status.config(fg="#334155")
        else:
            # Elegant dark pill backing
            self.card_frame.config(bg=self.card_bg, highlightthickness=1, highlightbackground=self.card_border)
            self.lbl_event.config(bg=self.card_bg)
            self.lbl_timer.config(bg=self.card_bg)
            self.lbl_status.config(bg=self.card_bg)
            self.lbl_status.config(fg="#94a3b8")

    def set_scale(self, scale):
        self.font_scale = scale
        event_size = int(10 * scale)
        timer_size = int(52 * scale)
        status_size = int(8 * scale)
        
        self.lbl_event.config(font=("Segoe UI", event_size, "bold"))
        self.lbl_timer.config(font=("Consolas", timer_size, "bold"))
        self.lbl_status.config(font=("Segoe UI", status_size, "bold"))

        w = int(360 * scale)
        h = int(126 * scale)
        cur_x = self.root.winfo_x()
        cur_y = self.root.winfo_y()
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

        self.lbl_event.config(text=event_name.upper())
        self.lbl_timer.config(text=time_str)

        if is_blinking or status_val == "OVERTIME" or time_str.startswith("+"):
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
            self.lbl_timer.config(fg=self.timer_font_color)
            self.lbl_status.config(text="● RUNNING • LIVE SYNC", fg="#38bdf8")
        elif remaining_sec <= 0:
            self.lbl_timer.config(fg="#ef4444")
            self.lbl_status.config(text="WAKTU HABIS (TIME OUT)", fg="#ef4444")
        elif status_val == "PAUSED":
            self.lbl_timer.config(fg="#f59e0b")
            self.lbl_status.config(text="⏸️ PAUSED", fg="#f59e0b")
        else:
            self.lbl_timer.config(fg=self.timer_font_color)
            self.lbl_status.config(text="READY • GESER UNTUK PINDAH", fg="#94a3b8")

def main():
    server_target = None
    if len(sys.argv) > 1:
        server_target = sys.argv[1]

    root = tk.Tk()
    app = TransparentTimerOverlay(root, server_url=server_target)
    root.mainloop()

if __name__ == "__main__":
    main()

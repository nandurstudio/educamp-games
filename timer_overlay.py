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

DEFAULT_SERVER_URL = "http://localhost:3002/api/timer-chat/vmix"

class TransparentTimerOverlay:
    def __init__(self, root, server_url=DEFAULT_SERVER_URL):
        self.root = root
        self.server_url = server_url
        
        # Window Configuration
        self.root.title("Educamp Timer Overlay - Borderless")
        self.root.attributes("-topmost", True)  # Always on top
        self.root.overrideredirect(True)       # Borderless, no titlebar
        
        # Set Transparent Key Color
        # Windows supports transparentcolor attribute on Tk
        self.trans_color = "#010101"
        self.root.config(bg=self.trans_color)
        try:
            self.root.wm_attributes("-transparentcolor", self.trans_color)
        except Exception as e:
            print(f"[Warning] Transparent color not supported on this platform: {e}")

        # Position default on screen (top-right or customizable)
        win_w, win_h = 420, 200
        screen_w = self.root.winfo_screenwidth()
        start_x = max(20, screen_w - win_w - 40)
        start_y = 40
        self.root.geometry(f"{win_w}x{win_h}+{start_x}+{start_y}")

        # Dragging State
        self.offset_x = 0
        self.offset_y = 0
        self.is_pure_mode = False  # Toggle dark pill glass background
        self.font_scale = 1.0

        # UI Components
        self.card_bg = "#0f172a"
        self.card_border = "#334155"

        self.card_frame = tk.Frame(
            self.root, 
            bg=self.card_bg, 
            highlightbackground=self.card_border, 
            highlightthickness=2, 
            padx=20, 
            pady=12
        )
        self.card_frame.pack(fill=tk.BOTH, expand=True, padx=4, pady=4)

        # Event Badge / Header
        self.lbl_event = tk.Label(
            self.card_frame,
            text="EDUCAMP 2026",
            font=("Segoe UI", 11, "bold"),
            fg="#38bdf8",
            bg=self.card_bg
        )
        self.lbl_event.pack(anchor="center", pady=(0, 2))

        # Main Digits Label
        self.lbl_timer = tk.Label(
            self.card_frame,
            text="05:00",
            font=("Consolas", 56, "bold"),
            fg="#22c55e",
            bg=self.card_bg
        )
        self.lbl_timer.pack(anchor="center", pady=0)

        # Status / Subtitle Label
        self.lbl_status = tk.Label(
            self.card_frame,
            text="0ms SYNC • GESER UNTUK PINDAH",
            font=("Segoe UI", 8, "bold"),
            fg="#94a3b8",
            bg=self.card_bg
        )
        self.lbl_status.pack(anchor="center", pady=(4, 0))

        # Setup Drag Handlers on all components
        for widget in (self.root, self.card_frame, self.lbl_event, self.lbl_timer, self.lbl_status):
            widget.bind("<Button-1>", self.on_drag_start)
            widget.bind("<B1-Motion>", self.on_drag_motion)
            widget.bind("<Button-3>", self.show_context_menu)  # Right click menu

        # Context Menu
        self.context_menu = tk.Menu(self.root, tearoff=0)
        self.context_menu.add_command(label="Toggle Glass Card / Pure Transparent", command=self.toggle_pure_mode)
        self.context_menu.add_separator()
        self.context_menu.add_command(label="Font Ukuran: Kecil", command=lambda: self.set_scale(0.75))
        self.context_menu.add_command(label="Font Ukuran: Normal", command=lambda: self.set_scale(1.0))
        self.context_menu.add_command(label="Font Ukuran: Besar", command=lambda: self.set_scale(1.3))
        self.context_menu.add_command(label="Font Ukuran: Raksasa", command=lambda: self.set_scale(1.6))
        self.context_menu.add_separator()
        self.context_menu.add_command(label="Tutup Overlay (Exit)", command=self.root.quit)

        # Blinking Alert State
        self.blink_state = False

        # Start Poll Loop (100ms interval for smooth realtime display)
        self.poll_timer_data()

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
        else:
            # Elegant dark pill backing
            self.card_frame.config(bg=self.card_bg, highlightthickness=2, highlightbackground=self.card_border)
            self.lbl_event.config(bg=self.card_bg)
            self.lbl_timer.config(bg=self.card_bg)
            self.lbl_status.config(bg=self.card_bg)

    def set_scale(self, scale):
        self.font_scale = scale
        event_size = int(11 * scale)
        timer_size = int(56 * scale)
        status_size = int(8 * scale)
        
        self.lbl_event.config(font=("Segoe UI", event_size, "bold"))
        self.lbl_timer.config(font=("Consolas", timer_size, "bold"))
        self.lbl_status.config(font=("Segoe UI", status_size, "bold"))

        w = int(420 * scale)
        h = int(200 * scale)
        cur_x = self.root.winfo_x()
        cur_y = self.root.winfo_y()
        self.root.geometry(f"{w}x{h}+{cur_x}+{cur_y}")

    def poll_timer_data(self):
        try:
            req = urllib.request.Request(self.server_url, headers={"User-Agent": "EducampTimerOverlay/1.0"})
            with urllib.request.urlopen(req, timeout=0.8) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                self.update_display(data)
        except Exception as e:
            # Server offline or connecting
            self.lbl_status.config(text="MENUNGGU KONEKSI SERVER...", fg="#f59e0b")
        
        # Schedule next poll in 150ms
        self.root.after(150, self.poll_timer_data)

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
            self.lbl_timer.config(fg="#22c55e")
            self.lbl_status.config(text="● RUNNING • LIVE SYNC", fg="#22c55e")
        elif remaining_sec <= 0:
            self.lbl_timer.config(fg="#ef4444")
            self.lbl_status.config(text="WAKTU HABIS (TIME OUT)", fg="#ef4444")
        else:
            self.lbl_timer.config(fg="#38bdf8")
            self.lbl_status.config(text="READY • GESER UNTUK PINDAH", fg="#94a3b8")

def main():
    server_target = DEFAULT_SERVER_URL
    if len(sys.argv) > 1:
        server_target = sys.argv[1]

    root = tk.Tk()
    app = TransparentTimerOverlay(root, server_url=server_target)
    root.mainloop()

if __name__ == "__main__":
    main()

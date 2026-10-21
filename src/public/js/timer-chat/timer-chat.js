// === 1. DATA MASTER RUNDOWN HEALTH CHECK DAY 1 & DAY 2 (OFFICIAL) ===
    const RUNDOWN_DAY_1 = [
      { no: 1, time: "08:30 - 08:35", durMin: 5, sec: 300, title: "Opening MC (Pray, Indonesia Raya, Kalbe Panca Sradha)", pic: "Ms. Anisa", isYellow: false },
      { no: 2, time: "08:35 - 08:40", durMin: 5, sec: 300, title: "Video : Safety Briefing", pic: "Ms. Anisa", isYellow: false },
      { no: 3, time: "08:40 - 08:45", durMin: 5, sec: 300, title: "Video Journey TPM", pic: "Ms. Anisa", isYellow: false },
      { no: 4, time: "08:45 - 08:50", durMin: 5, sec: 300, title: "Video Rundown (Day 1)", pic: "Ms. Anisa", isYellow: false },
      { no: 5, time: "08:50 - 08:55", durMin: 5, sec: 300, title: "Opening Speech Top Management SHP", pic: "Mr. Andi Chendra", isYellow: false },
      { no: 6, time: "08:55 - 09:00", durMin: 5, sec: 300, title: "Opening Speech JMAC", pic: "Mr. Otsuka", isYellow: false },
      { no: 7, time: "09:00 - 09:30", durMin: 30, sec: 1800, title: "Presentation Chapter 1, 2, 3, 12 (TPM Promotion)", pic: "Mrs. Verdiana", isYellow: false },
      { no: 8, time: "09:30 - 10:00", durMin: 30, sec: 1800, title: "Question & Answer Chapter 1, 2, 3, 12", pic: "Mr. Otsuka", isYellow: false },
      { no: 9, time: "10:00 - 10:10", durMin: 10, sec: 600, title: "Break Pagi", pic: "KNLC D", isYellow: true },
      { no: 10, time: "10:10 - 10:25", durMin: 15, sec: 900, title: "Presentation Chapter 5 Autonomous Maintenance (AM)", pic: "Mr. Agung Joko", isYellow: false },
      { no: 11, time: "10:25 - 10:40", durMin: 15, sec: 900, title: "Presentation Chapter 6 Planned Maintenance (PM)", pic: "Mr. Cahyo Agung", isYellow: false },
      { no: 12, time: "10:40 - 11:10", durMin: 30, sec: 1800, title: "Question & Answer (AM & PM)", pic: "Mr. Otsuka", isYellow: false },
      { no: 13, time: "11:10 - 11:25", durMin: 15, sec: 900, title: "Presentation Chapter 7 Quality Maintenance (QM)", pic: "Mrs. Sri Rejeki", isYellow: false },
      { no: 14, time: "11:25 - 11:40", durMin: 15, sec: 900, title: "Presentation Chapter 8 Early Management (EM)", pic: "Mr. Sukaryadi", isYellow: false },
      { no: 15, time: "11:40 - 12:10", durMin: 30, sec: 1800, title: "Question & Answer (QM & EM)", pic: "Mr. Otsuka", isYellow: false },
      { no: 16, time: "12:10 - 13:00", durMin: 50, sec: 3000, title: "Lunch Break", pic: "KNLC D", isYellow: true },
      { no: 17, time: "13:00 - 13:07", durMin: 7, sec: 420, title: "Quick Win 1: EM & OSA", pic: "Mr. Dimas JP & Team", isYellow: false },
      { no: 18, time: "13:07 - 13:37", durMin: 30, sec: 1800, title: "Q&A Quick Win 1", pic: "Mr. Otsuka", isYellow: false },
      { no: 19, time: "13:37 - 13:52", durMin: 15, sec: 900, title: "Go to Highcare Area (IBC Lt.2)", pic: "All Team", isYellow: false },
      { no: 20, time: "13:52 - 13:59", durMin: 7, sec: 420, title: "Quick Win 2: AM & EM", pic: "Mr. Raihan & Mr. Reki", isYellow: false },
      { no: 21, time: "13:59 - 14:29", durMin: 30, sec: 1800, title: "Q&A Quick Win 2", pic: "Mr. Otsuka", isYellow: false },
      { no: 22, time: "14:29 - 14:34", durMin: 5, sec: 300, title: "Go to Filling Sachet I", pic: "All Team", isYellow: false },
      { no: 23, time: "14:34 - 14:41", durMin: 7, sec: 420, title: "Quick Win 3: QM", pic: "Mr. Budy Sutrisno", isYellow: false },
      { no: 24, time: "14:41 - 15:11", durMin: 30, sec: 1800, title: "Q&A Quick Win 3", pic: "Mr. Otsuka", isYellow: false },
      { no: 25, time: "15:11 - 15:26", durMin: 15, sec: 900, title: "Go to Packing (Robot Salak)", pic: "All Team", isYellow: false },
      { no: 26, time: "15:26 - 15:33", durMin: 7, sec: 420, title: "Quick Win 4: PM", pic: "Mr. Joko Suprihanto", isYellow: false },
      { no: 27, time: "15:33 - 16:03", durMin: 30, sec: 1800, title: "Q&A Quick Win 4", pic: "Mr. Otsuka", isYellow: false },
      { no: 28, time: "16:03 - 16:13", durMin: 10, sec: 600, title: "Back to Main Room (KNLC A-C)", pic: "All Team", isYellow: false },
      { no: 29, time: "16:13 - 16:28", durMin: 15, sec: 900, title: "Break Sore", pic: "KNLC D", isYellow: true },
      { no: 30, time: "16:28 - 16:33", durMin: 5, sec: 300, title: "Closing MC & Pray Day 1", pic: "Ms. Anisa", isYellow: false }
    ];

    const RUNDOWN_DAY_2 = [
      { no: 1, time: "08:30 - 08:35", durMin: 5, sec: 300, title: "Opening MC Day 2", pic: "Ms. Anisa", isYellow: false },
      { no: 2, time: "08:35 - 08:40", durMin: 5, sec: 300, title: "Video Rundown (Day 2)", pic: "Ms. Anisa", isYellow: false },
      { no: 3, time: "08:40 - 09:10", durMin: 30, sec: 1800, title: "Presentation Chapter 4 Focused Improvement (FI)", pic: "Mr. Dyanza Arya Perdana", isYellow: false },
      { no: 4, time: "09:10 - 09:40", durMin: 30, sec: 1800, title: "Question & Answer Chapter 4 FI", pic: "Mr. Otsuka", isYellow: false },
      { no: 5, time: "09:40 - 09:55", durMin: 15, sec: 900, title: "Presentation Chapter 9 Education & Training (ET)", pic: "Mr. Andreas Hari Listanto", isYellow: false },
      { no: 6, time: "09:55 - 10:25", durMin: 30, sec: 1800, title: "Question & Answer Chapter 9 ET", pic: "Mr. Otsuka", isYellow: false },
      { no: 7, time: "10:25 - 10:35", durMin: 10, sec: 600, title: "Break Pagi", pic: "Studio", isYellow: true },
      { no: 8, time: "10:35 - 10:50", durMin: 15, sec: 900, title: "Presentation Chapter 10 Office & Administration (OSA)", pic: "Mr. Priyo Anarkie", isYellow: false },
      { no: 9, time: "10:50 - 11:20", durMin: 30, sec: 1800, title: "Question & Answer Chapter 10 OSA", pic: "Mr. Otsuka", isYellow: false },
      { no: 10, time: "11:20 - 11:35", durMin: 15, sec: 900, title: "Presentation Chapter 11 Safety, Health & Environment (SHE)", pic: "Pilar SHE Team", isYellow: false },
      { no: 11, time: "11:35 - 12:05", durMin: 30, sec: 1800, title: "Question & Answer Chapter 11 SHE", pic: "Mr. Otsuka", isYellow: false },
      { no: 12, time: "12:05 - 13:05", durMin: 60, sec: 3600, title: "Lunch Break", pic: "Studio", isYellow: true },
      { no: 13, time: "13:05 - 13:10", durMin: 5, sec: 300, title: "Go to View Gallery", pic: "All Team", isYellow: false },
      { no: 14, time: "13:10 - 13:17", durMin: 7, sec: 420, title: "Quick Win 4: FI", pic: "Ms. Fifi & Mr. Bintang Z", isYellow: false },
      { no: 15, time: "13:17 - 13:47", durMin: 30, sec: 1800, title: "Q&A Quick Win 4 FI", pic: "Mr. Otsuka", isYellow: false },
      { no: 16, time: "13:47 - 13:54", durMin: 7, sec: 420, title: "Quick Win 6: SHE", pic: "Mr. Nanang & Mr. Putra Dewangga", isYellow: false },
      { no: 17, time: "13:54 - 14:24", durMin: 30, sec: 1800, title: "Q&A Quick Win 6 SHE", pic: "Mr. Otsuka", isYellow: false },
      { no: 18, time: "14:24 - 14:31", durMin: 7, sec: 420, title: "Quick Win 7: ET", pic: "Tim ET", isYellow: false },
      { no: 19, time: "14:31 - 15:01", durMin: 30, sec: 1800, title: "Q&A Quick Win 7 ET", pic: "Mr. Otsuka", isYellow: false },
      { no: 20, time: "15:01 - 15:06", durMin: 5, sec: 300, title: "Back to Main Room", pic: "Studio", isYellow: false },
      { no: 21, time: "15:06 - 15:21", durMin: 15, sec: 900, title: "Break Sore", pic: "Studio", isYellow: true },
      { no: 22, time: "15:21 - 16:21", durMin: 60, sec: 3600, title: "Lecture & Feedback", pic: "Mr. Otsuka", isYellow: false },
      { no: 23, time: "16:21 - 16:26", durMin: 5, sec: 300, title: "Closing Speech", pic: "Mr. Yudha Agus Tri Basuki", isYellow: false },
      { no: 24, time: "16:26 - 16:31", durMin: 5, sec: 300, title: "Closing MC & Pray Day 2", pic: "Ms. Anisa", isYellow: false }
    ];

    let currentDayTab = 'DAY_1';
    let pendingSessionSeparator = null;

    // Ambil data rundown dari localStorage atau gunakan default master
    function getStoredRundown(dayKey) {
      try {
        const stored = localStorage.getItem(`tpm_rundown_${dayKey.toLowerCase()}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Gagal membaca storage rundown, gunakan default');
      }
      return dayKey === 'DAY_1' ? JSON.parse(JSON.stringify(RUNDOWN_DAY_1)) : JSON.parse(JSON.stringify(RUNDOWN_DAY_2));
    }

    function saveStoredRundown(dayKey, items) {
      try {
        localStorage.setItem(`tpm_rundown_${dayKey.toLowerCase()}`, JSON.stringify(items));
      } catch (e) {
        console.error('Gagal menyimpan storage rundown', e);
      }
    }

    let rundownItemsDay1 = getStoredRundown('DAY_1');
    let rundownItemsDay2 = getStoredRundown('DAY_2');

    function getCurrentRundownList() {
      return currentDayTab === 'DAY_1' ? rundownItemsDay1 : rundownItemsDay2;
    }

    function setCurrentRundownList(items) {
      if (currentDayTab === 'DAY_1') {
        rundownItemsDay1 = items;
        saveStoredRundown('DAY_1', items);
      } else {
        rundownItemsDay2 = items;
        saveStoredRundown('DAY_2', items);
      }
    }

    function renderRundownItems() {
      const container = document.getElementById('rundown-list');
      if (!container) return;
      container.innerHTML = '';
      const items = getCurrentRundownList();

      if (items.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 24px 10px; color: #64748b; font-size: 12px;">
            Belum ada sesi di tab ini. Klik <strong>+ Tambah Sesi</strong> untuk menambahkan.
          </div>
        `;
        return;
      }

      items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = `rundown-row ${item.isYellow ? 'is-highlight' : ''}`;
        row.innerHTML = `
          <div class="rundown-meta-left">
            <span class="rundown-time-badge">${escapeHtml(item.time || '-')}</span>
            <div class="rundown-activity">
              <span>${escapeHtml(item.title)}</span>
              ${item.pic ? `<span class="rundown-pic">• ${escapeHtml(item.pic)}</span>` : ''}
            </div>
          </div>
          <div class="rundown-meta-right">
            <span class="rundown-dur-pill ${item.isYellow ? 'yellow' : ''}">${item.durMin}m</span>
            <div class="rundown-item-actions">
              <button class="btn-rundown-action btn-edit" title="Edit sesi ini" data-index="${index}">✎</button>
              <button class="btn-rundown-action btn-del" title="Hapus sesi ini" data-index="${index}">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 12px; height: 12px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </div>
        `;

        // 1-Klik Set Waktu + Siapkan Separator Sesi (Hanya terkirim saat timer di-Play)
        row.addEventListener('click', (e) => {
          if (e.target.closest('.rundown-item-actions')) return;

          if (!checkTimerControlPermission()) return;

          const totalSec = item.sec || (item.durMin * 60);
          
          currentActiveSession = {
            index: index,
            title: item.title,
            planSeconds: totalSec,
            timeLabel: item.time || '-'
          };

          socket.emit('TC_SET_DURATION', {
            durationSeconds: totalSec,
            userEmail: currentUser ? currentUser.email : ''
          });

          // Simpan sebagai pending separator, HANYA dikirim saat tombol Mulai (Play) ditekan
          pendingSessionSeparator = {
            eventId: currentActiveEvent ? currentActiveEvent.id : null,
            sessionTitle: `${item.title} (${item.durMin}m)`,
            sessionDuration: totalSec,
            userEmail: currentUser ? currentUser.email : ''
          };

          // Tandai row aktif di rundown list
          document.querySelectorAll('.rundown-row').forEach(r => r.classList.remove('is-current-playing'));
          row.classList.add('is-current-playing');
          updateRundownVsActualUI();
        });

        // Edit button
        const btnEdit = row.querySelector('.btn-edit');
        if (btnEdit) {
          btnEdit.addEventListener('click', (e) => {
            e.stopPropagation();
            openRundownModal('EDIT', index, item);
          });
        }

        // Delete button
        const btnDel = row.querySelector('.btn-del');
        if (btnDel) {
          btnDel.addEventListener('click', async (e) => {
            e.stopPropagation();
            const ok = await showConfirmDialog({
              title: 'Hapus Sesi Rundown',
              message: `Apakah Anda yakin ingin menghapus sesi "${item.title}" dari rundown?`,
              confirmText: 'Hapus Sesi'
            });
            if (ok) {
              const currentList = getCurrentRundownList();
              currentList.splice(index, 1);
              setCurrentRundownList(currentList);
              renderRundownItems();
            }
          });
        }

        container.appendChild(row);
      });
    }

    // Modal Add / Edit Rundown Item Logic
    const rundownModal = document.getElementById('rundown-item-modal');
    const rundownModalTitle = document.getElementById('rundown-modal-title');
    const rundownItemId = document.getElementById('rundown-item-id');
    const rundownFormTitle = document.getElementById('rundown-form-title');
    const rundownFormTime = document.getElementById('rundown-form-time');
    const rundownFormDur = document.getElementById('rundown-form-dur');
    const rundownFormPic = document.getElementById('rundown-form-pic');
    const rundownFormHighlight = document.getElementById('rundown-form-highlight');
    const btnCloseRundownModal = document.getElementById('btn-close-rundown-modal');
    const btnCancelRundownItem = document.getElementById('btn-cancel-rundown-item');
    const btnSaveRundownItem = document.getElementById('btn-save-rundown-item');
    const btnAddRundownItem = document.getElementById('btn-add-rundown-item');

    function openRundownModal(mode, index = null, item = null) {
      if (mode === 'ADD') {
        rundownModalTitle.textContent = `Tambah Sesi (${currentDayTab === 'DAY_1' ? 'Day 1' : 'Day 2'})`;
        rundownItemId.value = '';
        rundownFormTitle.value = '';
        rundownFormTime.value = '';
        rundownFormDur.value = '15';
        rundownFormPic.value = '';
        rundownFormHighlight.checked = false;
      } else {
        rundownModalTitle.textContent = `Edit Sesi (${currentDayTab === 'DAY_1' ? 'Day 1' : 'Day 2'})`;
        rundownItemId.value = String(index);
        rundownFormTitle.value = item.title || '';
        rundownFormTime.value = item.time || '';
        rundownFormDur.value = item.durMin || 15;
        rundownFormPic.value = item.pic || '';
        rundownFormHighlight.checked = !!item.isYellow;
      }
      rundownModal.classList.add('active');
      setTimeout(() => rundownFormTitle.focus(), 150);
    }

    function closeRundownModal() {
      rundownModal.classList.remove('active');
    }

    if (btnAddRundownItem) {
      btnAddRundownItem.addEventListener('click', () => {
        if (!checkTimerControlPermission()) return;
        openRundownModal('ADD');
      });
    }
    if (btnCloseRundownModal) btnCloseRundownModal.addEventListener('click', closeRundownModal);
    if (btnCancelRundownItem) btnCancelRundownItem.addEventListener('click', closeRundownModal);

    if (btnSaveRundownItem) {
      btnSaveRundownItem.addEventListener('click', () => {
        const title = rundownFormTitle.value.trim();
        const time = rundownFormTime.value.trim() || '-';
        const durMin = parseInt(rundownFormDur.value, 10) || 5;
        const pic = rundownFormPic.value.trim();
        const isYellow = rundownFormHighlight.checked;

        if (!title) {
          showAlertDialog({ title: 'Data Belum Lengkap', message: 'Nama sesi rundown tidak boleh kosong.' });
          return;
        }

        const currentList = getCurrentRundownList();
        const editIdxStr = rundownItemId.value;

        if (editIdxStr !== '' && !isNaN(parseInt(editIdxStr, 10))) {
          const idx = parseInt(editIdxStr, 10);
          currentList[idx] = {
            ...currentList[idx],
            title,
            time,
            durMin,
            sec: durMin * 60,
            pic,
            isYellow
          };
        } else {
          currentList.push({
            no: currentList.length + 1,
            title,
            time,
            durMin,
            sec: durMin * 60,
            pic,
            isYellow
          });
        }

        setCurrentRundownList(currentList);
        renderRundownItems();
        closeRundownModal();
      });
    }

    document.getElementById('tab-day1').addEventListener('click', () => {
      currentDayTab = 'DAY_1';
      document.getElementById('tab-day1').classList.add('active');
      document.getElementById('tab-day2').classList.remove('active');
      renderRundownItems();
    });

    document.getElementById('tab-day2').addEventListener('click', () => {
      currentDayTab = 'DAY_2';
      document.getElementById('tab-day2').classList.add('active');
      document.getElementById('tab-day1').classList.remove('active');
      renderRundownItems();
    });

    renderRundownItems();

    // === 2. GLOBAL STATE & NTP SYNC VARIABLES ===
    const socket = io();
    let clockOffset = 0;
    let activeTimerState = {
      status: 'IDLE',
      durationSeconds: 300,
      targetEndTime: null,
      remainingSeconds: 300,
      isBlinking: false
    };
    let currentUser = null;
    let isUserAdmin = false;
    let isSuperAdmin = false;
    let currentActiveEvent = null;

    // Fungsi Penguncian Akses Timer & Rundown untuk Non-Admin
    function updateTimerPermissionUI() {
      const timerControlsBar = document.getElementById('timer-controls-bar');
      const timerLockNotice = document.getElementById('timer-lock-notice');
      const btnOpenUserMgmt = document.getElementById('btn-open-user-mgmt');
      const btnAddRundown = document.getElementById('btn-add-rundown-item');
      const presetPills = document.querySelectorAll('.preset-pill');
      const mobilePresetBtn = document.getElementById('btn-mobile-preset');

      if (isSuperAdmin && btnOpenUserMgmt) {
        btnOpenUserMgmt.style.display = 'inline-flex';
      } else if (btnOpenUserMgmt) {
        btnOpenUserMgmt.style.display = 'none';
      }

      if (isUserAdmin) {
        // Full Access untuk Admin / Game Master / Super Admin
        if (timerControlsBar) timerControlsBar.classList.remove('controls-locked');
        if (timerLockNotice) timerLockNotice.classList.remove('active');
        if (btnAddRundown) {
          btnAddRundown.style.opacity = '1';
          btnAddRundown.style.cursor = 'pointer';
        }
        presetPills.forEach(p => {
          p.style.opacity = '1';
          p.style.cursor = 'pointer';
        });
        if (mobilePresetBtn) {
          mobilePresetBtn.style.opacity = '1';
          mobilePresetBtn.style.cursor = 'pointer';
        }
      } else {
        // Terkunci untuk penonton / non-admin
        if (timerControlsBar) timerControlsBar.classList.add('controls-locked');
        if (timerLockNotice) timerLockNotice.classList.add('active');
        if (btnAddRundown) {
          btnAddRundown.style.opacity = '0.5';
          btnAddRundown.style.cursor = 'not-allowed';
        }
        presetPills.forEach(p => {
          p.style.opacity = '0.4';
          p.style.cursor = 'not-allowed';
        });
        if (mobilePresetBtn) {
          mobilePresetBtn.style.opacity = '0.4';
          mobilePresetBtn.style.cursor = 'not-allowed';
        }
      }
    }

    // Realtime Rundown vs Actual State Tracker
    let currentActiveSession = {
      title: 'Opening / Standby',
      planSeconds: 300,
      timeLabel: '-'
    };

    const rvaTrackerBadge = document.getElementById('rva-tracker-badge');
    const rvaSessionName = document.getElementById('rva-session-name');
    const rvaPlanVal = document.getElementById('rva-plan-val');
    const rvaActualVal = document.getElementById('rva-actual-val');
    const rvaDiffBadge = document.getElementById('rva-diff-badge');
    const rvaDiffText = document.getElementById('rva-diff-text');
    const rvaOverallPct = document.getElementById('rva-overall-pct');

    function updateRundownVsActualUI() {
      if (!rvaTrackerBadge) return;

      const planSec = (currentActiveSession && currentActiveSession.planSeconds) 
        ? currentActiveSession.planSeconds 
        : (activeTimerState.durationSeconds || 300);

      const planFormatted = formatTime(planSec);
      if (rvaPlanVal) rvaPlanVal.textContent = planFormatted;

      if (rvaSessionName) {
        rvaSessionName.textContent = currentActiveSession.title || 'Sesi Acara';
        rvaSessionName.title = `Sesi: ${currentActiveSession.title}`;
      }

      // Hitung sisa detik aktif
      let remainingSec = activeTimerState.remainingSeconds;
      if (activeTimerState.status === 'RUNNING' && activeTimerState.targetEndTime) {
        const adjustedNow = Date.now() + clockOffset;
        const diffMs = activeTimerState.targetEndTime - adjustedNow;
        remainingSec = Math.max(0, Math.ceil(diffMs / 1000));
      }

      // Actual elapsed time
      const actualElapsedSec = Math.max(0, planSec - remainingSec);
      if (rvaActualVal) rvaActualVal.textContent = formatTime(actualElapsedSec);

      // Hitung Overall Progress Keseluruhan Rundown
      try {
        const currentList = getCurrentRundownList() || [];
        let totalRundownSec = 0;
        let cumulativeElapsedSec = 0;
        
        const activeIdx = (currentActiveSession && typeof currentActiveSession.index === 'number')
          ? currentActiveSession.index
          : currentList.findIndex(it => currentActiveSession && currentActiveSession.title === it.title);

        currentList.forEach((it, idx) => {
          const itemSec = it.sec || (it.durMin * 60) || 300;
          totalRundownSec += itemSec;

          if (activeIdx !== -1) {
            if (idx < activeIdx) {
              cumulativeElapsedSec += itemSec;
            } else if (idx === activeIdx) {
              cumulativeElapsedSec += actualElapsedSec;
            }
          }
        });

        if (activeIdx === -1) {
          cumulativeElapsedSec = actualElapsedSec;
        }

        if (totalRundownSec > 0 && rvaOverallPct) {
          const pct = Math.min(100, Math.max(0, Math.round((cumulativeElapsedSec / totalRundownSec) * 100)));
          rvaOverallPct.textContent = `${pct}%`;
        }
      } catch (e) {
        if (rvaOverallPct) rvaOverallPct.textContent = '0%';
      }

      // Status deviasi vs schedule
      // Jika timer habis tapi masih jalan / timeout -> Overrun
      if (activeTimerState.status === 'TIME_OUT' || (activeTimerState.status === 'RUNNING' && remainingSec === 0)) {
        if (rvaDiffBadge) {
          rvaDiffBadge.className = 'rva-diff-badge over';
          rvaDiffText.textContent = 'OVERRUN (+LEWAT)';
        }
      } else if (remainingSec === planSec) {
        if (rvaDiffBadge) {
          rvaDiffBadge.className = 'rva-diff-badge ontime';
          rvaDiffText.textContent = 'TEPAT WAKTU';
        }
      } else {
        // Sedang berjalan normal
        const pacePercent = Math.round((actualElapsedSec / planSec) * 100);
        if (rvaDiffBadge) {
          rvaDiffBadge.className = 'rva-diff-badge ontime';
          rvaDiffText.textContent = `${pacePercent}% ON TRACK`;
        }
      }
    }

    function syncNTPClock() {
      const t0 = Date.now();
      socket.emit('TC_TIME_SYNC', { clientTimestamp: t0 });
    }

    socket.on('TC_TIME_PONG', (data) => {
      const t3 = Date.now();
      const t0 = data.clientTimestamp;
      const t1 = data.serverTimestamp;
      const rtt = t3 - t0;
      clockOffset = t1 - (t3 - (rtt / 2));
      const syncBadge = document.getElementById('sync-latency-label');
      if (syncBadge) {
        syncBadge.textContent = `${Math.round(rtt / 2)}ms`;
      }
    });

    setInterval(syncNTPClock, 15000);
    syncNTPClock();

    function formatTime(totalSec) {
      const s = Math.max(0, Math.floor(totalSec));
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function formatOvertime(totalSec) {
      const s = Math.max(0, Math.floor(totalSec));
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `+${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // === 3. REALTIME TIMER RAF TICKER (0ms JITTER DENGAN OVERTIME SUPPORT) ===
    const timerDisplay = document.getElementById('timer-display');
    const chkAllowOvertime = document.getElementById('chk-allow-overtime');

    let isCurrentlyOvertime = false;
    let lastActiveSeparatorMessageId = null; // ID separator sesi yang sedang dimainkan
    let lastActiveSeparatorBaseTitle = 'Sesi Acara'; // Judul dasar tanpa info actual

    if (chkAllowOvertime) {
      chkAllowOvertime.addEventListener('change', () => {
        socket.emit('TC_SET_OVERTIME_TOGGLE', {
          allowOvertime: chkAllowOvertime.checked,
          eventId: currentActiveEvent ? currentActiveEvent.id : null
        });
      });
    }

    function updateTimerUI() {
      const allowOvertime = chkAllowOvertime ? chkAllowOvertime.checked : true;

      if (activeTimerState.status === 'RUNNING' && activeTimerState.targetEndTime) {
        const adjustedNow = Date.now() + clockOffset;
        const diffMs = activeTimerState.targetEndTime - adjustedNow;

        if (diffMs >= 0) {
          // Hitung mundur normal
          isCurrentlyOvertime = false;
          const remainingSec = Math.max(0, Math.ceil(diffMs / 1000));
          timerDisplay.textContent = formatTime(remainingSec);
          timerDisplay.className = 'timer-display running';

          if (remainingSec <= 10 && remainingSec > 0) {
            timerDisplay.classList.add('blinking-alert');
          } else if (remainingSec === 0) {
            timerDisplay.className = 'timer-display over';
          }
        } else {
          // Melewati batas 00:00
          const overtimePassedSec = Math.floor(Math.abs(diffMs) / 1000);
          if (allowOvertime) {
            isCurrentlyOvertime = true;
            timerDisplay.textContent = formatOvertime(overtimePassedSec);
            timerDisplay.className = 'timer-display overtime';
          } else {
            isCurrentlyOvertime = false;
            timerDisplay.textContent = '00:00';
            timerDisplay.className = 'timer-display over';
          }
        }
      } else {
        // Status PAUSED, IDLE, atau TIME_OUT
        if (activeTimerState.remainingSeconds < 0) {
          isCurrentlyOvertime = true;
          const absOvertimeSec = Math.abs(activeTimerState.remainingSeconds);
          timerDisplay.textContent = formatOvertime(absOvertimeSec);
          timerDisplay.className = activeTimerState.status === 'PAUSED' ? 'timer-display overtime paused' : 'timer-display overtime';
        } else {
          isCurrentlyOvertime = false;
          timerDisplay.textContent = formatTime(activeTimerState.remainingSeconds);
          if (activeTimerState.status === 'PAUSED') {
            timerDisplay.className = 'timer-display paused';
          } else if (activeTimerState.status === 'TIME_OUT') {
            timerDisplay.className = 'timer-display over';
          } else {
            timerDisplay.className = 'timer-display ready';
          }
        }
      }

      // Update Rundown vs Actual realtime mini badge
      updateRundownVsActualUI();

      requestAnimationFrame(updateTimerUI);
    }
    requestAnimationFrame(updateTimerUI);

    // === 4. SOCKET.IO LISTENERS ===
    socket.on('TC_STATE_UPDATE', (state) => {
      if (!state) return;
      activeTimerState = state.timer;
      if (chkAllowOvertime && activeTimerState && activeTimerState.allowOvertime !== undefined) {
        chkAllowOvertime.checked = !!activeTimerState.allowOvertime;
      }
      if (state.activeEvent) {
        currentActiveEvent = state.activeEvent;
        updateEventLabels(currentActiveEvent);
      }
      if (state.chatHistory) {
        renderChatMessages(state.chatHistory);
      }
      updateRundownVsActualUI();
    });

    socket.on('TC_TIMER_STARTED', (data) => {
      activeTimerState.status = 'RUNNING';
      activeTimerState.targetEndTime = data.targetEndTime;
      activeTimerState.durationSeconds = data.durationSeconds;
      updateRundownVsActualUI();
    });

    // Helper untuk sinkronisasi waktu aktual sesi ke separator obrolan saat timer di-stop/pause
    function syncActualTimeToSeparator() {
      if (!lastActiveSeparatorMessageId) return;

      const planSec = (currentActiveSession && currentActiveSession.planSeconds) 
        ? currentActiveSession.planSeconds 
        : (activeTimerState.durationSeconds || 300);

      let actualSec = 0;
      if (activeTimerState.remainingSeconds < 0) {
        actualSec = planSec + Math.abs(activeTimerState.remainingSeconds);
      } else {
        actualSec = Math.max(0, planSec - activeTimerState.remainingSeconds);
      }

      if (actualSec <= 0) return;

      const actualFmt = formatTime(actualSec);
      const planFmt = formatTime(planSec);
      let updatedTitle = `${lastActiveSeparatorBaseTitle} • Actual: ${actualFmt} (Plan: ${planFmt})`;

      if (activeTimerState.remainingSeconds < 0) {
        const overSec = Math.abs(activeTimerState.remainingSeconds);
        updatedTitle = `${lastActiveSeparatorBaseTitle} • Actual: ${actualFmt} (Overtime +${formatTime(overSec)})`;
      }

      socket.emit('TC_UPDATE_MESSAGE', {
        messageId: lastActiveSeparatorMessageId,
        sessionTitle: updatedTitle,
        sessionDuration: planSec,
        eventId: currentActiveEvent ? currentActiveEvent.id : null,
        requesterEmail: currentUser ? currentUser.email : '',
        requesterName: currentUser ? currentUser.displayName : 'Operator',
        isAdmin: true
      });
    }

    socket.on('TC_TIMER_PAUSED', (data) => {
      activeTimerState.status = 'PAUSED';
      activeTimerState.remainingSeconds = data.remainingSeconds;
      updateRundownVsActualUI();
      syncActualTimeToSeparator();
    });

    socket.on('TC_TIMER_RESET', (data) => {
      activeTimerState.status = 'IDLE';
      activeTimerState.remainingSeconds = data.remainingSeconds;
      activeTimerState.durationSeconds = data.durationSeconds;
      updateRundownVsActualUI();
      syncActualTimeToSeparator();
    });

    socket.on('TC_NEW_MESSAGE', (msg) => {
      appendChatMessage(msg, true);
      if (msg && msg.isSeparator) {
        lastActiveSeparatorMessageId = msg.id;
        // Bersihkan title dari format sebelumnya jika ada
        const rawTitle = msg.sessionTitle || msg.message || 'Sesi Acara';
        lastActiveSeparatorBaseTitle = rawTitle.split(' • Actual:')[0].trim();
      }
    });

    socket.on('TC_MESSAGE_DELETED', ({ messageId, isPermanent, updatedMessage }) => {
      const el = document.querySelector(`[data-msg-id="${messageId}"]`);
      if (el) {
        if (isPermanent) {
          // Separator atau hard deleted: fade out dan hapus dari DOM
          el.style.transition = 'all 0.25s ease';
          el.style.opacity = '0';
          el.style.transform = 'scale(0.9)';
          setTimeout(() => el.remove(), 250);
        } else {
          // Soft delete: bubble tetap ada, tampilkan tanda larang & Pesan telah dihapus / Pesan dihapus oleh [Role] [Nama]
          el.classList.add('is-deleted');
          el.classList.remove('is-single-emoji');
          const noticeText = (updatedMessage && (updatedMessage.deleteNotice || updatedMessage.message || updatedMessage.text)) || 'Pesan telah dihapus';
          const contentDiv = el.querySelector('.msg-content');
          if (contentDiv) {
            contentDiv.className = 'msg-content';
            contentDiv.innerHTML = `
              <div class="msg-deleted-notice">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg>
                <span>${escapeHtml(noticeText)}</span>
              </div>
            `;
          }
          // Hilangkan attachment media jika ada
          const mediaEl = el.querySelector('.msg-media-attachment, .msg-sticker-wrapper');
          if (mediaEl) mediaEl.remove();

          // Sembunyikan tombol more / action menu
          const moreBtn = el.querySelector('.btn-msg-more');
          if (moreBtn) moreBtn.style.display = 'none';
          const menu = el.querySelector('.msg-actions-menu');
          if (menu) menu.remove();
        }
      }
    });

    socket.on('TC_REACTION_UPDATED', (data) => {
      if (!data || !data.messageId) return;
      const el = document.querySelector(`[data-msg-id="${data.messageId}"]`);
      if (!el) return;

      const bubbleCard = el.querySelector('.chat-bubble-card');
      if (!bubbleCard) return;

      let badgeBar = bubbleCard.querySelector('.msg-reactions-badge-bar');
      const reactions = data.reactions || {};
      const emojiKeys = Object.keys(reactions);

      if (emojiKeys.length === 0) {
        if (badgeBar) badgeBar.remove();
        return;
      }

      if (!badgeBar) {
        badgeBar = document.createElement('div');
        badgeBar.className = 'msg-reactions-badge-bar';
        const bottomMeta = bubbleCard.querySelector('.msg-bottom-meta');
        if (bottomMeta) {
          bubbleCard.insertBefore(badgeBar, bottomMeta);
        } else {
          bubbleCard.appendChild(badgeBar);
        }
      }

      const myId = (currentUser && currentUser.email ? currentUser.email : '') ||
                   (currentUser && currentUser.displayName ? currentUser.displayName : '') ||
                   ((guestNameInput && guestNameInput.value.trim()) || localStorage.getItem('tc_guest_name') || '');

      badgeBar.innerHTML = emojiKeys.map(emoji => {
        const users = reactions[emoji] || [];
        const isReactedByMe = users.some(u => (typeof u === 'string' ? u : u.id).toLowerCase() === myId.toLowerCase());
        return `
          <div class="reaction-badge-pill ${isReactedByMe ? 'is-reacted-by-me' : ''}" data-emoji="${escapeHtml(emoji)}" title="${escapeHtml(users.join(', '))}">
            <span class="pill-emoji">${emoji}</span>
            <span class="pill-count">${users.length}</span>
          </div>
        `;
      }).join('');

      badgeBar.querySelectorAll('.reaction-badge-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          const emoji = pill.dataset.emoji;
          toggleMessageReaction(data.messageId, emoji);
        });
      });
    });

    socket.on('TC_MESSAGE_UPDATED', (updatedMsg) => {
      if (!updatedMsg) return;
      const el = document.querySelector(`[data-msg-id="${updatedMsg.id}"]`);
      if (el) {
        if (updatedMsg.isSeparator) {
          const textSpan = el.querySelector('.sep-text');
          if (textSpan) {
            textSpan.textContent = updatedMsg.sessionTitle || updatedMsg.message || 'Sesi Baru';
          }
        } else {
          const contentDiv = el.querySelector('.msg-content');
          if (contentDiv) {
            contentDiv.textContent = updatedMsg.message || updatedMsg.text || '';
          }
        }
      }
    });

    socket.on('TC_CHAT_CLEARED', () => {
      const container = document.getElementById('chat-messages');
      if (container) container.innerHTML = '';
    });

    socket.on('TC_ERROR', (err) => {
      if (err && err.message) showAlertDialog({ title: 'Terjadi Kesalahan', message: err.message });
    });

    // === 5. TIMER CONTROLS ===
    function checkTimerControlPermission() {
      if (!isUserAdmin) {
        showAlertDialog({ title: 'Akses Ditolak', message: 'Hanya pengguna terotorisasi yang dapat mengubah atau mengontrol timer.' });
        return false;
      }
      return true;
    }

    document.getElementById('btn-timer-start').addEventListener('click', () => {
      if (!checkTimerControlPermission()) return;

      // Jika ada separator sesi yang siap (pending), kirimkan ke chat sekarang saat sesi dimulai
      if (pendingSessionSeparator) {
        socket.emit('TC_ADD_SEPARATOR', pendingSessionSeparator);
        pendingSessionSeparator = null;
      }

      socket.emit('TC_START_TIMER', {
        userEmail: currentUser ? currentUser.email : ''
      });
    });

    document.getElementById('btn-timer-pause').addEventListener('click', () => {
      if (!checkTimerControlPermission()) return;
      socket.emit('TC_PAUSE_TIMER', {
        userEmail: currentUser ? currentUser.email : ''
      });
    });

    document.getElementById('btn-timer-reset').addEventListener('click', () => {
      if (!checkTimerControlPermission()) return;
      socket.emit('TC_RESET_TIMER', {
        userEmail: currentUser ? currentUser.email : ''
      });
    });

    // Preset dropdown toggle & click outside
    const presetDropdownWrapper = document.getElementById('preset-dropdown-wrapper');
    const btnPresetDropdown = document.getElementById('btn-preset-dropdown');

    if (btnPresetDropdown && presetDropdownWrapper) {
      btnPresetDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        presetDropdownWrapper.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!presetDropdownWrapper.contains(e.target)) {
          presetDropdownWrapper.classList.remove('active');
        }
      });
    }

    // Preset pills click (baik yang di luar maupun di dalam dropdown)
    document.querySelectorAll('.preset-pill[data-sec]').forEach(pill => {
      pill.addEventListener('click', () => {
        if (presetDropdownWrapper) presetDropdownWrapper.classList.remove('active');
        if (!checkTimerControlPermission()) return;
        const sec = parseInt(pill.dataset.sec, 10);
        socket.emit('TC_SET_DURATION', {
          durationSeconds: sec,
          userEmail: currentUser ? currentUser.email : ''
        });
      });
    });

    // === 6. MODAL DURASI KUSTOM ELEGAN (Menggantikan window.prompt jelek) ===
    const customDurationModal = document.getElementById('custom-duration-modal');
    const customDurationInput = document.getElementById('custom-duration-input');
    const btnCustomDuration = document.getElementById('btn-custom-duration');
    const btnCloseDurationModal = document.getElementById('btn-close-duration-modal');
    const btnCancelCustomDuration = document.getElementById('btn-cancel-custom-duration');
    const btnConfirmCustomDuration = document.getElementById('btn-confirm-custom-duration');

    function openCustomDurationModal() {
      customDurationInput.value = '';
      customDurationModal.classList.add('active');
      setTimeout(() => customDurationInput.focus(), 150);
    }

    function closeCustomDurationModal() {
      customDurationModal.classList.remove('active');
    }

    btnCustomDuration.addEventListener('click', openCustomDurationModal);
    btnCloseDurationModal.addEventListener('click', closeCustomDurationModal);
    btnCancelCustomDuration.addEventListener('click', closeCustomDurationModal);

    function submitCustomDuration() {
      const val = customDurationInput.value.trim();
      if (!val) return;
      let totalSec = 0;
      if (val.toLowerCase().endsWith('m')) {
        totalSec = parseInt(val, 10) * 60;
      } else if (val.toLowerCase().endsWith('s')) {
        totalSec = parseInt(val, 10);
      } else {
        totalSec = parseInt(val, 10) * 60;
      }
      if (totalSec > 0) {
        socket.emit('TC_SET_DURATION', { durationSeconds: totalSec });
        closeCustomDurationModal();
      } else {
        showAlertDialog({ title: 'Format Tidak Valid', message: 'Format durasi tidak valid. Gunakan format seperti 7m atau 45s.' });
      }
    }

    btnConfirmCustomDuration.addEventListener('click', submitCustomDuration);
    customDurationInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitCustomDuration();
      if (e.key === 'Escape') closeCustomDurationModal();
    });

    // === 7. CONTEXT MENU LOGIC ===
    const timerCard = document.getElementById('timer-card');
    const ctxMenu = document.getElementById('timer-context-menu');
    const btnMobilePreset = document.getElementById('btn-mobile-preset');

    function showContextMenu(x, y) {
      const menuWidth = 220;
      const menuHeight = 280;
      const posX = Math.min(x, window.innerWidth - menuWidth - 10);
      const posY = Math.min(y, window.innerHeight - menuHeight - 10);

      ctxMenu.style.left = `${Math.max(10, posX)}px`;
      ctxMenu.style.top = `${Math.max(10, posY)}px`;
      ctxMenu.classList.add('active');
    }

    timerCard.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e.clientX, e.clientY);
    });

    btnMobilePreset.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = btnMobilePreset.getBoundingClientRect();
      showContextMenu(rect.left, rect.bottom + 6);
    });

    document.addEventListener('click', (e) => {
      if (!ctxMenu.contains(e.target) && e.target !== btnMobilePreset) {
        ctxMenu.classList.remove('active');
      }
    });

    ctxMenu.querySelectorAll('.context-item[data-sec]').forEach(item => {
      item.addEventListener('click', () => {
        const sec = parseInt(item.dataset.sec, 10);
        socket.emit('TC_SET_DURATION', { durationSeconds: sec });
        ctxMenu.classList.remove('active');
      });
    });

    document.getElementById('ctx-custom').addEventListener('click', () => {
      ctxMenu.classList.remove('active');
      openCustomDurationModal();
    });

    // === 8. CHAT & FONT RESIZER ===
    const fontResizerButtons = document.querySelectorAll('.btn-font-scale');
    fontResizerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        fontResizerButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.documentElement.style.setProperty('--chat-font-size', btn.dataset.size);
      });
    });

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-messages');

    // Guest vs Login elements
    const guestNameBar = document.getElementById('guest-name-bar');
    const guestNameInput = document.getElementById('guest-name-input');
    const guestNameWarning = document.getElementById('guest-name-warning');
    const chatToolsGroup = document.getElementById('chat-tools-group');
    const charLimitCount = document.getElementById('char-limit-count');
    const cooldownIndicator = document.getElementById('cooldown-indicator');
    const cooldownSecondsEl = document.getElementById('cooldown-seconds');
    const btnSendChat = document.getElementById('btn-send-chat');

    // Emoji, Sticker & Media elements
    const btnOpenEmoji = document.getElementById('btn-open-emoji');
    const btnOpenSticker = document.getElementById('btn-open-sticker');
    const btnOpenMedia = document.getElementById('btn-open-media');
    const emojiPickerPanel = document.getElementById('emoji-picker-panel');
    const stickerPickerPanel = document.getElementById('sticker-picker-panel');
    const emojiGridContainer = document.getElementById('emoji-grid-container');
    const stickerGridContainer = document.getElementById('sticker-grid-container');
    const btnCloseEmojiPicker = document.getElementById('btn-close-emoji-picker');
    const btnCloseStickerPicker = document.getElementById('btn-close-sticker-picker');
    const btnCreateSticker = document.getElementById('btn-create-sticker');
    const chatFileInput = document.getElementById('chat-file-input');
    const stickerFileInput = document.getElementById('sticker-file-input');

    const mediaAttachmentPreview = document.getElementById('media-attachment-preview');
    const mediaPreviewImg = document.getElementById('media-preview-img');
    const mediaPreviewName = document.getElementById('media-preview-name');
    const btnRemoveMedia = document.getElementById('btn-remove-media');

    // Quote Attachment Preview Elements
    const chatQuoteBar = document.getElementById('chat-quote-bar');
    const quoteBarSender = document.getElementById('quote-bar-sender');
    const quoteBarText = document.getElementById('quote-bar-text');
    const btnCancelQuote = document.getElementById('btn-cancel-quote');

    // State Variables
    let currentAttachedMedia = null; // { url: base64/link, type: 'IMAGE' | 'STICKER', name: string }
    let activeQuoteMessage = null; // { id, userName, text }
    let guestCooldownRemaining = 0;
    let guestCooldownTimer = null;

    function setQuoteReply(quoteObj) {
      if (!quoteObj) return;
      activeQuoteMessage = {
        id: quoteObj.id,
        userName: quoteObj.userName || 'Peserta',
        text: (quoteObj.text || quoteObj.message || '').substring(0, 100)
      };
      if (chatQuoteBar && quoteBarSender && quoteBarText) {
        quoteBarSender.textContent = `Membalas ke ${activeQuoteMessage.userName}`;
        quoteBarText.textContent = activeQuoteMessage.text || 'Lampiran media';
        chatQuoteBar.style.display = 'flex';
      }
      if (chatInput) {
        chatInput.focus();
      }
    }

    function clearQuoteReply() {
      activeQuoteMessage = null;
      if (chatQuoteBar) {
        chatQuoteBar.style.display = 'none';
      }
    }

    if (btnCancelQuote) {
      btnCancelQuote.addEventListener('click', clearQuoteReply);
    }

    function toggleMessageReaction(messageId, emoji) {
      if (!messageId || !emoji) return;
      const myName = currentUser ? currentUser.displayName : ((guestNameInput && guestNameInput.value.trim()) || localStorage.getItem('tc_guest_name') || 'Peserta');
      const myEmail = currentUser ? currentUser.email : '';
      socket.emit('TC_TOGGLE_REACTION', {
        messageId,
        emoji,
        userName: myName,
        userEmail: myEmail,
        eventId: currentActiveEvent ? currentActiveEvent.id : null
      });
    }

    // Close actions menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.msg-actions-menu') && !e.target.closest('.btn-msg-more')) {
        document.querySelectorAll('.msg-actions-menu.active').forEach(m => m.classList.remove('active'));
      }
    });

    // Helper: Validasi status aktif/disabled chat input & tombol Kirim
    function updateChatInputDisableState() {
      const isGuest = !currentUser;
      const guestName = guestNameInput ? guestNameInput.value.trim() : '';

      if (isGuest && !guestName) {
        if (chatInput) {
          chatInput.disabled = true;
          chatInput.placeholder = 'Silakan isi nama Anda di atas terlebih dahulu...';
        }
      } else {
        if (chatInput) {
          chatInput.disabled = false;
          chatInput.placeholder = isGuest
            ? 'Ketik pesan obrolan (maksimal 150 karakter)...'
            : 'Tulis pesan obrolan (opsional jika melampirkan media/sticker)...';
        }
      }
    }

    // Helper: Validasi status aktif/disabled tombol Kirim
    function updateSendButtonState() {
      if (!btnSendChat) return;

      // Jika guest belum isi nama, tombol kirim otomatis disabled
      if (!currentUser) {
        const guestName = guestNameInput ? guestNameInput.value.trim() : '';
        if (!guestName || guestCooldownRemaining > 0) {
          btnSendChat.disabled = true;
          return;
        }
      }

      const hasText = !!(chatInput && chatInput.value.trim().length > 0);
      const hasMedia = !!currentAttachedMedia;

      // Disabled jika tidak ada teks dan tidak ada media attachment
      btnSendChat.disabled = !(hasText || hasMedia);
    }

    // Helper: Warning visual jika nama guest kosong
    let guestWarningTimer = null;
    function showGuestNameWarning(msg) {
      if (!guestNameBar) return;
      guestNameBar.classList.add('input-warning');
      if (guestNameWarning) {
        if (msg) {
          const span = guestNameWarning.querySelector('span');
          if (span) span.textContent = msg;
        }
        guestNameWarning.style.display = 'flex';
      }
      if (guestNameInput) {
        guestNameInput.focus();
      }
      if (guestWarningTimer) clearTimeout(guestWarningTimer);
      guestWarningTimer = setTimeout(() => {
        clearGuestNameWarning();
      }, 5000);
    }

    function clearGuestNameWarning() {
      if (guestWarningTimer) clearTimeout(guestWarningTimer);
      if (guestNameBar) guestNameBar.classList.remove('input-warning');
      if (guestNameWarning) guestNameWarning.style.display = 'none';
    }

    // Restore guest name if saved
    try {
      const savedGuestName = localStorage.getItem('tc_guest_name');
      if (savedGuestName && guestNameInput) {
        guestNameInput.value = savedGuestName;
      }
    } catch (e) {}

    if (guestNameInput) {
      guestNameInput.addEventListener('input', () => {
        const val = guestNameInput.value.trim();
        if (val.length > 0) {
          clearGuestNameWarning();
        }
        try {
          if (val) {
            localStorage.setItem('tc_guest_name', val);
          } else {
            localStorage.removeItem('tc_guest_name');
          }
        } catch (e) {}
        updateChatInputDisableState();
        updateSendButtonState();
      });
    }

    // Update Chat Input Character Counter
    function updateCharCounter() {
      if (!chatInput || !charLimitCount) return;
      const maxLen = currentUser ? 500 : 150;
      const currentLen = chatInput.value.length;
      charLimitCount.textContent = `${currentLen}/${maxLen}`;
      if (currentLen >= maxLen) {
        charLimitCount.style.color = '#ef4444';
      } else {
        charLimitCount.style.color = '';
      }
    }

    chatInput.addEventListener('input', () => {
      updateCharCounter();
      updateSendButtonState();
    });

    // Apply Permissions based on Auth state
    function updateChatPermissionUI() {
      const isLoggedIn = !!currentUser;
      if (isLoggedIn) {
        // User Login: Full Access
        if (guestNameBar) guestNameBar.style.display = 'none';
        clearGuestNameWarning();
        if (chatToolsGroup) {
          chatToolsGroup.classList.remove('disabled');
          chatToolsGroup.querySelectorAll('.btn-chat-tool').forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
          });
          const btnEmoji = document.getElementById('btn-open-emoji');
          const btnSticker = document.getElementById('btn-open-sticker');
          const btnMedia = document.getElementById('btn-open-media');
          if (btnEmoji) btnEmoji.title = 'Pilih Emoji Cepat';
          if (btnSticker) btnSticker.title = 'Kirim Stiker & Buat Stiker Kustom';
          if (btnMedia) btnMedia.title = 'Lampirkan Gambar atau Screenshot';
        }
        chatInput.maxLength = 500;
        chatInput.placeholder = 'Tulis pesan obrolan (opsional jika melampirkan media/sticker)...';
        if (cooldownIndicator) cooldownIndicator.classList.remove('active');
        if (guestCooldownTimer) {
          clearInterval(guestCooldownTimer);
          guestCooldownTimer = null;
        }
      } else {
        // Guest (Belum Login): Chat Only, Name Required, 150 char limit, 15s cooldown
        if (guestNameBar) guestNameBar.style.display = 'flex';
        if (chatToolsGroup) {
          chatToolsGroup.classList.add('disabled');
          chatToolsGroup.querySelectorAll('.btn-chat-tool').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.4';
            btn.style.cursor = 'not-allowed';
          });
          const btnEmoji = document.getElementById('btn-open-emoji');
          const btnSticker = document.getElementById('btn-open-sticker');
          const btnMedia = document.getElementById('btn-open-media');
          if (btnEmoji) btnEmoji.title = 'Emoji hanya untuk pengguna yang telah login Google';
          if (btnSticker) btnSticker.title = 'Stiker hanya untuk pengguna yang telah login Google';
          if (btnMedia) btnMedia.title = 'Lampiran gambar hanya untuk pengguna yang telah login Google';
        }
        chatInput.maxLength = 150;
        chatInput.placeholder = 'Ketik pesan obrolan (maksimal 150 karakter)...';

        // Tutup picker jika terbuka
        if (emojiPickerPanel) emojiPickerPanel.classList.remove('active');
        if (stickerPickerPanel) stickerPickerPanel.classList.remove('active');
        clearAttachedMedia();
      }
      updateCharCounter();
      updateChatInputDisableState();
      updateSendButtonState();
    }

    // Populate Emojis
    const EMOJI_LIST = [
      '👍', '👏', '🔥', '🎉', '💡', '❤️', '🙌', '🚀', 
      '😊', '🤝', '⭐', '💯', '✨', '🏆', '🎯', '💪',
      '👀', '🙋‍♂️', '🙋‍♀️', '🙏', '⚡', '🌟', '🏅', '☕'
    ];

    if (emojiGridContainer) {
      emojiGridContainer.innerHTML = '';
      EMOJI_LIST.forEach(em => {
        const item = document.createElement('div');
        item.className = 'emoji-grid-item';
        item.textContent = em;
        item.addEventListener('click', () => {
          chatInput.value += em;
          chatInput.focus();
          updateCharCounter();
          updateSendButtonState();
        });
        emojiGridContainer.appendChild(item);
      });
    }

    // Sticker Presets (Educamp, TPM & Quality Badges)
    const PRESET_STICKERS = [
      {
        name: 'Educamp 2026',
        url: '/images/Logo%20Educamp%202026.png'
      },
      {
        name: 'Semangat Juara',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#f59e0b" stroke="#b45309" stroke-width="6"/><text x="50%" y="45%" text-anchor="middle" font-size="34">🔥</text><text x="50%" y="75%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#ffffff">SEMANGAT!</text></svg>')
      },
      {
        name: 'TPM Excellent',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect x="10" y="10" width="100" height="100" rx="20" fill="#0284c7" stroke="#0369a1" stroke-width="6"/><text x="50%" y="48%" text-anchor="middle" font-size="32">🏆</text><text x="50%" y="78%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="12" fill="#ffffff">TPM EXCELLENT</text></svg>')
      },
      {
        name: 'Good Job',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#10b981" stroke="#047857" stroke-width="6"/><text x="50%" y="48%" text-anchor="middle" font-size="34">👏</text><text x="50%" y="78%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#ffffff">GOOD JOB!</text></svg>')
      },
      {
        name: 'Question / Tanya',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#6366f1" stroke="#4338ca" stroke-width="6"/><text x="50%" y="48%" text-anchor="middle" font-size="34">❓</text><text x="50%" y="78%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#ffffff">Q&amp;A SESI</text></svg>')
      },
      {
        name: 'Zero Breakdown',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect x="10" y="10" width="100" height="100" rx="20" fill="#ef4444" stroke="#b91c1c" stroke-width="6"/><text x="50%" y="48%" text-anchor="middle" font-size="32">🛡️</text><text x="50%" y="78%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="11" fill="#ffffff">ZERO BREAKDOWN</text></svg>')
      }
    ];

    function getStickerStorageKey() {
      if (!currentUser) return null;
      const id = (currentUser.email || currentUser.uid || currentUser.displayName || '').trim().toLowerCase();
      return id ? `tc_custom_stickers_${id}` : null;
    }

    function getCustomStickers() {
      const key = getStickerStorageKey();
      if (!key) return [];
      try {
        return JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) {
        return [];
      }
    }

    function saveCustomSticker(stk) {
      if (!currentUser) {
        showAlertDialog({ title: 'Akses Dibatasi', message: 'Silakan login terlebih dahulu untuk menyimpan stiker.' });
        return false;
      }
      const key = getStickerStorageKey();
      if (!key) return false;

      try {
        const list = getCustomStickers();
        // Cek duplikasi url
        const exists = list.some(item => item.url === stk.url);
        if (exists) {
          showAlertDialog({ title: 'Stiker Tersedia', message: 'Stiker ini sudah ada di koleksi stiker akun Anda.' });
          return false;
        }

        const rawName = (stk.fullName || stk.name || 'Sticker').trim();
        const shortenedName = rawName.length > 5 ? rawName.substring(0, 5) + '...' : rawName;

        list.unshift({
          name: shortenedName,
          fullName: rawName,
          url: stk.url
        });
        // Batasi maksimal 20 custom stickers per user
        if (list.length > 20) list.pop();
        localStorage.setItem(key, JSON.stringify(list));
        return true;
      } catch (e) {
        console.error('Gagal menyimpan stiker:', e);
        return false;
      }
    }

    function deleteCustomSticker(url) {
      const key = getStickerStorageKey();
      if (!key) return;
      try {
        let list = getCustomStickers();
        list = list.filter(item => item.url !== url);
        localStorage.setItem(key, JSON.stringify(list));
        renderStickerGrid();
      } catch (e) {}
    }

    // Expose helper secara global agar bisa dipanggil dari action menu / lightbox
    window.saveStickerToMySlot = function(stkUrl, stkName = 'Sticker') {
      if (!currentUser) {
        showAlertDialog({ title: 'Akses Dibatasi', message: 'Silakan login terlebih dahulu untuk menyimpan stiker ke slot Anda.' });
        return;
      }
      const success = saveCustomSticker({
        url: stkUrl,
        name: stkName,
        fullName: stkName
      });
      if (success) {
        renderStickerGrid();
        showAlertDialog({ title: 'Stiker Disimpan', message: 'Stiker berhasil disimpan ke slot stiker akun Anda!' });
      }
    };

    function renderStickerGrid() {
      if (!stickerGridContainer) return;
      stickerGridContainer.innerHTML = '';
      
      const customList = getCustomStickers();
      const allStickers = [...customList, ...PRESET_STICKERS];

      allStickers.forEach(stk => {
        const item = document.createElement('div');
        item.className = 'sticker-grid-item';
        const rawName = (stk.fullName || stk.name || 'Sticker').trim();
        const displayName = rawName.length > 5 ? rawName.substring(0, 5) + '...' : rawName;
        item.title = rawName;

        const isCustom = customList.some(c => c.url === stk.url);

        item.innerHTML = `
          ${isCustom ? `
          <button type="button" class="btn-del-sticker" title="Hapus dari koleksi">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 10px; height: 10px; pointer-events: none;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>` : ''}
          <img src="${stk.url}" alt="${displayName}" loading="lazy">
          <span>${displayName}</span>
        `;

        if (isCustom) {
          const btnDel = item.querySelector('.btn-del-sticker');
          if (btnDel) {
            btnDel.addEventListener('click', async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const ok = await showConfirmDialog({
                title: 'Hapus Stiker',
                message: `Apakah Anda yakin ingin menghapus stiker "${rawName}" dari koleksi akun Anda?`,
                confirmText: 'Hapus Stiker'
              });
              if (ok) {
                deleteCustomSticker(stk.url);
              }
            });
          }
        }

        item.addEventListener('click', () => {
          if (!currentUser) {
            showAlertDialog({ title: 'Akses Dibatasi', message: 'Silakan login Google terlebih dahulu untuk mengirim stiker.' });
            return;
          }
          currentAttachedMedia = {
            url: stk.url,
            type: 'STICKER',
            name: displayName
          };
          renderMediaPreview();
          if (stickerPickerPanel) stickerPickerPanel.classList.remove('active');
        });
        stickerGridContainer.appendChild(item);
      });
    }

    renderStickerGrid();

    // Trigger Bikin Sticker Sendiri (PNG / GIF Only)
    if (btnCreateSticker) {
      btnCreateSticker.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentUser) {
          showAlertDialog({ title: 'Akses Dibatasi', message: 'Fitur Buat Stiker hanya tersedia bagi pengguna yang telah login Google.' });
          return;
        }
        if (stickerFileInput) stickerFileInput.click();
      });
    }

    // Helper: Resize & Crop Sticker ke Ukuran Kecil (Max 160x160 px, PNG / GIF Only)
    function processStickerFile(file) {
      return new Promise((resolve, reject) => {
        const validTypes = ['image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
          return reject(new Error('Format stiker hanya diperbolehkan file PNG atau GIF transparan!'));
        }

        // Jika GIF animasi, pertahankan format dan batasi ukuran file maksimal 1 MB
        if (file.type === 'image/gif') {
          if (file.size > 1.5 * 1024 * 1024) {
            return reject(new Error('Ukuran file GIF animasi maksimal 1.5 MB agar ringan.'));
          }
          const reader = new FileReader();
          reader.onload = (e) => resolve({ dataUrl: e.target.result, name: file.name.replace(/\.[^/.]+$/, '') });
          reader.onerror = reject;
          reader.readAsDataURL(file);
          return;
        }

        // Jika PNG, lakukan kompresi & resize ke dimensi stiker kecil (maks 160x160 px)
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const maxDim = 160;
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const pngDataUrl = canvas.toDataURL('image/png');
            resolve({
              dataUrl: pngDataUrl,
              name: file.name.replace(/\.[^/.]+$/, '')
            });
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    if (stickerFileInput) {
      stickerFileInput.addEventListener('change', async () => {
        const file = stickerFileInput.files[0];
        if (!file) return;

        try {
          const result = await processStickerFile(file);
          const rawName = (result.name || 'Sticker').trim();
          const shortenedName = rawName.length > 5 ? rawName.substring(0, 5) + '...' : rawName;
          const newStk = {
            name: shortenedName,
            fullName: rawName,
            url: result.dataUrl
          };
          saveCustomSticker(newStk);
          renderStickerGrid();

          // Otomatis attach sticker yang baru dibuat
          currentAttachedMedia = {
            url: newStk.url,
            type: 'STICKER',
            name: newStk.name
          };
          renderMediaPreview();
          if (stickerPickerPanel) stickerPickerPanel.classList.remove('active');
          stickerFileInput.value = '';
        } catch (err) {
          showAlertDialog({ title: 'Gagal Membuat Stiker', message: err.message });
          stickerFileInput.value = '';
        }
      });
    }

    // Toggle Panels
    if (btnOpenEmoji) {
      btnOpenEmoji.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentUser) {
          showAlertDialog({ title: 'Akses Dibatasi', message: 'Emoji picker hanya tersedia bagi pengguna yang telah login Google.' });
          return;
        }
        if (stickerPickerPanel) stickerPickerPanel.classList.remove('active');
        if (emojiPickerPanel) emojiPickerPanel.classList.toggle('active');
      });
    }

    if (btnOpenSticker) {
      btnOpenSticker.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentUser) {
          showAlertDialog({ title: 'Akses Dibatasi', message: 'Fitur Stiker hanya tersedia bagi pengguna yang telah login Google.' });
          return;
        }
        if (emojiPickerPanel) emojiPickerPanel.classList.remove('active');
        if (stickerPickerPanel) stickerPickerPanel.classList.toggle('active');
      });
    }

    if (btnOpenMedia) {
      btnOpenMedia.addEventListener('click', () => {
        if (!currentUser) {
          showAlertDialog({ title: 'Akses Dibatasi', message: 'Fitur unggah media hanya tersedia bagi pengguna yang telah login Google.' });
          return;
        }
        chatFileInput.click();
      });
    }

    if (btnCloseEmojiPicker) {
      btnCloseEmojiPicker.addEventListener('click', () => emojiPickerPanel.classList.remove('active'));
    }
    if (btnCloseStickerPicker) {
      btnCloseStickerPicker.addEventListener('click', () => stickerPickerPanel.classList.remove('active'));
    }

    // Close pickers on click outside
    document.addEventListener('click', (e) => {
      if (emojiPickerPanel && emojiPickerPanel.classList.contains('active') && !emojiPickerPanel.contains(e.target) && e.target !== btnOpenEmoji) {
        emojiPickerPanel.classList.remove('active');
      }
      if (stickerPickerPanel && stickerPickerPanel.classList.contains('active') && !stickerPickerPanel.contains(e.target) && e.target !== btnOpenSticker) {
        stickerPickerPanel.classList.remove('active');
      }
    });

    // Helper: Kompresi Gambar Otomatis (Full Client-side Canvas Compression)
    function compressImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.75) {
      return new Promise((resolve, reject) => {
        // GIF dibiarkan agar animasinya tidak hilang
        if (file.type === 'image/gif') {
          const reader = new FileReader();
          reader.onload = (e) => resolve({ dataUrl: e.target.result, size: file.size });
          reader.onerror = reject;
          reader.readAsDataURL(file);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
              if (width / height > maxWidth / maxHeight) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              } else {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve({ dataUrl: compressedDataUrl, width, height });
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    // Handle Media File Selection (Kompresi Otomatis sebelum attach)
    if (chatFileInput) {
      chatFileInput.addEventListener('change', async () => {
        const file = chatFileInput.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
          showAlertDialog({ title: 'Format Tidak Didukung', message: 'Hanya file gambar yang diizinkan (PNG, JPG, WebP, GIF).' });
          chatFileInput.value = '';
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          showAlertDialog({ title: 'Ukuran Terlalu Besar', message: 'Ukuran file asli melebihi batas maksimal 10 MB.' });
          chatFileInput.value = '';
          return;
        }

        try {
          const compressed = await compressImageFile(file);
          currentAttachedMedia = {
            url: compressed.dataUrl,
            type: 'IMAGE',
            name: file.name
          };
          renderMediaPreview();
        } catch (err) {
          console.error('Gagal mengompresi gambar:', err);
          showAlertDialog({ title: 'Gagal Memproses Gambar', message: err.message });
        }
      });
    }

    // Handle Clipboard Paste Image (Ctrl+V / Paste gambar langsung ke chat)
    document.addEventListener('paste', async (e) => {
      const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          e.preventDefault();

          if (!currentUser) {
            showAlertDialog({ title: 'Akses Dibatasi', message: 'Fitur lampiran gambar hanya tersedia bagi pengguna yang telah login Google.' });
            return;
          }

          const file = item.getAsFile();
          if (!file) return;

          try {
            const compressed = await compressImageFile(file);
            currentAttachedMedia = {
              url: compressed.dataUrl,
              type: 'IMAGE',
              name: `Pasted_Image_${Date.now()}.jpg`
            };
            renderMediaPreview();
            if (chatInput) chatInput.focus();
          } catch (err) {
            console.error('Gagal memproses gambar dari clipboard:', err);
            showAlertDialog({ title: 'Gagal Memproses Gambar', message: err.message });
          }
          break;
        }
      }
    });

    function renderMediaPreview() {
      if (!mediaAttachmentPreview) return;
      if (currentAttachedMedia) {
        mediaPreviewImg.src = currentAttachedMedia.url;
        mediaPreviewName.textContent = currentAttachedMedia.name || 'Lampiran Gambar';
        mediaAttachmentPreview.classList.add('active');
      } else {
        mediaAttachmentPreview.classList.remove('active');
        mediaPreviewImg.src = '';
        mediaPreviewName.textContent = '';
      }
      updateSendButtonState();
    }

    function clearAttachedMedia() {
      currentAttachedMedia = null;
      if (chatFileInput) chatFileInput.value = '';
      renderMediaPreview();
      updateSendButtonState();
    }

    if (btnRemoveMedia) {
      btnRemoveMedia.addEventListener('click', clearAttachedMedia);
    }

    // Cooldown Timer Logic for Guests (15s)
    function startGuestCooldown() {
      guestCooldownRemaining = 15;
      if (cooldownIndicator) cooldownIndicator.classList.add('active');
      if (cooldownSecondsEl) cooldownSecondsEl.textContent = guestCooldownRemaining;
      updateSendButtonState();

      if (guestCooldownTimer) clearInterval(guestCooldownTimer);
      guestCooldownTimer = setInterval(() => {
        guestCooldownRemaining--;
        if (cooldownSecondsEl) cooldownSecondsEl.textContent = guestCooldownRemaining;
        if (guestCooldownRemaining <= 0) {
          clearInterval(guestCooldownTimer);
          guestCooldownTimer = null;
          if (cooldownIndicator) cooldownIndicator.classList.remove('active');
          updateSendButtonState();
        }
      }, 1000);
    }

    chatInput.addEventListener('focus', () => {
      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
        chatInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    });

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const text = chatInput.value.trim();
      const hasMedia = !!currentAttachedMedia;

      if (!text && !hasMedia) return;

      // 1. Validasi Guest (Non-Login)
      if (!currentUser) {
        const guestName = guestNameInput ? guestNameInput.value.trim() : '';
        if (!guestName) {
          showGuestNameWarning('Wajib isi nama Anda terlebih dahulu sebelum mengirim pesan!');
          return;
        }
        if (guestCooldownRemaining > 0) {
          showAlertDialog({
            title: 'Batas Kirim Pesan',
            message: `Mohon tunggu ${guestCooldownRemaining} detik lagi sebelum mengirim pesan berikutnya.`
          });
          return;
        }
      }

      // 2. Siapkan Payload
      const guestName = guestNameInput ? guestNameInput.value.trim() : 'Peserta';
      const payload = {
        eventId: currentActiveEvent ? currentActiveEvent.id : null,
        userName: currentUser ? currentUser.displayName : (guestName || 'Peserta'),
        userEmail: currentUser ? currentUser.email : '',
        userPhoto: currentUser ? currentUser.photoURL : null,
        role: isUserAdmin ? 'ADMIN' : (currentUser ? 'USER' : 'AUDIENCE'),
        message: text,
        text: text,
        mediaUrl: currentAttachedMedia ? currentAttachedMedia.url : null,
        mediaType: currentAttachedMedia ? currentAttachedMedia.type : null,
        quote: activeQuoteMessage ? { ...activeQuoteMessage } : null
      };

      // Emit typing stop on submit
      stopTypingIndicator();

      socket.emit('TC_SEND_MESSAGE', payload);

      // 3. Reset Input
      chatInput.value = '';
      clearAttachedMedia();
      clearQuoteReply();
      updateCharCounter();
      updateSendButtonState();

      // 4. Guest 15s Cooldown Activation
      if (!currentUser) {
        startGuestCooldown();
      }
    });

    // === TYPING INDICATOR BEHAVIOUR (VibeLocator Pattern) ===
    let typingTimeoutTimer = null;
    let isCurrentlyTypingSignal = false;
    let lastTypingTime = 0;

    const typingIndicatorBubble = document.getElementById('typing-indicator-bubble');
    const typingIndicatorText = document.getElementById('typing-indicator-text');
    let remoteTypingHideTimer = null;

    function emitTypingSignal() {
      const now = Date.now();
      if (!isCurrentlyTypingSignal || (now - lastTypingTime > 1500)) {
        isCurrentlyTypingSignal = true;
        lastTypingTime = now;
        const senderName = currentUser ? currentUser.displayName : (guestNameInput && guestNameInput.value.trim() ? guestNameInput.value.trim() : 'Peserta');
        socket.emit('TC_USER_TYPING', {
          userName: senderName,
          userEmail: currentUser ? currentUser.email : '',
          isTyping: true
        });
      }

      if (typingTimeoutTimer) clearTimeout(typingTimeoutTimer);
      typingTimeoutTimer = setTimeout(() => {
        stopTypingIndicator();
      }, 2500);
    }

    function stopTypingIndicator() {
      if (typingTimeoutTimer) clearTimeout(typingTimeoutTimer);
      if (isCurrentlyTypingSignal) {
        isCurrentlyTypingSignal = false;
        socket.emit('TC_USER_TYPING', {
          userName: currentUser ? currentUser.displayName : 'Peserta',
          userEmail: currentUser ? currentUser.email : '',
          isTyping: false
        });
      }
    }

    chatInput.addEventListener('input', () => {
      if (chatInput.value.trim().length > 0) {
        emitTypingSignal();
      } else {
        stopTypingIndicator();
      }
    });

    chatInput.addEventListener('blur', () => {
      stopTypingIndicator();
    });

    socket.on('TC_USER_TYPING', (data) => {
      if (!typingIndicatorBubble || !typingIndicatorText) return;
      if (data && data.isTyping) {
        const who = escapeHtml(data.userName || 'Seseorang');
        typingIndicatorText.textContent = `${who} sedang mengetik...`;
        typingIndicatorBubble.classList.add('active');

        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        if (remoteTypingHideTimer) clearTimeout(remoteTypingHideTimer);
        remoteTypingHideTimer = setTimeout(() => {
          typingIndicatorBubble.classList.remove('active');
        }, 3500);
      } else {
        if (remoteTypingHideTimer) clearTimeout(remoteTypingHideTimer);
        typingIndicatorBubble.classList.remove('active');
      }
    });

    // Tracking last rendered message for Smart Consecutive Grouping
    let lastRenderedMessage = null;

    function updateMessagesGrouping() {
      if (!chatContainer) return;
      const rows = Array.from(chatContainer.querySelectorAll('.chat-message-row'));
      if (rows.length === 0) return;

      rows.forEach((row, idx) => {
        const prevRow = rows[idx - 1];
        const nextRow = rows[idx + 1];

        const isOwn = row.classList.contains('is-own-message');
        const MAX_CONSECUTIVE_GAP_MS = 10 * 60 * 1000; // Reset ke bubble 1 jika jeda chat >= 10 menit

        let prevIsSame = false;
        if (prevRow && (prevRow.classList.contains('is-own-message') === isOwn) && 
            (prevRow.dataset.senderKey === row.dataset.senderKey)) {
          const prevTime = new Date(prevRow.dataset.timestamp || 0).getTime();
          const currTime = new Date(row.dataset.timestamp || 0).getTime();
          if (Math.abs(currTime - prevTime) < MAX_CONSECUTIVE_GAP_MS) {
            prevIsSame = true;
          }
        }

        let nextIsSame = false;
        if (nextRow && (nextRow.classList.contains('is-own-message') === isOwn) && 
            (nextRow.dataset.senderKey === row.dataset.senderKey)) {
          const nextTime = new Date(nextRow.dataset.timestamp || 0).getTime();
          const currTime = new Date(row.dataset.timestamp || 0).getTime();
          if (Math.abs(nextTime - currTime) < MAX_CONSECUTIVE_GAP_MS) {
            nextIsSame = true;
          }
        }

        row.classList.remove('is-standalone', 'is-first', 'is-middle', 'is-last', 'is-consecutive');

        const avatarCol = row.querySelector('.msg-avatar-col');

        if (!prevIsSame && !nextIsSame) {
          // STANDALONE MESSAGE
          row.classList.add('is-standalone');
          if (avatarCol) avatarCol.classList.remove('consecutive-hidden');
        } else if (!prevIsSame && nextIsSame) {
          // FIRST MESSAGE IN GROUP
          row.classList.add('is-first');
          if (avatarCol) avatarCol.classList.remove('consecutive-hidden');
        } else if (prevIsSame && nextIsSame) {
          // MIDDLE MESSAGE IN GROUP
          row.classList.add('is-middle', 'is-consecutive');
          if (avatarCol) avatarCol.classList.add('consecutive-hidden');
        } else if (prevIsSame && !nextIsSame) {
          // LAST MESSAGE IN GROUP
          row.classList.add('is-last', 'is-consecutive');
          if (avatarCol) avatarCol.classList.add('consecutive-hidden');
        }
      });
    }

    function renderChatMessages(messages) {
      if (!chatContainer) return;
      chatContainer.innerHTML = '';
      lastRenderedMessage = null;
      messages.forEach(msg => appendChatMessage(msg, false, false));
      updateMessagesGrouping();
    }

    function appendChatMessage(msg, isNew = false, triggerGrouping = true) {
      if (!chatContainer) return;

      // Handle Sesi Separator Khusus
      if (msg.isSeparator) {
        const sep = document.createElement('div');
        sep.className = 'chat-session-separator';
        sep.dataset.msgId = msg.id;
        sep.innerHTML = `
          <div class="separator-badge">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="sep-text">${escapeHtml(msg.sessionTitle || msg.message || 'Sesi Baru')}</span>
            <div class="sep-actions">
              <button class="btn-sep-action edit" title="Ubah nama separator" data-sep-id="${msg.id}">✎</button>
              <button class="btn-sep-action del" title="Hapus separator ini" data-sep-id="${msg.id}">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 11px; height: 11px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </div>
        `;

        // Separator Edit button
        const btnEditSep = sep.querySelector('.btn-sep-action.edit');
        if (btnEditSep) {
          btnEditSep.addEventListener('click', (e) => {
            e.stopPropagation();
            openEditSeparatorModal(msg);
          });
        }

        // Separator Delete button
        const btnDelSep = sep.querySelector('.btn-sep-action.del');
        if (btnDelSep) {
          btnDelSep.addEventListener('click', async (e) => {
            e.stopPropagation();
            const ok = await showConfirmDialog({
              title: 'Hapus Separator Sesi',
              message: `Apakah Anda yakin ingin menghapus separator "${msg.sessionTitle || msg.message || 'Sesi'}" dari obrolan?`,
              confirmText: 'Hapus Separator'
            });
            if (ok) {
              socket.emit('TC_DELETE_MESSAGE', {
                messageId: msg.id,
                eventId: currentActiveEvent ? currentActiveEvent.id : null,
                requesterEmail: currentUser ? currentUser.email : '',
                requesterName: currentUser ? currentUser.displayName : 'Operator',
                isAdmin: isUserAdmin
              });
            }
          });
        }

        chatContainer.appendChild(sep);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return;
      }

      const row = document.createElement('div');
      row.className = 'chat-message-row';
      row.dataset.msgId = msg.id;
      row.dataset.timestamp = msg.timestamp || new Date().toISOString();

      // WhatsApp-Style Consistent Author Name Colors
      const AUTHOR_COLORS = [
        '#38bdf8', '#fbbf24', '#34d399', '#f472b6', 
        '#a78bfa', '#fb923c', '#2dd4bf', '#e879f9', 
        '#4ade80', '#60a5fa', '#f87171', '#c084fc'
      ];
      function getAuthorColor(nameStr) {
        if (!nameStr) return AUTHOR_COLORS[0];
        let hash = 0;
        for (let i = 0; i < nameStr.length; i++) {
          hash = nameStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % AUTHOR_COLORS.length;
        return AUTHOR_COLORS[index];
      }

      function getInitials(name) {
        if (!name) return '??';
        const clean = name.replace(/[()\[\]{}]/g, '').trim();
        const parts = clean.split(/\s+/).filter(Boolean);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }

      const initials = getInitials(msg.userName || 'Peserta');
      const photoSrc = msg.userPhoto || msg.photoURL;
      const avatarHtml = photoSrc
        ? `<img src="${photoSrc}" alt="${escapeHtml(msg.userName || 'User')}" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.parentElement.textContent='${initials}';">`
        : initials;

      const isOperator = !msg.userEmail || msg.role === 'ADMIN';

      const guestInputVal = (guestNameInput && guestNameInput.value.trim()) || localStorage.getItem('tc_guest_name') || '';
      const msgEmail = (msg.userEmail || msg.email || '').trim().toLowerCase();
      const myEmail = (currentUser && currentUser.email ? currentUser.email : '').trim().toLowerCase();
      const myName = (currentUser && currentUser.displayName ? currentUser.displayName : '').trim().toLowerCase();
      const msgName = (msg.userName || msg.sender || '').trim().toLowerCase();
      
      const isSender = (myEmail && msgEmail && myEmail === msgEmail) ||
                       (myName && msgName && myName === msgName) ||
                       (!myEmail && !msgEmail && guestInputVal && msgName === guestInputVal.toLowerCase());

      const canDelete = isSender || isUserAdmin || isSuperAdmin;

      if (isSender) {
        row.classList.add('is-own-message');
      }

      // Quote reply block inside bubble if available
      let quoteHtml = '';
      if (msg.quote) {
        quoteHtml = `
          <div class="msg-quote-card">
            <div class="msg-quote-author">${escapeHtml(msg.quote.userName || 'Kutipan')}</div>
            <div class="msg-quote-snippet">${escapeHtml(msg.quote.text || '')}</div>
          </div>
        `;
      }

      // Check if message is soft deleted
      const isSoftDeleted = !!msg.isDeleted;
      if (isSoftDeleted) {
        row.classList.add('is-deleted');
      }

      let mediaHtml = '';
      if (msg.mediaUrl) {
        const authorSafe = escapeHtml(msg.userName || 'Peserta');
        if (msg.mediaType === 'STICKER') {
          row.classList.add('is-sticker-message');
          mediaHtml = `
            <div class="msg-sticker-wrapper" title="Klik untuk perbesar sticker">
              <img src="${msg.mediaUrl}" class="msg-sticker-attachment" alt="Sticker" onclick="openMediaLightbox(this.src, 'Sticker oleh ${authorSafe}')" loading="lazy">
            </div>
          `;
        } else {
          mediaHtml = `
            <div class="msg-media-attachment" title="Klik untuk perbesar / zoom gambar">
              <img src="${msg.mediaUrl}" alt="Media Chat" onclick="openMediaLightbox(this.src, 'Lampiran oleh ${authorSafe}')" loading="lazy">
            </div>
          `;
        }
      }

      let textHtml = '';
      if (isSoftDeleted) {
        const noticeText = msg.deleteNotice || msg.message || msg.text || 'Pesan telah dihapus';
        textHtml = `
          <div class="msg-content">
            <div class="msg-deleted-notice">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg>
              <span>${escapeHtml(noticeText)}</span>
            </div>
          </div>
        `;
      } else if (msg.message || msg.text) {
        const rawContent = (msg.message || msg.text || '').trim();
        // Regex single emoji (1 s/d 2 unicode emoji standalone)
        const singleEmojiRegex = /^(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)(?:\u200D(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F))*$/u;
        const isSingleEmoji = singleEmojiRegex.test(rawContent);

        if (isSingleEmoji && !msg.quote && !msg.mediaUrl) {
          row.classList.add('is-single-emoji');
          textHtml = `
            <div class="msg-content single-emoji-content">
              <span class="animated-single-emoji">${escapeHtml(rawContent)}</span>
            </div>
          `;
        } else {
          textHtml = `<div class="msg-content">${escapeHtml(rawContent)}</div>`;
        }
      }

      // 3-Dots Vertical Trigger Button & Floating Menu
      const moreBtnHtml = !isSoftDeleted ? `
        <button class="btn-msg-more" title="Opsi pesan" data-msg-id="${msg.id}">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
        <div class="msg-actions-menu" id="menu-${msg.id}">
          <div class="msg-quick-emojis">
            <button class="btn-quick-emoji" data-emoji="👍" title="Suka">👍</button>
            <button class="btn-quick-emoji" data-emoji="❤️" title="Hati">❤️</button>
            <button class="btn-quick-emoji" data-emoji="😂" title="Tertawa">😂</button>
            <button class="btn-quick-emoji" data-emoji="😮" title="Terkejut">😮</button>
            <button class="btn-quick-emoji" data-emoji="😢" title="Sedih">😢</button>
            <button class="btn-quick-emoji" data-emoji="🙏" title="Terima kasih">🙏</button>
          </div>
          <button class="msg-action-item action-quote" data-msg-id="${msg.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
            <span>Kutip / Balas</span>
          </button>
          <button class="msg-action-item action-copy" data-msg-id="${msg.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            <span>Salin Teks</span>
          </button>
          ${msg.mediaUrl && msg.mediaType === 'STICKER' ? `
          <button class="msg-action-item action-save-sticker" data-msg-id="${msg.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>
            <span>Simpan Stiker</span>
          </button>
          ` : ''}
          ${canDelete ? `
          <button class="msg-action-item danger action-delete" data-msg-id="${msg.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            <span>Hapus Pesan</span>
          </button>
          ` : ''}
        </div>
      ` : '';

      // Reaction badges bar
      let reactionBadgesHtml = '';
      if (!isSoftDeleted && msg.reactions && typeof msg.reactions === 'object') {
        const emojiKeys = Object.keys(msg.reactions);
        if (emojiKeys.length > 0) {
          const myId = (currentUser && currentUser.email ? currentUser.email : '') ||
                       (currentUser && currentUser.displayName ? currentUser.displayName : '') ||
                       ((guestNameInput && guestNameInput.value.trim()) || localStorage.getItem('tc_guest_name') || '');
          const badgeItems = emojiKeys.map(emoji => {
            const users = msg.reactions[emoji] || [];
            if (users.length === 0) return '';
            const isReactedByMe = users.some(u => (typeof u === 'string' ? u : u.id).toLowerCase() === myId.toLowerCase());
            return `
              <div class="reaction-badge-pill ${isReactedByMe ? 'is-reacted-by-me' : ''}" data-emoji="${escapeHtml(emoji)}" title="${escapeHtml(users.join(', '))}">
                <span class="pill-emoji">${emoji}</span>
                <span class="pill-count">${users.length}</span>
              </div>
            `;
          }).join('');
          if (badgeItems.trim()) {
            reactionBadgesHtml = `<div class="msg-reactions-badge-bar">${badgeItems}</div>`;
          }
        }
      }

      // Smart Consecutive Message Grouping (VibeLocator Behaviour)
      let isConsecutive = false;
      if (lastRenderedMessage && !lastRenderedMessage.isSeparator) {
        const sameUser = (lastRenderedMessage.userName === msg.userName) &&
                         (lastRenderedMessage.userEmail === msg.userEmail);
        const timeDiffMs = Math.abs(new Date(msg.timestamp) - new Date(lastRenderedMessage.timestamp));
        // Reset ke bubble 1 jika jeda chat >= 10 menit (600.000 ms)
        if (sameUser && timeDiffMs < 600000) {
          isConsecutive = true;
          row.classList.add('is-consecutive');
        }
      }
      lastRenderedMessage = msg;

      const timeFormatted = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

      const authorColorStyle = isSender ? '' : `style="color: ${getAuthorColor(msg.userName || 'Peserta')} !important;"`;

      row.innerHTML = `
        <div class="msg-avatar-col ${isConsecutive ? 'consecutive-hidden' : ''}">
          <div class="msg-avatar">${avatarHtml}</div>
        </div>
        <div class="chat-bubble-card">
          ${moreBtnHtml}
          <div class="msg-meta">
            <span class="msg-author ${isOperator ? 'operator' : ''}" ${authorColorStyle}>${escapeHtml(msg.userName || 'Peserta')}</span>
          </div>
          ${quoteHtml}
          ${textHtml}
          ${!isSoftDeleted ? mediaHtml : ''}
          ${reactionBadgesHtml}
          <div class="msg-bottom-meta">
            <span class="msg-time-bottom">${timeFormatted}</span>
          </div>
        </div>
      `;

      // Event Listeners for 3-Dots Menu & Actions
      if (!isSoftDeleted) {
        const moreBtn = row.querySelector('.btn-msg-more');
        const actionsMenu = row.querySelector('.msg-actions-menu');

        if (moreBtn && actionsMenu) {
          moreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other open menus
            document.querySelectorAll('.msg-actions-menu.active').forEach(m => {
              if (m !== actionsMenu) m.classList.remove('active');
            });
            actionsMenu.classList.toggle('active');
          });

          // Action 1: Quick Emoji Reaction
          actionsMenu.querySelectorAll('.btn-quick-emoji').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              const emoji = btn.dataset.emoji;
              toggleMessageReaction(msg.id, emoji);
            });
          });

          // Action 2: Quote / Reply
          const btnQuote = actionsMenu.querySelector('.action-quote');
          if (btnQuote) {
            btnQuote.addEventListener('click', (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              setQuoteReply({
                id: msg.id,
                userName: msg.userName || 'Peserta',
                text: msg.message || msg.text || (msg.mediaUrl ? '[Lampiran Gambar]' : '')
              });
            });
          }

          // Action 3: Copy Text
          const btnCopy = actionsMenu.querySelector('.action-copy');
          if (btnCopy) {
            btnCopy.addEventListener('click', async (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              const textToCopy = msg.message || msg.text || '';
              if (!textToCopy) return;
              try {
                await navigator.clipboard.writeText(textToCopy);
                const originalLabel = btnCopy.querySelector('span').textContent;
                btnCopy.querySelector('span').textContent = 'Tersalin!';
                setTimeout(() => {
                  btnCopy.querySelector('span').textContent = originalLabel;
                }, 1500);
              } catch (err) {
                console.error('Gagal menyalin:', err);
              }
            });
          }

          // Action: Save Sticker to My Slot
          const btnSaveStk = actionsMenu.querySelector('.action-save-sticker');
          if (btnSaveStk && msg.mediaUrl) {
            btnSaveStk.addEventListener('click', (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              window.saveStickerToMySlot(msg.mediaUrl, 'Stiker');
            });
          }

          // Action 4: Delete Message (Soft delete)
          const btnDel = actionsMenu.querySelector('.action-delete');
          if (btnDel) {
            btnDel.addEventListener('click', async (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              const ok = await showConfirmDialog({
                title: 'Hapus Pesan Obrolan',
                message: 'Apakah Anda yakin ingin menghapus pesan obrolan ini?',
                confirmText: 'Hapus Pesan'
              });
              if (ok) {
                const myRole = isSuperAdmin ? 'Super Admin' : (isUserAdmin ? 'Admin' : 'Peserta');
                const myName = currentUser ? currentUser.displayName : (guestNameInput && guestNameInput.value.trim() ? guestNameInput.value.trim() : 'Peserta');
                socket.emit('TC_DELETE_MESSAGE', {
                  messageId: msg.id,
                  eventId: currentActiveEvent ? currentActiveEvent.id : null,
                  requesterEmail: currentUser ? currentUser.email : '',
                  requesterName: myName,
                  requesterRole: myRole,
                  isAdmin: !!(isUserAdmin || isSuperAdmin)
                });
              }
            });
          }
        }

        // Reaction Badge Pills Click
        row.querySelectorAll('.reaction-badge-pill').forEach(pill => {
          pill.addEventListener('click', (e) => {
            e.stopPropagation();
            const emoji = pill.dataset.emoji;
            toggleMessageReaction(msg.id, emoji);
          });
        });
      }

      row.dataset.senderKey = msgEmail || msgName || 'peserta';

      chatContainer.appendChild(row);

      if (triggerGrouping) {
        updateMessagesGrouping();
      }
      
      // Auto-scroll ke pesan terbaru dengan timeout agar rendering layout & font scale tuntas
      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight + 120;
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);

      // Jika pesan baru yang masuk (live), tandai highlight NEW
      if (isNew) {
        markMessageAsNew(row, msg.id);
      }
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text || '';
      return div.innerHTML;
    }

    // === 9. MULTI-EVENT MANAGEMENT MODAL (TAMPILAN RAPI DENGAN BUTTON PROPORSI) ===
    const eventModal = document.getElementById('event-modal');
    const btnOpenEventModal = document.getElementById('btn-open-event-modal');
    const btnCloseEventModal = document.getElementById('btn-close-event-modal');
    const modalEventList = document.getElementById('modal-event-list');
    const currentEventLabel = document.getElementById('current-event-label');
    const chatHeaderEvent = document.getElementById('chat-header-event');

    btnOpenEventModal.addEventListener('click', async () => {
      await loadEventsIntoModal();
      eventModal.classList.add('active');
    });

    btnCloseEventModal.addEventListener('click', () => {
      eventModal.classList.remove('active');
    });

    async function loadEventsIntoModal() {
      try {
        const res = await fetch('/api/timer-chat/events');
        const data = await res.json();
        modalEventList.innerHTML = '';
        data.events.forEach(evt => {
          const isActive = data.activeEvent && data.activeEvent.id === evt.id;
          const item = document.createElement('div');
          item.className = `event-item ${isActive ? 'active' : ''}`;
          item.innerHTML = `
            <div class="event-item-info">
              <strong class="event-item-title">${escapeHtml(evt.name)}</strong>
              <div class="event-item-meta">Tanggal: ${evt.date || '-'}</div>
            </div>
            <button class="btn-select-event">${isActive ? 'Aktif' : 'Pilih'}</button>
          `;
          item.addEventListener('click', () => {
            selectEvent(evt.id);
          });
          modalEventList.appendChild(item);
        });
      } catch (err) {
        console.error('Gagal memuat events', err);
      }
    }

    async function selectEvent(eventId) {
      socket.emit('TC_SELECT_EVENT', { eventId });
      eventModal.classList.remove('active');
    }

    function updateEventLabels(event) {
      if (!event) return;
      currentEventLabel.textContent = event.name;
      chatHeaderEvent.textContent = `Event: ${event.name}`;
    }

    document.getElementById('btn-submit-new-event').addEventListener('click', async () => {
      const nameInput = document.getElementById('new-event-name');
      const dateInput = document.getElementById('new-event-date');
      const name = nameInput.value.trim();
      const date = dateInput.value;
      if (!name) {
        showAlertDialog({ title: 'Data Belum Lengkap', message: 'Nama acara wajib diisi!' });
        return;
      }

      try {
        const res = await fetch('/api/timer-chat/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, date })
        });
        const result = await res.json();
        if (result.success) {
          nameInput.value = '';
          dateInput.value = '';
          await loadEventsIntoModal();
        }
      } catch (err) {
        showAlertDialog({ title: 'Gagal Membuat Acara', message: err.message });
      }
    });

    // === 10. FIREBASE GOOGLE AUTH & ROLE VERIFICATION ===
    async function initFirebaseAuth() {
      try {
        const res = await fetch('/api/auth/firebase-config');
        const config = await res.json();
        if (config && config.apiKey) {
          if (!firebase.apps.length) {
            firebase.initializeApp(config);
          }
          const auth = firebase.auth();

          auth.onAuthStateChanged(async (user) => {
            currentUser = user;
            if (user && user.email) {
              try {
                const roleRes = await fetch(`/api/auth/status?email=${encodeURIComponent(user.email)}`);
                const roleData = await roleRes.json();
                isUserAdmin = !!(roleData && (roleData.role === 'SUPER_ADMIN' || roleData.role === 'ADMIN' || roleData.role === 'GAME_MASTER' || roleData.isOwner));
                isSuperAdmin = !!(roleData && (roleData.role === 'SUPER_ADMIN' || roleData.isOwner));
              } catch (e) {
                isUserAdmin = false;
                isSuperAdmin = false;
              }
            } else {
              isUserAdmin = false;
              isSuperAdmin = false;
            }
            renderAuthUI(user);
            updateChatPermissionUI();
            updateTimerPermissionUI();
            renderStickerGrid();
            // Muat ulang obrolan agar pesan milik user yang baru login otomatis terformat sebagai is-own-message (hijau & kanan)
            try {
              const chatRes = await fetch(`/api/timer-chat/chat?eventId=${currentActiveEvent ? currentActiveEvent.id : ''}`);
              const chats = await chatRes.json();
              if (Array.isArray(chats)) {
                renderChatMessages(chats);
              }
            } catch (e) {}
          });

          document.getElementById('btn-google-login').addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).catch(err => {
              console.error('Login error', err);
              showAlertDialog({ title: 'Gagal Login Google', message: err.message });
            });
          });
        }
      } catch (err) {
        console.warn('Firebase config fetch skipped or failed', err);
      }
    }

    function renderAuthUI(user) {
      const authBox = document.getElementById('auth-box');
      if (!authBox) return;
      if (user) {
        authBox.innerHTML = `
          <div class="user-profile">
            <img src="${user.photoURL || '/images/Logo%20Educamp%202026.png'}" alt="${user.displayName || 'User'}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='/images/Logo%20Educamp%202026.png';">
            <span class="user-name-label">${user.displayName || user.email}</span>
            ${isUserAdmin ? '<span class="admin-badge-indicator" title="Admin Moderator">ADMIN</span>' : ''}
            <button class="btn-logout" id="btn-logout" title="Keluar">⎋</button>
          </div>
        `;
        document.getElementById('btn-logout').addEventListener('click', () => {
          firebase.auth().signOut();
        });
      } else {
        authBox.innerHTML = `
          <button class="btn-google-login" id="btn-google-login">
            <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/></svg>
            Login
          </button>
        `;
        document.getElementById('btn-google-login').addEventListener('click', () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider);
        });
      }
    }

    // === 11. MODAL KONFIRMASI CUSTOM ELEGAN (Pengganti confirm / prompt jelek) ===
    const confirmModal = document.getElementById('confirm-dialog-modal');
    const confirmModalTitle = document.getElementById('confirm-modal-title');
    const confirmModalMessage = document.getElementById('confirm-modal-message');
    const btnCloseConfirmModal = document.getElementById('btn-close-confirm-modal');
    const btnCancelConfirm = document.getElementById('btn-cancel-confirm');
    const btnAcceptConfirm = document.getElementById('btn-accept-confirm');
    let onConfirmAcceptCallback = null;

    function showConfirmDialog({ title = 'Konfirmasi Tindakan', message = 'Apakah Anda yakin?', confirmText = 'Hapus' }) {
      return new Promise((resolve) => {
        if (!confirmModal) {
          resolve(window.confirm(message));
          return;
        }

        confirmModalTitle.textContent = title;
        confirmModalMessage.textContent = message;
        btnAcceptConfirm.textContent = confirmText;

        onConfirmAcceptCallback = () => {
          closeConfirmDialog();
          resolve(true);
        };

        const onCancel = () => {
          closeConfirmDialog();
          resolve(false);
        };

        btnAcceptConfirm.onclick = onConfirmAcceptCallback;
        btnCancelConfirm.onclick = onCancel;
        btnCloseConfirmModal.onclick = onCancel;

        const onKeyDown = (e) => {
          if (e.key === 'Escape') {
            document.removeEventListener('keydown', onKeyDown);
            onCancel();
          } else if (e.key === 'Enter') {
            document.removeEventListener('keydown', onKeyDown);
            onConfirmAcceptCallback();
          }
        };
        document.addEventListener('keydown', onKeyDown);

        confirmModal.classList.add('active');
      });
    }

    function closeConfirmDialog() {
      if (confirmModal) confirmModal.classList.remove('active');
    }

    // Modal Input / Prompt Elegan (Pengganti window.prompt)
    const promptModal = document.getElementById('app-prompt-modal');
    const promptModalTitle = document.getElementById('app-prompt-modal-title');
    const promptModalMessage = document.getElementById('app-prompt-modal-message');
    const promptModalInput = document.getElementById('app-prompt-modal-input');
    const btnClosePromptModal = document.getElementById('btn-close-app-prompt-modal');
    const btnCancelPrompt = document.getElementById('btn-cancel-app-prompt');
    const btnAcceptPrompt = document.getElementById('btn-accept-app-prompt');

    function showPromptDialog({ title = 'Input Data', message = 'Masukkan nilai:', defaultValue = '', placeholder = '' }) {
      return new Promise((resolve) => {
        if (!promptModal || !promptModalInput) {
          resolve(window.prompt(message, defaultValue));
          return;
        }

        promptModalTitle.textContent = title;
        promptModalMessage.textContent = message;
        promptModalInput.value = defaultValue || '';
        promptModalInput.placeholder = placeholder || '';

        const closePrompt = () => {
          promptModal.classList.remove('active');
        };

        const onAccept = () => {
          const val = promptModalInput.value;
          closePrompt();
          resolve(val);
        };

        const onCancel = () => {
          closePrompt();
          resolve(null);
        };

        btnAcceptPrompt.onclick = onAccept;
        btnCancelPrompt.onclick = onCancel;
        if (btnClosePromptModal) btnClosePromptModal.onclick = onCancel;

        const onKeyDown = (e) => {
          if (e.key === 'Escape') {
            document.removeEventListener('keydown', onKeyDown);
            onCancel();
          } else if (e.key === 'Enter') {
            document.removeEventListener('keydown', onKeyDown);
            onAccept();
          }
        };
        document.addEventListener('keydown', onKeyDown);

        promptModal.classList.add('active');
        setTimeout(() => {
          promptModalInput.focus();
          promptModalInput.select();
        }, 50);
      });
    }

    // Modal Alert / Pemberitahuan Elegan (Pengganti window.alert)
    const alertModal = document.getElementById('app-alert-modal');
    const alertModalTitle = document.getElementById('app-alert-modal-title');
    const alertModalMessage = document.getElementById('app-alert-modal-message');
    const btnCloseAlertModal = document.getElementById('btn-close-app-alert-modal');
    const btnAcceptAlert = document.getElementById('btn-accept-app-alert');

    function showAlertDialog({ title = 'Pemberitahuan', message = '' }) {
      return new Promise((resolve) => {
        if (!alertModal) {
          window.alert(message);
          resolve();
          return;
        }

        alertModalTitle.textContent = title;
        alertModalMessage.textContent = message;

        const closeAlert = () => {
          alertModal.classList.remove('active');
          resolve();
        };

        btnAcceptAlert.onclick = closeAlert;
        if (btnCloseAlertModal) btnCloseAlertModal.onclick = closeAlert;

        const onKeyDown = (e) => {
          if (e.key === 'Escape' || e.key === 'Enter') {
            document.removeEventListener('keydown', onKeyDown);
            closeAlert();
          }
        };
        document.addEventListener('keydown', onKeyDown);

        alertModal.classList.add('active');
        setTimeout(() => {
          if (btnAcceptAlert) btnAcceptAlert.focus();
        }, 50);
      });
    }

    // Expose helpers & safe overrides
    window.showConfirmDialog = showConfirmDialog;
    window.showPromptDialog = showPromptDialog;
    window.showAlertDialog = showAlertDialog;

    // === 12. MODAL EDIT SEPARATOR SESI CHAT ===
    const sepModal = document.getElementById('separator-edit-modal');
    const editSepMsgId = document.getElementById('edit-sep-msg-id');
    const editSepTitle = document.getElementById('edit-sep-title');
    const btnCloseSepModal = document.getElementById('btn-close-sep-modal');
    const btnCancelSepModal = document.getElementById('btn-cancel-sep-modal');
    const btnSaveSepModal = document.getElementById('btn-save-sep-modal');

    function openEditSeparatorModal(msg) {
      if (!sepModal) return;
      editSepMsgId.value = msg.id;
      editSepTitle.value = msg.sessionTitle || msg.message || '';
      sepModal.classList.add('active');
      setTimeout(() => editSepTitle.focus(), 150);
    }

    function closeEditSeparatorModal() {
      if (sepModal) sepModal.classList.remove('active');
    }

    if (btnCloseSepModal) btnCloseSepModal.addEventListener('click', closeEditSeparatorModal);
    if (btnCancelSepModal) btnCancelSepModal.addEventListener('click', closeEditSeparatorModal);

    if (btnSaveSepModal) {
      btnSaveSepModal.addEventListener('click', () => {
        const msgId = editSepMsgId.value;
        const newTitle = editSepTitle.value.trim();
        if (!newTitle) {
          showAlertDialog({ title: 'Data Belum Lengkap', message: 'Judul sesi separator tidak boleh kosong.' });
          return;
        }

        socket.emit('TC_UPDATE_MESSAGE', {
          messageId: msgId,
          sessionTitle: newTitle,
          text: newTitle,
          eventId: currentActiveEvent ? currentActiveEvent.id : null,
          requesterEmail: currentUser ? currentUser.email : '',
          requesterName: currentUser ? currentUser.displayName : 'Operator',
          isAdmin: isUserAdmin
        });

        closeEditSeparatorModal();
      });
    }

    // === 12. DRAGGABLE SPLIT RESIZER FOR STUDIO WORKSPACE ===
    function initDraggableWorkspace() {
      const workspace = document.querySelector('.studio-workspace');
      const gutter = document.getElementById('gutter-resizer');
      if (!workspace || !gutter) return;

      // Restore saved split preference
      try {
        const savedSplit = localStorage.getItem('tc_studio_split');
        if (savedSplit && parseFloat(savedSplit) >= 25 && parseFloat(savedSplit) <= 75) {
          workspace.style.setProperty('--split-left', `${savedSplit}%`);
        }
      } catch (e) {}

      let isDragging = false;

      function onMouseDown(e) {
        if (window.innerWidth <= 920) return; // Nonaktif di mobile view
        isDragging = true;
        workspace.classList.add('is-resizing');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
      }

      function onMouseMove(e) {
        if (!isDragging) return;
        const rect = workspace.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const offsetLeft = clientX - rect.left;
        let percentage = (offsetLeft / rect.width) * 100;

        // Batasi range proporsi antara 30% dan 75%
        if (percentage < 30) percentage = 30;
        if (percentage > 75) percentage = 75;

        workspace.style.setProperty('--split-left', `${percentage.toFixed(2)}%`);
      }

      function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        workspace.classList.remove('is-resizing');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        try {
          const currentSplit = workspace.style.getPropertyValue('--split-left');
          if (currentSplit) {
            localStorage.setItem('tc_studio_split', parseFloat(currentSplit));
          }
        } catch (e) {}
      }

      gutter.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      gutter.addEventListener('touchstart', onMouseDown, { passive: true });
      window.addEventListener('touchmove', onMouseMove, { passive: true });
      window.addEventListener('touchend', onMouseUp);
    }

    // === 12B. DRAGGABLE VERTICAL RESIZER (ANTARA TIMER DAN RUNDOWN) ===
    function initDraggableTimerVertical() {
      const resizer = document.getElementById('horizontal-resizer');
      const timerCard = document.getElementById('timer-card');
      const stageCol = document.querySelector('.timer-stage-column');
      if (!resizer || !timerCard || !stageCol) return;

      // Restore saved timer height
      try {
        const savedHeight = localStorage.getItem('tc_timer_height');
        if (savedHeight && parseInt(savedHeight, 10) >= 160) {
          timerCard.style.height = `${parseInt(savedHeight, 10)}px`;
          timerCard.style.flex = 'none';
        }
      } catch (e) {}

      let isDraggingV = false;
      let startY = 0;
      let startHeight = 0;

      function onMouseDownV(e) {
        if (window.innerWidth <= 920) return;
        isDraggingV = true;
        stageCol.classList.add('is-resizing-v');
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        startHeight = timerCard.getBoundingClientRect().height;
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';
      }

      function onMouseMoveV(e) {
        if (!isDraggingV) return;
        const currentY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaY = currentY - startY;
        const colHeight = stageCol.getBoundingClientRect().height;
        
        let newHeight = startHeight + deltaY;
        const minHeight = 180;
        const maxHeight = colHeight * 0.72;

        if (newHeight < minHeight) newHeight = minHeight;
        if (newHeight > maxHeight) newHeight = maxHeight;

        timerCard.style.height = `${Math.round(newHeight)}px`;
        timerCard.style.flex = 'none';
      }

      function onMouseUpV() {
        if (!isDraggingV) return;
        isDraggingV = false;
        stageCol.classList.remove('is-resizing-v');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        try {
          const finalHeight = parseInt(timerCard.style.height, 10);
          if (finalHeight) {
            localStorage.setItem('tc_timer_height', finalHeight);
          }
        } catch (e) {}
      }

      resizer.addEventListener('mousedown', onMouseDownV);
      window.addEventListener('mousemove', onMouseMoveV);
      window.addEventListener('mouseup', onMouseUpV);

      resizer.addEventListener('touchstart', onMouseDownV, { passive: true });
      window.addEventListener('touchmove', onMouseMoveV, { passive: true });
      window.addEventListener('touchend', onMouseUpV);
    }

    initDraggableWorkspace();
    initDraggableTimerVertical();

    // === 13. THEME & BACKGROUND SWITCHER (LIGHT / DARK / OLED) ===
    function initThemeSwitcher() {
      const btnTheme = document.getElementById('btn-theme-switcher');
      const themeMenu = document.getElementById('theme-dropdown-menu');
      const themeLabel = document.getElementById('theme-label-indicator');
      const themeIcon = document.getElementById('theme-icon-indicator');
      if (!btnTheme || !themeMenu) return;

      const THEMES = {
        dark: {
          label: 'Dark',
          iconSvg: '<path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>'
        },
        light: {
          label: 'Light',
          iconSvg: '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>'
        },
        oled: {
          label: 'OLED',
          iconSvg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>'
        }
      };

      function applyTheme(themeKey) {
        const theme = THEMES[themeKey] ? themeKey : 'dark';
        if (theme === 'dark') {
          document.documentElement.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', theme);
        }

        if (themeLabel) themeLabel.textContent = THEMES[theme].label;
        if (themeIcon) themeIcon.innerHTML = THEMES[theme].iconSvg;

        themeMenu.querySelectorAll('.theme-menu-item').forEach(item => {
          if (item.dataset.theme === theme) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        try {
          localStorage.setItem('tc_app_theme', theme);
        } catch (e) {}
      }

      // Restore stored theme
      try {
        const savedTheme = localStorage.getItem('tc_app_theme') || 'dark';
        applyTheme(savedTheme);
      } catch (e) {
        applyTheme('dark');
      }

      btnTheme.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!themeMenu.contains(e.target) && e.target !== btnTheme) {
          themeMenu.classList.remove('active');
        }
      });

      themeMenu.querySelectorAll('.theme-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          const selected = item.dataset.theme;
          applyTheme(selected);
          themeMenu.classList.remove('active');
        });
      });
    }

    // === 14. ANTI-DISTRACTION (FOCUS MODE) CONTROLLER ===
    function initFocusMode() {
      const btnFocus = document.getElementById('btn-focus-mode');
      const focusLabel = document.getElementById('focus-mode-label');
      if (!btnFocus) return;

      function setFocusState(isActive) {
        if (isActive) {
          document.body.classList.add('focus-mode-active');
          btnFocus.classList.add('active');
          if (focusLabel) focusLabel.textContent = 'Fokus ON';
        } else {
          document.body.classList.remove('focus-mode-active');
          btnFocus.classList.remove('active');
          if (focusLabel) focusLabel.textContent = 'Fokus';
        }
        try {
          localStorage.setItem('tc_focus_mode', isActive ? 'true' : 'false');
        } catch (e) {}
      }

      // Restore saved focus preference
      try {
        const savedFocus = localStorage.getItem('tc_focus_mode') === 'true';
        setFocusState(savedFocus);
      } catch (e) {
        setFocusState(false);
      }

      btnFocus.addEventListener('click', () => {
        const isCurrentlyActive = document.body.classList.contains('focus-mode-active');
        setFocusState(!isCurrentlyActive);
      });

      // Delegated click pada media masking agar bisa di-unmask sementara jika diklik
      if (chatContainer) {
        chatContainer.addEventListener('click', (e) => {
          if (!document.body.classList.contains('focus-mode-active')) return;
          const maskTarget = e.target.closest('.msg-media-attachment, .msg-sticker-wrapper');
          if (maskTarget) {
            maskTarget.classList.toggle('revealed');
          }
        });
      }
    }

    // === 15. NEW CHAT HIGHLIGHT QUEUE (MAX 3 ITEMS, CONFIGURABLE TIMER) ===
    // Queue menyimpan array { msgId: string, element: HTMLElement, timer: TimeoutID, badgeEl: HTMLElement }
    const newChatQueue = [];
    let highlightDurationSec = 30;

    try {
      const savedDuration = localStorage.getItem('tc_highlight_duration_sec');
      if (savedDuration && !isNaN(savedDuration)) {
        highlightDurationSec = Math.max(5, Math.min(300, parseInt(savedDuration, 10)));
      }
    } catch (e) {}

    const cfgHighlightDurationInput = document.getElementById('cfg-highlight-duration');
    if (cfgHighlightDurationInput) {
      cfgHighlightDurationInput.value = highlightDurationSec;
      cfgHighlightDurationInput.addEventListener('change', () => {
        let val = parseInt(cfgHighlightDurationInput.value, 10);
        if (isNaN(val) || val < 5) val = 5;
        if (val > 300) val = 300;
        highlightDurationSec = val;
        cfgHighlightDurationInput.value = val;
        try {
          localStorage.setItem('tc_highlight_duration_sec', val);
        } catch (e) {}
      });
    }

    function markMessageAsNew(rowElement, msgId) {
      if (!rowElement) return;

      // 1. Jika queue sudah 3 item, hapus highlight item tertua lebih awal
      while (newChatQueue.length >= 3) {
        const oldest = newChatQueue.shift();
        removeNewHighlight(oldest);
      }

      // 2. Pasang class highlight dan badge 'NEW MESSAGES'
      rowElement.classList.add('is-new-chat');
      const msgMeta = rowElement.querySelector('.msg-meta');
      let badge = null;
      if (msgMeta && !msgMeta.querySelector('.badge-new-chat')) {
        badge = document.createElement('span');
        badge.className = 'badge-new-chat';
        badge.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg> NEW MESSAGES`;
        msgMeta.appendChild(badge);
      }

      // 3. Set timer otomatis sesuai konfigurasi admin untuk menghapus highlight
      const durationMs = highlightDurationSec * 1000;
      const timer = setTimeout(() => {
        const idx = newChatQueue.findIndex(item => item.msgId === msgId);
        if (idx !== -1) {
          const [removed] = newChatQueue.splice(idx, 1);
          removeNewHighlight(removed);
        }
      }, durationMs);

      // 4. Catat ke queue
      newChatQueue.push({
        msgId,
        element: rowElement,
        timer,
        badgeEl: badge
      });
    }

    function removeNewHighlight(item) {
      if (!item) return;
      if (item.timer) clearTimeout(item.timer);
      if (item.element) {
        item.element.classList.remove('is-new-chat');
      }
      if (item.badgeEl && item.badgeEl.parentElement) {
        item.badgeEl.remove();
      }
    }

    // === 14. USER MANAGEMENT (HAK AKSES TIMER & RUNDOWN - SUPER ADMIN ONLY) ===
    const userMgmtModal = document.getElementById('user-mgmt-modal');
    const btnOpenUserMgmt = document.getElementById('btn-open-user-mgmt');
    const btnCloseUserMgmt = document.getElementById('btn-close-user-mgmt');
    const userMgmtList = document.getElementById('user-mgmt-list');
    const newUserEmailInput = document.getElementById('new-user-email');
    const newUserNameInput = document.getElementById('new-user-name');
    const btnSubmitNewUser = document.getElementById('btn-submit-new-user');

    if (btnOpenUserMgmt) {
      btnOpenUserMgmt.addEventListener('click', async () => {
        if (!isSuperAdmin) {
          showAlertDialog({ title: 'Akses Ditolak', message: 'Hanya Super Admin yang berhak mengelola akses pengguna.' });
          return;
        }
        await loadUserMgmtList();
        if (userMgmtModal) userMgmtModal.classList.add('active');
      });
    }

    if (btnCloseUserMgmt) {
      btnCloseUserMgmt.addEventListener('click', () => {
        if (userMgmtModal) userMgmtModal.classList.remove('active');
      });
    }

    async function loadUserMgmtList() {
      if (!userMgmtList) return;
      try {
        const res = await fetch('/api/auth/admins');
        const data = await res.json();
        const users = data.users || [];
        userMgmtList.innerHTML = '';

        if (users.length === 0) {
          userMgmtList.innerHTML = '<div style="color: #64748b; font-size: 12px; text-align: center; padding: 12px;">Belum ada user terdaftar.</div>';
          return;
        }

        users.forEach(u => {
          const item = document.createElement('div');
          item.className = 'user-mgmt-item';
          const isSuper = u.role === 'SUPER_ADMIN' || u.isOwner;
          const isOwnerPermanent = u.email.toLowerCase() === 'nandang.dhe@gmail.com' || u.isOwner;

          item.innerHTML = `
            <div class="user-mgmt-info">
              <div class="user-mgmt-avatar">${(u.name || u.email).charAt(0).toUpperCase()}</div>
              <div class="user-mgmt-details">
                <span class="user-mgmt-name">${escapeHtml(u.name || u.email)}</span>
                <span class="user-mgmt-email">${escapeHtml(u.email)}</span>
              </div>
            </div>
            <div class="user-mgmt-actions">
              <span class="role-badge ${isSuper ? 'super' : 'admin'}">${isSuper ? 'SUPER ADMIN' : 'GAME MASTER'}</span>
              ${!isOwnerPermanent ? `
              <button class="btn-revoke-user" data-email="${u.email}" title="Cabut Akses">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 12px; height: 12px; margin-right: 4px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                <span>Hapus</span>
              </button>` : ''}
            </div>
          `;

          const revokeBtn = item.querySelector('.btn-revoke-user');
          if (revokeBtn) {
            revokeBtn.addEventListener('click', async (e) => {
              e.stopPropagation();
              const ok = await showConfirmDialog({
                title: 'Cabut Akses Pengguna',
                message: `Apakah Anda yakin ingin mencabut akses untuk ${u.email}? Pengguna tidak akan bisa lagi mengontrol timer atau rundown.`,
                confirmText: 'Cabut Akses'
              });
              if (ok) {
                try {
                  const delRes = await fetch(`/api/auth/admins/${encodeURIComponent(u.email)}`, { method: 'DELETE' });
                  const delData = await delRes.json();
                  if (delData.success) {
                    await loadUserMgmtList();
                  } else {
                    showAlertDialog({ title: 'Gagal Mencabut Akses', message: delData.error || 'Terjadi kesalahan' });
                  }
                } catch (err) {
                  showAlertDialog({ title: 'Gagal Mencabut Akses', message: err.message });
                }
              }
            });
          }

          userMgmtList.appendChild(item);
        });
      } catch (err) {
        console.error('Gagal memuat user admin:', err);
      }
    }

    if (btnSubmitNewUser) {
      btnSubmitNewUser.addEventListener('click', async () => {
        const email = newUserEmailInput.value.trim();
        const name = newUserNameInput.value.trim();
        if (!email || !email.includes('@')) {
          showAlertDialog({ title: 'Email Tidak Valid', message: 'Mohon masukkan alamat email Google yang valid.' });
          return;
        }

        try {
          const res = await fetch('/api/auth/admins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              name: name || email.split('@')[0],
              role: 'GAME_MASTER',
              admittedBy: currentUser ? currentUser.email : 'nandang.dhe@gmail.com'
            })
          });
          const result = await res.json();
          if (result.success) {
            newUserEmailInput.value = '';
            newUserNameInput.value = '';
            await loadUserMgmtList();
          } else {
            showAlertDialog({ title: 'Gagal Menambah User', message: result.error || 'Terjadi kesalahan' });
          }
        } catch (err) {
          showAlertDialog({ title: 'Gagal Menambah User', message: err.message });
        }
      });
    }

    // === 16. CHAT FONT RESIZER PERSISTENCE (LOCALSTORAGE) ===
    function initFontResizer() {
      const fontButtons = document.querySelectorAll('.btn-font-scale');
      if (!fontButtons.length) return;

      function setChatFontSize(size) {
        document.documentElement.style.setProperty('--chat-font-size', size);
        fontButtons.forEach(btn => {
          if (btn.dataset.size === size) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
        try {
          localStorage.setItem('tc_chat_font_size', size);
        } catch (e) {}
      }

      // Restore saved font size or default 15px
      try {
        const savedSize = localStorage.getItem('tc_chat_font_size') || '15px';
        setChatFontSize(savedSize);
      } catch (e) {
        setChatFontSize('15px');
      }

      fontButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const size = btn.dataset.size;
          if (size) setChatFontSize(size);
        });
      });
    }

    // Direct click handler for EXE download link
    const btnDownloadExe = document.getElementById('btn-download-exe');
    if (btnDownloadExe) {
      btnDownloadExe.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // === 17. INTERACTIVE MEDIA LIGHTBOX / ENLARGE VIEWER (ZOOM & PAN) ===
    let currentLightboxScale = 1;
    let currentLightboxTranslateX = 0;
    let currentLightboxTranslateY = 0;
    let isLightboxPanning = false;
    let lightboxStartX = 0;
    let lightboxStartY = 0;

    function initMediaLightbox() {
      const lightbox = document.getElementById('chat-media-lightbox');
      const img = document.getElementById('lightbox-image');
      const title = document.getElementById('lightbox-image-title');
      const zoomPct = document.getElementById('lightbox-zoom-pct');
      const btnZoomIn = document.getElementById('btn-lightbox-zoom-in');
      const btnZoomOut = document.getElementById('btn-lightbox-zoom-out');
      const btnZoomReset = document.getElementById('btn-lightbox-zoom-reset');
      const btnDownload = document.getElementById('btn-lightbox-download');
      const btnSaveSticker = document.getElementById('btn-lightbox-save-sticker');
      const btnClose = document.getElementById('btn-lightbox-close');
      const viewport = document.getElementById('lightbox-viewport');

      let currentLightboxMediaUrl = '';
      let currentLightboxMediaTitle = '';

      if (!lightbox || !img) return;

      function updateImageTransform() {
        img.style.transform = `translate(${currentLightboxTranslateX}px, ${currentLightboxTranslateY}px) scale(${currentLightboxScale})`;
        if (zoomPct) {
          zoomPct.textContent = `${Math.round(currentLightboxScale * 100)}%`;
        }
      }

      function resetZoom() {
        currentLightboxScale = 1;
        currentLightboxTranslateX = 0;
        currentLightboxTranslateY = 0;
        updateImageTransform();
      }

      window.openMediaLightbox = function(url, imageTitle = 'Gambar Lampiran') {
        img.src = url;
        currentLightboxMediaUrl = url;
        currentLightboxMediaTitle = imageTitle;
        if (title) title.textContent = imageTitle;
        if (btnDownload) {
          btnDownload.href = url;
          btnDownload.setAttribute('download', `Educamp_${Date.now()}.png`);
        }

        // Tampilkan tombol Simpan Stiker jika media adalah stiker
        if (btnSaveSticker) {
          const isSticker = (imageTitle || '').toLowerCase().includes('sticker') || (imageTitle || '').toLowerCase().includes('stiker');
          btnSaveSticker.style.display = isSticker ? 'inline-flex' : 'none';
        }

        resetZoom();
        lightbox.style.display = 'flex';
        // Force reflow
        void lightbox.offsetWidth;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      };

      if (btnSaveSticker) {
        btnSaveSticker.addEventListener('click', () => {
          if (!currentUser) {
            showAlertDialog({ title: 'Akses Dibatasi', message: 'Silakan login terlebih dahulu untuk menyimpan stiker ke slot Anda.' });
            return;
          }
          if (currentLightboxMediaUrl) {
            window.saveStickerToMySlot(currentLightboxMediaUrl, 'Stiker');
          }
        });
      }

      function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
          lightbox.style.display = 'none';
          img.src = '';
          currentLightboxMediaUrl = '';
          currentLightboxMediaTitle = '';
          document.body.style.overflow = '';
        }, 200);
      }

      if (btnClose) btnClose.addEventListener('click', closeLightbox);

      // Close on backdrop click (outside image)
      viewport.addEventListener('click', (e) => {
        if (e.target === viewport) {
          closeLightbox();
        }
      });

      // Keyboard shortcut (Escape to close, +/- to zoom)
      window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === '+' || e.key === '=') {
          zoomIn();
        } else if (e.key === '-' || e.key === '_') {
          zoomOut();
        } else if (e.key === '0') {
          resetZoom();
        }
      });

      function zoomIn() {
        currentLightboxScale = Math.min(5, currentLightboxScale + 0.35);
        updateImageTransform();
      }

      function zoomOut() {
        currentLightboxScale = Math.max(0.4, currentLightboxScale - 0.35);
        if (currentLightboxScale <= 1) {
          currentLightboxTranslateX = 0;
          currentLightboxTranslateY = 0;
        }
        updateImageTransform();
      }

      if (btnZoomIn) btnZoomIn.addEventListener('click', zoomIn);
      if (btnZoomOut) btnZoomOut.addEventListener('click', zoomOut);
      if (btnZoomReset) btnZoomReset.addEventListener('click', resetZoom);

      // Mouse Wheel Zoom
      viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }, { passive: false });

      // Pan / Drag image when zoomed
      viewport.addEventListener('mousedown', (e) => {
        if (currentLightboxScale <= 1 && e.target !== img) return;
        isLightboxPanning = true;
        viewport.classList.add('is-panning');
        lightboxStartX = e.clientX - currentLightboxTranslateX;
        lightboxStartY = e.clientY - currentLightboxTranslateY;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isLightboxPanning) return;
        currentLightboxTranslateX = e.clientX - lightboxStartX;
        currentLightboxTranslateY = e.clientY - lightboxStartY;
        updateImageTransform();
      });

      window.addEventListener('mouseup', () => {
        if (isLightboxPanning) {
          isLightboxPanning = false;
          viewport.classList.remove('is-panning');
        }
      });

      // Touch pinch and pan
      let initialPinchDist = 0;
      let initialPinchScale = 1;

      viewport.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          isLightboxPanning = true;
          lightboxStartX = e.touches[0].clientX - currentLightboxTranslateX;
          lightboxStartY = e.touches[0].clientY - currentLightboxTranslateY;
        } else if (e.touches.length === 2) {
          isLightboxPanning = false;
          initialPinchDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          initialPinchScale = currentLightboxScale;
        }
      }, { passive: true });

      viewport.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isLightboxPanning) {
          currentLightboxTranslateX = e.touches[0].clientX - lightboxStartX;
          currentLightboxTranslateY = e.touches[0].clientY - lightboxStartY;
          updateImageTransform();
        } else if (e.touches.length === 2 && initialPinchDist > 0) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          currentLightboxScale = Math.max(0.4, Math.min(5, initialPinchScale * (dist / initialPinchDist)));
          updateImageTransform();
        }
      }, { passive: true });

      viewport.addEventListener('touchend', () => {
        isLightboxPanning = false;
        initialPinchDist = 0;
      });
    }

    initFontResizer();
    initThemeSwitcher();
    initFocusMode();
    initMediaLightbox();

    updateChatPermissionUI();
    updateTimerPermissionUI();

    initFirebaseAuth();

    // Helper for debugging / test simulation
    window.__simulateOtherMessage = function(name = 'Rina Wulandari (QC)', text = 'Halo tim, apakah materi sesi TPM Pillar sudah bisa diakses?', photo = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100') {
      appendChatMessage({
        id: 'sim-' + Date.now(),
        userName: name,
        userEmail: 'rina.wulandari@kalbenutritionals.com',
        userPhoto: photo,
        photoURL: photo,
        role: 'AUDIENCE',
        message: text,
        text: text,
        timestamp: new Date().toISOString()
      }, false);
    };
  
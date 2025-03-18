document.querySelectorAll(".audio-player").forEach(player => {
    const audio = player.querySelector("audio");
    const playPauseBtn = player.querySelector(".control-btn");
    const timeDisplay = player.querySelector(".timestamp");
    const progressBar = player.querySelector(".progress-bar");
    const progress = player.querySelector(".progress");
    const muteUnmuteBtn = player.querySelector(".volume-btn");

    // Play/Pause Toggle
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            // Pause all other players before playing the new one
            document.querySelectorAll("audio").forEach(a => {
                if (a !== audio) {
                    a.pause();
                    a.parentElement.querySelector(".control-btn").innerHTML = '<i class="fas fa-play"></i>';
                }
            });

            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Update Progress Bar and Time
    audio.addEventListener("timeupdate", () => {
        const currentTime = formatTime(audio.currentTime);
        const duration = formatTime(audio.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;

        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
    });

    // Seek Audio on Progress Bar Click
    progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / progressBar.clientWidth) * audio.duration;
        audio.currentTime = newTime;
    });

    // Mute/Unmute Toggle
    muteUnmuteBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
        muteUnmuteBtn.innerHTML = audio.muted
            ? '<i class="fas fa-volume-mute"></i>'
            : '<i class="fas fa-volume-up"></i>';
    });

    // Format Time Helper Function
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
});

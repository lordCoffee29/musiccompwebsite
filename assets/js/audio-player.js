const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const timeDisplay = document.getElementById("timeDisplay");
const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");
const muteUnmuteBtn = document.getElementById("muteUnmute");

// Play/Pause Toggle
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
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

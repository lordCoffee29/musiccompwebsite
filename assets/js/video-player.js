// Object to store all YouTube players
let youtubePlayers = {};

// Load YouTube API dynamically
function loadYouTubeAPI() {
    let script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
}

// YouTube API Callback: Replace `<iframe>` with API Player
function onYouTubeIframeAPIReady() {
    document.querySelectorAll(".video-container iframe").forEach((iframe, index) => {
        let videoId = iframe.src.split("/embed/")[1].split("?")[0]; // Extract video ID
        let container = iframe.parentElement;

        youtubePlayers[index] = new YT.Player(iframe, {
            events: {
                onReady: (event) => {
                    setupYouTubeControls(event.target, container);
                }
            }
        });
    });
}

// Setup Controls for YouTube Players
function setupYouTubeControls(player, container) {
    const playPauseBtn = container.parentElement.querySelector(".video-play-btn");
    const muteUnmuteBtn = container.parentElement.querySelector(".video-mute-btn");

    // Play/Pause Toggle
    playPauseBtn.addEventListener("click", () => {
        let state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            player.playVideo();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });

    // Mute/Unmute Toggle
    muteUnmuteBtn.addEventListener("click", () => {
        if (player.isMuted()) {
            player.unMute();
            muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            player.mute();
            muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
}

// Load YouTube API
loadYouTubeAPI();

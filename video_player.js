document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('myVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');

    if (video && playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                video.pause();
                playPauseBtn.textContent = 'Play';
            }
        });
    } else {
        console.error('Video element or Play/Pause button not found.');
    }
});

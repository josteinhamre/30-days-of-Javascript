const video = document.querySelector('video');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progress_filled = document.querySelector('.progress__filled');
const player_ranges = document.querySelectorAll('.player__slider');
const player_buttons = document.querySelectorAll('[data-skip]');

function togglePlay() {
    video.paused ? video.play() : video.pause() ;
};

function toggleButton() {
        toggle.innerHTML = video.paused ? "►" :"❚ ❚" ;
};

function updateProgress() {
    progress_filled.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
};

function jumpPlayhead(e) {
    if (e.buttons || e.type === "click") {
        video.currentTime = ((video.duration / 100) * ((e.offsetX / progress.clientWidth) * 100));
    };
};

function rangeChange(e) {
    video[this.name] = this.value;
};

function skipTo() {
    video.currentTime += parseFloat(this.dataset.skip);
};

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', jumpPlayhead);
progress.addEventListener('mousemove', jumpPlayhead);
player_ranges.forEach((range) => {
    range.addEventListener('change', rangeChange);
});
player_buttons.forEach((button) => {
    button.addEventListener('click', skipTo);
});
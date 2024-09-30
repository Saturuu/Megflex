


// Pauze and Unpauze video Functions:

const PlayPauseBtn = document.querySelector('.PlayPauseBtn');
const VideoContainer = document.querySelector(".VidContainer");
const video = document.querySelector("video");


video.addEventListener("click", togglePlay)

// Play/Pause:

function togglePlay() {
    video.paused ? video.play() : video.pause()
}

video.addEventListener("play", () => {
    VideoContainer.classList.remove("paused");
})

video.addEventListener("pause", () => {
    VideoContainer.classList.add("paused");
})





////// View modes //////



// Minimalize Function:

const MiniPlayerBtn = document.querySelector('.MiniPlayerBtn');
video.addEventListener("enterpictureinpicture", () => {
    VideoContainer.classList.add("mini-player");
})
video.addEventListener("leavepictureinpicture", () => {
    VideoContainer.classList.remove("mini-player");
})

function toggleMinimalizeMode() {
    if (VideoContainer.classList.contains("mini-player")) {
        document.exitPictureInPicture()
    } else {
        video.requestPictureInPicture()
    }
}



// Theater Function:

function toggleTheaterMode() {
    VideoContainer.classList.toggle("theater");
}




// FullScreen Function:

const FullScreenBtn = document.querySelector('.FullScreenBtn');

const TheaterBtn = document.querySelector('.TheaterBtn');
document.addEventListener("fullscreenchange", () => {
    VideoContainer.classList.toggle("full-screen", document.fullscreenElement);
})

function toggleFullScreenMode() {
    if (document.fullscreenElement == null) {
        VideoContainer.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
 



////// Volume //////

const volumeSlider = document.querySelector('.volumeSlider');
volumeSlider.addEventListener("input", e => {
    video.volume = e.target.value;
    video.muted = e.target.value === 0;
})

function toggleMute() {
    video.muted = !video.muted
}

video.addEventListener("volumechange", () => {
    volumeSlider.value = video.volume
    let VolumeLevel
    if (video.muted || video.volume === 0) {
        volumeSlider.value = 0
        VolumeLevel = "muted"
    } else if (video.volume >= 0.5) {
        VolumeLevel = "high"
    } else {
        VolumeLevel = "low"
    }

    VideoContainer.dataset.volumelevel = VolumeLevel
})




////// Time / Duration //////

const CurrentTime = document.querySelector('.CurrentTime');
const TotalTime = document.querySelector('.TotalTime');

video.addEventListener("loadeddata", () => {
    TotalTime.textContent = FormatDuration(video.duration);
})

video.addEventListener("timeupdate", () => {
    CurrentTime.textContent = FormatDuration(video.currentTime);
    const percent = video.currentTime / video.duration;
    TimelineContainer.style.setProperty("--progress-position", percent);
})

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2
})
function FormatDuration(time) {
    const Seconds = Math.floor(time % 60);
    const Minites = Math.floor(time / 60) % 60;
    const Hours = Math.floor(time / 3600);
    if (Hours === 0) {
        return `${Minites}:${leadingZeroFormatter.format(Seconds)}`
    } else {
        return `${Hours}:${leadingZeroFormatter.format(Minites)}:${leadingZeroFormatter.format(Seconds)}`
    }
}




/// key boards inputs ///

document.addEventListener("keydown", e =>{
    const tagName = document.activeElement.tagName.toLocaleLowerCase();
    if (tagName === "input") return
    switch (e.key.toLowerCase()) {
        case " ":
            if (tagName === "button") return
        case "k":
            togglePlay();
            break
        case "f":
            toggleFullScreenMode();
            break
        case "t":
            toggleTheaterMode();
            break
        case "i":
            toggleMinimalizeMode();
            break
        case "m":
            toggleMute();
            break
    }
})




////// Timeline //////

const PreviewIMG = document.querySelector(".PreviewIMG");
const ThumbnailIMG = document.querySelector(".ThumbnailIMG");
const TimelineContainer = document.querySelector(".TimelineContainer");

TimelineContainer.addEventListener("mousemove", HandleTimelineUpdate);
TimelineContainer.addEventListener("mousedown", toggleScrubbing);
document.addEventListener("mouseup", e => {
    if (isScrubbing) toggleScrubbing(e);
});
document.addEventListener("mousemove", e => {
    if (isScrubbing) HandleTimelineUpdate(e);
});

let isScrubbing = false;
let wasPaused = false;

function toggleScrubbing(e) {
    const rect = TimelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width ) / rect.width;
    isScrubbing = (e.buttons & 1) === 1;
    VideoContainer.classList.toggle("scrubbing", isScrubbing);
    if (isScrubbing) {
        wasPaused = video.paused
        video.paused
    } else {
        video.currentTime = percent * video.duration
        if (!wasPaused) video.play();
    }

    HandleTimelineUpdate(e);
}

function HandleTimelineUpdate(e) {
    const rect = TimelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width ) / rect.width;
    //const PreviewIMGNumber = Math.max(1, Math.floor((percent * video.duration) / 10));
    //const PreviewIMGsrc = `assets/previewImgs/preview${PreviewIMGNumber}.jpg`
    //PreviewIMG.src = PreviewIMGsrc
    TimelineContainer.style.setProperty("--preview-position", percent);

    if (isScrubbing) {
        e.preventDefault();
        //ThumbnailIMG.src = PreviewIMG
        TimelineContainer.style.setProperty("--progress-position", percent);
    }
}






////// toggle Settings Menu //////

const SettingsMenu = document.querySelector(".SettingsMenu");

function toggleSettingsMenu() {
    if (SettingsMenu.style.display === 'block') {
        SettingsMenu.style.display = 'none'
    } else {
        SettingsMenu.style.display = 'block'
    }
}
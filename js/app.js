const data = [{
        id: 0,
        type: "music",
        title: "controlla",
        album: "rainy evening ep",
        author: "Idealism",
        duration: "2:01",
        path: "Idealism.mp3",
        cover: "idealism.jpg",
        color: "rgba(0,0,0,1)"
    },
    {
        id: 1,
        type: "music",
        title: "perenne",
        album: "Chillhop Essentials Winter 2017",
        author: "Juan Rios",
        duration: "2:30",
        path: "Perenne.mp3",
        cover: "chillhop.jpg",
        color: "rgba(0,0,0,1)"
    }, {
        id: 2,
        type: "music",
        title: "Lemone Haze",
        album: "SP-Ecials",
        author: "emune, Mujo",
        duration: "1:14",
        path: "Lemon.mp3",
        cover: "specials.jpg",
        color: "rgba(0,0,0,1)"
    }, {
        id: 3,
        type: "music",
        title: "Old Roots New Trees",
        album: "Nest",
        author: "Made in M, Smuv",
        duration: "1:32",
        path: "Oldroots.mp3",
        cover: "nest.jpg",
        color: "rgba(0,0,0,1)"
    }, {
        id: 4,
        type: "music",
        title: "Cabin",
        album: "Clouds",
        author: "Bonnaz",
        duration: "1:10",
        path: "cabin.mp3",
        cover: "clouds.jpg",
        color: "rgba(0,0,0,1)"
    }, {
        id: 5,
        type: "music",
        title: "clr.sky",
        album: "luv.loops 2.5",
        author: "Miraa.",
        duration: "2:01",
        path: "clrsky.mp3",
        cover: "luv.jpg",
        color: "rgba(0,0,0,1)"
    }
]

/// Media info
const player = document.getElementById("player");
const mediaContainer = document.getElementById("playlist");
const mainTitle = document.getElementById("main-title");
const mainAlbum = document.getElementById("main-album");
const mainAuthor = document.getElementById("main-author");
const currentTitle = document.getElementById("current-title");
const currentAuthor = document.getElementById("current-author");
const mainTotal = document.getElementById("main-total");
const currentImg = document.getElementById("current-img");
mainTotal.innerText = data.length;

/// Controls

function minus() {
    player.currentTime -= 10;
}

function more() {
    player.currentTime += 10;
}

function play() {


    let btn = document.getElementById("playBtn");
    if (player.paused) {
        if (document.querySelectorAll("#player > source").length == 0) {
            playMedia(0);
        } else {
            player.play();
            btn.className = "svg-inline--fa fa-pause-circle fa-w-16";
            btn.setAttribute("data-icon", "pause-circle");
        }

    } else {
        player.pause();
        btn.className = "svg-inline--fa fa-play-circle fa-w-16";
        btn.setAttribute("data-icon", "play-circle");

    }
}

function back() {
    var currentId = parseInt(player.getAttribute("data-id"));

    currentId == 0 ? playMedia(data.length - 1) : playMedia(currentId - 1);
}

function next() {
    var currentId = parseInt(player.getAttribute("data-id"));
    currentId + 1 == data.length ? playMedia(0) : playMedia(currentId + 1);
}

/// Time duration

const durationSlider = document.getElementById("currentTime");

player.addEventListener('timeupdate', function () {
    let currentTime = Math.floor(player.currentTime);
    durationSlider.value = currentTime;
});

durationSlider.addEventListener("change", () => {
    player.currentTime = durationSlider.value;
}, false);


player.addEventListener("ended", () => {
    var currentId = parseInt(player.getAttribute("data-id"));
    currentId + 1 == data.length ? playMedia(0) : playMedia(currentId + 1);
}, false)

/// Volume

var storedVolume = parseFloat(localStorage.getItem("volume"));

player.volume = storedVolume;

const volumeSlider = document.getElementById("volumeRange");
volumeSlider.value = player.volume * 10;

volumeSlider.addEventListener("change", () => {
    player.volume = volumeSlider.value / 10;
    localStorage.setItem("volume", player.volume);

}, false);

volumeSlider.addEventListener("mousewheel", (e) => {
    if (e.deltaY > 0) {
        if (player.volume > 0.1) {
            player.volume -= 0.1;
        }
    } else {
        if (player.volume < 1.0) {
            player.volume += 0.1;
        }
    }
    volumeSlider.value = player.volume * 10;

    localStorage.setItem("volume", player.volume);
}, false);

function getMedia(id) {
    let divcontainer = document.createElement("div");
    data.forEach(e => {

        if (e.id == id) {
            divcontainer.className = "item-container media-item";
            divcontainer.setAttribute("data-id", e.id);
            var res = '<div class="item-id">' + e.id + '</div><div class="item-info"><div class="item-title">' + e.title + '</div><span class="item-author">' + e.author + '</span> · <span class="item-album">' + e.album + '</span></div><div class="item-duration">' + e.duration + '</div>';

            divcontainer.innerHTML = res;

            divcontainer.addEventListener("click", () => {

                playMedia(id);
            }, false);
        }
    });

    return divcontainer;
}


function playMedia(id) {

    var mediaItems = document.querySelectorAll(".item-container.media-item");
    mediaItems.forEach(element => {
        if (element.getAttribute("data-id") == id) {
            element.setAttribute("data-playing", "true");
        } else {
            element.removeAttribute("data-playing");
        }
    });

    data.forEach(e => {
        if (e.id == id) {

            let fullpath = "";
            e.type == "music" ? fullpath = "resources/music/" + e.path : fullpath = "resources/video/" + e.path;

            let source = document.createElement("source");
            source.setAttribute("src", fullpath);

            while (player.firstChild) {
                player.removeChild(player.firstChild);
            }

            player.appendChild(source);
            player.setAttribute("poster", "resources/posters/" + e.cover);

            mainTitle.innerText = e.title;
            mainAlbum.innerText = e.album;
            mainAuthor.innerText = e.author;
            currentTitle.innerText = e.title;
            currentAuthor.innerText = e.author;

            currentImg.setAttribute("src", "resources/posters/" + e.cover);

            let durationMin = Math.floor(parseFloat(e.duration.replace(":", ".")));
            let totalMinutos = parseInt(durationMin) * 60;
            let totalSegundos = totalMinutos + parseInt(e.duration.split(":")[1]);

            durationSlider.setAttribute("max", totalSegundos);

            player.load();
            player.play();

            let btn = document.getElementById("playBtn");

            player.play();
            btn.className = "svg-inline--fa fa-pause-circle fa-w-16";
            btn.setAttribute("data-icon", "pause-circle");

            player.setAttribute("data-id", e.id);

            document.title = e.title + " · " + e.album;
        }
    });


}

data.forEach(e => {
    mediaContainer.appendChild(getMedia(e.id));
});

 // adio 
 let audio = document.getElementById("audio"),
     audioPlay,
     playlist = [
    'ger.mp3',
];
let treck;
window.onload = function() {
    treck = 0;
};

function switchTreck (numTreck) {
    audio.src = playlist[numTreck];
    audio.currentTime = 0;
    audio.play();
}


window.addEventListener("click", function() {
    audio.play();
    audioPlay = setInterval(function() {
        let audioTime = Math.round(audio.currentTime);
        let audioLength = Math.round(audio.duration);
        if (audioTime == audioLength && treck < 3) {
            treck++;
            switchTreck(treck); 
        } else if (audioTime == audioLength && treck >= 3) {
            treck = 0; 
            switchTreck(treck); 
        }
    }, 10);
});
audio.volume = '0.04';
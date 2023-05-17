const sound = {

    initialize: function () {
        document.getElementById("sound-btn").addEventListener("touchstart", () => {
          let audioElm = document.getElementById("scratch-audio");
          audioElm.play();
          navigator.vibrate(3000);
        }, false);
    },

    playAudio: function(audioId) {
      //play audio
    },
};
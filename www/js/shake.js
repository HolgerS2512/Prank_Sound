const shake = {
    checkAccel: false,
    options: null,
    watchId: null,
    shaker: null,

    initialize: function () {
        $("#shake-btn").prop("checked", shake.checkAccel);
        $('#shake-btn').change(() => {
            shake.checkAccel = $('#shake-btn').prop('checked');
            if (shake.checkAccel === true) {
                function onSuccess(acceleration, accelerationIncludingGravity) {
                    if (acceleration < 5 && accelerationIncludingGravity < 5 || acceleration > 5 && accelerationIncludingGravity > 5) {
                        let audioElm = document.getElementById("scratch-audio");
                        audioElm.play();
                        navigator.vibrate(2000);
                        shake.shaker = true;
                    } else {
                        shake.shaker = false;
                    }
                    if (shake.shaker === false) {
                    //    play end sound
                    }
                    console.log('Acceleration X: ' + acceleration.x + '\n' +
                          'Acceleration Y: ' + acceleration.y + '\n' +
                          'Acceleration Z: ' + acceleration.z + '\n' +
                          'Timestamp: '      + acceleration.timestamp + '\n');
                };
                function onError() {
                    navigator.notification.alert('Error!' + '\n' + '\n' + 'Your accelerometer is not working or is disabled. Please check your settings!');
                };
                shake.options = { frequency: 500 }; // Update every 500ms
                shake.watchId = navigator.accelerometer.watchAcceleration(onSuccess, onError, shake.options);
                $(".finisher").css("display", "block");
            } else {
                navigator.accelerometer.clearWatch(shake.watchId);
                $(".finisher").css("display", "none");
            };
        });
    },

    playAudio: function(audioId) {
      //play audio
    },
};
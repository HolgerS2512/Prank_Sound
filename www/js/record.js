const record = {
    checkCamera: false,
    checkRecord: false,
    constrains: null,
    stream: null,
    currentdate: null,
    startTime: null,
    watchTimer: false,
    mediaRecorder: null,
    chunks: [],
    video: null,

    initialize: function() {

        document.getElementById("sound-btn").addEventListener("touchstart", () => {
            let audioElm = document.getElementById("video-audio");
            audioElm.play();
            navigator.vibrate(2000);
        },false);
        $("#record-btn").prop("checked", record.checkCamera);
        $("#record-btn").change(() => {
            record.checkCamera = $("#record-btn").prop("checked");
            if (record.checkCamera === true) {
                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                    navigator.notification.alert("Errror!" + "\n" + "\n" + "Media devices not supported!", function() {
                        console.log("alert success!");
                    });
                    return;
                }
                record.constrains = { video: true, audio: true, saveToPhotoAlbum: true};
                navigator.mediaDevices.getUserMedia(record.constrains)
                    .then((stream) => {
                        $(".share-btn").css("display", "none");
                        $("#port-class").css("display","block");
                        document.getElementById("port").srcObject = stream;
                        record.stream = stream;
                    })
                    .catch((err) => {
                        navigator.notification.alert("Error!" + "\n" + "\n" + err, function() {
                            console.log("alert success!");
                        });
                    });
            } else {
                  record.stream.getTracks().forEach((track) => {
                    if (track.readyState === "live") {
                      track.stop();
                    }
                  });
                $("#port-class").css("display", "none");
                $(".share-btn").css("display", "block");
                $(".recording").removeClass("active");
                $(".port-time").removeClass("active");
                $(".port-time-null").text("00:00:00");
            }
        });

        $("#recording").prop("checked", record.checkRecord);
        $("#recording").change(() => {
            record.checkRecord = $("#recording").prop("checked");
            if (record.checkRecord === true) {
                $(".recording").addClass("active");
                $(".port-time").addClass("active");
                $(".port-box").addClass("active");
                $("#backRecording-btn").addClass("active");
                record.watchTimer = true;
                this.updateClock();
                this.setTime();
                record.startTime = new Date();
                this.startRecording();
            } else {
                this.stopRecording();
                $(".recording").removeClass("active");
                $(".port-time").removeClass("active");
                $(".port-box").removeClass("active");
                $("#backRecording-btn").removeClass("active");
                $(".port-time-null").text("00:00:00");
                record.watchTimer = false;
            }
        })
    },

    setTime: function() {
        record.currentdate = new Date();
    },

    timer: function() {
        if (record.watchTimer === false) {
            return;
        }
        let newDate = new Date(record.currentdate - record.startTime);
        let showDurationH = newDate.getHours() -1;
        let showDurationM = newDate.getMinutes();
        let showDurationS = newDate.getSeconds();
        Number.prototype.pad = function (size) {
          let s = String(this);
          while (s.length < (size || 2)) {
            s = "0" + s;
          }
          return s;
        };
        $(".port-time-null").text((showDurationH).pad(2) + ":" + (showDurationM).pad(2) + ":" + (showDurationS).pad(2));
    },

    updateClock: function() {
        setInterval(this.setTime.bind(this), 250);
        setInterval(this.timer.bind(this), 250);
    },

    playAudio: function(audioId) {
      //play audio
    },

    startRecording: function() {
        record.mediaRecorder = new MediaRecorder(record.stream);
        record.mediaRecorder.start();
        record.mediaRecorder.ondataavailable = (e) => {
            record.chunks.push(e.data);
        };
    },

    stopRecording: function() {
        record.mediaRecorder.stop();
        record.mediaRecorder.onstop = (e) => {
        const blob = new Blob(record.chunks, { type: "video/mp4" });
        record.video = window.URL.createObjectURL(blob);
        this.saveFile(record.video);
        };
        // delete URL!
        //revokeObjectURL(objectURL);
    },

    saveFile: function(fileData) {
        navigator.camera.getPicture(function cameraSuccess(imageURI) {
            fileData.src = imageURI;
            this.createNewFileEntry(imageURI, "Prank_Sound_clip.video/mp4");
        }, function cameraError(message) {
                navigator.notification.alert("Failed because: " + message, function() {
                    console.log("alert success!");
                });
        }, () => {
            let options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.MPEG-4,
                mediaType: Camera.MediaType.ALLMEDIA,
                allowEdit: true,
                correctOrientation: true,
            };
            return options;
        });
    },

    createNewFileEntry: function(imgUri, fileName) {
        window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
            
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                this.writeFile(fileEntry, imgUri);
            }, onErrorCreateFile(err));

        }, onErrorResolveUrl(err));
    },

    writeFile: function(fileEntry, dataObj) {

        fileEntry.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function() {

                if (dataObj.type == "video/mp4") {
                    readBinaryFile(fileEntry);
                }
                else {
                    readFile(fileEntry);
                }
            };

            fileWriter.write(dataObj);
        });
    },

    onErrorCreateFile: function(err) {
        navigator.notification.alert("Error!" + "\n" + "\n" + err, function() {
            console.log('alert success!');
        });
    },

    onErrorResolveUrl: function(err) {
        navigator.notification.alert("Error!" + "\n" + "\n" + err, function() {
            console.log("alert success!");
        });
    },
};
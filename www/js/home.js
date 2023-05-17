const home = {
    checkWarning: false,
    initialize: function() {
        document.getElementById("link-sound").addEventListener("touchstart", this.onSound.bind(this), false);
        document.getElementById("link-shake").addEventListener("touchstart", this.onShake.bind(this), false);
        document.getElementById("link-record").addEventListener("touchstart", this.onRecord.bind(this), false);

        let checkWarning = sessionStorage.getItem(this.checkWarning);
        if (checkWarning === null) {
            home.checkWarning = checkWarning;
        } else if (home.checkWarning === true) {
            $('#warning').css('display', 'none');
        }
        $('#warning-btn').prop('checked', home.checkWarning);
        $('#warning-btn').change(() => {
            home.checkWarning = $('#warning-btn').prop('checked');
            sessionStorage.setItem(checkWarning, home.checkWarning);
            if (home.checkWarning === true) {
                sessionStorage.setItem(home.checkWarning, true);
                $('#warning').css('opacity', 0.1);
                setTimeout(() => {
                    $("#warning").css("display", "none");
                }, 360);
            }
        });
    },

    soundJs: function () {
      sound.initialize();
    },
    shakeJs: function () {
      shake.initialize();
    },
    recordJs: function () {
      record.initialize();
    },

    changeView: function (view, callBack) {
        let viewFilePath = "./content/" + view + ".html";
        $("#content").load(viewFilePath, null, callBack);
        $(".list").removeClass("active");
        $("#" + view).addClass("active");
    },

    onSound: function () {
        this.changeView("sound", this.soundJs);
    },
    onShake: function () {
        this.changeView("shake", this.shakeJs);
    },
    onRecord: function () {
        this.changeView("record", this.recordJs);
    },
};
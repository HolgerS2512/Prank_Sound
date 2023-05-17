/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
const app = {
  initialize: function () {
    setTimeout(() => {
      $(".splashscreen").fadeOut(1000, "linear");
    }, 1000);
    setTimeout(() => {
      $(".splashscreen").css("display", "none");
    },2000);
    this.changeView.bind(this);
    document.getElementById("home").addEventListener("touchstart", this.onHome.bind(this), false);
    document.getElementById("sound").addEventListener("touchstart", this.onSound.bind(this), false);
    document.getElementById("shake").addEventListener("touchstart", this.onShake.bind(this), false);
    document.getElementById("record").addEventListener("touchstart", this.onRecord.bind(this), false);
    document.addEventListener("deviceready",this.onDeviceReady.bind(this),false);
  },

  homeJs: function () {
    home.initialize();
  },

  soundJs: function () {
    sound.initialize();
  },

  shakeJs: function () {
    shake.initialize();
  },

  recordJs: function () {
    record.initialize();
    record.currentdate;
  },

  onDeviceReady: function () {
    this.changeView("home", this.homeJs);
    screen.orientation.lock("portrait");
    document.addEventListener("pendingcaptureerror", function (error) {
      navigator.notification.alert('Error: ' + '\n' + '\n' + 'The application terminated unexpectedly. Your media recordings have been deleted.' + '\n' + '\n' + error, function() {
        console.log("alert success!");
      });
    });
  },

  changeView: function (view, callBack) {
    let viewFilePath = "./content/" + view + ".html";
    $("#content").load(viewFilePath, null, callBack);
    $(".list").removeClass("active");
    $("#" + view).addClass("active");
  },

  onHome: function () {
    this.changeView("home", this.homeJs);
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

app.initialize();
$(function() {
  /*document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });*/
  let episodes = [
    "COSTA RICA IN 4K 60fps HDR (ULTRA HD).mp4",
    "Why Beautiful Things Make us Happy – Beauty Explained.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "Elite/Season 2/Elite_SundefinedEundefined_59 hours missing.mp4"
  ];
  function checkForMutedVideo() {
    if ($("#vid_main").prop("muted") || $("#vl_sld_in").attr("value") < 0.01) {
      $("#volume-ctrl > i").attr("class", "fa fa-volume-mute");
    } else {
      $("#volume-ctrl > i").attr("class", "fa fa-volume-up");
    }
  }
  function PoP_Video() {
    if ($("#vid_main").get(0).paused) {
      $("#b_play > i").attr("class", "fa fa-play");
    } else {
      $("#b_play > i").attr("class", "fa fa-pause");
    }
  }
  function playPauseVidDYN() {
    if ($("#vid_main").get(0).paused) {
      $("#vid_main")
        .get(0)
        .play();
      $("#b_play > i").attr("class", "fa fa-pause");
    } else {
      $("#b_play > i").attr("class", "fa fa-play");
      $("#vid_main")
        .get(0)
        .pause();
    }
  }
  function updateAudioFSlider() {
    $("#vid_main").get(0).volume = $("#vl_sld_in").attr("value");
  }
  function seektimeupdate() {
    let vid = $("#vid_main").get(0);
    var nt = vid.currentTime * (100 / vid.duration);
    var curmins = Math.floor(vid.currentTime / 60);
    var cursecs = Math.floor(vid.currentTime - curmins * 60);
    var durmins = Math.floor(vid.duration / 60);
    var dursecs = Math.floor(vid.duration - durmins * 60);
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }
    $("#file").attr("data-time", curmins + ":" + cursecs);
    $("#active_prg_bar").css("width", nt + "%");
  }

  function notifBtn(event) {
    $(".notif_onAction > i").attr("class", $(event.target).attr("class"));
    $(".notif_onAction")
      .fadeIn(50)
      .delay(100)
      .fadeOut(500);
  }

  $("#volume-ctrl").mouseenter(() => {
    $(".vl_sld").css("width", "140px");
  });
  $("#volume-ctrl").mouseleave(() => {
    if ($(".vl_sld").css("width") >= "140px" && !$(".vl_sld").is(":focus")) {
      setTimeout(() => {
        $(".vl_sld").css("width", "0px");
      }, 2000);
    }
  });

  $(".vl_sld").mouseleave(() => {
    $(".vl_sld").css("width", "0px");
  });
  $("#vid_main").on("click", () => {
    if ($("#vid_main").get(0).paused) {
      $(".notif_onAction > i").attr("class", "fa fa-play");
    } else {
      $(".notif_onAction > i").attr("class", "fa fa-pause");
    }
    $(".notif_onAction")
      .fadeIn(50)
      .delay(100)
      .fadeOut(500);
  });
  $("#b_play,#vid_main").on("click", e => {
    playPauseVidDYN();
  });
  $("#b_re").on("click", () => {
    $("#vid_main").get(0).currentTime -= 10;
    seektimeupdate();
  });
  $("#b_fr").on("click", () => {
    $("#vid_main").get(0).currentTime += 10;
    seektimeupdate();
  });
  $("#volume-ctrl").on("click", () => {
    if ($("#vid_main").prop("muted")) {
      $("#vid_main").prop("muted", false);
    } else {
      $("#vid_main").prop("muted", true);
    }
    checkForMutedVideo();
  });

  $("#file").on("input", function() {
    this.setAttribute("value", this.value);
    let ctt = $("#file").val();
    $("#vid_main").get(0).currentTime = ctt;
  });
  $("#vid_main").on("timeupdate", function() {
    seektimeupdate();
    var range = 0;
    var bf = this.buffered;
    var time = this.currentTime;
    while (!(bf.start(range) <= time && time <= bf.end(range))) {
      range += 1;
    }
    var loadStartPercentage = bf.start(range) / this.duration;
    var loadEndPercentage = bf.end(range) / this.duration;
    var loadPercentage = loadEndPercentage - loadStartPercentage;
    $("#load_prg_bar").css("width", loadPercentage + "%");
  });
  function toggleFullScreen() {
    var elem = $(".wrapper").get(0);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
  /*if (document.addEventListener) {
    document.addEventListener("fullscreenchange", exitHandler, false);
    document.addEventListener("mozfullscreenchange", exitHandler, false);
    document.addEventListener("MSFullscreenChange", exitHandler, false);
    document.addEventListener("webkitfullscreenchange", exitHandler, false);
  }
*/
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
  $("#fullScreenbtn").on("click", function() {
    if (!document.webkitIsFullScreen) {
      toggleFullScreen();
      $("#fullScreenbtn > i").attr("class", "fa fa-compress");
      $(".vid_showc_holder").css("margin-top", "2em");
    } else {
      closeFullscreen();
      $("#fullScreenbtn > i").attr("class", "fa fa-expand");
      $(".vid_showc_holder").css("margin-top", "0em");
    }
  });
  $(".vl_sld > input").on("input", function() {
    this.setAttribute("value", this.value);
    updateAudioFSlider();
    checkForMutedVideo();
  });
  var timeout;
  $(document).on("mousemove", e => {
    document.exitPointerLock();
    $(".controls").fadeIn();
    $("body").css("cursor", "auto");

    clearTimeout(timeout);
    timeout = setTimeout(function() {
      $(".controls").fadeOut();
      $("body").css("cursor", "none");
    }, 4000);
  });
  $("#fnext_ep").on("click", () => {
    let epi_num = $("#vid_main").data("episode");
    if (epi_num != episodes.length - 1) {
      $("#vid_main").data("episode", $("#vid_main").data("episode") + 1);
    } else {
      $("#vid_main").data("episode", 0);
    }
    $("#vid_main").attr("src", episodes[$("#vid_main").data("episode")]);
    PoP_Video();
  });
  $("#vid_main").on("canplaythrough", () => {
    updateAudioFSlider();
    checkForMutedVideo();
    PoP_Video();
  });
  $("#fp_ctrl > button").on("click", function(e) {
    notifBtn(e);
  });
});

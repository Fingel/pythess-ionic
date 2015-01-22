// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngSanitize', 'starter.controllers', 'starter.services', 'starter.directives'])

.run(function($ionicPlatform, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(!$window.localStorage.settings){
        var settings = {};
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        settings.username = text;
        $window.localStorage.settings = JSON.stringify(settings);
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/chats');

  if(!ionic.Platform.isWebView()){
      window.Media = function(src, mediaSuccess, mediaError, mediaStatus){
          // src: A URI containing the audio content. (DOMString)
          // mediaSuccess: (Optional) The callback that executes after a Media object has completed the current play, record, or stop action. (Function)
          // mediaError: (Optional) The callback that executes if an error occurs. (Function)
          // mediaStatus: (Optional) The callback that executes to indicate status changes. (Function)

          if (typeof Audio !== "function" && typeof Audio !== "object") {
              console.warn("HTML5 Audio is not supported in this browser");
          }
          var sound = new Audio();
          sound.src = src;
          sound.addEventListener("ended", mediaSuccess, false);
          sound.load();

          return {
              // Returns the current position within an audio file (in seconds).
              getCurrentPosition: function(mediaSuccess, mediaError){ mediaSuccess(sound.currentTime); },
              // Returns the duration of an audio file (in seconds) or -1.
              getDuration: function(){ return isNaN(sound.duration) ? -1 : sound.duration; },
              // Start or resume playing an audio file.
              play: function(){ sound.play(); },
              // Pause playback of an audio file.
              pause: function(){ sound.pause(); },
              // Releases the underlying operating system's audio resources. Should be called on a ressource when it's no longer needed !
              release: function(){},
              // Moves the position within the audio file.
              seekTo: function(milliseconds){}, // TODO
              // Set the volume for audio playback (between 0.0 and 1.0).
              setVolume: function(volume){ sound.volume = volume; },
              // Start recording an audio file.
              startRecord: function(){},
              // Stop recording an audio file.
              stopRecord: function(){},
              // Stop playing an audio file.
              stop: function(){ sound.pause(); if(mediaSuccess){mediaSuccess();} } // TODO
          };
      };
  }
});

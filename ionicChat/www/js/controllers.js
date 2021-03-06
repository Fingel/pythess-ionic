angular.module('starter.controllers', [])


.controller('ChatsCtrl', function($scope, $ionicScrollDelegate, $window, MediaSrv) {
    $scope.chats = [];
    if($window.localStorage.chats){
        lchats = JSON.parse($window.localStorage.chats);
        $scope.chats = lchats;
    }

    var exampleSocket = new WebSocket("ws://getinstabot.com:8765/");
    exampleSocket.onopen = function (event) {

        console.log("socket open");
        $scope.chats.push({"name": "---connected---", "msg": "", "time": new Date()});
        $scope.$apply();
    };
    exampleSocket.onmessage = function (event) {
        console.log("recieved");
        $scope.chats.push(JSON.parse(event.data));
        $window.localStorage.chats = JSON.stringify($scope.chats);
        $scope.$apply();
        MediaSrv.loadMedia('media/notification.wav').then(function(media){
            media.play();
        });
    };

    $scope.sendMessage = function(){
        exampleSocket.send(JSON.stringify({"name": JSON.parse($window.localStorage.settings).username, "msg": $scope.message, "time": new Date()}));
        $scope.message = "";
    };

    $scope.$watchCollection('chats', function(){
        $ionicScrollDelegate.scrollBottom(true);
    });
})


.controller('AccountCtrl', function($scope, $window) {
    $scope.settings = JSON.parse($window.localStorage.settings);
    $scope.$watch('settings.username', function(){
        $window.localStorage.settings = JSON.stringify($scope.settings);
    });

    $scope.clearLogs = function(){
        $window.localStorage.chats = JSON.stringify([]);
    };
});

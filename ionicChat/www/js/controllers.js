angular.module('starter.controllers', [])


.controller('ChatsCtrl', function($scope, $ionicScrollDelegate, $window) {
    $scope.chats = [];

    var exampleSocket = new WebSocket("ws://getinstabot.com:8765/");
    exampleSocket.onopen = function (event) {

        console.log("socket open");
        $scope.chats.push({"name": "---connected---", "msg": "", "time": new Date()});
    };
    exampleSocket.onmessage = function (event) {
        console.log("recieved");
        $scope.chats.push(JSON.parse(event.data));
        $scope.$apply();
        $ionicScrollDelegate.scrollBottom(true);
    };

    $scope.sendMessage = function(){
        exampleSocket.send(JSON.stringify({"name": JSON.parse($window.localStorage.settings).username, "msg": $scope.message, "time": new Date()}));
        $scope.message = "";
    };
})


.controller('AccountCtrl', function($scope, $window) {
    $scope.settings = JSON.parse($window.localStorage.settings);
    $scope.$watch('settings.username', function(){
        $window.localStorage.settings = JSON.stringify($scope.settings);
    });
});

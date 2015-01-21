angular.module('starter.controllers', [])


.controller('ChatsCtrl', function($rootScope, $scope, Chats) {
    $scope.chats = []

    var exampleSocket = new WebSocket("ws://getinstabot.com:8765/");
    exampleSocket.onopen = function (event) {

        console.log("socket open")
    };
    exampleSocket.onmessage = function (event) {
        console.log("recieved");
        $scope.chats.push(JSON.parse(event.data));
        $scope.$apply();
    };

    $scope.sendMessage = function(){
        exampleSocket.send(JSON.stringify({"name": $rootScope.settings.username, "msg": $scope.message, "time": new Date()}));
        $scope.message = "";
    };
})


.controller('AccountCtrl', function($rootScope) {
});

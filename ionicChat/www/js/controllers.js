angular.module('starter.controllers', [])


.controller('ChatsCtrl', function($rootScope, $scope, Chats) {
    $scope.chats = []

    var exampleSocket = new WebSocket("ws://192.168.10.145:8765/");
    exampleSocket.onopen = function (event) {

        console.log("socket open")
    };
    exampleSocket.onmessage = function (event) {
        console.log("recieved")
        $scope.chats.push(JSON.parse(event.data));
        $scope.$apply();
    }

    $scope.sendMessage = function(message){
        console.log("sent message" + message)
        exampleSocket.send(JSON.stringify({"name": $rootScope.settings.username, "msg": message}));
    }
})


.controller('AccountCtrl', function($rootScope) {
});

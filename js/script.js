'use strict'

var App = angular.module('AppRSS', [])

App.controller('FeedCtrl', ['$scope', 'FeedService', '$sce', function ($scope,Feed,$sce) {
    $scope.loadButonText="Load"
    $scope.loadFeed=function(e){
        Feed.parseFeed(e.feedSrc).then(function(res) {
            $scope.audios=res.data.query.results.rss.channel.item
        });
    }

    $scope.playAudio = function(value) {
        let audio = new Audio(value.enclosure.url)
        audio.play()
    }
}]);

App.factory('FeedService',['$http', '$sce', function($http, $sce){
    return {
        parseFeed : function(url){
            return $http.jsonp($sce.trustAsResourceUrl('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20\'' + encodeURIComponent(url) + '\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'))
        }
    }
}])
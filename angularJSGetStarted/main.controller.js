(function () {

    /* 
    //
    // Usa funzioni che hanno un nome piuttosto che passare una funzione anonima come in una callback
    // evitare
    //
    angular
        .module('app')        
        .factory('logger', function() { });
    //
    // consigliato    
    //
    // logger.js
    //
    angular
        .module('app')
        .factory('logger', logger);

    function logger() { }

    //
    // evitare
    //
    var app = angular.module('app', [
        'ngAnimate',
        'ngRoute',
        'app.shared',
        'app.dashboard'
    ]);

    //
    // consigliato
    //
    angular
          .module('app', [
            'ngAnimate',
            'ngRoute',
            'app.shared',
            'app.dashboard'
          ]);

    //
    // evitare 
    //
    var app = angular.module('app');
    app.controller('SomeController', SomeController);

    function SomeController() { }

    //
    // consigliato
    //
    angular
        .module('app')
        .controller('SomeController', SomeController);

    function SomeController() { }
    
    //
    // consigliato
    //
    // per creare un modulo
    angular.module('app', []);

    // per recuperare un modulo
    angular.module('app');

    */
    angular
        .module('appGitHubViewer')
          .controller('MainController', ['$scope', '$http','$interval','$log','$anchorScroll','$location', mainController]);

    function mainController($scope, $http, $interval,$log,$anchorScroll,$location) {
        'use strict';

        var onUserComplete = function (response) {        
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function (response) {
            $scope.repos = response.data;            
            $location.hash("userDetails");
            $anchorScroll();
        };

        var onError = function (reason) {
            $scope.error = "Dati non trovati";
        };

        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };

        var countdownInterval = null;
        var startCountDown = function(){
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function (username) {
            $log.info("Searching for " + username);
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        // assegna il servizio log allo scope così da poterlo usare nel DOM
        $scope.$log = $log;

        $scope.username = "angular";
        $scope.message = "GitHub viewer";
        $scope.repoSortOrder = "-stargazers_count"
        $scope.countdown = 5;
        startCountDown();
    }
})();
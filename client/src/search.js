'use strict';

angular.module('gameBoxArtSearchApp')
  .controller('SearchCtrl', function($scope, $location, GamesDbNet) {
    $scope.welcome = 'Welcome to Video Game Box Art Search!';
    $scope.buttonText = 'This is your Button';
    $scope.submit = function(){
      GamesDbNet.searchBoxArtURLs($scope.searchTerm)
      .then(function(){
        $location.path('/boxArt');
      });
    }
  });

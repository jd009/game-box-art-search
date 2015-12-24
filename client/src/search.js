'use strict';

angular.module('gameBoxArtSearchApp')
  .controller('SearchCtrl', function($scope, $location, GamesDbNet) {
    $scope.submit = function(){
      GamesDbNet.searchVideoGameTitle($scope.searchTerm)
      .then(function(){
        $location.path('/searchResults');
      });
    }
  });

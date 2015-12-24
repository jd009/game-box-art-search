'use strict';

angular.module('gameBoxArtSearchApp')
  .controller('SearchCtrl', function($scope, $location, GamesDbNet) {
    $scope.submit = function(){
      GamesDbNet.searchBoxArtURLs($scope.searchTerm)
      .then(function(){
        $location.path('/boxArt');
      });
    }
  });

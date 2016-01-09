'use strict';

angular.module('gameBoxArtSearchApp')
  .controller('SearchResultsCtrl', function($scope, $location, GamesDbNet) {
    $scope.searchResults = GamesDbNet.getSearchResults();

    $scope.returnToSearch = function(){
      $location.path('/');
    };

    $scope.goToSearchResult = function(resultId){
      $location.path('/boxArt/' + resultId);
    };
  });

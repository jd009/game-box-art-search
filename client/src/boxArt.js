'use strict';

angular.module('gameBoxArtSearchApp')
  .controller('BoxArtCtrl', function($scope, $stateParams, $location, GamesDbNet) {
    $scope.imagesLoaded = false;

    GamesDbNet.searchBoxArtURLs($stateParams.gameId)
    .then(displayBoxArt);

    function displayBoxArt(imageURLObj){
      var frontBoxArtURL = imageURLObj.frontImageURL;
      $scope.isFrontBoxArtFound = frontBoxArtURL !== null;
      if($scope.isFrontBoxArtFound){
        $scope.frontBoxArtURL = frontBoxArtURL;
      }

      var backBoxArtURL = imageURLObj.backImageURL;
      $scope.isBackBoxArtFound = backBoxArtURL !== null;
      if($scope.isBackBoxArtFound){
        $scope.backBoxArtURL = backBoxArtURL;
      }

      $scope.imagesLoaded = true;
    }

    $scope.returnToSearchResults = function(){
      $location.path('/searchResults');
    }

    $scope.returnToSearch = function(){
      $location.path('/');
    }

  });

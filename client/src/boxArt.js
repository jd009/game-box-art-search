'use strict';

angular.module('gameBoxArtSearchApp')
  .controller('BoxArtCtrl', function($scope, GamesDbNet) {
    var frontBoxArtURL = GamesDbNet.getBoxFrontArtURL();
    $scope.isFrontBoxArtFound = frontBoxArtURL !== null;
    if($scope.isFrontBoxArtFound){
      $scope.frontBoxArtURL = frontBoxArtURL;
    }

    var backBoxArtURL = GamesDbNet.getBoxBackArtURL();
    $scope.isBackBoxArtFound = backBoxArtURL !== null;
    if($scope.isBackBoxArtFound){
      $scope.backBoxArtURL = backBoxArtURL;
    }
  });

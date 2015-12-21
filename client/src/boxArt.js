'use strict';

angular.module('gameBoxArtSearchApp')
  .controller('BoxArtCtrl', function($scope, GamesDbNet) {
    $scope.frontBoxArtURL = GamesDbNet.getBoxFrontArtURL();
    $scope.backBoxArtURL = GamesDbNet.getBoxBackArtURL();
  });

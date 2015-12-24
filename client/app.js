'use strict';

angular.module('gameBoxArtSearchApp', [
    'ui.router',
    'gameBoxArtSearchApp.gamesDbNetService'
  ])

    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('search', {
        url: '/',
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })

      .state('searchResults', {
        url: '/searchResults',
        templateUrl: 'views/searchResults.html',
        controller: 'SearchResultsCtrl'
      })

      .state('boxArt', {
        url: '/boxArt/:gameId',
        templateUrl: 'views/boxArt.html',
        controller: 'BoxArtCtrl'
      });
});

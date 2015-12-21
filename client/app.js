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

        .state('boxArt', {
          url: '/boxArt',
          templateUrl: 'views/boxArt.html',
          controller: 'BoxArtCtrl'
        });
});

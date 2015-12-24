angular.module('gameBoxArtSearchApp.gamesDbNetService', [])

.factory('GamesDbNet', function($http){
  var frontImageURL = null;
  var backImageURL = null;

  var searchBoxArtURLs = function(searchTerm){
    var apiBoxArtBaseURL = '/api/boxArtLinks/';
    var apiBoxArtCompleteURL = apiBoxArtBaseURL +
                               '?searchTerm=' +
                               searchTerm;
    return $http({
      method: 'GET',
      url: apiBoxArtCompleteURL
    })
    .then(function(response){
      frontImageURL = response.data.frontImageUrlComplete;
      backImageURL = response.data.backImageUrlComplete;
    });
  };

  var getBoxFrontArtURL = function(){
    return frontImageURL;
  };

  var getBoxBackArtURL = function(){
    return backImageURL;
  };

  return {
    searchBoxArtURLs: searchBoxArtURLs,
    getBoxFrontArtURL: getBoxFrontArtURL,
    getBoxBackArtURL: getBoxBackArtURL
  };
});

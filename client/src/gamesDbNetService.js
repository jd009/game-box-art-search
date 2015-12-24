angular.module('gameBoxArtSearchApp.gamesDbNetService', [])

.factory('GamesDbNet', function($http){
  var searchResults = null;
  var frontImageURL = null;
  var backImageURL = null;

  var searchVideoGameTitle = function(searchTerm){
    var apiSearchGameBaseURL = '/api/searchGame/';
    var apiSearchGameCompleteURL = apiSearchGameBaseURL +
                               '?searchTerm=' +
                               searchTerm;
    return $http({
      method: 'GET',
      url: apiSearchGameCompleteURL
    })
    .then(function(response){
      searchResults = response.data;
    });
  };

  var getSearchResults = function(){
    return searchResults;
  }

  var searchBoxArtURLs = function(gameId){
    var apiBoxArtBaseURL = '/api/boxArtLinks/';
    var apiBoxArtCompleteURL = apiBoxArtBaseURL +
                               '?id=' +
                               gameId;
    return $http({
      method: 'GET',
      url: apiBoxArtCompleteURL
    })
    .then(function(response){
      var imageURLObj = {
        frontImageURL: response.data.frontImageUrlComplete,
        backImageURL: response.data.backImageUrlComplete
      };
      return imageURLObj;
    });
  };

  var getBoxFrontArtURL = function(){
    return frontImageURL;
  };

  var getBoxBackArtURL = function(){
    return backImageURL;
  };

  return {
    searchVideoGameTitle: searchVideoGameTitle,
    getSearchResults: getSearchResults,
    searchBoxArtURLs: searchBoxArtURLs,
    getBoxFrontArtURL: getBoxFrontArtURL,
    getBoxBackArtURL: getBoxBackArtURL
  };
});

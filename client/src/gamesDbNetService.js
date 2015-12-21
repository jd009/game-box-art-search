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
    if(frontImageURL === null) throw "Front of box artwork URL not initialized!";

    return frontImageURL;
  };

  var getBoxBackArtURL = function(){
    if(backImageURL === null) throw "Back of box artwork URL not initialized!";

    return backImageURL;
  };

  return {
    searchBoxArtURLs: searchBoxArtURLs,
    getBoxFrontArtURL: getBoxFrontArtURL,
    getBoxBackArtURL: getBoxBackArtURL
  };
});
var httpRequest = require('http-request');
var parse = require('xml-parser');
var moment = require('moment');

module.exports.searchGame = searchGame;
module.exports.fetchBoxArtURLs = fetchBoxArtURLs;

function searchGame(searchString, req, res){
  var getGamesListBaseUrl =  "http://thegamesdb.net/api/GetGamesList.php?name=";
  var getGamesListUrl = getGamesListBaseUrl + searchString;
  httpRequest.get({
    url: getGamesListUrl
  }, function(error, result){
    if(error){
      console.log(error);
      res.status(500);
      return;
    }

    var responseXML = result.buffer.toString();
    var parsedSearchResults = parseSearchResults(responseXML);
    res.send(parsedSearchResults);
    res.end();
    // fetchBoxArtURLs(gameIdStr, res);
  });
}

function parseSearchResults(responseXML){
  var responseObj = parse(responseXML);
  var parsedSearchResults = [];
  var searchResults = responseObj.root.children;
  for(var resultIndex = 0; resultIndex < searchResults.length; resultIndex++){
    var currentSearchResult = {};
    var resultProperties = searchResults[resultIndex].children;
    for(var propertyIndex = 0; propertyIndex < resultProperties.length; propertyIndex++){
      var propertyName = resultProperties[propertyIndex].name;
      var propertyContent = resultProperties[propertyIndex].content;
      if(propertyName === 'ReleaseDate'){
        propertyContent = reformatReleaseDate(propertyContent);
      }

      currentSearchResult[propertyName] = propertyContent;
    }
    parsedSearchResults.push(currentSearchResult);
  }

  return parsedSearchResults;
}

function fetchBoxArtURLs(gameIdStr, res){
  var getArtBaseUrl = "http://thegamesdb.net/api/GetArt.php?id=";
  var getArtUrl = getArtBaseUrl + gameIdStr;
  httpRequest.get({
    url: getArtUrl
  }, function(error, result){
    if(error){
      console.log(error);
      res.status(500);
      return;
    }

    var responseXML = result.buffer.toString();
    try{
      var gameBoxArtURLs = parseBoxArtURLs(responseXML);
      res.send(gameBoxArtURLs);
      res.end();
    } catch(error){
      console.log(error);
      res.status(500);
      res.send(error);
      res.end();
    }
  });
}

function parseBoxArtURLs(responseXML){
  var responseObj = parse(responseXML);
  var artInfo = responseObj.root.children;
  var baseImgUrl = artInfo[0].content;
  var images = artInfo[1].children;
  var frontImageUrl = null;
  var backImageUrl = null;
  for(var index = 0; index < images.length; index++){
    var currentImage = images[index];
    var currentImageName = currentImage.name;
    if(currentImageName === "boxart"){
      var currentImageSide = currentImage.attributes.side;
      if(currentImageSide === "front"){
        frontImageUrl = currentImage.content;
      } else if(currentImageSide === "back"){
        backImageUrl = currentImage.content;
      } else {
        throw "Unrecognized image side attribute";
      }

      if(frontImageUrl && backImageUrl){
        break;
      }

    }
  }

  var frontImageUrlComplete = frontImageUrl ?
                              baseImgUrl + frontImageUrl :
                              null;
  var backImageUrlComplete = backImageUrl ?
                             baseImgUrl + backImageUrl :
                             null;
  return {
    frontImageUrlComplete: frontImageUrlComplete,
    backImageUrlComplete: backImageUrlComplete
  };
}

function reformatReleaseDate(releaseDate){
  if(releaseDate === "") return releaseDate;

  var reformattedDate = moment(releaseDate, "MM-DD-YYYY")
                        .format("MMMM Do, YYYY");
  return reformattedDate;
}


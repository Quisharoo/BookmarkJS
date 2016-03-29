var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    
    .when('/', {
        templateUrl: 'pages/signIn.html',
        controller: 'mainController'
    })
    
    .when('/home', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })
    
    .when('/searchResult', {
        templateUrl: 'pages/searchResult.html',
        controller: 'secondController'
    })
    .when('/book', {
        templateUrl: 'pages/book.html',
        controller: 'secondController'
    })    
});


weatherApp.service('searchService', function () {
    this.search="";
})

weatherApp.service('bookService', function () {
    this.book="";
})


weatherApp.service('publisherService', function(){
    this.publisher="";
})

weatherApp.service('authorService', function(){
    this.author="";
})



weatherApp.controller('mainController', ['$scope', '$resource', 'searchService', function ($scope, $resource, searchService) {
        $scope.search=searchService.search;
        $scope.$watch('search', function(){
            searchService.search=$scope.search;
        })
        
        
}]);

weatherApp.controller('secondController', ['$scope','$resource','$routeParams', 'searchService', 'bookService', 'publisherService', 'authorService', function($scope, $resource, $routeParams, searchService, bookService, publisherService, authorService){

        $scope.search=searchService.search;
    
        $scope.weatherAPI = 
        $resource("https://www.googleapis.com/books/v1/volumes", {
                  APPID:'AIzaSyC1fxpjXnXORboqPAAYPMby9xqOXkt4xOE',
                  maxResults: 9,
                  callback: "JSON_CALLBACK"
                  }, {get: {method : "JSONP"}});
        
        $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.search});
        //console.log($scope.weatherResult);
    
        $scope.book=bookService.book;
        $scope.$watch('book', function(){
                bookService.book=$scope.book;
            })        
        $scope.storeBook = function(bookID) {
              $scope.book = bookID;                
        };
    
    
        $scope.publisher=publisherService.publisher;
        $scope.$watch('publisher', function(){
                publisherService.publisher=$scope.publisher;
            }) 
    
        $scope.storePublisher = function(rating){
            $scope.publisher = rating;
            //console.log($scope.publisher);
        };
    
        $scope.publisher=publisherService.publisher;
        $scope.publisherRequest = 
            $resource("https://www.googleapis.com/books/v1/volumes", {
            APPID:'AIzaSyC1fxpjXnXORboqPAAYPMby9xqOXkt4xOE',
                  maxResults: 5,    
                  callback: "JSON_CALLBACK",     
                  }, {get: {method : "JSONP"}});
        $scope.publisherResult = $scope.publisherRequest.get({q: 'inpublisher:' + $scope.publisher});
    
    
        $scope.author=authorService.author;
        $scope.$watch('author', function(){
               authorService.author=$scope.author;
            }) 
    
        $scope.storeAuthor = function(writer){
            $scope.author = writer;
            //console.log($scope.author);
        };
    
        $scope.author=authorService.author;
        $scope.authorRequest = 
            $resource("https://www.googleapis.com/books/v1/volumes", {
            APPID:'AIzaSyC1fxpjXnXORboqPAAYPMby9xqOXkt4xOE',
                  maxResults: 5,    
                  callback: "JSON_CALLBACK",     
                  }, {get: {method : "JSONP"}});
        $scope.authorResult = $scope.authorRequest.get({q: 'inauthor:' + $scope.author});    
}]);
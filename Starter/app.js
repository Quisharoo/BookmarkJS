var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    
    .when('/', {
        templateUrl: 'pages/home.html',
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
    
    .when('/topPicks', {
        templateUrl: 'pages/topPicks.html',
        controller: 'secondController'
    })
    .when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'secondController'
    })
});


myApp.service('searchService', function () {
    this.search="";
})

myApp.service('bookService', function () {
    this.book="";
})


myApp.service('publisherService', function(){
    this.publisher="";
})

myApp.service('authorService', function(){
    this.author="";
})



myApp.controller('mainController', ['$scope', '$resource', 'searchService', function ($scope, $resource, searchService) {
        $scope.search=searchService.search;
        $scope.$watch('search', function(){
            searchService.search=$scope.search;
        })
        
        
}]);

myApp.controller('secondController', ['$scope','$resource','$routeParams', 'searchService', 'bookService', 'publisherService', 'authorService', function($scope, $resource, $routeParams, searchService, bookService, publisherService, authorService){

        $scope.search=searchService.search;
    
        $scope.bookAPI = 
        $resource("https://www.googleapis.com/books/v1/volumes", {
                  APPID:'AIzaSyC1fxpjXnXORboqPAAYPMby9xqOXkt4xOE',
                  maxResults: 9,
                  langRestrict: 'en',
                  projection: 'lite',
                  callback: "JSON_CALLBACK"
                  }, {get: {method : "JSONP"}});
        
        $scope.bookResult = $scope.bookAPI.get({ q: $scope.search});
        console.log($scope.bookResult);
    
    
    
        //storing unique book ID, and using watch services to update scope with changes
        $scope.book=bookService.book;
    
        $scope.$watch('book', function(){
                bookService.book=$scope.book;
            })        
        $scope.storeBook = function(bookID) {
              $scope.book = bookID;                
        };
    
        //storing book publisher on button click, and using watch services to update scope with changes
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
            APPID:'AIzaSyCKioBwrgrzqIagT-06ugoMBdsuyiRi1_c',
                  maxResults: 5,    
                  callback: "JSON_CALLBACK",
                  langRestrict : 'en',
                  }, {get: {method : "JSONP"}});
        $scope.publisherResult = $scope.publisherRequest.get({q: 'inpublisher:' + $scope.publisher});
        console.log($scope.publisherResult);
        //storing author, and using watch services to update scope with changes
        $scope.author=authorService.author;
        $scope.$watch('author', function(){
               authorService.author=$scope.author;
            }) 
    
        $scope.storeAuthor = function(writer){
            $scope.author = writer;
            //console.log($scope.author);
        };
        
        $scope.storeLanguage = function(language){
            $scope.lang = language;
            console.log($scope.lang);
        }
    
        $scope.author=authorService.author;
        $scope.authorRequest = 
            $resource("https://www.googleapis.com/books/v1/volumes", {
            APPID:'AIzaSyC1fxpjXnXORboqPAAYPMby9xqOXkt4xOE',
                  maxResults: 5,
                  langRestrict: 'en',    
                  callback: "JSON_CALLBACK",     
                  }, {get: {method : "JSONP"}});
        $scope.authorResult = $scope.authorRequest.get({q: 'inauthor:' + $scope.author});    
}]);



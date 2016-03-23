var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    
    .when('/', {
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
    this.search="Harry Potter";
})

weatherApp.service('bookService', function () {
    this.id="";
})



weatherApp.controller('mainController', ['$scope', '$resource', 'searchService', function ($scope, $resource, searchService) {
        $scope.search=searchService.search;
        $scope.$watch('search', function(){
            searchService.search=$scope.search;
        })
        
        
}]);

weatherApp.controller('secondController', ['$scope','$resource','$routeParams', 'searchService', 'bookService', function($scope, $resource, $routeParams, searchService, bookService){

        $scope.search=searchService.search;
    
        $scope.weatherAPI = 
        $resource("https://www.googleapis.com/books/v1/volumes", {
                  APPID:'AIzaSyC1fxpjXnXORboqPAAYPMby9xqOXkt4xOE',
                  maxResults: 9,    
                  callback: "JSON_CALLBACK"
                  }, {get: {method : "JSONP"}});
        
        $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.search});
        console.log($scope.weatherResult);
    
        $scope.bookResult = function(bookID) {
            
        
    };
}]);

weatherApp.controller('bookController', ['$scope', 'bookService', function($scope, bookService){
        $scope.id=bookService.id;
        $scope.$watch('id', function(){
            bookService.id=$scope.id;
            
        });
    
}])
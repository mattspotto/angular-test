'use strict';

var app = angular.module('angular-test', [
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',
    'ngRoute',
    'angular-test.menu',
    'angular-test.book',
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
      when('/menu', {templateUrl: 'view_menu/menu.html',   controller: 'MenuCtrl' }).
      when('/book', {templateUrl: 'view_book/book.html',   controller: 'BookCtrl' }).
      otherwise({redirectTo: '/menu'});
}])
.controller('TabsCtrl', function($scope, $location) {
    $scope.tabs = [
      { link : '#/menu', label : 'Menu' },
      { link : '#/book', label : 'Book' }
    ]; 
    
  $scope.selectedTab = $scope.tabs[0];    
  $scope.setSelectedTab = function(tab) {
    $scope.selectedTab = tab;
  }
  
  $scope.tabClass = function(tab) {
    if ($scope.selectedTab == tab) {
      return "active";
    } else {
      return "";
    }
  }
});
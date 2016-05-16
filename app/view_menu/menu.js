'use strict';

angular.module('angular-test.menu', ['ngRoute'])
.factory('MenuService', ['$http', function ($http) {
    var urlBase = 'http://localhost:8000/api';
    var MenuService = {};
    
    MenuService.getSections = function () {
        return $http.get(urlBase + '/sections.json');
    };
    MenuService.getItems = function (section) {
        return $http.get(urlBase + '/sections/' + section + '.json');
    };
    
    return MenuService;
}])
.controller('MenuCtrl', function($scope, MenuService) {
    
    $scope.sections = {},
    $scope.items = {};
    $scope.active = '';
    
    getSections();
    function getSections() {
        MenuService.getSections()
            .success(function (sections) {
                $scope.sections = sections;
                console.log($scope.sections);
                getItems(sections[0]);
            
            })
            .error(function (error) {
                $scope.status = 'Unable to load sections data: ' + error.message;
            });
    };
    
    
    function getItems(section) {
        $scope.active = section;
        console.log(section);
        MenuService.getItems(section)
            .success(function (data) {
                $scope.items = data.items;
                console.log($scope.items);
 
            })
            .error(function (error) {
                $scope.status = 'Unable to load items data: ' + error.message;
            });
    };
    $scope.getItems = getItems;
     
});
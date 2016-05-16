'use strict';

angular.module('angular-test.modal', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',
    'ui.bootstrap.tpls'
])
.controller('ModalCtrl', function ($scope, $uibModalInstance, booking) {

    $scope.booking = booking;
    
    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
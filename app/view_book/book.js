'use strict';

angular.module('angular-test.book', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'angular-test.modal'
])
.controller('BookCtrl', function($scope, $uibModal) {

    $scope.booking = {},
    $scope.alerts = [];
    
    $scope.today = function() {
        $scope.booking.date = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.booking.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };


    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open = function() {
        $scope.popup.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.booking.date = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    
    $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.booking.date,
            mode = data.mode;
        
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
    }
    
    $scope.bookTable = function() {
        
        let b = $scope.booking;
        if (b.name && b.numPeople && b.date && b.time && (b.email || b.phone)) {
            $uibModal.open({
              animation: 'true',
              templateUrl: 'view_book/modal.html',
              controller: 'ModalCtrl',
              resolve: {
                booking: function () {
                  return $scope.booking;
                }
              }
            });
        } else {
             $scope.alerts.push({type: 'danger', msg: 'Please ensure all required fields are populated'});
        }
        
    }
    
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    
});
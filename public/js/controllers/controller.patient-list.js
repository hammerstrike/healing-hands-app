angular
    .module('app')
    .controller('PatientListController', ['$scope', '$state', '$stateParams', 'APIService', 'API_HOST', 'growl', '$uibModal', function ($scope, $state, $stateParams, APIService, API_HOST, growl, $uibModal) {

        $scope.patients = [];

        //Filters : Date
        //Datepicker 
        $scope.filterDate = new Date();
        $scope.filterDateChanged = function () {
            getRecods({ endDate : $scope.filterDate});
        };

        $scope.filterDateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        $scope.filterDatePopup = {
            opened: false
        };
        $scope.filterDateDtpkr = function () {
            $scope.filterDatePopup.opened = true;
        };
        //End Filters : Date

        //Initial Call
        getRecods({ endDate : new Date() });

        function getRecods(data){
            
            var growlLoading = growl.warning('<i class="fa fa-cog fa-spin fa-fw"></i> Fetching records', {
                disableIcons: true, 
                disableCloseButton: true,
                ttl: -1
            })

            var payload = { filters : data };

            APIService.getRecord(payload).then(function(result){
                console.log(result);
                growlLoading.destroy();                
                $scope.patients = result.data;
            },function(result){
                console.log(result);
                $scope.patients  = [];
            })
        }
    }])
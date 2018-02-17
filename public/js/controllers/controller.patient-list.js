angular
    .module('app')
    .controller('PatientListController', ['$scope', '$state', '$stateParams', 'APIService', 'API_HOST', 'growl', '$uibModal', function ($scope, $state, $stateParams, APIService, API_HOST, growl, $uibModal) {

        $scope.patients = [];

        //Initial Call
        getRecods({});
        function getRecods(data){
            
            var growlLoading = growl.warning('<i class="fa fa-cog fa-spin fa-fw"></i> Fetching records', {
                disableIcons: true, 
                disableCloseButton: true,
                ttl: -1
            })

            var payload = {query : data}
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
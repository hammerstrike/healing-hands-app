angular
    .module('app')
    .controller('PatientRecordController', ['$scope', '$state', '$stateParams', 'APIService', 'API_HOST', 'growl', '$uibModal', function ($scope, $state, $stateParams, APIService, API_HOST, growl, $uibModal) {

        $scope.patient = {
            patientName : "",
            age : "",
            sex : "F",
            refferedBy : "",
            procedureTreatment : "",
            amountPaid : "",
            amountTotal : "",
            additionalInfo : ""
        };
        

        $scope.addRecord = function(){

            var growlLoading = growl.warning('<i class="fa fa-cog fa-spin fa-fw"></i> Adding record, Please wait...', {
                disableIcons: true, 
                disableCloseButton: true,
                ttl: -1
            })
           
            var payload = $scope.patient;
            APIService.addRecord(payload).then(function (result) {
                growlLoading.destroy();
                if(result.status == 'success') {
                    growl.success("New Record added", {
                        ttl: 3000,
                        onclose: function () {
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                        }
                    });
                }else{
                    growlLoading.destroy();
                    growl.error("Error:" + result, {
                        ttl: -1
                    });
                };

            }, function (reason) {
                growlLoading.destroy();
                growl.error("Something went wrong:" + reason, {
                    ttl: -1
                });
            }).catch(function(err){
                growlLoading.destroy();
                growl.error("Something went wrong:" + reason, {
                    ttl: -1
                });
            });
        }
    }])
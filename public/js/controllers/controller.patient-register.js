angular
    .module('app')
    .controller('PatientRegisterController', ['$scope', '$state', '$stateParams', 'APIService', 'API_HOST', 'growl', '$uibModal', function ($scope, $state, $stateParams, APIService, API_HOST, growl, $uibModal) {

        $scope.patient = {
            patientName : "",
            age : "",
            sex : "F",
            emailId : "",
            contactNo : "",
            allergicTo : "",
            habits : "",
            medicalHistory : "",
            drugHistory : "",
            isPregnant : false,
            refferedBy : "",
            additionalInfo : "",
        };
        
        $scope.sexChange = function(){
            if($scope.patient.sex == 'M'){
                $scope.patient.isPregnant = false;
            }
        }

        $scope.addPatient = function(){

            var growlLoading = growl.warning('<i class="fa fa-cog fa-spin fa-fw"></i> Registering Patient, Please wait...', {
                disableIcons: true, 
                disableCloseButton: true,
                ttl: -1
            })
           
            var payload = $scope.patient;

            APIService.addPatient(payload).then(function (result) {
                growlLoading.destroy();
                if(result.status == 'success') {
                    growl.success("New Patient Registered", {
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
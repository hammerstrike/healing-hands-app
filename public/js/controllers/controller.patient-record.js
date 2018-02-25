angular
    .module('app')
    .controller('PatientRecordController', ['$scope', '$state', '$stateParams', 'APIService', 'API_HOST', 'growl', '$uibModal', function ($scope, $state, $stateParams, APIService, API_HOST, growl, $uibModal) {

        $scope.patients = [];

        $scope.getPatients = function(){

            APIService.getPatient().then(function(result){
                $scope.patients = result.data;
            },function(reason){

            })
        }
        $scope.getPatients();

        $scope.recordForm = {
            data : null,
            visible : false,

            open : function(data){
                this.visible = true;
                this.data = (function(data){
                   return {
                        patientId : data.patientId,
                        patientName : data.patientName,
                        procedureTreatment : "",
                        diagnosis : "",
                        amountPaid : "",
                        amountTotal : "",
                        additionalInfo : "",
                    }
                })(data);
            },

            close : function(){
                this.visible = false;
                this.data = null;
            }
        }

        $scope.addRecord = function(){

            var growlLoading = growl.warning('<i class="fa fa-cog fa-spin fa-fw"></i> Adding record, Please wait...', {
                disableIcons: true, 
                disableCloseButton: true,
                ttl: -1
            })
           
            var payload = $scope.recordForm.data;
            APIService.addRecord(payload).then(function (result) {
                growlLoading.destroy();
                if(result.status == 'success') {
                    growl.success("Record added", {
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
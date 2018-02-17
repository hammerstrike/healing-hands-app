angular
    .module('app')
    .controller('LoginController', ['$scope', '$state', '$stateParams', 'UserService', 'API_HOST', 'growl', '$uibModal', function ($scope, $state, $stateParams, UserService, API_HOST, growl, $uibModal) {
        $scope.username = "amardeep";
        $scope.password = "amardeep";
        
        $scope.login = function(){
            var payload = {
                username : $scope.username,
                password : $scope.password
            };

            UserService.login(payload).then(function(result){
                console.log(result);
                if(result.status == 'success'){
                    $state.go('app.dashboard');
                    console.log('Login Successfull')
                }else{
                    console.log('Login Not Successfull')
                }
            },function(reason){
               console.log('Login Not Successfull',reason);       
            })
        }

    }])
angular
    .module('app')
    .controller('LoginController', ['$scope', '$state', '$stateParams', 'UserService', 'API_HOST', 'growl', '$uibModal', function ($scope, $state, $stateParams, UserService, API_HOST, growl, $uibModal) {
        $scope.username = "";
        $scope.password = "";
        
        $scope.login = function(){
            var payload = {
                username : $scope.username,
                password : $scope.password
            };

            if($scope.username == "" ||  $scope.password == ""){
                $scope.message = "Enter Username/Password"
                return;
            };

            UserService.login(payload).then(function(result){
                console.log(result);
                if(result.status == 'success'){
                    $state.go('app.dashboard');
                    console.log('Login Successfull')
                }else{
                    $scope.message = "Username/Password Mismatch";
                    console.log('Login Not Successfull')
                }
            },function(reason){
                $scope.message = "Please try again";
               console.log('Login Not Successfull',reason);       
            })
        }

    }])
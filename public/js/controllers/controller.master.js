angular
    .module('app')
    .controller('MasterController', ['$rootScope','$scope', function ($rootScope, $scope) {

    }])
    .controller('HeaderController', ['$rootScope','$scope','$state','$stateParams','UserService', function ($rootScope,$scope,$state,$stateParams,UserService) {
        console.log('HeaderController');
        $scope.page = $state.current.param.page;
        $scope.user = UserService.user;

        $rootScope.$on('StateChange', function (ev,data) {
            console.log(data.stateInfo);
            $scope.page = data.stateInfo.param.page;
            //console.log($state.$current.param);         
        })

        $scope.status = {
            isopen: true
        };

        $scope.toggled = function (open) {
           
        };

        $scope.logout = function(){
            localStorage.removeItem('x-access-token');
            $state.go('appSimple.login');
        }

    }]);
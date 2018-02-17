angular
    .module('app')
    .controller('MasterController', ['$rootScope','$scope', function ($rootScope, $scope) {

    }])
    .controller('HeaderController', ['$rootScope','$scope','$state','$stateParams', function ($rootScope,$scope,$state,$stateParams) {
        console.log('HeaderController');
        $scope.page = $state.current.param.page;
        
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

    }]);
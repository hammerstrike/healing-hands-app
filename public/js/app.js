angular
    .module('app', [
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'oc.lazyLoad',
        'angular-loading-bar',
        'angular-growl'
    ])
    .constant('API_HOST', location.origin + '/')
    .constant('USER_ROLE', ['admin', 'supervisor'])
    .config(['cfpLoadingBarProvider', 'growlProvider', function (cfpLoadingBarProvider, growlProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        growlProvider.globalDisableCountDown(true);
    }])
    .run(['$rootScope', '$state', '$stateParams', '$transitions', function ($rootScope, $state, $stateParams, $transitions) {

        $transitions.onStart({}, function (transition, trans) {
            //$rootScope.$broadcast('StateChange', { stateInfo : transition.router.stateService });
        });

        $transitions.onFinish({}, function (transition, trans) {
            //console.log(transition.$to());
            $rootScope.$broadcast('StateChange', { stateInfo: transition.$to() });
        });

        $rootScope.$state = $state;
        return $rootScope.$stateParams = $stateParams;

    }]);
angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $urlRouterProvider.otherwise('/login');

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: true
        });

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'views/common/layouts/master.html',
                param: {
                    page: "Master"
                },
                resolve: {
                    "Auth" : ['UserService','$state','$q',function(UserService,$state,$q){
                        var authPromise = $q.defer();

                        UserService.auth().then(function(response){
                            if(response.auth){
                                authPromise.resolve(response);
                            }else{
                                $state.go('appSimple.login');
                                //authPromise.reject(response.data);
                            }
                        },function(reason){
                            console.log(reason);
                            $state.go('appSimple.login');
                            //authPromise.resolve(reason);
                        })
                        return authPromise.promise;
                    }],
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ['js/controllers/controller.master.js']
                        });
                    }]
                }
            })

            .state('app.dashboard', {
                url: '/dashboard',
                param: {
                    page: "Dashboard"
                },
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ['js/controllers/controller.dashboard.js']
                        });
                    }]
                }
            })

            .state('app.patient-record', {
                url: '/patient-record',
                param: {
                    page: "Patient Record"
                },
                templateUrl: 'views/patient-record.html',
                controller: 'PatientRecordController',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ['js/controllers/controller.patient-record.js']
                        });
                    }]
                }
            })

            .state('app.patient-list', {
                url: '/patient-list',
                param: {
                    page: "Patient List"
                },
                templateUrl: 'views/patient-list.html',
                controller: 'PatientListController',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ['js/controllers/controller.patient-list.js']
                        });
                    }]
                }
            })

            .state('app.page2', {
                url: '/page2',
                templateUrl: 'views/page2.html',
                param: {
                    page: "Page 2"
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ['js/controllers/page2.js']
                        });
                    }]
                }
            })

            .state('appSimple', {
                abstract: true,
                templateUrl: 'views/common/layouts/general.html'
            })

            // Additional Pages
            .state('appSimple.login', {
                url: '/login',
                templateUrl: 'views/pages/login.html',
                param: {
                    page: "Login"
                },
                controller: 'LoginController',
                resolve: {
                    "Auth" : ['UserService','$state','$q',function(UserService,$state,$q){
                        var authPromise = $q.defer();

                        UserService.auth().then(function(response){
                            console.log(response);
                            if(response.auth){
                                $state.go('app.dashboard');
                            }else{
                                authPromise.resolve(response);
                            }
                            
                        },function(reason){
                            console.log(reason);
                            authPromise.resolve(reason);
                        })
                        return authPromise.promise;
                    }],
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ['js/controllers/controller.login.js']
                        });
                    }]
                }
            })
            .state('appSimple.register', {
                url: '/register',
                templateUrl: 'views/pages/register.html'
            })
            .state('appSimple.404', {
                url: '/404',
                templateUrl: 'views/pages/404.html'
            })
            .state('appSimple.500', {
                url: '/500',
                templateUrl: 'views/pages/500.html'
            })
    }]);
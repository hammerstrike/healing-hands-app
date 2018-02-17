angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $urlRouterProvider.otherwise('/dashboard');

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
                templateUrl: 'views/pages/login.html'
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
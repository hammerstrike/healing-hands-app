angular
    .module('app')
    /**
     * ===================================
     * Service  : LoaderService
     * ====================================
     * Description : Loader Service Service
     * Dependancies : '$rootScope'
     * @return : LoaderService Object with 2 methods show(), hide()
     */
    .factory('LoaderService', ['$rootScope', function ($rootScope) {
        return {
            
            /**
             * Show Loader
             */
            show: function () {
                $rootScope.loading = true;
            },

            /**
             * Hide Loader
             */
            hide: function () {
                $rootScope.loading = false;
            }
        }
    }])

    /**
     *  ===================================
     *  Service : CommonAjxService
     *  ===================================
     * Description : Common Ajax Service
     * Dependancies : '$q', '$http', 'LoaderService'
     * @return : CommonAjxService New Object with getData method
     */
    .factory('CommonAjxService', ['$q', '$http', 'LoaderService', function ($q, $http, LoaderService) {
        return {

            /**
             * Ajax call
             * @param {Object} config
             * @param {Bool} loader
             * @return {Promise} promise
             */
            getData: function (config, loader) {
                if (loader) {
                    LoaderService.show()
                };

                var deferred = $q.defer();

                //Ajx
                $http(config).then(function successCallback(response) {
                    deferred.resolve(response);
                    if (loader) {
                        LoaderService.hide()
                    };

                }, function errorCallback(response) {

                    deferred.reject(response);
                    if (loader) {
                        LoaderService.hide()
                    };
                });

                return deferred.promise;
            }
        }
    }])

    .service('UserService', ['$rootScope','$http', '$q', 'CommonAjxService', 'API_HOST', function ($rootScope,$http, $q, CommonAjxService, API_HOST) {

        function UserService() { 
            this.user = null
        };

        UserService.prototype = {
            login : function (data) {
                
                var config = {
                    method: 'POST',
                    url: API_HOST + 'user/login',
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                var _self = this;

                return CommonAjxService.getData(config, false).then(function (response) {
                    var result = response.data;
                    xAccessToken = (response.headers())["x-access-token"];
                    console.log(xAccessToken);

                    if(result.status == 'success') {
                        localStorage.setItem('x-access-token', xAccessToken);
                        _self.user = result.data.user;
                        return {
                            status: 'success',
                            data: result.data
                        };
                    }else{
                        localStorage.removeItem('x-access-token');
                        _self.user = null;
                        return {
                            status: 'fail',
                            data: result.data
                        };
                    };

                }, function (reason) {
                    localStorage.removeItem('x-access-token');
                    _self.user = null;
                    return {
                        status: 'fail',
                        data: reason
                    };
                }).catch(function(err){
                    localStorage.removeItem('x-access-token');
                    _self.user = null;
                    return {
                        status: 'error',
                        data: err
                    };
                });
            },

            auth : function (data) {
                
                var xAccessToken = localStorage.getItem('x-access-token');
                var config = {
                    method: 'POST',
                    url: API_HOST + 'user/auth',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token' : xAccessToken
                    }
                };
                var _self = this;
                return CommonAjxService.getData(config, false).then(function(response){
                    if(response.data.auth){
                        _self.user = response.data.user;
                        return {auth : true};
                    }else{
                        return {auth : false};
                    }
                },function(reason){
                    return {auth : false};
                })               
            },
        }

        return new UserService;
    }])

    /**
     * ===================================
     * Service : APIService
     * ===================================
     * Description : All API call function.
     * Dependancies : '$rootScope', '$q', 'CommonAjxService', 'API_HOST'
     * @return : APIService New Object
    */
    .service('APIService', ['$rootScope','$http', '$q', 'CommonAjxService', 'API_HOST', function ($rootScope,$http, $q, CommonAjxService, API_HOST) {

        function APIService() { };

        APIService.prototype = {
           
            
            addRecord: function (data) {
                var xAccessToken = localStorage.getItem('x-access-token');
                var config = {
                    method: 'POST',
                    url: API_HOST + 'patient/save',
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token' : xAccessToken
                    }
                };

                return CommonAjxService.getData(config, false).then(function (response) {
                    var result = response.data;
                    if(result.status == 'success') {
                        return {
                            status: 'success',
                            data: result.data
                        };
                    }else{
                        return {
                            status: 'fail',
                            data: result.data
                        };
                    };

                }, function (reason) {
                    return {
                        status: 'fail',
                        data: reason
                    };
                }).catch(function(err){
                    return {
                        status: 'error',
                        data: err
                    };
                });
            },

            getRecord: function (data) {
                var xAccessToken = localStorage.getItem('x-access-token');
                var config = {
                    method: 'POST',
                    url: API_HOST + 'patient/get',
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token' : xAccessToken
                    }
                };

                return CommonAjxService.getData(config, false).then(function (response) {
                    var result = response.data;
                    if(result.status == 'success') {
                        return {
                            status: 'success',
                            data: result.data
                        };
                    }else{
                        return {
                            status: 'fail',
                            data: result.data
                        };
                    };

                }, function (reason) {
                    return {
                        status: 'fail',
                        data: reason
                    };
                }).catch(function(err){
                    return {
                        status: 'error',
                        data: err
                    };
                });
            },

        }

        return new APIService;

    }])
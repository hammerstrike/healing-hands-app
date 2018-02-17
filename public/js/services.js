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

            /**
             * Add new Record
             * @param {Object} params
             * @return {Object} {status = [success/fail], data = [LOT object]}
            */

            addRecord: function (data) {
                
                var config = {
                    method: 'POST',
                    url: API_HOST + 'record/save',
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
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
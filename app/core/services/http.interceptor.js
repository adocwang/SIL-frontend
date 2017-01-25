export default function httpInterceptor($q, $window, $injector, $rootScope) {
  'ngInject';

  var PensionService,
    requestInterceptor = {

      response: function (response) {
        var deferred = $q.defer();
        if (response.data && (response.data.code == 2001 || response.data.code == 2002)) {
            $window.location.href = '/users/login';
        }

        deferred.resolve(response);
        return deferred.promise;
      },

      request: function (config) {
        var deferred = $q.defer();

        config.timeout = 1000 * 100;

        // $http.defaults.headers.common['authorization']
        config.headers['authorization'] = localStorage.getItem('AUTHORIZATION_TOKEN') || '';
        $rootScope.AUTHORIZATION_TOKEN = config.headers['authorization'];

        deferred.resolve(config);
        return deferred.promise;
      }
  };

  return requestInterceptor;

}

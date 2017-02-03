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
// localStorage.getItem('AUTHORIZATION_TOKEN') || 
        // $http.defaults.headers.common['authorization']
        config.headers['extra'] = '{"token":"iamsuperman:15828516285"}';
        $rootScope.AUTHORIZATION_TOKEN = config.headers['extra'];

        deferred.resolve(config);
        return deferred.promise;
      }
  };

  return requestInterceptor;

}

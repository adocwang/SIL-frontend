export default function httpInterceptor($q, $window, $injector, $rootScope) {
  'ngInject';

  const requestInterceptor = {

      response: function (response) {
        const deferred = $q.defer();
        if (response.data && (response.data.code == 2001 || response.data.code == 2002)) {
            $window.location.href = '/login.html';
        }

        deferred.resolve(response);
        return deferred.promise;
      },

      request: function (config) {
        const deferred = $q.defer();

        config.timeout = 1000 * 100;
// localStorage.getItem('SIL_TOKEN') || 
        // $http.defaults.headers.common['authorization']
        config.headers['extra'] = '{"token":"iamsuperman:15828516285"}';
        $rootScope.AUTHORIZATION_TOKEN = config.headers['extra'];

        deferred.resolve(config);
        return deferred.promise;
      }
  };

  return requestInterceptor;

}

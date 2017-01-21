function configProvider() {
  'ngInject';

  var conf = {
    theme: {
      blur: false
    }
  };

  conf.changeTheme = function(theme) {
    angular.merge(conf.theme, theme)
  };

  conf.$get = function () {
    delete conf.$get;
    return conf;
  };
  return conf;
}

export default configProvider;

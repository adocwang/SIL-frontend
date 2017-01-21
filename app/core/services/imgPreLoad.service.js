/**
 * @ngInject
 * @description 判断图片是否加载成功
 * ref: http://stackoverflow.com/questions/24569270/preload-background-image-using-angularjs-promises
 */
export default function imgPreLoadService($q) {
  'ngInject';

  return function(url) {
      var deffered = $q.defer(),
          image = new Image();

      image.src = url;

      if (image.complete) {
        deffered.resolve();
      } else {
        image.addEventListener('load', function() {
          deffered.resolve();
        });

        image.addEventListener('error', function() {
          deffered.reject();
        });
      }

      return deffered.promise;
  }

}

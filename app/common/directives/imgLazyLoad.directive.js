/**
 * @description 如果原图加载失败，则加载默认图片
 * @example
 * <img img-lazy-load avatar-id="{{item.avatar}}" class="avatar"/>
 */
export default function imgLazyLoad(imgPreLoadService, $timeout) {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      avatar: '@',
      avatarId: '@'
    },
    link: function(scope, element, attrs) {

      let baseUrl = 'http://static.maimai100.cn/avatar/';

      if(scope.avatar) {
        scope.$watch('avatar', (val) => setUrl(val));
      }else if(scope.avatarId) {
        scope.$watch('avatarId', (val) => setUrl(baseUrl + val));
      }else {
        setUrl(attrs.default);
      }

      function setUrl(url) {
        if(!url || url === baseUrl) return;

        imgPreLoadService(url).then(function(){
          $timeout(function() {
              $(element)
                .attr('src', '/dist/images/common/blank.gif')
                .css({
                    'background-image': 'url("' + url + '")',
                    'background-size': 'cover'
                });
              $(element).fadeIn();
          });
        }, function(err){
          $(element).css({
            'background-image': 'url("http://static.maimai100.cn/avatar/man.png")',
            'background-size': 'cover'
          });
        });
      }

    }
  };
}

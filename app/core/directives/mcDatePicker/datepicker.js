export default function DatePickerDirective($timeout) {
  'ngInject';

  return {
        restrict: 'EA',
        templateUrl: 'core/directives/mcDatePicker/datepicker.html',
        replace: true,
        scope: {
            id: '@',
            startDate: '=',
            minDate: '=',
            maxDate: '=',
            minView: '=',
            view: '=',
            changeBy: '=',
            changeTime: '&'
        },
        link: (scope, elem, attrs) => {
            let source = attrs.timeSource,
                ctrlAlias = attrs.ctrlAlias,
                isClosed = false;

            scope.showDatePicker = (e) => {
                let target = e.currentTarget;
                if (target.classList.contains('open')) {
                    scope.hideDatePicker(e);
                } else {
                    target.classList.add('open');
                    // target.children('div').children().removeClass('hidden');
                    let children = target.children;
                    let child, grandSon;

                    for(let i = 0, len = children.length; i < len; i++){
                      if(children[i] && children[i].tagName.toUpperCase() == 'DIV') {
                        child = children[i];

                        break;
                      }
                    }


                    grandSon = child.children;

                    for(let i = 0, len = grandSon.length; i < len; i++){
                      grandSon[i].classList.remove('hidden');
                    }


                }

                isClosed = false;
            };
            scope.hideDatePicker = (e) => {
              isClosed = true;
              if(elem.length){
                for(let i = 0, len = elem.length; i < len; i++){
                  elem[i].classList.remove('open');
                }
              } else {
                elem.classList.remove('open');
              }
            };
            scope.mouseLeave = (e) => {
                scope.hideDatePicker(e);
            };

            let unbindHidePicker = scope.$on('hidePicker', scope.hideDatePicker);
            scope.$on('$destroy', unbindHidePicker);

            scope.$watch('startDate', () => {

                // 基于scope.$parent.$ctrl
                // 此处根据是否有手动传入time-source,来动态指定时间变量
                // 默认设置startDate
                if( source ){
                    let timeVar = getSource();
                    timeVar = scope.startDate;
                }else{
                    scope.$parent[ctrlAlias ? ctrlAlias : '$ctrl'].startDate = scope.startDate;
                }

                // TODO: changeOnInit: 是否在页面初始化时触发

                // changeBy: 'close', 如指定changeBy, 则只在该type变化时才触发事件
                if(attrs.changeBy) {
                    if(attrs.changeBy === 'close' && isClosed) { // 当面板关闭时才触发事件
                        $timeout(() => {
                            scope.changeTime();
                        }, 0);
                    }
                }else{
                    $timeout(() => {
                        scope.changeTime();
                    },0);
                }

            });

            function getSource(){
                let arr = source.split('.'),
                    obj = scope.$parent[ctrlAlias ? ctrlAlias : '$ctrl'];

                for( let i = 0 , l = arr.length ; i < l ; i++ ){
                    obj = obj[ arr[i] ];
                }
                return obj;
            }

            //获取parentCtrl时间点
            let unbindToChild = scope.$on('to-child',() => {
                //arguments[1] example: 2015-01-15
                // console.log( arguments );
                scope.startDate = arguments[1];
                scope.minDate = arguments[2];
            });
            scope.$on('$destroy', unbindToChild);

        }
    };
};

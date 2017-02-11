export class DashboardController {

  constructor($rootScope, $scope, baseService, utilService, AppSettings) {
    'ngInject';

    this.html = '';

    this.text = '### 标题\n'+
				'```\nconsole.log(Array.every(classes, Boolean));\n```\n'+
				'```javascript\nconsole.log(Array.every(classes, Boolean));\n```\n'+
				'```xml\n<html>\n\t<head>\n\t</head>\n\t<body>\n\t</body>\n</html>\n```';

	  var destroyWatchText = $scope.$watch('vm.text', () => {
  		console.log(marked(this.text));

      this.html = marked(this.text);
  	});
/*
  * $scope销毁的时候,结束监听
  */
    $scope.$on('$destroy', destroyWatchText);

    this.init();

  }

  init() {

   
  }

}

export const dashboard = {
  templateUrl: 'modules/dashboard/dashboard.html',
  controller: DashboardController,
  controllerAs: 'vm'
};

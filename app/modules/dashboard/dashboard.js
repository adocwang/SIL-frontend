export class DashboardController {

  constructor($rootScope, baseService, utilService, AppSettings) {
    'ngInject';


    this.init();

  }

  init() {

   
  }

}

export const dashboard = {
  templateUrl: 'modules/dashboard/dashboard.html',
  controller: DashboardController
};

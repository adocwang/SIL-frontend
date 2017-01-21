export class McPaginationController {
  constructor($timeout) {
    'ngInject';

    this._timeout = $timeout;
  }

  pageChanged() {
    // console.log(this);

    this._timeout( () => {
      this.pageChange && this.pageChange();
    });
  }

};

export const mcPagination = {
  templateUrl: 'core/components/mcPagination/index.html',
  controller: McPaginationController,
  controllerAs: 'vm',
  bindings: {
    currentPage: '=',
    totalItems: '=',
    itemsPerPage: '=',
    pageChange: '&'
  }
};

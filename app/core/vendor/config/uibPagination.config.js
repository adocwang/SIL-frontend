import angular from 'angular';

function paginationConfig(uibPaginationConfig) {
  'ngInject';

  angular.extend(uibPaginationConfig, {
    // itemsPerPage: 10,
    boundaryLinks: true,
    rotate: false,  // Whether to keep current page in the middle of the visible ones.
    maxSize: 10, // Limit number for pagination size.
    previousText: '上一页',
    nextText: '下一页',
    firstText: '首页',
    lastText: '尾页'
  });
}

export default paginationConfig;

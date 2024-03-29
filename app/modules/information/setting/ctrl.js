

class Controller {

  constructor($injector, $state, $location, $validation, $stateParams, toastr, $uibModal, ConfigService) {
    'ngInject';

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._validationProvider = $validation;

    this._toastr = toastr;

    this._service = ConfigService;

    this.filters = {};

    this.key = 'finding.template';


    this.typeList = [
      {
        type: 'input',
        title: '单行文本'
      },
      {
        type: 'textarea',
        title: '多行文本'
      },
      {
        type: 'img',
        title: '图片',
      },
      {
        type: 'select',
        title: '下拉选择',
      },
      {
        type: 'checkbox',
        title: '多选框',
      },
    ];

    this._init();

  }

  _init() {
    this._getTemplate();

  }

  _getTemplate() {
    this._service.get(this.key).then(data => {
      if(data) {
        this.collectList = angular.fromJson(data);
      } else {
        this.initCollectInfo();
      }
    }).catch(e => {
      this.initCollectInfo();
    });
  }

  initCollectInfo() {
    this.collectList = [];

    this.addProject();
  }

  typeChange(item) {
    if (['select', 'checkbox'].indexOf(item.type) > -1) {
      item.needData = true;
    } else {
      item.needData = false;
    }
  }

  addProject() {
    let projectObj = {
      name: '',
      isRequired: false,
      content: []
    };
    this.collectList.push(projectObj);
    this.addItem(projectObj);
  }

  deleteProject(index) {
    this.collectList.splice(index, 1);
  }

  addItem(project) {
    let contentObj = {
      title: '',
      type: 'input',
      description: '',
      isRequired: false,
      needData: false,
      dataSource: []
    };

    project.content.push(contentObj);

    this.addData(contentObj);
  }

  deleteItem(proj, index) {
    proj.content.splice(index, 1);
  }

  addData(item) {
    item.dataSource.push({
      description: ''
    });
  }

  deleteData(item, index) {
    item.dataSource.splice(index, 1);
  }



  submit(form) {
    //验证表单
    this._validationProvider.validate(form).success(() => {
      this.saveFunc();
    });
  }

  saveFunc() {
    // console.log('submit')

    // console.log(this.collectList, JSON.stringify(this.collectList));

    this._service.set({
      key: this.key,
      value: angular.toJson(this.collectList)
    }).then(data => {
      this._toastr.success('保存成功');
    });
  }

}

export default Controller;

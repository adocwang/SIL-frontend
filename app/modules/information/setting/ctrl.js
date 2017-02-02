

class Controller {

  constructor($injector, $state, $location, $validation, $stateParams, toastr, $uibModal, PickerService) {
    'ngInject';

    this._state = $state;
    this._location = $location;
    this._stateParams = $stateParams;
    this._modal = $uibModal;

    this._validationProvider = $validation;

    this._toastr = toastr;

    this._pickerService = PickerService;

    this.filters = {};


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
    this.initCollectInfo();

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
      name: ''
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
    console.log('submit')
  }

}

export default Controller;

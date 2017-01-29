const defaultPickerOptions = {
  min: 1,
  max: 0,
  title: '添加项目',
  itemType: '项目',
  itemUnit: '个',
  itemPosition: '',
  searchPlaceholder: '请输入项目名称',
  selectedItems: null,

  params: null,

  idKey: 'id',
  nameKey: 'name',
  avatarKey: 'avatar'
};

class PickerController {
  constructor($http, httpHelper, $uibModalInstance, pickerOptions) {
    'ngInject';

    this._http = $http;
    this._httpHelper = httpHelper;

    this._modalInstance = $uibModalInstance;

    this.options = {...defaultPickerOptions, ...pickerOptions};

    this.selectionItem = [];

    this.list = [];

    this.getList();
  }

  _getList(params) {
    let {url} = this.options;
    if(!url) {
      console.error('mcPicker', 'Url is required.')
      return ;
    }

    this._httpHelper.blockUI.start();

    return this._http.get(url, {params: params}).then(this._httpHelper.verify,  this._httpHelper.error);
  }

  getList() {
    let {list} = this.options;
    if(list) {
      this.list = this._formatData(list);
      return;
    }

    let params = {...{
      pageSize: 1000
    }, ...(this.options.params || {})};
    this._getList(params).then(data => {
      this.list = this._formatData( data.list );
    });
  }

  getValue(obj, key){
    let keyArr = key.split('.');

    keyArr.forEach(k => {
      obj = obj[k];
    });

    return obj;
  }

  _formatData(data) {
    let {selectedItems, idKey, nameKey, avatarKey} = this.options;
    let tmpHashObj = {};

    if(selectedItems && selectedItems.length > 0) {
      selectedItems.forEach(item => {
        tmpHashObj[item.id] = true;
      });
    }

    return data.map(item => {
      let tmpObj = {
        id: item[idKey],
        name: this.getValue(item, nameKey),
        avatar: item[avatarKey] || '/images/common/man.png'
      };
      if( tmpHashObj[tmpObj.id] ) {
        tmpObj.selected = true;

        this.selectionItem.push(tmpObj);
      }

      tmpObj = Object.assign(item, tmpObj);

      return tmpObj;
    });
  }

  cancel() {
    // this.onClose && this.onClose(this.selectionItem);
    this._modalInstance.dismiss('cancel');
  }

  ok() {
    let len = this.selectionItem.length;
    let {max, min} = this.options;

    if( len < min || (max > 0 && len > max) ){
      return false;
    }
    this._modalInstance.close( this.selectionItem );
  }

  toggleItemSelected(item) {
    let index = this.selectionItem.indexOf( item );
    if(index > -1) {
      item.selected = false;
      this.selectionItem.splice(index, 1);
    } else {
      // max restrict
      if(this.options.max === 1) {
        this.list.map(item => {
          item.selected = false;
          return item;
        });
        this.selectionItem = [];
      }else if(this.options.max > 1) {
        let filtered = this.list.filter(item => item.selected);
        if(filtered.length === this.options.max) {
          item.selected = false;
          return;
        }
      }

      item.selected = true;
      this.selectionItem.push( item );
    }

    // console.log(this.selectionItem);
  }
}

const pickerConfiguration = {
  templateUrl: 'core/components/mcPicker/template.html',
  controller: PickerController,
  controllerAs: 'vm'
};

export default pickerConfiguration;

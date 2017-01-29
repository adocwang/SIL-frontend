import angular from 'angular';

import pickerConfiguration from './ctrl';

const noop = function(){console.log('no callback');};


class PickerService {
  constructor($uibModal) {
    'ngInject';
    this._modal = $uibModal;
  }

  open(pickerOptions, options, callback) {

    if( typeof options == 'function' ){
      callback = options;
      options = {};
    }

    if( typeof pickerOptions == 'function' ){
      callback = pickerOptions;
      pickerOptions = {};
      options = {};
    }

    let opts = Object.assign({
      animation: true,
      size: 'lg',
      resolve: {
        pickerOptions: function(){
          pickerOptions = pickerOptions || {};
          return {...pickerOptions};
        }
      }
    }, pickerConfiguration, options || {});

    // console.log(this);

    let modalInstance = this._modal.open( opts );

    if(typeof callback !== 'function') {
      callback = noop;
    }

    modalInstance.result.then( selectedItems => {
      // console.log(selectedItems);
      callback.call(null, {status: 0, info: 'success', data: [...selectedItems]});

    }).catch( () => callback.call(null, {status: 1, info: 'dismiss', data: []}) );

    return modalInstance;
  }


}
export default PickerService;

export default class Controller {
  constructor($scope, $state, $validation, $uibModalInstance, toastr, BankService, info) {
    'ngInject';

    this._scope = $scope;
    this._state = $state;

    this._validationProvider = $validation;

    this._modalInstance = $uibModalInstance;
    this._toastr = toastr;

    this._service = BankService;

    this.info = info;
    if (this.info.coordinates == null ) {
      this.longitude = 114.062663,
      this.latitude = 22.549316
    } else {
      [this.longitude, this.latitude] = this.info.coordinates.split(",");
    }

    this.opts = {
      center: {
        longitude: this.longitude,
        latitude: this.latitude
      },
      zoom: 11,
      city: 'ShenZhen',
      enableScrollWheelZoom: true
    }
  }

  loadMap(map) {
    var that = this;
    map.addEventListener("click",function(e){
      var pt = e.point;
      that.lat = pt.lat;
      that.lng = pt.lng;
      new BMap.Geocoder().getLocation(
        pt, function(rs){
        var addComp = rs.addressComponents;
        var r = confirm(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        if (r) {
          that._service.set({
            id: that.info.id,
            address: addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber,
            coordinates: that.lng+ "," + that.lat
          }).then(data => {
            that.cancel();
            that._toastr.success('设置成功');
            that._state.reload();
          });
        }
      })
    });
  };

  cancel() {
    this._modalInstance.close();
  }
}

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
      this.longitude = 116.331398,
      this.latitude = 39.897445
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
    map.disableAutoResize();
    map.enableAutoResize();
    if (this.info.coordinates == null) {
      function myFun(result){
        var cityName = result.name;
        map.setCenter(cityName);
      }
      var myCity = new BMap.LocalCity();
      myCity.get(myFun);
    } else {
      var point = new BMap.Point(this.longitude,this.latitude);
      new BMap.Geocoder().getLocation(
          point, function(rs){
            map.setCenter(rs.addressComponents.city);
          });
    }
    var that = this;
    map.addEventListener("click",function(e){
      var pt = e.point;
      that.latitude = pt.lat;
      that.longitude = pt.lng;
      new BMap.Geocoder().getLocation(
        pt, function(rs){
        var addComp = rs.addressComponents;
        var r = confirm(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        if (r) {
          that._service.set({
            id: that.info.id,
            address: addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber,
            coordinates: that.longitude+ "," + that.latitude
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

/*!
 * angular-qq-map
 * http://gitlab.magicare.me/node-modules/angular-qq-map
 * Version: 1.0.3 - 2016-03-09T11:32:42.364Z
 * License: MIT
 */


(function () { 
'use strict';
var app = angular.module('ui.map', ['ui.event']);
//Setup map events from a qq map object to trigger on a given element too,
//then we just use ui-event to catch events from an element
function bindMapEvents(scope, eventsStr, googleObject, element) {
  angular.forEach(eventsStr.split(' '), function (eventName) {
    //Prefix all qqmap events with 'map-', so eg 'click'
    //for the googlemap doesn't interfere with a normal 'click' event
    window.qq.maps.event.addListener(googleObject, eventName, function (event) {
      element.triggerHandler('map-' + eventName, event);
      //We create an $apply if it isn't happening. we need better support for this
      //We don't want to use timeout because tons of these events fire at once,
      //and we only need one $apply
      if (!scope.$$phase) {
        scope.$apply();
      }
    });
  });
}

app.constant('uiMapConfig', {})
  .directive('uiMap', ['uiMapConfig', '$window', '$parse', 'uiMapLoadParams', '$timeout',
    function (uiMapConfig, $window, $parse, uiMapLoadParams, $timeout) {

      var mapEvents = 'click dblclick rightclick mouseover mouseout mousemove drag dragstart dragend bounds_changed center_changed zoom_changed maptypeid_changed projection_changed idle tilesloaded resize';
      var options = uiMapConfig || {};
      return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
          var map,
            opts = angular.merge({}, options, scope.$eval(attrs.uiOptions));

          scope.$watch(attrs.uiOptions, function () {
            opts = angular.merge({}, options, scope.$eval(attrs.uiOptions));
          });

          scope.$on('map.loaded', function (e, type) {
            if (type == 'qq' && !map) {
              initMap();
            }
          });

          if ($window.qq && $window.qq.maps && $window.qq.maps.Map) {
            initMap();
          }

          function initMap() {
            if (opts.uiMapCache && $window[attrs.uiMapCache]) {
              elm.replaceWith(window[attrs.uiMapCache]);
              map = $window[attrs.uiMapCache + 'Map'];
            } else {

              if (opts.center &&
                angular.isNumber(opts.center.lat) &&
                angular.isNumber(opts.center.lng)) {
                opts.center = new $window.qq.maps.LatLng(opts.center.lat, opts.center.lng);
              }

              // load by lat/lng default with marker
              /*if(opts.loadPosition && !angular.isArray(opts.loadPosition) && opts.loadPosition.lat && opts.loadPosition.lng) {
                opts.center.lat = opts.loadPosition.lat;
                opts.center.lng = opts.loadPosition.lng;
              }*/

              !angular.isNumber(opts.zoom) && delete opts.zoom;

              map = new $window.qq.maps.Map(elm[0], opts);

              if(opts.markers && opts.markers.length > 0) {
                var latlngBounds = new $window.qq.maps.LatLngBounds();

                angular.forEach(opts.markers, function (item) {
                  var latLng = new $window.qq.maps.LatLng(item.lat, item.lng),
                      markerOpts = {
                        map: map,
                        position: latLng
                      };

                  if(item.icon) {
                    angular.extend(markerOpts, {
                      icon: new $window.qq.maps.MarkerImage(item.icon)
                    });
                  }

                  new $window.qq.maps.Marker(markerOpts);

                  latlngBounds.extend(latLng);
                });

                $timeout(function(){
                  map.fitBounds(latlngBounds);
                }, 500);
              }

              /*if(opts.loadPosition) {
                var latlngBounds = new $window.qq.maps.LatLngBounds();

                if(angular.isArray(opts.loadPosition)) {
                  angular.forEach(opts.loadPosition, function (item) {
                    var latLng = new $window.qq.maps.LatLng(item.lat, item.lng);
                    new $window.qq.maps.Marker({
                      map: map,
                      position: latLng
                    });
                    latlngBounds.extend(latLng);
                  });
                } else {
                  var latLng = new $window.qq.maps.LatLng(opts.center.lat, opts.center.lng);

                  new $window.qq.maps.Marker({
                    map: map,
                    position: latLng
                  });
                  latlngBounds.extend(latLng);
                }

                $timeout(function(){
                    map.fitBounds(latlngBounds);
                }, 200);
              }*/

              /*if(opts.loadPosition && opts.loadPosition.showMarker) {
                var latlngBounds = new $window.qq.maps.LatLngBounds(),
                  latLng = new $window.qq.maps.LatLng(opts.center.lat, opts.center.lng);

                var marker = new $window.qq.maps.Marker({
                  map: map,
                  position: latLng
                });

                $timeout(function(){
                  latlngBounds.extend(latLng);
                  map.fitBounds(latlngBounds);
                }, 200);
              }*/

              opts.searchLocalCity && searchLocalCity();

              $window.qq.maps.event.addListener(map, 'tilesloaded', function () {
                scope.$broadcast("map.rendered", 'qq');
              });
            }

            var model = $parse(attrs.uiMap);
            //Set scope variable for the map
            model.assign(scope, map);
            bindMapEvents(scope, mapEvents, map, elm);
          }

          function searchLocalCity() {
            var citylocation = new qq.maps.CityService();
            citylocation.setComplete(function(result) {
                map.setCenter(result.detail.latLng);
            });
            citylocation.setError(function() {
                console.error('出错了，请输入正确的经纬度！！！');
            });
            citylocation.searchLocalCity();
          }

        }
      };
    }
  ]);

app.value('mapAutocompleteConfig', {
  pageIndex: 0,
  pageCapacity: 5
})
  .directive('mapAutocomplete', ['mapAutocompleteConfig', '$window', '$parse', '$compile', 'uiMapLoadParams', '$timeout',
    function (mapAutocompleteConfig, $window, $parse, $compile, uiMapLoadParams, $timeout) {

      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          // TODO: use scope @ = restrict
          var opts = angular.merge({}, mapAutocompleteConfig, scope.$eval(attrs.mapOptions)),
            libs = uiMapLoadParams.libraries,
            input = ele[0],
            mapData = scope.$eval(attrs.mapData),
            searchServiceOpts = scope.$eval(attrs.mapSearchService),
            initMarkerByAddress = scope.$eval(attrs.initMarkerByAddress),
            attrNames = scope.$eval(attrs.attrNames);

          scope.$on('map.loaded', function (e, type) {

            // load by postion
            scope.$watch(attrs.mapData, function(val) {
              var address = val[attrNames.address],
                lat = val[attrNames.lat],
                lng = val[attrNames.lng];

              if(lat && lng && angular.isNumber(+lat) && angular.isNumber(+lng)) {
                initMarkerByAddress && angular.isFunction(initMarkerByAddress) &&
                initMarkerByAddress(new $window.qq.maps.LatLng(lat, lng), address);
              }
            });

            if(libs.length && ~libs.split(',').indexOf('place')) {

              if ($window.qq && $window.qq.maps && $window.qq.maps.Map) {

                  var ap = new $window.qq.maps.place.Autocomplete(input, opts),
                    searchService = new qq.maps.SearchService(searchServiceOpts);

                  $window.qq.maps.event.addListener(ap, 'confirm', function (res) {
                    opts.location && searchService.setLocation(opts.location);
                    opts.pageIndex && searchService.setPageIndex(opts.pageIndex);
                    opts.pageCapacity && searchService.setPageCapacity(opts.pageCapacity);

                    searchService.search(res.value);
                  });
              }
            }

          });
        }
      }
  }]);

app.value('uiMapInfoWindowConfig', {})
  .directive('uiMapInfoWindow', [
    'uiMapInfoWindowConfig', '$window', '$parse', '$compile',
    function (uiMapInfoWindowConfig, $window, $parse, $compile) {
      var infoWindowEvents = 'content_changed position_changed zindex_changed closeclick closeclick';
      var options = uiMapInfoWindowConfig || {};
      return {
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
          opts.content = elm[0];
          var model = $parse(attrs.uiMapInfoWindow);
          var infoWindow = model(scope);

          scope.$on('map.loaded', function (e, type) {
            if (type == 'qq' && !infoWindow) {
              initInfoWindow();
            }
          });

          if ($window.qq && $window.qq.maps && $window.qq.maps.Map) {
            initInfoWindow();
          }

          function initInfoWindow() {
            if (!infoWindow) {
              infoWindow = new window.qq.maps.InfoWindow(opts);
              model.assign(scope, infoWindow);

              bindMapEvents(scope, infoWindowEvents, infoWindow, elm);
              /* The info window's contents dont' need to be on the dom anymore,
               google maps has them stored.  So we just replace the infowindow element
               with an empty div. (we don't just straight remove it from the dom because
               straight removing things from the dom can mess up angular) */
              elm.replaceWith('<div></div>');
              //Decorate infoWindow.open to $compile contents before opening
              var _open = infoWindow.open;
              infoWindow.open = function open(a1, a2, a3, a4, a5, a6) {
                $compile(elm.contents())(scope);
                _open.call(infoWindow, a1, a2, a3, a4, a5, a6);
              };
            }
          }
        }
      };
    }
  ]);

/*
 * Map overlay directives all work the same. Take map marker for example
 * <ui-map-marker="myMarker"> will $watch 'myMarker' and each time it changes,
 * it will hook up myMarker's events to the directive dom element.  Then
 * ui-event will be able to catch all of myMarker's events. Super simple.
 */
function mapOverlayDirective(directiveName, events) {
  app.directive(directiveName, [function () {
    return {
      restrict: 'A',
      link: function (scope, elm, attrs) {
        scope.$watch(attrs[directiveName], function (newObject) {
          if (newObject) {
            bindMapEvents(scope, events, newObject, elm);
          }
        });
      }
    };
  }]);
}

mapOverlayDirective('uiMapMarker', 'animation_changed clickable_changed cursor_changed draggable_changed flat_changed icon_changed map_changed position_changed shadow_changed shape_changed title_changed visible_changed zindex_changed click mousedown mouseup mouseover mouseout dblclick rightclick dragstart dragging dragend');
mapOverlayDirective('uiMapPolyline', 'map_changed visible_changed zindex_changed click dblclick rightclick mousedown mouseup mouseover mouseout mousemove');
mapOverlayDirective('uiMapPolygon', 'map_changed visible_changed zindex_changed click dblclick rightclick mousedown mouseup mouseover mouseout mousemove');
mapOverlayDirective('uiMapCircle', 'center_changed map_changed radius_changed visible_changed zindex_changed click dblclick rightclick mousedown mouseup mouseover mouseout mousemove');
mapOverlayDirective('uiMapGroundOverlay', 'map_changed visible_changed click mousedown mousemove mouseout mouseover mouseup rightclick');

app.provider('uiMapLoadParams', function uiMapLoadParams() {
    var params = {};

    this.setParams = function (ps) {
      params = ps;
    };

    this.$get = function uiMapLoadParamsFactory() {
      return params;
    };
  })
  .directive('uiMapAsyncLoad', ['$window', '$parse', 'uiMapLoadParams',
    function ($window, $parse, uiMapLoadParams) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {

          $window.mapqqLoadedCallback = function mapqqLoadedCallback() {
            scope.$broadcast("map.loaded", "qq");
          };

          var params = angular.extend({}, uiMapLoadParams, scope.$eval(attrs.uiMapAsyncLoad));

          params.callback = "mapqqLoadedCallback";

          if (!($window.qq && $window.qq.maps && $window.qq.maps.Map)) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://map.qq.com/api/js?" + param(params);
            document.body.appendChild(script);
          } else {
            mapqqLoadedCallback();
          }
        }
      }
    }]);

function param(a, traditional) {
  var prefix,
    s = [],
    add = function (key, value) {
      // If value is a function, invoke it and return its value
      value = angular.isFunction(value) ? value() : ( value == null ? "" : value );
      s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };

  // If an array was passed in, assume that it is an array of form elements.
  if (angular.isArray(a) || ( a.jquery && !angular.isObject(a) )) {
    // Serialize the form elements
    angular.forEach(a, function () {
      add(this.name, this.value);
    });

  } else {
    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it), otherwise encode params recursively.
    for (prefix in a) {
      buildParams(prefix, a[prefix], traditional, add);
    }
  }

  // Return the resulting serialization
  return s.join("&").replace(r20, "+");
}

var r20 = /%20/g;

function buildParams(prefix, obj, traditional, add) {
  var name;

  if (angular.isArray(obj)) {
    // Serialize array item.
    angular.forEach(obj, function (v, i) {
      if (traditional || rbracket.test(prefix)) {
        // Treat each array item as a scalar.
        add(prefix, v);

      } else {
        // Item is non-scalar (array or object), encode its numeric index.
        buildParams(prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add);
      }
    });

  } else if (!traditional && angular.isObject(obj)) {
    // Serialize object item.
    for (name in obj) {
      buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }

  } else {
    // Serialize scalar item.
    add(prefix, obj);
  }
}

var decode = decodeURIComponent;

}());
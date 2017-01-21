import angular         from 'angular';
import orderSource     from './orderSource';
import oldType     from './oldType';
import serviceType     from './serviceType';
import payWay     from './payWay';
import serviceWay     from './serviceWay';
import diseaseHistory     from './diseaseHistory';
import orderStatus     from './orderStatus';
import dayTime 		from './dayTime';
import modeId from './modeId';
import addressFormat from './addressFormat';
import timeFormat from './timeFormat';
import fix from './fix';

export default angular.module('app.common.filters', [])
.filter('orderSource', orderSource)
.filter('oldType', oldType)
.filter('serviceType', serviceType)
.filter('payWay', payWay)
.filter('serviceWay', serviceWay)
.filter('diseaseHistory', diseaseHistory)
.filter('orderStatus', orderStatus)
.filter('dayTime', dayTime)
.filter('modeId', modeId)
.filter('addressFormat', addressFormat)
.filter('timeFormat', timeFormat)
.filter('fix', fix)

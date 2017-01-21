import angular                  from 'angular';
import {expression, defaultMsg} from './../../../common/constants/regExpRule';

function validationRuleConfig($validationProvider) {
  'ngInject';

  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

}

export default validationRuleConfig;

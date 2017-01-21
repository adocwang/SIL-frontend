import FormEditableController from './form-editable.ctrl';


export default function FormEditable($parse) {
  'ngInject';

  return {
    restrict: 'A',
    require: ['form', 'formEditable'],
    controller: FormEditableController,
    compile: function() {
      return {
        pre: function(scope, elem, attrs, ctrl) {
          var form = ctrl[0],
            submitBtn = angular.element(elem).find('[type=submit]');

          angular.extend(form, ctrl[1]);

          //console.log(form);

        },

        post: function(scope, elem, attrs, ctrl) {
          var eForm = ctrl[1];
          //console.log(eForm)

          // onbeforesave, onaftersave
          if(!attrs.ngSubmit && !attrs.submit) {

            if(attrs.onaftersave) {
              eForm.$onaftersave = function() {
                return $parse(attrs.onaftersave)(scope, {$data: eForm.$data});
              };
            }

            elem.bind('submit', function(event) {
              console.log('submit')
              event.preventDefault();
              scope.$apply(function() {
                eForm.$submit();
              });
            });

          }

        }
      }
    }
  }
}

export default function FormEditableController () {
  'ngInject';

  this.base = {
    $show: function() {
      if (this.$visible) {
        return;
      }

      this.$visible = true;
    },

    $hide: function() {
      if (!this.$visible) {
        return;
      }
      this.$visible = false;

    },

    $cancel: function() {
      if (!this.$visible) {
        return;
      }

      // self hide
      this.$hide();
    },

    $submit: function() {

      this.$onaftersave();

    }

  };


  return angular.extend({
    $visible: false,
    $waiting: false
  }, this.base);

}

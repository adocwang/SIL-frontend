class Controller {

  constructor($state, toastr, MessageService) {
    'ngInject';

    this._state = $state;
    this._toastr = toastr;

    this._service = MessageService;

    this.info = {id: 1, title: '单独的表单控件会被自动赋予一些全局样式', link: '/', content: '单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 <input>、<textarea> 和 <select> 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。'};
	}

	delete() {
		console.log(this.info.id);
		let ids = [this.info.id];
		this._service.delete({ids}).then(data => {
      this._toastr.success('删除成功!');
      this._state.go('message.list');
    });
	}
}

export default Controller;
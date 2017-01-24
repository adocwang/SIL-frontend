class Controller {

  constructor() {
    'ngInject';
    this.info = {id: 1, title: '单独的表单控件会被自动赋予一些全局样式', link: '/', content: '单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 <input>、<textarea> 和 <select> 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。'};
	}

	delete() {
		console.log(this.info.id);
	}
}

export default Controller;
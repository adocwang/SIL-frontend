# MC-Bootstrap (机构后台V2版本)

**mc-bootstrap**是一个基于bootstrap(>4.0版本)的前端框架,目前实现了Avatar、Button、Color、Datepicker、Font、Form、Heading、Modal、Menu、Navbar、Table等。

-------------------

[TOC]


## Avatar
> 目前定义了3种类型的头像，分为圆角和直角2种类型，规格分别为：
+ 90 * 90（列表页面）
+ 70 * 70（带内容的列表）
+ 48 * 48（详情页面）


## Button
> box-sizing:border-box
> 按钮根据用途大致可以分为搜索栏按钮、内容区域按钮2类，主要表现为规格的不同：
+ 小按钮：带边框30px高度，字号14px，行高1.4，内边距5px 10px, border-radius: 2px;
+ 大按钮：带边框34px高度，字号16px，行高1.5,内边距5px 10px, border-radius: 3px;
+ icon与文字之间相距10px;

## Color

### text
+ @dark-color: #323232
+ @light-color: #7f7f7f
+ @deep-light-color: #a6a6a6
+ @white-color: #fff
+ @danger-text-color: #f16350
+ @success-text-color: #1db65e
+ @warning-text-color: #f8b238

### buttons
+ btn-default:
	- border: solid 1px d9d9d9
``` css
	/* 基础按钮 */
	.btn{
		padding: 5px 15px;
	}

	/* 默认按钮 */
	.btn-default{
		border: solid 1px d9d9d9;
		background: #fff;
		&:hover{
			box-shadow: 0 3px 4px rgba(0,0,0,.12);
		}
		&:active{
			background: #f0f0f0;
			box-shadow: 0 2px 3px rgba(0,0,0,.12);
		}
	}

	/* 成功按钮 */
	.btn-success{
		background: #1db65e;
		color: #fff;
		&:hover{
			background: #3fc176;
			box-shadow: 0 3px 4px rgba(0,0,0,.12);
		}
		&:active{
			background: #199b50;
			box-shadow: 0 2px 3px rgba(0,0,0,.12);
		}
	}

	/* 信息按钮 */
	.btn-info{
		background: #328eff;
		color: #fff;
		&:hover{
			background: #519fff;
			box-shadow: 0 3px 4px rgba(0,0,0,.12);
		}
		&:active{
			background: #2b79d9;
			box-shadow: 0 2px 3px rgba(0,0,0,.12);
		}
	}

	/* 危险按钮 */
	.btn-danger{
		background: #f16350;
		color: #fff;
		&:hover{
			background: #f37a6a;
			box-shadow: 0 3px 4px rgba(0,0,0,.12);
		}
		&:active{
			background: #d45746;
			box-shadow: 0 2px 3px rgba(0,0,0,.12);
		}
	}

	/* 警告按钮 */
	.btn-warning{
		background: #f8b238;
		color: #fff;
		&:hover{
			background: #f9bd56;
			box-shadow: 0 3px 4px rgba(0,0,0,.12);
		}
		&:active{
			background: #da9c31;
			box-shadow: 0 2px 3px rgba(0,0,0,.12);
		}
	}

```

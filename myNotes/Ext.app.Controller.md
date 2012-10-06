Controller把程序的其它部分联系在一起，统一进行控制和调度。它有一个`ini`属性方法，当程序启动的时候（在执行app的`launch`方法之前）执行，因此你可以在这时候做些初始化操作。

`init` 方法里通常用来添加一些用户与view之间的交互动作，比如定义一些事件什么的，比较常用的一个方法是`control`, 这个方法可以非常方便地添加事件监听。比如：

	Ext.define('MyApp.controller.Users', {
	    extend: 'Ext.app.Controller',

	    init: function() {
	        this.control({
	            'viewport > panel': {
	                render: this.onPanelRendered
	            }
	        });
	    },

	    onPanelRendered: function() {
	        console.log('The panel was rendered');
	    }
	});

我们在User的Controller的init属性中使用`this.control`来添加程序监听器，`control`方法里使用 `ComponentQuery`引擎来快速简便地找到页面上的引用，然后添加事件响应函数。


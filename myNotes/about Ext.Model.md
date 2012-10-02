About the Ext.data.Model
===
Model是程序操作的数据对象，比如一个UserModel，ProductModel等等。这是我们从真实世界中抽象出来的东西。Models是通过Model Manager来注册和管理的，主要是供stores对象来使用。


Ext.define('User', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'name', type: 'string'},
		{name: 'age', type: 'int', convert null }
	],
	changeName: function() {
		var oldName = this.get('name'),
			newName = oldName;
			
		this.set('name', newName);
	} 
});




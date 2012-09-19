
Ext.define('Omnes.controller.Users', {
	extend: "Ext.app.Controller",

	views: ['user.List', 'user.Edit' ],
	stores: ["Users"],
	models: ["User"],

	init: function() {
		console.log("Initialized Users! This happends before the Application launch function is called!");
		this.control({
			"viewport > userList": {
				render: this.onPanelRendered,
				itemdblclick: this.editUser
			},
			"userEdit button[action=save]": {
				click: this.updateUser
			}
		});
	},

	onPanelRendered: function() {
		console.log("The panel was rendered!");
	},

	editUser: function(grid, record) {
		console.log("Double clicked on " + record.get("name"));
		var view = Ext.widget("userEdit");
		view.down("form").loadRecord(record);
	},

	updateUser: function(button) {
		console.log("clicked the Save button");
		var win = button.up("window"),
			form = win.down("form"),
			record = form.getRecord(),
			values = form.getValues();

		record.set(values);
		win.close();
		// synchronize the store after editing the record
		this.getUsersStore().sync();
	}
});
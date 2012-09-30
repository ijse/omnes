
Ext.define("Omnes.view.user.List", {
	extend: "Ext.grid.Panel",
	alias: "widget.userList",

	title: "All Users",
	store: "Users",

	initComponent: function() {

		this.columns = [
			{header: 'Name',  dataIndex: 'name',  flex: 1},
			{header: 'Email', dataIndex: 'email', flex: 1}
		];

		this.callParent(arguments);
	}
});
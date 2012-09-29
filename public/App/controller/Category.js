/**
 * Category Controller
 *
 */
Ext.define('Omnes.controller.Category', {
	extend: "Ext.app.Controller",

	stores: ["Category"],
	views: ["category.Tree", "category.ContextMenu"],
	models: ["Category"],

	refs: [{
		ref: "listTree",
		selector: "categoryTree"
	}, {
		ref: 'contextMenu',
		selector: 'categoryContextMenu',
		xtype: 'categoryContextMenu',
		autoCreate: true
	}, {
		ref: "categoryStore",
		selector: "categoryStore"
	}],

	requires: ["Ext.window.MessageBox"],

	init: function() {
		var me = this;
		this.control({
			"categoryTree": {
				itemcontextmenu: me.showContextMenu
			},
			"categoryContextMenu": {
				click: me.onClickContextMenuItem
			},
			// 添加元素
			"[iconCls=category-new-item]": {
				click: me.handleAddNewItem
			},
			// 添加文件夹
			"[iconCls=category-new-folder]": {
				click: me.handleAddNewFolder
			},
			// 改名儿
			"[iconCls=category-update-item], [iconCls=category-update-folder]": {
				click: me.handleUpdateItem
			},
			// 删除某元素、文件夹
			"[iconCls=category-delete-item],[iconCls=category-delete-folder]": {
				click: me.handleDelItem
			}
		});
	},

	/**
	 * Function: showContextMenu
	 *
	 * 打开下拉菜单, 这里会显示或隐藏一些菜单项目
	 *
	 * Parameters:
	 *
	 *   view     - [type/description]
	 *   list     - [type/description]
	 *   node     - [type/description]
	 *   rowIndex - [type/description]
	 *   e        - [type/description]
	 *
	 * Returns:
	 *
	 *   return description
	 */
	showContextMenu: function(view, list, node, rowIndex, e) {
		var contextMenu = this.getContextMenu(),
			newListItem = Ext.getCmp('new-list-item'),
			newFolderItem = Ext.getCmp('new-folder-item'),
			updateListItem = Ext.getCmp('update-list-item'),
			updateFolderItem = Ext.getCmp('update-folder-item'),
			deleteFolderItem = Ext.getCmp('delete-folder-item'),
			deleteListItem = Ext.getCmp('delete-list-item'),
			separater = Ext.getCmp('menu-separator-item');

		if (list.isLeaf()) {
			newListItem.hide();
			newFolderItem.hide();
			deleteFolderItem.hide();
			separater.hide();
			deleteListItem.show();

			updateListItem.show();
			updateFolderItem.hide();
		} else {
			updateFolderItem.show();
			updateListItem.hide();

			newListItem.show();
			newFolderItem.show();
			separater.show();
			if (list.isRoot()) {
				deleteFolderItem.hide();
			} else {
				deleteFolderItem.show();
			}
			deleteListItem.hide();
		}

		contextMenu.showAt(e.getX(), e.getY());
		e.preventDefault();
	},

	/**
	 * Function: onClickContextMenuItem
	 *
	 * 点击快捷菜单某项
	 *
	 * Parameters:
	 *
	 *   menu  - [type/description]
	 *   item  - [type/description]
	 *   e     - [type/description]
	 *   eOpts - [type/description]
	 *
	 * Returns:
	 *
	 *   return description
	 */
	onClickContextMenuItem: function(menu, item, e, eOpts) {

	},
	/**
	 * Function: handleNewItem
	 *
	 * 新建一个叶子结点
	 *
	 * Returns:
	 *
	 *   return description
	 */
	handleAddNewItem: function(component, e) {
		console.log(arguments);
		this.addNewItem(true);
	},
	handleAddNewFolder: function(component, e) {
		this.addNewItem(false);
	},
	handleUpdateItem: function(component, e) {
		this.renameNode(this.getListTree().getSelectionModel().getSelection()[0]);
	},

	handleDelItem: function(component, e) {
		console.log("handleDelItem:", arguments);
		this.delItem(this.getListTree().getSelectionModel().getSelection()[0]);
	},

	/**
	 * Function: addNewItem
	 *
	 * 新建一个元素
	 *
	 * Parameters:
	 *
	 *   leaf - [type/description]
	 *
	 * Returns:
	 *
	 *   return description
	 */
	addNewItem: function(leaf) {
		var listTree = this.getListTree();
		var selectionModel = listTree.getSelectionModel();
		var selectedList = selectionModel.getSelection()[0];
		var parentList = selectedList.isLeaf() ? selectedList.parentNode : selectedList;
		var categoryStore = this.getCategoryStore();
		Ext.Msg.prompt('新建结点：', '请输入结点名称:', function(btn, text) {
			if (btn == 'ok') {
				// process text value and close...
				var newList = Ext.create('Omnes.model.Category', {
					title: text,
					leaf: leaf,
					expanded: true,
					loaded: true // Prevent tree to dynamic load it's children
				});
				parentList.appendChild(newList);
				// 同步到服务器数据库
				categoryStore.sync({
					failure: function(batch, options) {
						var error = batch.exceptions[0].getError();
						var msg = Ext.isObject(error) ? error.status + " " + error.statusText : error;

						Ext.MessageBox.show({
							title: "删除失败！",
							msg: msg,
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				});
			}
		});
	},

	/**
	 * Function: delItem
	 *
	 * 删除一个元素，会自动同步到服务器端
	 *
	 * Parameters:
	 *
	 *   item - [type/description]
	 *
	 * Returns:
	 *
	 *   return description
	 */
	delItem: function(item) {
		var me = this;
		var listTree = me.getListTree();
		var theTitle = item.get("title");
		var isFolder = !item.isLeaf();
		var categoryStore = me.getCategoryStore();

		Ext.Msg.show({
			title: "Delete " + (isFolder ? "Folder" : "list") + "?",
			msg: "确定删除 " + theTitle + (!isFolder ? "": "及其下的所有文件") + "吗？",
			buttons: Ext.Msg.YESNO,
			fn: function(response) {
				if (response === "yes") {
					// FIXME： 只有当确定服务器上删除成功后才从界面中移除
					item.parentNode.removeChild(item);
					categoryStore.sync({
						failure: function(batch, options) {
							var error = batch.exceptions[0].getError();
							var msg = Ext.isObject(error) ? error.status + " " + error.statusText : error;

							Ext.MessageBox.show({
								title: "删除失败！",
								msg: msg,
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});

					listTree.refreshView();
				}
			}
		});
	},
	/**
	 * Function: updateItem
	 *
	 * 更新一个元素
	 *
	 * Parameters:
	 *
	 *   item - [type/description]
	 *
	 * Returns:
	 *
	 *   return description
	 */
	renameNode: function(item) {
		var me = this;
		var listTree = this.getListTree();
		var categoryStore = this.getCategoryStore();
		var theVal = item.get("title");

		Ext.Msg.prompt("修改", "", function(btn, text) {
			if(btn === "ok") {
				item.set("title", text);
				categoryStore.sync({
					failure: function(batch, options) {
						var error = batch.exceptions[0].getError();
						var msg = Ext.isObject(error) ? error.status + " " + error.statusText : error;

						Ext.MessageBox.show({
							title: "更新失败！",
							msg: msg,
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				});
				listTree.refreshView();
			}
		}, this, false, theVal);
	}
});
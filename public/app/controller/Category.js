/**
 * Category Controller
 */
Ext.define('Omnes.controller.Category', {
	extend: "Ext.app.Controller",

	stores: ["Category", "Post"],
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
				afterrender: me.handleAfterListTreeRender,
				// listdrop: me.reorderList,
				selectionchange: me.loadArtical,
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

	loadArtical: function(selModel, lists) {
		var tabview = Ext.getCmp("TabView");
		var listGrid = tabview.getComponent("list");
		var categoryId = selModel.selected.items[0].data._id;
		// Switch to listGrid tab
		tabview.setActiveTab(0);

		// Load post list into grid
		var PostStore = Ext.data.StoreManager.lookup('Post');
		PostStore.load({
			params: {
				categoryId: categoryId
			},
			callback: function() {
				// Set category id to grid
				listGrid.setCategoryId(categoryId);
			}
		});

	},
	/**
	 * 改变顺序或从属
	 * @param  {[type]} list     [description]
	 * @param  {[type]} overList [description]
	 * @param  {[type]} position [description]
	 * @return {[type]}          [description]
	 */
	reorderList: function(list, overList, position) {
		Ext.Ajax.request({
			url: 'category/move',
			jsonData: {
				id: list.get("_id"),
				relatedId: overList.get('_id'),
				position: position // before, after, append
			},
			success: function(response, options) {
				var responseData = Ext.decode(response.responseText);

				if (!responseData.success) {
					Ext.MessageBox.show({
						title: 'Move Task Failed',
						msg: responseData.message,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function(response, options) {
				Ext.MessageBox.show({
					title: 'Move Failed',
					msg: response.status + ' ' + response.statusText,
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
		// refresh the lists view
		this.getListTree().refreshView();
	},

	/**
	 * Handles the list tree's "afterrender" event
	 * Selects the lists tree's root node, if the list tree exists
	 */
	handleAfterListTreeRender: function(listTree) {
		listTree.getSelectionModel().select(0);
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
					success: function(batch, options) {
						// 服务器端插入到数据库成功后，
						// 将生成的_id传回来，更新store
						batch.operations.forEach(function(item) {
							var newData = Ext.JSON.decode(item.response.responseText);
							item.getRecords()[0].data["_id"] = newData.data["_id"];
						});
						console.log(arguments);
					},
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
			msg: "确定删除 " + theTitle + (!isFolder ? "" : "及其下的所有文件") + "吗？",
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
			if (btn === "ok") {
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
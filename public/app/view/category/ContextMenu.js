Ext.define('Omnes.view.category.ContextMenu', {
    extend: 'Ext.menu.Menu',
    xtype: 'categoryContextMenu',
    items: [{
        text: 'New Item',
        iconCls: 'category-new-item',
        id: 'new-list-item'
    }, {
        text: "Update Item",
        iconCls: "category-update-item",
        id: "update-list-item"
    }, {
        text: 'New Folder',
        iconCls: 'category-new-folder',
        id: 'new-folder-item'
    }, {
        text: 'Update Folder',
        iconCls: 'category-update-folder',
        id: 'update-folder-item'
    }, {
        xtype: 'menuseparator',
        id: "menu-separator-item"
    }, {
        text: 'Delete',
        iconCls: 'category-delete-folder',
        id: 'delete-folder-item'
    }, {
        text: 'Delete',
        iconCls: 'category-delete-item',
        id: 'delete-list-item'
    }],

    /**
     * Associates this menu with a specific list.
     * @param {SimpleTasks.model.List} list
     */
    setList: function(list) {
        this.list = list;
    },

    /**
     * Gets the list associated with this menu
     * @return {Task.model.List}
     */
    getList: function() {
        return this.list;
    }

});
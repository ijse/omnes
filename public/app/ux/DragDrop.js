/**
 * @class Omnes.ux.DragDrop
 * @extends Ext.grid.plugin.DragDrop
 * 
 * This plugin modifies the behavior of Ext.tree.plugin.TreeViewDragDrop. to allow the DropZone to handle
 * multiple types of records (Tasks and Lists)
 */
Ext.define('Omnes.ux.DragDrop', {
    extend: 'Ext.tree.plugin.TreeViewDragDrop',
    alias: 'plugin.categorydragdrop',
    requires: [
        'Ext.view.DragZone',
        'Omnes.ux.DropZone'
    ], 

    /**
     * @event taskdrop
     * **This event is fired through the GridView. Add listeners to the GridView object**
     * 
     * Fires when a task record is dropped on the group view
     * @param {Omnes.model.Task} task       The task record
     * @param {Omnes.model.Group} group     The group that the task was dropped on
     */

    /**
     * @event groupdrop
     * **This event is fired through the GridView. Add listeners to the GridView object**
     * 
     * Fires when a group record is dropped on the group view
     * @param {Omnes.model.Group} group         The group that was dropped
     * @param {Omnes.model.Group} overGroup     The group that the group was dropped on
     * @param {String} position                 `"before"` or `"after"` depending on whether the mouse is above or below the midline of the node.
     */

    onViewRender : function(view) {
        var me = this;

        if (me.enableDrag) {
            me.dragZone = Ext.create('Ext.tree.ViewDragZone', {
                view: view,
                ddGroup: me.dragGroup || me.ddGroup,
                dragText: me.dragText,
                repairHighlightColor: me.nodeHighlightColor,
                repairHighlight: me.nodeHighlightOnRepair
            });
        }

        if (me.enableDrop) {
            me.dropZone = Ext.create('Omnes.ux.DropZone', {
                view: view,
                ddGroup: me.dropGroup || me.ddGroup,
                allowContainerDrops: me.allowContainerDrops,
                appendOnly: me.appendOnly,
                allowParentInserts: me.allowParentInserts,
                expandDelay: me.expandDelay,
                dropHighlightColor: me.nodeHighlightColor,
                dropHighlight: me.nodeHighlightOnDrop
            });
        }

    }

});

Ext.application({
    name: 'Omnes',

    appFolder: 'app',
    controllers: ["Users"],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'userList',
                    title: 'Hello Ext',
                    html : 'Hello! Welcome to Ext JS.'
                }
            ]
        });
    }
});
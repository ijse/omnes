
Ext.application({
    name: 'Omnes',

    appFolder: 'app',
    //controllers: ["Users"],
    controllers: [ "Main", "Category" ],

    launch: function() {
        Ext.create("Ext.container.Viewport", {
            height: "100%",
            width: "100%",
            layout: "border",
            items: [{
                region: 'north',
                xtype: "topHeader",
                padding: '10',
                margins: '0 0 5 0'
            }, {
                region: 'west',
                xtype: "category"
            }, {
                region: 'east',
                title: 'East Panel',
                collapsible: true,
                split: true,
                width: 150
            }, {
                region: 'center',
                layout: {
                    type: 'border',
                    align: 'center'
                },
                items: [ {
                    region: "center",
                    width: "100%",
                    xtype: 'tabpanel', // TabPanel itself has no title
                    activeTab: 0,      // First tab active by default
                    items: {
                        title: 'Default Tab',
                        html: 'The first tab\'s content. Others may be added dynamically'
                    }
                }, {
                    region: 'south',
                    width: "100%",
                    title: 'South Panel',
                    collapsible: true,
                    html: 'Information goes here',
                    split: true,
                    height: 100,
                    minHeight: 100
                }]
            }]
        });

        /*
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
         */
    }
});
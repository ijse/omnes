
Ext.define("Omnes.view.Viewport", {
	extend: 'Ext.container.Viewport',
    height: "100%",
    width: "100%",
    layout: "border",
    items: [{
		region: "north",
		xtype: "panel",
		padding: "10",
		frame: true,
		border: false,
		html: '<h1 class="ux-header">' + OmnesSettings.appName + '</h1>'
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
        items: [{
            region: "center",
            width: "100%",
            xtype: 'tabpanel',
            // TabPanel itself has no title
            activeTab: 0,
            // First tab active by default
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

Ext.define("Omnes.view.Viewport", {
	extend: 'Ext.container.Viewport',
    requires: [
        "Omnes.ux.AjaxLoadHtml"
    ],
    height: "100%",
    width: "100%",
    layout: "border",
    items: [{
		region: "north",
		xtype: "panel",
		padding: "10",
		frame: true,
		border: false,
        plugins: {
            ptype: 'ajaxloadhtml'
        },
        url: "/frags/nav.ejs"
        /*,
		html: '<h1 class="fn-font32">' + OmnesSettings.appName + '</h1>' +
                '<div class="fn-right"><a href="/user/logout">Logout</a></div>'
         */
	}, {
        region: 'west',
        width: 500,
        title: "目录树",
        xtype: "category"
    }, {
        region: 'east',
        title: '信息面板',
        collapsible: true,
        split: true,
        width: 300
    }, {
        region: 'center',
        layout: {
            type: 'border',
            align: 'center'
        },
        items: [
        {
            // 主要内容区域
            region: "center",
            width: "100%",
            xtype: 'contentview',
            activeTab: 0
        },
        {
            // 主要内容区域底部附件信息面板
            region: 'south',
            width: "100%",
            title: '附件信息',
            collapsible: true,
            html: 'Information goes here',
            split: true,
            height: 100,
            minHeight: 100
        }]
    }]
});

Ext.define('Omnes.view.listGrid.ListGrid', {
	extend: "Ext.grid.Panel",
	xtype: "listgrid",
	title: 'Simpsons',
    columns: [
        { text: '标题',  dataIndex: 'title', flex: 1 },
        { text: '作者', dataIndex: 'author' },
        { text: '最后修改', dataIndex: 'lastUpdate' }
    ]
});
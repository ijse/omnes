Ext.define("Omnes.ux.AjaxLoadHtml", {
	extends: "Ext.Component",
	alias: 'plugin.ajaxloadhtml',
	init: function(ins) {
		Ext.Ajax.request({
			url: ins.url,
			method: "get",
			success: function(resp, opts) {
				ins.update(resp.responseText);
			},
			failure: function(resp, opts) {

			}
		});
		
	}
});
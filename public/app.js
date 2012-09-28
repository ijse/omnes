/**
 * Variable: app_settings
 *
 * 全局的配置选项
 */
app_settings = {
    appName: "Omnes Project"
};

Ext.Loader.setPath("Ext.ux", "../ux/");
Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: "Omnes", // 顶级命名空间名称

    // 程序基础目录
    appFolder: 'app',
    autoCreateViewport: true,
    controllers: ["Category"],

    launch: function() {
        //

    }
});
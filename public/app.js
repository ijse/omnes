/**
 * Variable: app_settings
 *
 * 全局的配置选项
 */
OmnesSettings= {
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
    autoCreateViewport: false,
    controllers: ["Category"],

    init: function() {
        // ....
        document.getElementById("loading-text").innerText = "Ready to go!";
        window.initApp = function() {
            // Create viewport
            Ext.create("Omnes.view.Viewport");
        }
    }
});

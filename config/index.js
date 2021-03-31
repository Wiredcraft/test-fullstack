let config = {
        SPA: true, // 是否是单页应用,启用时以src/Index为入口，不启动pages下每个文件夹都是入口
        SP: {
                enable: false, // 是否启动SharePoint调试
                scrpts: ["../assets/sp/initstrings.js", // SharePoint调试注入的scripts，本地获取
                        "../assets/sp/init.js",
                        "../assets/sp/MicrosoftAjax.js",
                        "../assets/sp/sp.core.js",
                        "../assets/sp/sp.runtime.js",
                        "../assets/sp/sp.js"
                        // "/_layouts/15/1033/initstrings.js",  // 从SharePoint服务器获取js
                        // "/_layouts/15/init.js",
                        // "/_layouts/15/MicrosoftAjax.js",
                        // "/_layouts/15/sp.core.js",
                        // "/_layouts/15/sp.runtime.js",
                        // "/_layouts/15/sp.js"
                ]
        },
        // build 根据配置打包
        template: {
                enable: true, // 是否启用模板生成，没改动时关闭，加快打包
                // scripts: ["../dll/CIMTAS.dll.js", "../assets/js/Demo.js"], // 注入到模板的scripts
                scripts: ["../dll/CIMTAS.dll.js"], // 注入到模板的scripts

                css: ["../assets/css/Common.css"], // 注入到模板的css
        },
        mock: false, // 是否打包mock
        polyfill: true, // 是否打包polyfill
        analyzer: false, // 是否启动打包分析,打包结束会启动浏览器显示各个包的大小
        typeCheck: false, // 是否启动打包类型检查
        library: "CIMTAS", // 项目打包的lib名
        publicPath: "../", // 公共路径，按需加载、图片请求、字体请求会根据此路径,相对html页面得相对路径
        dll: [...new Set([ // dll要打包的模块,将引入的第三方模块写入数组中,
                "react", 'react-dom', "react-router-dom",
                "@babel/polyfill", "axios",
                "@fortawesome/react-fontawesome", // Pagination
                "@fortawesome/free-solid-svg-icons", // Pagination
                "rc-notification", // Loading

                // fabric-react逐个引入
                "office-ui-fabric-react/lib/Dialog",    // Notification
                'office-ui-fabric-react/lib/Modal',    // Notification
                "office-ui-fabric-react/lib/Button",    // Notification
                "office-ui-fabric-react/lib/Icons",    // Notification
                'office-ui-fabric-react/lib/Spinner',   // loading


                'office-ui-fabric-react/lib/DatePicker',
                'office-ui-fabric-react/lib/Label',
                'office-ui-fabric-react/lib/Dropdown',
                'office-ui-fabric-react/lib/TextField',
                'office-ui-fabric-react/lib/Nav',
                "office-ui-fabric-react/lib/Pickers",
                // 引入整个office-ui-fabric-react，Pickers需要单独声明
                "office-ui-fabric-react/lib/Pickers",
                "office-ui-fabric-react/lib/Utilities",
                "office-ui-fabric-react/lib" // 或"office-ui-fabric-react"

        ])]
}
module.exports = config;
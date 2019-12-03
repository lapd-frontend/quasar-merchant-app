// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function(ctx) {


    // console.log(ctx)

    return {
        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://quasar.dev/quasar-cli/cli-documentation/boot-files
        boot: [
            'i18n',
            'axios',
            'routerbeforeEach',
            'router',
            'title',
            // "websocket-client"
        ],

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
        css: [
            'app.css'
        ],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v4',
            'fontawesome-v5',
            // 'eva-icons',
            // 'themify',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

            'roboto-font', // optional, you are not bound to it
            'material-icons' // optional, you are not bound to it
        ],

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
        framework: {
            // iconSet: 'ionicons-v4', // Quasar icon set
            lang: 'zh-hans', // Quasar language pack

            // Possible values for "all":
            // * 'auto' - Auto-import needed Quasar components & directives
            //            (slightly higher compile time; next to minimum bundle size; most convenient)
            // * false  - Manually specify what to import
            //            (fastest compile time; minimum bundle size; most tedious)
            // * true   - Import everything from Quasar
            //            (not treeshaking Quasar; biggest bundle size; convenient)
            all: 'auto',

            components: [
                'QInput', 'QBtn', 'QIcon', 'QDialog', 'QField', 'QFooter', 'QHeader','QInfiniteScroll','QPullToRefresh','QSelect','QDate','QList','QItem','QItemSection','QItemLabel','QImg',
              'QAvatar', 'QPageSticky', 'QMenu', 'QAvatar', 'QRadio'
            ],
            directives: [
                'ClosePopup','GoBack','Scroll','ScrollFire'
            ],

            // Quasar plugins
            plugins: [
                'Notify', 'Dialog', 'Loading', 'LocalStorage', 'SessionStorage', 'BottomSheet'
            ],
            config: {
                notify: {},
                loading: {}
            }
        },

        // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
        supportIE: true,

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
        build: {
            scopeHoisting: true,
            // vueRouterMode: 'history',
            // showProgress: false,
            // gzip: true,
            // analyze: true,
            // preloadChunks: false,
            // extractCSS: false,
            lessLoaderOptions: true,

            // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
            extendWebpack(cfg, { isServer, isClient }) {
                cfg.module.rules.push({
                    test: /\.less$/,
                    use: ['style-loader', 'css-loader', 'less-loader']
                })
            }
        },

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
        devServer: {
            // https: true,
            // port: 8088,
            open: true // opens browser window automatically
        },

        // animations: 'all', // --- includes all animations
        // https://quasar.dev/options/animations
        animations: [
          'fadeIn', 'fadeOut', 'bounceInRight', 'bounceOutLeft', 'slideInUp', 'slideOutDown',
          'slideInRight', 'slideOutLeft'
        ],

        // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
        ssr: {
            pwa: false
        },

        // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
        pwa: {
            // workboxPluginMode: 'InjectManifest',
            // workboxOptions: {}, // only for NON InjectManifest
            manifest: {
                // name: 'Quasar App',
                // short_name: 'Quasar App',
                // description: 'A Quasar Framework app',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#8dc550',
                icons: [{
                        'src': 'statics/icons/icon-128x128.png',
                        'sizes': '128x128',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-192x192.png',
                        'sizes': '192x192',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-256x256.png',
                        'sizes': '256x256',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-384x384.png',
                        'sizes': '384x384',
                        'type': 'image/png'
                    },
                    {
                        'src': 'statics/icons/icon-512x512.png',
                        'sizes': '512x512',
                        'type': 'image/png'
                    }
                ]
            }
        },

        // https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
        cordova: {
            // id: 'org.cordova.quasar.app',
            noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
            config: {
                cordova: {
                    iosStatusBarPadding: true/false,
                    backButtonExit: true/false,
                }
            }
    },

        // https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
        electron: {
            // bundler: 'builder', // or 'packager'

            extendWebpack(cfg) {
                // do something with Electron main process Webpack cfg
                // chainWebpack also available besides this extendWebpack
            },

            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Windows only
                // win32metadata: { ... }
            },

            builder: {
                // https://www.electron.build/configuration/configuration

                // appId: 'myapp'
            }
        }
    }
}

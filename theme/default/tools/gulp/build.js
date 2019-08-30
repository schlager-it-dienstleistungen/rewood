var yargs = require('yargs');
var fs = require('fs');
var colors = require('colors');
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
global.atob = require('atob');

var release = true;

// merge with default parameters
var args = Object.assign({
    prod: false,
    rtl: '',
    exclude: '',
    theme: '',
    demo: '',
    path: '',
    angular: false,
    react: false,
    vue: false,
}, yargs.argv);

var themes = ['bWV0cm9uaWM=', 'a2Vlbg==', 'YXRsYXM='];
var pkg = 'default';
var confPath = '';
var theme = atob(themes[0]);

if (release) {
    confPath = './../build.json';
} else {
    themes.forEach(function (t) {
        var th = atob(t);
        if (args[th]) {
            theme = th;
        }
        ['default', 'angular', 'react', 'vue'].some(function (p) {
            if (args[p]) {
                pkg = p;
                return true;
            }
        });
    });

    confPath = './../../themes/themes/' + theme + '/dist/preview/build.json';
}

module.exports = {};
if (fs.existsSync(__dirname + '/' + confPath)) {
    var d = new Date();
    var t = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    console.log('[' + t.grey + ']' + ' ' + 'Using config ' + confPath.green);
    module.exports = require(confPath);
    module.exports.config.theme = theme;
}

// copy core assets
gulp.task('copy-assets', function(cb) {
    if (pkg === 'react') {
        copyReactAssets();
    }
    if (pkg === 'angular') {
        copyAngularAssets();
    }
    if (pkg === 'vue') {
        copyVueAssets();
    }
    cb();
});

function copyReactAssets() {
    reactCopyCoreAssets();
    reactCopyFavicon();
    reactCopyLogo();
    reactCopyScripts();
    reactCopyImages();
}

function reactSassCopyHelper(_from, _to) {
    var configReplacementFrameworkFrom = '../../../../../../framework/sass/theme/';
    var configVendrodsReplacementFrameworkFrom2 = '../../../../../../../framework/sass';
    var configVendrodsReplacementFrameworkFromVendors= '../../../../../../framework/sass/vendors';
        gulp.src(_from + '/**/*')   
        .pipe(replace(/\.\.\/.*?\/dist\/preview\//g, ''))
        .pipe(replace(configVendrodsReplacementFrameworkFrom2, '../../'))
        .pipe(replace(configReplacementFrameworkFrom, '../'))
        .pipe(replace(configVendrodsReplacementFrameworkFromVendors, '../../vendors'))
        .pipe(replace('@import "../../../../config"', '@import "../../../config"'))
        .pipe(replace('@import "../../../../../config"', '@import "../../../../config"'))
        .pipe(replace('@import "config.scss"', '@import "../../layout/config.scss"'))
        .pipe(gulp.dest(_to));
}

function reactCopyCoreAssets() {
    // Folder '/js'
    var jsSources = [
        './../themes/themes/' + theme + '/src/js',
        './../themes/framework/js',
        './../themes/framework/vendors',
    ];
    var jsDestinations = [
        './../themes/themes/' + theme + '/dist/react/demo1/src/_metronic/_assets/js',
        './../themes/themes/' + theme + '/dist/react/demo2/src/_metronic/_assets/js'
    ];
    jsSources.forEach(function (src) {
        jsDestinations.forEach(function(dest) {
            gulp.src(src)
            .pipe(gulp.dest(dest));
        });
    });

    // Folder '/sass'
    var sassSources = [
        './../themes/framework/sass',
        './../themes/themes/' + theme + '/src/sass/theme/core',
        //'./../themes/themes/' + theme + '/src/sass/theme/pages',
        // ./../themes/themes/' + theme + '/src/sass/theme/_config.scss',
    ];
    var sassDestinations = [
        {
            path: './../themes/themes/' + theme + '/dist/react/demo1/src/_metronic/_assets/sass',
            demoName: "demo1"
        },
        {
            path: './../themes/themes/' + theme + '/dist/react/demo2/src/_metronic/_assets/sass',
            demoName: "demo2"
        }
    ];

    sassDestinations.forEach(function(dest) {
        // base framework
        var frameworPathSrc = './../themes/framework/sass';
        reactSassCopyHelper(frameworPathSrc, dest.path);
        // core folder
        var corePathSrc = './../themes/themes/' + theme + '/src/sass/theme/core';
        var coreDest = dest.path + '/theme/core';
        reactSassCopyHelper(corePathSrc, coreDest);
        // pages folder
        var pagesPathSrc = './../themes/themes/' + theme + '/src/sass/theme/pages';
        var pagesDest = dest.path + '/theme/pages';
        reactSassCopyHelper(pagesPathSrc, pagesDest); 
        // _config.scss
        var _configSrc = './../themes/themes/' + theme + '/src/sass/theme/_config.scss';
        var configDest = dest.path + '/theme';
        var configReplacementThemeFrom = '../../../../../framework/sass/theme/core';
        var configReplacementVendorsFrom = '../../../../../framework/sass/vendors';    
        gulp.src(_configSrc)
            .pipe(replace(configReplacementThemeFrom, 'core'))
            .pipe(replace(configReplacementVendorsFrom, '../vendors'))
            .pipe(gulp.dest(configDest));
        // layout
        let layoutSassFilesSourse = './../themes/themes/' + theme + '/src/sass/theme/demos/' + dest.demoName;
        let layoutSassFilesDestination = dest.path + '/theme/layout';
        reactSassCopyHelper(layoutSassFilesSourse, layoutSassFilesDestination);
    });

    // Folder '/vendors'
    var vendorSources =  ['./../themes/framework/vendors'];
    var vendorDestinations = [
        './../themes/themes/' + theme + '/dist/react/demo1/src/_metronic/_assets/vendors',
        './../themes/themes/' + theme + '/dist/react/demo2/src/_metronic/_assets/vendros'
    ];
    vendorSources.forEach(function (src) {
        vendorDestinations.forEach(function(dest) {
            gulp.src(src + '/**/*')
            .pipe(replace(/\.\.\/\.\.\/\.\.\/framework\/sass\//g, 'sass\/'))
            .pipe(replace(/\.\.\/.*?\/dist\/preview\//g, ''))
            .pipe(gulp.dest(dest));
        });
    });
}

function reactCopyFavicon() {
    var favIconSrc = './../themes/themes/' + theme + '/src/media/logos/favicon.ico';
    var favIconDescinations = [
        './../themes/themes/' + theme + '/dist/react/demo1/public',
        './../themes/themes/' + theme + '/dist/react/demo2/public'
    ];
    favIconDescinations.forEach(function(dest) {
        gulp.src(favIconSrc)
        .pipe(gulp.dest(dest));
    });
}

function reactCopyLogo() {
    var logoSrc = './../themes/themes/' + theme + '/src/media/logos/logo-mini-md.png';
    var logoDescinations = [
        './../themes/themes/' + theme + '/dist/react/demo1/public',
        './../themes/themes/' + theme + '/dist/react/demo2/public'
    ];
    logoDescinations.forEach(function(dest){
        gulp.src(logoSrc)
        .pipe(rename('logo.png'))
        .pipe(gulp.dest(dest));
    });

}

function reactCopyScripts() {
    // Destination where file to be exported
    var scriptsDestinations = [
        './../themes/themes/' + theme + '/dist/react/demo1/public/js',
        './../themes/themes/' + theme + '/dist/react/demo2/public/js'
    ];
    var scripts =  [
        './../themes/framework/js/theme/core/util.js',
        './../themes/framework/js/theme/core/base/header.js',
        './../themes/framework/js/theme/core/base/menu.js',
        './../themes/framework/js/theme/core/base/offcanvas.js',
        './../themes/framework/js/theme/core/base/scrolltop.js',
        './../themes/framework/js/theme/core/base/toggle.js',
        './../themes/framework/js/theme/core/base/dialog.js',
        './../themes/framework/js/theme/core/base/wizard.js',
    ];

    scriptsDestinations.forEach(function(dest) {
        gulp.src(scripts)
        .pipe(concat('script.bundle.js'))   //resultant file name
            .pipe(gulp.dest(dest));
    });
}

function reactCopyImages() {
    var imagesSources = [
        './../themes/themes/' + theme + '/src/media',
        './../themes/framework/media',
    ];

    var destinations = [
        './../themes/themes/' + theme + '/dist/react/demo1/public/media',
        './../themes/themes/' + theme + '/dist/react/demo2/public/media'
    ];
    imagesSources.forEach(function (src) {
        destinations.forEach(function (dest) {
            gulp.src(src +  '/**/*')
            .pipe(gulp.dest(dest));
        });
    });
}

function copyAngularAssets() {
    // sync angular reusable source code with demo1 for all other demos
    var angularDemos = fs.readdirSync('./../themes/themes/' + theme + '/dist/angular').filter(function(file) {
        return !(/(^|\/)\.[^\/\.]/g).test(file);
    });

    var assetSrc = [
        {
            src: ['./../themes/themes/' + theme + '/src/media/**/*'],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/assets/media',
        },
        {
            src: [
                './../themes/themes/' + theme + '/src/sass/**/*',
                '!./../themes/themes/' + theme + '/src/sass/theme/demos/**',
            ],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/assets/sass',
            rewrite: [
                {
                    search: /\.\.\/.*?\/framework\/sass\//g,
                    replace: '../../../sass/',
                }
            ],
        },
        {
            src: [
                './../themes/themes/' + theme + '/src/sass/theme/demos/{demo}/**/*',
                '!./../themes/themes/' + theme + '/src/sass/**/style-react.scss',
                '!./../themes/themes/' + theme + '/src/sass/**/style-vue.scss',
                '!./../themes/themes/' + theme + '/src/sass/**/style.scss',
                '!./../themes/themes/' + theme + '/src/sass/**/skins/**',
            ],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/assets/sass/theme/layout',
            rewrite: [
                {
                    search: /\.\.\/.*?\/framework\/sass\//g,
                    replace: '../../../sass/',
                },
                {
                    search: /"\.\.\/\.\.\/config";/g,
                    replace: '"../config";',
                },
                {
                    search: /\.\.\/.*?\/core/g,
                    replace: '../core',
                },
            ],
        },
        {
            src: ['./../themes/themes/' + theme + '/src/sass/theme/demos/{demo}/**/skins/**'],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/assets/sass/theme/layout',
            rewrite: [
                {
                    search: /\.\.\/\.\.\/\.\.\/\.\.\/config/g,
                    replace: '../../../config',
                },
            ]
        },
        {
            src: ['./../themes/framework/js/theme/core/**/*'],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/assets/js/theme/core',
        },
        {
            src: ['./../themes/framework/js/theme/core/**/*'],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/assets/media',
        },
        {
            src: ['./../themes/framework/sass/**/*'],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/assets/sass',
        },
        {
            src: ['./../themes/framework/vendors/**/*'],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/assets/vendors',
        },
    ];

    assetSrc.forEach(function(source) {
        angularDemos.forEach(function(demo) {
            var newSource = source['src'].map(function(v) {
                return v.replace(/{demo}/g, demo);
            });

            var task = gulp.src(newSource);
            if (source['rewrite']) {
                source['rewrite'].forEach(function(r) {
                    task = task.pipe(replace(r['search'], r['replace']));
                });
            }
            task = task.pipe(gulp.dest(source['output'].replace(/{demo}/g, demo)));
        });
    });

    var angularSrc = [
        {
            src: [
                './../themes/themes/' + theme + '/dist/angular/demo1/src/app/core/**/*',
                '!./../themes/themes/' + theme + '/dist/angular/**/src/app/core/_config/layout.config.ts',
            ],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/app/core',
        },
        {
            src: ['./../themes/themes/' + theme + '/dist/angular/demo1/src/app/views/pages/**/*'],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/app/views/pages',
        },
        {
            src: ['./../themes/themes/' + theme + '/dist/angular/demo1/src/app/views/partials/**/*'],
            output: './../themes/themes/' + theme + '/dist/angular/{demo}/src/app/views/partials',
        },
    ];

    // remove demo1
    delete angularDemos[0];
    // sync angular codes between demos
    angularSrc.forEach(function(source) {
        angularDemos.forEach(function(demo) {
            var newSource = source['src'].map(function(v) {
                return v.replace(/{demo}/g, demo);
            });
            gulp.src(newSource)
            .pipe(gulp.dest(source['output'].replace(/{demo}/g, demo)));
        });
    });
}

function copyVueAssets() {
    // sync vue reusable source code with demo1 for all other demos
    var vueDemos = fs.readdirSync('./../themes/themes/' + theme + '/dist/vue').filter(function(file) {
        return !(/(^|\/)\.[^\/\.]/g).test(file);
    });

    var assetSrc = [
        {
            src: ['./../themes/themes/' + theme + '/src/media/**/*'],
            output: './../themes/themes/' + theme + '/dist/vue/{demo}/src/assets/media',
        },
        {
            src: [
                './../themes/themes/' + theme + '/src/sass/**/*',
                '!./../themes/themes/' + theme + '/src/sass/theme/demos/**',
                '!./../themes/themes/' + theme + '/src/sass/theme/_config.scss'
            ],
            output: './../themes/themes/' + theme + '/dist/vue/{demo}/src/assets/sass',
            rewrite: [
                {
                    search: /\.\.\/.*?\/framework\/sass\//g,
                    replace: '../../../sass/',
                }
            ],
        },
        {
            src: [
                './../themes/themes/' + theme + '/src/sass/theme/_config.scss'
            ],
            output: './../themes/themes/' + theme + '/dist/vue/{demo}/src/assets/sass/theme',
            rewrite: [
                {
                    search: /\.\.\/.*?\/framework\/sass\//g,
                    replace: '../../sass/',
                }
            ],
        },
        {
            src: [
                './../themes/themes/' + theme + '/src/sass/theme/demos/{demo}/**/*',
                '!./../themes/themes/' + theme + '/src/sass/**/style-react.scss',
                '!./../themes/themes/' + theme + '/src/sass/**/style-angular.scss',
                '!./../themes/themes/' + theme + '/src/sass/**/style.scss',
                '!./../themes/themes/' + theme + '/src/sass/**/skins/**',
            ],
            output: './../themes/themes/' + theme + '/dist/vue/{demo}/src/assets/sass/theme/layout',
            rewrite: [
                {
                    search: /\.\.\/.*?\/framework\/sass\//g,
                    replace: '../../../sass/',
                },
                {
                    search: /"\.\.\/\.\.\/config";/g,
                    replace: '"../config";',
                },
                {
                    search: /\.\.\/.*?\/core/g,
                    replace: '../core',
                },
            ],
        },
        {
            src: ['./../themes/themes/' + theme + '/src/sass/theme/demos/{demo}/**/skins/**'],
            output: './../themes/themes/' + theme + '/dist/vue/{demo}/src/assets/sass/theme/layout',
            rewrite: [
                {
                    search: /\.\.\/\.\.\/\.\.\/\.\.\/config/g,
                    replace: '../../../config',
                },
            ]
        },
        {
            src: [
                './../themes/framework/js/theme/core/**/*.js',
                '!./../themes/framework/js/theme/core/base/datatable/*',
                '!./../themes/framework/js/theme/core/app.js'
            ],
            output: './../themes/themes/' + theme + '/dist/vue/{demo}/public/assets/js',
            concat: 'script.bundle.js',
        },
        {
            src: ['./../themes/framework/js/theme/core/**/*'],
            output: './../themes/themes/' + theme + '/dist/vue/{demo}/src/assets/media',
        },
        {
            src: ['./../themes/framework/sass/**/*'],
            output: './../themes/themes/' + theme + '/dist/vue/{demo}/src/assets/sass',
        },
        {
            src: ['./../themes/framework/vendors/**/*'],
            output: './../themes/themes/' + theme + '/dist/vue/{demo}/src/assets/vendors',
        },
    ];

    assetSrc.forEach(function(source) {
        vueDemos.forEach(function(demo) {
            var newSource = source['src'].map(function(v) {
                return v.replace(/{demo}/g, demo);
            });

            var task = gulp.src(newSource);
            if (source['rewrite']) {
                source['rewrite'].forEach(function(r) {
                    task = task.pipe(replace(r['search'], r['replace']));
                });
            }
            if (source['concat']) {
                task = task.pipe(concat(source['concat']));
            }
            task = task.pipe(gulp.dest(source['output'].replace(/{demo}/g, demo)));
        });
    });
}
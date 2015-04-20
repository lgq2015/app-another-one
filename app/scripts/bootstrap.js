require.config( {
    waitSeconds : 0 ,
    paths : {
        jquery : '../vendor/jquery/jquery' ,
        angular : '../vendor/angular/angular'
    } ,
    shim : {
        angular : {
            deps : [ 'jquery' ] ,
            exports : 'angular' ,
            init : function () {
                // ---------------------重要代码段！------------------------------
                // 应用启动后不能直接用 module.controller 等方法，否则会报控制器未定义的错误，
                // 见 http://stackoverflow.com/questions/20909525/load-controller-dynamically-based-on-route-group
                // 代码参考：https://github.com/Treri/angular-require/blob/master/angular-require.js#L44
                var _module = angular.module;
                angular.module = function () {
                    var newModule = _module.apply( angular , arguments );
                    if ( arguments.length >= 2 ) {
                        newModule.config( [
                            '$controllerProvider' ,
                            '$compileProvider' ,
                            '$filterProvider' ,
                            '$provide' ,
                            function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
                                newModule.controller = $controllerProvider.register;
                                newModule.directive = $compileProvider.directive;
                                newModule.filter = $filterProvider.register;
                                newModule.factory = $provide.factory;
                                newModule.service = $provide.service;
                                newModule.provider = $provide.provider;
                                newModule.value = $provide.value;
                                newModule.constant = $provide.constant;
                                newModule.decorator = $provide.decorator;
                            }
                        ] );
                    }
                    return newModule;
                };
            }
        } ,
        '../vendor/angular/angular-ui-router' : [ 'angular' ] ,
        '../vendor/angular/angular-sanitize' : [ 'angular' ] ,
        '../vendor/angular/angular-touch' : [ 'angular' ] ,
        '../vendor/bootstrap/bootstrap' : [ 'jquery' ]
    } ,
    map : {
        '*' : {
            'css' : '../vendor/require/css'
        }
    }
} );

define( [
    'angular' ,
    '../vendor/angular/angular-ui-router' ,
    '../vendor/angular/angular-sanitize' ,
    '../vendor/angular/angular-touch' ,
    '../vendor/bootstrap/bootstrap' ,
    './app'
] , function ( angular ) {
    angular.module( 'bootstrap' , [ 'ui.router' , 'ngSanitize' , 'ngTouch' , 'app' ] ); // 注意：app 模块只能放在最后一个，因为它依赖前面的第三方模块！

    if ( 0 !== document.URL.indexOf( 'http' ) ) {
        document.addEventListener( 'deviceready' , bootstrap )
    } else {
        bootstrap();
    }

    function bootstrap() {
        angular.bootstrap( document , [ 'bootstrap' ] , {
            strictDi : true
        } );
    }
} );

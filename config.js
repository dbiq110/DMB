require.config({
    path:{
        'echarts':'js/echarts.min',
        'myShake':'js/myShake',
        'bootstrap':'js/bootstrap.min',
        'fullpage':'js/fullpage.min',
        'html5shiv':'js/html5shiv.min',
        'jquery':'js/jquery.min',
        'angular':'js/angular.min',
        'leaveSence':'js/leaveSence',
        'respond':'js/respond.min',
        'template-native':'js/template-native'
    },
    shim:{
        'bootstrap':{
            deps:['html5shiv','respond','jquery']
        },
        'fullpage':{
            exports:'fullpage'
        }
    }
})
require(['fullpage','html5shiv','respond','respond','bootstrap','jquery','myShake','angular',''])
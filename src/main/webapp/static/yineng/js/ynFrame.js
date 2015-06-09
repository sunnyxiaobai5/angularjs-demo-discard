//主页控制器
angular.module("ynedut8CenterApp").controller("homePageController", ["$scope", "$http", function ($scope, $http) {

    $scope.logPng = basePath + '/static/ynassets/layout/img/logo_05.png'

    $scope.activeSelectedItem = function (event) {
        $(event.target).parent("li").siblings().removeClass("active");
        $(event.target).parent("li").addClass("active");
    };

    /*动态配置菜单 start*/
    $http.get(basePath + "/getMenu").success(function (data) {
        if (data.status == 0) {
            $scope.menu = data.result;
        }
    });
    /*动态配置菜单 end*/

    // 获得文件类型全局配置信息
    $http.post(basePath + '/sysGlobalSetting/getSysSettingForSetting?' + csrfKey.name + "=" + csrfKey.key).success(function (data) {
            $scope.uploaderConfig = data.result;
        }
    );
}]);

angular.module("ynedut8CenterApp").run(["$rootScope", function ($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        var pageContent = angular.element('.page-content');
        var pirate_height = 0;
        if ($('.pirate') && $('.pirate').css('display') == 'block') {
            pirate_height = $('.pirate').outerHeight();
        }
        var available_height = $(window).height() - $('.page-footer').outerHeight() - $('.page-header').outerHeight() - pirate_height;
        var pageSiderbar_height = $('.page-sidebar').outerHeight();
        var setContentHeight = available_height > pageSiderbar_height ? available_height : pageSiderbar_height;
        pageContent.attr('style', 'min-height:' + setContentHeight + 'px');
    });
}]);
// 拦截器配置
//angular.module("ynedut8CenterApp").factory('myInterceptor', ['$q', function($q, someAsyncService) {
//    var requestInterceptor = {
//        request:  function(config) {
//            // 首选判断是否有参数 如果是第一个参数则需要
//            if(config.url.indexOf("?")=="-1"){
//                config.url = config.url + "?"+csrfKey.name + "=" + csrfKey.key;
//            }
//            // 说明url已经有参数
//            else{
//                config.url = config.url + "&"+csrfKey.name + "=" + csrfKey.key;
//            }
//            return config;
//        }
//    };
//    return requestInterceptor;
//}])
angular.module("ynedut8CenterApp").config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    // 将AngularJs的Post序列化方式和Jquery方格一致，服务器才能正常解析POST传过来的数据
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // 注入拦截器
    //$httpProvider.interceptors.push('myInterceptor');

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name;
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
    // 默认页面_客户基本信息维护
    //$urlRouterProvider.otherwise("/clientInfo");

    /*动态配置菜单 start*/
    //在config中不能使用$http,使用jquery获取配置状态的信息
    //同步发送请求配置状态
    $.ajax({
        type: "GET",
        url: basePath + "/getMenuForState",
        dataType: "json",
        async: false
    }).done(function (data) {

        angular.forEach(data.result, function (item) {

            $stateProvider.state(item.toView, {
                url: "/" + item.toView,
                templateUrl: basePath + item.navUrl
            });
            if (item.sysNavigationVoList) {
                angular.forEach(item.sysNavigationVoList, function (item) {
                    $stateProvider.state(item.toView, {
                        url: "/" + item.toView,
                        templateUrl: basePath + item.navUrl
                    });
                });
            }
        });
    });
    /*动态配置菜单 end*/

    //状态配置
    $stateProvider
        //增加客户信息
        .state("addBasicInfo", {
            url: "/addBasicInfo",
            templateUrl: basePath + "/pages/center/customerBasicInformation/addCustomerInformation.html"
        })
        //添加升级包信息
        .state("productUpgradePageAdd", {
            url: "/productUpgradePageAdd",
            templateUrl: basePath + "/pages/center/versioninfomanage/productUpgradePageAdd.html"
        })
        //修改升级包信息
        .state("productUpgradePageUpdate", {
            url: "/productUpgradePageUpdate",
            templateUrl: basePath + "/pages/center/versioninfomanage/productUpgradePageUpdate.html"
        })
        //导入客户基本信息
        .state("customerInfoImport", {
            url: "/customerInfoImport",
            templateUrl: basePath + "/pages/center/customerBasicInformation/customerInfoImport.html"
        })
        //添加产品信息
        .state("addOrUpdateProduct", {
            url: "/addOrUpdateProduct",
            templateUrl: basePath + "/pages/center/versioninfomanage/addProductInfomation.html"
        })
        //授权产品包
        .state("authProductPackage", {
            url: "/authProductPackage",
            templateUrl: basePath + "/pages/center/purchaseRightsManagement/authProductPackage.html"
        })
        //用户添加或者修改
        .state("sysUserAccountAddOrUpdate", {
            url: "/sysUserAccountAddOrUpdate",
            templateUrl: basePath + "/pages/center/sysUserAccount/sysUserAccountAddOrUpdate.html"
        })
        //用户导入
        .state("sysUserAccountImport", {
            url: "/sysUserAccountImport",
            templateUrl: basePath + "/pages/center/sysUserAccount/sysUserAccountImport.html"
        })
        //添加常见问题第一步
        .state("addCommomProblem1", {
            url: "/addCommomProblem1",
            templateUrl: basePath + "/pages/center/helpCenter/addHelpQuestion1.html"
        })
        //添加常见问题第二步
        .state("addCommomProblem2", {
            url: "/addCommomProblem2",
            templateUrl: basePath + "/pages/center/helpCenter/addHelpQuestion2.html"
        })
        //常见问题明细
        .state("watchHelpQuestion", {
            url: "/watchHelpQuestion",
            templateUrl: basePath + "/pages/center/helpCenter/watchHelpQuestion.html"
        })
        //审核问题-->审核
        .state("checkQuestion", {
            url: "/checkQuestion",
            templateUrl: basePath + "/pages/center/helpCenter/checkQuestion.html"
        })
        //客户充值管理-->充值明细
        .state("topUpDetail", {
            url: "/topUpDetail",
            templateUrl: basePath + "/pages/center/smsmanagement/topUpDetail.html"
        })
});


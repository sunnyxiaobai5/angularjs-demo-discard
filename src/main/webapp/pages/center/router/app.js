/**
 * Created by admin on 2015/6/11.
 */

angular.module("routerApp", ["ui.router"]).config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    //$urlRouterProvider.otherwise("/page1")
    $urlRouterProvider.when("", "/page1");

    $stateProvider
        .state("page1", {
            url: "/page1",
            templateUrl: "/pages/center/router/slidbar1.htm"
        })
        .state("page2", {
            url: "/page2",
            templateUrl: "/pages/center/router/slidbar2.htm"
        })
        .state("page1.content1", {
            url: "/content1",
            templateUrl: "/pages/center/router/slidbar1_content1.htm"
        })
        .state("page1.content2", {
            url: "/content1",
            templateUrl: "/pages/center/router/slidbar1_content2.htm"
        })
        .state("page1.content3", {
            url: "/content1",
            templateUrl: "/pages/center/router/slidbar1_content3.htm"
        })
        .state("page2.content1", {
            url: "/content1",
            templateUrl: "/pages/center/router/slidbar2_content1.htm"
        }).state("page2.content2", {
            url: "/content1",
            templateUrl: "/pages/center/router/slidbar2_content2.htm"
        }).state("page2.content3", {
            url: "/content1",
            templateUrl: "/pages/center/router/slidbar2_content3.htm"
        })
});
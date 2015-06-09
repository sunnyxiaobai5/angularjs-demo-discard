var ngFileUploadApp = angular.module("ynSelectForMany",["yn.utils"]);
ngFileUploadApp.controller("ngYnSelectForMany",function($scope){

    $scope.person = [
        {name:"nya1",age:12},
        {name:"nagm2",age:13},
        {name:"nahym3",age:14},
        {name:"nam4",age:15},
        {name:"nyam5",age:16}
    ];

    $scope.names = ["Jone","Sarah","Tom","Tommy","May"];
    // 回调model 返回的是 选中后的集合
    $scope.model = null;
    // 增加xxxxxxxx
});


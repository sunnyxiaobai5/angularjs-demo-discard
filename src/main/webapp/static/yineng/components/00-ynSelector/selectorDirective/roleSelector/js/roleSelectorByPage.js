/**
 * Project:     ynedut-center
 * Title:       roleSelectorByPage
 * Author:      liaohao
 * Date:        2015/6/5 14:58
 * Copyright:   2015 www.yineng.com.cn Inc. All rights reserved.
 * Description: 人员选择器--分页
 */


angular.module("yn.utils").directive('roleSelectorByPage', ["$http","ynNotification",function($http,ynNotification) {
    return {
        restrict : 'AE',
        templateUrl : basePath + '/static/yineng/components/00-ynSelector/selectorDirective/roleSelector/templates/roleSelectorByPage.html',
        scope : {
            options : '='
        },
        replace : true,
        controller:function($scope, $element){
            $scope.gridOptions = {};
                //改变每页显示条数
                $scope.selectPageSize = function(){
                    $scope.pagableData.size = $scope.selectedPageSize;
                    $scope.config.params={pageNumber:0,pageSize:$scope.pagableData.size};
                    $scope.loadDataList($scope.config);
                }
                //定义每页数据条数列表、
                $scope.pageSizeList = [10,15,20,25];
                //去首页
                $scope.toFirstPage = function(){
                    $scope.config.params={pageNumber:0,pageSize:$scope.pagableData.size};
                    $scope.loadDataList($scope.config);
                }
                //去末页
                $scope.toLastPage = function(){
                    $scope.config.params={pageNumber:($scope.pagableData.totalPages-1),pageSize:$scope.pagableData.size};
                    $scope.loadDataList($scope.config);
                }
                //顶部，向前翻页
                $scope.toPrePage = function(){
                    if($scope.pagableData.number > 1){
                        $scope.pageNumber = $scope.pagableData.number-2;
                        $scope.config.params={pageNumber:(($scope.pageNumber) > 0?($scope.pageNumber):0),pageSize:$scope.pagableData.size};
                        $scope.loadDataList($scope.config);
                    }
                }
                //顶部，向后翻页
                $scope.toNextPage= function(){
                    $scope.config.params={pageNumber:(($scope.pagableData.number) < ($scope.pagableData.totalPages) ?($scope.pagableData.number):($scope.pagableData.totalPages-1)),pageSize:$scope.pagableData.size};
                    $scope.loadDataList($scope.config);
                }
                //输入页码时调用
                $scope.loadDataByPageNumber = function(){
                    if($scope.inputPageNumber >0 && $scope.inputPageNumber <= ($scope.pagableData.totalPages) ){
                        $scope.config.params={pageNumber:($scope.inputPageNumber-1),pageSize:$scope.pagableData.size};
                        $scope.loadDataList($scope.config);
                    }
                }
                //1 获取数据url
                $scope.config = {
                    url:basePath + "/helpcenter/getHelpQuestionPage?"+csrfKey.name+"="+csrfKey.key,
                    method:"POST",
                    params:{pageNumber:0,pageSize:10}
                };

                //构造页面展示数据需要的内容
                $scope.loadDataList = function(config){
                    $scope.allFlag="notall";
                    //$scope.selectedItems.length=0;
                    //$scope.selectedItems = [];
                    $http(config).success(
                        function(data, status, headers, config) {
                            if(status == 200 && data.result != null){
                                ynNotification.notifyClear();
                                $scope.pagableData = data.result;
                                //修正分页时获取页码不正确的行为
                                if($scope.pagableData.number < $scope.pagableData.totalPages){
                                    $scope.pagableData.number++;
                                }
                                $scope.selectedPageSize = $scope.pagableData.size;
                                $scope.inputPageNumber = $scope.pagableData.number;
                                $scope.pageCodeList = new Array();
                                if($scope.pagableData.totalPages>5){
                                    if($scope.pagableData.number<3){
                                        $scope.pageCodeList = [1,2,3,4,5];
                                    }
                                    else if($scope.pagableData.totalPages - $scope.pagableData.number<3){
                                        $scope.pageCodeList = [$scope.pagableData.totalPages-4,
                                            $scope.pagableData.totalPages-3,
                                            $scope.pagableData.totalPages-2,
                                            $scope.pagableData.totalPages-1,
                                            $scope.pagableData.totalPages];
                                    }else{
                                        $scope.pageCodeList = [$scope.pagableData.number-2,
                                            $scope.pagableData.number-1,
                                            $scope.pagableData.number,
                                            $scope.pagableData.number+1,
                                            $scope.pagableData.number+2];
                                    }
                                }else{
                                    for(var i=1;i<=$scope.pagableData.totalPages;i++){
                                        $scope.pageCodeList.push(i);
                                    }
                                }

                                $scope.getDataList(data.result.content);
                            }
                        }).error(function(data, status, headers, config) {
                            console.log("获取首页数据失败！")
                        });

                };

                $scope.gridOptions.loadDataList=function(){
                    $scope.loadDataList($scope.config);
                };


              $scope.gridOptions.loadDataList();
              //2 将数据绑定到模板
              $scope.getDataList = function(objects){
                  $scope.personList = objects;
              }
        },
        link : function($scope, $element, $attrs, ctrls) {


        }
    }
}]);

//// 测试分页
//$scope.test = function(){
//    ynSelectorService.roleSelectorByPage(null,function(user){
//        console.log(user);
//        // $scope.customer.message =  user.id+" "+user.name;
//        $scope.customer.userName = user.jobNumber+"_"+user.userName;
//        $scope.customer.sysUserAccountId = user.id;
//        // 选择器回调优化
//        $scope.$apply();
//    });
//}
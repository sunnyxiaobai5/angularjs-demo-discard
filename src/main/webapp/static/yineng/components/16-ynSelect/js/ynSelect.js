/**
 * Created by YanLiang on 2015/3/9.
 */
angular.module("yn.utils").directive("ynSelect",function(){
    return {
        restrict:"AE",
        scope:{
            option:'=',
            model:"="
        },
        templateUrl:function(tElement, tAttrs) {
            var theme = tAttrs.theme || uiSelectConfig.theme;
            return basePath + "/static/yineng/components/16-ynSelect/template/"+theme+".html";
        },
        controller:["$scope","$interval",function($scope,$interval){

            //是否显示搜索框
            $scope.option.disableSearch = $scope.option.disableSearch ? true : false;

            //生成预览信息
            $scope.generPreInfo = function(){
                //生成预览信息
                var previewInfo = "";
                for(var i in $scope.model){
                    previewInfo += (i == 0 ? "" : ",") + (!$scope.option.property ? $scope.model[i] : $scope.model[i][$scope.option.property]);
                    if(previewInfo.length > 5){
                        $scope.previewInfo = previewInfo.substring(0,5)+"...";
                        break;
                    }else{
                        $scope.previewInfo = previewInfo;
                    }
                }
                //如果一个都没选，将预览信息重新设置为“请选择”
                if($scope.model.length == 0){
                    $scope.previewInfo = "请选择";
                }
            };

            //初始化初始选中数据
            $scope.initSelectData = function(){
                //开始默认没有默认数据
                for(var i in $scope.option.repeat){
                    $scope.option.repeat[i].index = i;
                    $scope.selected[i] = {isSelected:false,cacheSelected:false};
                }
                //默认没有初始数据，预览设为‘请选择’
                $scope.previewInfo = "请选择";
                //如果有默认数据
                if($scope.model){
                    var property = $scope.option.property;
                    for(var i in $scope.option.repeat){
                        for(var j in $scope.model){
                            if($scope.option.repeat[i][property] == $scope.model[j][property]){
                                $scope.selected[i] = {isSelected:true,cacheSelected:true};
                            }
                        }
                    }
                    //如果有初始数据，生成预览
                    $scope.generPreInfo();
                }
            };

            //初始化选择
            $scope.selected = [];
            var index = 0;
            //检测传入的遍历数据是否为异步，然后正常初始化选择框,需要设置延迟，不然火狐有问题
            var initSelect = $interval(function(){
                    index++;
                    if($scope.option.repeat != undefined){
                        initSelectSuccess();
                        $scope.initSelectData();
                    }
                },10
            );
            var initSelectSuccess = function(){
                $interval.cancel(initSelect);
            };

            for(var i in $scope.option.repeat){
                $scope.option.repeat[i].index = i;
                $scope.selected[i] = {isSelected:false,cacheSelected:false};
            }

            //显示数据
            $scope.showProperty = function(item){
                if(!$scope.option.property){
                    return item;
                }else{
                    return item[$scope.option.property];
                }
            };

            if($scope.option.property != null){
                $scope.search = {};
            }

            //确定上次是否点击了确认按钮就关闭了选择窗口，否则重置为上次选中的状态
            $scope.cacheSelected = function(){
                for(var i in $scope.selected){
                    if($scope.selected[i].isSelected != $scope.selected[i].cacheSelected){
                        $scope.selected[i].isSelected = $scope.selected[i].cacheSelected;
                    }
                }
            };

            //全选，不全选
            $scope.selectedAll = false;
            $scope.selectAll = function(){
                angular.forEach($scope.selected,function(item){
                    item.isSelected = $scope.selectedAll;
                });
            };

            //确实选中
            $scope.confirm = function(event){

                //存放选中的对象数组
                var selectedItem = [];
                for(var i in $scope.option.repeat){
                    $scope.selected[i].cacheSelected = $scope.selected[i].isSelected;
                    if($scope.selected[i].cacheSelected){
                        selectedItem.push($scope.option.repeat[i]);
                    }
                }
                //将选中的对象数组赋给
                $scope.model = selectedItem;
                //生成预览信息
                $scope.generPreInfo();

                //点击确认关闭窗口
                $(event.target).closest("#multiChoiceSearch").removeClass('open');
            };

        }],
        link:function(scope, element, attrs, ctrls, transcludeFn){

        }
    };
});

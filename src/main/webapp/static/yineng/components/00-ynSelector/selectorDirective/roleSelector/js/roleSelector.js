/**
 * Created by YN on 2015/4/24.
 */

angular.module("yn.utils").directive('roleSelector', ["$http","ynNotification",function($http,ynNotification) {
    return {
        restrict : 'AE',
        templateUrl : basePath + '/static/yineng/components/00-ynSelector/selectorDirective/roleSelector/templates/roleSelector.html',
        scope : {
            options : '='
        },
        replace : true,
        controller:function($scope, $element){

            //默认每页为20条
            $scope.pageSize = 20;

            ////////////zTree配置开始//////////
            $scope.asyncSuccess = function(event,treeId,treeNode,msg){
                console.log($scope.treeConfig.ynTree.getYnTree().getNodes());
                if($scope.treeConfig.ynTree.getYnTree().getNodes().length == 0){
                    console.log($(event.target).html("12345"));
                }
            };

            $scope.click =function(event,treeId,treeNode){
                //点击时打印当前的这个对象

                //console.log(treeNode)

                $http.get(basePath + "/customerInformation/getAllPerson",{params:{id:treeNode.id,pageSize:$scope.pageSize}}).success(function(data){
                    if(data.status == 0){
                        $scope.personList = data.result;
                    }else{
                        ynNotification.notify('error',data.message);
                    }
                });
                //console.log("click");
            };

            //组装系统获取系统菜单
            $scope.treeConfig = {
                useMode:"hover",//hover contextmenu
                contextMenuRule:{
                    //conditionKey:"assembleType",
                    conditionList:[
                        {
                            domId:"dSys",
                            //conditionValue:"1",
                            rightMenuList:[
                                {id:"chooseModuleMenu01",name:"选择模块菜单",handler:function(){console.log($scope.treeConfig.ynTree.getYnTree())}},
                                {id:"addRootMenuForSys",name:"添加一级菜单",handler:function(){console.log("添加一级菜单")}},
                                {id:"releaseSys",name:"发布系统",handler:function(){console.log("发布系统")}}
                            ]
                        }
                    ]
                },
                setting: {
                    async: {
                        enable: true,
                        //url: "/ynedut/menuAssemble/searchSysMenuByPlatform.htm"
                        url: basePath + "/customerInformation/getManagerMessage?"+csrfKey.name+"="+csrfKey.key
                        //url: basePath + "/org/queryOrg?"+csrfKey.name+"="+csrfKey.key
                    },
                    data: {
                        key:{
                            name:"departInfoName",
                            children:"sysDepartManagementVoList"
                        },
                        simpleData: {
                            enable: true,
                            idKey:"id",
                            pIdKey:"pid"

                        }
                    },
                    view:{
                        addHoverDom:function(treeId, treeNode) {
                        //    var aObj = $("#" + treeNode.tId + "_a");
                        //    if ($("#diyA_add_"+treeNode.id).length>0) return;
                        //    if ($("#diyA_update_"+treeNode.id).length>0) return;
                        //    if ($("#diyA_use_"+treeNode.id).length>0) return;
                        //    var editStr = "<span id='diyA_add_"+treeNode.id+"'>" +
                        //        "<a href='javascript:void(0)' class='right_link'>增加</a>" +
                        //        "</span>";
                        //    aObj.append(editStr);
                        //    var addHref = $("#diyA_add_"+treeNode.id);
                        //    if (addHref) addHref.bind("click",$scope.addTreeNode);
                        //
                        //    editStr = "<span id='diyA_update_"+treeNode.id+"'>" +
                        //        "<a href='javascript:void(0)' class='right_link'>更新</a>" +
                        //        "</span>";
                        //    aObj.append(editStr);
                        //    editStr = "<span id='diyA_use_"+treeNode.id+"'>" +
                        //        "<a href='javascript:void(0)' class='right_link'>启用</a>" +
                        //        "</span>";
                        //    aObj.append(editStr);
                        },
                        removeHoverDom:function(treeId, treeNode) {
                            $("#diyA_add_"+treeNode.id).unbind().remove();
                            $("#diyA_update_"+treeNode.id).unbind().remove();
                            $("#diyA_use_"+treeNode.id).unbind().remove();
                        }
                    },
                    callback:{
                        onClick:$scope.click,
                        onAsyncSuccess:$scope.asyncSuccess
                    },
                    check:{
                        enable:false
                    }
                }
            };

            //$scope.$watch("selectNode",function(newVal,oldVal,opts){
            //    console.log(newVal);
            //});

            $scope.addTreeNode = function(){
                if(!$scope.selectNode){
                    $scope.selectNode = null;
                }
                if($scope.treeConfig.ynTree){
                    $scope.treeConfig.ynTree.getYnTree().addNodes($scope.selectNode,{ id: 100, menuUrl: "叶子节点100", sex:"1000"},false);
                };
            }

            $scope.refresh = function(){
                console.log("refresh");
                var url = "/customerInformation/getManagerMessage?"+csrfKey.name+"="+csrfKey.key;
                $scope.treeConfig.ynTree.fetchFrom(basePath + url);
            };

            $scope.selectWhich = function(index){

                var nodes = $scope.treeConfig.ynTree.getYnTree().getNodes();
                $scope.treeConfig.ynTree.getYnTree().selectNode(nodes[index]);
            };


            ////////////zTree配置结束////////////////////////



        },
        link : function($scope, $element, $attrs, ctrls) {


        }
    }
}]);


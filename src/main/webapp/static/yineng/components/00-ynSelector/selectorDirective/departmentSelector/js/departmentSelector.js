/**
 * 部门选择器指令
 * departmentSelector
 * zengxiangyong
 * 2015-5-9 14:02:03
 */

angular.module("yn.utils").directive('departmentSelector', ["$http", "ynNotification", function ($http, ynNotification) {
    return {
        restrict: 'AE',
        templateUrl: basePath + '/static/yineng/components/00-ynSelector/selectorDirective/departmentSelector/templates/departmentSelector.html',
        scope: {
            options: '='
        },
        replace: true,
        controller: function ($scope, $element) {

            /*-----  ynTreeBak配置开始  -----*/

            $scope.treeConfig = {
                //设置使用模式(hover/contextmenu)若使用后者，需配置contextMenuRule，contextMenuRule.conditionList，contextMenuRule.conditionList.rightMenuList
                setting: {
                    async: {
                        enable: true,
                        url: basePath + "/sysDepartManagement/getSysDepartManagementByAllForJson?" + csrfKey.name + "=" + csrfKey.key
                    },
                    data: {
                        key: {
                            name: "departInfoName",
                            children: "sysDepartManagementVoList"
                        },
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "parentId"

                        }
                    },
                    check: {
                        enable: false
                    },
                    callback: {
                        onClick: click
                    }
                }
            };

            //点击节点事件
            function click(event, treeId, treeNode) {
                $scope.options.selected = treeNode;
            }

            //刷新树
            $scope.refresh = function () {
                $scope.treeConfig.ynTree.fetchFrom(basePath + "/sysDepartManagement/getSysDepartManagementByAllForJson?" + csrfKey.name + "=" + csrfKey.key);
            };

            $scope.selectWhich = function (index) {
                var nodes = $scope.treeConfig.ynTree.getYnTree().getNodes();
                $scope.treeConfig.ynTree.getYnTree().selectNode(nodes[index]);
            };

            $scope.expandAll = function (flag) {
                $scope.treeConfig.ynTree.getYnTree().expandAll(flag);
            };

            /*-----  ynTreeBak配置结束  -----*/


        },
        link: function ($scope, $element, $attrs, ctrls) {


        }
    }
}]);


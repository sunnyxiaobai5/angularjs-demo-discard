/**
 * Created by YN on 2015/4/24.
 */

angular.module('yn.utils').factory('ynSelectorService', function ($rootScope, ynModal, ynNotification) {
    return {
        roleSelector: function (options, callBack) {
            $scope = $rootScope.$new();

            $scope.options = {
                singleChoice: true
            };

            //将默认配置和用户配置合并
            angular.extend($scope.options, options);

            var config = {
                id: "roleSelector",
                title: "选择人员",
                quickClose: false,
                button: [
                    {
                        value: '完成选择',
                        callback: function () {
                            if ($scope.options.selected) {
                                callBack($scope.options.selected);
                                return true;
                            } else {
                                ynNotification.notify('error', '请至少勾选一条！');
                                return false;
                            }
                        },
                        autofocus: true
                    },
                    {
                        value: '取消',
                        callback: function () {
                            return true;
                        }
                    }
                ]
            };
            //设置模板的URL地址
            var url = "<role-selector options='options'></role-selector>";
            ynModal.showModal(url, config, $scope);
        },
        departmentSelector: function (options, callBack) {
            $scope = $rootScope.$new();

            $scope.options = {};

            //将默认配置和用户配置合并
            angular.extend($scope.options, options);

            var config = {
                id: "departmentSelector",
                title: "选择部门",
                quickClose: false,
                button: [
                    {
                        value: '完成选择',
                        callback: function () {
                            if ($scope.options.selected) {
                                callBack($scope.options.selected);
                                return true;
                            } else {
                                ynNotification.notify('error', '请至少勾选一条！');
                                return false;
                            }
                        },
                        autofocus: true
                    },
                    {
                        value: '取消',
                        callback: function () {
                            return true;
                        }
                    }
                ]
            };
            //设置模板的URL地址
            var url = "<department-selector options='options'></department-selector>";
            ynModal.showModal(url, config, $scope);
        },
        // 分页后的人员选择器
        roleSelectorByPage: function (options, callBack) {
            $scope = $rootScope.$new();
            $scope.options = {};

            //将默认配置和用户配置合并
            angular.extend($scope.options, options);

            var config = {
                id: "departmentSelector",
                title: "人员选择",
                quickClose: false,
                button: [
                    {
                        value: '完成选择',
                        callback: function () {
                            if ($scope.options.selected) {
                                callBack($scope.options.selected);
                                return true;
                            } else {
                                ynNotification.notify('error', '请至少勾选一条！');
                                return false;
                            }
                        },
                        autofocus: true
                    },
                    {
                        value: '取消',
                        callback: function () {
                            return true;
                        }
                    }
                ]
            };
            //设置模板的URL地址
            var url = "<role-selector-by-page options='options'></role-selector-by-page>";
            ynModal.showModal(url, config, $scope);
        }
    };
});

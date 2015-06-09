angular.module("yn.utils").directive('ynDataGrid', ["$http","ynNotification","$location","$window", function($http,ynNotification,$location,$window) {
    return {
        restrict : 'AE',
        templateUrl : basePath + '/static/yineng/components/3-ynDataGrid/template/ynDataGrid.html',
        scope : {
            gridOptions : '='
        },
        replace : true,
        controller:function($scope, $element){
        },
        link : function($scope, $element, $attrs, ctrls) {
            //默认不合并单元格
            if($scope.gridOptions.mergeCols == undefined || $scope.gridOptions.mergeCols.length == 0){
                $scope.useMerge = false;
            }else{
                $scope.useMerge = true;
            }
            //判断数值中是否包含元素
            in_array = function(e, Array){
                for(var i=0; i<Array.length && Array[i] != e; i++);
                return !(i == Array.length);
            }
            //获取当前单元格rowSpan值
            $scope.getSpanValue = function(col, item){
                if(in_array(col, $scope.gridOptions.mergeCols)){
                    return item.singleList.length > 0 ? item.singleList.length : 1;
                }else{
                    return 1;
                }
            };
            //设置样式
            $scope.getColCss;
            //判断是否要设置列样式
            if($scope.gridOptions.isRed != undefined && $scope.gridOptions.isRed > 0 ){
                $scope.isRed = $scope.gridOptions.isRed;
                $scope.getColCss = $scope.gridOptions.getColCss;
            }else{
                $scope.isRed = -1;
            }

            //设置某列样式
            $scope.getIsRedBl = function(colNumBer,state){
                //判断是否要修改样式的列
                if(colNumBer ==  $scope.isRed && state.dataArr[colNumBer] ==  $scope.gridOptions.isRedStateVal){
                    return true;
                }else{
                    return false;
                }
            }

            //默认使用序号
            if($scope.gridOptions.serialNumber==undefined){
                $scope.serialNumber=true;
            }else{
                $scope.serialNumber=$scope.gridOptions.serialNumber;
            }

            //默认使用多选框
            if($scope.gridOptions.useCheckBox == undefined){
                $scope.useCheckBox = true;
            }else{
                $scope.useCheckBox = $scope.gridOptions.useCheckBox;
            }

            //默认使用操作
            if($scope.gridOptions.useOperate == undefined){
                $scope.useOperate = true;
            }else{
                $scope.useOperate = $scope.gridOptions.useOperate;
            }
            angular.forEach($scope.gridOptions.rowActions,function(action){
                if(action.useable == undefined){
                    action.useable = function(item){
                        return true;
                    };
                }
            });
            //默认显示操作项
            angular.forEach($scope.gridOptions.rowActions,function(action){
                if(action.showable == undefined){
                    action.showable = function(item){
                        return true;
                    };
                }
            });
            if(!$scope.gridOptions.primaryKey){
                $scope.gridOptions.primaryKey = "id";
            }

            //默认使用列控制按钮
            if($scope.gridOptions.useColumnsControl == undefined){
                $scope.gridOptions.useColumnsControl = true;
            }
            //默认使用顶部分页
            if($scope.gridOptions.useTopPageable == undefined){
                $scope.gridOptions.useTopPageable = true;
            }
            //默认使用底部分页
            if($scope.gridOptions.useBottomPageable == undefined){
                $scope.gridOptions.useBottomPageable = true;
            }

            //获得当前行数据
            $scope.getRowData = function(id){
                var rowData = null;
                angular.forEach($scope.pagableData.content,function(item){
                    if(id == item[$scope.gridOptions.primaryKey]){
                        rowData = item;
                    }
                });
                return rowData;
            };
            if($scope.gridOptions.sortDesc == undefined || typeof $scope.gridOptions.sortDesc != "boolean"){
                $scope.currentSortBy = $scope.gridOptions.sortField + "_asc";
            }else{
                if($scope.gridOptions.sortDesc == true){
                    $scope.currentSortBy = $scope.gridOptions.sortField + "_desc";
                }else{
                    $scope.currentSortBy = $scope.gridOptions.sortField + "_asc";
                }
            }
            //排序控制
            $scope.sortDataList = function(col,event){
                $scope.currentSortBy =
                    $scope.currentSortBy == col.field + "_asc" ? col.field + "_desc" : col.field + "_asc";
                if($scope.sortField === col.field){
                    $scope.dataList.reverse();
                }else{
                    $scope.sortField = col.field;
                    $scope.getDataList();
                }
            };

            //排序依赖的字段
            $scope.by = function(field){
                return function(o,p){
                    var a, b;
                    if(typeof o === "object" && typeof p === "object" && o && p) {
                        a = o[field];
                        b = p[field];
                        if(a === b) {
                            return 0;
                        }
                        if (typeof a === typeof b) {
                            return a > b ? 1 : -1;
                        }
                        return typeof a > typeof b ? 1 : -1;
                    }else{
                        throw("error");
                    }
                }
            }

            //构造数据集
            $scope.getDataList = function(){

                if($scope.gridOptions.sortField){
                    $scope.sortField = $scope.gridOptions.sortField;
                }
                if($scope.sortField){
                    $scope.pagableData.content.sort($scope.by($scope.sortField));
                }
                //容器:前端展示需要的数据集
                $scope.dataList = new Array();
                //每一行数据
                $scope.dataItemResult = null;
                $scope.dataItemCss = new Array();
                angular.forEach($scope.pagableData.content,function(dataItem, dataKey) {
                    //初始化行数据,获得唯一标示改行的ID值和行数据(行数据使用有序的数组存储)
                    $scope.dataItemResult = {
                        id:dataItem[$scope.gridOptions.primaryKey],
                        selectedFlag:"no",
                        dataArr:new Array(),
                        singleList:new Array()
                    };
                    $scope.dataItemResult[$scope.gridOptions.primaryKey] = dataItem[$scope.gridOptions.primaryKey];
                    if(dataItem[$scope.gridOptions.canOperate] != undefined){
                        $scope.dataItemResult["disabled"] = !dataItem[$scope.gridOptions.canOperate]
                    }else {
                        $scope.dataItemResult["disabled"] = false;
                    }

                    //构造行数据
                    if(!$scope.useMerge){

                        angular.forEach($scope.fields,function(fieldItem,fieldKey) {
                            if(dataItem[fieldItem] != null){
                                $scope.dataItemResult.dataArr.push(dataItem[fieldItem]);
                            }else{
                                $scope.dataItemResult.dataArr.push("");
                            }
                        });
                    }

                    //构造能够合并单元格的数据
                    if($scope.useMerge){
                        //获取list中需要显示的属性
                        $scope.showListCols = new Array();
                        angular.forEach($scope.gridOptions.noMergeCols, function(col){
                            if(in_array(col,$scope.fields)){
                                $scope.showListCols.push(col);
                            }
                        });
                        //构造含有rowspan属性的tr数据
                        angular.forEach($scope.fields,function(fieldItem,fieldKey) {
                            if(dataItem[fieldItem] != null){
                                $scope.dataItemResult.dataArr.push(dataItem[fieldItem]);
                            }else{
                                if(dataItem.list.length > 0 && dataItem.list[0][fieldItem] != undefined){
                                    $scope.dataItemResult.dataArr.push(dataItem.list[0][fieldItem]);
                                }else{
                                    $scope.dataItemResult.dataArr.push("");
                                }
                            }
                        });
                        //构造详细显示的tr数据
                        angular.forEach(dataItem.list, function(item,itemIndex){
                            var listCols = new Array();
                            angular.forEach($scope.showListCols, function(field, fieldIndex){
                                listCols.push(item[field]);
                            });
                            $scope.dataItemResult.singleList.push(listCols);
                        });
                    }
                    //将数据放置到数据集容器中        
                    $scope.dataList.push($scope.dataItemResult);
                    //清空行数据
                    $scope.dataItemResult = null;
                });
                //实现倒序排列
                if($scope.currentSortBy.split("_")[1] == "desc"){
                    $scope.dataList.reverse();
                }
            };

            //对列数据的操作(展示和隐藏)
            $scope.selectColumn = function(column){
                $scope.fields = new Array();
                $scope.selectedfields = new Array();
                angular.forEach($scope.columns,function(item,opts){
                    if(item.columnSelectFlag == "yes"){
                        $scope.fields.push(item["field"])
                        $scope.selectedfields.push({"field":item["field"],"displayName":item["displayName"]});
                    }
                });
                $scope.getDataList();
            };

            //点击页码时调用
            $scope.pagerForwards = function(pageNumber){
                $scope.config.params={pageNumber:(pageNumber-1),pageSize:$scope.pagableData.size};
                $scope.loadDataList($scope.config);
            };

            //输入页码时调用
            $scope.loadDataByPageNumber = function(){
                if($scope.inputPageNumber >0 && $scope.inputPageNumber <= ($scope.pagableData.totalPages) ){
                    $scope.config.params={pageNumber:($scope.inputPageNumber-1),pageSize:$scope.pagableData.size};
                    $scope.loadDataList($scope.config);
                }
            }

            //去首页
            $scope.toFirstPage = function(){
                $scope.config.params={pageNumber:0,pageSize:$scope.pagableData.size};
                $scope.loadDataList($scope.config);
            }

            //改变每页显示条数
            $scope.selectPageSize = function(){
                $scope.pagableData.size = $scope.selectedPageSize;
                $scope.config.params={pageNumber:0,pageSize:$scope.pagableData.size};
                $scope.loadDataList($scope.config);
            }

            //去末页
            $scope.toLastPage = function(){
                $scope.config.params={pageNumber:($scope.pagableData.totalPages-1),pageSize:$scope.pagableData.size};
                $scope.loadDataList($scope.config);
            }

            //定义每页数据条数列表、
            $scope.pageSizeList = [20,50,100,200];


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

            //相应外部传入的请求重载数据列表的办法
            $scope.$on("reloadDataEvent",function(event,options){
                $scope.config = {
                    url:basePath + options.searchUrl,
                    method:"POST",
                    params:{pageNumber:0,pageSize:$scope.gridOptions.pageSize}
                };
                $scope.gridOptions.listUrl =options.searchUrl;
                $scope.getColumnFields();
                $scope.loadDataList($scope.config);
            });

            //BEGIN CHECKBOX
            $scope.selectedItems=[];

            var yesSelectCount = 0,dataLength = 0;

            $scope.clickRow=function(item){
                if($scope.gridOptions.clickRow){
                    $scope.gridOptions.clickRow(item);
                }else{
                    //console.log("click接口未实现.")
                }
            };

            $scope.selectRow = function(rowData){
                $scope.$watch("dataList",function(newVal,oldVal,opts){
                    $scope.selectedItems=[];
                    dataLength = newVal.length;
                    angular.forEach(newVal,function(dataItem,fieldKey) {
                        if(dataItem.selectedFlag == "yes"){
                            $scope.selectedItems.push(dataItem[$scope.gridOptions.primaryKey]);
                            yesSelectCount++;
                        }
                    });

                    if(dataLength == yesSelectCount){
                        $scope.allFlag = "all";
                    }else{
                        $scope.allFlag = "notall";
                    }
                    dataLength=0;
                    yesSelectCount=0;
                })
            };

            $scope.checkAll = function(){
                $scope.selectedItems=[];
                if($scope.allFlag == "all"){
                    angular.forEach($scope.dataList,function(dataItem,fieldKey) {
                        $scope.selectedItems.push(dataItem[$scope.gridOptions.primaryKey]);
                        dataItem.selectedFlag = "yes";
                    })
                }
                if($scope.allFlag == "notall"){
                    angular.forEach($scope.dataList,function(dataItem,fieldKey) {
                        $scope.selectedItems = [];
                        $scope.selectedItems.length = 0;
                        dataItem.selectedFlag = "no";
                    })
                }
            };
            //END CHECKBOX

            /**
             * 构造默认的首次加载参数
             * 获取后台数据的API
             */
                //BEGIN LOADDATA
            $scope.config = {
                url:basePath + $scope.gridOptions.listUrl,
                method:"POST",
                params:{pageNumber:0,pageSize:$scope.gridOptions.pageSize}
            };
            //容器:所有需要显示的列
            $scope.fields = new Array();
            $scope.selectedfields = new Array();
            //容器:所有列名
            $scope.columns = new Array();
            //形成基础列和列名的基础数据数组,默认根据列定义使用
            angular.forEach($scope.gridOptions.columnDefs,function(item, key) {
                if(item["show"] == false){
                    item.columnSelectFlag = "no";
                }
                if(item.columnSelectFlag == undefined || item.columnSelectFlag != "no"){
                    item.columnSelectFlag = "yes";
                }
                if(item.columnSelectFlag == "yes"){
                    $scope.fields.push(item["field"]);
                    $scope.selectedfields.push({"field":item["field"],"displayName":item["displayName"]});
                }
                $scope.columns.push(item);
            });

            //使dateGrid数据可点击去到另一页面
            $scope.clickToOtherPage = function(index,rowData){
                angular.forEach($scope.gridOptions.columnDefs,function(value,key){
                    if(value.clickUrl && index == key){
                        $location.path(value.clickUrl).search("item",rowData);
                    }
                    if(value.clickOpenUrl&& index == key){
                        $window.open(value.clickOpenUrl+"?id=" + rowData.id,basePath +$scope.gridOptions.listUrl);
                    }
                })
            }

            /**
             * 动态自定义列头
             */
            $scope.getColumnFields = function(){
                if($scope.gridOptions.customField){
                    angular.forEach($scope.gridOptions.customField.columnFields,function(item){
                        /*默认列头不显示*/
                        item.columnSelectFlag = $scope.gridOptions.customField.show;
                        if(item.columnSelectFlag == "yes"){
                            $scope.fields.push(item.field);
                            $scope.selectedfields.push({"field":item.field,"displayName":item.displayName});
                        }
                        $scope.columns.push(item);
                    });

                }
            }
            $scope.columnDefsLength = $scope.gridOptions.columnDefs.length+3;

            //构造页面展示数据需要的内容
            $scope.loadDataList = function(config){
                $scope.allFlag="notall";
                $scope.selectedItems.length=0;
                $scope.selectedItems = [];
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

                            $scope.getDataList();
                        }
                    }).error(function(data, status, headers, config) {
                        console.log("获取首页数据失败！")
                    });

            };
            //END LOADDATA

            $scope.gridOptions.loadDataList=function(){
                $scope.loadDataList($scope.config);
            };

            // 获取首页数据
            $scope.gridOptions.loadDataList();
            //打印数据表格
            $scope.dataGrid_printSelected = function(){
                if($scope.selectedItems.length < 1){
                    ynNotification.notify("error", "请至少勾选一项");
                    return false;
                }
                var strArray = new Array();
                angular.forEach($scope.selectedfields, function(item){
                    strArray.push(item.field + "@" + item.displayName);
                });
                window.open(basePath + "/static/yineng/components/3-ynDataGrid/template/print.html?printAll="
                + "n" + "&pageSize=" + $scope.pagableData.size + "&pageNumber=" + $scope.pagableData.number
                + "&pageTitle=" + $scope.gridOptions.printConfig.title + "&url=" + $scope.gridOptions.printConfig.printSelectedReqUrl + "&columns=" + strArray.join("^"),$scope.selectedItems.join(","));
            };
            $scope.dataGrid_printAll = function(){
                var strArray = new Array();
                angular.forEach($scope.selectedfields, function(item){
                    strArray.push(item.field + "@" + item.displayName);
                });
                // 打印全部时 一页 10万条
                window.open(basePath + "/static/yineng/components/3-ynDataGrid/template/print.html?printAll="
                + "y" + "&pageSize=100000&pageNumber=1&pageTitle="
                + $scope.gridOptions.printConfig.title + "&url=" + $scope.config.url + "&columns=" + strArray.join("^"));
            };
        }
    }
}]);

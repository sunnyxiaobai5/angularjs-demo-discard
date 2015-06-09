angular.module("yn.utils").directive("ynDataGridMini", ["$http", function($http) {
    return {
        restrict : 'AE',
        templateUrl : basePath + '/static/yineng/components/3-ynDataGrid/template/ynDataGridMini.html',
        scope : {
            gridOptions : "="
        },
        replace : true,
        link : function($scope, $element, $attrs, ctrls) {
        	var primaryKey = $scope.gridOptions.primaryKey;
            //被选择的用户的集合
        	$scope.selectedItems = new Array();
        	//开放给外部的接口方法
        	$scope.gridOptions.getSelectedItems = function(){
        		return $scope.selectedItems;
        	};

        	$scope.gridOptions.uncheckOption = function(keys){
        		var keyContainer = new Array();
        		if(typeof(keys) == "string"){
        			keyContainer.push(keys);
        		}else if(keys instanceof Array){
        			keyContainer = keys;
        		}
        		angular.forEach(keyContainer,function(key){
                    angular.forEach($scope.selectedItems,function(selectedData, selectedIndex){
                        if(selectedData.item[primaryKey] === key){
                            //如果去掉勾选的数据时当前页数据，设置全选状态为非全选
                            angular.forEach($scope.dataList, function(data){
                                if(key === data.item[primaryKey]){
                                    data.selectedFlag = "no";
                                    $scope.allFlag = "notall";
                                }
                            });
                            $scope.selectedItems.splice(selectedIndex,1);//从选中的数据中移除
                            return;
                        }
                    });
    			});
        	};
        	//分页行为
        	$scope.turnPage =function(num){
        		$scope.allFlag = "notall";
        		if(num <= 0){
        			num = 0;
        		}
        		if(num >= $scope.girdReturnData.totalPages){
        			num = $scope.girdReturnData.totalPages-1;
        		}
        		var requestConfig = {
                    url:listUrl,
                    method:"POST",
                    params:{pageNumber:num,pageSize:10}
                };
        		loadDataList(requestConfig);
        	};
        	
        	//默认的请求地址
        	var listUrl = basePath + $scope.gridOptions.listUrl;
        	
        	
        	var fields = new Array();
        	//获得指定字段对应的列名数组
        	angular.forEach($scope.gridOptions.columnDefs,function(column){
        		fields.push(column.field);
        	});
            //添加数据到已选择数据集合中
            $scope.addSelectedData = function(rowItem){
                var notExist = true;
                angular.forEach($scope.selectedItems,function(selectedData, selectedIndex){
                    if(selectedData.item[primaryKey] === rowItem.item[primaryKey]){
                        notExist = false;
                    }
                });
                if(notExist){
                    rowItem.selectedFlag = "yes";
                    $scope.selectedItems.push(rowItem);
                }
            };
            //移除数据到已选择数据集合中
            $scope.removeSelectedData = function(rowItem){
                angular.forEach($scope.selectedItems,function(selectedData, selectedIndex){
                    if(selectedData.item[primaryKey] === rowItem.item[primaryKey]){
                        rowItem.selectedFlag = "no";
                        $scope.selectedItems.splice(selectedIndex, 1);
                    }
                });
            };
        	//全选控制
        	$scope.allFlag = "notall";
        	$scope.changeAllFlag = function(allFlag){
        		if(allFlag == "all"){
        			angular.forEach($scope.dataList,function(item){
                        $scope.addSelectedData(item);
        			});
        		}
        		if(allFlag == "notall"){
        			angular.forEach($scope.dataList,function(item){
                        $scope.removeSelectedData(item);
        			});
        		}
        	};
        	
        	//行选中控制
        	$scope.changeOption = function(rowItem){
        		var option = rowItem.selectedFlag;
        		if(option == "no"){
                    $scope.removeSelectedData(rowItem);
        			$scope.allFlag = "notall";
        		}
        		if(option == "yes"){
                    $scope.addSelectedData(rowItem);
        			var yesCount = 0;
        			angular.forEach($scope.dataList,function(item){
        				if(item.selectedFlag == "yes"){
        					yesCount++;
        				}
        			});
        			if(yesCount == $scope.dataList.length){        				
        				$scope.allFlag = "all";
        			}
        		}
        	};

        	var pageDataSet = {
    			pageNumber:null,
    			dataList:null
        	}
        	
        	//生成展示数据
        	var generateDataList = function(resultDataSet,pageNumber){
        		//生成展示数据的处理
        		var rowData = new Array();
        		var itemData = {};
        		angular.forEach(resultDataSet.content,function(item){
        			itemData = {
                			dataArr:new Array(),
                			item:item,
                			selectedFlag:"no"
                	}
        			rowData = new Array();
        			angular.forEach(fields,function(field){
        				itemData.dataArr.push({"field":field,"value":item[field]});
            		});
            		$scope.dataList.push(itemData);
        		});
        		//当已选择用户数组中有数据时
        		if($scope.selectedItems && $scope.selectedItems.length>=0){
        			//循环最大容器的数据,确定请求和勾选情况
        			angular.forEach($scope.selectedItems,function(selectedItem){
                        var selectedCount = 0;
                        //将之前的勾选情况应用到新数据上(根据ID识别)
                        angular.forEach($scope.dataList,function(pageRow){
                            if(pageRow.item[primaryKey] === selectedItem.item[primaryKey]){
                                pageRow.selectedFlag = "yes";
                                selectedCount++;
                            }
                        });
                        //如果勾选数据条数跟当页数据完全一致
                        if(selectedCount == resultDataSet.numberOfElements){
                            $scope.allFlag = "all";
                        }
        			});
        		}
        	};
        	//默认HTTP参数
        	var requestConfig = {
                url:listUrl,
                method:"POST",
                params:{pageNumber:0,pageSize:10}
            };
        	
        	//请求数据的方法
        	var loadDataList = function(requestConfig){
        		$scope.dataList = new Array();
        		$http(requestConfig).success(function(data, status, headers, config){
            		if(status == 200 && data.result != null){
            			$scope.girdReturnData = data.result;
            			generateDataList($scope.girdReturnData,requestConfig.params.pageNumber);
                    }
                });
        	};
        	
        	//发起请求
        	loadDataList(requestConfig);

            //相应外部传入的请求重载数据列表的办法
            $scope.$on("reloadDataEvent",function(event,options){
                $scope.config = {
                    url:basePath + options.searchUrl,
                    method:"POST",
                    params:{pageNumber:0,pageSize:$scope.gridOptions.pageSize}
                };
                loadDataList($scope.config);
            });
        }
    }
}]);
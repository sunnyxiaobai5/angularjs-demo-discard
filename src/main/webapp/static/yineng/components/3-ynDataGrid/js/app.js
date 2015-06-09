angular.module("ynedut8App").controller("ynDataGrid1Controller",["$scope",function($scope){
	
	$scope.advancedSearch = function(){
	   console.log("启动高级查询");		
	   $scope.$broadcast("reloadDataEvent",
	   	   {
	           searchUrl:"/user/searchUser.htm?expired=1&isDel=1"
	       });
	}
    
    $scope.columnDefs = [
         //初始显示默认columnSelectFlag为 "yes"
        {field:'id', displayName:'序号'},
        {field:'loginName', displayName:'登录账号'},
        {field:'userNumber', displayName:'工号/学号'},
        {field:'name', displayName:'姓名'},
        {field:'mobile', displayName:'手机号码'},
        {field:'email', displayName:'邮箱'},
        {field:'statusName', displayName:'状态'},
        {field:'credentialNumber', displayName:'身份证'},
        //初始不显示配置columnSelectFlag为"no"
        {field:'createTime', displayName:'创建日期', "columnSelectFlag": "no"}
    ];
    
    $scope.listUrl="/user/searchUser.htm?expired=1&isDel=0";
    
    $scope.rowActions=[
        {
        	//操纵名称
            name:"添加",
            //设置操纵不可用 默认可用(true)
            useable:function(item){
            	//可用|不可用
            	return true | false;
            },
            action:function(item){
                console.log("添加--"+item);
            }
        },{
            name:"删除",
            action:function(item){
                console.log("删除--"+item);
            }
        },{
            name:"更新",
            action:function(item){
                console.log("更新--"+item);
            }
    }];
        
    $scope.topActions=[
        {
            name:"重置密码",
            action:function(selectedItems){
                console.log("-----重置密码-----");
                console.log(selectedItems);
                console.log("------------------");
            }
        },
        	{
            name:"更改状态",
            action:function(selectedItems){
                console.log("-----更改状态-----");
                console.log(selectedItems);
                console.log("------------------");
            }
        },
    	{
        name:"删除",
        action:function(selectedItems){
            console.log("-----删除-----");
            console.log(selectedItems);
            console.log("------------------");
        }
    }];
    
    $scope.exportSelected =function(ids,fields){
    	console.log("-----导出所选-----");
        console.log(ids);
        console.log(fields);
    }
    
    $scope.exportAll =function(fields){
    	console.log("-----导出全部-----");
        console.log(fields);
    };
        
    $scope.gridOptions = {
        //获得数据集的URL
        listUrl:$scope.listUrl,
        //对展示的列及列名的定义
        columnDefs:$scope.columnDefs,
        //每一页上的数据数量
        pageSize:10,
        //行操作
        rowActions:$scope.rowActions,
        //顶部操作定义
        topActions:$scope.topActions,
        //底部操作定义
        bottomActions:$scope.topActions,
        //导出所选
        exportSelected:$scope.exportSelected,
        //导出全部
        exportAll:$scope.exportAll,
        //排序依赖字段
        sortField:"createTime",
        //不使用多选框
        useCheckBox: false,
        //使用打印
        usePrint:true,
        //配置打印功能详细设置
        printConfig:{
            //打印预览页面标题
            title:"学期管理",
            //获取所选数据请求(参导出所选)
            printSelectedReqUrl:"/requestMapping/requestMapping.htm"
        }
    };
    
}]);
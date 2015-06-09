var ngFileUploadApp = angular.module("ngFileUploadApp",["yn.utils"]);

ngFileUploadApp.controller("ngFileUploadController",function($scope){

    $scope.uploaderAttrs = {
        method:"POST",
        //是否自动上传
        auto:true,
        threads:4,
        pick: {
            id:"#uploader",
            innerHTML: "上传",
            multiple:true
        },
        //是否使用开始上传按钮
        uploadBtn : false,
        //上传类型
        accept: {
            title: 'Images',
            extensions: 'zip,xls,xlsx,ppt,pptx,doc,docx,txt,rar,jpg',
            mimeTypes: 'application/zip,application/vnd.ms-excel,application/vnd.ms-powerpoint,image/*' +
                ',application/vnd.openxmlformats-officedocument.presentationml.presentation' +
                ',application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword' +
                ',application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,application/x-rar-compressed'
        },
        fileSingleSizeLimit :100 * 1024 * 1024,//100M
        //文件总数量, 超出则不允许加入队列
        fileNumLimit: 300,
        //上传按钮id
        pickID:"uploader",
        //获取dfsID
        getDFSIdList:$scope.getDFSId

    };
});


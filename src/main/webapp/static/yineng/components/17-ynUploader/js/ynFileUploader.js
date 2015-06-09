var projectName = '/' + window.location.pathname.split('/')[1];
angular.module("yn.utils").factory("ynUploader",['$window','$http',function($window,$http){


    var uploader,options = {
        method: "POST",
        //文件队列中有文件时自动上传
        auto: false,
        // swf文件路径
        swf: "../../../../static/vendor/webuploader/Uploader.swf",
        // 文件接收服务端。
        server: projectName+"/file/upload?"+ csrfKey.name + "=" + csrfKey.key,
//        server: projectName+"/file/upload",
        //是否在文件
        prepareNextFile: true,
        // 选择文件的按钮。可配置
        pick: {
            id:"#picker",
            innerHTML: "添加文件",
            multiple:true
        },
        //上传类型
        accept: {
            title: 'Images',
            extensions: 'zip,xls,xlsx,ppt,pptx,doc,docx,txt,rar,jpg',
            mimeTypes: 'application/zip,application/vnd.ms-excel,application/vnd.ms-powerpoint,image/*' +
                ',application/vnd.openxmlformats-officedocument.presentationml.presentation' +
                ',application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword' +
                ',application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,application/x-rar-compressed'
        },
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        //是否分片
        chunked: true,
        //分片的大小
        chunkSize:  5242880,
        //重传次数
        chunkRetry: 2,
        //上传最大允许的连接数
        threads:  10,
        //文件总数量, 超出则不允许加入队列
        fileNumLimit: 300,
        //文件总大小限制
        fileSizeLimit : undefined,
        //单文件最大限制
        fileSingleSizeLimit : undefined
    };
    //可能有pedding, ready, uploading, confirm, done.
    var state = 'pedding';
    return {
        initYnFileUploader:function(uploaderAttrs,$scope){
            var uploader;
            $scope.projectName = projectName;
            if(uploaderAttrs.pickID == undefined){
                $scope.pickID = "picker";
            }else{
                $scope.pickID = uploaderAttrs.pickID;
            }
            //是否显示开始上传按钮
            if(uploaderAttrs.uploadBtn){
                $scope.uploadBtn = uploaderAttrs.uploadBtn;
            }
            //获取自定义文件上传类型
            if(uploaderAttrs.accept){
                $scope.fileFormat = uploaderAttrs.accept.extensions;
            }
            //获取自定义文件上传大小限制
            if(uploaderAttrs.fileSingleSizeLimit){
                options.fileSingleSizeLimit = uploaderAttrs.fileSingleSizeLimit
            }
            //是否显示按钮
            if(uploaderAttrs.showView == undefined){
                $scope.showView = true;
            }else{
                $scope.showView = uploaderAttrs.showView;
            }
            window.setTimeout(function(){
                options = angular.extend(options,uploaderAttrs);
                //创建实例
                uploader = WebUploader.create(options);
                uploader.on("startUpload",function(){
                    startTime=new Date();
                });

                $scope.fileList = [];
                $scope.fastDFSIdList = [];
                /**
                 * 判断文件格式是否正确
                 */
                uploader.on("beforeFileQueued",function(file){
                    var fileSize = file.size;
                    $scope.fileSize = WebUploader.formatSize( uploaderAttrs.fileSingleSizeLimit, 2, ['B', 'KB', 'MB'] )
                    if(fileSize > uploaderAttrs.fileSingleSizeLimit){
                        file.unsupportFile = true;
                        $scope.fileList.push(file);
                        return false;
                    }
                });
                /**
                 * 当有文件被添加进队列的时候
                 */
                $scope.fileList = [];
                uploader.on( "filesQueued", function( files ) {
                    angular.forEach(files,function(file){
                        file.selectFile = true;
                        file.uploadError = false;
                        file.uploadProgress = 0;
                        $scope.fileList.push(file);
                    });
                    $scope.$apply($scope.fileList);
                    if($scope.fileList.length >0){
                        angular.forEach($scope.fileList,function(file){
                            $scope.fileName = file.name;
                            file.sizeshow = WebUploader.formatSize( file.size );
                        });
                        $scope.$apply();
                    }
                    //等页面渲染完毕后在执行,延时1s
                    window.setTimeout(function(){
                        angular.forEach($scope.fileList,function(file){
                            $scope.getPic(file);
                        });
                    },1000);
                });
                /**
                 * 删除指定文件
                 * @param file
                 */
                $scope.deleteConcurrentFile = function(file){
                    uploader.removeFile(file,true);
                    $scope.fileList = uploader.getFiles();
                    console.log($scope.fileList);
                }
                /**
                 * 删除上传成功file
                 * @param file
                 */
                $scope.deleteComplete =function(file){
                    $http.get(projectName+"/file/delete?"+ csrfKey.name + "=" + csrfKey.key,{params:{fastDFSId:file.uploadToFDFS}}).success(function(data){
                        if(data == "success"){
                            if($scope.fastDFSIdList.length > 0){
                                for(var i = $scope.fastDFSIdList.length-1; i >= 0 ; i--){
                                    if(file == $scope.fastDFSIdList[i]){
                                        delete $scope.fastDFSIdList[i];
                                    }
                                }
                            }
                            if($scope.fileList.length > 0){
                                for(var i = $scope.fileList.length-1; i >= 0 ; i--){
                                    if(file == $scope.fileList[i]){
                                        delete $scope.fileList[i];
                                    }
                                }
                                console.log($scope.fileList);
                            }
                        }
                    });
                }
                /**
                 * 下载附件
                 */
                $scope.downLoad = function(file){
                    $http.get(projectName+"/file/download?"+ csrfKey.name + "=" + csrfKey.key,{params:{fastDFSId:file.uploadToFDFS}}).success(function(data){
                        if(data.result ==0){
                            $scope.filePath = data.result;
                            window.location($scope.filePath);
                        }
                    });
                }
                /**
                 * 生成预览图片
                 * @param file
                 */
                $scope.getPic = function(file){
                    uploader.makeThumb(file,function(error,src){
                        if(error){
                            return;
                        }
                        if(uploaderAttrs.getSrc){
                            //返回图片src
                            uploaderAttrs.getSrc(src);
                        }
                        angular.element("#_a"+file.id).attr('href',src);
                        angular.element("#_b"+file.id).attr('href',src);
                        angular.element("#_c"+file.id).attr('href',src);
                        angular.element("#_d"+file.id).attr('href',src);
                    },1, 1);
                }

                /**
                 * 重试
                 */
                $scope.retry = function(){
                    uploader.retry();
                }
                /**
                 * 文件上传过程中创建进度条实时显示。
                 */
                uploader.on( 'uploadProgress', function( file, percentage ) {
                    file.uploadProgress = percentage*100;
                    $scope.$apply();
                });
                /**
                 * 上传失败
                 */
                uploader.on( 'uploadError', function( file ) {
                    file.uploadError = false;
                    file.uploadProgress = 0;
                });
                /**
                 * 监听
                 */
                $scope.startWatch = function(){
                    $scope.$watch("fastDFSIdList",function(newValue, oldValue, scope){
                        if(newValue){
                            uploaderAttrs.getDFSIdList($scope.fastDFSIdList,uploaderAttrs.pickID);
                        }
                    });
                }

                /**
                 * 上传完成
                 */
                uploader.on( 'uploadComplete', function( file ) {
                    $.ajax({
                        type:"POST",
                        url:projectName+"/file/mergeFile?"+ csrfKey.name + "=" + csrfKey.key,
                        async:false,
                        data:{"id":file.id,"name":file.name,"size":file.size,"type":file.type,"uploadToFDFS":"uploadToFDFS"},
                        success: function(data){
                            if(data != ""){
                                file.uploadToFDFS = data;
                                $scope.fastDFSIdList.push(file.uploadToFDFS);
                                //启动监听
                                $scope.startWatch();
                                file.uploadProgress = 100;
                                $scope.$apply();
                            }else{
                                file.uploadToFDFS = "";
                                file.uploadError = true;
                            }
                        }
                    });
                });
            },100);
        },
        /**
         * 执行上传
         */
        startUpload:function(){
            uploader.upload();
        }
    }
}])
    .directive("ynFileUploader", function (ynUploader) {
        return {
            restrict:"AE",
            replace:true,
            transclude:true,
            templateUrl : basePath + '/static/yineng/components/17-ynUploader/template/ynUploader.html',
            scope:{
                uploaderAttrs:"="
            },
            link:function($scope,$element,$attrs,transclude){
                $element.find("#ctlBtn").on("click",function(){
                    ynUploader.startUpload();
                });
                if($scope.uploaderAttrs){
                    ynUploader.initYnFileUploader($scope.uploaderAttrs,$scope);
                }
            }
        }
    })
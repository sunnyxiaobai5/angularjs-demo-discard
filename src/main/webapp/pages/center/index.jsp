<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js" ng-app="ynedut8CenterApp" ng-controller="homePageController">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<%@include file="./common/taglibs.jsp" %>
<head>
    <meta charset="utf-8" />
    <title>YNedut云服务管理中心</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />

    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="${basePath}/static/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/global/plugins/bootstrap-toastr/toastr.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <link href="${basePath}/static/ynassets/lib/artDialog/css/ui-dialog.css" rel="stylesheet" type="text/css" />
    <!-- BEGIN COMPONENTS CSS -->
    <link rel="stylesheet" href="${basePath}/static/assets/global/plugins/bootstrap-datetimepicker/css/datetimepicker.css" />
    <link rel="stylesheet" href="${basePath}/static/assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css" />
    <link rel="stylesheet" href="${basePath}/static/ynassets/layout/css/ztree/ynztree.css">
    <!-- ui-select -->
    <link rel="stylesheet" href="${basePath}/static/ynassets/lib/ui-select/selectize.default.css">
    <link rel="stylesheet" href="${basePath}/static/ynassets/lib/ui-select/select2.css">
    <link rel="stylesheet" href="${basePath}/static/ynassets/lib/ui-select/select.css">
    <!-- ui-select -->
    <!-- BEGIN THEME STYLES -->
    <link href="${basePath}/static/assets/global/css/components.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/admin/layout/css/layout.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/ynassets/layout/css/yncore.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/ynassets/layout/css/pagestyle.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/ynassets/lib/webuploader/webuploader.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/ynassets/layout/css/ynstyle_green.css" rel="stylesheet" type="text/css" id="style_color" />
    <!-- END THEME STYLES -->
    <!-- BEGIN COMPONENTS CSS -->
    <%--<link rel="icon" href="http://www.firefox.com.cn/media/img/firefox/faviconYN.ico?2013-06" type="image/icon" />--%>
    <%--<link rel="shortcut icon" type="image/icon" href="http://www.firefox.com.cn/media/img/firefox/faviconYN.ico?2013-06">--%>

    <link rel="icon" href="${basePath}/pages/faviconYN.ico" type="image/icon" />
    <link rel="shortcut icon" type="image/icon" href="${basePath}/pages/faviconYN.ico">

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->

<body class="page-header-fixed" ng-app="">
<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header navbar navbar-fixed-top">
        <!-- BEGIN HEADER INNER -->
        <div class="page-header-inner">
            <!-- BEGIN LOGO -->
            <div class="page-logo">
                <a href="javascript:viod(0)">
                    <img ng-src="{{logPng}}" alt="logo" class="logo-default" />
                </a>
                <div class="menu-toggler sidebar-toggler hide">
                    <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
                </div>
            </div>
            <!-- END LOGO -->
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <div class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
            </div>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <!-- BEGIN TOP NAVIGATION MENU -->
            <div class="top-menu">
                <div class="top-menu-personal pull-right">
                    <label>
                        <span class="margin-right-10"><i class="fa fa-user"></i>
                        欢迎您，${uservo.userAccount.userName}
                        </span>
                        <%--<a href="#" >退出</a>--%>
                        <!-- BEGIN LOGIN FORM -->
                    </label>
                    <label class="help-inline">
                        <form action="${basePath}/logout" method="post">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                            <button type="submit" class="btn green">退出 </button>
                        </form>
                    </label>
        </div>
    </div>
    <!-- END TOP NAVIGATION MENU -->
</div>
<!-- END HEADER INNER -->
</div>
</div>
<!-- END HEADER -->
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
<!-- BEGIN SIDEBAR -->
<div ng-include="'${basePath}/pages/center/common/sidebar.html'"></div>
<!-- END SIDEBAR -->
<!-- BEGIN CONTENT
<div class="page-content-wrapper">
<div class="page-content">
    <!-- BEGIN PAGE CONTENT-->
<!-- <div class="row">
<div class="col-md-12">
    页面内容从这里开始
</div>
</div> -->
<ui-view></ui-view>
<!-- END PAGE CONTENT-->
<!--    </div>
</div> -->
<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<div ng-include="'${basePath}/pages/center/common/footer.html'"></div>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="${basePath}/static/assets/global/plugins/respond.min.js"></script>
<script src="${basePath}/static/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="${basePath}/static/assets/global/plugins/jquery-1.11.0.min.js" type="text/javascript"></script>
<!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="${basePath}/static/assets/global/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<script src="${basePath}/static/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="${basePath}/static/assets/global/plugins/bootstrap-toastr/toastr.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<script src="${basePath}/static/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="${basePath}/static/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="${basePath}/static/ynassets/lib/artDialog/js/dialog-plus-min.js" type="text/javascript"></script>
<script src="${basePath}/static/ynassets/lib/angularjs/angular-1.3.0.min.js"></script>
<script type="text/javascript" src="${basePath}/static/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${basePath}/static/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
<script type="text/javascript" src="${basePath}/static/assets/global/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="${basePath}/static/ynassets/lib/zTree/js/jquery.ztree.all-3.5.js"></script>
<script src="${basePath}/static/yineng/util/json2.js"></script>

<script src="${basePath}/static/yineng/js/ynedut8CenterApp.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/js/ynFrame.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/common/ynUtils.js" type="text/javascript"></script>
<script src="${basePath}/static/ynassets/lib/ui-router/angular-ui-router.min.js" type="text/javascript"></script>
<script src="${basePath}/static/ynassets/lib/ui-select/select.js"></script>
<script src="${basePath}/static/ynassets/lib/ui-select/angular-sanitize.js"></script>
<script src="${basePath}/static/ynassets/lib/webuploader/webuploader.js"></script>

<!-- YN组件导入  -->

<script src="${basePath}/static/yineng/components/00-ynSelector/js/ynSelectorService.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/00-ynSelector/selectorDirective/roleSelector/js/roleSelector.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/00-ynSelector/selectorDirective/departmentSelector/js/departmentSelector.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/00-ynSelector/selectorDirective/roleSelector/js/roleSelectorByPage.js" type="text/javascript"></script>

<script src="${basePath}/static/yineng/components/3-ynDataGrid/js/ynDataGridMini.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/3-ynDataGrid/js/ynDataGrid.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/4-ynModal/js/ynModal.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/5-ynTree/js/ynTree.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/6-ynDate/js/ynDate.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/9-ynNotification/js/ynNotification.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/12-ynValidation/js/ynValidation.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/17-ynUploader/js/ynFileUploader.js" type="text/javascript"></script>
<script src="${basePath}/static/yineng/components/18-ynUeditor/ueditor/ueditor.config.js"></script>
<script src="${basePath}/static/yineng/components/18-ynUeditor/ueditor/ueditor.all.min.js"></script>
<script src="${basePath}/static/yineng/components/18-ynUeditor/js/ynUeditor.js"></script>
<script src="${basePath}/static/yineng/components/18-ynUeditor/js/app.js"></script>
<script src="${basePath}/static/yineng/components/19-ynSelectForMany/js/ynSelecteForMany.js"></script>

<!--util-->
<script src="${basePath}/static/yineng/util/utils.js" type="text/javascript"></script>

<!-- 开发导入 -->

<!--versioninfomanage -->
<%--<script src="${basePath}/pages/center/customerBasicInformation/js/customerInfoImport.js" type="text/javascript"></script>--%>

<script>
jQuery(document).ready(function() {
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    $.ajaxSetup({
        data: { '${_csrf.parameterName}': '${_csrf.token}'}
    });
});

var csrf = {};

var csrfName = '${_csrf.parameterName}';
var csrfValue = '${_csrf.token}';
var csrfKey = {
name:csrfName,
key:csrfValue
};
csrf[csrfName] = csrfValue;

</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->

</html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="UTF-8"/>
    <title>依能校园平台-YNedut8.0</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="${basePath}/static/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="${basePath}/static/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" />
    <link href="${basePath}/static/global/plugins/bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="${basePath}/static/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" />
    <link href="${basePath}/static/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" />
    <link href="${basePath}/static/global/plugins/bootstrap-modal/css/bootstrap-modal.css" rel="stylesheet" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN THEME STYLES -->
    <link href="${basePath}/static/global/css/components.css" rel="stylesheet" />
    <link href="${basePath}/static/global/css/plugins.css" rel="stylesheet" />
    <link href="${basePath}/static/layout/css/layout.css" rel="stylesheet" />
    <link id="style_color" href="${basePath}/static/layout/css/themes/default.css" rel="stylesheet" />
    <link href="${basePath}/static/layout/css/custom.css" rel="stylesheet" />
    <!-- END THEME STYLES -->
    <link rel="shortcut icon" href="/favicon.ico" />

</head>

<body class="page-header-fixed page-nobgimg" ng-controller="ynDataGrid1Controller">

<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner">
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            <a href="index.html">
                <img src="${basePath}/static/layout/img/logo.png" alt="logo" class="logo-default"/>
            </a>

        </div>
        <!-- END LOGO -->
        <!-- BEGIN HORIZANTAL MENU -->
        <div class="hor-menu hidden-sm hidden-xs">
            <ul class="nav navbar-nav">
                <li class=""><!--classic-menu-dropdown active-->
                    <a href="index.html">我的主页</a>
                </li>
                <li>
                    <a href="javascript:;">教务管理</a>
                </li>
                <li>
                    <a href="javascript:;">学生管理</a>
                </li>
                <li>
                    <a href="javascript:;">课程教学</a>
                </li>
                <li>
                    <a href="javascript:;">考勤管理</a>
                </li>
                <li class="mega-menu-dropdown mega-menu-full">
                    <a data-hover="dropdown" data-close-others="true" data-toggle="dropdown" href="javascript:;" class="dropdown-toggle">更多 <i class="fa fa-angle-down"></i></a>
                    <ul class="dropdown-menu">
                        <li>
                            <!-- Content container to add padding -->
                            <div class="mega-menu-content ">
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul class="col-md-12 mega-menu-submenu">
                                            <li>
                                                <a href="index_horizontal_menu.html">
                                                    <i class="fa fa-angle-right"></i> 办公OA系统 </a>
                                            </li>
                                            <li>
                                                <a href="layout_full_height_portlet.html">
                                                    <i class="fa fa-angle-right"></i> 课件资源 <span class="badge badge-roundless badge-danger">new</span></a>
                                            </li>
                                            <li>
                                                <a href="layout_full_height_content.html">
                                                    <i class="fa fa-angle-right"></i> 试题管理 <span class="badge badge-roundless badge-warning">new</span></a>
                                            </li>
                                            <li>
                                                <a href="index_horizontal_menu.html">
                                                    <i class="fa fa-angle-right"></i> 教材管理 </a>
                                            </li>
                                            <li>
                                                <a href="index_horizontal_menu.html">
                                                    <i class="fa fa-angle-right"></i> 学费管理 </a>
                                            </li>
                                            <li>
                                                <a href="index_horizontal_menu.html"><i class="fa fa-angle-right"></i> 宿舍管理 </a>
                                            </li>
                                            <li>
                                                <a href="index_horizontal_menu.html"><i class="fa fa-angle-right"></i> 人事管理 </a>
                                            </li>
                                            <li>
                                                <a href="index_horizontal_menu.html"><i class="fa fa-angle-right"></i> 招生管理  </a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </li>
                    </ul>
                </li>

            </ul>
        </div>
        <!-- END HORIZANTAL MENU -->
        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"></a>
        <!-- END RESPONSIVE MENU TOGGLER -->
        <!-- BEGIN TOP NAVIGATION MENU -->
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                <!-- BEGIN NOTIFICATION DROPDOWN -->
                <li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <i class="icon-bell"></i>
					<span class="badge badge-default">
					7 </span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <p>您有 14 条新通知</p>
                        </li>
                        <li>
                            <ul class="dropdown-menu-list scroller" style="height: 250px;">
                                <li>
                                    <a href="#">
									<span class="message-rank"><i class="fa fa-exclamation"></i><i class="fa fa-exclamation"></i></span>
                                        [通知]请全校教职工人员今天下午两点到教务处开会<span class="time">23:59</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="message-rank"><i class="fa fa-exclamation"></i><i class="fa fa-exclamation"></i></span>
                                        [通知]请全校教职工人员今天下午两点到教务处开会<span class="time">23:59</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="message-rank"><i class="fa fa-exclamation"></i><i class="fa fa-exclamation"></i></span>
                                        [通知]请全校教职工人员今天下午两点到教务处开会<span class="time">23:59</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="external">
                            <a href="#">查看所有通知 <i class="m-icon-swapright"></i></a>
                        </li>
                    </ul>
                </li>
                <!-- END NOTIFICATION DROPDOWN -->
                <!-- BEGIN INBOX DROPDOWN -->
                <li class="dropdown dropdown-extended dropdown-inbox" id="header_inbox_bar">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <i class="icon-envelope"></i>
                        <span class="badge badge-default"> 4 </span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <p>
                                您有 12 新消息
                            </p>
                        </li>
                        <li>
                            <ul class="dropdown-menu-list scroller" style="height: 250px;">

                            </ul>
                        </li>
                        <li class="external">
                            <a href="inbox.html">
                                查看所有消息 <i class="m-icon-swapright"></i>
                            </a>
                        </li>
                    </ul>
                </li>
                <!-- END INBOX DROPDOWN -->
                <!-- BEGIN TODO DROPDOWN -->
                <li class="dropdown dropdown-extended dropdown-tasks" id="header_task_bar">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <i class="icon-calendar"></i>
					<span class="badge badge-default">
					3 </span>
                    </a>
                    <ul class="extended tasks"></ul>
                </li>
                <!-- END TODO DROPDOWN -->
                <!-- BEGIN USER LOGIN DROPDOWN -->
                <li class="dropdown dropdown-user">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <img alt="" class="img-circle" src="${basePath}/static/layout/img/avatar3_small.jpg"/>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="#">
                            <i class="icon-user"></i> 个人资料
                        </a></li>
                        <li>
                            <a href="#">
                                <i class="icon-rocket"></i> 我的云盘 <span class="badge badge-success">200G</span>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="#">
                            <i class="icon-key"></i> 修改密码
                        </a></li>
                        <li><a href="#">
                            <i class="icon-key"></i> 登出系统
                        </a></li>
                    </ul>
                </li>
                <!-- END USER LOGIN DROPDOWN -->
            </ul>
        </div>
        <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END HEADER INNER -->
</div>
<!-- END HEADER -->
<div class="clearfix"></div>
<!-- BEGIN CONTAINER -->
<div class="page-container">

<!-- BEGIN SIDEBAR -->
<div class="page-sidebar-wrapper">
    <div class="page-sidebar navbar-collapse collapse">
        <!-- BEGIN SIDEBAR MENU1 -->
        <ul class="page-sidebar-menu hidden-sm hidden-xs">
            <li class="sidebar-toggler-wrapper">
                <div class="platform-name float-left">基础平台</div>
                <div class="sidebar-toggler"><i class="fa fa-align-justify"></i></div>
            </li>

            <!-- BEGIN FRONTEND THEME LINKS -->
            <li class="start active open">
                <a href="javascript:;">
                    <i class="fa fa-codepen"></i>
                    <span class="title">教务信息发布</span>
                    <span class="arrow open"></span>
                </a>
                <ul class="sub-menu">
                    <li>
                        <a href="#">课程学科信息</a> <i class="fa fa-star"></i>
                    </li>
                    <li class="active">
                        <a href="#">课程学科信息 </a>  <i class="fa fa-star-o"></i>
                    </li>
                    <li>
                        <a href="#">课程学科信息</a> <i class="fa fa-star"></i>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- END SIDEBAR MENU1 -->
    </div>
</div>
<!-- END SIDEBAR -->
<!-- BEGIN CONTENT -->
<div class="page-content-wrapper">
<div class="page-content no-padding">
<!-- BEGIN PAGE CONTENT-->
    <ul class="page-breadcrumb breadcrumb">
        <li class="btn-group">
            <button type="button" class="btn">
                <span>返回</span>
            </button>
        </li>
        <li>
            <i class="fa fa-home"></i>
            <a href="index.html">基础平台</a>
            <i class="fa fa-angle-right"></i>
        </li>
        <li>
            <a href="#">用户管理</a>
            <i class="fa fa-angle-right"></i>
        </li>
        <li class="active">
            <a href="#">账户信息管理</a>
        </li>
    </ul>
    <div class="clearfix"></div>
    <ul class="page-search">
        <li class="btn-group">
            <button type="button" class="btn margin-right-10 green" ng-click="advancedSearch()">
                <span>查询</span>
            </button>
            <button type="button" class="btn btn-default">
                <span>高级</span>
            </button>
        </li>
        <li class="col-md-3">
            <label><span>登录</span><div><input type="text" class="form-control input-sm"></div></label>

        </li>
        <li class="col-md-3">
            <label><span>身份</span><div><input type="text" class="form-control input-sm"></div></label>
        </li>
        <li class="col-md-3">
            <label><span>状态</span><div><input type="text" class="form-control input-sm"></div></label>
        </li>
        <li class="col-md-3">
            <label><span>过期状态</span><div><select name="order_status" class="form-control form-filter input-sm">
                <option value="">请选择过期状态</option>
                <option value="pending">已过期</option>
            </select></div></label>
        </li>
    </ul>
<hr/>

<div>
    <yn-data-grid1 grid-options="gridOptions"></yn-data-grid1>
</div>

<!-- END PAGE CONTENT-->
</div>
</div>
<!-- END CONTENT -->


</div>
<div id="ajax" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="true" style="display: none;"></div>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<div class="page-footer">
    <div class="page-footer-inner">2014 &copy; 成都依能科技.</div>
    <div class="page-footer-tools">
        <span class="go-top"><i class="fa fa-angle-up"></i></span>
    </div>
</div>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<script src="${basePath}/static/global/scripts/jquery-2.1.1.min.js"></script>
<script src="${basePath}/static/global/plugins/jquery-ui/jquery-ui-1.11.1.js"></script>
<script src="${basePath}/static/global/plugins/jquery.cokie.min.js"></script>
<script src="${basePath}/static/global/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="${basePath}/static/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"></script>
<script src="${basePath}/static/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js"></script>
<script src="${basePath}/static/global/scripts/metronic.js"></script>
<script src="${basePath}/static/layout/scripts/layout.js"></script>
<script src="${basePath}/static/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<script src="${basePath}/static/global/plugins/uniform/jquery.uniform.min.js"></script>
<script src="${basePath}/static/global/plugins/jquery.blockui.min.js"></script>
<script src="${basePath}/static/global/plugins/bootstrap-modal/js/bootstrap-modal.js"></script>
<script src="${basePath}/static/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js"></script>
<script src="${basePath}/static/global/plugins/angularjs/angular-1.3.0.js"></script>
<script src="${basePath}/static/global/plugins/angular-local-storage/angular-local-storage.js"></script>
<script src="${basePath}/static/global/plugins/ui-router/angular-ui-router.js"></script>
<script src="${basePath}/static/yineng/components/ynvalidation/js/angular-validation.js"></script>
<script src="${basePath}/static/global/plugins/angularui/ui-bootstrap-tpls-0.11.0.js"></script>
<script src="${basePath}/static/yineng/scripts/ynedut8App.js"></script>
<script src="${basePath}/static/yineng/components/ynvalidation/js/angular-validation-rule.js"></script>
<script src="${basePath}/static/yineng/components/ynDataGrid1/js/ynDataGrid1.js"></script>
<script src="${basePath}/static/yineng/components/ynGrid/templates/js/ynGrid.js"></script>
<script src="${basePath}/static/yineng/components/ynDataGrid1/js/app.js"></script>
<script src="${basePath}/static/yineng/components/topMenu/topMenu.js"></script>
<script src="${basePath}/pages/platform/scripts/addUser.js"></script>
<script src="${basePath}/pages/platform/scripts/userInfoManage.js"></script>
<script src="${basePath}/pages/platform/scripts/updateUser.js"></script>
<script src="${basePath}/pages/platform/user/scripts/import.js"></script>
<script src="${basePath}/pages/platform/scripts/deleteUserInfoManage.js"></script>
<script src="${basePath}/static/yineng/components/leftSlider/homepageLeftSlider.js"></script>
<script src="${basePath}/static/yineng/components/leftSlider/childSystemLeftSlider.js"></script>
<script src="${basePath}/pages/platform/scripts/frame.js"></script>
<!-- END JAVASCRIPTS -->
</body>

<!-- END BODY -->
</html>
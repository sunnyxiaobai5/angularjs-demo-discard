<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js" >

<head>

    <title>登录 - YNedut云服务管理中心</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->

    <link href="${basePath}/static/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN THEME STYLES -->
    <link href="${basePath}/static/assets/global/css/components.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="${basePath}/static/assets/admin/layout/css/layout.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="${basePath}/static/ynassets/layout/css/login.css" />
    <!-- END THEME STYLES -->

    <link rel="icon" href="${basePath}/pages/faviconYN.ico" type="image/icon" />
    <link rel="shortcut icon" type="image/icon" href="${basePath}/pages/faviconYN.ico">
</head>
<c:url value="/logout" var="loginProcessingUrl"/>
<body class="login">
<div class="login-wrap">
    <!-- BEGIN LOGO -->
    <div class="row">
        <div class="col-md-12">
            <div class="logo">
                <a href="index.html">
                    <img src="${basePath}/static/ynassets/layout/img/logo_05.png" alt="" />
                </a>
            </div>
        </div>
    </div>
    <!-- END LOGO -->
    <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
    <div class="menu-toggler sidebar-toggler">
    </div>
    <!-- END SIDEBAR TOGGLER BUTTON -->
    <!-- BEGIN LOGIN -->
    <div class="row">
        <div class="col-md-12 content-main">
            <div class="content-bg">
                <img src="${basePath}/static/ynassets/layout/img/lg_content_bg.png" />
            </div>
            <div class="content">
                <!-- BEGIN LOGIN FORM -->
                <form class="login-form" action="logout" method="post">
                    <h3 class="form-title">登录平台</h3>
                    <!--错误时 在form-group后加 has-error样式-->
                    <div class="form-group">
                        <div class="">
                            <label>
                                <input type="checkbox" id="remember-me"  name="remember-me" value="1" /> 记住我 </label>
                            <label class="pull-right">
                                <%--<a href="" class="text-success">忘记密码？</a>--%>
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn green btn-block">退出
                        </button>
                    </div>
                </form>
                <!-- END LOGIN FORM -->
            </div>
        </div>
    </div>
    <!-- END LOGIN -->
    <div class="clearfix"></div>

</div>
<div class="lg-bottom"></div>
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="${basePath}/static/assets/global/plugins/respond.min.js"></script>
<script src="${basePath}/static/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="${basePath}/static/assets/global/plugins/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="${basePath}/static/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->

</html>

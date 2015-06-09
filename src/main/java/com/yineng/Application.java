/*******************************************************************************
 * Project: angularjsDemo
 * FileName:Application.java 
 * Author:  Xiangyong Zeng
 * Date:    2015/6/9 16:53
 * Copyright: 2015 www.yineng.com.cn Inc. All rights reserved.
 * Description:
 ******************************************************************************/

package com.yineng;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Project: angularjsDemo
 * Package: com.yineng
 * Title:
 * Author:  Xiangyong Zeng
 * Date:    2015/6/9 16:53
 * Version: 1.0
 */

@RestController
@EnableAutoConfiguration
public class Application {

    @RequestMapping("/")
    public String home() {
        return "index.jsp";
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

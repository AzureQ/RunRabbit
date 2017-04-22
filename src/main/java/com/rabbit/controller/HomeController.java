package com.rabbit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Qi on 4/21/17.
 */
@Controller
public class HomeController {
    @RequestMapping(value = "/")
    public String index() {
        return "index.html";
    }
}

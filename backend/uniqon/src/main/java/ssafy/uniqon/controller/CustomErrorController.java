package ssafy.uniqon.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import ssafy.uniqon.global.response.Response;

import static ssafy.uniqon.global.response.Response.ERROR;

@Controller
public class CustomErrorController implements ErrorController {
    // error path를 꼭 "/error" 로 하자!
    private final String ERROR_PATH = "/error";
    @Value("${redirect.url}")
    private String redirectUrl;
    @GetMapping(ERROR_PATH)
    public String redirectRoot(){
        return "index.html";
    }
    public String getErrorPath(){
        return ERROR_PATH;
    }
}
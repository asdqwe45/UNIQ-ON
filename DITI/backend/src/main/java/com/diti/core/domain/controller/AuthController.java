package com.diti.core.domain.controller;

import com.diti.core.domain.service.AuthService;
import com.diti.core.global.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static com.diti.core.global.response.Response.ERROR;
import static com.diti.core.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/diti/auth")
@Tag(name = "인증 API")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public Response<?> login(@RequestBody String walletAddress){
        log.debug("# 로그인 요청 : {}", walletAddress);
        int result = authService.loginAuth(walletAddress);
        if (result == 1) {
            return OK(null);
        } else {
            return ERROR("존재 하지 않는 회원입니다 : " + walletAddress, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/join")
    public Response<?> join(@RequestBody String walletAddress){
        log.debug("# 회원가입 요청 : {}", walletAddress);
        int result = authService.registerAuth(walletAddress);
        if (result == 1) {
            log.debug("# 회원가입 성공!");
            return OK(null);
        } else {
            log.debug("# 회원가입 실패!");
            return ERROR("이미 가입된 회원입니다 :" + walletAddress, HttpStatus.BAD_REQUEST);
        }

    }



}

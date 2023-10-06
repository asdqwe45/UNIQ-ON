package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.service.MemberService;

import java.io.IOException;
import java.net.URI;
import java.sql.SQLException;

import static ssafy.uniqon.global.response.Response.ERROR;
import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@Tag(name = "유저 API")
@CrossOrigin("*")
public class MemberController {

    public record SignupWebRequest(
            String walletAddress,
            String name,
            String nickname,
            String birth,
            String gender,
            String vpToken,
            String password) {
    }

    record LoginWebRequest(
            String walletAddress) {
    }

    private final MemberService memberService;

    @Value("${redirect.url}")
    private String redirectUrl;

    @PostMapping("/signup")
    public Response<?> signup(@RequestPart(value = "data") SignupWebRequest req,
            @RequestPart(value = "file") MultipartFile multipartFile) throws SQLException, IOException {

        return OK(memberService.signup(req, multipartFile));
    }

    // @GetMapping("/login/{token}")
    // public Response<?> login(@PathVariable String token) {
    @GetMapping("/login/{token}")
    public Response<?> login(@PathVariable String token) {
         return OK(token);
//        return OK(memberService.login(walletAddress));
    }

    @GetMapping("/duplicate/{nickname}")
    public Response<?> duplicationTestNickname(@PathVariable String nickname){
        log.debug("# 닉네임 중복 검사 요청 : {}", nickname);
        int result = memberService.duplicationTestNickname(nickname);
        if (result == 1) {
            return OK(null);
        } else {
            return ERROR("중복된 닉네임입니다!", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/logout/end")
    public void logout(){
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.setLocation(URI.create(redirectUrl));
//        return new ResponseEntity<>(httpHeaders,HttpStatus.OK);
    }
}

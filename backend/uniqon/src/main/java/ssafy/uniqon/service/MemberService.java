package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.controller.MemberController;
import ssafy.uniqon.controller.MyPageController;
import ssafy.uniqon.global.config.auth.TokenProvider;
import ssafy.uniqon.global.exception.NotFoundException;
import ssafy.uniqon.model.MemberRole;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.repository.MemberRepository;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;

    public String signup(MemberController.SignupWebRequest req, MultipartFile multipartFile) throws IOException, SQLException {
        validateDuplicateMember(req.walletAddress());

        byte[] bytes= multipartFile.getBytes();
        String encodedPassword = passwordEncoder.encode(req.password());
        memberRepository.save(new Members(req.walletAddress(),
                req.name(),
                req.nickname(),
                req.birth(),
                req.gender(),
                req.vpToken(),
                bytes,
                null,
                null,
                new ArrayList<>(),
                new ArrayList<>(),
                MemberRole.USER,
                encodedPassword,
                new ArrayList<>()));
        return req.walletAddress();
    }

    public String login(String walletAddress){
        Members member = memberRepository.findById(walletAddress)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 유저 입니다."));
////        if (!passwordEncoder.matches(user.get("password"), member.getPassword())) {
////            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
////        }
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(member.getWalletAddress(), member.getWalletAddress().substring(member.getWalletAddress().length()-20,member.getWalletAddress().length()));
//        // authenticate 메소드가 실행이 될 때 CustomUserDetailsService class의 loadUserByUsername 메소드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 해당 객체를 SecurityContextHolder에 저장하고
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token=tokenProvider.createToken(authentication);
        return token;
    }

    public MyPageController.MemberInfoWebResponse getUserInfo(String walletAddress){
        Members member=memberRepository.findById(walletAddress).get();
        return new MyPageController.MemberInfoWebResponse(
                member.getWalletAddress(),
                member.getName(),
                member.getNickname(),
                member.getBirth(),
                member.getGender(),
                member.getVpToken(),
                member.getProfileImage()
        );
    }

    private void validateDuplicateMember(String userId) {
        Optional<?> member = memberRepository.findById(userId);
        if (member.isPresent()) {
            throw new IllegalStateException("이미 가입된 회원입니다.");
        }
    }

    @Transactional
    public int modifyUserInfo (String walletAddress, String nickname) {
        Members members = memberRepository.findById(walletAddress).orElseThrow(() -> new NotFoundException(Members.class, walletAddress));
        if (members != null) {
            log.debug("# 회원정보 수정중..");
                members.setNickname(nickname);
            memberRepository.save(members);
            return 1;
        }
        return 0;
    }

    public int duplicationTestNickname (String nickname) {
        Members members = memberRepository.findByNickname(nickname);
        if (members == null) {
            return 1;
        } else {
            return 0;
        }
    }
}

package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ssafy.uniqon.model.MemberRole;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component("userDetailsService")
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    @Override
    public UserDetails loadUserByUsername(String walletAddress) throws AuthenticationException{
        log.warn("여기 들어오니??!!");
        log.warn("여기 들어오니??!!");
        log.warn("여기 들어오니??!!");
        log.warn("여기 들어오니??!!");
        Members members = memberRepository.findByWalletAddress(walletAddress);
        if (members != null) {
            log.warn("사용자 찾기 성공!");
            return createUser(walletAddress, members);
        } else {
            log.warn("사용자 찾기 실패!");
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }
//        Optional<?> members=memberRepository.findById(walletAddress);
//        return memberRepository.findById(walletAddress).map(member->createUser(walletAddress,member))
//                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));


    }

    private org.springframework.security.core.userdetails.User createUser(String walletAddress, Members member) {

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(MemberRole.USER.name()));
        //grantedAuthorities.add(new SimpleGrantedAuthority(MemberRole.ADMIN.name()));

        return new org.springframework.security.core.userdetails.User(member.getWalletAddress(),
                member.getPassword(),
                grantedAuthorities);
    }
}

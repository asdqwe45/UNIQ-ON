package com.diti.core.domain.service;

import com.diti.core.domain.entity.Auth;
import com.diti.core.domain.repository.AuthRepository;
import com.diti.core.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final AuthRepository authRepository;

    @Override
    public int registerAuth(String walletAddress) {
        Auth auth = authRepository.findByWalletAddress(walletAddress);
        if (auth == null) {
            log.debug("# 회원 등록 시도");
            authRepository.save(Auth.builder()
                    .walletAddress(walletAddress)
                    .build());
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public int loginAuth(String walletAddress) {
        Auth auth = authRepository.findByWalletAddress(walletAddress);
        if (auth == null ) {
            log.debug("# 해당 회원은 존재하지 않습니다 : {}", walletAddress);
            return 0;
        } else {
            return 1;
        }

    }
}

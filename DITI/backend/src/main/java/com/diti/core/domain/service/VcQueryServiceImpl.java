package com.diti.core.domain.service;

import com.diti.core.domain.dto.response.VcListDBResponse;
import com.diti.core.domain.entity.Auth;
import com.diti.core.domain.repository.AuthRepository;
import com.diti.core.domain.repository.VcQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class VcQueryServiceImpl implements VcQueryService{

    private final AuthRepository authRepository;
    private final VcQueryRepository vcQueryRepository;
    @Override
    public Page<VcQueryRepository.response> getVcList(String walletAddress, Pageable pageable) {
        Auth auth = authRepository.findByWalletAddress(walletAddress);
        if(auth != null) {
            return vcQueryRepository.getVcList(walletAddress, pageable);
        }

        return null;
    }
}

package com.diti.core.domain.service;

import com.diti.core.domain.controller.VcController;
import com.diti.core.domain.entity.Auth;
import com.diti.core.domain.entity.Vc;
import com.diti.core.domain.repository.AuthRepository;
import com.diti.core.domain.repository.VcRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class VcServiceImpl implements VcService{

    private final VcRepository vcRepository;
    private final AuthRepository authRepository;

    @Override
    public getVcWebResponse getVc(VcController.getVcWebRequest req) {
        Vc vc = vcRepository.findByAuth_WalletAddressAndType(req.walletAddress(), req.type());

        if (vc != null) {
            getVcWebResponse res = new getVcWebResponse(vc.getId(),vc.getAuth().getWalletAddress(), vc.getType(), vc.getVcJwt(), vc.getCreateDateTime(), vc.getModifyDateTime());
            log.debug("# 특정 VC 반환 : {}", res);
            return res;
        } else {
            return null;
        }
    }

    @Override
    public int registerVc(VcController.registerVcWebRequest req) {
        log.debug("# VC 등록중..");
        Vc vc = vcRepository.findByAuth_WalletAddressAndType(req.walletAddress(), req.type());
        Auth auth = authRepository.findByWalletAddress(req.walletAddress());
        if (auth != null) {
            if (vc == null) {
                vcRepository.save(Vc.builder()
                        .auth(auth)
                        .vcJwt(req.vcJwt())
                        .type(req.type())
                        .build());
                log.debug("# VC 등록 성공!");
                return 1;
            } else {
                return 3;
            }
        } else {
            log.warn("# 등록되지 않은 회원입니다!! : {}", req.walletAddress());
            log.warn("# VC 등록 실패!");
            return 2;
        }
    }

    @Override
    public void updateVc(VcController.updateVcWebRequest req) {
        log.debug("# VC 갱신중..");
        Vc vc = vcRepository.findByAuth_WalletAddressAndType(req.walletAddress(), req.type());
        Auth auth = authRepository.findByWalletAddress(req.walletAddress());
        if (vc != null && auth != null) {
            vcRepository.save(Vc.builder()
                    .id(vc.getId())
                    .createDateTime(vc.getCreateDateTime())
                    .auth(auth)
                    .vcJwt(req.vcJwt())
                    .type(req.type())
                    .build());
            log.debug("# VC 갱신 성공!");
        } else{
            log.warn("# VC 갱신 실패!");
        }
    }

}

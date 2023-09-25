package com.diti.core.domain.controller;

import com.diti.core.domain.dto.response.VcListDBResponse;
import com.diti.core.domain.repository.VcQueryRepository;
import com.diti.core.domain.service.VcQueryService;
import com.diti.core.domain.service.VcService;
import com.diti.core.global.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.diti.core.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/diti/vc")
@Tag(name = "VC API")
public class VcController {

    private final VcQueryService vcQueryService;
    private final VcService vcService;

    public record getVcWebRequest(
            String walletAddress,
            String type
    ){}

    public record registerVcWebRequest(
            String walletAddress,
            String vcJwt,
            String type
    ){}

    @GetMapping("/{walletAddress}/{type}")
    public Response<?> getVc(@PathVariable String walletAddress, @PathVariable String type) {
        getVcWebRequest req = new getVcWebRequest(walletAddress, type);
        log.debug("# VC 요청 : {}", req);
        VcService.getVcWebResponse res = vcService.getVc(req);
        log.debug("# VC : {}", res);
        return OK(res);
    }


    @GetMapping("/list/vc/{walletAddress}")
    public Response<Page<VcQueryRepository.response>> getVcList(@PathVariable String walletAddress, @PageableDefault Pageable pageable){
        log.debug("# VC 리스트 요청 지갑 : {}", walletAddress);
        Page<VcQueryRepository.response> list = vcQueryService.getVcList(walletAddress, pageable);
        log.debug("# VC 리스트 : {}", list);
        return OK(list);
    }

    @PostMapping
    public Response<?> registerVc(@RequestBody registerVcWebRequest req){
        log.debug("# VC 등록 요청: {}", req);
        vcService.registerVc(req);
        return OK(null);
    }
}

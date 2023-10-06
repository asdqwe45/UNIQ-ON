package com.diti.core.domain.service;

import com.diti.core.domain.controller.VcController;

import java.sql.Timestamp;

public interface VcService {

    public record getVcWebResponse(
            int id,
            String walletAddress,
            String type,
            String vcJwt,
            Timestamp createDateTime,
            Timestamp ModifyDateTime

    ){}

    getVcWebResponse getVc(VcController.getVcWebRequest req);

    int registerVc(VcController.registerVcWebRequest req);
    void updateVc(VcController.updateVcWebRequest req);
}

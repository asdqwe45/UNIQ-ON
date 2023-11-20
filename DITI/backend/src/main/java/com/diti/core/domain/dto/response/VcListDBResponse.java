package com.diti.core.domain.dto.response;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class VcListDBResponse {

    int id;
    String walletAddress;
    String vcJwt;
    Timestamp createDateTime;
    Timestamp modifyDateTime;
    String type;
}

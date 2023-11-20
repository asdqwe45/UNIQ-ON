package com.diti.core.domain.repository;


import com.diti.core.domain.dto.response.VcListDBResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

import static com.diti.core.domain.entity.QAuth.auth;
import static com.diti.core.domain.entity.QVc.vc;

@Repository
@RequiredArgsConstructor
@Slf4j
public class VcQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;



    public record response(
            int id,
            String walletAddress,
            String type,
            String vcJwt,
            Timestamp createDateTime,
            Timestamp modifyDateTIme
    ){
        public response(int id, String walletAddress, String type, String vcJwt, Timestamp createDateTime, Timestamp modifyDateTIme) {
            this.id = id;
            this.walletAddress = walletAddress;
            this.type = type;
            this.vcJwt = vcJwt;
            this.createDateTime = createDateTime;
            this.modifyDateTIme = modifyDateTIme;
        }
    }



    public Page<response> getVcList(String walletAddress, Pageable pageable){

        List<response> list = jpaQueryFactory
                .select(Projections.constructor(response.class,
                        vc.id,
                        auth.walletAddress,
                        vc.type,
                        vc.vcJwt,
                        vc.createDateTime,
                        vc.modifyDateTime))
                .from(vc)
                .where(
                        vc.auth.walletAddress.eq(walletAddress)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(vc.id.desc())
                .fetch();

        int count = jpaQueryFactory
                .select(vc.count())
                .from(vc)
                .where(auth.walletAddress.eq(walletAddress))
                .fetch().size();

        return new PageImpl<>(list, pageable, count);
    }
}

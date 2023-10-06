package com.diti.core.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Auth {

    @Id
    @Column(name = "wallet_address")
    private String walletAddress; // 기본 키

    @CreationTimestamp
    @Column(name = "create_date_time")
    private Timestamp createDateTime;

    @UpdateTimestamp
    @Column(name = "modify_date_time")
    private Timestamp modifyDateTime;

}


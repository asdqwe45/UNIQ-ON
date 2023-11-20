package com.diti.core.domain.repository;

import com.diti.core.domain.entity.Vc;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VcRepository extends JpaRepository<Vc, Integer> {

    Vc findByAuth_WalletAddressAndType(String walletAddress, String type);
}

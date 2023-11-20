package com.diti.core.domain.repository;

import com.diti.core.domain.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Auth, String> {

    Auth findByWalletAddress(String walletAddress);

}

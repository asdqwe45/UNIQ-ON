package com.diti.core.domain.repository;

import com.diti.core.domain.entity.Auth;
import com.diti.core.domain.entity.Id;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, String> {

    Auth findByWalletAddress(String walletAddress);

}

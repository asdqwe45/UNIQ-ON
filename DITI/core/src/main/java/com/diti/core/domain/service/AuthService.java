package com.diti.core.domain.service;


public interface AuthService {

    void registerAuth(String walletAddress);
    void loginAuth(String walletAddress);
}

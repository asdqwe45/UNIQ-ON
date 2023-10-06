package com.diti.core.domain.service;


public interface AuthService {

    int registerAuth(String walletAddress);
    int loginAuth(String walletAddress);
}

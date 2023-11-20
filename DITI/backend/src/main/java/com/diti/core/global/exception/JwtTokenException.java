package com.diti.core.global.exception;

public class JwtTokenException extends RuntimeException{
    public JwtTokenException(String message){
        super(message);
    }
}

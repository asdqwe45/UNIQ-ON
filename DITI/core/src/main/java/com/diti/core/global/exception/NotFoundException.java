package com.diti.core.global.exception;

import org.apache.commons.lang3.StringUtils;

/**
 * 존재하지 않는 엔티티를 조회할때 발생하는 예외
 */
public class NotFoundException extends InvalidException {

    static final String MESSAGE_KEY = "ERROR.NOT_FOUND";

    public NotFoundException(Class clazz, Object... values) {
        super(MESSAGE_KEY, clazz.getSimpleName(), (values != null && values.length > 0) ? StringUtils.join(values, ",") : "");
    }

}

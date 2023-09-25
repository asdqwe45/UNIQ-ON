package com.diti.core.global.exception;

import org.apache.commons.lang3.StringUtils;

/**
 * 삭제된 엔티티를 조회할때 발생하는 예외
 */
public class DeletedException extends InvalidException {

    static final String MESSAGE_KEY = "ERROR.DELETED";

    public DeletedException(Class clazz, Object... values) {
        super(MESSAGE_KEY, clazz.getSimpleName(), (values != null && values.length > 0) ? StringUtils.join(values, ",") : "");
    }

}

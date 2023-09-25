package ssafy.uniqon.global.exception;

import org.apache.commons.lang3.StringUtils;

/**
 * 이미 존재하는 엔티티를 생성할때 발생하는 예외
 */
public class AlreadyExistException extends ServiceRuntimeException {
    static final String MESSAGE_KEY = "ERROR.ALREADY_EXIST";

    public AlreadyExistException(Class clazz, Object... values) {
        super(MESSAGE_KEY, clazz.getSimpleName(), (values != null && values.length > 0) ? StringUtils.join(values, ",") : "");
    }

}

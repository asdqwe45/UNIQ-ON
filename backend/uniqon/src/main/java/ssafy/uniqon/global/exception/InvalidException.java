package ssafy.uniqon.global.exception;

import org.apache.commons.lang3.StringUtils;

/**
 * 존재하지 않거나 삭제된 엔티티를 조회할때 발생하는 예외
 */
public class InvalidException extends ServiceRuntimeException {

    static final String MESSAGE_KEY = "ERROR.INVALID";

    public InvalidException(Class clazz, Object... values) {
        super(MESSAGE_KEY, clazz.getSimpleName(), (values != null && values.length > 0) ? StringUtils.join(values, ",") : "");
    }

    public InvalidException(String messageKey, String className, String values) {
        super(messageKey, className, values);
    }

}

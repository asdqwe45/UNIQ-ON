package ssafy.uniqon.global.response;

import lombok.Getter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.http.HttpStatus;

@Getter
public class Response<T> {
    private final boolean success;
    private final T response;
    private final ErrorResponse error;

    private Response(boolean success, T response, ErrorResponse error) {
        this.success = success;
        this.response = response;
        this.error = error;
    }

    public static <T> Response<T> OK(T response) {
        return new Response<>(true, response, null);
    }

    public static Response<?> ERROR(Throwable throwable, HttpStatus status) {
        return new Response<>(false, null, new ErrorResponse(throwable, status));
    }

    public static Response<?> ERROR(String errorMessage, HttpStatus status) {
        return new Response<>(false, null, new ErrorResponse(errorMessage, status));
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("success", success)
                .append("response", response)
                .append("error", error)
                .toString();
    }

}
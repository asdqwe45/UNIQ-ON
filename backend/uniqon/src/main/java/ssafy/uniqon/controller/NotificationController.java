package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.repository.NotificationQueryRepository;
import ssafy.uniqon.service.NotificationService;

import java.sql.Timestamp;

import static ssafy.uniqon.global.response.Response.ERROR;
import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
@Tag(name = "알림 API")
@CrossOrigin("*")
public class NotificationController {

    public record registerNotificationWebRequest(
            String walletAddress,
            int postId
    ){}

    public record deleteNotificationWebRequest(
            int notificationId,
            String walletAddress
    ){}

    public record NotificationWebResponse(
            Integer id,
            Boolean checked,
            Timestamp crateTime,
            Integer postId,
            String title,
            String content
    ){}

    private final NotificationService notificationService;

//    @PostMapping("/{postId}")
//    public Response<?> registerNotification(@PathVariable Integer postId) {
//        String walletAddress = "0x00000000000000";
//        registerNotificationWebRequest req = new registerNotificationWebRequest(walletAddress, postId);
//        log.debug("# 알림 생성 요청 : {}", req);
//        int result = notificationService.registerNotification(req);
//        if (result == 1) {
//            log.debug("# 알림 생성 완료!");
//            return OK(null);
//        } else {
//            log.debug("# 알림 생성 실패!");
//            return ERROR("알림 생성 실패!", HttpStatus.NOT_FOUND);
//        }
//    }

    @GetMapping
    public Response<?> getNotificationList(@AuthenticationPrincipal UserDetails user,
                                           @PageableDefault Pageable pageable) {
        log.debug("# 알림 리스트 요청...");
        String walletAddress = "0x00000000000000";
        Page<NotificationQueryRepository.getNotificationListDBResponse> list = notificationService.getNotificationList(pageable, user.getUsername());
        if (list == null) {
            return ERROR("알림 리스트 존재 하지 않음", HttpStatus.NOT_FOUND);
        } else {
            return OK(list);
        }
    }

    @GetMapping("/{notiId}")
    public Response<?> readNotification(@AuthenticationPrincipal UserDetails user,
                                        @PathVariable Integer notiId){
        notificationService.readNotification(user.getUsername(), notiId);
        return OK(null);
    }

    @DeleteMapping("/{notificationId}")
    public Response<?> deleteNotification(@PathVariable int notificationId, @AuthenticationPrincipal UserDetails userDetails) {
        log.debug("# 알림 지우기 요청 ... : {}", notificationId);
        int result = notificationService.deleteNotification(new deleteNotificationWebRequest(notificationId, userDetails.getUsername()));
        if (result == 1) {
            log.debug("# 알림 삭제 성공!");
            return OK(null);
        } else {
            log.debug("# 알림 삭제 실패!");
            return ERROR("알림 삭제 실패", HttpStatus.BAD_REQUEST);
        }

    }
}

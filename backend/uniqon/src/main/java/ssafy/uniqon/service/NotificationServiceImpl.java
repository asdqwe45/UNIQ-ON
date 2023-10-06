package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.NotificationController;
import ssafy.uniqon.global.exception.NotFoundException;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.Notifications;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.repository.MemberRepository;
import ssafy.uniqon.repository.NotificationQueryRepository;
import ssafy.uniqon.repository.NotificationRepository;
import ssafy.uniqon.repository.PostsRepository;


@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final MemberRepository memberRepository;
    private final PostsRepository postsRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationQueryRepository notificationQueryRepository;

    @Override
    public void createNotification(Members user, Posts post) {
        notificationRepository.save(Notifications.builder()
                .member(user)
                .post(post)
                .checked(false)
                .title("판매 완료 알림")
                .content("등록하신 "+"\""+post.getTitle()+"\" "+"판매 글의 NFT가 판매 되었습니다.")
                .build());
    }

    @Override
    public Page<NotificationQueryRepository.getNotificationListDBResponse> getNotificationList(Pageable pageable, String walletAddress) {
        Members members = memberRepository.findById(walletAddress).orElseThrow(
                () -> new NotFoundException(Members.class, walletAddress));
        Page<NotificationQueryRepository.getNotificationListDBResponse> list = notificationQueryRepository.getNotificationList(pageable, walletAddress);
        log.debug("# 알림 리스트 조회 결과 : {}", list);
        return list;

    }

    @Override
    public int deleteNotification(NotificationController.deleteNotificationWebRequest req) {
        log.debug(req.toString());
        Notifications notifications = notificationRepository.findByIdAndMember_WalletAddress(req.notificationId(), req.walletAddress());
        if (notifications != null) {
            log.debug("# 알림 삭제중...");
            notificationRepository.delete(notifications);
            return 1;
        } else {
            return 0;
        }

    }

    @Override
    public NotificationController.NotificationWebResponse readNotification(String userId, Integer notiId) {
        Notifications noti = notificationRepository.findByIdAndMember_WalletAddress(notiId, userId);
        if (noti == null) {
            throw new NotFoundException(Notifications.class, "없는 알림");
        }
        noti.setChecked(true);

        return new NotificationController.NotificationWebResponse(
                noti.getId(),
                noti.getChecked(),
                noti.getCreateDatetime(),
                noti.getPost().getId(),
                noti.getTitle(),
                noti.getContent()
        );
    }
}

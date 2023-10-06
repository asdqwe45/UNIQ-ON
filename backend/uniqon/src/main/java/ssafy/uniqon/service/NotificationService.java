package ssafy.uniqon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ssafy.uniqon.controller.NotificationController;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.repository.NotificationQueryRepository;


public interface NotificationService {

    void createNotification (Members user, Posts post);

    Page<NotificationQueryRepository.getNotificationListDBResponse> getNotificationList (Pageable pageable, String walletAddress);

    int deleteNotification (NotificationController.deleteNotificationWebRequest req);

    NotificationController.NotificationWebResponse readNotification(String userId,Integer notiId);
}

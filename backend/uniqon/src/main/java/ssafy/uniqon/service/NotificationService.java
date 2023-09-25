package ssafy.uniqon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ssafy.uniqon.controller.NotificationController;
import ssafy.uniqon.repository.NotificationQueryRepository;


public interface NotificationService {

    int registerNotification (NotificationController.registerNotificationWebRequest req);

    Page<NotificationQueryRepository.getNotificationListDBResponse> getNotificationList (Pageable pageable, String walletAddress);

    int deleteNotification (NotificationController.deleteNotificationWebRequest req);
}

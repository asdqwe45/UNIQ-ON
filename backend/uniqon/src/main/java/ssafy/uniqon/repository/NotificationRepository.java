package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.controller.NotificationController;
import ssafy.uniqon.model.Notifications;

public interface NotificationRepository extends JpaRepository<Notifications, Integer> {

    Notifications findByPost_IdAndMember_WalletAddress (int postId, String walletAddress);

    Notifications findByIdAndMember_WalletAddress (int NotificationId, String walletAddress);
}

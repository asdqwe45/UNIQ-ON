package ssafy.uniqon.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

import static ssafy.uniqon.model.QNotifications.notifications;

@Repository
@RequiredArgsConstructor
@Slf4j
public class NotificationQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public record getNotificationListDBResponse(
            int notificationId,
            boolean checked,
            Timestamp createDatetime,
            int postId,
            String postTitle,
            String postPrice,
            String title,
            String content

    ){
        public getNotificationListDBResponse(int notificationId, boolean checked, Timestamp createDatetime, int postId, String postTitle, String postPrice, String title, String content) {
            this.notificationId = notificationId;
            this.checked = checked;
            this.createDatetime = createDatetime;
            this.postId = postId;
            this.postTitle = postTitle;
            this.postPrice = postPrice;
            this.title=title;
            this.content=content;
        }
    }

    public Page<getNotificationListDBResponse> getNotificationList(Pageable pageable, String walletAddress) {

        List<getNotificationListDBResponse> list  = jpaQueryFactory
                .select(Projections.constructor(getNotificationListDBResponse.class,
                        notifications.id,
                        notifications.checked,
                        notifications.createDatetime,
                        notifications.post.id,
                        notifications.post.title,
                        notifications.post.price,
                        notifications.title,
                        notifications.content))
                .from(notifications)
                .where(notifications.member.walletAddress.eq(walletAddress))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(notifications.id.desc())
                .fetch();

        int count = jpaQueryFactory
                .select(notifications.count())
                .from(notifications)
                .fetch().size();

        return new PageImpl<>(list, pageable, count);
    }
}

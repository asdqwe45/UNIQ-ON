package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import javax.management.Notification;
import java.security.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Posts{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer id;

    @Column(name = "price")
    private Integer price;

    @Column(name = "content", length = 512)
    private String content;

    @Column(name = "main_image", length = 512)
    private String main_image;

    @Column(name = "create_datetime")
    private Timestamp create_datetime;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "sale_completed_datetime")
    private Timestamp sale_completed_datetime;

    @Column(name = "state")
    private Integer state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "did_address")
    private Members member;

    @OneToMany()
    private List<Purchases> purchasesList = new ArrayList<>();

    @OneToMany()
    private List<WishList> wishlistList = new ArrayList<>();

    @OneToMany()
    private List<PostList> postlistList = new ArrayList<>();

    @OneToMany()
    private List<Notifications> notificationList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft_id")
    private NFTs nft;
}
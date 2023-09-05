package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Members{
    @Id
    @Column(name = "member_id", length = 50)
    private String id;

    @Column(name = "password", length = 50)
    private String password;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "profileImage", length = 512)
    private String profileImage;

    @Column(name = "phoneNumber", length = 16)
    private String phoneNumber;

    @OneToMany(mappedBy = "member")
    private List<Posts> postsList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Wallets> walletsList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Purchases> purchasesList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<PostList> postlistList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<WishList> wishlistList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comments> commentsList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Collections> collectionList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Notifications> notificationsList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<My_Collections> my_collectionsList = new ArrayList<>();
}
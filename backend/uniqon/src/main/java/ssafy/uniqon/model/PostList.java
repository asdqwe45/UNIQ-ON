package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import java.security.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PostList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postlist_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Members member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Posts post;
}
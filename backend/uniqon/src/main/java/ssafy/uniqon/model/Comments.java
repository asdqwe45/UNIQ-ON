package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import javax.xml.stream.events.Comment;
import java.security.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer id;

    @Column(name = "time")
    private Timestamp time;

    @Column(name = "content", length = 512)
    private String content;

    @Column(name = "image", length = 512)
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Members member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id")
    private Collections collection;
}

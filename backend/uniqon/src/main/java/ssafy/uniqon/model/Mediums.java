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
public class Mediums {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medium_id")
    private Integer id;

    @Column(name = "species", length = 100)
    private String species;

    @Column(name = "image", length = 512)
    private String image;

    @Column(name = "feature", length = 200)
    private String feature;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "big_id")
    private Bigs big;

}

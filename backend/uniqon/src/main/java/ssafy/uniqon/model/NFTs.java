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
public class NFTs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nft_id")
    private Integer id;

    @Column(name = "nft_address", length = 200)
    private String nft_address;

    @Column(name = "image", length = 512)
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member")
    private Members member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medium_id")
    private Mediums medium;
}

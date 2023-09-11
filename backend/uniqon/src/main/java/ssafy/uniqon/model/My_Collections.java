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
public class My_Collections {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "my_collection_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member")
    private Members member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft_id")
    private NFTs nft;

}

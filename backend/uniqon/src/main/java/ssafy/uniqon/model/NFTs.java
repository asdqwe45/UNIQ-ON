package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
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

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "age")
    private Integer age;

    @Column(name = "feature", length = 200)
    private String feature;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Members member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "middle_classification_id")
    private MiddleClassifications middle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_collection_id")
    private MyCollections myCollection;
}

package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MiddleClassifications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "middle_classification_id")
    private Integer id;

    @Column(name = "species", length = 100)
    private String species;

    @Column(name = "image", length = 512)
    private String image;

    @Column(name = "feature", length = 200)
    private String feature;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_classification_id")
    private MainClassifications main;

}

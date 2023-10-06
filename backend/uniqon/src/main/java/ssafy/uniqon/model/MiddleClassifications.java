package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MiddleClassifications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "middle_classification_id")
    private int id;

    @Column(name = "species", length = 100)
    private String species;

    @Column(name = "image", length = 512)
    private String image;

    @Column(name = "feature", length = 200)
    private String feature;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_classification_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MainClassifications main;

}

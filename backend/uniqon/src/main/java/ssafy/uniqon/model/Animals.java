package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import java.security.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Animals{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_id")
    private Integer id;

   @Column(name = "species", length = 50)
   private String species;

   @Column(name = "creature_name", length = 100)
   private String creature_name;

   @Column(name = "feature", length = 200)
   private String feature;

   @Column(name = "image", length = 512)
   private String image;

   @Column(name = "hatch_date")
   private Timestamp hatch_date;

   @Column(name = "weight")
   private Integer weight;

   @Column(name = "gender", length = 50)
   private String gender;

   @Column(name = "length")
   private Integer length;

    @OneToMany(mappedBy = "animal")
   private List<Posts> postsList = new ArrayList<>();

    @OneToMany(mappedBy = "animal")
    private List<Collections> collectionsList = new ArrayList<>();
}
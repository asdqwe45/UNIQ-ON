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
public class Bigs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "big_id")
    private Integer id;

    @Column(name = "type", length = 100)
    private String type;

    @Column(name = "image", length = 512)
    private String image;

}

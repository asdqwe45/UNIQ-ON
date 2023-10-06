package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import javax.management.Notification;
import java.security.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MainClassifications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "main_classification_id")
    private Integer id;

    @Column(name = "type", length = 100)
    private String type;

    @Column(name = "image", length = 512)
    private String image;

}

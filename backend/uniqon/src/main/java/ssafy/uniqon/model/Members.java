package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Members{
    @Id
    @Column(name = "member_id", length = 255)
    private String id;

    @Column(name = "address", length = 255)
    private String address;
}
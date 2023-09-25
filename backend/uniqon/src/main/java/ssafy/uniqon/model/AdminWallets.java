package ssafy.uniqon.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AdminWallets {
    @Id
    @Column(length = 100)
    private String adminAddress;

    @Column(length = 255)
    private String privateKey;
}

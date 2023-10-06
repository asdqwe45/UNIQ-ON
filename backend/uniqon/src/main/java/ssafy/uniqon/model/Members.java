package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(indexes = {
        @Index(name = "idx_nickname", columnList = "nickname")
})
public class Members{
    @Id
    @Column(name = "wallet_Address")
    private String walletAddress;

    @Column(length = 255)
    private String name;

    @Column(length = 255)
    private String nickname;

    @Column(length = 255)
    private String birth;

    @Column(length = 30)
    private String gender;

    @Column(length = 3000)
    private String vpToken;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] profileImage;

    @CreationTimestamp
    private Timestamp registerDateTime;

    @UpdateTimestamp
    private Timestamp modifyDateTime;

    @OneToMany(mappedBy = "seller")
    private List<TransactionHistories> soldList=new ArrayList<>();

    @OneToMany(mappedBy = "buyer")
    private List<TransactionHistories> boughtList=new ArrayList<>();

    private MemberRole role;

    private String password;

    @OneToMany(mappedBy = "creater")
    private List<NFTs> createdNFT=new ArrayList<>();
}
package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Posts{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer id;

    @Column(name = "price")
    private Integer price;

    @Column(name = "content", length = 512)
    private String content;

    @Column(name = "create_datetime",insertable = false,updatable = false,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Timestamp create_datetime;

    @Column(name = "update_datetime")
    @UpdateTimestamp
    private Timestamp update_datetime;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "sale_completed_datetime")
    @UpdateTimestamp
    private Timestamp sale_completed_datetime;

    @Column(name = "state", columnDefinition = "int default 0")
    @ColumnDefault("0")
    private Integer state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer")
    private Members buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller")
    private Members seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft_id")
    private NFTs nft;
}
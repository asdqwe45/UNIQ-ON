package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistories {
    @Id
    @GeneratedValue
    @Column(name="tx_history_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name="seller",insertable=false, updatable=false)
    private Members seller;

    @ManyToOne
    @JoinColumn(name="buyer",insertable=false, updatable=false)
    private Members buyer;

    private String txHash;

    @CreationTimestamp
    private Timestamp transactedAt;
}

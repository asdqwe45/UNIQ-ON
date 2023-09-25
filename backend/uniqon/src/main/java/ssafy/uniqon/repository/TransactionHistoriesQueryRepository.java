package ssafy.uniqon.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.controller.MyPageController;
import static ssafy.uniqon.model.QTransactionHistories.transactionHistories;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TransactionHistoriesQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<MyPageController.TransactionHistoryWebResponse> getBoughtTxHistories(String buyer, Pageable pageable){
        List<MyPageController.TransactionHistoryWebResponse> list=jpaQueryFactory
                .select(Projections.constructor(MyPageController.TransactionHistoryWebResponse.class,
                        transactionHistories.seller.walletAddress,
                        transactionHistories.buyer.walletAddress,
                        transactionHistories.txHash,
                        transactionHistories.transactedAt))
                .from(transactionHistories)
                .where(transactionHistories.buyer.walletAddress.eq(buyer))
                .orderBy(transactionHistories.transactedAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        int count = jpaQueryFactory
                .select(transactionHistories.count())
                .from(transactionHistories)
                .where(transactionHistories.buyer.walletAddress.eq(buyer))
                .fetch()
                .size();
        return new PageImpl<>(list,pageable,count);
    }

    public Page<MyPageController.TransactionHistoryWebResponse> getSoldTxHistories(String seller, Pageable pageable){
        List<MyPageController.TransactionHistoryWebResponse> list=jpaQueryFactory
                .select(Projections.constructor(MyPageController.TransactionHistoryWebResponse.class,
                        transactionHistories.seller.walletAddress,
                        transactionHistories.buyer.walletAddress,
                        transactionHistories.txHash,
                        transactionHistories.transactedAt))
                .from(transactionHistories)
                .where(transactionHistories.buyer.walletAddress.eq(seller))
                .orderBy(transactionHistories.transactedAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        int count = jpaQueryFactory
                .select(transactionHistories.count())
                .from(transactionHistories)
                .where(transactionHistories.buyer.walletAddress.eq(seller))
                .fetch()
                .size();
        return new PageImpl<>(list,pageable,count);
    }
}

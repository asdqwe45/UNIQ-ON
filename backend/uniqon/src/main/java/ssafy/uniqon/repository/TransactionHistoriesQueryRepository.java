package ssafy.uniqon.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.controller.MyPageController;
import ssafy.uniqon.model.QMembers;

import static ssafy.uniqon.model.QMembers.members;
import static ssafy.uniqon.model.QNFTs.nFTs;
import static ssafy.uniqon.model.QTransactionHistories.transactionHistories;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class TransactionHistoriesQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<MyPageController.TransactionHistoryWebResponse> getBoughtTxHistories(String buyer, Pageable pageable){
        log.debug("# DB에서 구매 이력 리스트 조회 ..");
        QMembers members1=new QMembers("m1");
        QMembers members2=new QMembers("m2");
        List<MyPageController.TransactionHistoryWebResponse> list=jpaQueryFactory
                .select(Projections.constructor(MyPageController.TransactionHistoryWebResponse.class,
                        members1.nickname,
                        members2.nickname,
                        transactionHistories.txHash,
                        transactionHistories.transactedAt,
                        nFTs.id,
                        nFTs.name,
                        nFTs.image))
                .from(transactionHistories)
                .leftJoin(members1).on(members1.walletAddress.eq(transactionHistories.seller.walletAddress))
                .leftJoin(members2).on(members2.walletAddress.eq(buyer))
                .leftJoin(nFTs).on(nFTs.id.eq(transactionHistories.nftTxHis.id))
                .where(transactionHistories.buyer.walletAddress.eq(buyer))
                .orderBy(transactionHistories.transactedAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        log.debug("리스트 조회 : {}", list);

        int count = jpaQueryFactory
                .select(transactionHistories.count())
                .from(transactionHistories)
                .where(transactionHistories.buyer.walletAddress.eq(buyer))
                .fetch()
                .size();
        return new PageImpl<>(list,pageable,count);
    }

    public Page<MyPageController.TransactionHistoryWebResponse> getSoldTxHistories(String seller, Pageable pageable){
        log.debug("# DB에서 판매 이력 리스트 조회 ..");
        QMembers members1=new QMembers("m1");
        QMembers members2=new QMembers("m2");
        List<MyPageController.TransactionHistoryWebResponse> list=jpaQueryFactory
                .select(Projections.constructor(MyPageController.TransactionHistoryWebResponse.class,
                        members2.nickname,
                        members1.nickname,
                        transactionHistories.txHash,
                        transactionHistories.transactedAt,
                        nFTs.id,
                        nFTs.name,
                        nFTs.image))
                .from(transactionHistories)
                .leftJoin(members1).on(members1.walletAddress.eq(transactionHistories.buyer.walletAddress))
                .leftJoin(members2).on(members2.walletAddress.eq(seller))
                .leftJoin(nFTs).on(nFTs.id.eq(transactionHistories.nftTxHis.id))
                .where(transactionHistories.seller.walletAddress.eq(seller))
                .orderBy(transactionHistories.transactedAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        log.debug("리스트 조회 : {}", list);

        int count = jpaQueryFactory
                .select(transactionHistories.count())
                .from(transactionHistories)
                .where(transactionHistories.seller.walletAddress.eq(seller))
                .fetch()
                .size();
        return new PageImpl<>(list,pageable,count);
    }
}

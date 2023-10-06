package ssafy.uniqon.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.controller.NFTsController;
import ssafy.uniqon.model.MyCollections;
import ssafy.uniqon.model.NFTs;

import static ssafy.uniqon.model.QMiddleClassifications.middleClassifications;
import static ssafy.uniqon.model.QMyCollections.myCollections;
import static ssafy.uniqon.model.QNFTs.nFTs;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MyCollectionsQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public Page<NFTsController.NFTWebResponse> getMyCollectionList(String userId, Pageable pageable){
        List<NFTsController.NFTWebResponse> nftList=jpaQueryFactory
                .select(Projections.constructor(NFTsController.NFTWebResponse.class,
                        nFTs.id,
                        myCollections.member.walletAddress,
                        nFTs.image,
                        nFTs.name,
                        nFTs.age,
                        nFTs.feature,
                        nFTs.nftURL,
                        nFTs.contractAddress,
                        nFTs.tokenId,
                        nFTs.liked_cnt,
                        nFTs.creater.walletAddress,
                        nFTs.owner.nickname
                ))
                .from(myCollections)
                .innerJoin(nFTs)
                .on(myCollections.nfts.id.eq(nFTs.id))
                .where(myCollections.member.walletAddress.eq(userId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();


        int count = jpaQueryFactory
                .select(myCollections.count())
                .from(myCollections)
                .where(myCollections.member.walletAddress.eq(userId))
                .fetch().size();

        return new PageImpl<>(nftList, pageable, count);
    }
}

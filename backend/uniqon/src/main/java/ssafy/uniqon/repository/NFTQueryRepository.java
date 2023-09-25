package ssafy.uniqon.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.dto.NftListResponseDto;
import ssafy.uniqon.dto.NftListSearchResponseDto;

import java.util.List;

import static java.lang.Integer.parseInt;
import static ssafy.uniqon.model.QNFTs.nFTs;

@Repository
@RequiredArgsConstructor
@Slf4j
public class NFTQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<NftListResponseDto> getNftList(int middleClassificationId, Pageable pageable){
        log.debug("# DB에서 nft 리스트 조회 ..");

        List<NftListResponseDto> list = jpaQueryFactory
                .select(Projections.constructor(NftListResponseDto.class,
                        nFTs.id,
                        nFTs.nftTxHash,
                        nFTs.image,
                        nFTs.name,
                        nFTs.age,
                        nFTs.feature,
                        nFTs.owner.nickname,
                        nFTs.owner.profileImage,
                        nFTs.middle.id,
                        nFTs.middle.species,
                        nFTs.nftURL,
                        nFTs.contractAddress,
                        nFTs.tokenId,
                        nFTs.liked_cnt
                        ))
                .from(nFTs)
                .where(
                        nFTs.middle.id.eq(middleClassificationId)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(nFTs.id.desc())
                .fetch();

        log.debug("리스트 조회 : {}", list);

        int count = jpaQueryFactory
                .select(nFTs.count())
                .from(nFTs)
                .where(nFTs.middle.id.eq(middleClassificationId))
                .fetch().size();


        return new PageImpl<>(list, pageable, count);
    }

    public Page<NftListSearchResponseDto> searchNFT(String query, Pageable pageable) {

        List<NftListSearchResponseDto> list = jpaQueryFactory
                .select(Projections.constructor(NftListSearchResponseDto.class,
                        nFTs.id,
                        nFTs.nftTxHash,
                        nFTs.image,
                        nFTs.name,
                        nFTs.age,
                        nFTs.feature,
                        nFTs.owner.nickname,
                        nFTs.owner.profileImage,
                        nFTs.middle.main.type,
                        nFTs.middle.id,
                        nFTs.middle.species,
                        nFTs.nftURL,
                        nFTs.contractAddress,
                        nFTs.tokenId,
                        nFTs.liked_cnt
                ))
                .from(nFTs)
                .where(
                        nFTs.name.contains(query).or(
                                nFTs.feature.contains(query).or(
                                        nFTs.middle.species.contains(query)
                                )
                        )
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(nFTs.id.desc())
                .fetch();

        int count = jpaQueryFactory
                .select(nFTs.count())
                .from(nFTs)
                .where(
                        nFTs.name.contains(query).or(
                                nFTs.feature.contains(query).or(
                                        nFTs.middle.species.contains(query)
                                )
                        )
                )
                .fetch().size();


        return new PageImpl<>(list, pageable, count);
    }

    public Page<NftListResponseDto> getMyNftList(String userId, Pageable pageable){
        log.debug("# DB에서 nft 리스트 조회 ..");

        List<NftListResponseDto> list = jpaQueryFactory
                .select(Projections.constructor(NftListResponseDto.class,
                        nFTs.id,
                        nFTs.nftTxHash,
                        nFTs.image,
                        nFTs.name,
                        nFTs.age,
                        nFTs.feature,
                        nFTs.owner.nickname,
                        nFTs.owner.profileImage,
                        nFTs.middle.id,
                        nFTs.middle.species,
                        nFTs.nftURL,
                        nFTs.contractAddress,
                        nFTs.tokenId,
                        nFTs.liked_cnt
                ))
                .from(nFTs)
                .where(
                        nFTs.owner.walletAddress.eq(userId)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(nFTs.id.desc())
                .fetch();

        log.debug("리스트 조회 : {}", list);

        int count = jpaQueryFactory
                .select(nFTs.count())
                .from(nFTs)
                .where(nFTs.owner.walletAddress.eq(userId))
                .fetch().size();


        return new PageImpl<>(list, pageable, count);
    }

}

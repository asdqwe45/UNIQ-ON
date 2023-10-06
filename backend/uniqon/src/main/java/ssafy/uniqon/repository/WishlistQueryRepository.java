package ssafy.uniqon.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static ssafy.uniqon.model.QMembers.members;
import static ssafy.uniqon.model.QMiddleClassifications.middleClassifications;
import static ssafy.uniqon.model.QNFTs.nFTs;
import static ssafy.uniqon.model.QPosts.posts;
import static ssafy.uniqon.model.QWishList.wishList;

@Repository
@RequiredArgsConstructor
@Slf4j
public class WishlistQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public record getWishlistDBResponse(
            int wishlistId,
            int postId,
            String nftImage,
            String sellerWalletAddress,
            byte[] sellerProfileImage,
            String sellerNickname,
            String price,
            Integer nftMiddleId,
            String nftMiddleSpecies,
            String postTitle
    ){
        public getWishlistDBResponse(int wishlistId, int postId, String nftImage, String sellerWalletAddress, byte[] sellerProfileImage, String sellerNickname, String price, Integer nftMiddleId, String nftMiddleSpecies, String postTitle) {
            this.wishlistId = wishlistId;
            this.postId = postId;
            this.nftImage = nftImage;
            this.sellerWalletAddress = sellerWalletAddress;
            this.sellerProfileImage = sellerProfileImage;
            this.sellerNickname = sellerNickname;
            this.price = price;
            this.nftMiddleId = nftMiddleId;
            this.nftMiddleSpecies = nftMiddleSpecies;
            this.postTitle = postTitle;
        }
    }

    public Page<getWishlistDBResponse> getWishList (Pageable pageable, String walletAddress) {

        List<getWishlistDBResponse> list = jpaQueryFactory
                .select(Projections.constructor(getWishlistDBResponse.class,
                        wishList.id,
                        wishList.post.id,
                        wishList.post.nft.image,
                        wishList.post.seller.walletAddress,
                        wishList.post.seller.profileImage,
                        wishList.post.seller.nickname,
                        wishList.post.price,
                        middleClassifications.id,
                        middleClassifications.species,
                        wishList.post.title
                ))
                .from(wishList)
                .leftJoin(posts).on(posts.id.eq(wishList.post.id))
                .leftJoin(nFTs).on(nFTs.id.eq(posts.nft.id))
                .leftJoin(middleClassifications).on(middleClassifications.id.eq(posts.nft.middle.id))
//                .leftJoin(members).on(members.walletAddress.eq(wishList.member.walletAddress).and(wishList.member.walletAddress.eq(walletAddress)))
                .where(wishList.member.walletAddress.eq(walletAddress))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(wishList.id.desc())
                .fetch();

        log.debug("조회 테스트 : {}", list);



        int count = jpaQueryFactory
                .select(wishList.count())
                .from(wishList)
                .where(wishList.member.walletAddress.eq(walletAddress))
                .fetch().size();

        return new PageImpl<>(list, pageable, count);
    }


}

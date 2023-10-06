package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.uniqon.controller.WishlistController;
import ssafy.uniqon.global.exception.NotFoundException;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.model.WishList;
import ssafy.uniqon.repository.MemberRepository;
import ssafy.uniqon.repository.PostsRepository;
import ssafy.uniqon.repository.WishlistQueryRepository;
import ssafy.uniqon.repository.WishlistRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService{

    private final PostsRepository postsRepository;
    private final WishlistRepository wishlistRepository;
    private final MemberRepository memberRepository;
    private final WishlistQueryRepository wishlistQueryRepository;

    @Override
    public int addWishlist(WishlistController.addWishlistWebRequest req) {
        Posts posts = postsRepository.findById(req.postId());
        Members members = memberRepository.findById(req.walletAddress()).orElseThrow(() -> new NotFoundException(Members.class, req.walletAddress()));
        WishList wish = wishlistRepository.findByPost_IdAndMember_WalletAddress(req.postId(), req.walletAddress());
        if (posts != null && wish == null) {
            log.debug("# 위시리스트 추가중 ...");
            wishlistRepository.save(WishList.builder()
                    .member(members)
                    .post(posts)
                    .build());
            return 1;
        } else {
            log.debug("# 해당 포스트는 존재하지 않습니다 : {}", req.postId());
            return 0;
        }
    }

    @Override
    public int deleteWishlist(WishlistController.deleteWishlistWebRequest req) {
        WishList wishList = wishlistRepository.findByPost_IdAndMember_WalletAddress(req.postId(), req.walletAddress());
        if (wishList != null) {
            log.debug("# 위시리스트 삭제중..");
            wishlistRepository.delete(wishList);
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public Page<WishlistQueryRepository.getWishlistDBResponse> getWishlist(Pageable pageable, String walletAddress) {
        Page<WishlistQueryRepository.getWishlistDBResponse> list =wishlistQueryRepository.getWishList(pageable, walletAddress);
        if (list.isEmpty()) {
            return null;
        } else {
            return list;
        }
    }
}

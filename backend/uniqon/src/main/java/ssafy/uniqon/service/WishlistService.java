package ssafy.uniqon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ssafy.uniqon.controller.WishlistController;
import ssafy.uniqon.repository.WishlistQueryRepository;

public interface WishlistService {

    int addWishlist (WishlistController.addWishlistWebRequest req);
    int deleteWishlist (WishlistController.deleteWishlistWebRequest req);

    Page<WishlistQueryRepository.getWishlistDBResponse> getWishlist(Pageable pageable, String walletAddress);

}

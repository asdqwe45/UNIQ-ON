package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.controller.WishlistController;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.WishList;

public interface WishlistRepository extends JpaRepository<WishList, String> {

    WishList findByIdAndMember_WalletAddress (Integer id, String memberWalletAddress);

    WishList findByPost_IdAndMember_WalletAddress (Integer postId, String memberWalletAddress);

    Boolean existsByPost_IdAndMember_WalletAddress (Integer postId, String walletAddress);
}

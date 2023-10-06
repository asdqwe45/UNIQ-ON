package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.NFTs;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Members, String> {
//    public NFTs findByNickname(String nickname);

    Members findByNickname(String nickname);

    Members findByWalletAddress(String walletAddress);
}

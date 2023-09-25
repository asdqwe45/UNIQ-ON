package ssafy.uniqon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.NFTs;

public interface NFTRepository extends JpaRepository<NFTs, Integer> {
}

package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.model.MyCollections;

@Repository
public interface MyCollectionsRepository extends JpaRepository<MyCollections,Integer> {
    MyCollections findByNfts_Id (int nftId);
}

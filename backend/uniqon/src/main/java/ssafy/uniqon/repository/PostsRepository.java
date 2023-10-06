package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.model.Posts;

public interface PostsRepository extends JpaRepository<Posts, Integer> {

    Posts findById (int postId);
    Boolean existsByNft_Id (Integer nftId);
}

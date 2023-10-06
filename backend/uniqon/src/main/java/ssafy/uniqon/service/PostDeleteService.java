package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.uniqon.repository.PostRepository;

@Service
@RequiredArgsConstructor
public class PostDeleteService {
    private final PostRepository postRepository;

    public void deletePost(Integer postId, String walletAddress){
        postRepository.deletePost(postId, walletAddress);
    }

}

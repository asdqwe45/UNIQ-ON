package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.PostsController;
import ssafy.uniqon.repository.PostRepository;

@Service
@RequiredArgsConstructor
public class PostUpdateService {
    private final PostRepository postRepository;

    public void updatePost(Integer postId, PostsController.UpdatePostWebRequest req ){
        postRepository.updatePost(postId, req);
    }
}

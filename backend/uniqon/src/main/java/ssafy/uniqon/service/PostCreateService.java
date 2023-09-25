package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.PostsController;
import ssafy.uniqon.repository.PostRepository;

@Service
@RequiredArgsConstructor
public class PostCreateService {
    private final PostRepository postRepository;

    public void createPost(PostsController.RegisterPostWebRequest req ) {
        postRepository.createPost(req);
    }
}

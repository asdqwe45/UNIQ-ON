package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.PostsController;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.repository.MemberRepository;
import ssafy.uniqon.repository.PostRepository;

@Service
@RequiredArgsConstructor
public class PostUpdateService {
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public void updatePost(Integer postId, PostsController.UpdatePostWebRequest req, UserDetails user){
        Members member=memberRepository.findById(user.getUsername()).orElseThrow();
        postRepository.updatePost(postId, req,member);
    }
}

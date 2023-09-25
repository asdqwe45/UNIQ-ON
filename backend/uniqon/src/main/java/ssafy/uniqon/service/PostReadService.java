package ssafy.uniqon.service;


import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.PostsController;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.model.WishList;
import ssafy.uniqon.repository.PostRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostReadService {
    private final PostRepository postRepository;

    public List<PostsController.postListsWebResponse> getPostAll(String walletAddress, Pageable pageable){
        List<PostsController.postListsWebResponse> list = new ArrayList<>();
        for(Posts post: postRepository.getPostAll(pageable)){
            list.add(new PostsController.postListsWebResponse(
                    post.getId(),
                    post.getPrice(),
                    post.getTitle(),
                    post.getNft().getMiddle().getSpecies(),
                    post.getSeller().getNickname(),
                    post.getNft().getImage(),
                    null
            ));
        }
        if(list.isEmpty()){
            throw new IllegalArgumentException("Post Not Found ");
        }
        return list;
    }

    public PostsController.postDetailWebResponse getPostDetail(int postId, String walletAddress){
        Posts post = postRepository.getPostById(postId);
        if(post==null) {
            throw new IllegalArgumentException("No Post found with postId " + postId);
        }

        return new PostsController.postDetailWebResponse(
                post.getId(),
                post.getSeller().getProfileImage(),
                post.getSeller().getNickname(),
                post.getNft().getMiddle().getSpecies(),
                post.getNft().getName(),
                post.getNft().getFeature(),
                post.getNft().getAge(),
                post.getNft().getImage(),
                post.getPrice(),
                post.getContent(),
                post.getCreate_datetime(),
                post.getTitle(),
                true
        );
    }
    public List<PostsController.postListsWebResponse> getSearchPostList(String word, String walletAddress, Pageable pageable){
        List<PostsController.postListsWebResponse> list = new ArrayList<>();
        for(Posts post: postRepository.getSearchPost(word, pageable)){
            list.add(new PostsController.postListsWebResponse(
                    post.getId(),
                    post.getPrice(),
                    post.getTitle(),
                    post.getNft().getMiddle().getSpecies(),
                    post.getSeller().getNickname(),
                    post.getNft().getImage(),
                    null
            ));
        }
        if(list.isEmpty()){
            throw new IllegalArgumentException("No Post found with word " + word);
        }
        return list;
    }

}

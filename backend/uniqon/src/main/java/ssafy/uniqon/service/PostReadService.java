package ssafy.uniqon.service;


import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.PostsController;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.model.WishList;
import ssafy.uniqon.repository.PostRepository;
import ssafy.uniqon.repository.WishlistRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostReadService {
    private final PostRepository postRepository;
    private final WishlistRepository wishlistRepository;
    public List<PostsController.postListsWebResponse> getPostAll(Pageable pageable, String walletAddress){
        List<PostsController.postListsWebResponse> list = new ArrayList<>();
        for(Posts post: postRepository.getPostAll(pageable)){
            Boolean wishcheck;
            if(walletAddress.equals("")){
                wishcheck=false;
            }
            else wishcheck = wishlistRepository.existsByPost_IdAndMember_WalletAddress(post.getId(),walletAddress);
            list.add(new PostsController.postListsWebResponse(
                    post.getId(),
                    post.getPrice(),
                    post.getTitle(),
                    post.getNft().getMiddle().getSpecies(),
                    post.getSeller().getNickname(),
                    post.getNft().getImage(),
                    wishcheck,
                    post.getSeller().getWalletAddress(),
                    post.getNft().getTokenId()
            ));
        }
//        if(list.isEmpty()){
//            throw new IllegalArgumentException("Post Not Found ");
//        }
        return list;
    }

    public PostsController.postDetailWebResponse getPostDetail(int postId, String walletAddress){
        Posts post = postRepository.getPostById(postId);
        if(post==null) {
            throw new IllegalArgumentException("No Post found with postId " + postId);
        }
        Boolean wishcheck = wishlistRepository.existsByPost_IdAndMember_WalletAddress(postId,walletAddress);

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
                wishcheck,
                post.getNft().getId(),
                post.getSeller().getWalletAddress(),
                post.getNft().getTokenId()
        );
    }

    public List<PostsController.postListsWebResponse> getSearchPostList(String word, Pageable pageable, String walletAddress) {
        List<PostsController.postListsWebResponse> list = new ArrayList<>();
        for (Posts post : postRepository.getSearchPost(word, pageable)) {

            Boolean wishcheck = wishlistRepository.existsByPost_IdAndMember_WalletAddress(post.getId(),walletAddress);
            list.add(new PostsController.postListsWebResponse(
                    post.getId(),
                    post.getPrice(),
                    post.getTitle(),
                    post.getNft().getMiddle().getSpecies(),
                    post.getSeller().getNickname(),
                    post.getNft().getImage(),
                    wishcheck,
                    post.getSeller().getWalletAddress(),
                    post.getNft().getTokenId()
            ));
        }
        if (list.isEmpty()) {
            throw new IllegalArgumentException("No Post found with word " + word);
        }
        return list;
    }

}

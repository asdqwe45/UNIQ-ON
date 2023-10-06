package ssafy.uniqon.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ssafy.uniqon.controller.PostsController;
import ssafy.uniqon.model.Members;
import ssafy.uniqon.model.NFTs;
import ssafy.uniqon.model.Posts;
import ssafy.uniqon.model.QPosts;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostRepository {

    @PersistenceContext
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    private final QPosts posts = QPosts.posts;

    @Transactional
    public void createPost(PostsController.RegisterPostWebRequest req,Members member,NFTs nft){

        Posts post = new Posts(
                null,
                req.price(),
                req.content(),
                null,
                null,
                req.title(),
                null,
                0,
                null,
                member,
                nft
        );
        em.persist(post);
    }

    public List<Posts> getPostAll(Pageable pageable) { return jpaQueryFactory.selectFrom(posts)
            .where(posts.state.eq(0))
            .orderBy(posts.id.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();}

    public Posts getPostById(int postId) {
        return jpaQueryFactory.selectFrom(posts).where(posts.state.eq(0).and(posts.id.eq(postId))).fetchOne();
    }
    public List<Posts> getSearchPost(String word, Pageable pageable) { return jpaQueryFactory.selectFrom(posts).where(posts.state.eq(0).and(posts.title.contains(word))).orderBy(posts.id.desc()).offset(pageable.getOffset())
            .limit(pageable.getPageSize()).fetch();}

    @Transactional
    public void updatePost(Integer postId,PostsController.UpdatePostWebRequest req,Members member){
        Posts post = em.find(Posts.class, postId);

        if (post == null) {
            throw new IllegalArgumentException("No Post found with postId " + postId);
        }
        if(post.getSeller().getWalletAddress().equals(member.getWalletAddress())){
            post.setPrice(req.price());
            post.setTitle(req.title());
            post.setContent(req.content());
        }
        else{
            throw new IllegalArgumentException("No Access to Post with postId " + postId);
        }

    }
    @Transactional
    public void deletePost(Integer postId, String walletAddress){
        Posts post = em.find(Posts.class,postId);
        if(post==null){
            throw new IllegalArgumentException("No Post found with postId " + postId);
        }
        if(post.getSeller().getWalletAddress().equals(walletAddress)){
            em.remove(post);
        }
        else{
            throw new IllegalArgumentException("No Access to Post with postId " + postId);
        }
    }

}

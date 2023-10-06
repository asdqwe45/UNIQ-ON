package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.service.PostCreateService;
import ssafy.uniqon.service.PostDeleteService;
import ssafy.uniqon.service.PostReadService;
import ssafy.uniqon.service.PostUpdateService;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import static ssafy.uniqon.global.response.Response.ERROR;
import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sales")
@Tag(name = "판매 API")
@CrossOrigin("*")
public class PostsController {

    public record RegisterPostWebRequest(
            String price,
            String content,
            String title,
            Integer tokenId
    ) {
    }

    public record UpdatePostWebRequest(
            String price,
            String title,
            String content
    ){}

    public record postListsWebResponse(
            Integer postId,
            String price,
            String title,
            String species,
            String nickname,
            String image,
            Boolean wishCheck,
            String walletAddress,
            Integer tokenId
    )
    {}

    public record postDetailWebResponse(
            Integer postId,
            byte[] profileImage,
            String nickname,
            String species,
            String name,
            String feature,
            Integer age,
            String image,
            String price,
            String content,
            Timestamp createDatetime,
            String title,
            Boolean wishCheck,
            Integer nftId,
            String walletAddress,
            Integer tokenId
    ){}
private final PostReadService postReadService;
private final PostCreateService postCreateService;
private final PostUpdateService postUpdateService;
private final PostDeleteService postDeleteService;
    @Operation(summary="판매글 등록", description = "판매글을 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PostMapping("/register")
    public Response<?> registerPost(@RequestPart(value = "data") RegisterPostWebRequest req,
                                    @AuthenticationPrincipal UserDetails user) {
        log.debug("# 판매글 등록시 데이터 : {}", req);
        int result = postCreateService.createPost(req,user);
        if (result == 1) {
            log.debug("# 판매글 추가 성공");
            return OK(null);
        } else {
            log.debug("# 판매글 추가 실패");
            return ERROR("판매글 추가 실패", HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary="판매글 수정", description = "판매글을 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PutMapping("/update/{postId}")
    public Response<?> updatePost(@PathVariable Integer postId,
                                  @RequestPart(value="data") UpdatePostWebRequest req,
                                  @AuthenticationPrincipal UserDetails user){
        log.debug("# 판매글 수정 데이터 : {}",req);
        postUpdateService.updatePost(postId,req,user);
        return OK("success");
    }

    @Operation(summary="판매글 삭제", description = "판매글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @DeleteMapping("/delete/{postId}")
    public Response<?> deletePost(@PathVariable Integer postId,
                                  @AuthenticationPrincipal UserDetails user){
        postDeleteService.deletePost(postId,user.getUsername());
        return OK("success");
    }
    @Operation(summary="판매글 검색", description = "판매글을 검색합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/search")
    public Response<?> searchPost(@RequestParam String word,@PageableDefault(size=9) Pageable pageable,@AuthenticationPrincipal UserDetails user) {
        log.debug("# 검색어 word : {}", word);
//        log.debug("# 사용자 walletAddress : {}", walletAddress);
        List<postListsWebResponse> postlist = postReadService.getSearchPostList(word, pageable,user.getUsername());
        return OK(postlist);
    }

    @Operation(summary="판매글 상세 조회", description = "판매글 상세 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/detail/{postId}")
    public Response<?> getDetailPost(@PathVariable Integer postId,@AuthenticationPrincipal UserDetails user){
        log.debug("# 판매글 식별자 id : {}", postId);
//        log.debug("# 사용자 walletAddress : {}", walletAddress);

        postDetailWebResponse post = postReadService.getPostDetail(postId, user.getUsername());

        JSONObject obj = new JSONObject();
        JSONObject data1=new JSONObject();
        JSONObject data2=new JSONObject();
        JSONObject data3=new JSONObject();

        data1.put("profileImage",post.profileImage);
        data1.put("nickname",post.nickname);
        data1.put("walletAddress",post.walletAddress);
        obj.put("SellerInfo",data1);

        data2.put("nftId",post.nftId);
        data2.put("species",post.species);
        data2.put("name",post.name);
        data2.put("feature",post.feature);
        data2.put("age",post.age);
        data2.put("image",post.image);
        data2.put("tokenId",post.tokenId);
        obj.put("nftInfo",data2);

        data3.put("postId",post.postId);
        data3.put("price",post.price);
        data3.put("content",post.content);
        data3.put("createDatetime",post.createDatetime);
        data3.put("title",post.title);
        data3.put("wishCheck",post.wishCheck);
        obj.put("PostInfo",data3);

        return OK(obj.toMap());
    }

    @Operation(summary="판매글 조회", description = "판매글 리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/post")
    public Response<?> getAllPostList(@PageableDefault(size=9) Pageable pageable,@AuthenticationPrincipal UserDetails user){
        log.debug("# 판매글 리스트 표시");
        List<postListsWebResponse> postlist;
        if(user!=null) {
             postlist= postReadService.getPostAll(pageable, user.getUsername());

        }
        else{
            postlist = postReadService.getPostAll(pageable, "");
        }
        return OK(postlist);
    }
}

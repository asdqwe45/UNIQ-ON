package ssafy.uniqon.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.exception.NotFoundException;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.repository.WishlistQueryRepository;
import ssafy.uniqon.service.WishlistService;

import java.security.Principal;

import static ssafy.uniqon.global.response.Response.ERROR;
import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
@Tag(name = "위시리스트 API")
@CrossOrigin("*")
public class WishlistController {

    public record addWishlistWebRequest(
            String walletAddress,
            int postId
    ){}

    public record deleteWishlistWebRequest(
            String walletAddress,
            int postId
    ){}

    private final WishlistService wishlistService;

    @Operation(summary = "위시리스트에 추가", description = "위시리스트에 판매글을 추가합니다.")
    @Parameters({
            @Parameter(name = "postId", description = "판매글 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PostMapping("/add/{postId}")
    public Response<?> addWishlist(@PathVariable Integer postId, @AuthenticationPrincipal UserDetails userDetails){
        log.info("# 위시리스트에 추가 요청 : {}", postId);
//        log.debug("# 요청 지갑 : {}", userDetails.getUsername());
//        int result = wishlistService.addWishlist(new addWishlistWebRequest(userDetails.getUsername(), postId));
        int result = wishlistService.addWishlist(new addWishlistWebRequest(userDetails.getUsername(), postId));
        if (result == 1) {
            log.debug("# 위시리스트 추가 성공");
            return OK(null);
        } else {
            log.debug("# 위시리스트 추가 실패");
            return ERROR("위시리스트 추가 실패", HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "위시리스트 조회", description = "지갑 주소를 통해 위시리스트 조회합니다.")
    @Parameters({
            @Parameter(name = "walletAddress", description = "지갑 주소", example = "0x00000000000000")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping
    public Response<?> getWishlist(@PageableDefault Pageable pageable, @AuthenticationPrincipal UserDetails userDetails ){
        log.debug("# 위시리스트 조회 요청 : {}", userDetails.getUsername());
        Page<WishlistQueryRepository.getWishlistDBResponse> list =  wishlistService.getWishlist(pageable, userDetails.getUsername());
        if (list == null) {
            return ERROR("위시리스트 존재 안 함", HttpStatus.NOT_FOUND);
        } else {
            log.debug("# 위시리스트 : {}", list);
            return OK(list);
        }
    }

    @Operation(summary = "위시리스트에서 삭제", description = "위시리스트에서 판매글을 삭제합니다.")
    @Parameters({
            @Parameter(name = "wishlistId", description = "위시리스트 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @DeleteMapping("/{postId}")
    public Response<?> deleteWishlist(@PathVariable Integer postId, @AuthenticationPrincipal UserDetails userDetails){
        log.info("# 위시리스트 삭제 요청 : {}", userDetails.getUsername());
        int result = wishlistService.deleteWishlist(new deleteWishlistWebRequest(userDetails.getUsername(), postId));
        if (result == 1) {
            log.debug("# 위시리스트 삭제 성공");
            return OK(null);

        } else {
            log.debug("# 위시리스트 삭제 실패");
            return ERROR("위시리스트 삭제 실패", HttpStatus.BAD_REQUEST);
        }

    }
}

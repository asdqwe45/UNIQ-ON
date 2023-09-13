package ssafy.uniqon.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
@Tag(name = "위시리스트 Api")
public class WishlistController {

    @Operation(summary = "위시리스트에 추가", description = "위시리스트에 판매글을 추가합니다.")
    @Parameters({
            @Parameter(name = "postId", description = "판매글 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PostMapping("/{postId}")
    public Response<?> addWishlist(@PathVariable Integer postId){
        log.info("# 위시리스트에 추가할 포스트 식별자 : {}", postId);
        return OK(null);
    }

    @Operation(summary = "위시리스트 조회", description = "지갑 주소를 통해 위시리스트 조회합니다.")
    @Parameters({
            @Parameter(name = "walletAddress", description = "지갑 주소", example = "0xF2a7423475C6240321732Ed5f9e29d94dAB603A9")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/{walletAddress}")
    public Response<?> getWishlist(@PathVariable String walletAddress){
        log.info("# 위시리스트 조회할 지갑 주소 : {}", walletAddress);
        return OK(null);
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
    @DeleteMapping("/{wishlistId}")
    public Response<?> deleteWishlist(@PathVariable Integer wishlistId){
        log.info("# 삭제할 위시리스트 식별자 : {}", wishlistId);
        return OK(null);
    }
}

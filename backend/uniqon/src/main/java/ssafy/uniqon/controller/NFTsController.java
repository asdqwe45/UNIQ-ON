package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pinata.PinataException;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.service.NFTService;

import java.io.IOException;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/nfts")
@Tag(name = "NFT API")
@CrossOrigin("*")
public class NFTsController {

    public record RegisterNFTWebRequest(
            @Schema(description = "지갑 주소")
            String walletAddress,
            @Schema(description = "중분류")
            String middleClassificationId,
            @Schema(description = "nft 주소")
            String nftAddress,
            @Schema(description = "이름")
            String name,
            @Schema(description = "특징")
            String feature,
            @Schema(description = "나이")
            Integer age
    ){}


    public record NFTWebResponse(
            @Schema(description = "NFT ID")
            Integer nftId,
            @Schema(description = "소유자 주소")
            String owner,
            @Schema(description = "이미지 URL")
            String image,
            @Schema(description = "이름")
            String name,
            @Schema(description = "나이")
            Integer age,
            @Schema(description = "특징")
            String feature,
            @Schema(description = "NFT Metadata URL")
            String nftURL,
            @Schema(description = "컨트랙트 주소")
            String contractAddress,
            @Schema(description = "Token ID")
            Integer tokenId,
            @Schema(description = "좋아요 수")
            Integer likedCnt
    ){
        public NFTWebResponse(Integer nftId, String owner, String image, String name, Integer age, String feature, String nftURL, String contractAddress, Integer tokenId, Integer likedCnt) {
            this.nftId = nftId;
            this.owner = owner;
            this.image = image;
            this.name = name;
            this.age = age;
            this.feature = feature;
            this.nftURL = nftURL;
            this.contractAddress = contractAddress;
            this.tokenId = tokenId;
            this.likedCnt = likedCnt;
        }
    }

//    private final NFTCreateService nftCreateService;
//    private final NFTReadService nftReadService;
    private final NFTService nftService;
    @Operation(summary = "NFT 등록", description = "NFT를 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PostMapping("/register/{userId}")
    public Response<?> registerNFT(@RequestPart(value = "data") RegisterNFTWebRequest req,
                                   @RequestPart(value = "file") MultipartFile multipartFile,
                                   @PathVariable String userId) throws Exception {
        log.debug("# NFT 등록시 데이터 : {}", req);
        log.debug("# NFT 등록시 이미지 : {}", multipartFile);
        nftService.createNFT(req,multipartFile,userId);
        return OK("success");
    }

    @Operation(summary = "NFT 조회", description = "지갑 주소를 통해 위시리스트 조회합니다.")
    @Parameters({
            @Parameter(name = "nftId", description = "NFT 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/detail/{nftId}")
    public Response<?> getNFTInfo(@PathVariable Integer nftId){
        log.debug("# NFT 조회 : {}", nftId);
        return OK(nftService.getNFTInfo(nftId));
    }

    @Operation(summary = "NFT 삭제", description = "등록했던 NFT를 삭제합니다.")
    @Parameters({
            @Parameter(name = "nftId", description = "NFT 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @DeleteMapping("/delete/{nftId}")
    public Response<?> deleteNFT(@PathVariable Integer nftId) throws IOException {
        log.debug("# 삭제할 NFT 식별자 : {}", nftId);
        nftService.deleteNFT(nftId);
        return OK("deleted");
    }

    @Operation(summary = "NFT 거래", description = "NFT를 거래합니다.")
    @Parameters({
            @Parameter(name = "nftId", description = "NFT 식별자", example = "1"),
            @Parameter(name = "buyer", description = "구매자", example = "0xabacc"),
            @Parameter(name = "postId", description = "판매글 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PostMapping("/buy/{nftId}/{buyer}/{postId}")
    public Response<?> transactNFT(@PathVariable Integer nftId,
                                   @PathVariable String buyer,
                                   @PathVariable Integer postId) throws Exception {
        log.debug("# 거래할 NFT 식별자 : {}", nftId);
        log.debug("# 구매자 지갑 주소 : {}", buyer);
        log.debug("# NFT 판매글 식별자 : {}", postId);
        nftService.transactNFT(nftId,buyer,postId);
        return OK("success");
    }

    @PostMapping("/like/{nftId}/{userId}")
    public Response<?> likeNFT(@PathVariable Integer nftId,
                               @PathVariable String userId){
        nftService.likeNFT(nftId,userId);
        return OK("liked");
    }

    @DeleteMapping("/undolike/{nftId}/{userId}")
    public Response<?> undolikeNFT(@PathVariable Integer nftId,
                                   @PathVariable String userId){
        nftService.undoLikeNFT(nftId,userId);
        return OK("deleted");
    }
}

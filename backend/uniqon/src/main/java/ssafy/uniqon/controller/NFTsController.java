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
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pinata.PinataException;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.service.NFTService;

import java.io.IOException;

import static ssafy.uniqon.global.response.Response.ERROR;
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
            String middleClassificationName,
            @Schema(description = "트랜잭션 해시")
            String txHash,
            @Schema(description = "이름")
            String name,
            @Schema(description = "특징")
            String feature,
            @Schema(description = "나이")
            Integer age,
            @Schema(description = "이미지 ipfs url")
            String image,
            @Schema(description = "NFT ipfs url")
            String nftMetadata,
            @Schema(description = "토큰 아이디")
            Integer tokenId,
            @Schema(description = "컨트랙트 주소")
            String contractAddress
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
            Integer likedCnt,
            @Schema(description = "creater")
            String creater,
            String ownerNickname
    ){
        public NFTWebResponse(@Schema(description = "NFT ID")
                              Integer nftId, @Schema(description = "소유자 주소")
                              String owner, @Schema(description = "이미지 URL")
                              String image, @Schema(description = "이름")
                              String name, @Schema(description = "나이")
                              Integer age, @Schema(description = "특징")
                              String feature, @Schema(description = "NFT Metadata URL")
                              String nftURL, @Schema(description = "컨트랙트 주소")
                              String contractAddress, @Schema(description = "Token ID")
                              Integer tokenId, @Schema(description = "좋아요 수")
                              Integer likedCnt, @Schema(description = "creater")
                              String creater, String ownerNickname) {
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
            this.creater = creater;
            this.ownerNickname = ownerNickname;
        }
    }

    public record PinIpfsWebRequest(
            @Schema(description = "이름")
            String name,
            @Schema(description = "중분류")
            String middleClassificationName,
            @Schema(description = "특징")
            String feature,
            @Schema(description = "나이")
            Integer age
    ){}

    public record IPFSWebResponse(
            String nftMetadataHash,
            String imageIpfsHash
    ){}

    public record TransactNFTWebRequest(
            Integer tokenId,
            String txHash,
            Integer postId
    ){}

//    private final NFTCreateService nftCreateService;
//    private final NFTReadService nftReadService;
    private final NFTService nftService;
    @Operation(summary = "NFT 등록", description = "NFT를 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PostMapping("/register")
    public Response<?> registerNFT(@RequestPart(value = "data") RegisterNFTWebRequest req,
                                   @AuthenticationPrincipal UserDetails user) throws Exception {
        log.debug("# NFT 등록시 데이터 : {}", req);
        nftService.createNFT(req,user);
        return OK("success");
    }

    @Operation(summary = "IPFS에 저장", description = "IPFS에 NFT 메타데이터 저장")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PostMapping("/ipfs")
    public Response<?> pinToIpfs(@RequestPart(value = "file") MultipartFile multipartFile,
                                 @RequestPart(value = "data") PinIpfsWebRequest req,
                                 @AuthenticationPrincipal UserDetails user) throws PinataException, IOException {
        NFTsController.IPFSWebResponse res = nftService.pinToIpfs(req,multipartFile,user);
        if (res == null) {
            return ERROR("중복된 이름입니다.", HttpStatus.BAD_REQUEST);
        } else {
            return OK(res);
        }

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
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @DeleteMapping("/delete/{tokenId}")
    public Response<?> deleteNFT(@PathVariable Integer tokenId, @AuthenticationPrincipal UserDetails user) throws IOException {
        log.debug("# 삭제할 NFT 식별자 : {}", tokenId);
        nftService.deleteNFT(tokenId,user);
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
    @PostMapping("/buy")
    public Response<?> transactNFT(@RequestPart(value = "data") TransactNFTWebRequest req,
                                   @AuthenticationPrincipal UserDetails buyer) throws Exception {
        log.debug("# 거래할 NFT 식별자 : {}", req.tokenId());
        log.debug("# 구매자 지갑 주소 : {}", buyer.getUsername());
        log.debug("# NFT 판매글 식별자 : {}", req.postId());
        nftService.transactNFT(req,buyer);
        return OK("success");
    }

    @PostMapping("/like/{nftId}")
    public Response<?> likeNFT(@PathVariable Integer nftId,
                               @AuthenticationPrincipal UserDetails user){
        nftService.likeNFT(nftId,user.getUsername());
        return OK("liked");
    }

    @DeleteMapping("/undolike/{nftId}")
    public Response<?> undolikeNFT(@PathVariable Integer nftId,
                                   @AuthenticationPrincipal UserDetails user){
        nftService.undoLikeNFT(nftId,user.getUsername());
        return OK("undo like");
    }
}

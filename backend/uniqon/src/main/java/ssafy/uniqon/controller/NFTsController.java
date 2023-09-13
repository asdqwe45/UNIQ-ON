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
import ssafy.uniqon.global.response.Response;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/nfts")
@Tag(name = "NFT API")
public class NFTsController {
    
    public record RegisterNFTWebRequest(
            @Schema(description = "지갑 주소")
            String walletAddress,
            @Schema(description = "중분류")
            Integer middleClassificationId,
            @Schema(description = "nft 주소")
            String nftAddress,
            @Schema(description = "이름")
            String name,
            @Schema(description = "특징")
            String feature,
            @Schema(description = "나이")
            Integer age
    ){}

    @Operation(summary = "NFT 등록", description = "NFT를 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @PostMapping("/register")
    public Response<?> registerNFT(@RequestPart(value = "data") RegisterNFTWebRequest req,
                                   @RequestPart(value = "file") MultipartFile multipartFile){
        log.debug("# NFT 등록시 데이터 : {}", req);
        log.debug("# NFT 등록시 이미지 : {}", multipartFile);
        return OK(null);
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
    @GetMapping("/{nftId}")
    public Response<?> getNFTInfo(@PathVariable Integer nftId){
        log.debug("# NFT 조회 : {}", nftId);
        return OK(null);
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
    @DeleteMapping("/{nftId}")
    public Response<?> deleteNFT(@PathVariable Integer nftId){
        log.debug("# 삭제할 NFT 식별자 : {}", nftId);
        return OK(null);
    }
}

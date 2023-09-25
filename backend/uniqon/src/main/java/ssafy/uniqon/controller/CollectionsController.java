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
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.dto.NftListResponseDto;
import ssafy.uniqon.dto.NftListSearchResponseDto;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.repository.MainClassficationQueryRepository;
import ssafy.uniqon.service.CollectionsService;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collections")
@Tag(name = "도감 API")
@CrossOrigin("*")
public class CollectionsController {

    public record mainClassificationListWebResponse(
            int id,
            String type,
            String image
    ){}

    public record middleClassificationListWebResponse(
            int id,
            int mainClassificationId,
            String species,
            String image,
            String feature
    ){}

    public record middleAnimalInfoWebResponse(
            int middleClassificationId,
            int mainClassificationId,
            String species,
            String image,
            String feature
    ){}

    public record nftListWebResponse(
            int id,
            String nftTxHash,
            String image,
            String name,
            int age,
            String feature,
            int memberId,
            int middleClassificationId,
            String middleClassificationSpecies,
            String nftURL,
            String contractAddress,
            int tokenId
    ){
        public nftListWebResponse(int id, String nftTxHash, String image, String name, int age, String feature, int memberId, int middleClassificationId, String middleClassificationSpecies, String nftURL, String contractAddress, int tokenId) {
            this.id = id;
            this.nftTxHash = nftTxHash;
            this.image = image;
            this.name = name;
            this.age = age;
            this.feature = feature;
            this.memberId = memberId;
            this.middleClassificationId = middleClassificationId;
            this.middleClassificationSpecies = middleClassificationSpecies;
            this.nftURL = nftURL;
            this.contractAddress = contractAddress;
            this.tokenId = tokenId;
        }
    }

    private final CollectionsService collectionsService;

    @Operation(summary = "대분류 조회", description = "대분류 리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/list/main")
    public Response<Page<MainClassficationQueryRepository.getMainClassficationDBResponse>> getMainList(@PageableDefault Pageable pageable){
        log.debug("# 대분류 리스트 표시 요청");
        Page<MainClassficationQueryRepository.getMainClassficationDBResponse> list = collectionsService.getMainClassificationList(pageable);
        log.debug("# 대분류 리스트 : {}", list);
        return OK(list);
    }

    @Operation(summary = "중분류 정보 조회", description = "대분류 동물에 속하는 중분류 동물에 대한 정보를 조회합니다.")
    @Parameters({
            @Parameter(name = "mainClassificationId", description = "대분류 동물 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/list/middle/{mainClassificationId}")
    public Response<Page<CollectionsController.middleClassificationListWebResponse>> getMiddleList(@PathVariable Integer mainClassificationId, @PageableDefault Pageable pageable){
        log.debug("# 대분류 식별자에 대한 중분류 리스트 요청 : {}", mainClassificationId);

         Page<middleClassificationListWebResponse> middle = collectionsService.getMiddleClassificationList(pageable, mainClassificationId);
         log.debug("# 중분류 리스트 : {}", middle);

        return OK(middle);
    }

    @Operation(summary = "중분류 상제 정보 조회", description = "중분류 동물에 대한 상제 정보를 조회합니다.")
    @Parameters({
            @Parameter(name = "middleClassificationId", description = "중분류 동물 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/info/middle/{middleClassificationId}")
    public Response<middleAnimalInfoWebResponse> getMiddleInfo(@PathVariable int middleClassificationId){
        log.debug("# 중분류 동물에 대한 상제 정보 조회 : {}", middleClassificationId);
        middleAnimalInfoWebResponse middle = collectionsService.getmiddleAnimalInfo(middleClassificationId);
        log.debug("# 중분류 상세 정보 : {}", middle);
        return OK(middle);
    }

    @Operation(summary = "NFT 리스트 조회", description = "중분류 동물에 속하는 NFT 리스트를 조회합니다.")
    @Parameters({
            @Parameter(name = "middleId", description = "중분류 동물 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/list/nft/{middleId}")
    public Response<Page<NftListResponseDto>> getNFTList(@PathVariable Integer middleId, @PageableDefault Pageable pageable){
        log.debug("# 중분류에 속하는 NFT 리스트 요청 : {}", middleId);
        Page<NftListResponseDto> list = collectionsService.getNFTList(middleId, pageable);
        log.debug("# 중분류에 속하는 NFT 리스트 : {}", list);

        return OK(list);
    }

    @Operation(summary = "도감 검색", description = "도감에서 NFT 내용에 대해 검색합니다.")
    @Parameters({
            @Parameter(name = "query", description = "검색 내용", example = "말티즈")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/search")
    public Response<Page<NftListSearchResponseDto>> searchCollections(@RequestParam("query") String content, @PageableDefault Pageable pageable){
        log.debug("# 도감 검색 요청 : {}", content);
        Page<NftListSearchResponseDto> list = collectionsService.searchNFT(content, pageable);
        log.debug("# 도감 검색 결과 : {}", list);
        return OK(list);
    }


}

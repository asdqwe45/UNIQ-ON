package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.global.response.Response;

import java.util.ArrayList;
import java.util.List;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collections")
@Tag(name = "도감 API")
@CrossOrigin("*")
public class CollectionsController {

    public record mainClassficationListWebResponse(
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
            int id,
            int mainClassficationId,
            String species,
            String image,
            String feature
    ){}

    public record nftListWebResponse(
            int id,
            String walletAddress,
            int middleClassificationId,
            String nftAddress,
            String image,
            String name,
            String feature,
            int age,
            String nickname,
            String profileImage
    ){}


    @Operation(summary = "대분류 리스트 조회", description = "대분류 리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/list/main")
    public Response<?> getMainList(@PageableDefault(size = 10) Pageable pageable){
        log.debug("# 대분류 리스트 표시");
        List<mainClassficationListWebResponse> list = new ArrayList<>();
        mainClassficationListWebResponse res = new mainClassficationListWebResponse(1,"강아지","https://gateway.pinata.cloud/ipfs/QmWorfYFv5TWPpoSvfhqTAGSxq2UZFV8e3L9UnG46BKt6W");
        list.add(res);
        list.add(res);
        return OK(list);
    }

    @Operation(summary = "중분류 리스트 조회", description = "대분류 동물에 속하는 중분류 동물에 대한 정보를 조회합니다.")
    @Parameters({
            @Parameter(name = "mainClassificationId", description = "대분류 동물 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/list/middle/{mainClassificationId}")
    public Response<?> getMiddleList(@PathVariable Integer mainClassificationId, @PageableDefault(size = 10) Pageable pageable){
        log.debug("# 대분류 식별자에 대한 중분류 리스트 표시 : {}", mainClassificationId);
        List<middleClassificationListWebResponse> list = new ArrayList<>();
        middleClassificationListWebResponse res = new middleClassificationListWebResponse(1,1,"시추","https://gateway.pinata.cloud/ipfs/QmWorfYFv5TWPpoSvfhqTAGSxq2UZFV8e3L9UnG46BKt6W", "물어요 조심하세요");
        list.add(res);
        list.add(res);
        return OK(list);
    }

    @Operation(summary = "중분류 정보 조회", description = "중분류 동물에 대한 정보를 조회합니다.")
    @Parameters({
            @Parameter(name = "middleId", description = "중분류 동물 식별자", example = "1")
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/info/middle/{middleId}")
    public Response<?> getMiddleInfo(@PathVariable Integer middleId){
        log.debug("# 중분류 동물에 대한 정보 조회 : {}", middleId);
        middleAnimalInfoWebResponse res = new middleAnimalInfoWebResponse(1,1,"시츄", "https://gateway.pinata.cloud/ipfs/QmWorfYFv5TWPpoSvfhqTAGSxq2UZFV8e3L9UnG46BKt6W", "진짜 물어요");
        return OK(res);
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
    public Response<?> getNFTList(@PathVariable Integer middleId, @PageableDefault Pageable pageable){
        log.debug("# 중분류에 속하는 NFT 리스트 : {}", middleId);
        List<nftListWebResponse> list = new ArrayList<>();
        nftListWebResponse res = new nftListWebResponse(1, "0x000000",1,"0x0000","https://gateway.pinata.cloud/ipfs/QmWorfYFv5TWPpoSvfhqTAGSxq2UZFV8e3L9UnG46BKt6W", "멍멍이", "진짜 물어요", 5, "체리지현","https://img.freepik.com/free-photo/big-cherry-on-white-background_1387-635.jpg?w=996&t=st=1695107915~exp=1695108515~hmac=1cb73ffed25c5bdc95caaec5ef109fc9405098714bb41efc9e00174a1a8b45b9");
        list.add(res);
        list.add(res);
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
    public Response<?> searchCollections(@RequestParam("query") String content, @PageableDefault Pageable pageable){
        log.debug("# 도감 검색 내용 : {}", content);
        nftListWebResponse res = new nftListWebResponse(1, "0x000000",1,"0x0000","https://gateway.pinata.cloud/ipfs/QmWorfYFv5TWPpoSvfhqTAGSxq2UZFV8e3L9UnG46BKt6W", "멍멍이", "진짜 물어요", 5, "체리지현","https://img.freepik.com/free-photo/big-cherry-on-white-background_1387-635.jpg?w=996&t=st=1695107915~exp=1695108515~hmac=1cb73ffed25c5bdc95caaec5ef109fc9405098714bb41efc9e00174a1a8b45b9");
        return OK(res);
    }


}

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
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.global.response.Response;

import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collections")
@Tag(name = "Collections API")
public class CollectionsController {

    @Operation(summary = "대분류 조회", description = "대분류 리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND")
    })
    @GetMapping("/list/main")
    public Response<?> getMainList(){
        log.debug("# 대분류 리스트 표시");
        return OK(null);
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
    public Response<?> getMiddleList(@PathVariable Integer mainClassificationId){
        log.debug("# 대분류 식별자에 대한 중분류 리스트 표시 : {}", mainClassificationId);
        return OK(null);
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
        return OK(null);
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
    public Response<?> getNFTList(@PathVariable Integer middleId){
        log.debug("# 중분류에 속하는 NFT 리스트 : {}", middleId);
        return OK(null);
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
    public Response<?> searchCollections(@RequestParam("query") String content){
        log.debug("# 도감 검색 내용 : {}", content);
        return OK(null);
    }


}

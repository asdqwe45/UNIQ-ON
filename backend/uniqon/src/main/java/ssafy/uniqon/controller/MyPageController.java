package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ssafy.uniqon.global.response.Response;
import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/myPage")
@Tag(name = "마이페이지 API")
@CrossOrigin("*")
public class MyPageController {

    record ModifyMyProfileWebRequest(
            String password,
            String nickname,
            String profileImage
    ){}

    @GetMapping("/info/{userId}")
    Response<?> myProfile(@PathVariable int userId){
        return OK(null);
    }

    @PutMapping("/info")
    Response<?> modifyMyProfile(@RequestBody ModifyMyProfileWebRequest req){
        return OK(null);
    }

    @PostMapping("/nft/{myCollectionId}")
    Response<?> likeNFT(@PathVariable int myCollectionId){
        return OK(null);
    }

    @DeleteMapping("/nft/{myCollectionId}")
    Response<?> undoLikeNFT(@PathVariable int myCollectionId){
        return OK(null);
    }

    @GetMapping("/nft")
    Response<?> getLikeNFTList(){
        return OK(null);
    }

    @GetMapping("/purchaseList")
    Response<?> getPurchaseList(){
        return OK(null);
    }

    @GetMapping("/salesList")
    Response<?> getSalesList(){
        return OK(null);
    }

}

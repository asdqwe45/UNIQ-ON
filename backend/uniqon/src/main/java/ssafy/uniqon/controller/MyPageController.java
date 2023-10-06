package ssafy.uniqon.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.global.response.Response;
import ssafy.uniqon.service.MemberService;
import ssafy.uniqon.service.MyPageService;
import ssafy.uniqon.service.NFTService;

import java.io.IOException;
import java.sql.Timestamp;

import static ssafy.uniqon.global.response.Response.ERROR;
import static ssafy.uniqon.global.response.Response.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/myPage")
@Tag(name = "마이페이지 API")
@CrossOrigin("*")
public class MyPageController {

    public record ModifyMyProfileWebRequest(
            String password,
            String nickname
    ){}

    public record TransactionHistoryWebResponse(
            String seller,
            String buyer,
            String txHash,
            Timestamp transactedAt,
            Integer nftId,
            String nftName,
            String nftImage
    ){
        public TransactionHistoryWebResponse(String seller, String buyer, String txHash, Timestamp transactedAt, Integer nftId, String nftName, String nftImage) {
            this.seller = seller;
            this.buyer = buyer;
            this.txHash = txHash;
            this.transactedAt = transactedAt;
            this.nftId = nftId;
            this.nftName = nftName;
            this.nftImage = nftImage;
        }
    }

    public record MemberInfoWebResponse(
            String walletAddress,
            String name,
            String nickname,
            String birth,
            String gender,
            String vpToken,
            byte[] profileImage
    ){}

    private final MyPageService myPageService;
    private final NFTService nftService;
    private final MemberService memberService;

    @GetMapping("/info")
    Response<?> myProfile(@AuthenticationPrincipal UserDetails userDetails){

        log.warn("유저 정보 : {}", userDetails.getUsername());
        return OK(memberService.getUserInfo(userDetails.getUsername()));
    }

    @PutMapping("/info/{nickname}")
    Response<?> modifyMyProfile(@PathVariable String nickname, @AuthenticationPrincipal UserDetails userDetails) {
        log.debug("# 회원정보 수정 요청 회원 : {}", userDetails.getUsername());
        int result = memberService.modifyUserInfo(userDetails.getUsername(), nickname);
        if (result == 1){
            log.debug("# 정상적으로 회원정보가 수정되었습니다!");
            return OK(null);
        } else {
            log.debug("# 회원정보 수정을 실패하였습니다!");
            return ERROR("회원정보 수정을 실패하였습니다!", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/boughtList")
    Response<?> getPurchaseList(
                                @PageableDefault Pageable pageable, @AuthenticationPrincipal UserDetails userDetails){

        log.warn("내 구매 리스트 유저 정보 : {}", userDetails.getUsername());
        return OK(myPageService.getBoughtList(userDetails.getUsername(),pageable));
    }

    @GetMapping("/soldList")
    Response<?> getSalesList(
                             @PageableDefault Pageable pageable, @AuthenticationPrincipal UserDetails userDetails){

        log.warn("내 판매 리스트 유저 정보 : {}", userDetails.getUsername());
        return OK(myPageService.getSoldList(userDetails.getUsername(),pageable));
    }

    @GetMapping("/mynfts")
    Response<?> getMyNFTList(
                             @PageableDefault Pageable pageable, @AuthenticationPrincipal UserDetails userDetails){

        log.warn("내 nft 리스트 유저 정보 : {}", userDetails.getUsername());
        return OK(nftService.getMyNFTList(userDetails.getUsername(),pageable));
    }

    @GetMapping("/like-nft-list")
    Response<?> getLikedNFTList(
                                @PageableDefault Pageable pageable, @AuthenticationPrincipal UserDetails userDetails){
        log.warn("내가 좋아요 한 nft 리스트 유저 정보 : {}", userDetails.getUsername());
        return OK(myPageService.getLikedNFTList(userDetails.getUsername(),pageable));
    }

}

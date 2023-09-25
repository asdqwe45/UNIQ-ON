package ssafy.uniqon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.uniqon.controller.NFTsController;
import ssafy.uniqon.dto.NftListResponseDto;
import ssafy.uniqon.model.NFTs;

import java.io.IOException;


public interface NFTService {

    void transactNFT(Integer nftId,String buyer,Integer postId) throws Exception;
    public void createNFT(NFTsController.RegisterNFTWebRequest req, MultipartFile multipartFile,String userId) throws Exception;

    public Page<NftListResponseDto> getMyNFTList(String owner, Pageable pageable);

    void likeNFT(Integer nftId,String userId);

    void undoLikeNFT(Integer nftId,String userId);

    NFTsController.NFTWebResponse getNFTInfo(Integer nftId);

    void deleteNFT(Integer nftId) throws IOException;
}

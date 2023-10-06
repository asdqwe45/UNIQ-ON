package ssafy.uniqon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ssafy.uniqon.controller.CollectionsController;
import ssafy.uniqon.dto.NftListResponseDto;
import ssafy.uniqon.dto.NftListSearchResponseDto;
import ssafy.uniqon.repository.MainClassficationQueryRepository;

public interface CollectionsService {

    Page<MainClassficationQueryRepository.getMainClassficationDBResponse> getMainClassificationList(Pageable pageable);

    CollectionsController.middleAnimalInfoWebResponse getmiddleAnimalInfo(int middleClassificationId);

    Page<CollectionsController.middleClassificationListWebResponse> getMiddleClassificationList (Pageable pageable, int mainClassificationId);

    Page<NftListResponseDto> getNFTList(int middleClassificationId, Pageable pageable);

    Page<NftListSearchResponseDto> searchNFT(String query, Pageable pageable);
}

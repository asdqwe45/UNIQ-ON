package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.uniqon.controller.CollectionsController;
import ssafy.uniqon.dto.NftListResponseDto;
import ssafy.uniqon.dto.NftListSearchResponseDto;
import ssafy.uniqon.model.MiddleClassifications;
import ssafy.uniqon.repository.*;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class CollectionsServiceImpl implements CollectionsService{

    private final MainClassficationQueryRepository mainClassficationQueryRepository;
    private final MainClassificationRepository mainClassificationRepository;
    private final MiddleClassificationRepository middleClassificationRepository;
    private final MiddleClassificationQueryRepository middleClassificationQueryRepository;
    private final NFTQueryRepository nftQueryRepository;


    @Override
    public Page<MainClassficationQueryRepository.getMainClassficationDBResponse> getMainClassificationList(Pageable pageable) {
        return mainClassficationQueryRepository.getMainClassificationList(pageable);
    }

    @Override
    public CollectionsController.middleAnimalInfoWebResponse getmiddleAnimalInfo(int middleClassificationId) {
        MiddleClassifications middle = middleClassificationRepository.findById(middleClassificationId);

        return new CollectionsController.middleAnimalInfoWebResponse(
                middle.getId(),
                middle.getMain().getId(),
                middle.getSpecies(),
                middle.getImage(),
                middle.getFeature()
        );
    }

    @Override
    public Page<CollectionsController.middleClassificationListWebResponse> getMiddleClassificationList(Pageable pageable, int mainClassificationId) {
        return middleClassificationQueryRepository.getMiddleClassificationList(pageable, mainClassificationId);
    }

    @Override
    public Page<NftListResponseDto> getNFTList(int middleClassificationId, Pageable pageable) {
        return nftQueryRepository.getNftList(middleClassificationId, pageable);
    }

    @Override
    public Page<NftListSearchResponseDto> searchNFT(String query, Pageable pageable) {
        return nftQueryRepository.searchNFT(query, pageable);
    }
}

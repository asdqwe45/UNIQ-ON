package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ssafy.uniqon.controller.MyPageController;
import ssafy.uniqon.controller.NFTsController;
import ssafy.uniqon.repository.*;


@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    private final TransactionHistoriesQueryRepository transactionHistoriesQueryRepository;
    private final MyCollectionsQueryRepository myCollectionsRepository;
    @Override
    public Page<MyPageController.TransactionHistoryWebResponse> getBoughtList(String buyer, Pageable pageable) {
        return transactionHistoriesQueryRepository.getBoughtTxHistories(buyer,pageable);
    }

    @Override
    public Page<MyPageController.TransactionHistoryWebResponse> getSoldList(String seller,Pageable pageable) {
        return transactionHistoriesQueryRepository.getSoldTxHistories(seller,pageable);
    }

    @Override
    public Page<NFTsController.NFTWebResponse> getLikedNFTList(String userId, Pageable pageable) {
        return myCollectionsRepository.getMyCollectionList(userId,pageable);
    }
}

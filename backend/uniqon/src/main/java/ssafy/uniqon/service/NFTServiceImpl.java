package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pinata.Pinata;
import pinata.PinataException;
import pinata.PinataResponse;
import ssafy.uniqon.controller.NFTsController;
import ssafy.uniqon.dto.NftListResponseDto;
import ssafy.uniqon.model.*;
import ssafy.uniqon.repository.*;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class NFTServiceImpl implements NFTService {
    private final MemberRepository memberRepository;
    private final PostsRepository postsRepository;
    private final NFTRepository nftRepository;
    private final TransactionHistoriesRepository transactionHistoriesRepository;
    private final MiddleClassificationRepository middleClassificationRepository;
    private final MyCollectionsRepository myCollectionsRepository;
    private final NFTQueryRepository nftQueryRepository;
    private final NotificationService notificationService;

    private final Pinata pinata = new Pinata("64e7615856edbac52336", "f62623900242c791dc8cb1243c69b2df8664886f50295a79d43ffe5ffdce0b5c");
    private static final String ipfsBaseURL = "https://gateway.pinata.cloud/ipfs/";

//    private final BigInteger fee = Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger();

    @Override
    public void transactNFT(NFTsController.TransactNFTWebRequest req, UserDetails buyer) throws Exception {
//        Credentials credential = Credentials.create(userPrivateKey);
////        System.out.println(credential.getAddress());
//        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
//        BigInteger gasPrice = ethGasPrice.getGasPrice();
//        ContractGasProvider gasProvider = new StaticGasProvider(gasPrice, BigInteger.valueOf(2_100_000L));
//
//        UniqonNFT contract = UniqonNFT.load(
//                contractAddress, web3j, credential, gasProvider);

//        if (contract.isValid()) {
//            TransactionReceipt receipt = contract.saleNFT(seller.getWalletAddress(),
//                    price,
//                    BigInteger.valueOf(nft.getTokenId()),
//                    price).send();
//            BigInteger price = Convert.toWei(post.getPrice(), Convert.Unit.ETHER).toBigInteger();
//            String txHash = receipt.getTransactionHash();
//        }
//        web3j.shutdown();

        Members buyerMember = memberRepository.findById(buyer.getUsername()).get();
        Posts post = postsRepository.findById(req.postId()).get();
        NFTs nft = nftRepository.findByTokenId(req.tokenId()).get();
        Members seller = post.getSeller();
        transactionHistoriesRepository.save(new TransactionHistories(null, seller, buyerMember, req.txHash(),null,nft));
        nft.setOwner(buyerMember);
        post.setState(1);
        notificationService.createNotification(seller,post);

    }

    @Override
    public void createNFT(NFTsController.RegisterNFTWebRequest req, UserDetails user) throws Exception {
//        Credentials credential = Credentials.create(userPrivateKey);
//        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
//        BigInteger gasPrice = ethGasPrice.getGasPrice();
//        ContractGasProvider gasProvider = new StaticGasProvider(gasPrice, BigInteger.valueOf(2_100_000L));
//        UniqonNFT contract = UniqonNFT.load(
//                contractAddress, web3j, credential, gasProvider);
//        System.out.println(Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger());
        Members owner=memberRepository.findById(user.getUsername()).get();
        MiddleClassifications middleClass=middleClassificationRepository.findBySpecies(req.middleClassificationName());
        nftRepository.save(new NFTs(null,
                req.txHash(),
                req.image(),
                req.name(),
                req.age(),
                req.feature(),
                owner,
                middleClass,
                new ArrayList<>(),
                req.nftMetadata(),
                req.contractAddress(),
                req.tokenId(),
                0,
                new ArrayList<>(),
                owner));
//        if (contract.isValid()) {
//            TransactionReceipt transactionReceipt = contract.mintNFT(credential.getAddress(), jsonIpfsHash, fee).send();
//            Log log = transactionReceipt.getLogs().get(1);
//            int tokenId = Integer.parseInt(log.getData().substring(2), 16);
//            String txHash=transactionReceipt.getTransactionHash();
//        }
//        web3j.shutdown();
    }

    @Override
    public Page<NftListResponseDto> getMyNFTList(String owner, Pageable pageable) {

        return nftQueryRepository.getMyNftList(owner,pageable);
    }

    @Override
    public void likeNFT(Integer nftId, String userId) {
        Members member=memberRepository.findById(userId).get();
        NFTs nft=nftRepository.findById(nftId).get();
        MyCollections myCollections = myCollectionsRepository.findByNfts_Id(nft.getId());
        if (myCollections == null) {
            myCollectionsRepository.save(new MyCollections(null,member,nft));
            nft.setLiked_cnt(nft.getLiked_cnt()+1);
        }

    }

    @Override
    public void undoLikeNFT(Integer nftId, String userId) {
        Members member=memberRepository.findById(userId).get();
        NFTs nft=nftRepository.findById(nftId).get();
        MyCollections myCollections = myCollectionsRepository.findByNfts_Id(nftId);
        myCollectionsRepository.delete(myCollections);
        nft.setLiked_cnt(nft.getLiked_cnt()-1);
    }

    @Override
    public NFTsController.NFTWebResponse getNFTInfo(Integer nftId) {
        NFTs nft=nftRepository.findById(nftId).get();
        return new NFTsController.NFTWebResponse(nft.getId(),
                nft.getOwner().getWalletAddress(),
                nft.getImage(),
                nft.getName(),
                nft.getAge(),
                nft.getFeature(),
                nft.getNftURL(),
                nft.getContractAddress(),
                nft.getTokenId(),
                nft.getLiked_cnt(),
                nft.getCreater().getWalletAddress(),
                nft.getOwner().getNickname()
                );
    }

    @Override
    public void deleteNFT(Integer tokenId,UserDetails user) throws IOException {
//        Credentials credential = Credentials.create(userPrivateKey);
////        System.out.println(credential.getAddress());
//        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
//        BigInteger gasPrice = ethGasPrice.getGasPrice();
//        ContractGasProvider gasProvider = new StaticGasProvider(gasPrice, BigInteger.valueOf(2_100_000L));
//
//        UniqonNFT contract = UniqonNFT.load(
//                contractAddress, web3j, credential, gasProvider);
//        if(contract.isValid()){
//            contract.burnNFT(BigInteger.valueOf(nftId));
//
//        }
//        web3j.shutdown();
        nftRepository.delete(nftRepository.findByTokenId(tokenId).get());
    }

    @Override
    public NFTsController.IPFSWebResponse pinToIpfs(NFTsController.PinIpfsWebRequest req, MultipartFile multipartFile, UserDetails user) throws PinataException, IOException {
        NFTs nft=nftQueryRepository.findByCreaterAndName(user.getUsername(),req.name());
        if(nft!=null){
//            throw new RuntimeException("이미 NFT로 발급한 동물입니다.");
            return null;
        }

        File image = File.createTempFile("123", "");
        multipartFile.transferTo(image);

        PinataResponse pinataImageResponse = pinata.pinFileToIpfs(image, imageOption(req.name()));
        String imageIpfsHash = parsingPinataResponse(pinataImageResponse);

        JSONObject jsonMetaData = nftMetaData(req, imageIpfsHash);

        PinataResponse pinataJsonResponse = pinata.pinJsonToIpfs(jsonMetaData, metaDataOption(req.name()));
        String jsonIpfsHash = parsingPinataResponse(pinataJsonResponse);
        return new NFTsController.IPFSWebResponse(jsonIpfsHash,imageIpfsHash);
    }

    private String parsingPinataResponse(PinataResponse pinataImageResponse) {
        String[] bodySplit = pinataImageResponse.getBody().split(",");
        return ipfsBaseURL + bodySplit[0].substring(bodySplit[0].indexOf(":") + 2, bodySplit[0].length() - 1);
    }

    private JSONObject nftMetaData(NFTsController.PinIpfsWebRequest req, String imageIpfsHash) {
        JSONObject jsonMetaData = new JSONObject();
        jsonMetaData.put("Name", req.name());
        jsonMetaData.put("middleClassificationName", req.middleClassificationName());
        jsonMetaData.put("Age", req.age());
        jsonMetaData.put("Feature", req.feature());
        jsonMetaData.put("Image", imageIpfsHash);
        return jsonMetaData;
    }

    private JSONObject imageOption(String name) {
        JSONObject options = new JSONObject();
        options.put("pinataMetadata", new JSONObject());
        JSONObject pinataMetadata = (JSONObject) options.get("pinataMetadata");
        pinataMetadata.put("name", name + " 이미지");
        return options;
    }

    private JSONObject metaDataOption(String name) {
        JSONObject options = new JSONObject();
        options.put("pinataMetadata", new JSONObject());
        JSONObject pinataMetadata = (JSONObject) options.get("pinataMetadata");
        pinataMetadata.put("name", name);
        return options;
    }
}

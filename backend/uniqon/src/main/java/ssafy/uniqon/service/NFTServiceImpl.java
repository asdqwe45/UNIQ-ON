package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;
import org.web3j.utils.Convert;
import pinata.Pinata;
import pinata.PinataResponse;
import ssafy.uniqon.controller.NFTsController;
import ssafy.uniqon.dto.NftListResponseDto;
import ssafy.uniqon.model.*;
import ssafy.uniqon.repository.*;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Optional;
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

    private final Pinata pinata = new Pinata("64e7615856edbac52336", "f62623900242c791dc8cb1243c69b2df8664886f50295a79d43ffe5ffdce0b5c");
    private static final String ipfsBaseURL = "https://gateway.pinata.cloud/ipfs/";
    private final Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:7545"));
    private final String userPrivateKey = "0x522357c8829606f187fb3511522ba2efa2ff35658325a695903106306c623894";
    private final String contractAddress = "0x459f50D8faC1a605a47d661d4abD360E82F21bb6";
    private final BigInteger fee = Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger();

    @Override
    public void transactNFT(Integer nftId, String buyer, Integer postId) throws Exception {
        Credentials credential = Credentials.create(userPrivateKey);
//        System.out.println(credential.getAddress());
        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        BigInteger gasPrice = ethGasPrice.getGasPrice();
        ContractGasProvider gasProvider = new StaticGasProvider(gasPrice, BigInteger.valueOf(2_100_000L));

        UniqonNFT contract = UniqonNFT.load(
                contractAddress, web3j, credential, gasProvider);

        if (contract.isValid()) {
            Members buyerMember = memberRepository.findById(buyer).get();
            Posts post = postsRepository.findById(postId).get();
            NFTs nft = nftRepository.findById(nftId).get();
            Members seller = post.getSeller();
            BigInteger price = Convert.toWei(post.getPrice(), Convert.Unit.ETHER).toBigInteger();
            TransactionReceipt receipt = contract.saleNFT(seller.getWalletAddress(),
                    price,
                    BigInteger.valueOf(nft.getTokenId()),
                    price).send();
            String txHash = receipt.getTransactionHash();
            transactionHistoriesRepository.save(new TransactionHistories(null, seller, buyerMember, txHash,null));
        }

        web3j.shutdown();
    }

    public void createNFT(NFTsController.RegisterNFTWebRequest req, MultipartFile multipartFile,String userId) throws Exception {
//        File image=new File("C:\\Users\\SSAFY\\Desktop\\KakaoTalk_20230915_100944894.jpg");
//        File image=new File("C:\\Users\\khang\\Desktop\\KakaoTalk_20230915_100944894.jpg");
        File image = File.createTempFile("123", "");
        multipartFile.transferTo(image);

        PinataResponse pinataImageResponse = pinata.pinFileToIpfs(image, imageOption(req.name()));
        String imageIpfsHash = parsingPinataResponse(pinataImageResponse);
//        System.out.println(imageIpfsHash);
        JSONObject jsonMetaData = nftMetaData(req, imageIpfsHash);


        PinataResponse pinataJsonResponse = pinata.pinJsonToIpfs(jsonMetaData, metaDataOption(req.name()));
        String jsonIpfsHash = parsingPinataResponse(pinataJsonResponse);
//        System.out.println(jsonIpfsHash);

        Credentials credential = Credentials.create(userPrivateKey);
//        System.out.println(credential.getAddress());
        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        BigInteger gasPrice = ethGasPrice.getGasPrice();
        ContractGasProvider gasProvider = new StaticGasProvider(gasPrice, BigInteger.valueOf(2_100_000L));
//        TransactionManager transactionManager = new RawTransactionManager(
//                web3j, credential, 5777);

//        UniqonNFT contract = UniqonNFT.deploy(
//                web3j, credential,gasProvider).send();  // constructor params

        UniqonNFT contract = UniqonNFT.load(
                contractAddress, web3j, credential, gasProvider);
//        System.out.println(Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger());

        if (contract.isValid()) {
            TransactionReceipt transactionReceipt = contract.mintNFT(credential.getAddress(), jsonIpfsHash, fee).send();
            Log log = transactionReceipt.getLogs().get(1);
            int tokenId = Integer.parseInt(log.getData().substring(2), 16);
            String txHash=transactionReceipt.getTransactionHash();
            Members owner=memberRepository.findById(credential.getAddress()).get();
            MiddleClassifications middleClass=middleClassificationRepository.findBySpecies(req.middleClassificationId());
//            System.out.println("tokenId: " + tokenId);
            nftRepository.save(new NFTs(null,
                    txHash,
                    imageIpfsHash,
                    req.name(),
                    req.age(),
                    req.feature(),
                    owner,
                    middleClass,
                    new ArrayList<>(),
                    jsonIpfsHash,
                    contractAddress,
                    tokenId,
                    0));
        }

//        System.out.println(contract.balanceOf(credential.getAddress()).send());
        web3j.shutdown();
    }

    @Override
    public Page<NftListResponseDto> getMyNFTList(String owner, Pageable pageable) {

        return nftQueryRepository.getMyNftList(owner,pageable);
    }

    @Override
    public void likeNFT(Integer nftId, String userId) {
        Members member=memberRepository.findById(userId).get();
        NFTs nft=nftRepository.findById(nftId).get();
        myCollectionsRepository.save(new MyCollections(null,member,nft));
        nft.setLiked_cnt(nft.getLiked_cnt()+1);
    }

    @Override
    public void undoLikeNFT(Integer nftId, String userId) {
        Members member=memberRepository.findById(userId).get();
        NFTs nft=nftRepository.findById(nftId).get();
        myCollectionsRepository.delete(new MyCollections(null,member,nft));
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
                nft.getLiked_cnt());
    }

    @Override
    public void deleteNFT(Integer nftId) throws IOException {
        Credentials credential = Credentials.create(userPrivateKey);
//        System.out.println(credential.getAddress());
        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        BigInteger gasPrice = ethGasPrice.getGasPrice();
        ContractGasProvider gasProvider = new StaticGasProvider(gasPrice, BigInteger.valueOf(2_100_000L));

        UniqonNFT contract = UniqonNFT.load(
                contractAddress, web3j, credential, gasProvider);
        if(contract.isValid()){
            contract.burnNFT(BigInteger.valueOf(nftId));
            nftRepository.delete(nftRepository.findById(nftId).get());
        }
        web3j.shutdown();
    }

    private String parsingPinataResponse(PinataResponse pinataImageResponse) {
        String[] bodySplit = pinataImageResponse.getBody().split(",");
        return ipfsBaseURL + bodySplit[0].substring(bodySplit[0].indexOf(":") + 2, bodySplit[0].length() - 1);
    }

    private JSONObject nftMetaData(NFTsController.RegisterNFTWebRequest req, String imageIpfsHash) {
        JSONObject jsonMetaData = new JSONObject();
        jsonMetaData.put("name", req.name());
        jsonMetaData.put("middleClassificationId", req.middleClassificationId());
        jsonMetaData.put("age", req.age());
        jsonMetaData.put("feature", req.feature());
        jsonMetaData.put("image", imageIpfsHash);
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

package ssafy.uniqon.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
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
import java.io.File;
import java.math.BigInteger;

@Service
@RequiredArgsConstructor
public class NFTCreateService {
    private final Pinata pinata = new Pinata("64e7615856edbac52336", "f62623900242c791dc8cb1243c69b2df8664886f50295a79d43ffe5ffdce0b5c");
    private static final String ipfsBaseURL="https://gateway.pinata.cloud/ipfs/";
    private static final Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:7545"));
    private final String userPrivateKey="0xbfcc61084662de802f77fa468af12886663e0d312738031bffc903052f2bf846";

    private final String contractAddress="0x3F434B6a057B1FD2D52cD2bF53128111d408D777";

    private final BigInteger fee=Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger();

    public void createNFT(NFTsController.RegisterNFTWebRequest req) throws Exception {
//        File image=new File("C:\\Users\\SSAFY\\Desktop\\KakaoTalk_20230915_100944894.jpg");
        File image=new File("C:\\Users\\khang\\Desktop\\KakaoTalk_20230915_100944894.jpg");

        PinataResponse pinataImageResponse=pinata.pinFileToIpfs(image,imageOption(req.name()));
        String imageIpfsHash=parsingPinataResponse(pinataImageResponse);
//        System.out.println(imageIpfsHash);
        JSONObject jsonMetaData=nftMetaData(req,imageIpfsHash);


        PinataResponse pinataJsonResponse=pinata.pinJsonToIpfs(jsonMetaData,metaDataOption(req.name()));
        String jsonIpfsHash=parsingPinataResponse(pinataJsonResponse);
//        System.out.println(jsonIpfsHash);

        Credentials credential = Credentials.create(userPrivateKey);
//        System.out.println(credential.getAddress());
        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        BigInteger gasPrice = ethGasPrice.getGasPrice();
        ContractGasProvider gasProvider = new StaticGasProvider(gasPrice,BigInteger.valueOf(2_100_000L));
//        TransactionManager transactionManager = new RawTransactionManager(
//                web3j, credential, 5777);

//        UniqonNFT contract = UniqonNFT.deploy(
//                web3j, credential,gasProvider).send();  // constructor params

        UniqonNFT contract = UniqonNFT.load(
                contractAddress, web3j,credential, gasProvider);
//        System.out.println(Convert.toWei("0.0005", Convert.Unit.ETHER).toBigInteger());

        if (contract.isValid()) {
            TransactionReceipt transactionReceipt=contract.mintNFT(credential.getAddress(),jsonIpfsHash,fee).send();
            Log log=transactionReceipt.getLogs().get(1);
            int tokenId=Integer.parseInt(log.getData().substring(2),16);
            System.out.println("tokenId: "+tokenId);
        }

//        System.out.println(contract.balanceOf(credential.getAddress()).send());
        web3j.shutdown();
    }

    private String parsingPinataResponse(PinataResponse pinataImageResponse){
        String[] bodySplit = pinataImageResponse.getBody().split(",");
        return ipfsBaseURL+bodySplit[0].substring(bodySplit[0].indexOf(":")+2,bodySplit[0].length()-1);
    }

    private JSONObject nftMetaData(NFTsController.RegisterNFTWebRequest req,String imageIpfsHash){
        JSONObject jsonMetaData=new JSONObject();
        jsonMetaData.put("name",req.name());
        jsonMetaData.put("middleClassificationId",req.middleClassificationId());
        jsonMetaData.put("age",req.age());
        jsonMetaData.put("feature",req.feature());
        jsonMetaData.put("image",imageIpfsHash);
        return jsonMetaData;
    }

    private JSONObject imageOption(String name){
        JSONObject options=new JSONObject();
        options.put("pinataMetadata",new JSONObject());
        JSONObject pinataMetadata= (JSONObject) options.get("pinataMetadata");
        pinataMetadata.put("name",name+" 이미지");
        return options;
    }

    private JSONObject metaDataOption(String name){
        JSONObject options=new JSONObject();
        options.put("pinataMetadata",new JSONObject());
        JSONObject pinataMetadata= (JSONObject) options.get("pinataMetadata");
        pinataMetadata.put("name",name);
        return options;
    }

}

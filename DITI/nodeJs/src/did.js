import { EthrDID } from "ethr-did"
import { Resolver } from "did-resolver"
import { getResolver } from "ethr-did-resolver"
import { createVerifiableCredentialJwt, createVerifiablePresentationJwt, verifyCredential, verifyPresentation } from "did-jwt-vc"

// ssafy 네트워크로 수정하기
// const rpcUrl = 'https://rpc.sepolia.org/'
const rpcUrl = 'https://gethrpc.ssafy-blockchain.com/'

// issuer
// DITI(발급자)의 private key사용. 내 지갑 주소와 private key로 사용함
const issuer = new EthrDID({
    // identifier: '0xaaef0b23300e48A68eD859Dc8E102B1884b74bf0',
    identifier: '0xA92Ae66964863A04A143201AFBc825a590740B24',
    // privateKey: 'c530543a2e9f13415d72265f7e7ae0dca577f10ff3a68fd499e9c8db9aca4f73',
    privateKey: '186eea98dc8c85012b67612687b928d8a8394002312daba8cc8368051dbdea93',
    rpcUrl: rpcUrl,
    chainNameOrId: 'sepolia',
})

// resolver
// see also https://github.com/decentralized-identity/ethr-did-resolver#multi-network-configuration
// const providerConfig = {
//     rpcUrl: rpcUrl,
//     // 배포한 스마트 컨트랙트 주소 
//     // registry: '0xb4884e21e276a2d42b2969ae9ca220639d2abe73',
//     // ssafy 네트워크에 배포한 contract address로 수정함 
//     registry: '0xc9C8Db9F05bF5A0ab10511Bc6Df56c300fbcf3B3',
//     name: 'sepolia'
// }

export async function createVC(walletAddress, data) {
    // create VC
    const vcPayload = {
        // 유저 지갑 주소 기반으로 did 생성
        sub: 'did:ethr:sepolia:' + walletAddress,
        // nbf: 1562950282,
        //    exp: 1646337778
        nbf: Math.floor(Date.now()/1000),
        exp: Math.floor(Date.now()/1000+86400*365),
        vc: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            credentialSubject: {
                data,
            }
        }
    }
    let vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer)
    return vcJwt
}

// createVP
// 서비스가 요청. 신분증의 주인임을 알기위해 서명 필요 + 특정 인증서 이름(?) 
// 서비스 -> Spring -> node -> Spring -> 서비스 
export async function createVP(vcJwt) {
    const vpPayload = {
        vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        verifiableCredential: [vcJwt]
        }
    }
        const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer)
        console.log(vpJwt)
        return vpJwt
}

// // verify VC
// try {
//     const verifiedVC = await verifyCredential(vcJwt, resolver)
//     console.log("################ verifiedVC ########################")
//     console.log(verifiedVC)
// } catch (e) {
//     console.log(e)
// }
// // process.exit(1)

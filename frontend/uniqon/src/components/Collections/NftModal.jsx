import React from 'react';

export function NftModal({ isOpen, onClose, selectedNft }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      {/* <div className="modal-bg fixed top-0 left-0 w-full h-full bg-black opacity-50" /> */}
      <div className="modal-content bg-white p-4 rounded-lg shadow-md" style={{ maxWidth: '30rem' }}>
        {/* <h2 className="text-xl font-semibold">{selectedNft.nickname}</h2> */}
        <img src={selectedNft.image} alt={selectedNft.nickname} className="my-4 max-w-full mb-4" />
        {/* 여기에 카드에 관한 추가 정보를 표시하세요 */}
        <div style={{ color: 'black' }}>
          <h3>소유주: {selectedNft.nickname}</h3>
          <p>동물 이름: {selectedNft.name}</p>
          <p>나이: {selectedNft.age}</p>
          <p>특징: {selectedNft.feature}</p>
        </div>
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          닫기
        </button>
      </div>
    </div>
  );
}

export function MidModal({ isOpen, onClose, selectedCard, goToNft }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      {/* <div className="modal-bg fixed top-0 left-0 w-full h-full bg-black opacity-50" /> */}
      <div className="modal-content bg-white p-4 rounded-lg shadow-md" style={{ maxWidth: '30rem' }}>
        {/* <h2 className="text-xl font-semibold">{selectedNft.nickname}</h2> */}
        <img src={selectedCard.image} alt={selectedCard.nickname} className="my-4 max-w-full mb-4" />
        {/* 여기에 카드에 관한 추가 정보를 표시하세요 */}
        <div style={{ color: 'black' }}>
          <p>특징: {selectedCard.feature}</p>
        </div>
        <div>
          <button onClick={goToNft} className="mt-4 text-purple-500 hover:underline">
            NFT 보러가기
          </button>
        </div>
        <div>
          <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

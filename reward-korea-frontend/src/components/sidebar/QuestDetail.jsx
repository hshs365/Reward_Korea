import React from 'react';

const QuestDetail = ({ quest, onBack }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-xl font-bold">퀘스트 상세 정보</h3>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto pr-2">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-2xl font-bold text-text-light dark:text-text-dark">{quest.title}</h4>
            {quest.isFCFS && (
              <span className="flex-shrink-0 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full">선착순</span>
            )}
          </div>
          <p className="text-md text-gray-600 dark:text-gray-400">{quest.location}</p>
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
          <div className="space-y-2">
            <p><span className="font-semibold">보상:</span> {quest.reward}P</p>
            <p><span className="font-semibold">기간:</span> {quest.duration}</p>
          </div>
          <div className="prose dark:prose-invert max-w-none mt-4">
            <p>퀘스트에 대한 상세 설명이 여기에 들어갑니다. 예시 텍스트입니다. 이 퀘스트는 동네 카페에서 커피를 마시는 간단한 임무입니다. 참여하여 포인트를 획득하세요!</p>
          </div>
        </div>
      </div>

      {/* Footer/Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full px-4 py-3 bg-accent text-white font-bold rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
          퀘스트 수락
        </button>
      </div>
    </div>
  );
};

export default QuestDetail;

import React from 'react';

// 가상 데이터
const inProgressQuests = [
  { id: 1, title: '동네 카페에서 커피 마시기', reward: 50 },
  { id: 2, title: '서점에서 책 1권 구매하기', reward: 100 },
  { id: 3, title: '공원에서 30분 이상 산책하기', reward: 30 },
];

const completedQuests = [
  { id: 4, title: '편의점에서 신제품 음료 구매', reward: 20 },
  { id: 5, title: '전통 시장 방문하여 장보기', reward: 80 },
];

const totalPoints = 1000; // 현재 보유 포인트 (가상)

const MyQuestsPage = () => {
  return (
    <div className="p-6 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark min-h-screen">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">내 퀘스트</h1>
        <div className="bg-accent text-white px-4 py-2 rounded-lg shadow">
          <span className="font-semibold">총 보유 포인트:</span>
          <span className="ml-2 text-lg font-bold">{totalPoints.toLocaleString()} P</span>
        </div>
      </div>

      {/* 진행중인 퀘스트 섹션 */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">진행중인 퀘스트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressQuests.map((quest) => (
            <div key={quest.id} className="bg-secondary-light dark:bg-secondary-dark p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">{quest.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">완료 시 획득 포인트</p>
              <p className="text-right text-xl font-bold text-accent mt-1">{quest.reward} P</p>
            </div>
          ))}
        </div>
      </div>

      {/* 완료한 퀘스트 섹션 */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">완료한 퀘스트</h2>
        <div className="bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {completedQuests.map((quest) => (
              <li key={quest.id} className="flex justify-between items-center py-4">
                <span className="text-gray-600 dark:text-gray-300">{quest.title}</span>
                <span className="font-semibold text-green-500">+{quest.reward} P</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyQuestsPage;
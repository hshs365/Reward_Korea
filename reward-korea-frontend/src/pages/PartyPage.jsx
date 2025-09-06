import React from 'react';

// Mock Data
const myParties = [
  {
    id: 1,
    name: '동네 한바퀴 퀘스트 파티',
    members: ['나', '친구1', '이웃주민'],
    activeQuest: '공원에서 함께 30분 이상 산책하기',
  },
  {
    id: 2,
    name: '맛집 탐방 파티',
    members: ['나', '동료1', '동료2', '동료3'],
    activeQuest: '새로 생긴 파스타 집에서 저녁 식사',
  },
  {
    id: 3,
    name: '스터디 그룹',
    members: ['나', '선배'],
    activeQuest: '도서관에서 2시간 이상 공부하기',
  },
];

const PartyPage = () => {
  return (
    <div className="p-6 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">내 파티</h1>
        <button className="px-4 py-2 bg-accent text-white font-semibold rounded-md hover:bg-blue-400">
          파티 생성
        </button>
      </div>

      <div className="space-y-6">
        {myParties.map((party) => (
          <div key={party.id} className="bg-secondary-light dark:bg-secondary-dark p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2">{party.name}</h2>
            <div className="mb-3">
              <span className="font-semibold">멤버: </span>
              <span>{party.members.join(', ')}</span>
            </div>
            <div>
              <span className="font-semibold">진행중인 퀘스트: </span>
              <span>{party.activeQuest}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartyPage;

import React from 'react';
import QuestItem from './QuestItem';

// Mock Data - combined and enhanced
const quests = [
  { id: 1, title: '동네 카페에서 커피 마시기', reward: 50, location: '스타벅스 강남점', duration: '오늘 14:00 ~ 18:00', isFCFS: true, category: 'hot', position: [37.4979, 127.0276] },
  { id: 2, title: '서점에서 책 1권 구매하기', reward: 100, location: '교보문고 광화문점', duration: '이번 주 내내', isFCFS: false, category: 'nearby', position: [37.5700, 126.9782] },
  { id: 3, title: '공원에서 30분 이상 산책하기', reward: 30, location: '서울숲', duration: '상시', isFCFS: false, category: 'nearby', position: [37.5445, 127.0369] },
  { id: 4, title: '[파티] 신제품 음료 구매', reward: 20, location: 'CU 역삼점', duration: '오늘만', isFCFS: true, category: 'party', position: [37.5008, 127.0364] },
  { id: 5, title: '전통 시장 방문하여 장보기', reward: 80, location: '광장시장', duration: '주말 10:00 ~ 16:00', isFCFS: false, category: 'hot', position: [37.5700, 126.9996] },
  { id: 6, title: '새 퀘스트 1', reward: 45, location: '미정', duration: '내일 하루 종일', isFCFS: true, category: 'hot', position: [37.5665, 126.9780] },
  { id: 7, title: '[파티] 새 퀘스트 2', reward: 120, location: '미정', duration: '상시', isFCFS: false, category: 'party', position: [37.5833, 127.0017] },
];

const QuestList = ({ filter, onQuestSelect }) => {
  const filteredQuests = quests.filter(quest => filter === 'all' || quest.category === filter);

  return (
    <div className="space-y-3">
      {filteredQuests.map((quest) => (
        <QuestItem key={quest.id} quest={quest} onSelect={onQuestSelect} />
      ))}
    </div>
  );
};

export default QuestList;

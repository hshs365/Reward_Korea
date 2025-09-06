import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 가상 데이터: 기업 회원이 의뢰한 퀘스트 목록 (CorporateQuestsPage.jsx와 동일하게 유지)
const commissionedQuests = [
  { id: 101, title: '신제품 아이디어 공모전', description: '새로운 제품 아이디어를 공모합니다. 창의적이고 실현 가능한 아이디어를 제출해주세요.', status: '진행 중', applicants: 15, reward: 500, participants: [{name: '김철수', status: '수락', submitted: false}, {name: '이영희', status: '수락', submitted: true}, {name: '박민수', status: '대기', submitted: false}] },
  { id: 102, title: '서비스 개선을 위한 설문조사', description: '기존 서비스의 문제점을 파악하고 개선 방안을 모색하기 위한 설문조사입니다.', status: '완료', applicants: 120, reward: 200, participants: [{name: '최지우', status: '수락', submitted: true}, {name: '강동원', status: '수락', submitted: true}] },
  { id: 103, title: '새로운 로고 디자인 콘테스트', description: '기업의 새로운 이미지를 대표할 로고 디자인을 공모합니다. 독창적이고 시각적으로 매력적인 디자인을 기대합니다.', status: '진행 중', applicants: 8, reward: 1000, participants: [{name: '정우성', status: '수락', submitted: false}, {name: '고소영', status: '대기', submitted: false}] },
];

const CommissionedQuestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quest, setQuest] = useState(null);

  useEffect(() => {
    // 실제 API 호출 대신 가상 데이터에서 퀘스트 찾기
    const foundQuest = commissionedQuests.find(q => q.id === parseInt(id));
    if (foundQuest) {
      setQuest(foundQuest);
    } else {
      // 퀘스트를 찾을 수 없을 경우 처리 (예: 404 페이지로 리다이렉트)
      navigate('/corporate-quests'); 
    }
  }, [id, navigate]);

  if (!quest) {
    return <div className="p-6 text-center text-text-light dark:text-text-dark">퀘스트를 불러오는 중...</div>;
  }

  return (
    <div className="p-6 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        ← 뒤로가기
      </button>
      <div className="bg-secondary-light dark:bg-secondary-dark p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-4">{quest.title}</h1>
        <p className="text-gray-400 mb-6">상태: <span className="font-medium text-accent">{quest.status}</span></p>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">퀘스트 설명</h2>
          <p className="text-gray-300 leading-relaxed">{quest.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">보상 포인트</h2>
          <p className="text-accent text-3xl font-bold">{quest.reward} P</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">참가자 현황 ({quest.participants.length}명)</h2>
          {quest.participants.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {quest.participants.map((participant, index) => (
                <li key={index} className="flex justify-between items-center py-3">
                  <span className="text-lg">{participant.name}</span>
                  <span className={`font-medium ${participant.status === '수락' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {participant.status} {participant.submitted ? '(제출 완료)' : ''}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">아직 참가자가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommissionedQuestDetailPage;

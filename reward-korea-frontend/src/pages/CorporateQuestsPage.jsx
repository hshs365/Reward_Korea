import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// 가상 데이터: 기업 회원이 의뢰한 퀘스트 목록
const commissionedQuests = [
  { id: 101, title: '신제품 아이디어 공모전', description: '새로운 제품 아이디어를 공모합니다. 창의적이고 실현 가능한 아이디어를 제출해주세요.', status: '진행 중', applicants: 15, reward: 500, participants: [{name: '김철수', status: '수락', submitted: false}, {name: '이영희', status: '수락', submitted: true}, {name: '박민수', status: '대기', submitted: false}] },
  { id: 102, title: '서비스 개선을 위한 설문조사', description: '기존 서비스의 문제점을 파악하고 개선 방안을 모색하기 위한 설문조사입니다.', status: '완료', applicants: 120, reward: 200, participants: [{name: '최지우', status: '수락', submitted: true}, {name: '강동원', status: '수락', submitted: true}] },
  { id: 103, title: '새로운 로고 디자인 콘테스트', description: '기업의 새로운 이미지를 대표할 로고 디자인을 공모합니다. 독창적이고 시각적으로 매력적인 디자인을 기대합니다.', status: '진행 중', applicants: 8, reward: 1000, participants: [{name: '정우성', status: '수락', submitted: false}, {name: '고소영', status: '대기', submitted: false}] },
];

const CorporateQuestsPage = () => {
  const navigate = useNavigate();

  const handleRegisterNewQuest = () => {
    navigate('/register-quest'); // 퀘스트 등록 페이지로 이동
  };

  return (
    <div className="p-6 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">의뢰 목록</h1>
        <button
          onClick={handleRegisterNewQuest}
          className="py-2 px-4 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
        >
          새 퀘스트 등록
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">진행중인 의뢰</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commissionedQuests.filter(quest => quest.status === '진행 중').length > 0 ? (
            commissionedQuests.filter(quest => quest.status === '진행 중').map((quest) => (
              <Link to={`/corporate-quests/${quest.id}`} key={quest.id} className="bg-secondary-light dark:bg-secondary-dark p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 cursor-pointer">
                <h3 className="text-lg font-semibold">{quest.title}</h3>
                <p>참여자 수: <span className="font-medium">{quest.applicants}명</span></p>
                <p>보상: <span className="font-medium text-accent">{quest.reward} P</span></p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">진행중인 의뢰가 없습니다.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">마감한 의뢰</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commissionedQuests.filter(quest => quest.status === '완료').length > 0 ? (
            commissionedQuests.filter(quest => quest.status === '완료').map((quest) => (
              <Link to={`/corporate-quests/${quest.id}`} key={quest.id} className="bg-secondary-light dark:bg-secondary-dark p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 cursor-pointer">
                <h3 className="text-lg font-semibold">{quest.title}</h3>
                <p>참여자 수: <span className="font-medium">{quest.applicants}명</span></p>
                <p>보상: <span className="font-medium text-accent">{quest.reward} P</span></p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">마감한 의뢰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateQuestsPage;

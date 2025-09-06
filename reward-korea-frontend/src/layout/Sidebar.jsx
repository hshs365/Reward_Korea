import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import QuestList from '../components/sidebar/QuestList';
import QuestDetail from '../components/sidebar/QuestDetail';
import QuestCategoryFilter from '../components/sidebar/QuestCategoryFilter';
import ThemeToggleButton from '../components/common/ThemeToggleButton';
import { useMap } from '../store/MapContext';
import { useUser } from '../store/UserContext'; // Import useUser

const Sidebar = () => {
  const { user, loading, logout } = useUser(); // Get user, loading, and logout from context
  const [questFilter, setQuestFilter] = useState('hot'); // Default filter
  const [selectedQuest, setSelectedQuest] = useState(null);
  const navigate = useNavigate();
  const { selectQuestForMap } = useMap();

  const handleLogout = () => {
    logout(); // Use logout from context
    navigate('/login');
  };

  const handleQuestSelect = (quest) => {
    setSelectedQuest(quest);
    selectQuestForMap(quest);
  };

  const handleBackToList = () => {
    setSelectedQuest(null);
    selectQuestForMap(null);
  };

  const menuItems = [
    { path: '/', label: '홈', icon: '🏠' },
    // Conditional rendering for '내 퀘스트' or '내가 의뢰한 퀘스트'
    ...(user && user.userType === 'NPC'
      ? [
          { path: '/corporate-quests', label: '의뢰 목록', icon: '💼' },
          { path: '/register-quest', label: '퀘스트 등록', icon: '➕' },
        ]
      : [
          { path: '/my-quests', label: '내 퀘스트', icon: '📝' },
        ]),
    { path: '/party', label: '파티', icon: '👥' },
    { path: '/announcements', label: '공지', icon: '📢' },
    { path: '/contact', label: '문의', icon: '❓' },
  ];

  const navLinkClasses = ({ isActive }) =>
    `flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-accent text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
    }`;

  return (
    <aside className="flex h-screen shadow-2xl z-20">
      {/* Column 1: Icon Bar */}
      <div className="w-20 bg-secondary-light dark:bg-secondary-dark flex flex-col items-center justify-between py-4 text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
        <nav className="flex flex-col items-center space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={navLinkClasses}
              title={item.label}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="flex flex-col items-center space-y-2">
          {user ? ( // Check if user exists (logged in)
            <NavLink
              to="/my-info"
              className={navLinkClasses}
              title="내 정보"
            >
              <span className="text-2xl">🚪</span>
              <span className="text-xs font-medium mt-1">내 정보</span>
            </NavLink>
          ) : (
            <Link to="/login" className="flex flex-col items-center justify-center w-16 h-16 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700" title="로그인">
              <span className="text-2xl">🔑</span>
              <span className="text-xs font-medium mt-1">로그인</span>
            </Link>
          )}
          <ThemeToggleButton />
        </div>
      </div>

      {/* Column 2: Content Panel */}
      <div className="w-80 bg-primary-light dark:bg-primary-dark p-4 flex flex-col text-text-light dark:text-text-dark border-l border-gray-200 dark:border-gray-700">
        {selectedQuest ? (
          <QuestDetail quest={selectedQuest} onBack={handleBackToList} />
        ) : (
          <>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="퀘스트 검색..."
                className="w-full p-2 rounded-md bg-secondary-light dark:bg-secondary-dark border border-gray-300 dark:border-gray-600 focus:ring-accent focus:border-accent"
              />
            </div>
            <QuestCategoryFilter currentFilter={questFilter} onFilterChange={setQuestFilter} />
            <div className="flex-grow overflow-y-auto pr-2">
              <QuestList filter={questFilter} onQuestSelect={handleQuestSelect} />
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

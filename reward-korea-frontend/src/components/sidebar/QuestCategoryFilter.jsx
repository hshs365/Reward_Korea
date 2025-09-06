import React from 'react';

const QuestCategoryFilter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'hot', label: '핫한 퀘스트' },
    { key: 'nearby', label: '근처 퀘스트' },
    { key: 'party', label: '파티 퀘스트' },
  ];

  return (
    <div className="flex items-center justify-around bg-secondary-light dark:bg-secondary-dark p-1 rounded-lg mb-4">
      {filters.map(filter => {
        const isActive = currentFilter === filter.key;
        return (
          <button 
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`w-full text-center px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 ${
              isActive 
                ? 'bg-accent text-white shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}>
            {filter.label}
          </button>
        )
      })}
    </div>
  );
};

export default QuestCategoryFilter;

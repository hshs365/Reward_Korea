import React from 'react';

const QuestItem = ({ quest, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(quest)}
      className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-secondary-dark cursor-pointer transition-colors">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-md text-text-light dark:text-text-dark pr-2">{quest.title}</h4>
        {quest.isFCFS && (
          <span className="flex-shrink-0 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full">선착순</span>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">보상: {quest.reward}P</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">기간: {quest.duration}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{quest.location}</p>
    </div>
  );
};

export default QuestItem;

import React from 'react';
import QuestMap from '../components/dashboard/QuestMap';

const DashboardPage = () => {
  return (
    <div className="relative w-full h-full">
      <QuestMap className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default DashboardPage;

import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-primary-light dark:bg-primary-dark">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <Sidebar />
    </div>
  );
};

export default MainLayout;
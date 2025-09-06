import React from 'react';
import { useParams } from 'react-router-dom';
import { announcements } from '../data/announcements';

const AnnouncementDetailPage = () => {
  const { id } = useParams();
  const announcement = announcements.find((a) => a.id === parseInt(id));

  if (!announcement) {
    return <div className="p-6 text-text-light dark:text-text-dark">공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-6 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark">
      <h1 className="text-3xl font-bold mb-4">{announcement.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{announcement.date}</p>
      <div className="prose dark:prose-invert max-w-none">
        <p>{announcement.content}</p>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;

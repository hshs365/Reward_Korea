import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { announcements } from '../data/announcements';

const ITEMS_PER_PAGE = 5;

const AnnouncementsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedAnnouncements = announcements.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark">
      <h1 className="text-3xl font-bold mb-6">공지사항</h1>
      <div className="space-y-4 mb-6">
        {selectedAnnouncements.map((announcement) => (
          <Link to={`/announcements/${announcement.id}`} key={announcement.id} className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-secondary-dark">
            <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">{announcement.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{announcement.date}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? 'bg-accent text-white'
                : 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700'
            }`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;

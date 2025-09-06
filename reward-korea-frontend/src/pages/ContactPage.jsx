import React from 'react';

const ContactPage = () => {
  return (
    <div className="p-6 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark">
      <h1 className="text-3xl font-bold mb-6">문의하기</h1>
      <form className="max-w-xl mx-auto bg-secondary-light dark:bg-secondary-dark p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">이름</label>
          <input type="text" id="name" className="w-full p-2 rounded-md bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-600 focus:ring-accent focus:border-accent" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">이메일</label>
          <input type="email" id="email" className="w-full p-2 rounded-md bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-600 focus:ring-accent focus:border-accent" />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium mb-2">메시지</label>
          <textarea id="message" rows="6" className="w-full p-2 rounded-md bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-600 focus:ring-accent focus:border-accent"></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="px-6 py-2 bg-accent text-white font-bold rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
            보내기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;

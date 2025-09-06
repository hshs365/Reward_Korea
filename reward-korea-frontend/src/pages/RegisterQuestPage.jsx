import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const RegisterQuestPage = () => {
  const navigate = useNavigate();
  const [questData, setQuestData] = useState({
    title: '',
    description: '',
    reward: '',
    // Add other fields as necessary, e.g., category, deadline
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Assuming your API endpoint for quest registration is /quests
      const response = await api.post('/quests', questData);
      console.log('Quest registered successfully:', response.data);
      alert('퀘스트가 성공적으로 등록되었습니다!');
      navigate('/corporate-quests'); // Redirect to corporate quests page after registration
    } catch (err) {
      console.error('Failed to register quest:', err);
      setError('퀘스트 등록에 실패했습니다. 모든 필드를 올바르게 입력했는지 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark min-h-screen">
      <h1 className="text-3xl font-bold mb-6">새 퀘스트 등록</h1>
      <form onSubmit={handleSubmit} className="bg-secondary-light dark:bg-secondary-dark p-6 rounded-lg shadow-md space-y-4">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">퀘스트 제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={questData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-accent focus:border-accent bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">퀘스트 설명</label>
          <textarea
            id="description"
            name="description"
            value={questData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-accent focus:border-accent bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="reward" className="block text-sm font-medium text-gray-700 dark:text-gray-300">보상 (포인트)</label>
          <input
            type="number"
            id="reward"
            name="reward"
            value={questData.reward}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-accent focus:border-accent bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          disabled={loading}
        >
          {loading ? '등록 중...' : '퀘스트 등록하기'}
        </button>
      </form>
    </div>
  );
};

export default RegisterQuestPage;

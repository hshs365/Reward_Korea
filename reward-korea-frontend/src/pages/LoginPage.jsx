import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useUser } from '../store/UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', {
        id: username,
        password,
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        const userResponse = await api.get('/auth/me');
        setUser(userResponse.data);
        navigate('/');
      }
    } catch (err) {
      setError('로그인에 실패했습니다. ID 또는 비밀번호를 확인하세요.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-light dark:bg-primary-dark">
      <div className="w-full max-w-md p-8 space-y-6 bg-secondary-light dark:bg-secondary-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-text-light dark:text-text-dark">로그인</h2>
        {error && <p className="text-sm text-center text-red-500">{error}</p>}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              ID
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-primary-light dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-accent border border-transparent rounded-md shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              로그인
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <p className="text-gray-600 dark:text-gray-400">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="font-medium text-accent hover:text-blue-400">
              회원가입
            </Link>
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 dark:text-gray-400 bg-secondary-light dark:bg-secondary-dark">또는</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            className="w-full px-4 py-2 text-sm font-medium text-black bg-[#FEE500] border border-transparent rounded-md shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            카카오로 계속하기
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            구글로 계속하기
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-[#03C75A] border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            네이버로 계속하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

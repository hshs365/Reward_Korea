import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import the api instance

const MyInfoPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [editableUserInfo, setEditableUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // State for image upload

  useEffect(() => {
    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/auth/me');
        if (isMounted) {
          setUserInfo(response.data);
          setEditableUserInfo(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError('사용자 정보를 불러오는데 실패했습니다.');
        }
        console.error('Error fetching user info:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    setIsUploading(true);
    try {
      const response = await api.post('/auth/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const newProfilePicUrl = response.data.profilePictureUrl;
      
      setUserInfo(prev => ({ ...prev, profilePicture: newProfilePicUrl }));
      setEditableUserInfo(prev => ({ ...prev, profilePicture: newProfilePicUrl }));

      alert('프로필 사진이 성공적으로 업데이트되었습니다.');
    } catch (uploadError) {
      console.error('프로필 사진 업로드 실패:', uploadError);
      alert('프로필 사진 업로드에 실패했습니다. 파일 크기나 형식을 확인해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {

    console.log('Sending updateData:', editableUserInfo); // Added console.log
    try {
      const response = await api.put('/users/me', editableUserInfo);
      console.log('Received responseData:', response.data); // Added console.log
      setUserInfo(response.data);
      setIsEditing(false);
      alert('정보가 성공적으로 업데이트되었습니다.');
    } catch (saveError) {
      console.error('정보 업데이트 실패:', saveError);
      alert('정보 업데이트에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    setEditableUserInfo(userInfo);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div className="p-6 text-center text-text-light dark:text-text-dark">사용자 정보를 불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  const renderInfoField = (label, value, name, type = 'text', placeholder = '') => {
    const isSelect = type === 'select';
    const commonClasses = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark";

    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        {isEditing && name !== 'age' ? (
          isSelect ? (
            <select id={name} name={name} value={editableUserInfo[name] || ''} onChange={handleChange} className={commonClasses}>
              <option value="">선택 안 함</option>
              <option value="male">남</option>
              <option value="female">여</option>
            </select>
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              value={editableUserInfo[name] || ''}
              onChange={handleChange}
              placeholder={placeholder}
              className={commonClasses}
            />
          )
        ) : (
          <p className="text-md text-gray-800 dark:text-gray-200 p-2 border border-transparent rounded-md bg-gray-100 dark:bg-gray-700 min-h-[42px]">
            {name === 'gender' ? (value === 'male' ? '남' : value === 'female' ? '여' : `${label} 정보 없음`) : (value || `${label} 정보 없음`)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">내 정보</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            로그아웃
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
          {userInfo ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden group shadow-lg">
                  <img
                    src={
                      editableUserInfo.profilePicture
                        ? `${api.defaults.baseURL}${editableUserInfo.profilePicture}`
                        : 'https://via.placeholder.com/128'
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={() => !isUploading && document.getElementById('profilePictureInput').click()}
                  >
                    {isUploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    ) : (
                      <span className="text-white text-center">사진 수정</span>
                    )}
                  </div>
                  <input
                    type="file"
                    id="profilePictureInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    disabled={isUploading}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {renderInfoField("닉네임", userInfo.nickname, "nickname", "text", "닉네임을 입력하세요")}
                {renderInfoField("이메일", userInfo.email, "email", "email", "이메일을 입력하세요")}
                {renderInfoField("나이", userInfo.age, "age", "text")}
                {renderInfoField("성별", userInfo.gender, "gender", "select")}
                {renderInfoField("전화번호", userInfo.phoneNumber, "phoneNumber", "tel", "010-1234-5678")}
                {renderInfoField("주소", userInfo.address, "address", "text", "주소를 입력하세요")}
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="py-2 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      저장
                    </button>
                    <button
                      onClick={handleCancel}
                      className="py-2 px-6 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    수정하기
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-text-light dark:text-text-dark">사용자 정보를 표시할 수 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;
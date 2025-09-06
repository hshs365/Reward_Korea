import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'NORMAL', // Default to NORMAL
    name: '',
    nickname: '',
    residentRegistrationNumber: '',
    phoneNumber: '',
    gender: '', // 'MALE', 'FEMALE'
    address: '',
    detailedAddress: '',
    businessRegistrationNumber: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setFormData((prev) => ({
          ...prev,
          address: data.address,
        }));
      },
    }).open();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id) newErrors.id = 'ID를 입력해주세요.';
    if (!formData.email) newErrors.email = '이메일을 입력해주세요.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '유효한 이메일 형식이 아닙니다.';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.';
    else if (formData.password.length < 8) newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    if (!formData.name) newErrors.name = '이름을 입력해주세요.';
    if (!formData.nickname) newErrors.nickname = '닉네임을 입력해주세요.';
    if (!formData.residentRegistrationNumber) {
      newErrors.residentRegistrationNumber = '주민번호를 입력해주세요.';
    } else if (!/^\d{6}-\d{7}$/.test(formData.residentRegistrationNumber)) {
      newErrors.residentRegistrationNumber = '유효한 주민등록번호 형식이 아닙니다 (예: 901225-1234567).';
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = '전화번호를 입력해주세요.';
    if (!formData.gender) newErrors.gender = '성별을 선택해주세요.';
    if (!formData.address) newErrors.address = '주소를 입력해주세요.';
    if (!formData.detailedAddress) newErrors.detailedAddress = '상세주소를 입력해주세요.';

    if (formData.userType === 'NPC' && !formData.businessRegistrationNumber) {
      newErrors.businessRegistrationNumber = '사업자등록번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const residentRegistrationNumberWithoutHyphen = formData.residentRegistrationNumber.replace(/-/g, '');

      await api.post('/users', { // Assuming the endpoint is /users
        id: formData.id,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        name: formData.name,
        nickname: formData.nickname,
        residentRegistrationNumber: residentRegistrationNumberWithoutHyphen,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        address: formData.address,
        detailedAddress: formData.detailedAddress,
        businessRegistrationNumber: formData.userType === 'NPC' ? formData.businessRegistrationNumber : undefined,
      });
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Handle specific conflict errors from backend
        if (Array.isArray(error.response.data.message)) {
            setErrors({ ...errors, form: error.response.data.message.join(', ') });
        } else {
            setErrors({ ...errors, form: error.response.data.message });
        }
      } else {
        setErrors({ ...errors, form: '회원가입 중 오류가 발생했습니다.' });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-light dark:bg-primary-dark p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-secondary-light dark:bg-secondary-dark rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-text-light dark:text-text-dark">회원가입</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* User Type */}
          <div className='text-text-light dark:text-text-dark'>
            <label className="block text-sm font-medium mb-2">회원 타입</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="userType" value="NORMAL" checked={formData.userType === 'NORMAL'} onChange={handleInputChange} className="mr-2"/>
                일반 회원
              </label>
              <label className="flex items-center">
                <input type="radio" name="userType" value="NPC" checked={formData.userType === 'NPC'} onChange={handleInputChange} className="mr-2"/>
                기업 회원 (NPC)
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">ID</label>
              <input name="id" type="text" required value={formData.id} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
              {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">닉네임</label>
              <input name="nickname" type="text" required value={formData.nickname} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
              {errors.nickname && <p className="text-sm text-red-500">{errors.nickname}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">이메일</label>
              <input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">전화번호</label>
              <input name="phoneNumber" type="tel" required value={formData.phoneNumber} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
              {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">비밀번호</label>
              <input name="password" type="password" required value={formData.password} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">비밀번호 확인</label>
              <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">이름</label>
              <input name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Resident Registration Number */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">주민번호</label>
              <input name="residentRegistrationNumber" type="text" required value={formData.residentRegistrationNumber} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" placeholder="YYMMDD-XXXXXXX"/>
              {errors.residentRegistrationNumber && <p className="text-sm text-red-500">{errors.residentRegistrationNumber}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">성별</label>
              <select name="gender" required value={formData.gender} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                <option value="">선택...</option>
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
              </select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark">주소</label>
            <div className="flex items-center gap-2 mt-1">
              <input name="address" type="text" required value={formData.address} className="flex-grow p-2 border rounded bg-gray-100 dark:bg-gray-800 cursor-not-allowed" readOnly placeholder="주소 검색 버튼을 클릭하세요"/>
              <button type="button" onClick={handleAddressSearch} className="flex-shrink-0 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-text-light dark:text-text-dark rounded shadow-sm hover:bg-gray-400 dark:hover:bg-gray-500">주소 검색</button>
            </div>
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
          </div>

          {/* Detailed Address */}
          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark">상세주소</label>
            <input name="detailedAddress" type="text" required value={formData.detailedAddress} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
            {errors.detailedAddress && <p className="text-sm text-red-500">{errors.detailedAddress}</p>}
          </div>

          {/* Business Registration Number (Conditional) */}
          {formData.userType === 'NPC' && (
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark">사업자등록번호</label>
              <input name="businessRegistrationNumber" type="text" required={formData.userType === 'NPC'} value={formData.businessRegistrationNumber} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
              {errors.businessRegistrationNumber && <p className="text-sm text-red-500">{errors.businessRegistrationNumber}</p>}
            </div>
          )}

          {errors.form && <p className="text-sm text-red-500 text-center">{errors.form}</p>}
          
          <div>
            <button type="submit" className="w-full mt-4 px-4 py-3 text-lg font-semibold text-white bg-accent rounded-md hover:bg-blue-400">
              회원가입
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <p className="text-gray-600 dark:text-gray-400">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="font-medium text-accent hover:text-blue-400">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
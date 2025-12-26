import { Routes, Route, Navigate } from 'react-router-dom';

// 로그인
import Login from './auth/login/Login';

// 회원가입 공통
import SelectUserType from './auth/signup/SelectUserType';

// 기업 회원가입
import Step1CompanyInfo from './auth/signup/corporate/Step1CompanyInfo';
import Step2BusinessLicense from './auth/signup/corporate/Step2BusinessLicense';
import Step3BusinessInfo from './auth/signup/corporate/Step3BusinessInfo';

// 학생 쇼핑몰
import Studentshopping from './app/student/Studentshopping';
import Step1BasicInfo from './app/corporate/samplingrequest/Step1BasicInfo';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* 회원가입 */}
      <Route path="/signup" element={<SelectUserType />} />

      {/* 기업 회원가입 */}
      <Route path="/signup/corporate/step1" element={<Step1CompanyInfo />} />
      <Route
        path="/signup/corporate/step2"
        element={<Step2BusinessLicense />}
      />
      <Route path="/signup/corporate/step3" element={<Step3BusinessInfo />} />

      {/* 학생 쇼핑몰 */}
      <Route path="/studentshopping" element={<Studentshopping />} />

      {/* 기업 샘플링 요청 */}
      <Route
        path="/corporatesamplingrequest/step1"
        element={<Step1BasicInfo />}
      />
    </Routes>
  );
}

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
import CompanyDetail from './app/student/CompanyDetail';
import ProductDetail from './app/student/ProductDetail';
import Cart from './app/student/Cart';
import Order from './app/student/Order';
import OrderComplete from './app/student/OrderComplete';

// 학생 단체 제휴/샘플링 요청
import Step1StudentInfo from './app/student/Step1StudentInfo';
import Step2StudentEventInfo from './app/student/Step2StudentEventInfo'; // 2단계 추가

// 기업 샘플링 요청
import Step1BasicInfo from './app/corporate/samplingrequest/Step1BasicInfo';
import Step2TargetSet from './app/corporate/samplingrequest/Step2TargetSet';

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
      <Route path="/studentshopping/:companyId" element={<CompanyDetail />} />
      <Route
        path="/studentshopping/:companyId/products/:productId"
        element={<ProductDetail />}
      />
      <Route path="/studentshopping/cart" element={<Cart />} />
      <Route path="/studentshopping/order" element={<Order />} />
      <Route
        path="/studentshopping/order/complete"
        element={<OrderComplete />}
      />

      {/* 학생 단체 제휴 / 샘플링 요청 */}
      <Route path="/studentsampling/step1" element={<Step1StudentInfo />} />
      {/* 2단계: 행사 정보 라우트 추가 */}
      <Route
        path="/studentsampling/step2"
        element={<Step2StudentEventInfo />}
      />

      {/* 기업 샘플링 요청 */}
      <Route
        path="/corporatesamplingrequest/step1"
        element={<Step1BasicInfo />}
      />
      <Route
        path="/corporatesamplingrequest/step2"
        element={<Step2TargetSet />}
      />
    </Routes>
  );
}

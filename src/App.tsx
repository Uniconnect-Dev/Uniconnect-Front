import { Routes, Route, Navigate } from 'react-router-dom';

// 로그인
import Login from './auth/login/Login';

SignUpComplete;
// 회원가입 공통
import SelectUserType from './auth/signup/SelectUserType';
import SignUpComplete from './auth/signup/SignUpComplete';

// 기업 회원가입
import Step1CompanyInfo from './auth/signup/corporate/Step1CompanyInfo';
import Step2BusinessLicense from './auth/signup/corporate/Step2BusinessLicense';
import Step3BusinessInfo from './auth/signup/corporate/Step3BusinessInfo';

// 학생 단체 회원가입
import Step1StaffInfo from './auth/signup/student/Step1StaffInfo';
import Step2UnivInfo from './auth/signup/student/Step2UnivInfo';

// 학생 쇼핑몰
import Studentshopping from './app/student/Studentshopping';
import CompanyDetail from './app/student/CompanyDetail';
import ProductDetail from './app/student/ProductDetail';
import Cart from './app/student/Cart';
import Order from './app/student/Order';
import OrderComplete from './app/student/OrderComplete';

// 학생 단체 제휴/샘플링 요청
import Step1StudentInfo from './app/student/forms/Step1StudentInfo';
import Step2StudentEventInfo from './app/student/forms/Step2StudentEventInfo';
import Step3ChooseCorporate from './app/student/forms/Step3ChooseCorporate';
import Step4Agreements from './app/student/forms/Step4Agreements';
import Step5Agreements from './app/student/forms/Step5Complete';

//학생 마이페이지
import StuContract from './app/student/mypage/Contract';

// 기업 샘플링 요청
import Step1BasicInfo from './app/corporate/samplingrequest/Step1BasicInfo';
import Step2TargetSet from './app/corporate/samplingrequest/Step2TargetSet';
import Step3Matching from './app/corporate/samplingrequest/Step3Matching';
import Step4Terms from './app/corporate/samplingrequest/Step4Terms';
import StepDone from './app/corporate/samplingrequest/StepDone';

//기업 마이페이지
import CorpContract from './app/corporate/mypage/Contract';
import CorpQnA from './app/corporate/mypage/QnA';

import Step5Complete from './app/student/forms/Step5Complete';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {/* 회원가입 */}
      <Route path="/signup" element={<SelectUserType />} />
      <Route path="/signup/complete" element={<SignUpComplete />} />
      {/* 학생 회원가입 */}
      <Route path="/signup/student/step1" element={<Step1StaffInfo />} />
      <Route path="/signup/student/step2" element={<Step2UnivInfo />} />
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
      <Route
        path="/studentsampling/step2"
        element={<Step2StudentEventInfo />}
      />
      <Route path="/studentsampling/step3" element={<Step3ChooseCorporate />} />
      <Route path="/studentsampling/step4" element={<Step4Agreements />} />
      <Route path="/studentsampling/step5" element={<Step5Complete />} />
      Step5Complete
      {/* 학생 단체 마이페이지*/}
      <Route path="/studentmypage/contract" element={<StuContract />} />
      {/* 기업 샘플링 요청 */}
      <Route
        path="/corporatesamplingrequest/step1"
        element={<Step1BasicInfo />}
      />
      <Route
        path="/corporatesamplingrequest/step2"
        element={<Step2TargetSet />}
      />
      <Route
        path="/corporatesamplingrequest/step3"
        element={<Step3Matching />}
      />
      <Route path="/corporatesamplingrequest/step4" element={<Step4Terms />} />
      <Route path="/corporatesamplingrequest/stepDone" element={<StepDone />} />
      {/* 기업 마이페이지*/}
      <Route path="/corporatemypage/contract" element={<CorpContract />} />
      <Route path="/corporatemypage/QnA" element={<CorpQnA />} />
    </Routes>
  );
}

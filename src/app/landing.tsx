import svgPaths from "../svg-vam1vhmzcx";
import HeroSection from "@/components/domain/landing/HeroSection";
import { IntroSection1, IntroSection2 } from "@/components/domain/landing/IntroSection";
import StepSection from "@/components/domain/landing/StepSection";
import VisualGridSection from "@/components/domain/landing/VisualGridSection";
import FinalCTASection from "@/components/domain/landing/FinalCTASection";

function MdiInstagram() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:instagram">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:instagram">
          <path d={svgPaths.p2c5f2300} fill="var(--fill-0, #949BA7)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame 2087329276">
          <rect height="14" id="Rectangle 32922" rx="3" stroke="var(--stroke-0, #949BA7)" strokeWidth="2" width="18" x="3" y="5" />
          <path d="M6.5 9L12 12L17.5 9" id="Vector 166" stroke="var(--stroke-0, #949BA7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <MdiInstagram />
      <Frame8 />
    </div>
  );
}

function Group12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[293.226px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 293.226 24">
        <g id="Group 2085665311">
          <g id="Vector">
            <path d={svgPaths.p1c000400} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2d23da00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p252cd200} fill="var(--fill-0, black)" />
          </g>
          <g id="Vector_2">
            <path d={svgPaths.p8ea5c00} fill="var(--fill-0, #297CFF)" />
            <path d={svgPaths.p3c0b7c00} fill="var(--fill-0, #297CFF)" />
            <path d={svgPaths.p2d841200} fill="var(--fill-0, #297CFF)" />
          </g>
          <g id="Clip path group">
            <mask height="23" id="mask0_1_781" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="257" x="37" y="1">
              <g id="clip0_873_155">
                <path d={svgPaths.p12e6d280} fill="var(--fill-0, white)" id="Vector_3" />
              </g>
            </mask>
            <g mask="url(#mask0_1_781)">
              <path d={svgPaths.p2465600} fill="var(--fill-0, black)" id="Vector_4" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0 w-full">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6c727e] text-[14px] text-nowrap tracking-[-0.21px]">Service Terms and Conditions</p>
      <div className="h-[8.5px] relative shrink-0 w-0">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 8.5">
            <path d="M0.5 0V8.5" id="Vector 160" stroke="var(--stroke-0, #949BA7)" />
          </svg>
        </div>
      </div>
      <p className="font-['Pretendard:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6c727e] text-[14px] text-nowrap tracking-[-0.21px]">Privacy Policy</p>
      <div className="h-[8.5px] relative shrink-0 w-0">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 8.5">
            <path d="M0.5 0V8.5" id="Vector 160" stroke="var(--stroke-0, #949BA7)" />
          </svg>
        </div>
      </div>
      <p className="font-['Pretendard:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6c727e] text-[14px] text-nowrap tracking-[-0.21px]">{`Partnership Q&A`}</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#b4bbc7] text-[14px] tracking-[-0.21px] w-full">© UNI:CONNECT. All Rights Reserved.</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-[402px]">
      <Group12 />
      <Frame10 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="h-0 relative shrink-0 w-[1200px]">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 1">
            <path d="M0 0.5H1200" id="Vector 162" stroke="var(--stroke-0, #EBEEF3)" />
          </svg>
        </div>
      </div>
      <Frame11 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[18px] items-start left-0 px-[120px] py-[64px] top-0 w-[1440px]">
      <Frame9 />
      <Frame12 />
    </div>
  );
}

function Floating() {
  return (
    <div className="absolute bottom-[88px] left-[1264px] size-[64px]" data-name="floating">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="floating">
          <rect fill="var(--fill-0, #585F69)" height="64" rx="32" width="64" />
          <path d={svgPaths.p4a3580} fill="var(--fill-0, #FBFCFD)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#fbfcfd] h-[298px] overflow-clip relative shrink-0 w-full" data-name="footer">
      <Frame13 />
      <Floating />
    </div>
  );
}

export default function Component() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="[공통] 랜딩 페이지">
      <HeroSection />
      <IntroSection1 />
      <IntroSection2 />
      <StepSection />
      <VisualGridSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}

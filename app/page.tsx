'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Prototype11Landing() {
  const router = useRouter();

  const handleKakaoStart = () => {
    // 실제로는 카카오 OAuth 호출
    // 프로토타입에서는 바로 대시보드로 이동
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-md mx-auto px-6 py-16">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">👀</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            쿼리데일리
          </h1>
          <p className="text-gray-600 text-lg">
            매일 3문제, 다른 사람의 생각 엿보기
          </p>
        </div>

        {/* Value Props */}
        <div className="space-y-4 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-indigo-200">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📝</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">매일 딱 3문제</h3>
                <p className="text-sm text-gray-600">부담 없이 습관으로</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-indigo-200">
            <div className="flex items-start gap-4">
              <span className="text-3xl">👀</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">답변 후 바로 훔쳐보기</h3>
                <p className="text-sm text-gray-600">현직자는 어떻게 답할까?</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-indigo-200">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💎</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">공유하면 인사이트 적립</h3>
                <p className="text-sm text-gray-600">답변 공유로 포인트 획득</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kakao CTA */}
        <button
          onClick={handleKakaoStart}
          className="w-full py-5 bg-[#FEE500] hover:bg-[#FDD835] text-gray-900 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl mb-4"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.794 1.828 5.25 4.574 6.674-.193.71-.675 2.483-.773 2.87-.117.464.17.458.358.333.155-.103 2.515-1.726 3.608-2.47.74.102 1.5.156 2.28.156 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
          </svg>
          카카오톡으로 3초 만에 시작하기
        </button>

        {/* Prototype Testing Links */}
        <div className="space-y-3 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-300">
            <p className="text-xs text-gray-500 mb-3 text-center font-semibold">🔬 프로토타입 테스트</p>
            <div className="space-y-2">
              <Link
                href="/compare"
                className="block w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold text-sm transition-all text-center shadow-md hover:shadow-lg"
              >
                📊 3가지 옵션 비교 (Day 1)
              </Link>
              <Link
                href="/compare-next-day"
                className="block w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold text-sm transition-all text-center shadow-md hover:shadow-lg"
              >
                📅 3가지 옵션 비교 (Day 2)
              </Link>
              <Link
                href="/compare-day3"
                className="block w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-semibold text-sm transition-all text-center shadow-md hover:shadow-lg"
              >
                🎉 3가지 옵션 비교 (Day 3)
              </Link>
              <Link
                href="/onboarding"
                className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg font-semibold text-sm transition-all text-center shadow-md hover:shadow-lg"
              >
                📚 온보딩 체험하기
              </Link>
            </div>
          </div>
        </div>

        {/* Wireframe Link */}
        <Link
          href="/wireframe"
          className="block w-full py-4 bg-white text-gray-900 rounded-xl font-bold text-base transition-all text-center shadow-lg hover:shadow-xl border-2 border-gray-300 hover:border-emerald-400"
        >
          🖼️ 전체 와이어프레임 보기
        </Link>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-12">
          v11: 초심플 훔쳐보기 루틴
        </p>
      </div>
    </div>
  );
}

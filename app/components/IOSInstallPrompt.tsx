'use client';

import { useState, useEffect } from 'react';

export default function IOSInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Check if already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    // Check if dismissed recently
    const dismissed = localStorage.getItem('ios-install-dismissed');
    const daysSinceDismissal = dismissed
      ? (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24)
      : 999;

    // Show prompt if:
    // 1. iOS device
    // 2. Not already installed
    // 3. Not dismissed within 7 days
    if (isIOS && !isStandalone && daysSinceDismissal > 7) {
      // Delay to not overwhelm user
      setTimeout(() => setShowPrompt(true), 3000);
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('ios-install-dismissed', Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-4 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-4 border-2 border-white/20">
        <div className="flex items-start gap-3">
          <div className="text-3xl">📱</div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-sm mb-1">
              쿼리데일리 앱 설치하기
            </h3>
            <p className="text-white/90 text-xs mb-3">
              Safari 하단의 <span className="inline-flex items-center mx-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
                </svg>
              </span> 공유 버튼을 누른 후<br/>
              "홈 화면에 추가"를 선택하세요
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 bg-white/20 rounded-lg p-2 text-center">
                <div className="text-2xl mb-1">1️⃣</div>
                <div className="text-white text-xs">공유 버튼</div>
              </div>
              <div className="text-white text-xl">→</div>
              <div className="flex-1 bg-white/20 rounded-lg p-2 text-center">
                <div className="text-2xl mb-1">➕</div>
                <div className="text-white text-xs">홈 화면에<br/>추가</div>
              </div>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button
          onClick={handleDismiss}
          className="mt-3 w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors"
        >
          나중에
        </button>
      </div>
    </div>
  );
}

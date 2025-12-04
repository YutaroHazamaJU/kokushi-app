// src/App.jsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuestionList from './components/QuestionList';
import { questionList } from './questions';
import PasswordGate from './components/PasswordGate';

const App = () => {
  // null のときはトップ（問題一覧）を表示
  const [currentId, setCurrentId] = useState(null);
  const [initialIdFilter, setInitialIdFilter] = useState('');

  // URL クエリ（?ids=99-174,101-176 など）から初期 ID フィルタを読む
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ids = params.get('ids');
    if (ids) {
      setInitialIdFilter(ids);
    }
  }, []);

  // 選択中の問題コンポーネントを questionList から取得
  const CurrentQuestion = currentId
    ? questionList.find((q) => q.id === currentId)?.component
    : null;

  return (
    <PasswordGate
      correctPassword="kokushi2025"          // ★ 任意のパスワードに変更OK
      storageKey="kokushi-app-unlocked"     // kokushi-app 用のlocalStorageキー
    >
      <div className="font-sans text-gray-800 overflow-hidden">
        <AnimatePresence mode="wait">
          <div key={currentId || 'menu'} className="h-full">
            {CurrentQuestion ? (
              // 問題画面（各 Qxx_xxx コンポーネント）
              <CurrentQuestion onBack={() => setCurrentId(null)} />
            ) : (
              // トップ画面：フィルタ付き問題一覧
              <QuestionList
                questions={questionList}
                onSelect={(id) => setCurrentId(id)}
                initialIdFilter={initialIdFilter}
              />
            )}
          </div>
        </AnimatePresence>
      </div>
    </PasswordGate>
  );
};

export default App;
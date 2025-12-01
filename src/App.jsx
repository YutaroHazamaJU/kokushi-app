import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuestionList from './components/QuestionList';
import { questionList } from './questions';

// ==========================================
// アプリ本体
// ==========================================
const App = () => {
  // null のときはトップ（問題一覧）を表示
  const [currentId, setCurrentId] = useState(null);

  // 選択中の問題コンポーネントを questionList から取得
  const CurrentQuestion = currentId
    ? questionList.find((q) => q.id === currentId)?.component
    : null;

  return (
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
  );
};

export default App;
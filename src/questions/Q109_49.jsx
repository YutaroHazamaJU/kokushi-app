// src/questions/Q109_49.jsx
import React, { useState } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第109回 問49：液体の表面張力の測定法
// ==========================================
const Q109_49 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  const titles = [
    '問題の確認',
    'Step 1：表面張力って何？どんな測定法がある？',
    'Step 2：各選択肢の原理と測定対象',
    'Step 3：正解とまとめ',
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      // ------------------- Step 0 -------------------
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第109回 問49
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  物理薬剤：液体の表面張力の測定法
                </h4>
              </div>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                液体の表面張力を測定する方法はどれか。1つ選べ。
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ul className="space-y-1 text-gray-800">
                  <li>1　溶解度法</li>
                  <li>2　沈降法</li>
                  <li>3　吸着法</li>
                  <li>4　滴重法</li>
                  <li>5　反応速度法</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm md:text-base flex items-start">
                <Lightbulb className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                <p className="text-gray-800">
                  <span className="font-bold">ポイント：</span>
                  「何をどんな原理で測っている方法か」を整理できれば、
                  表面張力に関係するものだけを選べます。
                  他の選択肢は、溶解度・粒子径・比表面積・反応速度など
                  <span className="font-bold mx-1">別の物性値</span>
                  を測る方法です。
                </p>
              </div>
            </div>
          </div>
        );

      // ------------------- Step 1 -------------------
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              表面張力と測定法のイメージ
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-sm md:text-base text-gray-800">
                <span className="font-bold">表面張力</span>は、
                液体表面を 1 m だけ新しくつくるのに必要な仕事
                （エネルギー）で、「液面ができるだけ小さくなろうとする
                性質」を表す物性です。
              </p>

              <div className="bg-blue-50 rounded-lg p-4 text-xs md:text-sm text-gray-800 space-y-2">
                <p className="font-bold text-blue-800">
                  薬剤学でよく出てくる表面張力測定法
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-bold">滴重法（本問の正解）</span>：
                    細い管の先から落ちる滴の重さ（または体積）から求める。
                  </li>
                  <li>
                    <span className="font-bold">毛管上昇法</span>：
                    細管内での液柱の高さから求める。
                  </li>
                  <li>
                    <span className="font-bold">リング法（Du Noüy 法）</span>：
                    白金リングを液面から引き上げるときの力を測る。
                  </li>
                  <li>
                    <span className="font-bold">Wilhelmy プレート法</span>：
                    板を液に浸したときの浸漬力から求める。
                  </li>
                </ul>
                <p className="text-xs md:text-sm text-gray-700">
                  いずれも「液体表面に働く力」を直接または間接的に測り、
                  そこから表面張力 γ を計算する方法です。
                </p>
              </div>

              {/* 滴重法のイメージ図 */}
              <div className="mt-4 flex justify-center">
                <svg
                  viewBox="0 0 320 140"
                  className="w-full max-w-md"
                  aria-label="滴重法の模式図"
                >
                  {/* 液だめ */}
                  <rect
                    x="40"
                    y="70"
                    width="240"
                    height="50"
                    fill="#dbeafe"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  />
                  <text x="50" y="65" fontSize="12" fill="#374151">
                    試料液
                  </text>

                  {/* 細いガラス管 */}
                  <rect x="150" y="20" width="20" height="50" fill="#e5e7eb" />
                  <rect x="155" y="18" width="10" height="6" fill="#9ca3af" />
                  <text x="170" y="30" fontSize="10" fill="#374151">
                    細管
                  </text>

                  {/* 落ちかけの液滴 */}
                  <path
                    d="M160 70 C150 85 155 100 160 105 C165 100 170 85 160 70 Z"
                    fill="#bfdbfe"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                  />
                  <text x="175" y="100" fontSize="10" fill="#374151">
                    滴 1 個の重さ → γ
                  </text>
                </svg>
              </div>

              <p className="text-xs md:text-sm text-gray-700">
                滴重法では、
                一定条件で落ちる滴 1 個の重さ
                <span className="font-mono mx-1">W</span> が
                表面張力 γ に比例することを利用します。
                水など既知の液体と比較して、未知試料の γ を求めます。
              </p>
            </div>
          </div>
        );

      // ------------------- Step 2 -------------------
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              各選択肢の原理と「何を測る方法か」
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              {/* 1 溶解度法 */}
              <div className="border-l-4 border-gray-400 pl-3">
                <p className="font-bold text-gray-800 mb-1">
                  1 溶解度法　→　<strong className="text-red-600">× 表面張力の測定法ではない</strong>
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  溶質を溶媒に加えてゆき、
                  <span className="font-bold">飽和に達したときの濃度（溶解度）</span>
                  を測定する方法です。薬物の溶解性評価、pH–溶解度プロファイル、
                  製剤設計（経口・注射剤など）の基礎データとして重要ですが、
                  <span className="font-bold mx-1">表面張力 γ は直接求まりません。</span>
                </p>
              </div>

              {/* 2 沈降法 */}
              <div className="border-l-4 border-gray-400 pl-3">
                <p className="font-bold text-gray-800 mb-1">
                  2 沈降法　→　<strong className="text-red-600">× 表面張力の測定法ではない</strong>
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  懸濁液やエマルションにおいて、粒子や液滴が
                  <span className="font-bold">沈降する速度</span>を測り、
                  <span className="font-bold">粒子径や密度・粘度</span>などを Stokes の式から推定する方法です。
                  懸濁製剤の安定性評価などに用いられますが、
                  <span className="font-bold mx-1">表面張力そのものは対象外</span>
                  です。
                </p>
              </div>

              {/* 3 吸着法 */}
              <div className="border-l-4 border-gray-400 pl-3">
                <p className="font-bold text-gray-800 mb-1">
                  3 吸着法　→　<strong className="text-red-600">× 表面張力の測定法ではない</strong>
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  固体表面に気体（N
                  <sub>2</sub> など）や溶質が吸着する量を測定し、
                  <span className="font-bold">比表面積や表面の性質</span>
                  を求める方法です（BET 法など）。
                  打錠用粉体の表面積評価、担体の特性評価などで重要ですが、
                  <span className="font-bold mx-1">
                    測っているのは「固体の表面積」であり、液体の表面張力ではありません。
                  </span>
                </p>
              </div>

              {/* 4 滴重法 */}
              <div className="border-l-4 border-green-500 pl-3 bg-green-50/60 rounded-md">
                <p className="font-bold text-gray-800 mb-1">
                  4 滴重法　→　
                  <strong className="text-green-700">○ 液体の表面張力を測定する方法</strong>
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  細い管の先から連続して滴下する
                  <span className="font-bold">液滴 1 個の重さ（または体積）</span>
                  を測定し、その値が表面張力 γ に比例することを利用する方法です。
                  既知の表面張力をもつ標準液（水など）との
                  <span className="font-bold mx-1">比較測定</span>
                  により、試料液の表面張力を求めます。
                </p>
                <p className="mt-1 text-xs md:text-sm text-gray-600">
                  実際には、滴数と質量から「1 滴の質量」を求め、
                  Tate の式（W ∝ γ）を用いて γ を計算します。
                  小型装置で扱いやすく、薬剤学の教科書でも代表的測定法として紹介されています。
                </p>
              </div>

              {/* 5 反応速度法 */}
              <div className="border-l-4 border-gray-400 pl-3">
                <p className="font-bold text-gray-800 mb-1">
                  5 反応速度法　→　<strong className="text-red-600">× 表面張力の測定法ではない</strong>
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  反応物や生成物の濃度変化を時間とともに追い、
                  <span className="font-bold">速度定数や反応次数、活性化エネルギー</span>
                  を求める方法です。薬物の分解・安定性評価や、
                  製剤の有効期限設定などで重要ですが、
                  <span className="font-bold mx-1">対象は「反応速度」であり、表面張力ではありません。</span>
                </p>
              </div>
            </div>
          </div>
        );

      // ------------------- Step 3 -------------------
      case 3:
        return (
          <div className="space-y-8 text-center h-full flex flex-col justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-orange-100 max-w-xl mx-auto"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                解説終了：正解は「4　滴重法」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                滴重法は、細い管から落ちる 1 滴の重さ（または体積）が
                表面張力 γ に比例することを利用して、
                <span className="font-bold mx-1">液体の表面張力を測定する方法</span>
                です。
                他の選択肢は、溶解度・粒子の沈降挙動・固体表面への吸着・
                化学反応速度など、別の物性を測定する方法でした。
              </p>

              <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-700">
                <p className="font-bold mb-2">【重要ポイントのまとめ】</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    表面張力 γ は「液面を小さくしようとする力」であり、
                    界面現象・ぬれ・界面活性剤の評価に重要な物性である。
                  </li>
                  <li>
                    表面張力測定には、滴重法・毛管上昇法・リング法・
                    Wilhelmy プレート法などがある。
                  </li>
                  <li>
                    溶解度法・沈降法・吸着法・反応速度法は、
                    それぞれ
                    <span className="font-mono mx-1">
                      溶解度／粒子径・密度／比表面積／速度定数
                    </span>
                    を測る方法であり、表面張力ではない。
                  </li>
                  <li>
                    「何をどんな原理で測っているのか」を
                    キーワードとセットで覚えると、
                    国家試験の類題にも対応しやすくなる。
                  </li>
                </ul>
              </div>
            </motion.div>

            <button
              onClick={onBack}
              className="px-8 py-4 bg-gray-800 text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition shadow-lg mx-auto"
            >
              問題一覧に戻る
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="flex flex-col h-screen bg-white"
    >
      {/* 上部バー */}
      <div className="bg-orange-500 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-orange-400 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第109回 問49：ステップ解説</h1>
        </div>
        <div className="text-sm bg-orange-600 px-3 py-1 rounded-full">
          Step {step + 1} / {titles.length}
        </div>
      </div>

      {/* 中央：スライド本体 */}
      <Slide className="relative">
        <SectionTitle>{titles[step]}</SectionTitle>
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent(step)}
            </motion.div>
          </AnimatePresence>
        </div>
      </Slide>

      {/* 下部：ナビボタン */}
      <div className="p-4 border-t bg-gray-50 flex justify-between z-10">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className={`px-6 py-3 rounded-lg font-bold flex items-center ${
            step === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'bg-white border hover:bg-gray-100 text-gray-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> 前へ
        </button>
        <button
          onClick={() => setStep(Math.min(titles.length - 1, step + 1))}
          disabled={step === titles.length - 1}
          className={`px-6 py-3 rounded-lg font-bold flex items-center ${
            step === titles.length - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md'
          }`}
        >
          {step === 0 ? '解法ステップへ' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q109_49;
// src/questions/Q106_51.jsx
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
// 第106回 問51：分散系・界面現象（拡張ぬれ）
// ==========================================
const Q106_51 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  const titles = [
    '問題の確認',
    'Step 1：ヤングの式と拡張ぬれ',
    'Step 2：式に代入して固液界面張力を求める',
    'Step 3：選択肢の確認とまとめ',
  ];

  const solidGamma = 585; // 固体表面張力 (mN/m)
  const waterGamma = 73; // 水の表面張力 (mN/m)
  const solidLiquidGamma = solidGamma - waterGamma; // S = 0 とおいたときの γ_SL

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第106回 問51
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  物理薬剤：拡張ぬれと固液界面張力
                </h4>
              </div>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                一定温度において、ある固体表面に水が薄膜状に拡がり、
                <span className="font-bold text-red-600">拡張ぬれ</span>
                が成立するときの
                <span className="font-bold text-blue-600 mx-1">
                  固液界面張力（mN/m）
                </span>
                はどれか。1つ選べ。
                <br />
                なお、固体の表面張力は
                <span className="font-bold mx-1">585 mN/m</span>、
                水の表面張力は
                <span className="font-bold mx-1">73 mN/m</span>とする。
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ul className="space-y-1 text-gray-800">
                  <li>1　73</li>
                  <li>2　439</li>
                  <li>3　512</li>
                  <li>4　585</li>
                  <li>5　658</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm md:text-base flex items-start">
                <Lightbulb className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                <p className="text-gray-800">
                  <span className="font-bold">ポイント：</span>
                  「拡張ぬれが成立する」とは、液滴ではなく
                  <span className="font-bold">固体表面に液が薄い膜として広がる状態</span>
                  のことです。
                  このとき接触角は <span className="font-mono">θ = 0°</span> となり、
                  <span className="font-bold mx-1">ヤングの式</span>
                  で
                  <span className="font-mono mx-1">cos θ = 1</span>
                  とおけるのが解法のカギになります。
                </p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              ヤングの式と拡張ぬれのイメージ
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-sm md:text-base text-gray-800">
                固体表面上の液体の「ぬれ」は、
                <span className="font-bold mx-1">接触角 θ</span>
                で評価するのが薬学では一般的です。
                θ の大きさによって、液がどの程度広がるかが決まります。
              </p>

              <div className="bg-blue-50 rounded-lg p-4 text-xs md:text-sm text-gray-800">
                <p className="font-bold text-blue-800 mb-2">接触角による 3 つのぬれ</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-bold">拡張ぬれ</span>：θ = 0°
                    （液が全面に薄膜となって広がる）
                  </li>
                  <li>
                    <span className="font-bold">浸漬ぬれ</span>：0° &lt; θ ≦ 90°
                    （よく濡れている状態）
                  </li>
                  <li>
                    <span className="font-bold">付着ぬれ</span>：90° &lt; θ &lt; 180°
                    （あまり濡れず、液滴に近い）
                  </li>
                </ul>
                <p className="mt-2">
                  本問の「拡張ぬれ」は、
                  <span className="font-mono mx-1">θ = 0°</span>
                  の極限状態を表します。
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                <svg
                  viewBox="0 0 320 90"
                  className="w-full max-w-md"
                  aria-label="接触角によるぬれの模式図"
                >
                  {/* 固体表面 */}
                  <rect x="10" y="60" width="300" height="8" fill="#e5e7eb" />

                  {/* θ = 0° 完全なぬれ */}
                  <rect x="25" y="58" width="60" height="4" fill="#bfdbfe" />
                  <text x="30" y="50" fontSize="10" fill="#374151">
                    θ = 0°
                  </text>

                  {/* 0 < θ < 90° 浸漬ぬれ */}
                  <path
                    d="M140 60 Q 155 40 170 60 Z"
                    fill="#bfdbfe"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                  />
                  <text x="135" y="50" fontSize="10" fill="#374151">
                    0° &lt; θ &lt; 90°
                  </text>

                  {/* θ > 90° 付着ぬれ */}
                  <path
                    d="M240 60 Q 250 35 260 60 Z"
                    fill="#bfdbfe"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                  />
                  <text x="235" y="50" fontSize="10" fill="#374151">
                    θ &gt; 90°
                  </text>
                </svg>
              </div>
            </div>

            {/* ★ ここから追加：ヤングの式の解説とベクトル図 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-800 mb-2">
                ヤングの式：接触角と界面張力ベクトル
              </h4>
              <p className="text-sm md:text-base text-gray-800 mb-2">
                固体表面上の液滴を考えると、接触線まわりで
                <span className="font-bold mx-1">力のつり合い</span>
                をとることで、接触角
                <span className="font-mono mx-1">θ</span>
                を表す
                <span className="font-bold mx-1">ヤングの式</span>
                が得られます。
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-700 mb-1">
                  ヤングの式（固体表面に平行な方向の力のつり合い）
                </p>
                <p className="text-xl md:text-2xl font-mono font-bold text-indigo-700">
                  γ<sub>SV</sub> = γ<sub>SL</sub> + γ<sub>LV</sub> cos θ
                </p>
                <p className="mt-2 text-xs md:text-sm text-gray-600">
                  ⇔ cos θ = (γ<sub>SV</sub> − γ<sub>SL</sub>)
                  / γ<sub>LV</sub>
                </p>
              </div>
              <p className="text-xs md:text-sm text-gray-700">
                ここでも
                γ<sub>SV</sub>：固体–気体、
                γ<sub>LV</sub>：液体–気体、
                γ<sub>SL</sub>：固体–液体の界面張力です。
                θ は固体表面と液滴の接線で測る
                <span className="font-bold mx-1">接触角</span>
                です。
              </p>

              <div className="mt-4 flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="flex-1 flex items-center justify-center">
                  <svg
                    viewBox="0 0 320 180"
                    className="w-full max-w-xs"
                    aria-label="ヤングの式の模式図"
                  >
                    {/* 固体表面 */}
                    <rect x="20" y="120" width="280" height="18" fill="#e5e7eb" />

                    {/* 液滴（円弧で表現） */}
                    <path
                      d="M70 120 Q 170 30 270 120 Z"
                      fill="#dbeafe"
                      stroke="#60a5fa"
                      strokeWidth="2"
                    />

                    {/* 接触角 θ の弧 */}
                    <path
                      d="M70 120 A 26 26 0 0 1 100 96"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                    />
                    <text x="104" y="96" fontSize="11" fill="#f97316">
                      θ
                    </text>

                    {/* γ_LV ベクトル（液体-気体）*/}
                    <line
                      x1="70"
                      y1="120"
                      x2="125"
                      y2="88"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />
                    <text x="128" y="86" fontSize="11" fill="#2563eb">
                      γ_LV
                    </text>

                    {/* γ_LV cosθ の水平方向成分 */}
                    <line
                      x1="70"
                      y1="120"
                      x2="125"
                      y2="120"
                      stroke="#93c5fd"
                      strokeDasharray="4 3"
                      strokeWidth="2"
                    />
                    <text x="128" y="124" fontSize="10" fill="#60a5fa">
                      γ_LV cosθ
                    </text>

                    {/* γ_SV ベクトル（固体-気体）*/}
                    <line
                      x1="70"
                      y1="120"
                      x2="150"
                      y2="120"
                      stroke="#16a34a"
                      strokeWidth="2.5"
                    />
                    <text x="153" y="132" fontSize="11" fill="#16a34a">
                      γ_SV
                    </text>

                    {/* γ_SL ベクトル（固体-液体）*/}
                    <line
                      x1="70"
                      y1="120"
                      x2="30"
                      y2="120"
                      stroke="#f97316"
                      strokeWidth="2.5"
                    />
                    <text x="18" y="132" fontSize="11" fill="#f97316">
                      γ_SL
                    </text>
                  </svg>
                </div>
                <p className="flex-1 text-xs md:text-sm text-gray-600">
                  図では、固体表面上の液滴と、接触線まわりの
                  γ<sub>SV</sub>, γ<sub>SL</sub>, γ<sub>LV</sub> の
                  ベクトルを模式的に示しています。
                  ヤングの式は、固体表面に平行な方向での
                  力のつり合いを表していることに注意しましょう。
                </p>
              </div>
            </div>

            {/* ★ ここから追加：接触角によるぬれの分類 */}
            <div className="bg-green-50 rounded-xl p-4 text-sm md:text-base text-gray-800">
              <h4 className="font-bold text-green-800 mb-2">
                接触角による 3 つの「ぬれ」の分類
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="font-bold">拡張ぬれ</span>：
                  θ = 0°（液が全面に薄膜となって広がる）
                </li>
                <li>
                  <span className="font-bold">浸漬ぬれ</span>：
                  0° &lt; θ ≦ 90°（よく濡れている状態）
                </li>
                <li>
                  <span className="font-bold">付着ぬれ</span>：
                  90° &lt; θ &lt; 180°（あまり濡れず、液滴に近い）
                </li>
              </ul>
              <p className="mt-2 text-xs md:text-sm text-gray-700">
                薬剤学では、固体表面への液の広がりや、懸濁剤・乳剤・
                コーティングなどでの「ぬれ」の良し悪しを評価するときに、
                接触角 θ と界面張力 γ を組み合わせて考えます。
                本問の「拡張ぬれ」は θ → 0° の典型例です。
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              数値を代入して γ
              <sub>SL</sub>
              を求める
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-sm md:text-base text-gray-800">
                本問で与えられている値：
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm md:text-base text-center leading-relaxed">
                γ<sub>SV</sub>（固体の表面張力） = {solidGamma} mN/m
                <br />
                γ<sub>LV</sub>（水の表面張力） = {waterGamma} mN/m
                <br />
                求めたいもの： γ<sub>SL</sub>（固液界面張力）
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 text-sm md:text-base text-gray-800">
                <p className="font-bold text-yellow-800 mb-2">
                  ヤングの式に θ = 0° を代入して γ<sub>SL</sub> を解く
                </p>
                <p className="font-mono mb-2 text-center">
                  γ<sub>SV</sub> = γ<sub>SL</sub> + γ<sub>LV</sub> cos θ
                </p>
                <p className="text-center mb-2">
                  拡張ぬれでは <span className="font-mono">θ = 0°</span> なので
                  <span className="font-mono mx-1">cos θ = 1</span>
                </p>
                <p className="text-center mb-2 font-mono">
                  γ<sub>SV</sub> = γ<sub>SL</sub> + γ<sub>LV</sub>
                </p>
                <p className="text-center mb-2 font-mono">
                  ⇒ γ<sub>SL</sub> = γ<sub>SV</sub> − γ<sub>LV</sub>
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm md:text-base text-center leading-relaxed">
                γ<sub>SL</sub> = {solidGamma} − {waterGamma} ={' '}
                <span className="text-2xl font-bold text-indigo-700">
                  {solidLiquidGamma}
                </span>{' '}
                mN/m
              </div>

              <p className="text-sm md:text-base text-gray-700 text-center mt-2">
                よって、固液界面張力は
                <span className="font-bold mx-1">
                  {solidLiquidGamma} mN/m
                </span>
                と求まります。
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 text-center h-full flex flex-col justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-purple-100 max-w-xl mx-auto"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                解説終了：正解は「3　512 mN/m」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                拡張ぬれが成立するとき、接触角は
                <span className="font-mono mx-1">θ = 0°</span>
                となります。
                ヤングの式
                <span className="font-mono mx-1">
                  γ<sub>SV</sub> = γ<sub>SL</sub> + γ<sub>LV</sub> cos θ
                </span>
                に θ = 0° を代入すると
                <span className="font-mono mx-1">
                  γ<sub>SV</sub> = γ<sub>SL</sub> + γ<sub>LV</sub>
                </span>
                となり、
                <span className="font-mono mx-1">
                  γ<sub>SL</sub> = γ<sub>SV</sub> − γ<sub>LV</sub>
                </span>
                が得られます。
                数値を代入すると γ<sub>SL</sub> = 585 − 73 = 512 mN/m となります。
              </p>

              <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-700">
                <p className="font-bold mb-2">【重要ポイントのまとめ】</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    拡張ぬれ：液が薄膜として広がる状態で、接触角
                    <span className="font-mono mx-1">θ = 0°</span> とみなせる。
                  </li>
                  <li>
                    ヤングの式
                    <span className="font-mono mx-1">
                      γ<sub>SV</sub> = γ<sub>SL</sub> + γ<sub>LV</sub> cos θ
                    </span>
                    から、θ = 0° では
                    <span className="font-mono mx-1">
                      γ<sub>SL</sub> = γ<sub>SV</sub> − γ<sub>LV</sub>
                    </span>
                    が導ける。
                  </li>
                  <li>
                    与えられた
                    <span className="font-mono mx-1">γ<sub>SV</sub> = 585</span>,
                    <span className="font-mono mx-1">γ<sub>LV</sub> = 73</span>
                    から、固液界面張力は 512 mN/m となる。
                  </li>
                  <li>
                    単位（mN/m）をそろえて計算することも確認ポイント。
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
      <div className="bg-purple-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-purple-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第106回 問51：ステップ解説</h1>
        </div>
        <div className="text-sm bg-purple-700 px-3 py-1 rounded-full">
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
              : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
          }`}
        >
          {step === 0 ? '解法ステップへ' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q106_51;
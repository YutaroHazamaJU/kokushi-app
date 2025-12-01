// src/questions/Q108_175.jsx
import React, { useState } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第108回 問175：弱電解質の溶解平衡
// ==========================================
const Q108_175 = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [openOption, setOpenOption] = useState(null);

  const toggleOption = (index) => {
    setOpenOption(openOption === index ? null : index);
  };

  const options = [
    {
      text: '1. 用いた薬物は1.1 molである。',
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm leading-relaxed">
            グラフより、pH 7 以上では薬物の<strong>総濃度は 1.1 mol/L</strong> で一定です。
            これは「溶けている薬物の濃度」であり、溶液量は 0.1 L なので、
          </p>
          <div className="bg-gray-100 rounded p-2 text-sm font-mono">
            n = C × V = 1.1 mol/L × 0.1 L = 0.11 mol
          </div>
          <p className="mt-2 text-sm">
            よって、<strong>用いた薬物は 0.11 mol 程度</strong>と考えられ、
            1.1 mol ではありません。
          </p>
        </>
      ),
    },
    {
      text: '2. 薬物は弱酸性化合物である。',
      isCorrect: true,
      explanation: (
        <>
          <span className="font-bold text-green-600">【正解】</span>
          <p className="mt-2 text-sm leading-relaxed">
            pH が高くなるほど<strong>総濃度が増加</strong>している一方で、
            pH 5〜7 では<strong>分子形濃度が 0.10 mol/L でほぼ一定</strong>です。
          </p>
          <ul className="mt-2 text-sm list-disc list-inside space-y-1">
            <li>分子形（HA）は固有溶解度に相当し、pH 5〜7 で一定 ≒ 0.10 mol/L</li>
            <li>pH 上昇とともにイオン形（A⁻）が増え、総濃度が増加</li>
          </ul>
          <p className="mt-2 text-sm">
            これは<strong>弱酸性薬物</strong>（S = S₀(1+10<sup>pH−pKa</sup>)）の典型的な挙動なので、
            この選択肢は正しいと判断できます。
          </p>
        </>
      ),
    },
    {
      text: '3. 薬物の pKa は 5 である。',
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm">
            pH 7 のとき、グラフより
          </p>
          <div className="bg-gray-100 rounded p-2 text-sm font-mono">
            総濃度 ≒ 1.1 mol/L
            <br />
            分子形濃度 ≒ 0.10 mol/L
          </div>
          <p className="mt-2 text-sm">
            よってイオン形濃度は 1.1 − 0.10 = 1.0 mol/L であり、
          </p>
          <div className="bg-gray-100 rounded p-2 text-sm font-mono">
            [A⁻]/[HA] ≒ 1.0 / 0.10 = 10
          </div>
          <p className="mt-2 text-sm">
            ヘンダーソン・ハッセルバルヒの式より
          </p>
          <div className="bg-gray-100 rounded p-2 text-sm font-mono">
            pH = pKa + log([A⁻]/[HA]) = pKa + 1
          </div>
          <p className="mt-2 text-sm">
            pH = 7 なので pKa ≒ 6 と求まります。
            <br />
            よって「pKa は 5」は<strong>誤り</strong>です。
          </p>
        </>
      ),
    },
    {
      text: '4. pH 7 のとき、薬物の分子形濃度とイオン形濃度の比は 1：10 である。',
      isCorrect: true,
      explanation: (
        <>
          <span className="font-bold text-green-600">【正解】</span>
          <p className="mt-2 text-sm">
            上と同じく pH 7 では、
          </p>
          <div className="bg-gray-100 rounded p-2 text-sm font-mono">
            [HA] ≒ 0.10 mol/L
            <br />
            [A⁻] ≒ 1.00 mol/L
          </div>
          <p className="mt-2 text-sm">したがって</p>
          <div className="bg-gray-100 rounded p-2 text-sm font-mono">
            分子形 : イオン形 = [HA] : [A⁻] ≒ 0.10 : 1.00 = 1 : 10
          </div>
          <p className="mt-2 text-sm">
            と読めるので、この選択肢は<strong>正しい</strong>です。
          </p>
        </>
      ),
    },
    {
      text: '5. pH 8 のとき、薬物の結晶が液中に存在する。',
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm leading-relaxed">
            pH 7 から 8 にかけて、<strong>総濃度は 1.1 mol/L で一定</strong>です。
            これは「溶けている薬物の総量」が pH によらず一定になっているということなので、
            その範囲では<strong>すでに結晶は全て溶けている</strong>と考えられます。
          </p>
          <p className="mt-2 text-sm">
            結晶が残っているのは、総濃度が pH によって増加している pH 5〜7 付近であり、
            pH 8 では結晶は液中に存在しないと判断できます。
          </p>
        </>
      ),
    },
  ];

  const titles = [
    '問題とグラフの確認',
    'Step 1：グラフから性質を読み取る',
    'Step 2：pKa と量をざっくり計算',
    'Step 3：選択肢ごとの検討',
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第108回 問175
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  物理：弱電解質の溶解平衡
                </h4>
              </div>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                25℃において、水 0.1 L に一定量の一価の弱電解質の薬物結晶を加えた。
                pH を変化させて溶解平衡に達したとき、pH 5 から pH 8 における溶液中の
                <strong className="font-bold mx-1">薬物の総濃度</strong>
                と
                <strong className="font-bold mx-1">分子形薬物濃度</strong>
                が図のようになった。以下の記述のうち、正しいのはどれか。
                <span className="font-bold underline ml-1">2つ選べ。</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                ただし、薬物の分子形とイオン形の溶解平衡時の濃度比は
                Henderson–Hasselbalch の式に従い、薬物の溶解や pH 調整に伴う
                容積変化は無視できるものとする。
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h5 className="font-bold text-gray-800 mb-2">
                  第108回問175：総濃度・分子形濃度のグラフ
                </h5>
                <div className="w-full flex justify-center">
                  <img
                    src="/image/108-175-graph.png"
                    alt="第108回問175：薬物の総濃度と分子形濃度のグラフ"
                    className="w-full max-w-3xl h-auto object-contain border border-gray-200 rounded-md bg-white"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  ※ ブラウザ幅に応じて縮小表示されます（投影時はフルスクリーン推奨）
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm md:text-base">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <div className="space-y-2">
                  {options.map((opt, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-gray-800"
                    >
                      <span className="font-bold w-5 text-right">
                        {i + 1}.
                      </span>
                      <span>{opt.text.replace(/^\d\.\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md inline-flex items-center"
                >
                  解法ステップへ進む
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2">
                まずはグラフの「形」から性質を判断する
              </h4>
              <ul className="list-disc list-inside text-sm md:text-base space-y-2">
                <li>pH が高くなるほど <strong>総濃度が増加</strong> する。</li>
                <li>
                  pH 5〜7 で <strong>分子形濃度が 0.10 mol/L でほぼ一定</strong>。
                </li>
                <li>
                  pH 7 を超えると総濃度は一定 (≒1.1 mol/L)、
                  分子形は減少していく。
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3">
                総濃度と分子形濃度のグラフを並べて確認
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-bold text-gray-700 mb-2">
                    薬物の総濃度
                  </p>
                  <img
                    src="/image/108-175-graph_total.png"
                    alt="第108回問175：薬物の総濃度のグラフ"
                    className="w-full max-w-md h-auto object-contain border border-gray-200 rounded-md bg-white"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-bold text-gray-700 mb-2">
                    分子形薬物濃度
                  </p>
                  <img
                    src="/image/108-175-graph_unionized.png"
                    alt="第108回問175：分子形薬物濃度のグラフ"
                    className="w-full max-w-md h-auto object-contain border border-gray-200 rounded-md bg-white"
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500 text-center">
                左：薬物の総濃度グラフ ／ 右：分子形薬物濃度グラフ
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-sm md:text-base">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                ここから分かること（ざっくり）
              </h4>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  分子形濃度が一定 →{' '}
                  <strong>固有溶解度 S₀ ≒ 0.10 mol/L</strong>
                </li>
                <li>
                  pH 上昇でイオン形が大きく増える →{' '}
                  <strong>弱酸性薬物</strong> の挙動
                </li>
                <li>
                  pH 7 以上で総濃度が一定 →{' '}
                  <strong>その濃度が「加えた薬物の総量」</strong>
                  （結晶はもう残っていない）
                </li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              pKa と「使った量」をざっくり計算
            </h3>

            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">
                1. 使った薬物の物質量
              </h4>
              <p className="text-sm md:text-base mb-2">
                pH 7 以上で総濃度が 1.1 mol/L で一定なので、
                これは<strong>溶けている薬物の総濃度</strong>です。
              </p>
              <div className="bg-gray-50 rounded p-3 font-mono text-sm md:text-base text-center">
                n = C × V = 1.1 mol/L × 0.1 L ={' '}
                <span className="font-bold text-indigo-700">0.11 mol</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                よって、用いた薬物は約 0.11 mol であり、
                <span className="font-bold">1.1 mol ではない</span>と分かります。
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">
                2. pKa を求める（pH 7 のデータを利用）
              </h4>
              <p className="text-sm md:text-base mb-2">pH 7 で、</p>
              <div className="bg-gray-50 rounded p-3 font-mono text-sm md:text-base text-center">
                総濃度 ≒ 1.1 mol/L
                <br />
                分子形濃度 [HA] ≒ 0.10 mol/L
                <br />
                イオン形濃度 [A⁻] ≒ 1.1 − 0.10 = 1.0 mol/L
              </div>
              <p className="mt-2 text-sm md:text-base">よって、</p>
              <div className="bg-gray-50 rounded p-3 font-mono text-sm md:text-base text-center">
                [A⁻]/[HA] ≒ 1.0 / 0.10 = 10
              </div>
              <p className="mt-2 text-sm md:text-base">
                弱酸 HA のヘンダーソン・ハッセルバルヒの式：
              </p>
              <div className="bg-gray-50 rounded p-3 font-mono text-sm md:text-base text-center">
                pH = pKa + log([A⁻]/[HA])
                <br />
                7 = pKa + 1 → pKa ≒ 6
              </div>
              <p className="mt-2 text-sm text-gray-600">
                よって、「pKa = 5」は誤りであることが分かります。
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              選択肢ごとの検討
            </h3>
            <div className="space-y-3">
              {options.map((opt, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleOption(index)}
                    className={`w-full p-3 md:p-4 text-left flex items-start transition-colors ${
                      openOption === index
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`font-bold mr-3 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${
                        opt.isCorrect
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1 text-sm md:text-base">
                      {opt.text}
                    </span>
                    {openOption === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {openOption === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50 px-4 overflow-hidden"
                      >
                        <div className="py-3 border-t border-gray-200 text-sm md:text-base text-gray-700 leading-relaxed">
                          {opt.explanation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm md:text-base">
              <p className="font-bold text-green-800 mb-1">結論</p>
              <p>
                以上より、正しい選択肢は{' '}
                <span className="font-bold text-green-700">2 と 4</span> です。
              </p>
            </div>
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
      <div className="bg-blue-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-blue-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第108回 問175：ステップ解説</h1>
        </div>
        <div className="text-sm bg-blue-700 px-3 py-1 rounded-full">
          Step {step + 1} / {titles.length}
        </div>
      </div>

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
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
          }`}
        >
          {step === 0 ? '解法ステップへ' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q108_175;
// src/questions/Q104_170.jsx
import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第104回 問170：pHと分子形/イオン形の溶解平衡
// ==========================================
const Q104_170 = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [openOption, setOpenOption] = useState(null);

  const imageBasePath = import.meta.env.BASE_URL + 'image/';

  const toggleOption = (index) => {
    setOpenOption(openOption === index ? null : index);
  };

  // 選択肢と解説
  const options = [
    {
      text: '1. 弱電解質Aは弱酸性化合物である。',
      isCorrect: true,
      explanation: (
        <>
          <span className="font-bold text-green-600">【正しい】</span>
          <p className="mt-2 text-sm leading-relaxed">
            図を見ると，
            <span className="font-bold">分子形の濃度は pH によらず一定（0.1 mg/mL 程度）</span>
            であるのに対し，
            <span className="font-bold">イオン形は pH が上がるほど増加</span>しています。
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            これは，
            <span className="font-bold text-indigo-600">弱酸性薬物（HA ⇄ H⁺ + A⁻）</span>
            に典型的な挙動です。
            pH が高くなる（アルカリ側）ほど電離が進み，A⁻ が増えるため，
            イオン形の濃度が右上がりになります。
          </p>
          <div className="mt-3 bg-green-50 border border-green-200 rounded p-2 text-xs">
            弱塩基性薬物であれば，pH が高くなると<strong>非電離形</strong>が増え，
            今回とは逆の挙動になります。
          </div>
        </>
      ),
    },
    {
      text: '2. 弱電解質Aの pKa は 2.0 である。',
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm leading-relaxed">
            pK<sub>a</sub> は<strong>分子形とイオン形の濃度が等しくなる pH</strong> です。
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            図から読み取ると，分子形（実線）とイオン形（破線）の交点は
            <span className="font-bold text-indigo-600">pH ≒ 4</span> 付近にあります。
          </p>
          <div className="mt-3 bg-gray-50 border border-gray-200 rounded p-2 text-xs">
            したがって，<strong>pK<sub>a</sub> ≒ 4</strong> と判断でき，
            「2.0である」は誤りです。
          </div>
        </>
      ),
    },
    {
      text: '3. 25℃において，pH 7.0 のときの弱電解質Aの溶解度は，pH 6.0 のときの溶解度の約10倍になると予想される。',
      isCorrect: true,
      explanation: (
        <>
          <span className="font-bold text-green-600">【正しい】</span>
          <h5 className="font-bold text-sm mt-2 mb-1">1. 式で考える</h5>
          <div className="bg-gray-100 p-2 rounded text-xs md:text-sm leading-relaxed font-mono">
            弱酸の総溶解度：
            <br />
            S = S₀ (1 + 10<sup>pH − pK<sub>a</sub></sup>)
            <br />
            pK<sub>a</sub> ≒ 4 とすると，
            <br />
            S(6) = S₀(1 + 10²) = S₀ × 101
            <br />
            S(7) = S₀(1 + 10³) = S₀ × 1001
            <br />
            比：S(7)/S(6) = 1001/101 ≒ 9.9
          </div>
          <p className="mt-2 text-sm">
            よって，pH 7 の溶解度は pH 6 の<strong>約10倍</strong>とみなせます。
          </p>
          <h5 className="font-bold text-sm mt-3 mb-1">2. 図から読んでも同じ結論</h5>
          <p className="text-sm leading-relaxed">
            総濃度（分子形 + イオン形）のグラフを見ると，pH 6 で約
            <span className="font-bold">1 mg/mL</span>，
            pH 7 で約 <span className="font-bold">10 mg/mL</span>
            程度となっており，やはり 10 倍です。
          </p>
        </>
      ),
    },
    {
      text: '4. 25℃において，pH 1.0 のときの弱電解質Aの溶解度は，pH 2.0 のときの溶解度の約1/10倍になると予想される。',
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm leading-relaxed">
            pH 1〜2 は pK<sub>a</sub>≒4 よりかなり低く，
            ほとんどが<strong>分子形（非電離形）</strong>です。
          </p>
          <div className="bg-gray-100 p-2 rounded text-xs md:text-sm leading-relaxed font-mono">
            S(1) ≒ S₀(1 + 10<sup>1 − 4</sup>) = S₀(1 + 10⁻³) ≒ S₀
            <br />
            S(2) ≒ S₀(1 + 10<sup>2 − 4</sup>) = S₀(1 + 10⁻²) ≒ S₀
          </div>
          <p className="mt-2 text-sm">
            どちらもほぼ S₀ なので<strong>ほぼ同じ溶解度</strong>であり，
            1/10 にはなりません。
          </p>
          <p className="mt-1 text-sm">
            図を見ても，pH1 と pH2 の総濃度はとても近く，10倍も違いません。
          </p>
        </>
      ),
    },
    {
      text: '5. 25℃において，弱電解質A 5 mg を水1 mLに分散させたとき，pH 5.5以上になると全量が溶解すると予想される。',
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm leading-relaxed">
            「5 mg/mL が全部溶けるかどうか」を判断します。
          </p>
          <div className="bg-gray-100 p-2 rounded text-xs md:text-sm leading-relaxed font-mono">
            pH5 での総濃度：およそ 1 mg/mL 程度
            <br />
            pH6 での総濃度：およそ 10 mg/mL 程度
          </div>
          <p className="mt-2 text-sm">
            pH5.5 は pH5 と pH6 の中間で，溶解度は
            <span className="font-bold">数 mg/mL 程度（3〜4 mg/mL）</span>
            と読み取れます。
          </p>
          <p className="mt-1 text-sm">
            よって，
            <span className="font-bold">pH5.5 では 5 mg/mL は溶解しきらない</span>
            ため，
            「pH5.5以上になると全量が溶解する」という記述は誤りです。
          </p>
        </>
      ),
    },
  ];

  const titles = [
    '問題とグラフの確認',
    'Step 1: 図から性質（弱酸・pKa）を読み取る',
    'Step 2: 溶解度式で倍率を計算する',
    'Step 3: 選択肢ごとの検討',
    'Step 4: 結論・まとめ',
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-sky-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第104回 問170
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  物理：pHと弱電解質の分子形/イオン形
                </h4>
              </div>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                25℃において固相が十分に存在する条件下，pHと弱電解質Aの分子形と
                イオン形の溶解平衡時の濃度の関係を図に表した。
                以下の記述のうち，正しいのはどれか。
                <span className="font-bold underline mx-1">2つ選べ。</span>
                <br />
                ただし，弱電解質Aの分子形とイオン形の溶解平衡時の濃度比は
                Henderson–Hasselbalchの式に従い，弱電解質Aの溶解やpH調整に伴う
                容積変化は無視できるものとする。
              </p>

              {/* 図の表示 */}
              <div className="my-4 flex justify-center">
                <img
                  src={`${imageBasePath}104-170-graph.png`}
                  alt="第104回問170：pHと分子形・イオン形濃度の関係グラフ"
                  className="max-w-full max-h-[60vh] object-contain h-auto border rounded-lg shadow-sm"
                />
              </div>

              <div className="mt-4 bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-gray-700">
                <p className="font-bold text-sky-800 mb-1">図からわかること（ざっくり）</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>実線（―）は pH によらず一定（0.1 mg/mL） → 分子形濃度</li>
                  <li>破線（--）は pH が高くなるほど増加 → イオン形濃度</li>
                  <li>
                    pH 4 で分子形とイオン形が同じ濃度 → pH 4 = pK
                    <sub>a</sub>
                  </li>
                </ul>
              </div>

              <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 text-sm md:text-base">
                <h5 className="font-bold text-gray-800 mb-2">問題の選択肢</h5>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  {options.map((opt, index) => (
                    <li key={index}>{opt.text}</li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-sky-600 text-white rounded-lg font-bold hover:bg-sky-700 transition-colors shadow-md inline-flex items-center"
                >
                  解法ステップを開始 <ChevronRight className="w-5 h-5 ml-2" />
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
                Step 1：図から「弱酸」と「pK
                <sub>a</sub>」を読み取る
              </h4>
              <p className="text-sm md:text-base text-gray-700 mb-2">
                まずはグラフの形だけから，A がどんな電解質かを判断します。
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                <li>pH が高くなるほどイオン形が増える → 弱酸性薬物の特徴</li>
                <li>
                  分子形とイオン形が交わる pH ≒
                  <span className="font-bold text-indigo-600">4</span> → pK
                  <sub>a</sub> ≒ 4
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3">
                Henderson–Hasselbalch の式で確認
              </h4>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm md:text-base leading-relaxed">
                弱酸 HA のとき：
                <br />
                pH = pK<sub>a</sub> + log([A⁻]/[HA])
                <br />
                pH = pK<sub>a</sub> のとき，[A⁻] = [HA]
              </div>
              <p className="mt-2 text-sm text-gray-700">
                図から，この条件を満たすのが pH ≒ 4 と読めるので，
                <span className="font-bold text-indigo-600">
                  pK<sub>a</sub> ≒ 4
                </span>{' '}
                と判断できます。
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
              Step 2：溶解度式で「10倍」を確認（選択肢3）
            </h3>
            <p className="text-sm md:text-base text-gray-700">
              弱酸の<strong>総溶解度 S</strong> は，
              <span className="font-mono">
                S = S₀(1+10<sup>pH−pK<sub>a</sub></sup>)
              </span>
              で表されます。
            </p>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-800">
                1. pH 6 と pH 7 の溶解度の比
              </h4>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm md:text-base leading-relaxed">
                pK<sub>a</sub> ≒ 4 とすると，
                <br />
                S(6) = S₀(1 + 10²) = S₀ × 101
                <br />
                S(7) = S₀(1 + 10³) = S₀ × 1001
                <br />
                S(7)/S(6) = 1001/101 ≒ 9.9
              </div>
              <p className="text-sm text-gray-700">
                よって，pH 7 の溶解度は pH 6 の<strong>約 10 倍</strong>といえます。
                これは図から読んだときの「1 → 10 mg/mL」の変化とも一致します。
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs md:text-sm">
                <span className="font-bold text-yellow-800">近似のポイント：</span>
                <br />
                pH が 1 増えるごとに 10 倍（log スケール）というイメージを持つと，
                図も式も直感的に理解しやすくなります。
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
              Step 3：選択肢ごとの検討
            </h3>

            <div className="space-y-3">
              {options.map((opt, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleOption(index)}
                    className={`w-full p-4 text-left flex items-start transition-colors ${
                      openOption === index ? 'bg-sky-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`font-bold mr-3 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${
                        opt.isCorrect
                          ? 'bg-sky-600 text-white'
                          : 'bg-gray-200 text-gray-600'
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
                        <div className="py-4 border-t border-gray-200 text-sm text-gray-700 leading-relaxed">
                          {opt.explanation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center mt-2">
              選択肢をクリックすると詳しい解説が表示されます。
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 text-center h-full flex flex-col justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-sky-100 max-w-xl mx-auto"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                解説終了：正解は「1」と「3」
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-600">
                <p className="font-bold mb-2">【重要ポイントのまとめ】</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    グラフの形（pH↑でイオン形↑，分子形一定）から
                    <span className="font-bold">弱酸性薬物</span>と判断（選択肢1）
                  </li>
                  <li>
                    分子形とイオン形が等しくなる pH ≒ 4 →
                    <span className="font-bold">
                      pK<sub>a</sub> ≒ 4
                    </span>
                    （選択肢2は誤り）
                  </li>
                  <li>
                    S = S₀(1+10<sup>pH−pK<sub>a</sub></sup>) を用いると，
                    <span className="font-bold">
                      pH6→7 で溶解度は約10倍
                    </span>
                    （選択肢3が正しい）
                  </li>
                  <li>
                    pH1〜2 は pK<sub>a</sub> より十分低く，ほぼ S₀ 一定 →
                    1/10 にはならない（選択肢4は誤り）
                  </li>
                  <li>
                    pH5.5 での溶解度は 5 mg/mL に届かない →
                    すべて溶けるとはいえない（選択肢5は誤り）
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
      <div className="bg-sky-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-sky-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第104回 問170：ステップ解説</h1>
        </div>
        <div className="text-sm bg-sky-700 px-3 py-1 rounded-full">
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
              : 'bg-sky-600 text-white hover:bg-sky-700 shadow-md'
          }`}
        >
          {step === 0 ? '解法ステップへ' : '次へ'}{' '}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q104_170;
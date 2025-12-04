// src/questions/Q110_51.jsx
import React, { useState, useEffect } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第110回 問51：構造粘性とチキソトロピー
// ==========================================
const Q110_51 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  // ページを進めるたびにスクロール位置をリセット
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [step]);

  const titles = [
    '問題の確認：構造粘性とレオグラム',
    'Step 1：構造粘性とチキソトロピーのイメージ',
    'Step 2：各選択肢をレオロジーの観点から整理',
    'Step 3：まとめと国家試験での狙い'
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      // -----------------------------------
      // 0. 問題の確認
      // -----------------------------------
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-amber-500 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第110回 問51
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  構造粘性を有する製剤とレオグラム
                </h4>
              </div>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                構造粘性を有する製剤でみられる、
                下図のレオグラムを示す現象はどれか。1つ選べ。
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm md:text-base mb-4">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>クリープ</li>
                  <li>チキソトロピー</li>
                  <li>応力緩和</li>
                  <li>ダイラタンシー</li>
                  <li>コアセルベーション</li>
                </ol>
              </div>

              {/* レオグラム（イメージ図：ヒステリシスループ） */}
              <div className="bg-white border border-amber-200 rounded-lg p-4 mb-4">
                <h5 className="font-bold text-amber-700 mb-2 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  構造粘性を有する製剤のレオグラム（イメージ）
                </h5>
                <div className="relative bg-gray-50 rounded-lg h-52 border border-gray-300 overflow-hidden">
                  <svg
                    viewBox="0 0 220 170"
                    className="w-full h-full text-gray-500"
                  >
                    {/* 座標軸 */}
                    <line
                      x1="40"
                      y1="20"
                      x2="40"
                      y2="145"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="40"
                      y1="145"
                      x2="200"
                      y2="145"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <text x="10" y="20" fontSize="10" fill="currentColor">
                      τ
                    </text>
                    <text x="195" y="160" fontSize="10" fill="currentColor">
                      γ̇
                    </text>

                    {/* 上昇曲線（剪断速度↑）：やや上側のカーブ */}
                    <path
                      d="M40 140 Q 80 100 130 70 T 200 40"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                    />
                    <text
                      x="130"
                      y="80"
                      fontSize="9"
                      fill="#f97316"
                    >
                      せん断速度↑
                    </text>

                    {/* 下降曲線（剪断速度↓）：下側を通るカーブ（ヒステリシスループ） */}
                    <path
                      d="M200 45 Q 150 75 105 95 T 40 120"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="2"
                    />
                    <text
                      x="105"
                      y="110"
                      fontSize="9"
                      fill="#0ea5e9"
                    >
                      せん断速度↓
                    </text>

                    {/* ループ領域 */}
                    <text x="90" y="55" fontSize="9" fill="#6b21a8">
                      ヒステリシスループ
                    </text>
                  </svg>
                  <p className="absolute bottom-1 left-2 text-[10px] text-gray-500">
                    ※ せん断速度を増減させたときの応力の経路が
                    <br />
                    異なり「ループ」を描く → 構造変化と時間依存性
                  </p>
                </div>

                <p className="mt-2 text-xs text-gray-600">
                  「構造粘性を有する製剤」＝内部に<span className="font-bold">
                    三次元ネットワーク（構造）
                  </span>
                  を持ち、せん断によっていったん壊れ、時間とともに回復するような懸濁剤・ゲルなどをイメージします。
                </p>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-md inline-flex items-center"
                >
                  解説ステップへ進む
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        );

      // -----------------------------------
      // 1. 構造粘性とチキソトロピー
      // -----------------------------------
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-500">
              <h4 className="font-bold text-amber-700 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                構造粘性（構造化懸濁剤・ゲル）のイメージ
              </h4>
              <p className="text-sm md:text-base text-gray-800">
                構造粘性を有する製剤とは、内部に
                <span className="font-bold">ネットワーク構造（骨組み）</span>
                を持つため、
                <span className="font-bold">
                  ゆっくり動かすと固体のように、強く振ると流体のように
                </span>
                振る舞う製剤です。
              </p>
            </div>

            {/* 粘度変化のイメージ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* せん断をかけた瞬間 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h5 className="font-bold text-gray-800 mb-2">
                  ① せん断をかけた直後（かき混ぜはじめ）
                </h5>
                <p className="text-sm md:text-base text-gray-700 mb-3">
                  構造がまだ十分に壊れておらず、
                  <span className="font-bold">粘度が高い状態</span>。
                  ゲル・懸濁剤が「重く」感じられるイメージです。
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-20 h-20 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs text-gray-700">
                    構造
                    <br />
                    しっかり
                  </div>
                  <span className="text-3xl">→</span>
                  <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs text-gray-700">
                    高粘度
                  </div>
                </div>
              </div>

              {/* せん断を続けた後 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h5 className="font-bold text-gray-800 mb-2">
                  ② せん断をしばらく続けた後
                </h5>
                <p className="text-sm md:text-base text-gray-700 mb-3">
                  せん断によって内部構造が崩れ、
                  <span className="font-bold">粘度が時間とともに低下</span>
                  （流れやすくなる）。これが
                  <span className="font-bold text-amber-700">チキソトロピー</span>
                  の本質です。
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-[11px] text-gray-700">
                    構造
                    <br />
                    くずれ
                  </div>
                  <span className="text-3xl">→</span>
                  <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs text-gray-700">
                    低粘度
                  </div>
                </div>
              </div>
            </div>

            {/* ソル⇄ゲル模式図 */}
            <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-sm">
              <h5 className="font-bold text-indigo-700 mb-2">
                網目構造の模式図：ソル ⇄ ゲル
              </h5>
              <p className="text-sm md:text-base text-gray-800 mb-3">
                構造粘性系では，内部に網目状の構造があり，
                <span className="font-bold">網目が壊れるとソル（低粘度），再び組み直されるとゲル（高粘度）</span>
                になるとイメージすると理解しやすいです。
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm text-gray-700">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 border-2 border-gray-300 rounded-md flex items-center justify-center text-[11px] leading-tight">
                    ソル
                    <br />
                    （粘度 小）
                  </div>
                  <p className="mt-2 text-center">
                    粒子がよく動ける状態。
                    <br />
                    網目構造がこわれている。
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 border-2 border-gray-300 rounded-md flex items-center justify-center text-[11px] leading-tight">
                    ゲル
                    <br />
                    （粘度 大）
                  </div>
                  <p className="mt-2 text-center">
                    粒子同士がつながり，
                    <br />
                    網目構造ができた状態。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
              <h5 className="font-bold text-amber-700 mb-2">
                チキソトロピー（thixotropy）の定義
              </h5>
              <ul className="list-disc list-inside text-sm md:text-base text-gray-800 space-y-1">
                <li>
                  <span className="font-bold">
                    せん断によって粘度が低下し，せん断をやめて静置すると粘度がゆっくり回復する現象
                  </span>
                  を指す。
                </li>
                <li>
                  <span className="font-bold">
                    「時間依存性のある擬塑性（せん断薄化）」
                  </span>
                  とも言われる。
                </li>
                <li>
                  一定のせん断を加え続けると、
                  <span className="font-bold">時間とともに粘度が低下</span>し、
                  せん断をやめて放置すると、粘度がゆっくり回復する。
                </li>
                <li>
                  レオグラム上では、
                  <span className="font-bold">
                    せん断速度を上げたときと下げたときの曲線が一致せず「ループ」を描く
                  </span>
                  （ヒステリシスループ）。
                </li>
                <li>
                  懸濁剤・ゲル・クリームなどの
                  <span className="font-bold">外用製剤で重要な性質</span>。
                  「保存時は沈殿せず、使用時には塗り広げやすい」ような製剤設計に役立つ。
                </li>
              </ul>
            </div>
          </div>
        );

      // -----------------------------------
      // 2. 各選択肢の整理
      // -----------------------------------
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              各選択肢を「何を一定にして何が時間変化するか」で整理
            </h3>

            <div className="space-y-4">
              {/* 1. クリープ */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">1. クリープ</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  一定の<span className="font-bold">応力（力）</span>
                  を加え続けたとき、
                  <span className="font-bold">ひずみ（変形）が時間とともに増加</span>
                  していく現象。
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  ・固体・半固体製剤（軟膏基剤など）の長期変形（ダレ）の評価など。
                  <br />
                  ・レオグラム（せん断速度―応力曲線）というより、
                  「ひずみ―時間」のグラフで表すことが多い。
                </p>
              </div>

              {/* 2. チキソトロピー */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-300 shadow-sm">
                <h4 className="font-bold text-amber-800 mb-1">
                  2. チキソトロピー（★正解）
                </h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  構造粘性を有する擬塑性流動系で、
                  <span className="font-bold">
                    せん断時間に依存して粘度が低下・回復する
                  </span>
                  現象。
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  ・上昇曲線と下降曲線の間にヒステリシスループが生じるレオグラム。
                  <br />
                  ・懸濁剤・ゲル・クリームなどに多い。
                </p>
              </div>

              {/* 3. 応力緩和 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">3. 応力緩和</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  一定の<span className="font-bold">ひずみ（変形）</span>
                  を保ったままにすると、
                  <span className="font-bold">応力（内部の力）が時間とともに減少</span>
                  する現象。
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  ・弾性体＋粘性体を組み合わせたモデル（マックスウェルモデルなど）で説明。
                  <br />
                  ・こちらも主に「応力―時間」グラフで扱う。
                </p>
              </div>

              {/* 4. ダイラタンシー */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">4. ダイラタンシー</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  <span className="font-bold">せん断速度が増加すると粘度が増加</span>
                  する「せん断濃化（shear thickening）」。
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  ・デンプン濃厚懸濁液などで見られる。
                  <br />
                  ・レオグラムとしては、せん断速度とともに上に凸のカーブになるが、
                  「ヒステリシスループ」は本質ではない。
                </p>
              </div>

              {/* 5. コアセルベーション */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">5. コアセルベーション</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  高分子や界面活性剤の溶液が、
                  <span className="font-bold">
                    高分子濃厚相（コアセルベート）と希薄相の2相に分離する現象
                  </span>
                  。
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  ・マイクロカプセルの製剤化やエマルション安定性と関連。
                  <br />
                  ・せん断速度―応力のレオグラムの形状とは直接関係しない。
                </p>
              </div>
            </div>
          </div>
        );

      // -----------------------------------
      // 3. まとめ
      // -----------------------------------
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              まとめ：構造粘性系とチキソトロピーを国家試験でどう押さえるか
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 space-y-2">
              <li>
                「<span className="font-bold">構造粘性を有する製剤</span>」
                ときたら、懸濁剤・ゲル・クリームなどをイメージし、
                <span className="font-bold">
                  内部構造の破壊と再構築に伴う粘度変化
                </span>
                を思い出す。
              </li>
              <li>
                レオグラムに<span className="font-bold">
                  ヒステリシスループ
                </span>
                が描かれていれば、時間依存性のある
                <span className="font-bold text-amber-700">
                  チキソトロピー
                </span>
                を疑う。
              </li>
              <li>
                クリープ・応力緩和は「何を一定にして時間変化を見るか」
                （応力 or ひずみ）で整理すると混乱しにくい。
              </li>
              <li>
                ダイラタンシーは<span className="font-bold">
                  せん断速度↑で粘度↑（せん断濃化）
                </span>
                、一方、チキソトロピーは
                <span className="font-bold">
                  時間依存性を伴うせん断薄化
                </span>
                である点を区別する。
              </li>
              <li>
                臨床例として，噴霧時はサラッとした液体だが，
                粘膜表面に付着するとチキソトロピーと粘着性により
                <span className="font-bold">ゲル状に変化して滴下しにくくなる点鼻スプレー</span>
                などがある（結晶セルロース・カルメロースナトリウムを含む懸濁型製剤など）。
              </li>
              <li>
                本問の正解は、
                <span className="font-bold text-green-700">
                  2. チキソトロピー
                </span>
                。
              </li>
            </ul>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors inline-flex items-center"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                前へ
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors inline-flex items-center"
              >
                <Home className="w-5 h-5 mr-1" />
                問題一覧に戻る
              </button>
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
      {/* 上部ヘッダー */}
      <div className="bg-amber-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-amber-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第110回 問51：構造粘性とチキソトロピー</h1>
        </div>
        <div className="text-sm bg-amber-700 px-3 py-1 rounded-full">
          Step {step + 1} / {titles.length}
        </div>
      </div>

      {/* 本文スライド */}
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

      {/* 下部ナビゲーション */}
      <div className="p-4 border-t bg-gray-50 flex justify-between z-10">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
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
          onClick={() => setStep((s) => Math.min(titles.length - 1, s + 1))}
          disabled={step === titles.length - 1}
          className={`px-6 py-3 rounded-lg font-bold flex items-center ${
            step === titles.length - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600 shadow-md'
          }`}
        >
          {step === 0 ? '解説ステップへ' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q110_51;
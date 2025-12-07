import React, { useEffect, useState } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Activity,
  Droplet,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';
import { MathJax } from 'better-react-mathjax';

import newtonRheoImg from '../assets/108−50-rheology_newtonian.png';
import binghamRheoImg from '../assets/108−50-rheology_bingham.png';
import pseudoplasticRheoImg from '../assets/108−50-rheology_pseudoplastic.png';
import quasiPlasticRheoImg from '../assets/108−50-rheology_quasiplastic.png';
import dilatantRheoImg from '../assets/108−50-rheology_dilatant.png';

// ==========================================
// 第108回 問50：ダイラタント流動
// ==========================================

const Q108_50 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  // ステップを進めたときにスクロール位置を先頭に戻す
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [step]);

  const titles = [
    '問題の確認：ダイラタント流動とは？',
    'Step 1：流動様式の基本（ニュートン〜ダイラタント）',
    'Step 2：各選択肢を製剤学的にチェック',
    'Step 3：まとめと臨床・製剤への応用'
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
                <span className="bg-amber-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第108回 問50
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  ダイラタント流動を示すのはどれか
                </h4>
              </div>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                ダイラタント流動を示すのはどれか。1つ選べ。
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm md:text-base">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>カルメロースナトリウム溶液</li>
                  <li>チンク油</li>
                  <li>グリセリン</li>
                  <li>デンプン濃厚水性懸濁液</li>
                  <li>ヒマシ油</li>
                </ol>
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                <p className="font-bold text-amber-800 mb-1">
                  まずは「ダイラタント流動」のイメージ
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    かき混ぜる（せん断速度↑）ほど
                    <span className="font-bold">ドロドロになって動きにくくなる</span>
                    挙動。
                  </li>
                  <li>
                    代表例：
                    <span className="font-bold text-amber-700">
                      デンプン濃厚懸濁液
                    </span>
                    （水＋片栗粉 → いわゆる「ウーブレック」）。
                  </li>
                  <li>
                    逆に「かき混ぜるほどサラサラになる」のは
                    <span className="font-bold text-indigo-700">
                      準粘性流動（擬塑性流動）
                    </span>
                    。
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors shadow-md inline-flex items-center"
                >
                  解説ステップへ進む
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        );

      // -----------------------------------
      // 1. 流動様式の基本（5種類） 2×3 配置
      // -----------------------------------
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1行目 左：レオグラムの説明ボックス */}
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-700 mb-2 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  5種類の流動様式をレオグラムでイメージする
                </h4>
                <p className="text-sm md:text-base text-gray-800">
                  レオロジーの教科書に出てくる
                  <span className="font-bold mx-1">レオグラム</span>
                  では，
                  <span className="font-bold mx-1">
                    横軸にずり応力（せん断応力） S
                  </span>
                  ，
                  <span className="font-bold mx-1">
                    縦軸にずり速度（せん断速度） D
                  </span>
                  をとり，その傾き
                  <span className="font-mono mx-1">ΔD/ΔS</span>
                  が「流動率（fluidity）」＝粘度（η）の逆数を表します。
                  第108回 問50 では，このレオグラム上で
                  <span className="font-bold">
                    ニュートン流動／準粘性流動／塑性流動／準塑性流動／ダイラタント流動
                  </span>
                  の5つのパターンをイメージできるようにしておきましょう。
                </p>
              </div>

              {/* 1行目 右：ニュートン流動 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h5 className="font-bold text-gray-800 mb-2 flex items-center">
                  <Droplet className="w-5 h-5 mr-2 text-sky-500" />
                  ニュートン流動（Newtonian）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  せん断速度を変えても粘度が一定の理想的な流れ。
                </p>
                <p className="mt-2 text-[11px] md:text-xs text-gray-700 text-center">
                  <MathJax dynamic>{'\\(D = \\dfrac{1}{\\eta} S\\)'}</MathJax>
                </p>
                <div className="mt-3">
                  <img
                    src={newtonRheoImg}
                    alt="ニュートン流動のレオグラムと粘度-せん断応力グラフ"
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              </div>

              {/* 2行目 左：準粘性流動 */}
              <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-sm">
                <h5 className="font-bold text-indigo-700 mb-2 flex items-center">
                  準粘性流動（擬塑性流動）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  降伏値はなく，
                  <span className="font-bold">
                    かき混ぜるほどサラサラになる（粘度↓）
                  </span>
                  流れ。
                </p>
                <p className="mt-2 text-[11px] md:text-xs text-gray-700 text-center">
                  <MathJax dynamic>
                    {'\\(D = \\dfrac{1}{\\eta_{\\mathrm{a}}} S^{n},\\; (n < 1)\\)'}
                  </MathJax>
                </p>
                <div className="mt-3">
                  <img
                    src={pseudoplasticRheoImg}
                    alt="準粘性流動（擬塑性流動）のレオグラムと粘度-せん断応力グラフ"
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              </div>

              {/* 2行目 右：塑性流動 */}
              <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-sm">
                <h5 className="font-bold text-rose-700 mb-2">
                  塑性流動（Bingham 流動）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  一定以上の応力
                  <span className="font-bold">（降伏値 S₀）を超えると流れ始める</span>
                  タイプ。流れ出した後はほぼ一定粘度。
                </p>
                <p className="mt-2 text-[11px] md:text-xs text-gray-700 text-center">
                  <MathJax dynamic>
                    {"\\(D = \\dfrac{1}{\\eta'} (S - S_{0})\\)"}
                  </MathJax>
                </p>
                <div className="mt-3">
                  <img
                    src={binghamRheoImg}
                    alt="塑性流動（ビンガム流動）のレオグラムと粘度-せん断応力グラフ"
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              </div>

              {/* 3行目 左：準塑性流動 */}
              <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm">
                <h5 className="font-bold text-purple-700 mb-2">
                  準塑性流動（降伏値＋準粘性）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  <span className="font-bold">
                    降伏値 S₀ を超えると流れ始め，流れ始めてからも
                    かき混ぜるほど粘度が下がる
                  </span>
                  タイプ。
                </p>
                <p className="mt-2 text-[11px] md:text-xs text-gray-700 text-center">
                  <MathJax dynamic>
                    {"\\(D = \\dfrac{1}{\\eta'_{\\mathrm{a}}} (S - S_{0})^{n},\\; (n < 1)\\)"}
                  </MathJax>
                </p>
                <div className="mt-3">
                  <img
                    src={quasiPlasticRheoImg}
                    alt="準塑性流動のレオグラムと粘度-せん断応力グラフ"
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              </div>

              {/* 3行目 右：ダイラタント流動 */}
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                <h5 className="font-bold text-amber-700 mb-2 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  ダイラタント流動（Dilatant：せん断増粘）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  ゆっくり動かすと流れるが，強く・速くかき混ぜると
                  <span className="font-bold">急に固くなる（粘度↑）</span>
                  流れ。
                </p>
                <p className="mt-2 text-[11px] md:text-xs text-gray-700 text-center">
                  <MathJax dynamic>
                    {'\\(D = \\dfrac{1}{\\eta_{\\mathrm{a}}} S^{n},\\; (n > 1)\\)'}
                  </MathJax>
                </p>
                <div className="mt-3">
                  <img
                    src={dilatantRheoImg}
                    alt="ダイラタント流動のレオグラムと粘度-せん断応力グラフ"
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      // -----------------------------------
      // 2. 各選択肢の解説
      // -----------------------------------
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              各選択肢を「流動様式」と「製剤例」で確認
            </h3>
            <div className="space-y-4">
              {/* 1. カルメロースナトリウム溶液 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">
                  1. カルメロースナトリウム溶液
                </h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  高分子電解質の水溶液で，
                  <span className="font-bold text-indigo-700">
                    準粘性流動（擬塑性流動：shear-thinning）
                  </span>
                  を示す代表例。
                </p>
                <p className="text-xs text-gray-600">
                  かき混ぜるとサラサラになり，安静時には粘度が上がることで
                  <span className="font-bold">懸濁性点眼液などの分散安定化</span>
                  に役立つ。
                </p>
              </div>

              {/* 2. チンク油 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">2. チンク油</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  酸化亜鉛などの粉体が油中に分散した高濃度懸濁製剤。
                  一般に
                  <span className="font-bold text-rose-700">塑性流動</span>
                  （降伏値を持つ）を示す。
                </p>
                <p className="text-xs text-gray-600">
                  塗り広げるときに，一定以上の力を加えると流れ始めるタイプ。
                  ダイラタント流動とは異なる。
                </p>
              </div>

              {/* 3. グリセリン */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">3. グリセリン</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  比較的粘度の高い単純な液体で，
                  <span className="font-bold">ニュートン流動</span>
                  を示す。
                </p>
                <p className="text-xs text-gray-600">
                  せん断速度を変えても粘度はほぼ一定で，せん断増粘もしない。
                </p>
              </div>

              {/* 4. デンプン濃厚水性懸濁液 */}
              <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-sm">
                <h4 className="font-bold text-amber-800 mb-1">
                  4. デンプン濃厚水性懸濁液（正解）
                </h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  高濃度のデンプン粒子が水中に分散した系で，
                  <span className="font-bold text-amber-700">
                    代表的なダイラタント流動
                  </span>
                  を示す。
                </p>
                <p className="text-xs text-gray-600">
                  ゆっくり動かすと液体のように流れるが，急激に力を加えると
                  粒子同士が<strong>押し固められて「固まる」ように感じる</strong>。
                </p>
              </div>

              {/* 5. ヒマシ油 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">5. ヒマシ油</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  粘度は高いが，基本的には
                  <span className="font-bold">ニュートン流動</span>
                  に近い挙動を示す。
                </p>
                <p className="text-xs text-gray-600">
                  粘度は高い＝ドロドロだが，せん断速度に対する粘度変化は小さい。
                  ダイラタント流動ではない。
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
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="bg-white p-6 rounded-2xl shadow-xl border border-amber-100"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <CheckCircle className="w-14 h-14 text-emerald-500" />
                <h2 className="text-2xl font-bold text-gray-800">
                  正解は「4. デンプン濃厚水性懸濁液」
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  ダイラタント流動は，
                  <span className="font-bold">
                    「せん断速度を上げると見かけ粘度が増加する（せん断増粘）」
                  </span>
                  挙動です。
                  高濃度のデンプン懸濁液のように，
                  <span className="font-bold">強くかき混ぜると急に固くなる</span>
                  系が代表例です。
                </p>
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm md:text-base text-gray-800 space-y-2">
                <p className="font-bold text-amber-800 mb-1">まとめポイント</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-bold">ニュートン流動</span>：
                    粘度一定（例：水，グリセリン，ヒマシ油）。
                  </li>
                  <li>
                    <span className="font-bold">準粘性流動（擬塑性）</span>：
                    降伏値なしで，かき混ぜるほどサラサラ（高分子 1% 水溶液など）。
                  </li>
                  <li>
                    <span className="font-bold">塑性流動</span>：
                    降伏値 S₀ を超えると流れ始める（チンク油など高濃度懸濁製剤）。
                  </li>
                  <li>
                    <span className="font-bold">準塑性流動</span>：
                    降伏値＋準粘性（降伏値を超えると流れ，さらに shear-thinning）。
                  </li>
                  <li>
                    <span className="font-bold text-amber-700">ダイラタント流動</span>
                    ：かき混ぜるほど固くなる（高濃度デンプン濃厚水性懸濁液）。
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold text-sm md:text-base hover:bg-black transition-colors inline-flex items-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  問題一覧に戻る
                </button>
              </div>
            </motion.div>
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
      {/* ヘッダー */}
      <div className="bg-amber-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-amber-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第108回 問50：ステップ解説</h1>
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

      {/* フッターナビゲーション */}
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
              : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md'
          }`}
        >
          {step === 0 ? '解説ステップへ' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q108_50;
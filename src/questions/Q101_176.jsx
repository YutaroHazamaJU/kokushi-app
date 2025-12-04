// src/questions/Q101_176.jsx
import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, ChevronLeft, Home, CheckCircle,
  // Q101_176 内で使っているアイコンをここに列挙（Calculator, Lightbulb など必要なもの）
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// ★ パスに注意：questions フォルダから見た相対パス
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第101回 問176：目標溶解度までのpHを求める
// ==========================================
const Q101_176 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  // ▼ pH–溶解度グラフ用の状態とパラメータ
  const [ph, setPh] = useState(1.0);
  const pka = 6.1;
  const s0 = 0.1; // pH=1での溶解度≈固有溶解度（µg/mL）

  // 総溶解度の計算関数
  const calcSolubility = (pHValue) =>
    s0 * (1 + Math.pow(10, pHValue - pka));

  // スライダーで表示する現在の溶解度
  const solubility = calcSolubility(ph);

  // グラフ描画用データ（pH 1〜11を0.5刻み）
  const solubilityData = useMemo(() => {
    const data = [];
    for (let x = 1; x <= 11.0001; x += 0.5) {
      const pHValue = Number(x.toFixed(1));
      data.push({
        pH: pHValue,
        S: calcSolubility(pHValue),
      });
    }
    return data;
  }, []);

  const choices = [2, 5, 7, 10, 12];

  const titles = [
    "問題の確認・イメージ",
    "Step 1: 使う式と S0 の読み取り",
    "Step 2: 目標溶解度との関係式を立てる",
    "Step 3: 近似計算で pH を絞り込む",
    "Step 4: 選択肢との対応・まとめ"
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-teal-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第101回 問176
                </span>
                <h4 className="font-bold text-gray-800 text-lg">物理：pHと溶解度</h4>
              </div>
              <p className="text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                1価の<span className="font-bold text-red-600">弱酸性薬物</span>（pK
                <sub>a</sub> = 6.1）の水に対する溶解度は、
                <span className="font-bold">pH 1 で 0.1 μg/mL</span> であった。
                この薬物の溶解度が
                <span className="font-bold text-blue-600">1 mg/mL (= 1000 μg/mL)</span>
                になる pH として、最も近いものを選べ。
                <br />
                ただし、イオン形は水に十分溶解すると仮定する。
              </p>

              <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 text-sm">
                <p className="font-bold text-teal-800 mb-2">
                  ここで押さえたいポイント
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>弱酸性薬物 → 溶解度式は S = S₀(1 + 10<sup>pH−pKa</sup>) </li>
                  <li>pH 1 での溶解度 ≒ <span className="font-bold">S₀</span> とみなせる</li>
                  <li>目標は 1000 μg/mL = <span className="font-bold">1 mg/mL</span></li>
                </ul>
              </div>

              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 text-sm md:text-base">
                <h5 className="font-bold text-gray-800 mb-2">選択肢（pH）</h5>
                <div className="flex flex-wrap justify-center gap-4">
                  {choices.map((value, index) => (
                    <div
                      key={value}
                      className="flex items-baseline gap-1 min-w-[3.5rem] justify-center"
                    >
                      <span className="text-sm text-gray-500">{index + 1}.</span>
                      <span className="text-lg font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-md inline-flex items-center"
                >
                  解法ステップを見ていく <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2">Step 1：使う公式</h4>
              <p className="text-lg">
                1価の<strong>弱酸性薬物</strong>の総溶解度 S は
              </p>
              <div className="text-2xl md:text-3xl font-bold text-center text-indigo-700 py-4 bg-white rounded-lg font-mono border">
                S = S<sub>0</sub> (1 + 10<sup>pH − pK<sub>a</sub></sup>)
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                S<sub>0</sub>：分子形（HA）の固有溶解度（µg/mL）
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3">
                pH1 での溶解度 0.1 μg/mL から S<sub>0</sub> を読む
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                pH 1 は pK
                <sub>a</sub> = 6.1 よりかなり低いので、ほとんどが
                <span className="font-bold">分子形</span>とみなせます。
              </p>
              <div className="font-mono text-lg bg-gray-50 p-3 rounded text-center">
                pH 1 で S ≒ S<sub>0</sub> ≒{" "}
                <span className="font-bold text-red-600">0.1 μg/mL</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                以降、計算を簡単にするために S<sub>0</sub> = 0.1 μg/mL と置いて進める。
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
              Step 2：目標溶解度 1000 μg/mL との関係式
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-gray-700">
                目標：<strong>S = 1000 μg/mL</strong> になる pH を求める。
              </p>
              <div className="font-mono text-lg bg-gray-50 p-3 rounded leading-relaxed">
                1000 = 0.1 × (1 + 10<sup>pH − 6.1</sup>)<br />
                {/* 0.1 で割る */}
                ⇒ 10,000 = 1 + 10<sup>pH − 6.1</sup>
              </div>

              <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-sm">
                <p className="font-bold text-yellow-800 mb-1">ここでの近似</p>
                <p>
                  右辺の「+1」は 10,000 に比べて無視できるので，
                  <br />
                  <span className="font-mono font-bold">
                    10,000 ≒ 10<sup>pH − 6.1</sup>
                  </span>
                  とおく。
                </p>
              </div>

              <div className="font-mono text-lg bg-gray-50 p-3 rounded leading-relaxed">
                10,000 = 10<sup>4</sup> なので
                <br />
                pH − 6.1 ≒ 4
                <br />
                ⇒ pH ≒ <span className="font-bold text-indigo-700">10.1</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
              Step 3：pH–溶解度グラフでイメージする
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 左：pH スライダーと現在値 */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <label
                  htmlFor="ph-slider-101-176"
                  className="block text-gray-700 font-bold mb-2"
                >
                  pH を変えて溶解度を確認：
                  <span className="text-3xl text-teal-600 font-mono ml-2">
                    {ph.toFixed(1)}
                  </span>
                </label>
                <input
                  id="ph-slider-101-176"
                  type="range"
                  min="1.0"
                  max="12.0"
                  step="0.1"
                  value={ph}
                  onChange={(e) => setPh(parseFloat(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-lg cursor-pointer accent-teal-600 mb-4"
                />

                <div className="relative h-24 bg-gray-100 rounded-xl overflow-hidden border border-gray-300 flex items-center justify-center mb-3">
                  <motion.div
                    className="absolute bottom-0 left-0 w-full bg-teal-500 opacity-50"
                    initial={{ height: 0 }}
                    animate={{
                      height: `${Math.min((solubility / 1000) * 100, 100)}%`,
                    }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  />
                  <div className="z-10 text-2xl font-bold text-gray-800">
                    {solubility < 1000
                      ? solubility.toFixed(1)
                      : Math.round(solubility).toLocaleString()}{' '}
                    μg/mL
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  pH を上げていくとイオン形が増え、総溶解度 S が急激に増加する。
                  おおよそ pH ≒ 10 付近で 1,000 μg/mL に達することがわかる。
                </p>
              </div>

              {/* 右：pH–溶解度ラインチャート */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <p className="font-bold text-gray-800 mb-2">
                  pH と総溶解度 S の関係（模式図）
                </p>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={solubilityData}
                      margin={{ left: 50, right: 24, top: 24, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="pH"
                        type="number"
                        domain={[1, 11]}
                        tickCount={11}
                        tickMargin={8}
                        padding={{ left: 5, right: 5 }}
                        label={{ value: 'pH', position: 'insideBottomRight', offset: -10 }}
                      />
                      <YAxis
                        domain={[0, 10000]}
                        tickFormatter={(v) => v.toFixed(0)}
                        tickMargin={8}
                        label={{
                          value: '溶解度 S (μg/mL)',
                          angle: -90,
                          position: 'insideLeft',
                          offset: 10,
                        }}
                      />
                      <Tooltip
                        formatter={(value) => [`${Number(value).toFixed(1)} μg/mL`, 'S']}
                        labelFormatter={(label) => `pH ${label}`}
                      />
                      <ReferenceLine
                        x={pka}
                        stroke="#ef4444"
                        strokeDasharray="4 4"
                        label={{ value: 'pKa', position: 'top', fill: '#ef4444' }}
                      />
                      <ReferenceLine
                        x={ph}
                        stroke="#f97316"
                        strokeDasharray="3 3"
                        label={{
                          value: `pH=${ph.toFixed(1)}`,
                          position: 'top',
                          fill: '#f97316',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="S"
                        stroke="#0f766e"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ※ 実際の数値に基づいた溶解度グラフ。pH が pKa を超えると溶解度 S が急増することが視覚的にわかる。
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 text-center h-full flex flex-col justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-teal-100 max-w-xl mx-auto"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                解説終了：正解は「10」
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                近似計算より pH ≒ 10.1 となり、
                <br />
                選択肢の中では <strong>「10」</strong> が最も近い値です。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-600">
                <p className="font-bold mb-2">【重要ポイントの復習】</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>S = S₀(1+10<sup>pH−pKa</sup>) は「弱酸の総溶解度」</li>
                  <li>pH≪pKa のとき S ≒ S₀ とみなせる → ここで S₀ を決めた</li>
                  <li>1 mg/mL は 1,000 μg/mL に換算してから式に代入</li>
                  <li>
                    10,000 = 10<sup>pH−6.1</sup> ⇒ pH−6.1 ≒ 4 ⇒ pH ≒ 10
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
      <div className="bg-teal-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-teal-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第101回 問176：ステップ解説</h1>
        </div>
        <div className="text-sm bg-teal-700 px-3 py-1 rounded-full">
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
              ? "text-gray-300 cursor-not-allowed"
              : "bg-white border hover:bg-gray-100 text-gray-700"
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> 前へ
        </button>
        <button
          onClick={() => setStep(Math.min(titles.length - 1, step + 1))}
          disabled={step === titles.length - 1}
          className={`px-6 py-3 rounded-lg font-bold flex items-center ${
            step === titles.length - 1
              ? "text-gray-300 cursor-not-allowed"
              : "bg-teal-600 text-white hover:bg-teal-700 shadow-md"
          }`}
        >
          {step === 0 ? "解法ステップへ" : "次へ"}{" "}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};
export default Q101_176;
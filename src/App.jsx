import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ChevronRight, ChevronLeft, Home, 
  Calculator, TestTube, Brain, CheckCircle, XCircle, 
  AlertTriangle, Menu, ArrowRight, Thermometer, RotateCw, Clock, Activity, Lightbulb, MousePointerClick, PenTool
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 共通コンポーネント & アニメーション設定
// ==========================================

// ページ切り替え時のアニメーション
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const Slide = ({ children, className = "" }) => (
  <div className={"flex flex-col h-full overflow-y-auto p-4 md:p-8 lg:p-12 text-base md:text-lg " + className}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 border-b-4 border-blue-200 pb-2">
    {children}
  </h2>
);

// ==========================================
// 問題: 第99回 問174 (論理的解法)
// ==========================================
const Q99_174 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  // ステップごとのコンテンツ定義
  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">第99回 問174</span>
                <h4 className="font-bold text-gray-800 text-lg">物理・化学・生物</h4>
              </div>
              <p className="text-lg text-gray-800 leading-relaxed mb-6 font-serif">
                <span className="font-bold border-b-2 border-yellow-400">pKa = 5.2</span> の1価の弱酸性薬物水溶液に関する記述のうち、正しいのはどれか。1つ選べ。<br/>
                ただし、イオン形薬物はすべて溶解するものとする。
              </p>
              <ul className="space-y-3 text-base md:text-lg">
                {[
                  "pH 5.2の溶液中では、分子形の薬物のみが存在する。",
                  "pH 7.2の溶液中では、イオン形薬物分率は約1%である。",
                  "pH 6.2における溶解度は、pH 5.2と比較して約10倍である。",
                  "pH 7.2における溶解度は、pH 5.2と比較して約50倍である。",
                  "pH 7.2における溶解度は、pH 5.2と比較して約100倍である。"
                ].map((text, index) => (
                  <li key={index} className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-start">
                    <span className="font-bold mr-3 text-indigo-600 bg-indigo-50 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">{index + 1}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2">着目すべき条件</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-lg">
                <li>1価の<span className="font-bold text-red-600 bg-white px-1 rounded mx-1">弱酸性</span>薬物</li>
                <li><strong>pKa = 5.2</strong></li>
                <li>比較対象：<strong>pH 5.2</strong> vs <strong>pH 7.2</strong></li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" /> なぜ「弱酸性」に着目する？
              </h4>
              <p className="text-sm text-yellow-900 mb-2">
                酸か塩基かによって、溶解度の公式が逆転するからです！
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-2 rounded border border-yellow-300">
                  <div className="font-bold text-red-600 text-center">弱酸性 (今回の正解)</div>
                  <div className="text-center font-mono mt-1 bg-gray-100 p-1 rounded">
                    1 + 10<sup>pH - pKa</sup>
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-1">pHが上がると溶ける</div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200 opacity-60">
                  <div className="font-bold text-blue-600 text-center">弱塩基性 (間違い)</div>
                  <div className="text-center font-mono mt-1 bg-gray-100 p-1 rounded">
                    1 + 10<sup>pKa - pH</sup>
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-1">pHが上がると溶けない</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-indigo-600"/>
                使う公式：総溶解度 S<sub>total</sub>
              </h4>
              <div className="text-2xl md:text-3xl font-bold text-center text-indigo-700 py-4 bg-indigo-50 rounded-lg font-mono">
                S<sub>total</sub>(pH) = S<sub>0</sub> (1 + 10<sup>pH - pKa</sup>)
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                S<sub>0</sub>: 分子形の固有溶解度（定数）
              </p>
            </div>
          </div>
        );
      case 2: 
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              なぜ <strong>S<sub>total</sub> = S<sub>0</sub> (1 + 10<sup>pH - pKa</sup>)</strong> になるのか？<br/>
              丸暗記ではなく、理論から導けるようになると応用が利きます。
            </p>
            
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800 flex items-center"><PenTool className="w-4 h-4 mr-2"/>1. 物質収支（総溶解度の定義）</h4>
                  <div className="text-xl font-mono text-gray-700 mt-2 pl-4">
                    S<sub>total</sub> = [HA] + [A<sup>-</sup>]
                  </div>
                  <p className="text-sm text-gray-500 mt-1 pl-4">（溶けている薬物は、分子形かイオン形のどちらか）</p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-bold text-gray-800 flex items-center"><PenTool className="w-4 h-4 mr-2"/>2. 飽和溶液のルール (固有溶解度)</h4>
                  
                  <div className="my-4 flex flex-col items-center">
                    <div className="relative w-64 h-48 border-x-2 border-b-2 border-gray-400 rounded-b-lg bg-blue-50 overflow-hidden flex flex-col items-center justify-end shadow-inner">
                      <div className="absolute top-2 right-2 text-blue-400 text-xs font-bold">水溶液 (pH)</div>
                      <div className="absolute top-8 w-full text-center">
                        <div className="flex items-center justify-center gap-2 font-bold text-gray-700 text-lg">
                          <span>HA</span>
                          <span className="text-base text-gray-500 mx-1">⇄</span>
                          <span>H⁺ + A⁻</span>
                        </div>
                        <div className="flex justify-center gap-4 text-xs text-gray-500 mt-1">
                          <span className="mr-8">(分子形)</span>
                          <span className="ml-2">(イオン形)</span>
                        </div>
                      </div>
                      <div className="absolute bottom-10 left-16 flex flex-col items-center z-10">
                        <div className="text-sm font-bold text-indigo-600 bg-white/80 px-1 rounded mb-1">S₀</div>
                        <div className="text-xl leading-none font-bold text-gray-600">⇅</div>
                      </div>
                      <div className="w-full h-10 bg-gray-500 flex items-center justify-center text-white font-bold text-sm z-0">
                        HA (沈殿 / 固相)
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
                      固相(沈殿)と平衡状態にあるのは、液相中の<span className="font-bold text-indigo-600">「分子形 (HA)」</span>のみです。<br/>
                      イオン形(A⁻)は沈殿しません。
                    </p>
                  </div>
                  <div className="text-xl font-mono text-gray-700 mt-2 pl-4">
                    [HA] = S<sub>0</sub> （一定）
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-gray-800 flex items-center"><PenTool className="w-4 h-4 mr-2"/>3. ヘンダーソン・ハッセルバルヒの式</h4>
                  <div className="text-xl font-mono text-gray-700 mt-2 pl-4">
                    log([A<sup>-</sup>] / [HA]) = pH - pKa
                  </div>
                  <div className="text-lg font-mono text-gray-600 mt-1 pl-8">
                    ∴ [A<sup>-</sup>] = [HA] × 10<sup>pH - pKa</sup>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg mt-2">
                  <h4 className="font-bold text-gray-800 mb-2">4. 式の合体（導出完了）</h4>
                  <div className="font-mono text-lg text-gray-700 leading-relaxed">
                    S<sub>total</sub> = S<sub>0</sub> + (S<sub>0</sub> × 10<sup>pH - pKa</sup>)<br/>
                    <span className="text-2xl font-bold text-indigo-700 mt-2 block border-t border-gray-300 pt-2">
                      S<sub>total</sub> = S<sub>0</sub> (1 + 10<sup>pH - pKa</sup>)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              まず、比較の基準となる <strong>pH 5.2</strong> での総溶解度 S<sub>total</sub> を計算します。<br/>
              ここがこの問題の最大の落とし穴です。
            </p>
            <div className="bg-white p-6 rounded-xl border border-gray-300">
              <p className="font-mono text-xl mb-4 text-center">
                pH = 5.2, pKa = 5.2 なので、<br/>
                <span className="font-bold text-2xl">pH - pKa = 0</span>
              </p>
              <div className="border-t pt-4">
                <p className="text-xl mb-2 text-center">これを公式に代入：</p>
                <div className="text-2xl font-bold text-center py-2 font-mono">
                  S<sub>total</sub> = S<sub>0</sub> (1 + 10<sup>0</sup>)
                </div>
                <div className="text-center text-gray-500 mb-4 font-bold text-red-500">(10<sup>0</sup> = 1 に注意！)</div>
                <div className="text-3xl font-bold text-center text-red-600 bg-red-50 py-4 rounded-lg border-2 border-red-200 font-mono">
                  S<sub>total</sub> = 2S<sub>0</sub>
                </div>
              </div>
            </div>
            <div className="flex items-start text-red-600 bg-red-50 p-3 rounded-lg text-base font-bold">
              <AlertTriangle className="w-6 h-6 mr-2 flex-shrink-0"/>
              <div>
                重要：pH = pKa のとき、総溶解度は固有溶解度の「2倍」になります。<br/>
                <span className="text-sm font-normal text-red-800">(分子形 : イオン形 = 1 : 1 で共存するため、合計で2になる)</span>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              次に、<strong>pH 7.2</strong> での総溶解度 S<sub>total</sub> を計算します。
            </p>
            <div className="bg-white p-6 rounded-xl border border-gray-300">
              <p className="font-mono text-xl mb-4 text-center">
                pH = 7.2, pKa = 5.2 なので、<br/>
                <span className="font-bold text-2xl">pH - pKa = 2</span>
              </p>
              <div className="border-t pt-4">
                <p className="text-xl mb-2 text-center">公式に代入：</p>
                <div className="text-2xl font-bold text-center py-2 font-mono">
                  S<sub>total</sub> = S<sub>0</sub> (1 + 10<sup>2</sup>)
                </div>
                <div className="text-center text-gray-500 mb-4">(10<sup>2</sup> = 100)</div>
                <div className="text-3xl font-bold text-center text-blue-600 bg-blue-50 py-4 rounded-lg border-2 border-blue-200 font-mono">
                  S<sub>total</sub> = 101S<sub>0</sub>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-center">
              実戦的には、101S<sub>0</sub> ≒ 100S<sub>0</sub> と近似して計算を速くしてもOKです。
            </p>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 text-center">
            <p className="text-xl font-bold text-gray-700">
              最後に、2つの総溶解度を比較（割り算）します。
            </p>
            
            <div className="inline-block p-8 bg-white rounded-2xl shadow-xl border-2 border-indigo-100">
              <div className="flex items-center justify-center text-2xl md:text-3xl font-mono mb-4 text-gray-600">
                 <div className="flex flex-col items-center mx-3">
                   <div className="border-b-2 border-gray-400 pb-1 mb-1 px-2">S<sub>total</sub>(pH 7.2)</div>
                   <div className="px-2">S<sub>total</sub>(pH 5.2)</div>
                 </div>
                 <span className="mx-2">=</span>
                 <div className="flex flex-col items-center mx-3">
                   <div className="border-b-2 border-gray-400 pb-1 mb-1 px-2">101 S<sub>0</sub></div>
                   <div className="px-2 text-red-500 font-bold">2 S<sub>0</sub></div>
                 </div>
              </div>
              
              <ArrowRight className="w-8 h-8 mx-auto text-gray-400 my-4 rotate-90" />
              
              <div className="text-5xl md:text-6xl font-bold text-indigo-700 my-4">
                ≒ 50.5 倍
              </div>
            </div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="bg-green-50 p-6 rounded-xl border border-green-200 text-left"
            >
              <h4 className="font-bold text-green-800 text-xl mb-2 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2"/> 結論
              </h4>
              <p className="text-lg text-gray-800 leading-relaxed">
                pH 7.2 における溶解度は、pH 5.2 と比較して <strong>約50倍</strong> となります。<br/>
                したがって、選択肢 <strong>4</strong> が正解です。
              </p>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  const titles = [
    "問題の確認",
    "Step 1: 条件整理と公式確認",
    "Step 2: 【重要】公式の導出プロセス",
    "Step 3: 基準 (pH 5.2) の計算",
    "Step 4: 比較対象 (pH 7.2) の計算",
    "Step 5: 最終的な倍率計算"
  ];

  return (
    <motion.div 
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
      className="flex flex-col h-screen bg-white"
    >
      <div className="bg-indigo-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 hover:bg-indigo-500 p-2 rounded-full transition"><Home className="w-6 h-6" /></button>
          <h1 className="text-xl font-bold">第99回 問174：ステップ解説</h1>
        </div>
        <div className="text-sm bg-indigo-700 px-3 py-1 rounded-full">
          Step {step + 1} / {titles.length}
        </div>
      </div>
      
      <Slide className="relative">
        <SectionTitle>{titles[step]}</SectionTitle>
        <div className="flex-1">
          <AnimatePresence mode='wait'>
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
          className={`px-6 py-3 rounded-lg font-bold flex items-center ${step === 0 ? 'text-gray-300 cursor-not-allowed' : 'bg-white border hover:bg-gray-100 text-gray-700'}`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> 前へ
        </button>
        <button 
          onClick={() => setStep(Math.min(titles.length - 1, step + 1))}
          disabled={step === titles.length - 1}
          className={`px-6 py-3 rounded-lg font-bold flex items-center ${step === titles.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'}`}
        >
          次へ <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

// ==========================================
// 問題: 第101回 問176 (目標溶解度)
// ==========================================
const Q101_176 = ({ onBack }) => {
  const [ph, setPh] = useState(1.0);
  const pka = 6.1;
  const s0 = 0.1;
  const solubility = s0 * (1 + Math.pow(10, ph - pka));

  return (
    <motion.div 
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
      className="flex flex-col h-screen bg-white"
    >
      <div className="bg-teal-600 text-white p-4 flex items-center shadow-md">
        <button onClick={onBack} className="mr-4 hover:bg-teal-500 p-2 rounded-full transition"><Home className="w-6 h-6" /></button>
        <h1 className="text-xl font-bold">第101回 問176：目標溶解度</h1>
      </div>
      <Slide>
        <SectionTitle>溶解度 1000μg/mL を目指せ</SectionTitle>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <label className="block text-gray-700 font-bold mb-2">調整 pH: <span className="text-3xl text-teal-600 font-mono ml-2">{ph.toFixed(1)}</span></label>
          <input type="range" min="1.0" max="11.0" step="0.1" value={ph} onChange={(e) => setPh(parseFloat(e.target.value))} className="w-full h-4 bg-gray-200 rounded-lg cursor-pointer accent-teal-600 mb-6"/>
          <div className="relative h-24 bg-gray-100 rounded-xl overflow-hidden border border-gray-300 flex items-center justify-center">
            <motion.div 
              className="absolute bottom-0 left-0 w-full bg-teal-500 opacity-50"
              initial={{ height: 0 }}
              animate={{ height: `${Math.min((solubility / 1000) * 100, 100)}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
            <div className="z-10 text-2xl font-bold text-gray-800">
              {solubility < 1000 ? solubility.toFixed(1) : Math.round(solubility).toLocaleString()} μg/mL
            </div>
          </div>
          {solubility >= 950 && solubility <= 1050 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center text-red-500 font-bold mt-4 text-xl"
            >
              目標達成！ (約 1000 μg/mL)
            </motion.div>
          )}
        </div>
      </Slide>
    </motion.div>
  );
};

// ==========================================
// ★新規: 第109回 問48 (Noyes-Whitney式)
// ==========================================
const Q109_48 = ({ onBack }) => {
  const [surfaceArea, setSurfaceArea] = useState(1);
  const [stirringSpeed, setStirringSpeed] = useState(1);
  const rate = surfaceArea * stirringSpeed; 

  return (
    <motion.div 
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
      className="flex flex-col h-screen bg-white"
    >
      <div className="bg-orange-600 text-white p-4 flex items-center shadow-md">
        <button onClick={onBack} className="mr-4 hover:bg-orange-500 p-2 rounded-full transition"><Home className="w-6 h-6" /></button>
        <h1 className="text-xl font-bold">第109回 問48：溶解速度</h1>
      </div>
      <Slide>
        <SectionTitle>Noyes-Whitney式を体感する</SectionTitle>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 mb-6 text-base">
          <p className="font-bold text-center mb-2 font-mono text-lg">dC/dt = (D・S / V・δ)・(Cs - C)</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>S (表面積):</strong> 粉砕して粒子を小さくすると増大</li>
            <li><strong>δ (拡散層):</strong> 攪拌（回転）を速くすると薄くなる(=分母が減る)</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2 flex items-center">
                <ArrowRight className="mr-2"/> 粒子の表面積 (S)
              </label>
              <input type="range" min="1" max="5" step="1" value={surfaceArea} onChange={(e) => setSurfaceArea(parseInt(e.target.value))} className="w-full h-4 bg-gray-200 rounded-lg cursor-pointer accent-orange-500"/>
              <div className="text-center text-sm text-gray-500 mt-1">{surfaceArea === 1 ? '大きい粒子(塊)' : '微粉砕(サラサラ)'}</div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2 flex items-center">
                <RotateCw className="mr-2"/> 攪拌速度 (1/δ)
              </label>
              <input type="range" min="1" max="5" step="1" value={stirringSpeed} onChange={(e) => setStirringSpeed(parseInt(e.target.value))} className="w-full h-4 bg-gray-200 rounded-lg cursor-pointer accent-orange-500"/>
              <div className="text-center text-sm text-gray-500 mt-1">{stirringSpeed === 1 ? '静置' : '高速回転'}</div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center">
            <div className="text-gray-600 font-bold mb-2">溶解速度 (dC/dt)</div>
            <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden relative">
              <motion.div 
                className="bg-orange-500 h-full flex items-center justify-end pr-2 text-white font-bold"
                initial={{ width: 0 }}
                animate={{ width: `${(rate / 25) * 100}%` }}
                transition={{ type: "spring", damping: 20 }}
              >
                {rate}
              </motion.div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {rate > 15 ? '爆速で溶ける！(微粉砕＋強攪拌)' : rate > 5 ? 'まあまあ溶ける' : 'なかなか溶けない...'}
            </p>
          </div>
        </div>
      </Slide>
    </motion.div>
  );
};

// ==========================================
// ★新規: 第109回 問50 (反応速度・安定性)
// ==========================================
const Q109_50 = ({ onBack }) => {
  const [temp, setTemp] = useState(25); // 温度
  
  // アレニウス式: k = A * exp(-Ea / RT)
  const rateConstant = Math.pow(2.5, (temp - 25) / 10);
  const remainingAfter1Year = Math.max(0, 100 - (rateConstant * 10)); 

  return (
    <motion.div 
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
      className="flex flex-col h-screen bg-white"
    >
      <div className="bg-rose-600 text-white p-4 flex items-center shadow-md">
        <button onClick={onBack} className="mr-4 hover:bg-rose-500 p-2 rounded-full transition"><Home className="w-6 h-6" /></button>
        <h1 className="text-xl font-bold">第109回 問50：安定性と温度</h1>
      </div>
      <Slide>
        <SectionTitle>アレニウスの式と保存温度</SectionTitle>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <label className="text-gray-700 font-bold text-lg flex items-center">
              <Thermometer className="mr-2 text-rose-600"/> 保存温度: 
              <span className="text-3xl text-rose-600 font-mono ml-2">{temp} ℃</span>
            </label>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded">
              {temp <= 5 ? '冷蔵庫 (冷所)' : temp <= 25 ? '室温' : '過酷試験'}
            </span>
          </div>
          <input type="range" min="5" max="60" step="5" value={temp} onChange={(e) => setTemp(parseInt(e.target.value))} className="w-full h-4 bg-gray-200 rounded-lg cursor-pointer accent-rose-600 mb-8"/>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200 text-center">
              <div className="text-rose-800 font-bold">分解速度定数 (k)</div>
              <motion.div 
                key={rateConstant}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold text-rose-600 mt-2"
              >
                x {rateConstant.toFixed(2)}
              </motion.div>
              <div className="text-xs text-rose-500 mt-1">25℃基準の倍率</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <div className="text-gray-800 font-bold flex justify-center items-center">
                <Clock className="w-4 h-4 mr-1"/> 1年後の残存率(仮想)
              </div>
              <motion.div 
                animate={{ color: remainingAfter1Year < 90 ? '#dc2626' : '#16a34a' }}
                className="text-3xl font-bold mt-2"
              >
                {remainingAfter1Year.toFixed(1)} %
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">
                {remainingAfter1Year < 90 ? '有効期限切れ...' : '品質保持OK'}
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </motion.div>
  );
};

// ==========================================
// プレースホルダー (汎用テンプレート)
// ==========================================
const GenericQuestionPage = ({ title, subTitle, onBack }) => (
  <motion.div 
    initial="initial" animate="animate" exit="exit" variants={pageVariants}
    className="flex flex-col h-screen bg-gray-50"
  >
    <div className="bg-slate-700 text-white p-4 flex items-center">
      <button onClick={onBack} className="mr-4 hover:bg-slate-600 p-2 rounded-full transition"><Home className="w-6 h-6" /></button>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-lg w-full">
        <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500 mb-6">{subTitle}</p>
        <div className="bg-slate-50 p-4 rounded-lg text-left text-sm text-gray-600 mb-6">
          <p className="font-bold mb-2">【解説のポイント】</p>
          <ul className="list-disc list-inside space-y-1">
            <li>問題文の条件を整理する</li>
            <li>適用する公式を確認する</li>
            <li>計算プロセスを可視化する</li>
          </ul>
        </div>
        <button onClick={onBack} className="w-full py-3 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700 transition">
          メニューに戻る
        </button>
      </div>
    </div>
  </motion.div>
);

// ==========================================
// メインメニュー
// ==========================================
const MenuScreen = ({ onSelect }) => {
  const questions = [
    { id: '99-174', title: '第99回 問174', desc: '物理：弱酸性薬物の溶解度変化', icon: Calculator, color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { id: '101-176', title: '第101回 問176', desc: '物理：目標溶解度へのpH調整', icon: TestTube, color: 'bg-teal-50 border-teal-200 text-teal-700' },
    { id: '104-170', title: '第104回 問170', desc: '物理：分配平衡・pHプロファイル', icon: Activity, color: 'bg-white border-gray-200 text-gray-700' },
    { id: '108-175', title: '第108回 問175', desc: '物理：粉体・レオロジー', icon: Activity, color: 'bg-white border-gray-200 text-gray-700' },
    { id: '109-48',  title: '第109回 問48',  desc: '薬剤：Noyes-Whitney式', icon: RotateCw, color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { id: '109-50',  title: '第109回 問50',  desc: '薬剤：安定性と反応速度論', icon: Thermometer, color: 'bg-rose-50 border-rose-200 text-rose-700' },
  ];

  return (
    <motion.div 
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
      className="min-h-screen bg-gray-100 flex flex-col items-center p-6 font-sans"
    >
      <div className="max-w-4xl w-full">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">薬剤師国家試験 解説アプリ</h1>
          <p className="text-gray-500">物理化学・製剤学をシミュレーターで攻略</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q) => (
            <motion.button
              key={q.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(q.id)}
              className={`p-6 rounded-xl shadow-sm border-2 transition-all text-left group flex items-start ${q.color} hover:border-current`}
            >
              <q.icon className="w-8 h-8 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-1">{q.title}</h3>
                <p className="text-sm opacity-80">{q.desc}</p>
              </div>
              <ChevronRight className="ml-auto w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity self-center" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// アプリ本体
// ==========================================
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('menu');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu': return <MenuScreen onSelect={setCurrentScreen} />;
      case '99-174': return <Q99_174 onBack={() => setCurrentScreen('menu')} />;
      case '101-176': return <Q101_176 onBack={() => setCurrentScreen('menu')} />;
      case '104-170': return <GenericQuestionPage title="第104回 問170" subTitle="分配平衡・pHプロファイル" onBack={() => setCurrentScreen('menu')} />;
      case '108-175': return <GenericQuestionPage title="第108回 問175" subTitle="粉体・レオロジー" onBack={() => setCurrentScreen('menu')} />;
      case '109-48': return <Q109_48 onBack={() => setCurrentScreen('menu')} />;
      case '109-50': return <Q109_50 onBack={() => setCurrentScreen('menu')} />;
      default: return <MenuScreen onSelect={setCurrentScreen} />;
    }
  };

  return (
    <div className="font-sans text-gray-800 overflow-hidden">
      <AnimatePresence mode="wait">
        <div key={currentScreen} className="h-full">
          {renderScreen()}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default App;
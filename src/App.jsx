import React, { useState } from 'react';
import { 
  ChevronRight, ChevronLeft, Calculator, CheckCircle, 
  AlertTriangle, ArrowRight, Lightbulb, PenTool, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 共通コンポーネント & アニメーション設定
// ==========================================

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
// 問題: 第99回 問174 (論理的解法 + 選択肢解説)
// ==========================================
const Q99_174 = () => {
  const [step, setStep] = useState(0);
  // 選択肢の開閉状態を管理
  const [openOption, setOpenOption] = useState(null);

  const toggleOption = (index) => {
    setOpenOption(openOption === index ? null : index);
  };

  const options = [
    {
      text: "pH 5.2の溶液中では、分子形の薬物のみが存在する。",
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <br/>
          <h5 className="font-bold text-sm mt-2 mb-1">論理：存在比の計算</h5>
          <div className="bg-gray-100 p-2 rounded text-sm leading-relaxed">
            log([A⁻] / [HA]) = pH - pKa = 5.2 - 5.2 = 0
            <br/>
            ∴ [A⁻] / [HA] = 10⁰ = 1
          </div>
          <p className="mt-2">
            **分子形 [HA] : イオン形 [A⁻] = 1 : 1** で共存します。「分子形のみ」ではありません。
          </p>
        </>
      )
    },
    {
      text: "pH 7.2の溶液中では、イオン形薬物分率は約1%である。",
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <br/>
          <h5 className="font-bold text-sm mt-2 mb-1">論理：イオン形分率の計算</h5>
          <div className="bg-gray-100 p-2 rounded text-sm leading-relaxed">
            log([A⁻] / [HA]) = pH - pKa = 7.2 - 5.2 = 2
            <br/>
            [A⁻] / [HA] = 10² = 100
          </div>
          <p className="mt-2">
            イオン形分率 = 100 / (1 + 100) ≈ 0.99 (99%)。<br/>
            したがって「約1%」は<span className="font-bold text-red-500">誤り</span>です。
          </p>
        </>
      )
    },
    {
      text: "pH 6.2における溶解度は、pH 5.2と比較して約10倍である。",
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <br/>
          <h5 className="font-bold text-sm mt-2 mb-1">論理：溶解度比の計算 (pH 6.2 vs pH 5.2)</h5>
          <div className="bg-gray-100 p-2 rounded text-sm leading-relaxed mb-2">
            S<sub>total</sub>(5.2) = S₀ (1 + 10⁰) = <span className="font-bold text-red-600">2S₀</span> (基準)<br/>
            S<sub>total</sub>(6.2) = S₀ (1 + 10¹) = <span className="font-bold text-blue-600">11S₀</span>
          </div>
          <p className="font-bold text-sm text-center">
            倍率: 11S₀ ÷ 2S₀ = 5.5倍
          </p>
          <p className="mt-2">
            <span className="font-bold">5.5倍</span>であり、「10倍」ではありません。
          </p>
        </>
      )
    },
    {
      text: "pH 7.2における溶解度は、pH 5.2と比較して約50倍である。",
      isCorrect: true,
      explanation: (
        <>
          <span className="font-bold text-green-600">【正解】</span>
          <br/>
          <h5 className="font-bold text-sm mt-2 mb-1">論理：溶解度比の計算 (pH 7.2 vs pH 5.2)</h5>
          <div className="bg-gray-100 p-2 rounded text-sm leading-relaxed mb-2">
            S<sub>total</sub>(5.2) = <span className="font-bold text-red-600">2S₀</span> (基準)<br/>
            S<sub>total</sub>(7.2) = S₀ (1 + 10²) = <span className="font-bold text-blue-600">101S₀</span>
          </div>
          <p className="font-bold text-sm text-center">
            倍率: 101S₀ ÷ 2S₀ ≈ 50.5倍
          </p>
          <div className="bg-green-100 p-2 rounded font-bold text-base text-green-700 mt-2">
            **約50倍**となり、選択肢は正しい。
          </div>
        </>
      )
    },
    {
      text: "pH 7.2における溶解度は、pH 5.2と比較して約100倍である。",
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <br/>
          <h5 className="font-bold text-sm mt-2 mb-1">論理：分母の「2S₀」がポイント</h5>
          <p className="mt-2">
            分子形の100倍になるのは<span className="font-bold text-blue-600">イオン形の濃度</span>です（[A⁻] = 100S₀）。<br/>
            溶解度の倍率を計算する際は、分母が S₀ ではなく、**S(pH 5.2) = 2S₀** であるため、100倍ではなく50倍になります。
          </p>
        </>
      )
    }
  ];

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
              
              <div className="space-y-3">
                {options.map((opt, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 overflow-hidden">
                    <button 
                      onClick={() => toggleOption(index)}
                      className={`w-full p-4 text-left flex items-start transition-colors ${openOption === index ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                    >
                      <span className={`font-bold mr-3 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${opt.isCorrect ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {index + 1}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {openOption === index ? <ChevronUp className="w-5 h-5 text-gray-400"/> : <ChevronDown className="w-5 h-5 text-gray-400"/>}
                    </button>
                    
                    <AnimatePresence>
                      {openOption === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-gray-50 px-4 overflow-hidden"
                        >
                          <div className="py-4 border-t border-gray-200 text-base text-gray-700 leading-relaxed">
                            {opt.explanation}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-400 mt-4">選択肢をクリックすると詳細な解説が表示されます</p>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setStep(1)} 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center mx-auto"
                >
                  論理的解法ステップへ <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
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
                    S = S₀ (1 + 10<sup>pH - pKa</sup>)
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-1">pHが上がると溶ける</div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200 opacity-60">
                  <div className="font-bold text-blue-600 text-center">弱塩基性 (間違い)</div>
                  <div className="text-center font-mono mt-1 bg-gray-100 p-1 rounded">
                    S = S₀ (1 + 10<sup>pKa - pH</sup>)
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
                S<sub>total</sub> = S<sub>0</sub> (1 + 10<sup>pH - pKa</sup>)
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
              なぜ <strong>S<sub>total</sub> = S<sub>0</sub> (1 + 10<sup>pH - pKa</sup>)</strong> になるのか？
            </p>
            
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800 flex items-center"><PenTool className="w-4 h-4 mr-2"/>1. 物質収支（総溶解度の定義）</h4>
                  <div className="text-xl font-mono text-gray-700 mt-2 pl-4">
                    S<sub>total</sub> = [HA] + [A<sup>-</sup>]
                  </div>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-bold text-gray-800 flex items-center"><PenTool className="w-4 h-4 mr-2"/>2. 飽和溶液のルール (固有溶解度)</h4>
                  
                  <div className="my-4 flex flex-col items-center">
                    <div className="relative w-64 h-40 border-x-2 border-b-2 border-gray-400 rounded-b-lg bg-blue-50 overflow-hidden flex flex-col items-center justify-end shadow-inner">
                      <div className="absolute top-4 right-2 text-blue-400 text-xs font-bold">水溶液 (pH)</div>
                      
                      <div className="absolute top-10 w-full text-center">
                        <div className="flex items-center justify-center gap-2 font-bold text-gray-700 text-lg">
                          <span>HA</span>
                          <span className="text-base text-gray-500">⇄</span>
                          <span>H⁺ + A⁻</span>
                        </div>
                        <div className="flex justify-center gap-4 text-xs text-gray-500 mt-1">
                          <span className="mr-6">(分子形)</span>
                          <span>(イオン形)</span>
                        </div>
                      </div>

                      <div className="absolute bottom-10 left-20 flex flex-col items-center z-10">
                        <div className="text-sm font-bold text-indigo-600 bg-white/80 px-1 rounded">S₀</div>
                        <div className="text-lg leading-none font-bold text-gray-600">⇅</div>
                      </div>

                      <div className="w-full h-8 bg-gray-500 flex items-center justify-center text-white font-bold text-sm z-0">
                        HA (沈殿 / 固相)
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-300">
                      沈殿と平衡にあるのは<span className="font-bold text-indigo-600">「分子形 (HA)」のみ</span>です！
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
              まず、比較の基準となる <strong>pH 5.2</strong> での総溶解度 S<sub>total</sub> を計算します。
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
                選択肢 <strong>4</strong> が正解です。
              </p>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  const titles = [
    "問題の確認・選択肢解説",
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
        <h1 className="text-xl font-bold">第99回 問174：ステップ解説</h1>
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
          {step === 0 ? '解法ステップへ' : '次へ'} <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

// ==========================================
// アプリ本体
// ==========================================
const App = () => {
  return (
    <div className="font-sans text-gray-800 overflow-hidden h-full">
      <Q99_174 />
    </div>
  );
};

export default App;
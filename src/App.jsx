import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ChevronRight, ChevronLeft, Home, 
  Calculator, TestTube, Brain, CheckCircle, XCircle, 
  AlertTriangle, Menu, ArrowRight, Thermometer, RotateCw, Clock, Activity, Lightbulb, MousePointerClick, PenTool, ChevronDown, ChevronUp
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
// 問題: 第99回 問174 (論理的解法 + 選択肢解説)
// ==========================================
const Q99_174 = ({ onBack }) => {
  const [step, setStep] = useState(0);
  // 選択肢の開閉状態を管理
  const [openOption, setOpenOption] = useState(null);

  const toggleOption = (index) => {
    setOpenOption(openOption === index ? null : index);
  };

  const options = [
    {
      text: "1. pH 5.2の溶液中では、分子形の薬物のみが存在する。",
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
      text: "2. pH 7.2の溶液中では、イオン形薬物分率は約1%である。",
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
      text: "3. pH 6.2における溶解度は、pH 5.2と比較して約10倍である。",
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
          <p className="font-bold text-sm text-center mt-2">
            倍率: 11S₀ ÷ 2S₀ = 5.5倍
          </p>
          <p className="mt-2">
            <span className="font-bold">5.5倍</span>であり、「10倍」ではありません。
          </p>
        </>
      )
    },
    {
      text: "4. pH 7.2における溶解度は、pH 5.2と比較して約50倍である。",
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
          <p className="font-bold text-sm text-center mt-2">
            倍率: 101S₀ ÷ 2S₀ ≈ 50.5倍
          </p>
          <div className="bg-green-100 p-2 rounded font-bold text-base text-green-700 mt-2">
            **約50倍**となり、選択肢は正しい。
          </div>
        </>
      )
    },
    {
      text: "5. pH 7.2における溶解度は、pH 5.2と比較して約100倍である。",
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
                  論理的解法ステップを開始 <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2">Step 1：着目すべき条件</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-lg">
                <li>1価の<span className="font-bold text-red-600 bg-white px-1 rounded mx-1">弱酸性</span>薬物</li>
                <li><strong>pKa = 5.2</strong></li>
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
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">選択肢 1・2 の検討：存在比の計算</h3>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-indigo-700 mb-2">① 選択肢 1: pH 5.2 (pKa) のとき</h4>
              <p className="mb-2 text-sm text-gray-600">ヘンダーソン・ハッセルバルヒの式より：</p>
              <div className="font-mono text-xl bg-gray-50 p-3 rounded text-center">
                log([A⁻]/[HA]) = 5.2 - 5.2 = 0<br/>
                ∴ [A⁻]/[HA] = 10⁰ = <span className="font-bold text-red-600">1</span>
              </div>
              <div className="mt-3 p-3 bg-red-50 rounded border border-red-100 text-sm">
                <strong>結論：</strong> 分子形とイオン形は 1:1 で共存します。<br/>
                選択肢1「分子形のみ存在する」は <span className="font-bold text-red-600">× 誤り</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-indigo-700 mb-2">② 選択肢 2: pH 7.2 (pKa + 2) のとき</h4>
              <div className="font-mono text-xl bg-gray-50 p-3 rounded text-center">
                log([A⁻]/[HA]) = 7.2 - 5.2 = 2<br/>
                ∴ [A⁻]/[HA] = 10² = <span className="font-bold text-blue-600">100</span>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-100 text-sm">
                <strong>結論：</strong> イオン形分率 = 100 / (1+100) ≒ 99%<br/>
                選択肢2「約1%である」は <span className="font-bold text-red-600">× 誤り</span>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">選択肢 3 の検討：pH 6.2の溶解度</h3>
            
            <p className="text-gray-700">まず、比較の基準となる <strong>S<sub>total</sub>(pH 5.2)</strong> を計算します。</p>
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-300">
              <div className="font-mono text-xl text-center">
                S<sub>total</sub>(5.2) = S₀(1 + 10⁰) = <span className="font-bold text-red-600 text-2xl">2S₀</span>
              </div>
              <p className="text-center text-sm text-red-700 mt-2 font-bold">※ここが計算の基準（分母）になります！</p>
            </div>

            <p className="text-gray-700 mt-4">次に、<strong>S<sub>total</sub>(pH 6.2)</strong> を計算します。</p>
            <div className="bg-white p-4 rounded-xl border border-gray-300">
              <div className="font-mono text-xl text-center">
                S<sub>total</sub>(6.2) = S₀(1 + 10¹) = <span className="font-bold text-blue-600 text-2xl">11S₀</span>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl text-center">
              <p className="font-bold mb-2">倍率の計算</p>
              <div className="text-2xl font-mono">
                11S₀ ÷ 2S₀ = <span className="font-bold text-indigo-700">5.5 倍</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                選択肢3「約10倍」は <span className="font-bold text-red-600">× 誤り</span>
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">選択肢 4・5 の検討：pH 7.2の溶解度</h3>
            
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-50 px-6 py-2 rounded-full border border-yellow-300 text-yellow-800 font-bold">
                基準: S<sub>total</sub>(5.2) = 2S₀
              </div>
            </div>

            <p className="text-gray-700"><strong>S<sub>total</sub>(pH 7.2)</strong> を計算します。</p>
            <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
              <div className="font-mono text-xl text-center mb-4">
                pH - pKa = 7.2 - 5.2 = 2
              </div>
              <div className="font-mono text-2xl text-center border-t pt-4">
                S<sub>total</sub>(7.2) = S₀(1 + 10²) = <span className="font-bold text-blue-600 text-3xl">101S₀</span>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">（10² = 100 なので 1+100=101）</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-green-400"></div>
              <p className="font-bold text-green-800 mb-2 text-lg">最終的な倍率計算</p>
              <div className="text-3xl md:text-4xl font-mono font-bold text-green-700">
                101S₀ ÷ 2S₀ ≒ <span className="text-5xl">50.5</span> 倍
              </div>
              <div className="mt-4 flex justify-center gap-4 text-sm font-bold">
                <div className="bg-white px-4 py-2 rounded shadow-sm text-gray-400 line-through">選択肢5: 100倍</div>
                <div className="bg-green-600 text-white px-4 py-2 rounded shadow-sm">選択肢4: 50倍 (正解)</div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-8 text-center h-full flex flex-col justify-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-100"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">解説終了</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                以上より、正解は選択肢 <strong>4</strong> です。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-600">
                <p className="font-bold mb-2">【重要ポイントの復習】</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>弱酸性薬物の溶解度式： <span className="font-mono">S = S₀(1+10<sup>pH-pKa</sup>)</span></li>
                  <li>pH = pKa のとき： <span className="font-mono text-red-500 font-bold">S = 2S₀</span> (これが基準になる！)</li>
                  <li>pH = pKa + 2 のとき： <span className="font-mono text-blue-500 font-bold">S ≒ 100S₀</span></li>
                  <li>倍率計算： <span className="font-mono">100S₀ ÷ 2S₀ = 50倍</span></li>
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

  const titles = [
    "問題の確認・選択肢解説",
    "Step 1: 条件整理と公式確認",
    "Step 2: 公式の導出プロセス",
    "Step 3: 選択肢1・2 (存在比) の検討",
    "Step 4: 選択肢3 (pH 6.2) の検討",
    "Step 5: 選択肢4・5 (pH 7.2) の検討",
    "Step 6: 結論・まとめ"
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
          {step === 0 ? '解法ステップへ' : '次へ'} <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

// ==========================================
// 第101回 問176：目標溶解度までのpHを求める
// ==========================================
const Q101_176 = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [ph, setPh] = useState(1.0);

  const pka = 6.1;
  const s0 = 0.1; // pH=1での溶解度≈固有溶解度（µg/mL）
  const solubility = s0 * (1 + Math.pow(10, ph - pka));
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
              Step 3：スライダーでイメージを掴む
            </h3>

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
                className="w-full h-4 bg-gray-200 rounded-lg cursor-pointer accent-teal-600 mb-6"
              />

              <div className="relative h-24 bg-gray-100 rounded-xl overflow-hidden border border-gray-300 flex items-center justify-center">
                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-teal-500 opacity-50"
                  initial={{ height: 0 }}
                  animate={{
                    height: `${Math.min((solubility / 1000) * 100, 100)}%`
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
                <div className="z-10 text-2xl font-bold text-gray-800">
                  {solubility < 1000
                    ? solubility.toFixed(1)
                    : Math.round(solubility).toLocaleString()}{" "}
                  μg/mL
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-3 text-center">
                おおよそ pH = 10 付近で、溶解度が 1,000 μg/mL に近づくことを体感できます。
              </p>
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

// ==========================================
// 第104回 問170：pHと分子形/イオン形の溶解平衡
// ==========================================
const Q104_170 = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [openOption, setOpenOption] = useState(null);

  const toggleOption = (index) => {
    setOpenOption(openOption === index ? null : index);
  };

  // 選択肢と解説
  const options = [
    {
      text: "1. 弱電解質Aは弱酸性化合物である。",
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
      )
    },
    {
      text: "2. 弱電解質Aの pKa は 2.0 である。",
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
      )
    },
    {
      text: "3. 25℃において，pH 7.0 のときの弱電解質Aの溶解度は，pH 6.0 のときの溶解度の約10倍になると予想される。",
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
      )
    },
    {
      text: "4. 25℃において，pH 1.0 のときの弱電解質Aの溶解度は，pH 2.0 のときの溶解度の約1/10倍になると予想される。",
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
      )
    },
    {
      text: "5. 25℃において，弱電解質A 5 mg を水1 mLに分散させたとき，pH 5.5以上になると全量が溶解すると予想される。",
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
            よって，<span className="font-bold">pH5.5 では 5 mg/mL は溶解しきらない</span>
            ため，
            「pH5.5以上になると全量が溶解する」という記述は誤りです。
          </p>
        </>
      )
    }
  ];

  const titles = [
    "問題とグラフの確認",
    "Step 1: 図から性質（弱酸・pKa）を読み取る",
    "Step 2: 溶解度式で倍率を計算する",
    "Step 3: 選択肢ごとの検討",
    "Step 4: 結論・まとめ"
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

              {/* 図の表示：パスは適宜変更してください */}
              <div className="my-4 flex justify-center">
                <img
                  src="/image/104-170-graph.png"
                  alt="第104回問170：pHと分子形・イオン形濃度の関係グラフ"
                  className="max-w-full max-h-[60vh] object-contain h-auto border rounded-lg shadow-sm"
                />
              </div>

              <div className="mt-4 bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-gray-700">
                <p className="font-bold text-sky-800 mb-1">図からわかること（ざっくり）</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>実線（―）は pH によらず一定（0.1 mg/mL） → 分子形濃度</li>
                  <li>破線（--）は pH が高くなるほど増加 → イオン形濃度</li>
                  <li>pH 4 で分子形とイオン形が同じ濃度 → pH 4 = pK<sub>a</sub></li>
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
                </span>{" "}
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
              <span className="font-mono">S = S₀(1+10<sup>pH−pK<sub>a</sub></sup>)</span>
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
                      openOption === index
                        ? "bg-sky-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`font-bold mr-3 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${
                        opt.isCorrect
                          ? "bg-sky-600 text-white"
                          : "bg-gray-200 text-gray-600"
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
                        animate={{ height: "auto", opacity: 1 }}
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
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
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
                    <span className="font-bold">pK<sub>a</sub> ≒ 4</span>
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
              : "bg-sky-600 text-white hover:bg-sky-700 shadow-md"
          }`}
        >
          {step === 0 ? "解法ステップへ" : "次へ"}{" "}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

// ==========================================
// ★新規: 第108回 問175 (弱電解質の溶解平衡)
// ==========================================
const Q108_175 = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [openOption, setOpenOption] = useState(null);

  const toggleOption = (index) => {
    setOpenOption(openOption === index ? null : index);
  };

  const options = [
    {
      text: "1. 用いた薬物は1.1 molである。",
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
      text: "2. 薬物は弱酸性化合物である。",
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
      text: "3. 薬物の pKa は 5 である。",
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm">
            pH 7 のとき、グラフより
          </p>
          <div className="bg-gray-100 rounded p-2 text-sm font-mono">
            総濃度 ≒ 1.1 mol/L<br />
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
            pH = 7 なので pKa ≒ 6 と求まります。<br />
            よって「pKa は 5」は<strong>誤り</strong>です。
          </p>
        </>
      ),
    },
    {
      text: "4. pH 7 のとき、薬物の分子形濃度とイオン形濃度の比は 1：10 である。",
      isCorrect: true,
      explanation: (
        <>
          <span className="font-bold text-green-600">【正解】</span>
          <p className="mt-2 text-sm">
            上と同じく pH 7 では、
          </p>
          <div className="bg-gray-100 rounded p-2 text-sm font-mono">
            [HA] ≒ 0.10 mol/L<br />
            [A⁻] ≒ 1.00 mol/L
          </div>
          <p className="mt-2 text-sm">
            したがって
          </p>
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
      text: "5. pH 8 のとき、薬物の結晶が液中に存在する。",
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
    "問題とグラフの確認",
    "Step 1：グラフから性質を読み取る",
    "Step 2：pKa と量をざっくり計算",
    "Step 3：選択肢ごとの検討",
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
                ただし、薬物の分子形とイオン形の溶解平衡時の濃度比は Henderson–Hasselbalch
                の式に従い、薬物の溶解や pH 調整に伴う容積変化は無視できるものとする。
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
                      <span>{opt.text.replace(/^\d\.\s*/, "")}</span>
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
              <h4 className="font-bold text-gray-800 mb-3">総濃度と分子形濃度のグラフを並べて確認</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-bold text-gray-700 mb-2">薬物の総濃度</p>
                  <img
                    src="/image/108-175-graph_total.png"
                    alt="第108回問175：薬物の総濃度のグラフ"
                    className="w-full max-w-md h-auto object-contain border border-gray-200 rounded-md bg-white"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-bold text-gray-700 mb-2">分子形薬物濃度</p>
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
                  分子形濃度が一定 → <strong>固有溶解度 S₀ ≒ 0.10 mol/L</strong>
                </li>
                <li>
                  pH 上昇でイオン形が大きく増える →{" "}
                  <strong>弱酸性薬物</strong> の挙動
                </li>
                <li>
                  pH 7 以上で総濃度が一定 →{" "}
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
                n = C × V = 1.1 mol/L × 0.1 L ={" "}
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
              <p className="text-sm md:text-base mb-2">
                pH 7 で、
              </p>
              <div className="bg-gray-50 rounded p-3 font-mono text-sm md:text-base text-center">
                総濃度 ≒ 1.1 mol/L<br />
                分子形濃度 [HA] ≒ 0.10 mol/L<br />
                イオン形濃度 [A⁻] ≒ 1.1 − 0.10 = 1.0 mol/L
              </div>
              <p className="mt-2 text-sm md:text-base">
                よって、
              </p>
              <div className="bg-gray-50 rounded p-3 font-mono text-sm md:text-base text-center">
                [A⁻]/[HA] ≒ 1.0 / 0.10 = 10
              </div>
              <p className="mt-2 text-sm md:text-base">
                弱酸 HA のヘンダーソン・ハッセルバルヒの式：
              </p>
              <div className="bg-gray-50 rounded p-3 font-mono text-sm md:text-base text-center">
                pH = pKa + log([A⁻]/[HA])<br />
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
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`font-bold mr-3 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${
                        opt.isCorrect
                          ? "bg-green-600 text-white"
                          : "bg-gray-300 text-gray-700"
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
                        animate={{ height: "auto", opacity: 1 }}
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
                以上より、正しい選択肢は{" "}
                <span className="font-bold text-green-700">2 と 4</span>{" "}
                です。
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
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
          }`}
        >
          {step === 0 ? "解法ステップへ" : "次へ"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

// ==========================================
// ★新規: 第109回 問48（溶出性に影響しない因子）
// ==========================================
const Q109_48 = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [surfaceArea, setSurfaceArea] = useState(3);   // 粒子径イメージ用
  const [viscosity, setViscosity] = useState(3);       // 粘度イメージ用

  // 粒子径が小さいほど表面積↑ → 値を反転して表現
  const surfaceFactor = 6 - surfaceArea;   // 1(大きい粒)→5, 5(微粉)→1
  // 粘度が高いほど拡散速度↓ → 係数は逆比例的に小さく
  const viscosityFactor = 6 - viscosity;   // 1(低粘度)→5, 5(高粘度)→1
  const rate = surfaceFactor * viscosityFactor;

  const titles = [
    "問題の確認",
    "Step 1：Noyes-Whitney式と溶出に効く因子",
    "Step 2：弱電解質＋pHと粘度のイメージ",
    "Step 3：選択肢ごとの検討・結論"
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第109回 問48
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  経口固形製剤からの弱電解質薬物の溶出性
                </h4>
              </div>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                経口固形製剤からの<strong className="mx-1">弱電解質薬物の溶出性</strong>
                に<strong className="mx-1 underline decoration-red-500 decoration-2">影響を及ぼさない因子</strong>
                はどれか。1つ選べ。
              </p>

              <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm md:text-base">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ol className="space-y-1 text-gray-800">
                  <li>1　薬物の粒子径</li>
                  <li>2　薬物の結晶性</li>
                  <li>3　タンパク結合率</li>
                  <li>4　溶液のpH</li>
                  <li>5　溶液の粘度</li>
                </ol>
              </div>

              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-gray-700">
                <p className="font-bold text-orange-800 mb-1">ポイント</p>
                <p>
                  「溶出性」＝<strong>製剤から溶液中へ溶け出す速さ・量</strong>です。
                  血中に入った後の挙動（分布・タンパク結合）は一旦忘れましょう。
                </p>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-md inline-flex items-center"
                >
                  解法ステップを見ていく
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500">
              <h4 className="font-bold text-orange-700 mb-2">
                Step 1：Noyes-Whitney式で「溶出に効く因子」を整理
              </h4>
              <p className="text-sm md:text-base text-gray-700 mb-2">
                固体からの溶出速度は Noyes-Whitney式で表されます。
              </p>
              <p className="font-bold text-center mb-2 font-mono text-lg">
                dC/dt = (D・S / V・δ)・(C<sub>s</sub> − C)
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                <li>
                  <strong>S（表面積）</strong>：粒子径が小さいほど S↑ → 溶出速度↑
                </li>
                <li>
                  <strong>C<sub>s</sub>（飽和溶解度）</strong>：結晶性・pH で変化
                </li>
                <li>
                  <strong>δ・D（拡散層の厚さ・拡散係数）</strong>：
                  溶液の粘度や撹拌条件に依存
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">
                どの選択肢がどの項に対応する？
              </h4>
              <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                <li>薬物の粒子径 → S（表面積）</li>
                <li>薬物の結晶性 → C<sub>s</sub>（飽和溶解度）</li>
                <li>溶液のpH → 弱電解質なら C<sub>s</sub> に強く影響</li>
                <li>溶液の粘度 → D・δ（拡散速度・拡散層の厚さ）</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                ここまでで<strong>1,2,4,5 は溶出に関係しそう</strong>なことが分かります。
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">
                弱電解質では「pH・粒子径・粘度」が効いてくる
              </h4>
              <p className="text-sm md:text-base text-gray-700 mb-3">
                スライダーを動かして、溶出速度がどう変わるかイメージしてみましょう。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2 flex items-center">
                    <ArrowRight className="mr-2" />
                    薬物の粒子径（小さいほど表面積↑）
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={surfaceArea}
                    onChange={(e) => setSurfaceArea(parseInt(e.target.value))}
                    className="w-full h-4 bg-gray-200 rounded-lg cursor-pointer accent-orange-500"
                  />
                  <div className="text-center text-sm text-gray-500 mt-1">
                    {surfaceArea === 1
                      ? "とても大きな粒（錠剤のまま）"
                      : surfaceArea === 5
                      ? "微粉砕（サラサラ粉末）"
                      : "普通の粉砕粒子"}
                  </div>

                  {/* 粒子径のイラスト：大きな粒 vs 細かい粒 */}
                  <div className="mt-3 flex justify-center gap-6 text-xs md:text-sm text-gray-600">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-12 border border-orange-200 rounded-lg bg-white flex items-center justify-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-orange-300" />
                        <div className="w-4 h-4 rounded-full bg-orange-300" />
                        <div className="w-4 h-4 rounded-full bg-orange-300" />
                      </div>
                      <span className="mt-1">大きな粒（表面積が小さい）</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-12 border border-orange-200 rounded-lg bg-white flex flex-wrap items-center justify-center gap-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                      </div>
                      <span className="mt-1">細かい粒（表面積が大きい）</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2 flex items-center">
                    <RotateCw className="mr-2" />
                    溶液の粘度（高いほど拡散しにくい）
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={viscosity}
                    onChange={(e) => setViscosity(parseInt(e.target.value))}
                    className="w-full h-4 bg-gray-200 rounded-lg cursor-pointer accent-orange-500"
                  />
                  <div className="text-center text-sm text-gray-500 mt-1">
                    {viscosity === 1
                      ? "低粘度（水のよう）"
                      : viscosity === 5
                      ? "高粘度（シロップ状）"
                      : "中程度の粘度"}
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center">
                <div className="text-gray-600 font-bold mb-2">
                  溶出速度のイメージ
                </div>
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
                  粒子を細かく（表面積↑）、粘度を下げるほど（拡散しやすく）{" "}
                  <strong>溶出が速くなる</strong>ことが分かります。
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm md:text-base">
              <p className="font-bold text-yellow-800 mb-1">ここまでのまとめ</p>
              <p>
                溶出過程だけを考えると、関わるのは{" "}
                <strong>「粒子径・結晶性・pH・粘度」</strong> です。
                <br />
                一方で<strong>タンパク結合率</strong>は「血中に吸収された後」の分布に関わる
                パラメータであり、製剤から溶け出す段階の速さには関係しません。
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
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-orange-100 max-w-xl mx-auto"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                解説終了：正解は「3 タンパク結合率」
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                経口固形製剤からの<strong>溶出性</strong>に影響を及ぼさない因子は
                <br />
                <strong className="text-orange-600">
                  3 タンパク結合率
                </strong>
                です。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-600">
                <p className="font-bold mb-2">【重要ポイント】</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>溶出性＝製剤から溶液中へ溶け出す速度・量</li>
                  <li>粒子径・結晶性・pH・粘度は Noyes-Whitney式の因子として関与</li>
                  <li>タンパク結合率は吸収後の分布に関する因子 → 溶出には影響しない</li>
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
      <div className="bg-orange-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-orange-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第109回 問48：ステップ解説</h1>
        </div>
        <div className="text-sm bg-orange-700 px-3 py-1 rounded-full">
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
              : "bg-orange-600 text-white hover:bg-orange-700 shadow-md"
          }`}
        >
          {step === 0 ? "解法ステップへ" : "次へ"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
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
  const remainingAfter1Year = Math.max(0, 100 - (rateConstant * 10)); // 1年後の残存率(簡易)

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
const GenericQuestionPage = ({ title, subTitle, onBack }) => {
  return (
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
};

// ==========================================
// メインメニュー
// ==========================================
const MenuScreen = ({ onSelect }) => {
  const questions = [
    { id: '99-174', title: '第99回 問174', desc: '薬剤：弱酸性薬物の溶解度変化', icon: Calculator, color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { id: '101-176', title: '第101回 問176', desc: '薬剤：目標溶解度へのpH調整', icon: TestTube, color: 'bg-teal-50 border-teal-200 text-teal-700' },
    { id: '104-170', title: '第104回 問170', desc: '薬剤：分配平衡・pHプロファイル', icon: Activity, color: 'bg-white border-gray-200 text-gray-700' },
    { id: '108-175', title: '第108回 問175', desc: '薬剤：弱電解質の溶解平衡', icon: Activity, color: 'bg-white border-gray-200 text-gray-700' },
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
      case 'menu':
        return <MenuScreen onSelect={setCurrentScreen} />;
      case '99-174':
        return <Q99_174 onBack={() => setCurrentScreen('menu')} />;
      case '101-176':
        return <Q101_176 onBack={() => setCurrentScreen('menu')} />;
      case '104-170':
        return <Q104_170 onBack={() => setCurrentScreen('menu')} />;
      case '108-175':
        return <Q108_175 onBack={() => setCurrentScreen('menu')} />;
      case '109-48':
        return <Q109_48 onBack={() => setCurrentScreen('menu')} />;
      case '109-50':
        return <Q109_50 onBack={() => setCurrentScreen('menu')} />;
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
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ChevronRight, ChevronLeft, Home, 
  Calculator, TestTube, Brain, CheckCircle, XCircle, 
  AlertTriangle, Menu, ArrowRight, Thermometer, RotateCw, Clock, Activity, Lightbulb, MousePointerClick, PenTool, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from './components/Layout';
import Q99_174 from './questions/Q99_174';
import Q101_176 from './questions/Q101_176';
import Q104_170 from './questions/Q104_170';

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
  const surfaceFactor = surfaceArea;       // 1(大きい粒)→1, 5(微粉)→5
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

                  {/* 粒子径のイラスト：分割数をスライダーと同期させた「新しい表面」のイメージ */}
                  <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-8 text-xs md:text-sm text-gray-600">
                    {/* 左：大きな正方形 1つ */}
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 border-2 border-orange-400 bg-white relative">
                        {/* 周囲だけが「表面」 */}
                      </div>
                      <span className="mt-2 text-center">
                        大きな粒<br />
                        （表面：外周だけ）
                      </span>
                      <span className="mt-1 text-[10px] text-gray-500">
                        周囲の長さ：4L
                      </span>
                    </div>

                    <ArrowRight className="hidden md:block w-6 h-6 text-orange-500" />

                    {/* 右：同じ面積を小さな粒に分割（スライダーと同期） */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        key={surfaceArea}
                        className="w-24 h-24 grid gap-[2px]"
                        style={{
                          gridTemplateColumns: `repeat(${surfaceArea}, minmax(0, 1fr))`,
                          gridTemplateRows: `repeat(${surfaceArea}, minmax(0, 1fr))`,
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      >
                        {Array.from({ length: surfaceArea * surfaceArea }).map((_, idx) => (
                          <motion.div
                            key={`${surfaceArea}-${idx}`}
                            className="border-2 border-orange-400 bg-white"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.15, delay: idx * 0.02 }}
                          />
                        ))}
                      </motion.div>
                      <span className="mt-2 text-center">
                        同じ面積を {surfaceArea}×{surfaceArea} 個に分割<br />
                        （内部にも新しい表面）
                      </span>
                      <span className="mt-1 text-[10px] text-gray-500">
                        粒を細かくするほど「境界線（表面）」が増える
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs md:text-sm text-gray-700 text-center">
                    同じ「量（面積）」でも、細かく分けると「境目（表面）」が増えます。<br />
                    粒子を細かく砕くと比表面積が増え、溶液と接する面が増えるので、溶出が速くなります。
                  </p>                  
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

                  {/* 粘度と拡散の関係：粒がゆっくり・速く動くアニメーション */}
                  <div className="mt-4">
                    <div className="text-xs md:text-sm text-gray-600 mb-1 text-center">
                      粘度が高いほど、拡散がゆっくりになるイメージ
                    </div>
                    <div className="relative h-28 md:h-32 border border-gray-200 rounded-xl overflow-hidden px-3 bg-gradient-to-r from-orange-200 via-white to-blue-50">
                      {/* 左側：薬物投与部位 */}
                      <div className="absolute inset-y-2 left-2 flex flex-col items-center justify-center text-[10px] text-gray-500">
                        <div className="w-2 h-16 bg-orange-400 rounded-full mb-1" />
                        <span>薬物が入った場所</span>
                      </div>

                      {/* 右側：十分に拡散した領域 */}
                      <div className="absolute inset-y-2 right-2 flex flex-col items-center justify-center text-[10px] text-gray-500">
                        <div className="w-2 h-16 bg-blue-400 rounded-full mb-1" />
                        <span>広がった先</span>
                      </div>

                      {/* 粒子が左右へ行き来するレーン */}
                      <div className="absolute inset-y-4 left-10 right-10 flex flex-col justify-around">
                        {Array.from({ length: 6 }).map((_, idx) => {
                          // 粘度が高いほど（5に近いほど）ゆっくり動くように duration を長くする
                          const baseDuration = 3;
                          const duration = baseDuration + (viscosity - 1) * 1.5;
                          const delay = idx * 0.2;

                          return (
                            <motion.div
                              key={`particle-${idx}-${viscosity}`}
                              className="h-1.5 flex items-center relative w-full"
                            >
                              <motion.div
                                className="w-3 h-3 rounded-full bg-orange-400 shadow-sm absolute"
                                initial={{ left: 0 }}
                                animate={{ left: ["0%", "90%"] }}
                                transition={{
                                  duration,
                                  repeat: Infinity,
                                  repeatType: "loop",   // 端まで行ったら左にワープしてまた進む
                                  ease: "linear",
                                  delay,
                                }}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                    <p className="mt-2 text-xs md:text-sm text-gray-700 text-center">
                      スライダーを右に動かして粘度を上げると、粒がゆっくり動きます。<br />
                      粘度が高いほど拡散が遅くなり、溶出した薬物が広がりにくくなります。
                    </p>
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
// ★新規: 第109回 問50（疎水性薬物の安定化：CyD 包接）
// ==========================================
const Q109_50 = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [openOption, setOpenOption] = useState(null);

  const toggleOption = (index) => {
    setOpenOption(openOption === index ? null : index);
  };

  const options = [
    {
      text: "1. アスコルビン酸",
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm leading-relaxed">
            アスコルビン酸は代表的な<strong>酸化防止剤</strong>です。
            溶液中で酸化分解しやすい薬物を還元的に保護する目的で用いられますが、
            疎水性薬物を内部に取り込むような「包接複合体」を作るわけではありません。
          </p>
        </>
      ),
    },
    {
      text: "2. α-シクロデキストリン",
      isCorrect: true,
      explanation: (
        <>
          <span className="font-bold text-green-600">【正解】</span>
          <p className="mt-2 text-sm leading-relaxed">
            シクロデキストリン（CyD）は、D-グルコースが
            α1-4 結合で環状につながったオリゴ糖で、
            グルコースが 6, 7, 8 個のものをそれぞれ
            α-, β-, γ-シクロデキストリンといいます。
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            外側は水となじみやすい<strong>親水性</strong>ですが、
            中央の空洞内部は<strong>疎水性</strong>で、
            水に溶けにくい疎水性薬物を内側に取り込み
            「包接化合物（包接複合体）」を形成します。
            これにより、水溶性の複合体として
            <strong>溶解補助剤</strong>として働くとともに、
            薬物周囲を立体的に遮へいすることで
            <strong>加水分解などの分解反応を抑え、安定化</strong>します。
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            本問のアルプロスタジルのような疎水性薬物を安定化する目的で用いる化合物として、
            α-シクロデキストリンが最も適切です。
          </p>
        </>
      ),
    },
    {
      text: "3. カルメロースナトリウム",
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm leading-relaxed">
            カルメロースナトリウム（CMC-Na）は、崩壊剤・粘稠化剤・懸濁化剤などとして
            用いられる高分子です。水を含んで膨潤し、錠剤の崩壊や懸濁安定化には寄与しますが、
            疎水性薬物を内側に包み込むような包接複合体を形成する目的ではありません。
          </p>
        </>
      ),
    },
    {
      text: "4. エデト酸ナトリウム水和物",
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm leading-relaxed">
            エデト酸ナトリウム（EDTA-Na）は多座配位子であり、
            金属イオンと強いキレートを形成して
            <strong>金属触媒による分解を抑えるキレート剤</strong>です。
            一方、アルプロスタジルのような疎水性薬物そのものを包み込んで
            溶解性を改善するわけではないため、本問の趣旨からは外れます。
          </p>
        </>
      ),
    },
    {
      text: "5. パラオキシ安息香酸ブチル",
      isCorrect: false,
      explanation: (
        <>
          <span className="font-bold text-red-500">【誤り】</span>
          <p className="mt-2 text-sm leading-relaxed">
            パラオキシ安息香酸ブチル（ブチルパラベン）は
            代表的な<strong>防腐剤</strong>であり、
            製剤中で微生物の増殖を抑制する目的で添加されます。
            疎水性薬物の溶解性や化学的安定性を高める「包接化合物形成剤」ではありません。
          </p>
        </>
      ),
    },
  ];

  const titles = [
    "問題の確認",
    "Step 1：シクロデキストリンとは？",
    "Step 2：具体例（イトラコナゾール製剤）",
    "Step 3：選択肢ごとの検討・結論",
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xlshadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第109回 問50
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  疎水性薬物を安定化するための複合体形成剤
                </h4>
              </div>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                複合体を形成することによって、以下の疎水性薬物を安定化するのに用いられる
                化合物はどれか。1つ選べ。
              </p>

              <div className="my-4 flex flex-col md:flex-row items-center justify-center gap-4">
                {/* アルプロスタジル構造式 */}
                <img
                  src="/image/109-50-fig.png"
                  alt="アルプロスタジルの構造式"
                  className="max-w-full md:max-w-md h-auto object-contain border rounded-lg bg-white"
                />
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm md:text-base">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ol className="space-y-1 text-gray-800">
                  <li>1　アスコルビン酸</li>
                  <li>2　α-シクロデキストリン</li>
                  <li>3　カルメロースナトリウム</li>
                  <li>4　エデト酸ナトリウム水和物</li>
                  <li>5　パラオキシ安息香酸ブチル</li>
                </ol>
              </div>

              <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-gray-700">
                <p className="font-bold text-purple-800 mb-1">ポイント</p>
                <p>
                  アルプロスタジルは、長い炭化水素鎖をもつ疎水性の高い薬物です。
                  これを「水に分散しやすく、しかも化学的に安定」にしたい、
                  というのが問題の設定です。
                </p>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-700 mb-2">
                Step 1：シクロデキストリンの構造と性質
              </h4>
              <p className="text-sm md:text-base text-gray-700 mb-2">
                シクロデキストリンは、D-グルコースが α1-4 結合で環状につながった
                オリゴ糖で、グルコースが
                <strong>6, 7, 8 個</strong>のものを
                それぞれ α-, β-, γ-シクロデキストリンといいます。
              </p>
              <p className="text-sm md:text-base text-gray-700">
                環の外側は多くの水酸基を持つため<strong>親水性</strong>ですが、
                内部は疎水性の空洞になっており、
                疎水性薬物がこの空洞に「入り込む」ことで
                <strong>包接化合物</strong>を形成します。
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-purple-500" />
                「外は親水・中は疎水」のイメージ
              </h4>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {/* アルプロスタジル-CyD 包接の模式図 */}
                <img
                  src="/image/109-50-cyd.png"
                  alt="アルプロスタジルとシクロデキストリンの包接複合体の模式図"
                  className="max-w-full md:max-w-lg h-auto object-contain border rounded-lg bg-white"
                />
              </div>
              <p className="mt-3 text-xs md:text-sm text-gray-600 text-center">
                中央の筒状構造がシクロデキストリンの疎水空洞。
                アルプロスタジルの疎水性鎖が内側に入り込み、周囲は水と親和性の高い糖部分で覆われる。
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm md:text-base">
              <p className="font-bold mb-1">結果として…</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>見かけ上、水への溶解性が大きく向上（溶解補助剤として働く）</li>
                <li>薬物が空洞内に守られることで、加水分解や酸化などの分解反応が起こりにくくなり、安定化する</li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">
                Step 2：実際の製剤例（イトラコナゾール内用液）
              </h4>
              <p className="text-sm md:text-base text-gray-700 mb-3 leading-relaxed">
                抗真菌薬<strong>イトラコナゾール</strong>は
                水にほとんど溶けない疎水性薬物ですが、
                2-ヒドロキシプロピル-β-シクロデキストリン
                （HP-β-CyD）と包接化合物を形成させることで
                溶解性が大きく向上し、内用液として製剤化されています。
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs md:text-sm leading-relaxed">
                <ul className="list-disc list-inside space-y-1">
                  <li>HP-β-CyD は β-CyD にヒドロキシプロピル基を導入した誘導体。</li>
                  <li>β-CyD 単独よりも<strong>水溶性が高く、刺激性も低下</strong>しており、安全性に優れる。</li>
                  <li>水にほとんど溶けないイトラコナゾールも、HP-β-CyD との包接化合物として
                    溶解性が改善されることで、内用液として使用できる。</li>
                </ul>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                このように、<strong>「疎水性薬物 × CyD」</strong>という組み合わせは
                実際の製剤でも頻用されており、本問のアルプロスタジルでも同様の発想です。
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
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
                    className={`w-full p-3 md:p-4 text-left flex items-start transition-colors ${
                      openOption === index
                        ? "bg-purple-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`font-bold mr-3 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${
                        opt.isCorrect
                          ? "bg-purple-600 text-white"
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
                        <div className="py-3 border-top border-gray-200 text-sm md:text-base text-gray-700 leading-relaxed">
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
                疎水性薬物アルプロスタジルを水中で安定に扱うために「包接複合体」を形成して
                溶解性と安定性を高める目的の添加剤は、
                <span className="font-bold text-green-700">2. α-シクロデキストリン</span>
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
      {/* ヘッダー */}
      <div className="bg-purple-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-purple-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第109回 問50：ステップ解説</h1>
        </div>
        <div className="text-sm bg-purple-700 px-3 py-1 rounded-full">
          Step {step + 1} / {titles.length}
        </div>
      </div>

      {/* 本文 */}
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

      {/* フッター操作ボタン */}
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
              : "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
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
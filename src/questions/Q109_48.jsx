// src/questions/Q109_48.jsx
import React, { useState } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  RotateCw,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第109回 問48：溶出性に影響しない因子
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
                {String.raw`\dfrac{dC}{dt} = \dfrac{D\,S}{V\,\delta}\bigl(C_{\mathrm{s}} - C\bigr)`}
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
                  <label className="flex items-center text-gray-700 font-bold mb-2">
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
                  <label className="flex items-center text-gray-700 font-bold mb-2">
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

export default Q109_48;
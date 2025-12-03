// src/questions/Q108_49.jsx
import React, { useState } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第108回 問49：粉体の流動性と物性値
// 「流れやすくするには何を大きく？」
// ==========================================
const Q108_49 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  const titles = [
    '問題の確認：粉体の流動性と物性値',
    'Step 1：各物性値の意味を整理',
    'Step 2：選択肢ごとに検討する',
    'Step 3：まとめ（国家試験の狙い）',
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
                  第108回 問49
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  粉体の流動性を改善するには「何を大きく」すべきか？
                </h4>
              </div>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                粉体の流動性を改善するために、大きくすべき物性値はどれか。１つ選べ。
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm md:text-base">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>かさ比容積</li>
                  <li>安息角</li>
                  <li>かさ密度</li>
                  <li>内部摩擦係数</li>
                  <li>空隙率</li>
                </ol>
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm md:text-base">
                <p className="font-bold text-amber-800 mb-2">
                  直感イメージ
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>「さらさら流れる粉」ほど<strong>流動性が良い</strong>。</li>
                  <li>
                    そのような粉体は、山になったとき
                    <strong>なだらかな山（安息角が小さい）</strong>。
                  </li>
                  <li>
                    同じ体積中に<strong>ぎゅっと詰まっている（かさ密度が大きい）</strong>ほど
                    流動性は良くなる傾向。
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-center">
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
      // 1. 各物性値の意味
      // -----------------------------------
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                まずは「言葉の意味」を整理しよう
              </h4>
              <p className="text-sm md:text-base text-gray-800">
                どの物性値が「大きいと流れやすい／小さいと流れやすい」のかを
                判断するには、まず定義を押さえることが重要です。
              </p>
            </div>

            {/* 1) かさ密度＆かさ比容積 */}
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
              <h5 className="font-bold text-gray-800 mb-1">
                ① かさ密度（bulk density）と かさ比容積（bulk specific volume）
              </h5>
              <p className="text-sm md:text-base text-gray-800">
                粉体を<strong>そのまま容器に入れたとき</strong>の、
                空隙も含めた状態での密度です。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-bold text-gray-800 mb-1">かさ密度 ρ<sub>b</sub></p>
                  <p>
                    ρ<sub>b</sub> = m / V<sub>b</sub>
                    （粉体質量 m と、空隙も含めた体積 V<sub>b</sub>）
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    同じ質量 m なら、V<sub>b</sub> が小さいほど
                    ρ<sub>b</sub> は大きくなる（よく詰まっている）。
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-bold text-gray-800 mb-1">
                    かさ比容積 v<sub>b</sub>
                  </p>
                  <p>
                    v<sub>b</sub> = 1 / ρ<sub>b</sub>（単位質量あたりの体積）
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    ρ<sub>b</sub> が大きいほど v<sub>b</sub> は小さくなる（逆数の関係）。
                  </p>
                </div>
              </div>
              {/* イラスト：かさ密度と かさ比容積の違い */}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-gray-700">
                {/* かさ密度：体積一定で粒子数が違うイメージ */}
                <div className="bg-emerald-50 rounded-lg p-3 flex flex-col gap-3">
                  <p className="font-bold mb-1 text-center">
                    かさ密度 ρ<sub>b</sub>（体積 V<sub>b</sub> は同じ）
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full justify-items-center">
                    {/* ρb が大きい */}
                    <div className="flex flex-col items-center">
                      <p className="font-semibold mb-1">ρ<sub>b</sub> が大きい（よく詰まる）</p>
                      <div className="w-24 h-20 border border-emerald-400 bg-white rounded flex flex-wrap items-center justify-center gap-1">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-emerald-500 inline-block"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-center">
                        同じ V<sub>b</sub> に粒子がたくさん
                      </p>
                    </div>
                    {/* ρb が小さい */}
                    <div className="flex flex-col items-center">
                      <p className="font-semibold mb-1">ρ<sub>b</sub> が小さい（すかすか）</p>
                      <div className="w-24 h-20 border border-emerald-400 bg-white rounded flex flex-wrap items-center justify-center gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-emerald-500 inline-block"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-center">
                        同じ V<sub>b</sub> に粒子が少ない
                      </p>
                    </div>
                  </div>
                </div>

                {/* かさ比容積：質量一定で体積が違うイメージ */}
                <div className="bg-amber-50 rounded-lg p-3 flex flex-col gap-3">
                  <p className="font-bold mb-1 text-center">
                    かさ比容積 v<sub>b</sub>（粒子数・質量 m は同じ）
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full justify-items-center">
                    {/* vb が小さい（ρb が大きい） */}
                    <div className="flex flex-col items-center">
                      <p className="font-semibold mb-1">
                        v<sub>b</sub> が小さい（詰まっている）
                      </p>
                      <div className="w-20 h-16 border border-amber-400 bg-white rounded flex flex-wrap items-center justify-center gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-amber-500 inline-block"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-center">
                        同じ m が小さな V<sub>b</sub> にぎゅっと
                      </p>
                    </div>
                    {/* vb が大きい（ρb が小さい） */}
                    <div className="flex flex-col items-center">
                      <p className="font-semibold mb-1">
                        v<sub>b</sub> が大きい（すかすか）
                      </p>
                      <div className="w-28 h-20 border border-amber-400 bg-white rounded flex flex-wrap items-center justify-center gap-3">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-amber-500 inline-block"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-center">
                        同じ m が大きな V<sub>b</sub> にまばらに
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2) 安息角 */}
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
              <h5 className="font-bold text-gray-800 mb-1">
                ② 安息角（angle of repose）
              </h5>
              <p className="text-sm md:text-base text-gray-800">
                粉体を静かに積み上げたときにできる<strong>粉体の山の角度</strong>。
                この角度が小さいほど流動性は良い（さらさら）。
              </p>

              {/* イメージ図（なだらか vs つんもり） */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-gray-700">
                <div className="flex flex-col items-center bg-sky-50 rounded-lg p-3">
                  <p className="font-bold mb-1">安息角が小さい（流動性が良い）</p>
                  <div className="w-32 h-20 relative flex items-end justify-center">
                    <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[30px] border-l-transparent border-r-transparent border-b-amber-300" />
                  </div>
                  <p className="mt-1">なだらかな山：さらさらした粉</p>
                </div>
                <div className="flex flex-col items-center bg-rose-50 rounded-lg p-3">
                  <p className="font-bold mb-1">安息角が大きい（流動性が悪い）</p>
                  <div className="w-32 h-20 relative flex items-end justify-center">
                    <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-amber-500" />
                  </div>
                  <p className="mt-1">急な山：べたつき・凝集しやすい粉</p>
                </div>
              </div>
            </div>

            {/* 3) 内部摩擦係数・空隙率 */}
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
              <h5 className="font-bold text-gray-800 mb-1">
                ③ 内部摩擦係数 と 空隙率
              </h5>
              <ul className="list-disc list-inside text-sm md:text-base text-gray-800 space-y-1">
                <li>
                  <strong>内部摩擦係数</strong>：
                  粉体層内で粒子同士がすべり合うときの「抵抗の大きさ」。
                  値が大きいほど<strong>流れにくい</strong>。
                </li>
                <li>
                  <strong>空隙率</strong>：
                  粉体層の中で<strong>空気が占める割合</strong>。
                  充填性（どれだけみっちり詰まっているか）を表す指標であり、
                  空隙率が<strong>小さい</strong>ほどよく詰まった高密充填、
                  <strong>大きい</strong>ほどふわっとした疎な充填となる。
                  一般に、空隙率が大きい “ふわふわした微粉末” は凝集しやすく、
                  結果として流動性が悪い場合が多いが、
                  <strong>流動性は空隙率だけで一義的に決まるわけではない</strong>。
                </li>
              </ul>
              {/* イラスト：内部摩擦と空隙のイメージ */}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-gray-700">
                <div className="bg-slate-50 rounded-lg p-3 flex flex-col items-center">
                  <p className="font-bold mb-1">内部摩擦が大きい（ざらざら・ひっかかる）</p>
                  <div className="w-28 h-16 border border-slate-400 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#cbd5f5, #cbd5f5_4px,#e5e7eb_4px,#e5e7eb_8px)]" />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <span className="px-2 py-1 bg-white/80 text-[10px] rounded">
                        すべりにくい
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-sky-50 rounded-lg p-3 flex flex-col items-center">
                  <p className="font-bold mb-1">空隙率が大きい（疎な充填のイメージ）</p>
                  <div className="w-28 h-16 border border-sky-400 bg-white rounded flex flex-wrap items-center justify-center gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-center">
                    空気が多く疎な充填 → 凝集しやすく流動性が悪くなる場合もある
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      // -----------------------------------
      // 2. 各選択肢の検討
      // -----------------------------------
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              各選択肢を「大きくしたときの流動性」で評価する
            </h3>

            {/* 1 かさ比容積 */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-1">1. かさ比容積</h4>
              <p className="text-sm md:text-base text-gray-800 mb-1">
                かさ比容積 v<sub>b</sub> は、かさ密度 ρ<sub>b</sub> の逆数：
              </p>
              <p className="text-sm md:text-base font-mono text-center bg-gray-50 rounded p-2">
                v<sub>b</sub> = 1 / ρ<sub>b</sub>
              </p>
              <p className="mt-1 text-sm text-gray-700">
                v<sub>b</sub> が大きいほど、同じ質量でも体積が大きく、
                空隙が多くスカスカな状態。一般に<strong>流動性は悪くなる方向</strong>。
                → 「大きくすべき」とは言えない。
              </p>
            </div>

            {/* 2 安息角 */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-1">2. 安息角</h4>
              <p className="text-sm md:text-base text-gray-800 mb-1">
                安息角が<strong>小さいほど</strong>流動性は良い。
              </p>
              <p className="mt-1 text-sm text-gray-700">
                したがって、安息角を<strong>大きくする</strong>ことは
                流動性を悪くする方向なので不適切。
              </p>
            </div>

            {/* 3 かさ密度 */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
              <h4 className="font-bold text-emerald-800 mb-1">
                3. かさ密度（★正解）
              </h4>
              <p className="text-sm md:text-base text-gray-800 mb-1">
                かさ密度 ρ<sub>b</sub> が大きいほど、
                「同じ体積の中により多くの粉体が詰まっている」状態。
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-gray-800 space-y-1">
                <li>空隙が少なく、粒子同士の接触が安定 → さらさら流れやすい</li>
                <li>粉体設計では、<strong>大きな ρ<sub>b</sub></strong> が
                  良好な流動性と関連づけられることが多い
                </li>
              </ul>
              <p className="mt-1 text-sm font-bold text-emerald-800">
                →「流動性を改善するために大きくすべき物性値」は
                <strong> かさ密度 </strong>と判断できる。
              </p>
            </div>

            {/* 4 内部摩擦係数 */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-1">4. 内部摩擦係数</h4>
              <p className="text-sm md:text-base text-gray-800 mb-1">
                内部摩擦係数が大きいほど、粒子同士がすべりにくく、
                粉体は<strong>流れにくく</strong>なる。
              </p>
              <p className="mt-1 text-sm text-gray-700">
                流動性を改善するには、むしろ<strong>小さくしたい</strong>物性値。
              </p>
            </div>

            {/* 5 空隙率 */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-1">5. 空隙率</h4>
              <p className="text-sm md:text-base text-gray-800 mb-1">
                空隙率が大きいほど、粉体層の中に空気が多く、
                粒子同士の接触が不安定になりやすい。
              </p>
              <p className="mt-1 text-sm text-gray-700">
                凝集・ブリッジなども起こりやすく、一般には流動性が悪化しやすい。
                →「大きくすべき」とは言えない。
              </p>
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
              まとめ：粉体流動性と国家試験での狙い
            </h3>

            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
              <p className="text-sm md:text-base text-gray-800">
                粉体の流動性は、<strong>単一の指標だけ</strong>で決まるわけではありませんが、
                国家試験では次のような傾向を押さえておくと便利です。
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-gray-800 space-y-2">
                <li>
                  <strong>安息角</strong>：
                  「小さいほど流動性が良い」。大きくすると悪化。
                </li>
                <li>
                  <strong>かさ密度 ρ<sub>b</sub></strong>：
                  「大きいほど流動性が良い」と関連づけられることが多い。
                </li>
                <li>
                  <strong>かさ比容積 v<sub>b</sub></strong>：
                  ρ<sub>b</sub> の逆数。流動性を良くするには、小さい方が望ましい。
                </li>
                <li>
                  <strong>内部摩擦係数</strong>：
                  大きいほど流れにくい → 小さくしたい。
                </li>
                <li>
                  <strong>空隙率</strong>：
                  大きいと不安定で流れにくい → 小さくしたい。
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm md:text-base">
              <p className="font-bold text-emerald-800 mb-1">本問の結論</p>
              <p>
                「粉体の流動性を改善するために<strong>大きくすべき</strong>物性値」は、
                <strong>3. かさ密度</strong> である。
              </p>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={onBack}
                className="px-8 py-3 bg-gray-800 text-white rounded-xl font-bold text-sm md:text-base hover:bg-gray-900 transition shadow-lg inline-flex items-center"
              >
                <Home className="w-5 h-5 mr-2" />
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
      {/* ヘッダー（上部バー） */}
      <div className="bg-amber-500 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-amber-400 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-lg md:text-xl font-bold">
            第108回 問49：粉体の流動性と物性値
          </h1>
        </div>
        <div className="text-xs md:text-sm bg-amber-600 px-3 py-1 rounded-full">
          Step {step + 1} / {titles.length}
        </div>
      </div>

      {/* 本文スライドエリア */}
      <Slide key={step} className="relative">
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
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className={`px-6 py-3 rounded-lg font-bold flex items-center text-sm md:text-base ${
            step === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'bg-white border hover:bg-gray-100 text-gray-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> 前へ
        </button>
        <button
          onClick={() => {
            if (step === titles.length - 1) {
              onBack();
            } else {
              setStep(Math.min(titles.length - 1, step + 1));
            }
          }}
          className={`px-6 py-3 rounded-lg font-bold flex items-center text-sm md:text-base ${
            step === titles.length - 1
              ? 'bg-gray-800 text-white hover:bg-gray-900'
              : 'bg-amber-500 text-white hover:bg-amber-600 shadow-md'
          }`}
        >
          {step === titles.length - 1 ? '問題一覧に戻る' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q108_49;
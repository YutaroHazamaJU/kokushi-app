import React, { useState } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Beaker,
  Droplets,
  Cloud,
  Lightbulb,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第107回 問49：分散相と分散媒の組合せ
// ==========================================
const Q107_49 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  const titles = [
    '問題と選択肢の確認',
    'Step 1：分散相・分散媒と分散系の基本',
    'Step 2：各製剤の分散相と分散媒を整理',
    'Step 3：選択肢の検討とまとめ',
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第107回 問49
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  分散系：分散相と分散媒の組合せ
                </h4>
              </div>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                分散系における
                <span className="font-bold text-orange-600 mx-1">分散相</span>
                と
                <span className="font-bold text-orange-600 mx-1">分散媒</span>
                の組合せのうち、正しいのはどれか。1つ選べ。
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700">
                      <th className="border border-gray-200 px-2 py-1 w-16">番号</th>
                      <th className="border border-gray-200 px-2 py-1">性状</th>
                      <th className="border border-gray-200 px-2 py-1">分散相</th>
                      <th className="border border-gray-200 px-2 py-1">分散媒</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td className="border border-gray-200 px-2 py-1">1</td>
                      <td className="border border-gray-200 px-2 py-1">サスペンション</td>
                      <td className="border border-gray-200 px-2 py-1">固体</td>
                      <td className="border border-gray-200 px-2 py-1">気体</td>
                    </tr>
                    <tr className="bg-orange-50/40">
                      <td className="border border-gray-200 px-2 py-1">2</td>
                      <td className="border border-gray-200 px-2 py-1 font-semibold">エマルション</td>
                      <td className="border border-gray-200 px-2 py-1">液体</td>
                      <td className="border border-gray-200 px-2 py-1">液体</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-2 py-1">3</td>
                      <td className="border border-gray-200 px-2 py-1">エアゾール</td>
                      <td className="border border-gray-200 px-2 py-1">気体</td>
                      <td className="border border-gray-200 px-2 py-1">液体又は固体</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-2 py-1">4</td>
                      <td className="border border-gray-200 px-2 py-1">フォーム（泡沫）</td>
                      <td className="border border-gray-200 px-2 py-1">液体</td>
                      <td className="border border-gray-200 px-2 py-1">気体</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-2 py-1">5</td>
                      <td className="border border-gray-200 px-2 py-1">キセロゲル</td>
                      <td className="border border-gray-200 px-2 py-1">固体</td>
                      <td className="border border-gray-200 px-2 py-1">液体</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm text-gray-700">
                <p className="font-semibold text-orange-700 mb-1">ポイント</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-bold">分散相</span>：細かく分かれている側（粒子・液滴・気泡）
                  </li>
                  <li>
                    <span className="font-bold">分散媒</span>：それを包んでいる側（連続相）
                  </li>
                  <li>「どっちが外側の相か？」を意識すると整理しやすい。</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {/* 分散相と分散媒の「いちばんシンプルな」イメージ */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 text-xs md:text-sm text-gray-800">
              <p className="font-bold text-gray-800 mb-2">
                まずは「分散相」と「分散媒」のイメージをつかもう
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* 図：分散媒の中に分散相の粒子が浮かぶイメージ */}
                <div className="flex justify-center">
                  <div className="relative w-40 h-24 md:w-48 md:h-28 rounded-xl border-2 border-blue-300 bg-blue-50 overflow-hidden">
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] md:text-xs font-semibold text-blue-700">
                      分散媒（外側に広がっている相）
                    </span>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-orange-400 border border-white shadow-sm absolute"
                        style={{
                          left: `${15 + (i % 3) * 22}%`,
                          top: `${20 + Math.floor(i / 3) * 30}%`,
                        }}
                      />
                    ))}
                    <span className="absolute bottom-1 right-1 text-[10px] md:text-[11px] text-orange-600 bg-white/70 px-1.5 py-0.5 rounded-full border border-orange-200">
                      分散相（中の粒子）
                    </span>
                  </div>
                </div>

                {/* 説明文 */}
                <div className="space-y-1 leading-relaxed">
                  <p>
                    ・
                    <span className="font-semibold">分散相</span>：
                    中に細かく浮かんでいる側（粒子・液滴・気泡など）
                  </p>
                  <p>
                    ・
                    <span className="font-semibold">分散媒</span>：
                    それらを包んでいる側（外側に連続して広がっている相）
                  </p>
                  <p className="text-[11px] md:text-xs text-gray-600 mt-1">
                    「コップの中の水 &amp; その中に浮かぶ粒子」をイメージすると，
                    水が分散媒，中の粒が分散相になります。
                    サスペンションなら「水中の固体」，エマルションなら「水中の油滴」などに置き換えて考えられます。
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                分散相・分散媒と「3×3マトリクス」
              </h4>
              <p className="text-sm md:text-base mb-2">
                分散系は、分散相（粒子側）と分散媒（まわりの相）が
                <span className="font-bold">固体 / 液体 / 気体</span> のどれかの組合せで分類できます。
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-1 py-1">分散相＼分散媒</th>
                      <th className="border border-gray-200 px-1 py-1">固体</th>
                      <th className="border border-gray-200 px-1 py-1">液体</th>
                      <th className="border border-gray-200 px-1 py-1">気体</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td className="border border-gray-200 px-1 py-1 font-semibold">固体</td>
                      <td className="border border-gray-200 px-1 py-1">固体分散系（色ガラスなど）</td>
                      <td className="border border-gray-200 px-1 py-1 font-semibold text-orange-700">
                        サスペンション
                      </td>
                      <td className="border border-gray-200 px-1 py-1">固体エアゾール（けむり 等）</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-1 py-1 font-semibold">液体</td>
                      <td className="border border-gray-200 px-1 py-1">液体-固体エマルション</td>
                      <td className="border border-gray-200 px-1 py-1 font-semibold text-orange-700">
                        エマルション（乳剤）
                      </td>
                      <td className="border border-gray-200 px-1 py-1 font-semibold text-orange-700">
                        液体エアゾール（スプレー）
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-1 py-1 font-semibold">気体</td>
                      <td className="border border-gray-200 px-1 py-1">気体-固体フォーム</td>
                      <td className="border border-gray-200 px-1 py-1 font-semibold text-orange-700">
                        フォーム（泡沫）：気体 in 液体
                      </td>
                      <td className="border border-gray-200 px-1 py-1">気体混合物（溶液扱いしない）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-2 text-xs md:text-sm text-gray-600">
                ※ キセロゲルは「ゲルから分散媒（液体）が抜けて乾燥したもの」で、
                多孔質な固体（固体中に気体）として扱う。
                <br />
                また、固体エアゾールの代表例として
                <span className="font-semibold">ドライパウダー吸入剤（DPI）</span>
                などの吸入粉末剤が挙げられる。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-base">
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start">
                <Droplets className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                <div>
                  <p className="font-bold mb-1">エマルション（乳剤）</p>
                  <p className="text-gray-700">
                    <span className="font-semibold">液体 in 液体</span>。油中水滴（W/O）や水中油滴（O/W）など、互いに混ざりにくい液体どうしの分散系。
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start">
                <Beaker className="w-6 h-6 text-emerald-500 mr-3 mt-1" />
                <div>
                  <p className="font-bold mb-1">サスペンション（懸濁液）</p>
                  <p className="text-gray-700">
                    <span className="font-semibold">固体 in 液体</span>。
                    シロップ中の難溶性固体薬物など。
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start">
                <Cloud className="w-6 h-6 text-purple-500 mr-3 mt-1" />
                <div>
                  <p className="font-bold mb-1">エアゾール・フォーム</p>
                  <p className="text-gray-700">
                    <span className="font-semibold">エアゾール</span>：液体 or 固体 in 気体。
                    <br />
                    <span className="font-semibold">フォーム</span>：気体 in 液体（泡状）。
                  </p>
                </div>
              </div>
            </div>
            {/* 分散系のイメージ図（模式図） */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
              <p className="font-bold text-gray-800 mb-2 text-sm md:text-base">
                分散系のイメージ（模式図）
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
                {/* サスペンション：固体 in 液体 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-lg bg-blue-50 border border-blue-200 relative overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-gray-700 rounded-sm absolute"
                        style={{
                          left: `${15 + (i % 4) * 15}%`,
                          top: `${15 + Math.floor(i / 4) * 25}%`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 font-semibold text-gray-800">サスペンション</p>
                  <p className="text-gray-600 text-[11px]">固体粒子 in 液体</p>
                </div>

                {/* エマルション：液体 in 液体 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-lg bg-orange-50 border border-orange-200 relative overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-white rounded-full border border-orange-400 absolute"
                        style={{
                          left: `${20 + (i % 3) * 20}%`,
                          top: `${20 + Math.floor(i / 3) * 25}%`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 font-semibold text-gray-800">エマルション</p>
                  <p className="text-gray-600 text-[11px]">液滴 in 液体</p>
                </div>

                {/* エアゾール：液体/固体 in 気体 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-lg bg-sky-50 border border-sky-200 relative overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-sky-500 rounded-full absolute"
                        style={{
                          left: `${10 + (i % 5) * 15}%`,
                          top: `${10 + Math.floor(i / 5) * 30}%`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 font-semibold text-gray-800">エアゾール</p>
                  <p className="text-gray-600 text-[11px]">液体/固体粒子 in 気体</p>
                </div>

                {/* フォーム：気体 in 液体 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-lg bg-purple-50 border border-purple-200 relative overflow-hidden">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="border border-purple-400 bg-white/70 rounded-full absolute"
                        style={{
                          width: `${14 + (i % 3) * 4}px`,
                          height: `${14 + (i % 3) * 4}px`,
                          left: `${15 + (i % 3) * 18}%`,
                          top: `${15 + Math.floor(i / 3) * 20}%`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 font-semibold text-gray-800">フォーム</p>
                  <p className="text-gray-600 text-[11px]">気体 in 液体（泡）</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              各選択肢の分散相・分散媒を正しく言い換える
            </h3>

            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 text-sm md:text-base space-y-3">
              <div>
                <p className="font-bold text-gray-800 mb-1">1) サスペンション</p>
                <p className="text-gray-700">
                  正しくは <span className="font-semibold">固体 in 液体</span>。
                  本問の表では「分散媒：気体」となっており誤り。
                  <br />
                  代表例：抗生物質ドライシロップを水で懸濁した経口懸濁剤、
                  懸濁性点眼剤など。
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">2) エマルション</p>
                <p className="text-gray-700">
                  <span className="font-semibold">液体 in 液体</span> が定義そのもの。
                  したがって組合せは正しい。
                  <br />
                  代表例：脂肪乳剤やプロポフォール静注剤、
                  O/Wクリーム・W/Oクリームなどの外用乳剤。
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">3) エアゾール</p>
                <p className="text-gray-700">
                  正しくは <span className="font-semibold">液体 or 固体 in 気体</span>。
                  表では逆に「分散相：気体、分散媒：液体または固体」となっており逆転している。
                  <br />
                  代表例：pMDI などの定量噴霧式吸入剤（液体エアゾール）、
                  外用スプレー剤、吸入粉末剤（固体エアゾール）など。
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">4) フォーム（泡沫）</p>
                <p className="text-gray-700">
                  正しくは <span className="font-semibold">気体 in 液体</span>。
                  本問では「分散相：液体、分散媒：気体」と逆になっている。
                  <br />
                  代表例：ステロイドフォーム製剤、泡状の外用消毒剤や泡ハンドソープなど。
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">5) キセロゲル</p>
                <p className="text-gray-700">
                  ゲルから分散媒（液体）がほぼ抜けた乾燥ゲル。
                  実際には「固体中に気体（多孔質固体）」とみなされるので、
                  「固体 in 液体」ではない。
                  <br />
                  代表例：乾燥した創傷被覆用ハイドロゲルマトリックスや、
                  再含水して用いる乾燥ゲル状ポリマー製剤など。
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs md:text-sm text-gray-700">
              <p className="font-bold text-yellow-800 mb-1">覚え方メモ</p>
              <ul className="list-disc list-inside space-y-1">
                <li>エマルション：<span className="font-semibold">液体 in 液体</span>（乳剤の基本）</li>
                <li>サスペンション：<span className="font-semibold">固体 in 液体</span>（懸濁液）</li>
                <li>エアゾール：<span className="font-semibold">液体/固体 in 気体</span>（吸入剤・スプレー）</li>
                <li>フォーム：<span className="font-semibold">気体 in 液体</span>（泡状製剤）</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 flex flex-col justify-center h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-100 max-w-xl mx-auto"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                正解は「2：エマルション」
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 text-center">
                エマルションは <span className="font-semibold">液体 in 液体</span> の分散系であり、
                表の組合せ「分散相：液体／分散媒：液体」が定義と一致します。
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
                <p className="font-bold mb-2">国家試験でのポイント</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>分散相と分散媒を<span className="font-semibold">どちらが外側か</span>で整理する。</li>
                  <li>各製剤の典型例（サスペンション・エマルション・エアゾール・フォーム）をイメージとセットで覚える。</li>
                  <li>キセロゲルは「乾燥したゲル」＝固体中に気体、というイメージを持っておく。</li>
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
      {/* ヘッダー */}
      <div className="bg-orange-500 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-orange-400 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第107回 問49：分散系の分類</h1>
        </div>
        <div className="text-sm bg-orange-600 px-3 py-1 rounded-full">
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

      {/* フッター：ナビゲーションボタン */}
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
              : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md'
          }`}
        >
          {step === 0 ? '解法ステップへ' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q107_49;

import React, { useState } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第110回 問49：陽イオン性界面活性剤
// ==========================================
const Q110_49 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  const titles = [
    '問題の確認：どれが「陽イオン性」？',
    'Step 1：界面活性剤の分類と特徴',
    'Step 2：各選択肢を薬学的にチェック',
    'Step 3：まとめとポイント整理',
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
                <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第110回 問49
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  陽イオン性界面活性剤はどれか
                </h4>
              </div>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                陽イオン性界面活性剤はどれか。1つ選べ。
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm md:text-base">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>ステアリン酸ナトリウム</li>
                  <li>ポリソルベート80</li>
                  <li>ラウリル硫酸ナトリウム</li>
                  <li>レシチン</li>
                  <li>ベンゼトニウム塩化物</li>
                </ol>
              </div>

              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm">
                <p className="font-bold text-orange-800 mb-1">
                  まずは「イオン性」と「電荷」のイメージ
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    界面活性剤は「親水基」が
                    <span className="font-bold"> ＋か − か、電荷を持たないか</span>
                    で分類される。
                  </li>
                  <li>
                    <span className="font-bold text-blue-700">陽イオン性</span>
                    ：親水基が<strong>＋電荷</strong>（第4級アンモニウム塩など）
                  </li>
                  <li>
                    <span className="font-bold text-red-700">陰イオン性</span>
                    ：親水基が<strong>−電荷</strong>（カルボン酸塩、硫酸塩など）
                  </li>
                  <li>
                    <span className="font-bold text-gray-700">非イオン性</span>
                    ：親水基に電荷を持たない（ポリオキシエチレン鎖など）
                  </li>
                  <li>
                    <span className="font-bold text-green-700">両性界面活性剤</span>
                    ：＋と−の両方を持つ（レシチンなど）
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-md inline-flex items-center"
                >
                  解説ステップへ進む
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        );

      // -----------------------------------
      // 1. 分類の基本
      // -----------------------------------
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                界面活性剤の「イオン性による分類」
              </h4>
              <p className="text-sm md:text-base text-gray-800">
                親水基にどのような電荷を持つかで、界面活性剤は次の4つに分類されます。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 陽イオン性 */}
              <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm">
                <h5 className="font-bold text-orange-600 mb-2">
                  ① 陽イオン性界面活性剤（カチオン性）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  親水基に<strong>正電荷（＋）</strong>を持つ界面活性剤。
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                  <li>
                    例：第4級アンモニウム塩（ベンザルコニウム塩化物、ベンゼトニウム塩化物 など）
                  </li>
                  <li>主な用途：殺菌消毒薬、防腐剤、帯電防止剤 など</li>
                  <li>陰イオン性界面活性剤と<strong>混合すると失活</strong>しやすい</li>
                </ul>
              </div>

              {/* 陰イオン性 */}
              <div className="bg-white p-4 rounded-xl border border-sky-200 shadow-sm">
                <h5 className="font-bold text-sky-600 mb-2">
                  ② 陰イオン性界面活性剤（アニオン性）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  親水基に<strong>負電荷（−）</strong>を持つ界面活性剤。
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                  <li>カルボン酸塩（石けん：ステアリン酸ナトリウム 等）</li>
                  <li>硫酸エステル塩（ラウリル硫酸ナトリウム 等）</li>
                  <li>洗浄力・起泡力が強い（シャンプーなど）</li>
                </ul>
              </div>

              {/* 非イオン性 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h5 className="font-bold text-gray-700 mb-2">
                  ③ 非イオン性界面活性剤
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  親水基に電荷を持たない。ポリオキシエチレン鎖などが親水基。
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                  <li>例：ポリソルベート80、ポリオキシエチレン硬化ヒマシ油 等</li>
                  <li>電解質や pH の影響を受けにくく、注射剤などでよく使用</li>
                </ul>
              </div>

              {/* 両性 */}
              <div className="bg-white p-4 rounded-xl border border-green-200 shadow-sm">
                <h5 className="font-bold text-green-700 mb-2">
                  ④ 両性界面活性剤（両性イオン型）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  1 分子内に <strong>＋電荷と −電荷</strong> の両方を持つ。
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                  <li>
                    例：レシチン（リン脂質：＋の第四級アンモニウム基と −のリン酸基）
                  </li>
                  <li>生体膜の主成分、乳化剤（脂肪乳剤、リポソーム製剤 など）</li>
                </ul>
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
              各選択肢を「構造・電荷・用途」で確認する
            </h3>
            <div className="space-y-4">
              {/* 1. ステアリン酸ナトリウム */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">
                  1. ステアリン酸ナトリウム
                </h4>
                <p className="text-gray-700 mb-1">
                  カルボン酸塩の陰イオン性界面活性剤（石けんの一種）。親水基は負電荷（−）。
                </p>
                <p className="text-gray-700">用途：洗浄剤、乳化剤など。</p>
              </div>

              {/* 2. ポリソルベート80 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">
                  2. ポリソルベート80
                </h4>
                <p className="text-gray-700 mb-1">
                  非イオン性界面活性剤。親水基に電荷を持たないポリエチレングリコール鎖を持つ。
                </p>
                <p className="text-gray-700">用途：乳化剤、溶解補助剤。</p>
              </div>

              {/* 3. ラウリル硫酸ナトリウム */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">
                  3. ラウリル硫酸ナトリウム
                </h4>
                <p className="text-gray-700 mb-1">
                  硫酸エステル塩の陰イオン性界面活性剤。親水基は負電荷（−）。
                </p>
                <p className="text-gray-700">用途：洗浄剤、起泡剤。</p>
              </div>

              {/* 4. レシチン */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">4. レシチン</h4>
                <p className="text-gray-700 mb-1">
                  両性界面活性剤。分子内に＋電荷と−電荷を持つリン脂質。
                </p>
                <p className="text-gray-700">用途：生体膜成分、乳化剤。</p>
              </div>

              {/* 5. ベンゼトニウム塩化物 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">
                  5. ベンゼトニウム塩化物
                </h4>
                <p className="text-gray-700 mb-1">
                  第4級アンモニウム塩の陽イオン性界面活性剤。親水基は正電荷（＋）。
                </p>
                <p className="text-gray-700">
                  用途：殺菌消毒薬、防腐剤、帯電防止剤。
                </p>
              </div>

              {/* 解離するイオンに注意！ */}
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs md:text-sm text-gray-800">
                <p className="font-bold text-yellow-800 mb-1">解離するイオンに注意！</p>
                <p className="mb-1">
                  「ステアリン酸ナトリウム」「ラウリル硫酸ナトリウム」などのナトリウム塩では、
                  実際に界面活性剤としてはたらくのは
                  <strong>ナトリウムイオンではなく、有機酸や硫酸エステルの陰イオン</strong>です。
                </p>
                <p>
                  <strong>
                    カチオン（Na⁺ など）が対イオンとして書かれているときは本体が陰イオン
                    → 陰イオン性界面活性剤、アニオン（Cl⁻ など）が対イオンなら本体が陽イオン
                    → 陽イオン性界面活性剤
                  </strong>
                  と整理しておくと、陽イオン性との区別がしやすくなります。
                </p>
              </div>
            </div>
          </div>
        );

      // -----------------------------------
      // 3. まとめとポイント整理（解説終了カード）
      // -----------------------------------
      case 3:
        return (
          <div className="space-y-8 text-center h-full flex flex-col justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-orange-100 max-w-xl mx-auto"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                解説終了：正解は「5 ベンゼトニウム塩化物」
              </h2>

              <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left text-sm md:text-base text-gray-800">
                <p className="font-bold mb-2">【この問題で押さえるべきポイント】</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    陽イオン性界面活性剤：親水基に<strong>正電荷（＋）</strong>を持つ界面活性剤。
                    第4級アンモニウム塩が代表例。
                  </li>
                  <li>
                    陰イオン性界面活性剤：親水基に<strong>負電荷（−）</strong>を持ち、
                    洗浄力・起泡力が強い（石けん、ラウリル硫酸ナトリウム など）。
                  </li>
                  <li>
                    非イオン性界面活性剤：親水基に電荷を持たず、注射剤などの安定化に有用
                    （ポリソルベート80 など）。
                  </li>
                  <li>
                    両性界面活性剤：分子内に正負両方の電荷を持ち、生体膜や乳化剤に重要
                    （レシチン など）。
                  </li>
                  <li>
                    選択肢の中で<strong>陽イオン性</strong>なのは
                    <strong>「5. ベンゼトニウム塩化物」</strong>（第4級アンモニウム塩）。
                  </li>
                </ul>
              </div>

              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                本問のような「どれが陽イオン性か？」という問題は、
                <span className="font-bold mx-1">
                  構造から親水基の電荷をイメージできるか
                </span>
                が勝負です。
                普段から「代表的な界面活性剤」と「用途」「イオン性」をセットで覚えておきましょう。
              </p>
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
      {/* 上部バー */}
      <div className="bg-orange-500 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-orange-400 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第110回 問49：ステップ解説</h1>
        </div>
        <div className="text-sm bg-orange-600 px-3 py-1 rounded-full">
          Step {step + 1} / {titles.length}
        </div>
      </div>

      {/* 中央：スライド本体 */}
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

      {/* 下部：ナビボタン */}
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
          <ChevronLeft className="w-5 h-5 mr-2" />
          前へ
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
          {step === 0 ? '解説ステップへ' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q110_49;

import React, { useState } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';

// ==========================================
// 第109回 問50：疎水性薬物の安定化（CyD 包接）
// ==========================================
const Q109_50 = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [openOption, setOpenOption] = useState(null);

  const toggleOption = (index) => {
    setOpenOption(openOption === index ? null : index);
  };

  const options = [
    {
      text: '1. アスコルビン酸',
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
      text: '2. α-シクロデキストリン',
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
      text: '3. カルメロースナトリウム',
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
      text: '4. エデト酸ナトリウム水和物',
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
      text: '5. パラオキシ安息香酸ブチル',
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
    '問題の確認',
    'Step 1：シクロデキストリンとは？',
    'Step 2：具体例（イトラコナゾール製剤）',
    'Step 3：選択肢ごとの検討・結論',
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
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
              <div className="flex flex-col md:flex-row items-center justify中心 gap-6">
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
                  <li>水にほとんど溶けないイトラコナゾールも、HP-β-CyD との包接化合物として溶解性が改善されることで、内用液として使用できる。</li>
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
                      openOption === index ? 'bg-purple-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`font-bold mr-3 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${
                        opt.isCorrect
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-300 text-gray-700'
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
                        animate={{ height: 'auto', opacity: 1 }}
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
                疎水性薬物アルプロスタジルを水中で安定に扱うために「包接複合体」を形成して
                溶解性と安定性を高める目的の添加剤は、
                <span className="font-bold text-green-700">
                  2. α-シクロデキストリン
                </span>
                です。
              </p>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={onBack}
                className="px-8 py-3 bg-gray-800 text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition shadow-lg"
              >
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
              : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
          }`}
        >
          {step === 0 ? '解法ステップへ' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q109_50;
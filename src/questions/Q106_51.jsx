// src/questions/Q106_51.jsx
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
// 第106回 問51：分散系・界面現象（拡張ぬれ）
// ==========================================
const Q106_51 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  const titles = [
    '問題の確認',
    'Step 1：『ぬれ』とは何か？',
    'Step 2：ぬれの3種類と接触角',
    'Step 3：ヤングの式と力のつり合い',
    'Step 4：接触角 θ と cosθ のイメージ（補足）',
    'Step 5：ヤングの式で国試問題を解く',
  ];
  const contactAngleImgPath =
    `${import.meta.env.BASE_URL}image/106-51-contact_angle.png`;
  const wettingTypesImgPath =
    `${import.meta.env.BASE_URL}image/106-51-wetting_types.png`;
  
  const solidGamma = 585; // 固体表面張力 (mN/m)
  const waterGamma = 73; // 水の表面張力 (mN/m)
  const solidLiquidGamma = solidGamma - waterGamma; // S = 0 とおいたときの γ_SL

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      // -----------------------------
      // 0：問題の確認
      // -----------------------------
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4 border-b pb-2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第106回 問51
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  物理薬剤：拡張ぬれと固液界面張力
                </h4>
              </div>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                一定温度において、ある固体表面に水が薄膜状に拡がり、
                <span className="font-bold text-red-600">拡張ぬれ</span>
                が成立するときの
                <span className="font-bold text-blue-600 mx-1">
                  固液界面張力（mN/m）
                </span>
                はどれか。1つ選べ。
                <br />
                なお、固体の表面張力は
                <span className="font-bold mx-1">585 mN/m</span>、
                水の表面張力は
                <span className="font-bold mx-1">73 mN/m</span>とする。
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ul className="space-y-1 text-gray-800">
                  <li>1　73</li>
                  <li>2　439</li>
                  <li>3　512</li>
                  <li>4　585</li>
                  <li>5　658</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm md:text-base flex items-start">
                <Lightbulb className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                <p className="text-gray-800">
                  <span className="font-bold">この解説の流れ：</span>
                  まず「ぬれ」とは何かを押さえ、
                  3 種類のぬれと接触角 θ の関係を整理します。
                  そのうえでヤングの式から固液界面張力を求めます。
                </p>
              </div>
            </div>
          </div>
        );

      // -----------------------------
      // 1：『ぬれ』とは何か？
      // -----------------------------
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              Step 1：『ぬれ』とは何か？
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-sm md:text-base text-gray-800">
                ぬれ（wetting）とは、
                <span className="font-bold mx-1">
                  固体と気体の境目にある界面が、固体と液体の界面に置き換わる現象
                </span>
                を指します。つまり、「もともと空気と接していた固体表面」が、
                液体に置き換えられていく様子を表す言葉です。
              </p>
              <p className="text-sm md:text-base text-gray-800">
                固体表面に液体を 1 滴落として静置すると、液体は図のように
                <span className="font-bold mx-1">固体表面と角度 θ で接して</span>
                留まります。このときの
                <span className="font-bold mx-1">角度 θ を接触角（contact angle）</span>
                といい、
                <span className="font-bold mx-1">「どれくらいぬれているか」</span>
                を評価する指標として利用されます。
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-gray-800 space-y-1">
                <li>
                  接触角 θ が小さいほど液体が広く薄く広がり、
                  「<span className="font-bold">ぬれやすい</span>」状態
                  （ぬれている面積が広い）になる。
                </li>
                <li>
                  接触角 θ が大きいほど液体が丸くなり、
                  固体表面は「<span className="font-bold">ぬれにくい</span>」ことを意味する。
                </li>
                <li>
                  極限の
                  <span className="font-mono mx-1">θ = 180°</span>
                  ではまったくぬれておらず、液体は固体表面の上に球状に乗っているだけと考えられる。
                </li>
              </ul>
              <p className="text-sm md:text-base text-gray-800">
                固体製剤では、錠剤の
                <span className="font-bold mx-1">崩壊・分散・溶解</span>
                などと深く関係するため、ぬれは製剤学的にたいへん重要な物性です。
              </p>
              <div className="mt-4 flex justify-center">
                <img
                  src={contactAngleImgPath}
                  alt="接触角とぬれやすさの関係の模式図"
                  className="w-full max-w-3xl"
                />
              </div>
              <p className="mt-1 text-[11px] text-gray-500 text-right">
                図：製剤学・物理薬剤学通論 第2版（東邦大学薬学部 教授 野口修治 ほか）より転載
              </p>
              <div className="mt-3 bg-blue-50 rounded-lg p-4 text-xs md:text-sm text-gray-800">
                <p className="font-bold text-blue-800 mb-1">国試での見方</p>
                <p>
                  まずは「
                  <span className="font-bold mx-1">ぬれとは、固体表面上で液体がどれくらい広がっているか</span>
                  を表す概念」であり、
                  それを数量的に表すのが
                  <span className="font-bold mx-1">接触角 θ</span>
                  である、という対応をしっかり押さえましょう。
                  次のステップでは、この接触角と界面張力 γ を結びつける
                  「ヤングの式」につなげていきます。
                </p>
              </div>
            </div>
          </div>
        );

      // -----------------------------
      // 2：ぬれの3種類と接触角
      // -----------------------------
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              Step 2：ぬれの3種類と接触角 θ
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-sm md:text-base font-bold text-gray-900 mb-1">
                ぬれの現象は 3 つに分類される（各種のぬれ）
              </p>
              <p className="text-sm md:text-base text-gray-800">
                固体表面上の液体の広がり方（ぬれ具合）は、
                <span className="font-bold mx-1">接触角 θ</span>
                を使って評価します。θ が
                <span className="font-bold mx-1">小さいほど液体がよく広がり「ぬれやすい」</span>
                状態に、θ が
                <span className="font-bold mx-1">大きいほど液体が球状に近づき「ぬれにくい」</span>
                状態になります。
              </p>

              <div className="bg-blue-50 rounded-lg p-4 text-xs md:text-sm text-gray-800">
                <p className="font-bold text-blue-800 mb-2">
                  各種のぬれ（教科書の整理）
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="font-bold">拡張ぬれ</span>（θ = 0°）
                    ：液体が固体表面を
                    <span className="font-bold mx-1">薄膜状に広がる</span>
                    ようなぬれの現象。清浄なガラス面にアルコールがぬらす場合などに観察されます。
                    このとき固体表面は減少し、固体−液体界面と液体表面が増大します。
                  </li>
                  <li>
                    <span className="font-bold">浸漬ぬれ</span>（0 ≦ θ &lt; 90°）
                    ：毛細管をもつ固体面にそって液体が移動していく現象。固体表面が減少するとき、
                    <span className="font-bold mx-1">固体−液体界面は増大するが、液体表面は増大しない</span>
                    特徴があります。
                  </li>
                  <li>
                    <span className="font-bold">付着ぬれ</span>（0 &lt; θ &lt; 180°）
                    ：固体表面に液体がレンズ状となって付着する現象。ガラス板状に水銀を置いた場合などに観察されます。
                  </li>
                </ul>
                <p className="mt-2">
                  この 3 つのぬれは、どれも
                  <span className="font-bold mx-1">接触角 θ の値によって区別できる</span>
                  ことを、図とセットで押さえておきましょう。
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                <img
                  src={wettingTypesImgPath}
                  alt="拡張ぬれ・浸漬ぬれ・付着ぬれの模式図"
                  className="w-full max-w-3xl"
                />
              </div>
              <p className="mt-1 text-[11px] text-gray-500 text-right">
                図：製剤学・物理薬剤学通論 第2版（東邦大学薬学部 教授 野口修治 ほか）より転載
              </p>

              <p className="text-xs md:text-sm text-gray-700 mt-2">
                国試では、「拡張ぬれ＝θ = 0°」という対応をしっかり覚えておくと、
                後で出てくるヤングの式に
                <span className="font-mono mx-1">cos θ = 1</span>
                を代入するステップがスムーズになります。
              </p>
            </div>
          </div>
        );

      // -----------------------------
      // 3：ヤングの式と力のつり合い
      // -----------------------------
      case 3: {
        // 幾何学的に「接線に沿った」接触角を表現するために、
        // 円弧で液滴を描き、その接点で接線方向に γ_L を描画する
        const baseY = 120; // 固体表面（水平）の y 座標
        const leftX = 86; // 液滴が固体と接する左端（接触線）
        const rightX = 234; // 右端（左右対称にとった例）

        const thetaDeg = 70; // 接触角 θ の例（0° < θ < 90°）
        const theta = (Math.PI / 180) * thetaDeg;

        // γ_L ベクトル（液体-気体界面張力）
        const gammaVecLen = 60;
        const gammaLX = leftX + gammaVecLen * Math.cos(theta);
        const gammaLY = baseY - gammaVecLen * Math.sin(theta);

        // 接触角 θ を描くための小さな弧
        const arcR = 26;
        const arcEndX = leftX + arcR * Math.cos(theta);
        const arcEndY = baseY - arcR * Math.sin(theta);

        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              Step 3：ヤングの式と力のつり合い
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-sm md:text-base text-gray-800 mb-2">
                固体表面上の液滴を考えると、接触線まわりで
                <span className="font-bold mx-1">力のつり合い</span>
                をとることで、接触角
                <span className="font-mono mx-1">θ</span>
                を表す
                <span className="font-bold mx-1">ヤングの式</span>
                が得られます。
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-700 mb-1">
                  ヤングの式（固体表面に平行な方向の力のつり合い）
                </p>
                <p className="text-xl md:text-2xl font-mono font-bold text-indigo-700">
                  γ<sub>S</sub> = γ<sub>SL</sub> + γ<sub>L</sub> cos θ
                </p>
                <p className="mt-2 text-xs md:text-sm text-gray-600">
                  ⇔ cos θ = (γ<sub>S</sub> − γ<sub>SL</sub>) / γ<sub>L</sub>
                </p>
              </div>
              <p className="text-xs md:text-sm text-gray-700">
                ここで
                γ<sub>S</sub>：固体表面張力、
                γ<sub>L</sub>：液体（ここでは水）の表面張力、
                γ<sub>SL</sub>：固液界面張力です。
                θ は固体表面と液滴の接線で測る
                <span className="font-bold mx-1">接触角</span>
                です。
              </p>

              <div className="mt-4 flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="flex-1 flex items-center justify-center">
                  <svg
                    viewBox="0 0 320 180"
                    className="w-full max-w-xs"
                    aria-label="ヤングの式の模式図"
                  >
                    {/* 固体表面 */}
                    <rect x="20" y={baseY} width="280" height="18" fill="#e5e7eb" />

                    {/* 液滴（円弧で描いた模式図）*/}
                    <path
                      d={`M ${leftX} ${baseY} A 80 80 0 0 1 ${rightX} ${baseY} Z`}
                      fill="#dbeafe"
                      stroke="#60a5fa"
                      strokeWidth="2"
                    />

                    {/* 接触角 θ の弧（固体表面と液滴表面の接線の間の角）*/}
                    <path
                      d={`M ${leftX + arcR} ${baseY} A ${arcR} ${arcR} 0 0 1 ${arcEndX} ${arcEndY}`}
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                    />
                    <text
                      x={leftX + arcR + 6}
                      y={baseY - 6}
                      fontSize="11"
                      fill="#000000"
                    >
                      θ
                    </text>

                    {/* γ_L ベクトル（液体-気体，接線方向）*/}
                    <line
                      x1={leftX}
                      y1={baseY}
                      x2={gammaLX}
                      y2={gammaLY}
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />
                    <text x={gammaLX + 4} y={gammaLY} fontSize="11" fill="#2563eb">
                      γL
                    </text>

                    {/* γ_L cosθ の水平方向成分 */}
                    <line
                      x1={leftX}
                      y1={baseY}
                      x2={gammaLX}
                      y2={baseY}
                      stroke="#93c5fd"
                      strokeDasharray="4 3"
                      strokeWidth="2"
                    />
                    <text
                      x={gammaLX + 4}
                      y={baseY + 4}
                      fontSize="10"
                      fill="#60a5fa"
                    >
                      γL cosθ
                    </text>

                    {/* γ_S ベクトル（固体-気体，右向き）*/}
                    <line
                      x1={leftX}
                      y1={baseY}
                      x2={leftX + 80}
                      y2={baseY}
                      stroke="#16a34a"
                      strokeWidth="2.5"
                    />
                    <text
                      x={leftX + 84}
                      y={baseY + 12}
                      fontSize="11"
                      fill="#16a34a"
                    >
                      γS
                    </text>

                    {/* γ_SL ベクトル（固体-液体，左向き）*/}
                    <line
                      x1={leftX}
                      y1={baseY}
                      x2={leftX - 60}
                      y2={baseY}
                      stroke="#f97316"
                      strokeWidth="2.5"
                    />
                    <text
                      x={leftX - 72}
                      y={baseY + 12}
                      fontSize="11"
                      fill="#f97316"
                    >
                      γSL
                    </text>
                  </svg>
                </div>
                <p className="flex-1 text-xs md:text-sm text-gray-600">
                  図では、固体表面上の液滴と、接触線まわりの
                  γ<sub>S</sub>, γ<sub>SL</sub>, γ<sub>L</sub> の
                  ベクトルを模式的に示しています。
                  液体-気体界面張力 γ<sub>L</sub> は、
                  <span className="font-bold mx-1">固体表面と接している点における液滴の接線方向</span>
                  にとられており、その水平方向成分が
                  <span className="font-mono mx-1">γ<sub>L</sub> cosθ</span>
                  です。
                  ヤングの式は、固体表面に平行な方向での
                  力のつり合いを表していることに注意しましょう。
                  本問では、この式に
                  <span className="font-mono mx-1">θ = 0°（拡張ぬれ）</span>
                  を代入して、未知の固液界面張力 γ<sub>SL</sub> を計算します。
                </p>
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------
      // 4：接触角 θ と cosθ のイメージ（補足）
      // -----------------------------
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              Step 4：接触角 θ と cosθ のイメージ（補足）
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-sm md:text-base text-gray-800 mb-2">
                前のステップで見たヤングの式には
                <span className="font-mono mx-1">cos θ</span>
                が含まれていました。ここでは、「cosθ が何を表しているか」を
                軽く復習しておきます（三角関数が苦手な人向けの補足です）。
              </p>

              <div className="mt-2 bg-yellow-50 rounded-lg p-4 text-xs md:text-sm text-gray-800 border border-yellow-100">
                <p className="font-bold text-yellow-800 mb-1">
                  三角関数が苦手な人向けミニ復習：cosθ は何を表している？
                </p>
                <p className="mb-2">
                  数学では、直角三角形を使って
                  <span className="font-mono mx-1">
                    cosθ = （隣の辺） / （斜辺）
                  </span>
                  と定義します。これは「矢印がどれだけ横向きか（横方向成分の割合）」を表しています。
                </p>
                <p className="mb-2">
                  さらに、原点を中心とする半径 1 の円（単位円）を考えると、円周上の点 P の座標は
                  <span className="font-mono mx-1">P(cosθ, sinθ)</span>
                  と書けます。つまり、
                  <span className="font-bold mx-1">
                    cosθ は P の x 座標（横方向）
                  </span>
                  、
                  <span className="font-bold mx-1">
                    sinθ は y 座標（縦方向）
                  </span>
                  を表しています。
                </p>
                <div className="mt-3 overflow-x-auto">
                  <div className="min-w-[360px] mx-auto flex justify-center">
                    <svg
                      viewBox="0 0 380 120"
                      className="w-full h-auto"
                      aria-label="cosθ の直角三角形と単位円の図"
                    >
                      {/* 左側：直角三角形 */}
                      <line
                        x1="20"
                        y1="95"
                        x2="110"
                        y2="95"
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="20"
                        y1="95"
                        x2="20"
                        y2="35"
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="20"
                        y1="35"
                        x2="110"
                        y2="95"
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                      />
                      {/* 角 θ */}
                      <path
                        d="M32 95 A 15 15 0 0 1 40 80"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="1.5"
                      />
                      <text x="42" y="82" fontSize="10" fill="#f97316">
                        θ
                      </text>
                      {/* 辺のラベル */}
                      <text x="55" y="105" fontSize="10" fill="#374151">
                        隣の辺（= cosθ）
                      </text>
                      <text x="8" y="65" fontSize="10" fill="#374151">
                        向かいの辺（= sinθ）
                      </text>
                      <text x="60" y="55" fontSize="10" fill="#374151">
                        斜辺 = 1
                      </text>

                      {/* 右側：単位円 */}
                      {(() => {
                        const cx = 260;
                        const cy = 85;
                        const r = 28;
                        const theta = (30 * Math.PI) / 180;

                        const px = cx + r * Math.cos(theta);
                        const py = cy - r * Math.sin(theta);

                        const arcR = 16;
                        const arcStartX = cx + arcR;
                        const arcStartY = cy;
                        const arcEndX = cx + arcR * Math.cos(theta);
                        const arcEndY = cy - arcR * Math.sin(theta);

                        return (
                          <g>
                            {/* 座標軸 */}
                            <line
                              x1={cx - 45}
                              y1={cy}
                              x2={cx + 45}
                              y2={cy}
                              stroke="#9ca3af"
                              strokeWidth="1.2"
                            />
                            <line
                              x1={cx}
                              y1={cy + 40}
                              x2={cx}
                              y2={cy - 40}
                              stroke="#9ca3af"
                              strokeWidth="1.2"
                            />

                            {/* 円 */}
                            <circle
                              cx={cx}
                              cy={cy}
                              r={r}
                              fill="#eff6ff"
                              stroke="#60a5fa"
                              strokeWidth="1.5"
                            />

                            {/* 半径ベクトル OP */}
                            <line
                              x1={cx}
                              y1={cy}
                              x2={px}
                              y2={py}
                              stroke="#2563eb"
                              strokeWidth="1.8"
                            />

                            {/* 角 θ の弧 */}
                            <path
                              d={`M ${arcStartX} ${arcStartY} A ${arcR} ${arcR} 0 0 1 ${arcEndX} ${arcEndY}`}
                              fill="none"
                              stroke="#f97316"
                              strokeWidth="1.5"
                            />
                            <text
                              x={cx + arcR + 4}
                              y={cy - 4}
                              fontSize="10"
                              fill="#f97316"
                            >
                              θ
                            </text>

                            {/* 点P と座標ラベル */}
                            <circle cx={px} cy={py} r={3} fill="#1d4ed8" />
                            <text
                              x={px + 4}
                              y={py - 4}
                              fontSize="10"
                              fill="#1d4ed8"
                            >
                              P(cosθ, sinθ)
                            </text>

                            {/* cosθ, sinθ の成分 */}
                            <line
                              x1={px}
                              y1={py}
                              x2={px}
                              y2={cy}
                              stroke="#93c5fd"
                              strokeDasharray="4 3"
                              strokeWidth="1.3"
                            />
                            <line
                              x1={cx}
                              y1={cy}
                              x2={px}
                              y2={cy}
                              stroke="#93c5fd"
                              strokeDasharray="4 3"
                              strokeWidth="1.3"
                            />
                            <text
                              x={px + 4}
                              y={cy + 10}
                              fontSize="9"
                              fill="#374151"
                            >
                              cosθ
                            </text>
                            <text
                              x={cx - 18}
                              y={py - 2}
                              fontSize="9"
                              fill="#374151"
                            >
                              sinθ
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-center">
                  <div className="bg-white rounded-md p-2 border border-gray-200">
                    <p className="font-mono text-xs">θ = 0°</p>
                    <p className="text-xs">P = (1, 0) → cos0° = 1</p>
                    <p className="text-[11px] text-gray-500">
                      100% 右向き（横成分が最大）
                    </p>
                  </div>
                  <div className="bg-white rounded-md p-2 border border-gray-200">
                    <p className="font-mono text-xs">θ = 90°</p>
                    <p className="text-xs">P = (0, 1) → cos90° = 0</p>
                    <p className="text-[11px] text-gray-500">
                      真上向きなので横成分は 0
                    </p>
                  </div>
                  <div className="bg-white rounded-md p-2 border border-gray-200">
                    <p className="font-mono text-xs">
                      θ が大きくなるほど…
                    </p>
                    <p className="text-xs">cosθ は 1 → 0 → −1 と変化</p>
                    <p className="text-[11px] text-gray-500">
                      横成分がだんだん減り、向きも反転する
                    </p>
                  </div>
                </div>
                <p className="mt-2">
                  本問の<strong>拡張ぬれ</strong>では
                  <span className="font-mono mx-1">θ = 0°</span>
                  とみなせるので、ヤングの式に
                  <span className="font-mono mx-1">cos θ = 1</span>
                  を代入できます。
                  このスライドの内容は、式の計算に自信がないときに見返す
                  「お守り」のような復習だと考えてください。
                </p>
              </div>
            </div>
          </div>
        );

      // -----------------------------
      // 5：ヤングの式で国試問題を解く
      // -----------------------------
      case 5:
        return (
          <div className="space-y-8 text-center h-full flex flex-col justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-purple-100 max-w-xl mx-auto"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                解説終了：正解は「3　512 mN/m」
              </h2>

              <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm md:text-base text-gray-800 text-left">
                <p className="font-bold mb-2">
                  1）ヤングの式に θ = 0°（拡張ぬれ）を代入
                </p>
                <p className="font-mono mb-2 text-center">
                  γ<sub>S</sub> = γ<sub>SL</sub> + γ<sub>L</sub> cos θ
                </p>
                <p className="text-center mb-2">
                  拡張ぬれでは <span className="font-mono">θ = 0°</span> なので
                  <span className="font-mono mx-1">cos θ = 1</span>
                </p>
                <p className="text-center mb-2 font-mono">
                  γ<sub>S</sub> = γ<sub>SL</sub> + γ<sub>L</sub>
                </p>
                <p className="text-center mb-2 font-mono">
                  ⇒ γ<sub>SL</sub> = γ<sub>S</sub> − γ<sub>L</sub>
                </p>

                <p className="font-bold mb-2 mt-4">
                  2）与えられた値を代入
                </p>
                <p className="font-mono text-center leading-relaxed">
                  γ<sub>S</sub>（固体の表面張力） = {solidGamma} mN/m
                  <br />
                  γ<sub>L</sub>（水の表面張力） = {waterGamma} mN/m
                  <br />
                  γ<sub>SL</sub> = {solidGamma} − {waterGamma} ={' '}
                  <span className="text-2xl font-bold text-indigo-700 ml-1">
                    {solidLiquidGamma}
                  </span>{' '}
                  mN/m
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                したがって、固液界面張力は
                <span className="font-bold mx-1">
                  {solidLiquidGamma} mN/m
                </span>
                となり、選択肢「3」が正解です。
              </p>

              <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-700">
                <p className="font-bold mb-2">【重要ポイントのまとめ】</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    拡張ぬれ：液が薄膜として広がる状態で、接触角
                    <span className="font-mono mx-1">θ = 0°</span> とみなせる。
                  </li>
                  <li>
                    接触角 θ による 3 種類の「ぬれ」
                    （拡張・浸漬・付着）を区別しておく。
                  </li>
                  <li>
                    ヤングの式
                    <span className="font-mono mx-1">
                      γ<sub>S</sub> = γ<sub>SL</sub> + γ<sub>L</sub> cos θ
                    </span>
                    は、固体表面に平行な方向の力のつり合いから導かれる。
                  </li>
                  <li>
                    θ = 0° では
                    <span className="font-mono mx-1">
                      γ<sub>SL</sub> = γ<sub>S</sub> − γ<sub>L</sub>
                    </span>
                    と単純な差し算になる。
                  </li>
                  <li>単位（mN/m）をそろえて計算することも確認ポイント。</li>
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
      {/* 上部バー */}
      <div className="bg-purple-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-purple-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第106回 問51：ステップ解説</h1>
        </div>
        <div className="text-sm bg-purple-700 px-3 py-1 rounded-full">
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

export default Q106_51;
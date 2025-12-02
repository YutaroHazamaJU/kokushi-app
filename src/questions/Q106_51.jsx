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
    'Step 1：ヤングの式と拡張ぬれ',
    'Step 2：式に代入して固液界面張力を求める',
    'Step 3：選択肢の確認とまとめ',
  ];

  const solidGamma = 585; // 固体表面張力 (mN/m)
  const waterGamma = 73; // 水の表面張力 (mN/m)
  const solidLiquidGamma = solidGamma - waterGamma; // S = 0 とおいたときの γ_SL

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
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
                  <span className="font-bold">ポイント：</span>
                  「拡張ぬれが成立する」とは、液滴ではなく
                  <span className="font-bold">固体表面に液が薄い膜として広がる状態</span>
                  のことです。
                  このとき接触角は <span className="font-mono">θ = 0°</span> となり、
                  <span className="font-bold mx-1">ヤングの式</span>
                  で
                  <span className="font-mono mx-1">cos θ = 1</span>
                  とおけるのが解法のカギになります。
                </p>
              </div>
            </div>
          </div>
        );

      case 1: {
        const thetaDeg = 40; // 接触角のイメージ用（40°程度）
        const theta = (Math.PI / 180) * thetaDeg;
        const contactX = 70; // 接触線の位置 (x)
        const contactY = 120; // 接触線の位置 (y)
        const arcR = 26; // 接触角を描く弧の半径
        const arcEndX = contactX + arcR * Math.cos(theta);
        const arcEndY = contactY - arcR * Math.sin(theta);
        const gammaVecLen = 60; // γ_L ベクトルの長さ
        const gammaLX = contactX + gammaVecLen * Math.cos(theta);
        const gammaLY = contactY - gammaVecLen * Math.sin(theta);
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              ヤングの式と拡張ぬれのイメージ
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-sm md:text-base text-gray-800">
                固体表面上の液体の「ぬれ」は、
                <span className="font-bold mx-1">接触角 θ</span>
                で評価するのが薬学では一般的です。
                θ の大きさによって、液がどの程度広がるかが決まります。
              </p>

              <div className="bg-blue-50 rounded-lg p-4 text-xs md:text-sm text-gray-800">
                <p className="font-bold text-blue-800 mb-2">接触角による 3 つのぬれ</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-bold">拡張ぬれ</span>：θ = 0°
                    （液が全面に薄膜となって広がる）
                  </li>
                  <li>
                    <span className="font-bold">浸漬ぬれ</span>：0° &lt; θ ≦ 90°
                    （よく濡れている状態）
                  </li>
                  <li>
                    <span className="font-bold">付着ぬれ</span>：90° &lt; θ &lt; 180°
                    （あまり濡れず、液滴に近い）
                  </li>
                </ul>
                <p className="mt-2">
                  本問の「拡張ぬれ」は、
                  <span className="font-mono mx-1">θ = 0°</span>
                  の極限状態を表します。
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                <svg
                  viewBox="0 0 320 90"
                  className="w-full max-w-md"
                  aria-label="接触角によるぬれの模式図"
                >
                  {/* 固体表面 */}
                  <rect x="10" y="60" width="300" height="8" fill="#e5e7eb" />

                  {/* θ = 0° 完全なぬれ */}
                  <rect x="25" y="58" width="60" height="4" fill="#bfdbfe" />
                  <text x="30" y="50" fontSize="10" fill="#374151">
                    θ = 0°
                  </text>

                  {/* 0 < θ < 90° 浸漬ぬれ */}
                  <path
                    d="M140 60 Q 155 40 170 60 Z"
                    fill="#bfdbfe"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                  />
                  <text x="135" y="50" fontSize="10" fill="#374151">
                    0° &lt; θ &lt; 90°
                  </text>

                  {/* θ > 90° 付着ぬれ */}
                  <path
                    d="M240 60 Q 250 35 260 60 Z"
                    fill="#bfdbfe"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                  />
                  <text x="235" y="50" fontSize="10" fill="#374151">
                    θ &gt; 90°
                  </text>
                </svg>
              </div>
            </div>

            {/* ★ ここから追加：ヤングの式の解説とベクトル図 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-800 mb-2">
                ヤングの式：接触角と界面張力ベクトル
              </h4>
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
                ここでも
                γ<sub>S</sub>：固体表面張力、
                γ<sub>L</sub>：液体（ここでは水）の表面張力、
                γ<sub>SL</sub>：固液界面張力です。
                θ は固体表面と液滴の接線で測る
                <span className="font-bold mx-1">接触角</span>
                です。
              </p>
              <div className="mt-3 bg-yellow-50 rounded-lg p-4 text-xs md:text-sm text-gray-800 border border-yellow-100">
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
                  <span className="font-mono mx-1">
                    P(cosθ, sinθ)
                  </span>
                  と書けます。つまり、
                  <span className="font-bold mx-1">cosθ は P の x 座標（横方向）</span>
                  、<span className="font-bold mx-1">sinθ は y 座標（縦方向）</span>
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
                      <line x1="20" y1="95" x2="110" y2="95" stroke="#9ca3af" strokeWidth="1.5" />
                      <line x1="20" y1="95" x2="20" y2="35" stroke="#9ca3af" strokeWidth="1.5" />
                      <line x1="20" y1="35" x2="110" y2="95" stroke="#9ca3af" strokeWidth="1.5" />
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
                        const cx = 260; // 円の中心 x
                        const cy = 85; // 円の中心 y
                        const r = 28; // 円の半径
                        const theta = (30 * Math.PI) / 180; // 例として θ = 30°

                        const px = cx + r * Math.cos(theta); // 点Pのx座標
                        const py = cy - r * Math.sin(theta); // 点Pのy座標

                        const arcR = 16; // 角度表示用の小さい半径
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

                            {/* 角 θ の弧（原点まわり） */}
                            <path
                              d={`M ${arcStartX} ${arcStartY} A ${arcR} ${arcR} 0 0 1 ${arcEndX} ${arcEndY}`}
                              fill="none"
                              stroke="#f97316"
                              strokeWidth="1.5"
                            />
                            <text x={cx + arcR + 4} y={cy - 4} fontSize="10" fill="#f97316">
                              θ
                            </text>

                            {/* 点P と座標ラベル */}
                            <circle cx={px} cy={py} r={3} fill="#1d4ed8" />
                            <text x={px + 4} y={py - 4} fontSize="10" fill="#1d4ed8">
                              P(cosθ, sinθ)
                            </text>

                            {/* cosθ, sinθ の成分（補助線） */}
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
                            <text x={px + 4} y={cy + 10} fontSize="9" fill="#374151">
                              cosθ
                            </text>
                            <text x={cx - 18} y={py - 2} fontSize="9" fill="#374151">
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
                    <p className="text-xs">
                      P = (1, 0) → cos0° = 1
                    </p>
                    <p className="text-[11px] text-gray-500">
                      100% 右向き（横成分が最大）
                    </p>
                  </div>
                  <div className="bg-white rounded-md p-2 border border-gray-200">
                    <p className="font-mono text-xs">θ = 90°</p>
                    <p className="text-xs">
                      P = (0, 1) → cos90° = 0
                    </p>
                    <p className="text-[11px] text-gray-500">
                      真上向きなので横成分は 0
                    </p>
                  </div>
                  <div className="bg-white rounded-md p-2 border border-gray-200">
                    <p className="font-mono text-xs">θ が大きくなるほど…</p>
                    <p className="text-xs">
                      cosθ は 1 → 0 → −1 と変化
                    </p>
                    <p className="text-[11px] text-gray-500">
                      横成分がだんだん減り、向きも反転する
                    </p>
                  </div>
                </div>
                <p className="mt-2">
                  本問の<strong>拡張ぬれ</strong>では
                  <span className="font-mono mx-1">θ = 0°</span>
                  とみなせるので、ヤングの式
                  <span className="font-mono mx-1">
                    γ<sub>S</sub> = γ<sub>SL</sub> + γ<sub>L</sub> cos θ
                  </span>
                  に <span className="font-mono mx-1">cos θ = 1</span> を代入できます。
                  cosθ を「横方向成分」としてイメージしておくと、力のつり合いとの対応が分かりやすくなります。
                </p>
              </div>

              <div className="mt-4 flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="flex-1 flex items-center justify-center">
                  <svg
                    viewBox="0 0 320 180"
                    className="w-full max-w-xs"
                    aria-label="ヤングの式の模式図"
                  >
                    {/* 固体表面 */}
                    <rect x="20" y="120" width="280" height="18" fill="#e5e7eb" />

                    {/* 液滴（円弧で表現：イメージ図なのでここは固定パスでOK） */}
                    <path
                      d="M40 120 Q 160 40 280 120 Z"
                      fill="#dbeafe"
                      stroke="#60a5fa"
                      strokeWidth="2"
                    />

                    {/* 接触角 θ の弧（contactX, contactY を中心に θ を三角関数で描画） */}
                    <path
                      d={`M ${contactX + arcR} ${contactY} A ${arcR} ${arcR} 0 0 1 ${arcEndX} ${arcEndY}`}
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                    />
                    <text
                      x={contactX + arcR + 6}
                      y={contactY - 6}
                      fontSize="11"
                      fill="#f97316"
                    >
                      θ
                    </text>

                    {/* γ_L ベクトル（液体-気体，θ 方向）*/}
                    <line
                      x1={contactX}
                      y1={contactY}
                      x2={gammaLX}
                      y2={gammaLY}
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />
                    <text
                      x={gammaLX + 4}
                      y={gammaLY}
                      fontSize="11"
                      fill="#2563eb"
                    >
                      γ_L
                    </text>

                    {/* γ_L cosθ の水平方向成分（横向き成分） */}
                    <line
                      x1={contactX}
                      y1={contactY}
                      x2={contactX + gammaVecLen * Math.cos(theta)}
                      y2={contactY}
                      stroke="#93c5fd"
                      strokeDasharray="4 3"
                      strokeWidth="2"
                    />
                    <text
                      x={contactX + gammaVecLen * Math.cos(theta) + 4}
                      y={contactY + 4}
                      fontSize="10"
                      fill="#60a5fa"
                    >
                      γ_L cosθ
                    </text>

                    {/* γ_S ベクトル（固体-気体，右向き）*/}
                    <line
                      x1={contactX}
                      y1={contactY}
                      x2={contactX + 80}
                      y2={contactY}
                      stroke="#16a34a"
                      strokeWidth="2.5"
                    />
                    <text
                      x={contactX + 84}
                      y={contactY + 12}
                      fontSize="11"
                      fill="#16a34a"
                    >
                      γ_S
                    </text>

                    {/* γ_SL ベクトル（固体-液体，左向き）*/}
                    <line
                      x1={contactX}
                      y1={contactY}
                      x2={contactX - 60}
                      y2={contactY}
                      stroke="#f97316"
                      strokeWidth="2.5"
                    />
                    <text
                      x={contactX - 72}
                      y={contactY + 12}
                      fontSize="11"
                      fill="#f97316"
                    >
                      γ_SL
                    </text>
                  </svg>
                </div>
                <p className="flex-1 text-xs md:text-sm text-gray-600">
                  図では、固体表面上の液滴と、接触線まわりの
                  γ<sub>S</sub>, γ<sub>SL</sub>, γ<sub>L</sub> の
                  ベクトルを模式的に示しています。
                  ヤングの式は、固体表面に平行な方向での
                  力のつり合いを表していることに注意しましょう。
                </p>
              </div>
            </div>

            {/* ★ ここから追加：接触角によるぬれの分類 */}
            <div className="bg-green-50 rounded-xl p-4 text-sm md:text-base text-gray-800">
              <h4 className="font-bold text-green-800 mb-2">
                接触角による 3 つの「ぬれ」の分類
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="font-bold">拡張ぬれ</span>：
                  θ = 0°（液が全面に薄膜となって広がる）
                </li>
                <li>
                  <span className="font-bold">浸漬ぬれ</span>：
                  0° &lt; θ ≦ 90°（よく濡れている状態）
                </li>
                <li>
                  <span className="font-bold">付着ぬれ</span>：
                  90° &lt; θ &lt; 180°（あまり濡れず、液滴に近い）
                </li>
              </ul>
              <p className="mt-2 text-xs md:text-sm text-gray-700">
                薬剤学では、固体表面への液の広がりや、懸濁剤・乳剤・
                コーティングなどでの「ぬれ」の良し悪しを評価するときに、
                接触角 θ と界面張力 γ を組み合わせて考えます。
                本問の「拡張ぬれ」は θ → 0° の典型例です。
              </p>
            </div>
          </div>
        );
      }

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
              数値を代入して γ
              <sub>SL</sub>
              を求める
            </h3>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <p className="text-sm md:text-base text-gray-800">
                本問で与えられている値：
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm md:text-base text-center leading-relaxed">
                γ<sub>S</sub>（固体の表面張力） = {solidGamma} mN/m
                <br />
                γ<sub>L</sub>（水の表面張力） = {waterGamma} mN/m
                <br />
                求めたいもの： γ<sub>SL</sub>（固液界面張力）
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 text-sm md:text-base text-gray-800">
                <p className="font-bold text-yellow-800 mb-2">
                  ヤングの式に θ = 0° を代入して γ<sub>SL</sub> を解く
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
              </div>

              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm md:text-base text-center leading-relaxed">
                γ<sub>SL</sub> = {solidGamma} − {waterGamma} ={' '}
                <span className="text-2xl font-bold text-indigo-700">
                  {solidLiquidGamma}
                </span>{' '}
                mN/m
              </div>

              <p className="text-sm md:text-base text-gray-700 text-center mt-2">
                よって、固液界面張力は
                <span className="font-bold mx-1">
                  {solidLiquidGamma} mN/m
                </span>
                と求まります。
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
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-purple-100 max-w-xl mx-auto"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                解説終了：正解は「3　512 mN/m」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                拡張ぬれが成立するとき、接触角は
                <span className="font-mono mx-1">θ = 0°</span>
                となります。
                ヤングの式
                <span className="font-mono mx-1">
                  γ<sub>S</sub> = γ<sub>SL</sub> + γ<sub>L</sub> cos θ
                </span>
                に θ = 0° を代入すると
                <span className="font-mono mx-1">
                  γ<sub>S</sub> = γ<sub>SL</sub> + γ<sub>L</sub>
                </span>
                となり、
                <span className="font-mono mx-1">
                  γ<sub>SL</sub> = γ<sub>S</sub> − γ<sub>L</sub>
                </span>
                が得られます。
                数値を代入すると γ<sub>SL</sub> = 585 − 73 = 512 mN/m となります。
              </p>

              <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-700">
                <p className="font-bold mb-2">【重要ポイントのまとめ】</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    拡張ぬれ：液が薄膜として広がる状態で、接触角
                    <span className="font-mono mx-1">θ = 0°</span> とみなせる。
                  </li>
                  <li>
                    ヤングの式
                    <span className="font-mono mx-1">
                      γ<sub>S</sub> = γ<sub>SL</sub> + γ<sub>L</sub> cos θ
                    </span>
                    から、θ = 0° では
                    <span className="font-mono mx-1">
                      γ<sub>SL</sub> = γ<sub>S</sub> − γ<sub>L</sub>
                    </span>
                    が導ける。
                  </li>
                  <li>
                    与えられた
                    <span className="font-mono mx-1">γ<sub>S</sub> = 585</span>,
                    <span className="font-mono mx-1">γ<sub>L</sub> = 73</span>
                    から、固液界面張力は 512 mN/m となる。
                  </li>
                  <li>
                    単位（mN/m）をそろえて計算することも確認ポイント。
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
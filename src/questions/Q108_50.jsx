import React, { useEffect, useState } from 'react';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Activity,
  Droplet,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from '../components/Layout';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// ==========================================
// 第108回 問50：ダイラタント流動
// ==========================================
// レオグラム用のデータ（横軸：ずり応力 τ，縦軸：ずり速度 D）
// 共通の「ずり速度 D」の刻みを用意して，各流動様式ごとに τ(D) を計算してプロットします。
const shearRates = [0, 0.5, 1, 1.5, 2, 2.5];

// ニュートン流動：τ = η · D （ここでは η = 1 として直線）
const newtonianData = shearRates.map((D) => ({
  tau: D, // η = 1 のとき τ = D
  D,
}));

// 準粘性流動（擬塑性流動）：τ = k · D^n （n < 1 で shear-thinning）
const kPseudoplastic = 0.8;
const nPseudoplastic = 0.7;
const pseudoplasticData = shearRates.map((D) => ({
  tau: D === 0 ? 0 : kPseudoplastic * Math.pow(D, nPseudoplastic),
  D,
}));

// 塑性流動（Bingham 流動）：τ = τ0 + ηp · D （D > 0），D = 0 のときは流れない領域
const tau0Bingham = 0.4; // 降伏値 τ0
const etaPlastic = 0.6;  // 降伏後の見かけ粘度
const binghamData = shearRates.map((D) => ({
  tau: D === 0 ? 0 : tau0Bingham + etaPlastic * D,
  D,
}));

// 準塑性流動：τ = τy + k · D^n （n < 1，降伏値＋shear-thinning）
const tauYieldQuasi = 0.4; // 降伏値 τy
const kQuasi = 0.6;
const nQuasi = 0.7;
const quasiPlasticData = shearRates.map((D) => ({
  tau: D === 0 ? 0 : tauYieldQuasi + kQuasi * Math.pow(D, nQuasi),
  D,
}));

// ダイラタント流動（せん断増粘）：τ = k · D^n （n > 1 で shear-thickening）
const kDilatant = 0.25;
const nDilatant = 1.6;
const dilatantData = shearRates.map((D) => ({
  tau: D === 0 ? 0 : kDilatant * Math.pow(D, nDilatant),
  D,
}));
const Q108_50 = ({ onBack }) => {
  const [step, setStep] = useState(0);

  // ステップを進めたときにスクロール位置を先頭に戻す
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [step]);

  const titles = [
    '問題の確認：ダイラタント流動とは？',
    'Step 1：流動様式の基本（ニュートン〜ダイラタント）',
    'Step 2：各選択肢を製剤学的にチェック',
    'Step 3：まとめと臨床・製剤への応用'
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
                <span className="bg-amber-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                  第108回 問50
                </span>
                <h4 className="font-bold text-gray-800 text-lg">
                  ダイラタント流動を示すのはどれか
                </h4>
              </div>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-serif">
                ダイラタント流動を示すのはどれか。1つ選べ。
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm md:text-base">
                <h5 className="font-bold text-gray-800 mb-2">選択肢</h5>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>カルメロースナトリウム溶液</li>
                  <li>チンク油</li>
                  <li>グリセリン</li>
                  <li>デンプン濃厚水性懸濁液</li>
                  <li>ヒマシ油</li>
                </ol>
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                <p className="font-bold text-amber-800 mb-1">
                  まずは「ダイラタント流動」のイメージ
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    かき混ぜる（せん断速度↑）ほど
                    <span className="font-bold">ドロドロになって動きにくくなる</span>
                    挙動。
                  </li>
                  <li>
                    代表例：<span className="font-bold text-amber-700">デンプン濃厚懸濁液</span>
                    （水＋片栗粉 → いわゆる「ウーブレック」）。
                  </li>
                  <li>
                    逆に「かき混ぜるほどサラサラになる」のは
                    <span className="font-bold text-indigo-700">準粘性流動（擬塑性流動）</span>。
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors shadow-md inline-flex items-center"
                >
                  解説ステップへ進む
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        );

      // -----------------------------------
      // 1. 流動様式の基本（5種類）
      // -----------------------------------
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                「せん断速度」と「見かけ粘度」の関係で分類する
              </h4>
              <p className="text-sm md:text-base text-gray-800">
                レオロジーの教科書に出てくる
                <span className="font-bold mx-1">レオグラム</span>
                では，
                <span className="font-bold mx-1">横軸にずり応力（せん断応力） τ = F / A</span>，
                <span className="font-bold mx-1">縦軸にずり速度（せん断速度） D = dv / dy</span>
                をとり，その傾き
                <span className="font-mono mx-1">D / τ</span>
                が「流動率（fluidity）」＝粘度の逆数を表します。
                第108回 問50 では，このレオグラム上で
                <span className="font-bold">
                  ニュートン流動／準粘性流動／塑性流動／準塑性流動／ダイラタント流動
                </span>
                の5つのパターンをイメージできるようにしておきましょう。
              </p>
              <p className="mt-2 text-xs md:text-sm text-gray-800">
                ここで，<span className="font-bold">ずり応力（せん断応力）</span>は
                <span className="font-mono mx-1">τ = F / A</span>
                （接触面積 A に力 F を加えたときの単位面積あたりの力）で
                <span className="font-bold mx-1">レオグラムの横軸</span>にとり，
                <span className="font-bold mx-1">ずり速度（せん断速度）</span>は
                <span className="font-mono mx-1">D = dv / dy</span>
                （層ごとの速度差 dv を距離 dy で割ったもの）で
                <span className="font-bold mx-1">縦軸</span>にとります。
                ニュートン流動では
                <span className="font-mono mx-1">τ = η · D</span>
                が成り立ち，粘度 η が一定なので，レオグラム上では原点を通る直線になります。
              </p>
              <div className="mt-3 bg-white rounded-lg p-3 border border-blue-100">
                <p className="text-xs md:text-sm text-gray-800 mb-2 font-bold">
                  ずり応力 τ と ずり速度 dv/dy のイメージ図
                </p>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {/* 左：二枚の板と速度勾配 */}
                  <div className="flex-1 flex flex-col items-center">
                    <svg
                      viewBox="0 0 260 130"
                      className="w-full h-auto max-w-xs"
                      aria-label="ニュートンの粘性法則の模式図"
                    >
                      {/* 左：平行板と流体＋力 F のイメージ */}
                      {/* 外枠 */}
                      <rect x="10" y="30" width="90" height="70" fill="none" stroke="#9ca3af" strokeWidth="1" />
                      {/* 上下の板 */}
                      <rect x="15" y="35" width="80" height="10" fill="#e5e7eb" />
                      <rect x="15" y="85" width="80" height="10" fill="#e5e7eb" />
                      {/* 流体領域 */}
                      <rect x="18" y="45" width="74" height="40" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
                      <text x="55" y="70" textAnchor="middle" fontSize="9" fill="#4b5563">
                        流体
                      </text>

                      {/* 力 F の矢印（上板を右向きに引く） */}
                      <line
                        x1="95"
                        y1="40"
                        x2="120"
                        y2="40"
                        stroke="#dc2626"
                        strokeWidth="2"
                        markerEnd="url(#arrow-red-10850)"
                      />
                      <text x="122" y="38" fontSize="10" fill="#dc2626">
                        F
                      </text>
                      <text x="25" y="30" fontSize="9" fill="#4b5563">
                        面積 A
                      </text>

                      {/* 中央の説明ラベル：せん断応力 S = F/A */}
                      <text x="55" y="20" textAnchor="middle" fontSize="10" fill="#dc2626">
                        せん断応力 S = F / A
                      </text>

                      {/* 右：速度勾配とニュートンの粘性法則のイメージ */}
                      {/* 下の固定板 */}
                      <rect x="150" y="85" width="90" height="10" fill="#e5e7eb" />
                      <text x="195" y="110" textAnchor="middle" fontSize="9" fill="#4b5563">
                        固定された板（v = 0）
                      </text>

                      {/* 上の板（動かす板）を少し右にずらして描画 */}
                      <polygon
                        points="150,45 240,35 240,45 150,55"
                        fill="#dbeafe"
                        stroke="#93c5fd"
                        strokeWidth="1"
                      />
                      <text x="195" y="32" textAnchor="middle" fontSize="9" fill="#1d4ed8">
                        動かす板（v）
                      </text>

                      {/* 流体領域（台形） */}
                      <polygon
                        points="155,55 235,45 235,85 155,95"
                        fill="#eff6ff"
                        stroke="#93c5fd"
                        strokeWidth="1"
                      />

                      {/* 速度プロファイルの線（下小，上大） */}
                      <line
                        x1="160"
                        y1="92"
                        x2="180"
                        y2="88"
                        stroke="#6b7280"
                        strokeWidth="1"
                        markerEnd="url(#arrow-gray-10850)"
                      />
                      <text x="162" y="100" fontSize="8" fill="#4b5563">
                        v 小
                      </text>

                      <line
                        x1="225"
                        y1="52"
                        x2="250"
                        y2="48"
                        stroke="#4b5563"
                        strokeWidth="1.5"
                        markerEnd="url(#arrow-gray-10850)"
                      />
                      <text x="252" y="50" fontSize="8" fill="#4b5563">
                        v 大
                      </text>

                      {/* dv, dy とせん断速度 D = dv/dy */}
                      <line
                        x1="220"
                        y1="52"
                        x2="220"
                        y2="88"
                        stroke="#6366f1"
                        strokeWidth="1"
                        strokeDasharray="3 2"
                      />
                      <text x="224" y="71" fontSize="8" fill="#4f46e5">
                        dy
                      </text>
                      <text x="205" y="70" fontSize="8" fill="#4f46e5">
                        dv
                      </text>
                      <text x="200" y="18" textAnchor="middle" fontSize="10" fill="#111827">
                        せん断速度 D = dv / dy
                      </text>

                      {/* 上の板を引く力 F（再掲） */}
                      <line
                        x1="240"
                        y1="40"
                        x2="260"
                        y2="40"
                        stroke="#dc2626"
                        strokeWidth="2"
                        markerEnd="url(#arrow-red-10850)"
                      />

                      {/* S = ηD の式 */}
                      <text x="200" y="8" textAnchor="middle" fontSize="10" fill="#111827">
                        S = η · D
                      </text>

                      {/* 矢印マーカー定義 */}
                      <defs>
                        <marker
                          id="arrow-red-10850"
                          markerWidth="6"
                          markerHeight="6"
                          refX="5"
                          refY="3"
                          orient="auto"
                        >
                          <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
                        </marker>
                        <marker
                          id="arrow-gray-10850"
                          markerWidth="6"
                          markerHeight="6"
                          refX="5"
                          refY="3"
                          orient="auto"
                        >
                          <path d="M0,0 L6,3 L0,6 Z" fill="#4b5563" />
                        </marker>
                      </defs>
                    </svg>
                  </div>

                  {/* 右：説明テキスト */}
                  <div className="flex-1 text-[11px] md:text-xs text-gray-700 space-y-1">
                    <p>
                      上の板に平行な力 <span className="font-mono">F</span> を加えると，
                      板の間の流体が少しずつ「ずれて」流れます。
                    </p>
                    <p>
                      単位面積あたりの力が
                      <span className="font-mono mx-1">τ = F / A</span>
                      （ずり応力），
                      層ごとの速度差が
                      <span className="font-mono mx-1">dv</span>，
                      層間距離が
                      <span className="font-mono mx-1">dy</span>
                      です。
                    </p>
                    <p>
                      ニュートン流動では，
                      <span className="font-mono mx-1">
                        τ = η · (dv / dy)
                      </span>
                      が成り立ち，
                      <span className="font-bold">η が「粘度」の定数</span>
                      になります。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ニュートン流動 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h5 className="font-bold text-gray-800 mb-2 flex items-center">
                  <Droplet className="w-5 h-5 mr-2 text-sky-500" />
                  ニュートン流動（Newtonian）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  せん断速度を変えても粘度が一定の理想的な流れ。
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  例：水，エタノール，グリセリン，ヒマシ油などの
                  <span className="font-bold">純粋な液体・低分子溶液</span>
                </p>
                <div className="mt-2 bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1 text-center">
                    レオグラム（ニュートン流動）：D と τ が比例
                  </p>
                  <div className="relative h-20 border-l border-b border-gray-300 mx-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={newtonianData}
                        margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
                      >
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="tau"
                          type="number"
                          domain={[0, 2.5]}
                          tick={false}
                          axisLine
                          tickLine={false}
                        />
                        <YAxis
                          dataKey="D"
                          type="number"
                          domain={[0, 2.5]}
                          tick={false}
                          axisLine
                          tickLine={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="D"
                          stroke="#0ea5e9"
                          strokeWidth={3}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <span className="absolute -left-5 top-0 text-[10px] text-gray-500">
                      ずり速度 D
                    </span>
                    <span className="absolute right-0 -bottom-3 text-[10px] text-gray-500">
                      ずり応力 τ
                    </span>
                  </div>
                </div>
              </div>

              {/* 準粘性流動（擬塑性，shear-thinning，降伏値なし） */}
              <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-sm">
                <h5 className="font-bold text-indigo-700 mb-2 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  準粘性流動（擬塑性流動）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  降伏値はなく，
                  <span className="font-bold">かき混ぜるほどサラサラになる（粘度↓）</span>
                  流れ。
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  例：鎖状高分子 1% 水溶液
                  （メチルセルロース，アルギン酸Na，カルメロースNa など）
                </p>
                <div className="mt-2 bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1 text-center">
                    レオグラム（準粘性流動：shear-thinning）
                  </p>
                  <div className="relative h-20 border-l border-b border-gray-300 mx-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={pseudoplasticData}
                        margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
                      >
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="tau"
                          type="number"
                          domain={[0, 2.5]}
                          tick={false}
                          axisLine
                          tickLine={false}
                        />
                        <YAxis
                          dataKey="D"
                          type="number"
                          domain={[0, 3.5]}
                          tick={false}
                          axisLine
                          tickLine={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="D"
                          stroke="#4f46e5"
                          strokeWidth={3}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <span className="absolute -left-5 top-0 text-[10px] text-gray-500">
                      ずり速度 D
                    </span>
                    <span className="absolute right-0 -bottom-3 text-[10px] text-gray-500">
                      ずり応力 τ
                    </span>
                  </div>
                </div>
              </div>

              {/* 塑性流動（ビンガム流動） */}
              <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-sm">
                <h5 className="font-bold text-rose-700 mb-2">
                  塑性流動（Bingham 流動）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  一定以上の応力
                  <span className="font-bold">（降伏値 S₀）を超えると流れ始める</span>
                  タイプ。流れ出した後はほぼ一定粘度。
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  例：チンク油，カオリン懸濁液などの高濃度懸濁製剤
                </p>
                <div className="mt-2 bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1 text-center">
                    せん断応力 S と流動曲線（塑性流動）
                  </p>
                  <div className="relative h-20 border-l border-b border-gray-300 mx-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={binghamData}
                        margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
                      >
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="tau"
                          type="number"
                          domain={[0, 2.5]}
                          tick={false}
                          axisLine
                          tickLine={false}
                        />
                        <YAxis
                          dataKey="D"
                          type="number"
                          domain={[0, 2.5]}
                          tick={false}
                          axisLine
                          tickLine={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="D"
                          stroke="#fb7185"
                          strokeWidth={3}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <span className="absolute left-4 top-8 text-[9px] text-gray-500">
                      S₀
                    </span>
                    <span className="absolute -left-5 top-0 text-[10px] text-gray-500">
                      ずり速度 D
                    </span>
                    <span className="absolute right-0 -bottom-3 text-[10px] text-gray-500">
                      ずり応力 S
                    </span>
                  </div>
                </div>
              </div>

              {/* 準塑性流動（降伏値＋shear-thinning） */}
              <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm">
                <h5 className="font-bold text-purple-700 mb-2">
                  準塑性流動（降伏値＋準粘性）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  <span className="font-bold">
                    降伏値 S₀ を超えると流れ始め，流れ始めてからも
                    かき混ぜるほど粘度が下がる
                  </span>
                  タイプ。
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  例：鎖状高分子 2〜3% 水溶液
                  （メチルセルロース，アルギン酸Na，カルメロースNa など）
                </p>
                <div className="mt-2 bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1 text-center">
                    せん断応力 S と流動曲線（準塑性流動）
                  </p>
                  <div className="relative h-20 border-l border-b border-gray-300 mx-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={quasiPlasticData}
                        margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
                      >
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="tau"
                          type="number"
                          domain={[0, 2.5]}
                          tick={false}
                          axisLine
                          tickLine={false}
                        />
                        <YAxis
                          dataKey="D"
                          type="number"
                          domain={[0, 3.5]}
                          tick={false}
                          axisLine
                          tickLine={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="D"
                          stroke="#a855f7"
                          strokeWidth={3}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <span className="absolute -left-5 top-0 text-[10px] text-gray-500">
                      ずり速度 D
                    </span>
                    <span className="absolute right-0 -bottom-3 text-[10px] text-gray-500">
                      ずり応力 S
                    </span>
                  </div>
                </div>
              </div>

              {/* ダイラタント流動 */}
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm md:col-span-2">
                <h5 className="font-bold text-amber-700 mb-2 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  ダイラタント流動（Dilatant：せん断増粘）
                </h5>
                <p className="text-sm md:text-base text-gray-800 mb-2">
                  ゆっくり動かすと流れるが，強く・速くかき混ぜると
                  <span className="font-bold">急に固くなる（粘度↑）</span>流れ。
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  例：高濃度デンプン懸濁液（50%以上）など
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* グラフイメージ */}
                  <div className="bg-amber-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1 text-center">
                      レオグラム（ダイラタント流動：shear-thickening）
                    </p>
                    <div className="relative h-20 border-l border-b border-gray-300 mx-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={dilatantData}
                          margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
                        >
                          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                          <XAxis
                            dataKey="tau"
                            type="number"
                            domain={[0, 2.5]}
                            tick={false}
                            axisLine
                            tickLine={false}
                          />
                          <YAxis
                            dataKey="D"
                            type="number"
                            domain={[0, 2.5]}
                            tick={false}
                            axisLine
                            tickLine={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="D"
                            stroke="#d97706"
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <span className="absolute -left-5 top-0 text-[10px] text-gray-500">
                        ずり速度 D
                      </span>
                      <span className="absolute right-0 -bottom-3 text-[10px] text-gray-500">
                        ずり応力 τ
                      </span>
                    </div>
                  </div>

                  {/* イメージ図：ビーカー内のデンプン懸濁液 */}
                  <div className="bg-amber-50 rounded-lg p-3 flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-700 mb-1 text-center">
                      高濃度デンプン懸濁液（ウーブレック）のイメージ
                    </p>
                    <div className="relative w-28 h-24">
                      {/* ビーカー外枠 */}
                      <div className="absolute inset-0 border-2 border-amber-700 rounded-b-lg rounded-t-sm bg-white" />
                      {/* 懸濁液 */}
                      <div className="absolute left-1 right-1 bottom-1 h-14 bg-amber-200 rounded-b-md border-t border-amber-400" />
                      {/* かき混ぜ棒 */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-1 h-16 bg-amber-800 rounded-full" />
                      {/* 上から押す矢印 */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-1 flex flex-col items-center">
                        <span className="text-[9px] text-gray-600 mb-0.5">
                          強くかき混ぜると固くなる
                        </span>
                        <span className="text-amber-700 text-xs">↓</span>
                      </div>
                    </div>
                  </div>
                </div>
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
              各選択肢を「流動様式」と「製剤例」で確認
            </h3>
            <div className="space-y-4">
              {/* 1. カルメロースナトリウム溶液 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">
                  1. カルメロースナトリウム溶液
                </h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  高分子電解質の水溶液で，
                  <span className="font-bold text-indigo-700">
                    準粘性流動（擬塑性流動：shear-thinning）
                  </span>
                  を示す代表例。
                </p>
                <p className="text-xs text-gray-600">
                  かき混ぜるとサラサラになり，安静時には粘度が上がることで
                  <span className="font-bold">懸濁性点眼液などの分散安定化</span>
                  に役立つ。
                </p>
              </div>

              {/* 2. チンク油 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">2. チンク油</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  酸化亜鉛などの粉体が油中に分散した高濃度懸濁製剤。
                  一般に<span className="font-bold text-rose-700">塑性流動</span>
                  （降伏値を持つ）を示す。
                </p>
                <p className="text-xs text-gray-600">
                  塗り広げるときに，一定以上の力を加えると流れ始めるタイプ。
                  ダイラタント流動とは異なる。
                </p>
              </div>

              {/* 3. グリセリン */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">3. グリセリン</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  比較的粘度の高い単純な液体で，
                  <span className="font-bold">ニュートン流動</span> を示す。
                </p>
                <p className="text-xs text-gray-600">
                  せん断速度を変えても粘度はほぼ一定で，せん断増粘もしない。
                </p>
              </div>

              {/* 4. デンプン濃厚水性懸濁液 */}
              <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-sm">
                <h4 className="font-bold text-amber-800 mb-1">
                  4. デンプン濃厚水性懸濁液（正解）
                </h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  高濃度のデンプン粒子が水中に分散した系で，
                  <span className="font-bold text-amber-700">
                    代表的なダイラタント流動
                  </span>
                  を示す。
                </p>
                <p className="text-xs text-gray-600">
                  ゆっくり動かすと液体のように流れるが，急激に力を加えると
                  粒子同士が<strong>押し固められて「固まる」ように感じる</strong>。
                </p>
              </div>

              {/* 5. ヒマシ油 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-1">5. ヒマシ油</h4>
                <p className="text-sm md:text-base text-gray-800 mb-1">
                  粘度は高いが，基本的には
                  <span className="font-bold">ニュートン流動</span> に近い挙動を示す。
                </p>
                <p className="text-xs text-gray-600">
                  粘度は高い＝ドロドロだが，せん断速度に対する粘度変化は小さい。
                  ダイラタント流動ではない。
                </p>
              </div>
            </div>
          </div>
        );

      // -----------------------------------
      // 3. まとめ
      // -----------------------------------
      case 3:
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="bg-white p-6 rounded-2xl shadow-xl border border-amber-100"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <CheckCircle className="w-14 h-14 text-emerald-500" />
                <h2 className="text-2xl font-bold text-gray-800">
                  正解は「4. デンプン濃厚水性懸濁液」
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  ダイラタント流動は，
                  <span className="font-bold">
                    「せん断速度を上げると見かけ粘度が増加する（せん断増粘）」
                  </span>
                  挙動です。
                  高濃度のデンプン懸濁液のように，
                  <span className="font-bold">
                    強くかき混ぜると急に固くなる
                  </span>
                  系が代表例です。
                </p>
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm md:text-base text-gray-800 space-y-2">
                <p className="font-bold text-amber-800 mb-1">まとめポイント</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-bold">ニュートン流動</span>：
                    粘度一定（例：水，グリセリン，ヒマシ油）。
                  </li>
                  <li>
                    <span className="font-bold">準粘性流動（擬塑性）</span>：
                    降伏値なしで，かき混ぜるほどサラサラ（高分子 1% 水溶液など）。
                  </li>
                  <li>
                    <span className="font-bold">塑性流動</span>：
                    降伏値 S₀ を超えると流れ始める（チンク油など高濃度懸濁製剤）。
                  </li>
                  <li>
                    <span className="font-bold">準塑性流動</span>：
                    降伏値＋準粘性（降伏値を超えると流れ，さらに shear-thinning）。
                  </li>
                  <li>
                    <span className="font-bold text-amber-700">
                      ダイラタント流動
                    </span>
                    ：かき混ぜるほど固くなる（高濃度デンプン濃厚水性懸濁液）。
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold text-sm md:text-base hover:bg-black transition-colors inline-flex items-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  問題一覧に戻る
                </button>
              </div>
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
      {/* ヘッダー */}
      <div className="bg-amber-600 text-white p-4 flex items-center shadow-md justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 hover:bg-amber-500 p-2 rounded-full transition"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">第108回 問50：ステップ解説</h1>
        </div>
        <div className="text-sm bg-amber-700 px-3 py-1 rounded-full">
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

      {/* フッターナビゲーション */}
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
              : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md'
          }`}
        >
          {step === 0 ? '解説ステップへ' : '次へ'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default Q108_50;
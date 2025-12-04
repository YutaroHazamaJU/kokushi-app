// src/questions/index.js
import { Calculator, Activity, Beaker } from 'lucide-react';

// 問題種別ごとのカラースタイル（必須 / 理論）
const typeStyles = {
  required: 'bg-amber-50 border-amber-200 text-amber-900', // 必須問題（2桁番号）
  theory: 'bg-sky-50 border-sky-200 text-sky-800',         // 理論問題（3桁番号）
};

// 問題番号から必須／理論を判定（2桁＝必須、3桁＝理論）
const getQuestionType = (num) => (num < 100 ? 'required' : 'theory');

// 問題の「種類」（計算 / グラフ / 知識）ごとのアイコン
const iconByKind = {
  calc: Calculator,    // 計算問題
  graph: Activity,     // グラフ問題・レオロジーなど線グラフ系
  knowledge: Beaker,   // 知識問題・用語整理
};

import Q99_174 from './Q99_174';
import Q101_176 from './Q101_176';
import Q107_49 from './Q107_49';
import Q104_170 from './Q104_170';
import Q108_49 from './Q108_49';
import Q108_50 from './Q108_50';
import Q108_175 from './Q108_175';
import Q109_48 from './Q109_48';
import Q109_49 from './Q109_49';
import Q109_50 from './Q109_50';
import Q106_51 from './Q106_51';
import Q110_49 from './Q110_49';
import Q110_51 from './Q110_51';

// 今後ここに問題をどんどん追加していく想定
const questionListBase = [
  {
    id: '99-174',
    year: 99,
    num: 174,
    title: '第99回 問174',
    desc: '薬剤：弱酸性薬物の溶解度変化',
    field: '物理薬剤',
    tags: ['弱酸', '溶解度', 'pH', '薬剤'],
    icon: Calculator,
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    component: Q99_174,
    kind: 'calc',
  },
  {
    id: '101-176',
    year: 101,
    num: 176,
    title: '第101回 問176',
    desc: '薬剤：目標溶解度へのpH調整',
    field: '物理薬剤',
    tags: ['弱酸', '溶解度', 'ヘンダーソン', '薬剤'],
    icon: TestTube,
    color: 'bg-teal-50 border-teal-200 text-teal-700',
    component: Q101_176,
    kind: 'calc',
  },
  {
    id: '107-49',
    year: 107,
    num: 49,
    title: '第107回 問49',
    desc: '分散系：分散相と分散媒の組合せ',
    field: '物理薬剤',
    tags: ['分散系', 'コロイド', 'エマルション', 'サスペンション', 'エアゾール', 'フォーム', 'キセロゲル'],
    color: 'bg-orange-50 border-orange-200 text-orange-900',
    icon: Beaker,     // index.js 側で Beaker を import している前提
    component: Q107_49,
    kind: 'knowledge',
  },
  {
    id: '104-170',
    year: 104,
    num: 170,
    title: '第104回 問170',
    desc: '薬剤：分配平衡・pHプロファイル',
    field: '物理薬剤',
    tags: ['分配', 'pH', 'プロファイル', '薬剤'],
    icon: Activity,
    color: 'bg-white border-gray-200 text-gray-700',
    component: Q104_170,
    kind: 'graph',
  },
  {
    id: '106-51',
    year: 106,
    num: 51,
    title: '第106回 問51',
    desc: '薬剤：拡張ぬれと固液界面張力',
    field: '物理薬剤',
    tags: ['界面張力', '拡張ぬれ', '分散系', '物理薬剤'],
    icon: Activity,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    component: Q106_51,
    kind: 'knowledge',
  },
  {
    id: '108-49',
    year: 108,
    num: 49,
    title: '第108回 問49',
    desc: '薬剤：粉体の流動性と物性値',
    field: '物理薬剤',
    tags: ['粉体', '流動性', 'かさ密度', '安息角'],
    icon: Package,
    color: 'bg-amber-50 border-amber-200 text-amber-800',
    component: Q108_49,
    kind: 'knowledge',
  },
  {
    id: '108-50',
    year: 108,
    num: 50,
    title: '第108回 問50',
    desc: 'ダイラタント流動とレオロジーの基礎',
    field: '物理薬剤',
    tags: ['レオロジー', 'ダイラタント流動', '製剤学'],
    icon: Activity,
    color: 'bg-amber-50 border-amber-200 text-amber-800',
    component: Q108_50,
    kind: 'knowledge',
  },
  {
    id: '108-175',
    year: 108,
    num: 175,
    title: '第108回 問175',
    desc: '薬剤：弱電解質の溶解平衡',
    field: '物理薬剤',
    tags: ['弱酸', '溶解平衡', 'ヘンダーソン', '薬剤'],
    icon: Activity,
    color: 'bg-white border-gray-200 text-gray-700',
    component: Q108_175,
    kind: 'graph',
  },
  {
    id: '109-48',
    year: 109,
    num: 48,
    title: '第109回 問48',
    desc: '薬剤：Noyes-Whitney式',
    field: '物理薬剤',
    tags: ['溶出速度', 'Noyes-Whitney', '薬剤'],
    icon: RotateCw,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    component: Q109_48,
    kind: 'calc',
  },
  {
    id: '109-49',
    year: 109,
    num: 49,
    title: '第109回 問49',
    desc: '薬剤：液体の表面張力を測定する方法',
    field: '物理薬剤',
    tags: ['表面張力', '測定法', '薬剤'],
    icon: Thermometer,
    color: 'bg-orange-50 border-orange-200',
    component: Q109_49,
    kind: 'knowledge',
  },
  {
    id: '109-50',
    year: 109,
    num: 50,
    title: '第109回 問50',
    desc: '薬剤：安定性と反応速度論',
    field: '物理薬剤',
    tags: ['反応速度論', '安定性', '薬剤'],
    icon: Thermometer,
    color: 'bg-rose-50 border-rose-200 text-rose-700',
    component: Q109_50,
    kind: 'graph',
  },
  {
    id: '110-49',
    year: 110,
    num: 49,
    title: '第110回 問49',
    desc: '薬剤：陽イオン性界面活性剤',
    field: '物理薬剤',
    tags: ['界面活性剤', '陽イオン性', '陰イオン性', '非イオン性', '両性', '薬剤'],
    icon: Beaker,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    component: Q110_49,
    kind: 'knowledge',
  },
  {
    id: '110-51',
    year: 110,
    num: 51,
    title: '第110回 問51',
    desc: '薬剤：構造粘性とチキソトロピー',
    field: '物理薬剤',
    tags: ['構造粘性', 'チキソトロピー', 'レオロジー', '製剤学'],
    icon: Activity,
    color: 'bg-amber-50 border-amber-200 text-amber-800',
    component: Q110_51,
    kind: 'graph',
  },
];

export const questionList = [...questionListBase]
  .map((q) => ({
    ...q,
    // kind に応じてアイコンを自動付与（未指定なら既存 icon を使用）
    icon: iconByKind[q.kind] || q.icon || Beaker,
    // 問番号（2桁 / 3桁）に応じて必須 / 理論カラーを自動付与
    color: typeStyles[getQuestionType(q.num)],
  }))
  .sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.num - b.num;
  });
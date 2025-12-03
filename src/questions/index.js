// src/questions/index.js
import { Calculator, TestTube, Activity, RotateCw, Thermometer } from 'lucide-react';

import Q99_174 from './Q99_174';
import Q101_176 from './Q101_176';
import Q107_49 from './Q107_49';
import Q104_170 from './Q104_170';
import Q108_175 from './Q108_175';
import Q109_48 from './Q109_48';
import Q109_50 from './Q109_50';
import Q106_51 from './Q106_51';

// 今後ここに問題をどんどん追加していく想定
export const questionList = [
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
  },
];
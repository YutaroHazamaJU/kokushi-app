import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ChevronRight, ChevronLeft, Home, 
  Calculator, TestTube, Brain, CheckCircle, XCircle, 
  AlertTriangle, Menu, ArrowRight, Thermometer, RotateCw, Clock, Activity, Lightbulb, MousePointerClick, PenTool, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, SectionTitle, pageVariants } from './components/Layout';
import Q99_174 from './questions/Q99_174';
import Q101_176 from './questions/Q101_176';
import Q104_170 from './questions/Q104_170';
import Q108_175 from './questions/Q108_175';
import Q109_48 from './questions/Q109_48';
import Q109_50 from './questions/Q109_50';

// ==========================================
// メインメニュー
// ==========================================
const MenuScreen = ({ onSelect }) => {
  const questions = [
    { id: '99-174', title: '第99回 問174', desc: '薬剤：弱酸性薬物の溶解度変化', icon: Calculator, color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { id: '101-176', title: '第101回 問176', desc: '薬剤：目標溶解度へのpH調整', icon: TestTube, color: 'bg-teal-50 border-teal-200 text-teal-700' },
    { id: '104-170', title: '第104回 問170', desc: '薬剤：分配平衡・pHプロファイル', icon: Activity, color: 'bg-white border-gray-200 text-gray-700' },
    { id: '108-175', title: '第108回 問175', desc: '薬剤：弱電解質の溶解平衡', icon: Activity, color: 'bg-white border-gray-200 text-gray-700' },
    { id: '109-48',  title: '第109回 問48',  desc: '薬剤：Noyes-Whitney式', icon: RotateCw, color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { id: '109-50',  title: '第109回 問50',  desc: '薬剤：安定性と反応速度論', icon: Thermometer, color: 'bg-rose-50 border-rose-200 text-rose-700' },
  ];

  return (
    <motion.div 
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
      className="min-h-screen bg-gray-100 flex flex-col items-center p-6 font-sans"
    >
      <div className="max-w-4xl w-full">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">薬剤師国家試験 解説アプリ</h1>
          <p className="text-gray-500">物理化学・製剤学をシミュレーターで攻略</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q) => (
            <motion.button
              key={q.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(q.id)}
              className={`p-6 rounded-xl shadow-sm border-2 transition-all text-left group flex items-start ${q.color} hover:border-current`}
            >
              <q.icon className="w-8 h-8 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-1">{q.title}</h3>
                <p className="text-sm opacity-80">{q.desc}</p>
              </div>
              <ChevronRight className="ml-auto w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity self-center" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// アプリ本体
// ==========================================
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('menu');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <MenuScreen onSelect={setCurrentScreen} />;
      case '99-174':
        return <Q99_174 onBack={() => setCurrentScreen('menu')} />;
      case '101-176':
        return <Q101_176 onBack={() => setCurrentScreen('menu')} />;
      case '104-170':
        return <Q104_170 onBack={() => setCurrentScreen('menu')} />;
      case '108-175':
        return <Q108_175 onBack={() => setCurrentScreen('menu')} />;
      case '109-48':
        return <Q109_48 onBack={() => setCurrentScreen('menu')} />;
      case '109-50':
        return <Q109_50 onBack={() => setCurrentScreen('menu')} />;
      default: return <MenuScreen onSelect={setCurrentScreen} />;
    }
  };

  return (
    <div className="font-sans text-gray-800 overflow-hidden">
      <AnimatePresence mode="wait">
        <div key={currentScreen} className="h-full">
          {renderScreen()}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default App;
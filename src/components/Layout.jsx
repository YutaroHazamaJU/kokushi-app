// src/components/Layout.jsx
import { motion } from "framer-motion";

// ページ切り替え時のアニメーション
export const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

// 共通レイアウト：中身を縦スクロールさせるコンテナ
export const Slide = ({ children, className = "" }) => (
  <div
    className={
      "flex flex-col h-full overflow-y-auto p-4 md:p-8 lg:p-12 text-base md:text-lg " +
      className
    }
  >
    {children}
  </div>
);

// 共通タイトル見出し
export const SectionTitle = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 border-b-4 border-blue-200 pb-2">
    {children}
  </h2>
);
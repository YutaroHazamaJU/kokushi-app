// src/components/QuestionList.jsx
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from './Layout';
import { Search, Filter, X } from 'lucide-react';

const QuestionList = ({ questions, onSelect, initialIdFilter = '' }) => {
  // フィルタ用 state
  const [yearFilter, setYearFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [idFilter, setIdFilter] = useState(initialIdFilter);

  // 年度リスト（プルダウン用）
  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(questions.map((q) => q.year))).sort(
      (a, b) => b - a
    );
    return years;
  }, [questions]);

  // 分野リスト（プルダウン用）
  const fieldOptions = useMemo(() => {
    const fields = Array.from(new Set(questions.map((q) => q.field))).filter(
      Boolean
    );
    return fields;
  }, [questions]);

  // フィルタ適用
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // 年度フィルタ
      if (yearFilter !== 'all' && String(q.year) !== yearFilter) return false;

      // 分野フィルタ
      if (fieldFilter !== 'all' && q.field !== fieldFilter) return false;

      // ID群フィルタ（カンマ or 改行区切り）
      if (idFilter.trim() !== '') {
        const wanted = idFilter
          .split(/[\s,、]+/)
          .map((s) => s.trim())
          .filter(Boolean);

        if (wanted.length > 0 && !wanted.includes(q.id)) return false;
      }

      // キーワード検索（タイトル・説明・タグ・IDあたりをざっくり）
      if (keyword.trim() !== '') {
        const kw = keyword.trim().toLowerCase();
        const text =
          `${q.title} ${q.desc} ${q.field} ${q.id} ${(q.tags || []).join(' ')}`.toLowerCase();
        if (!text.includes(kw)) return false;
      }

      return true;
    });
  }, [questions, yearFilter, fieldFilter, keyword, idFilter]);

  const resetFilters = () => {
    setYearFilter('all');
    setFieldFilter('all');
    setKeyword('');
    setIdFilter('');
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="h-screen overflow-y-auto bg-gray-100 flex flex-col items-center p-6 font-sans"
    >
      <div className="max-w-5xl w-full">
        {/* ヘッダー */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            薬剤師国家試験 解説アプリ
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Developed by Yutaro Hazama
          </p>
        </header>

        {/* フィルタエリア */}
        <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <Filter className="w-4 h-4" />
            <span>フィルタ・検索</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* 年度フィルタ */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                年度フィルタ
              </label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm"
              >
                <option value="all">すべて</option>
                {yearOptions.map((y) => (
                  <option key={y} value={String(y)}>
                    第{y}回
                  </option>
                ))}
              </select>
            </div>

            {/* 分野フィルタ */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                分野フィルタ
              </label>
              <select
                value={fieldFilter}
                onChange={(e) => setFieldFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm"
              >
                <option value="all">すべて</option>
                {fieldOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* キーワード検索 */}
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">
                キーワード検索（タイトル・内容・タグ）
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="例：溶解度, Noyes, 反応速度 など"
                  className="w-full border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>

          {/* ID群フィルタ */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              ID群フィルタ（例：99-174, 101-176 などをカンマ・改行区切りで）
            </label>
            <textarea
              value={idFilter}
              onChange={(e) => setIdFilter(e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm resize-none"
              placeholder={`例：
99-174, 101-176
108-175`}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>
              該当件数：{filteredQuestions.length} / {questions.length}
            </span>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-full text-xs hover:bg-gray-50"
            >
              <X className="w-3 h-3" />
              すべてクリア
            </button>
          </div>
        </div>

        {/* カード一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuestions.map((q) => (
            <motion.button
              key={q.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(q.id)}
              className={`p-6 rounded-xl shadow-sm border-2 transition-all text-left group flex items-start ${q.color} hover:border-current`}
            >
              {q.icon && (
                <q.icon className="w-8 h-8 mr-4 flex-shrink-0 mt-1" />
              )}
              <div>
                <h3 className="text-xl font-bold mb-1">{q.title}</h3>
                <p className="text-sm opacity-80 mb-1">{q.desc}</p>
                <p className="text-xs text-gray-600">
                  第{q.year}回 / 問{q.num} / 分野: {q.field}
                </p>
              </div>
            </motion.button>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center text-gray-400 text-sm py-8">
              条件に合う問題がありません。フィルタ条件を見直してください。
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionList;
import React, { useState } from 'react';

const QuestionList = ({ questions, onSelect, initialIdFilter }) => {
  const [filter, setFilter] = useState(initialIdFilter);

  const filteredQuestions = questions.filter((q) =>
    filter
      ? filter
          .split(',')
          .map((id) => id.trim())
          .includes(q.id.toString())
      : true
  );

  return (
    <div>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold">問題一覧</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Created by Yutaro Hazama
        </p>
      </header>
      {/* Other parts of the component */}
    </div>
  );
};

export default QuestionList;
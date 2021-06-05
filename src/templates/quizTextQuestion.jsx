import { Link } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/layout';

const Option = ({ index, label, onClick }) => {
  return (
    <button className='text-left border-2 p-1 mb-1' onClick={onClick}>
      <div className='border-2 w-7 inline-flex items-center justify-center mr-2'>
        {index}
      </div>
      {label}
    </button>
  );
};

const QuizTextQuestion = ({ pageContext: { question, nextPath } }) => {
  const [isAnswered, setAnswered] = useState(false);
  const [isCorrect, setCorrect] = useState(false);

  const handleClick = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);
  };
  console.log(nextPath);

  return (
    <div className='container mx-auto px-4 pt-10 flex items-center content-center h-full'>
      {!isAnswered ? (
        <div>
          <div className='text-l mb-4'>
            <span className='text-yellow-400 font-bold'>{question.order}</span>
            {' - '}
            {question.text}
          </div>
          <div className='flex flex-col'>
            {question.options.map((el, i) => (
              <Option
                key={i}
                index={i * 1 + 1}
                label={el.label}
                onClick={() => handleClick(el.isCorrect)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className='text-xl mb-5 font-light'>
            {isCorrect ? 'Risposta Corretta!' : 'Risposta sbagliata..'}
          </div>
          <Link to={nextPath ? nextPath : '/'}>
            <button className='text-sm font-light bg-gray-900 text-gray-50 rounded-xl px-4 py-2'>
              {nextPath ? 'Prossima domanda!' : 'Torna alla home'}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizTextQuestion;

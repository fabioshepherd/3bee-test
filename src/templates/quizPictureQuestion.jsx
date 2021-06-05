import { Link } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/layout';

const PictureOption = ({ index, label, img, onClick }) => {
  return (
    <button
      className='text-left border-2 p-1 mb-1 bg-center bg-cover bg-no-repeat w-full h-40 md:h-60 md:w-1/3'
      style={{ backgroundImage: `url("${img}")` }}
      onClick={onClick}>
      <div className='border-2 w-7 inline-flex items-center justify-center mr-2 bg-gray-50 opacity-60'>
        {index}
      </div>
    </button>
  );
};

const QuizPictureQuestion = ({ pageContext: { question, nextPath } }) => {
  const [isAnswered, setAnswered] = useState(false);
  const [isCorrect, setCorrect] = useState(false);

  const handleClick = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);
  };
  console.log(nextPath);

  return (
    <div className='container mx-auto px-4 pt-10 flex items-center content-center h-full w-full'>
      {!isAnswered ? (
        <div className='w-full'>
          <div className='text-l mb-4'>
            <span className='text-yellow-400 font-bold'>{question.order}</span>
            {' - '}
            {question.text}
          </div>
          <div className='flex flex-wrap'>
            {question.options.map((el, i) => (
              <PictureOption
                index={i * 1 + 1}
                label={el.label}
                img={el.img}
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

export default QuizPictureQuestion;

import React, { useEffect, useState } from 'react';
import './loader.css';

const quotes = [
  'Я не сумасшедший, у меня просто очень высокий уровень гениальности, который вы, ограниченные умы, воспринимаете как безумие.',
  'Никогда не недооценивай силу безудержного идиотизма.',
  'Когда ты путешествуешь по мультивселенной, ты понимаешь, что жизнь — это просто игра.',
  'Я не герой, я просто делаю то, что должен, чтобы выжить.',
  'Иногда, чтобы спасти мир, нужно просто быть готовым к тому, что тебя назовут придурком.',
];

const Loader = () => {
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <div className="loader-part-content">
        <span className="spinner" />
        <q className="quote">{currentQuote}</q>
      </div>
    </div>
  );
};

export default Loader;

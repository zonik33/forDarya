import { useState, useEffect } from 'react';
import Screen from '../ui/Screen';

// уровни фраз
const levels = [
    {
        language: 'ru',
        words: ['тебя', 'очень', 'я', 'люблю'],
        correct: ['я', 'очень', 'тебя', 'люблю'],
        label: 'Начнем с простого, собери фразу :) 💌',
    },
    {
        language: 'en',
        words: ['I', 'love', 'you', 'so', 'much'],
        correct: ['I', 'love', 'you', 'so', 'much'],
        label: 'Oh, hello, soberi frazu, please 💌 ',
    },
    {
        language: 'jp',
        words: ['私は', 'あなたが', 'とても', '大好きです'],
        correct: ['私は', 'あなたが', 'とても', '大好きです'],
        label: 'Гагагагага 💌 (Японский)',
    },
];

// функция для перемешивания массива
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function BuildPhraseMulti({ onNext }) {
    const [level, setLevel] = useState(0);
    const [selected, setSelected] = useState([]);
    const [shuffled, setShuffled] = useState([]);

    const current = levels[level];

    useEffect(() => {
        setShuffled(shuffleArray(current.words));
        setSelected([]);
    }, [level]);

    const click = word => {
        const next = [...selected, word];
        setSelected(next);

        // проверка частичной последовательности
        for (let i = 0; i < next.length; i++) {
            if (next[i] !== current.correct[i]) {
                // неправильный порядок → возвращаем слова
                setTimeout(() => setSelected([]), 500);
                return;
            }
        }

        // если фраза собрана правильно → следующий уровень или финал
        if (next.length === current.correct.length) {
            if (level < levels.length - 1) {
                setTimeout(() => setLevel(level + 1), 800);
            } else {
                setTimeout(onNext, 800);
            }
        }
    };

    return (
        <Screen>
            <h2>{current.label}</h2>

            <div style={{ marginBottom: 20 }}>
                {selected.map((w, idx) => (
                    <span
                        key={idx}
                        style={{
                            marginRight: 8,
                            fontSize: '1.3em',
                            display: 'inline-block',
                            transform: 'scale(1)',
                            animation: 'pop 0.2s ease',
                        }}
                    >
            {w}
          </span>
                ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                {shuffled.map((w, idx) => (
                    <button
                        key={idx}
                        className="btn"
                        onClick={() => click(w)}
                        style={{ transition: 'transform 0.2s ease' }}
                    >
                        {w}
                    </button>
                ))}
            </div>

            {/* прогресс-бар */}
            <div style={{ marginTop: 20, height: 8, width: '80%', background: '#eee', borderRadius: 4, marginLeft: 'auto', marginRight: 'auto' }}>
                <div
                    style={{
                        width: `${((level + (selected.length / current.correct.length)) / levels.length) * 100}%`,
                        height: '100%',
                        background: '#ff758c',
                        borderRadius: 4,
                        transition: 'width 0.3s ease',
                    }}
                />
            </div>

            <style>
                {`
          @keyframes pop {
            0% { transform: scale(0.6); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
            </style>
        </Screen>
    );
}
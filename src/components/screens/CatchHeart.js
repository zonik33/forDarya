import { useState, useEffect } from 'react';
import Screen from '../ui/Screen';

const levels = [
    { total: 5, speed: 1500 },
    { total: 7, speed: 1000 },
    { total: 5, speed: 600 },
    { total: 1, speed: 1, impossible: true }, // финальный бешеный уровень
];

export default function CatchHeart({ onNext }) {
    const [level, setLevel] = useState(0);
    const [count, setCount] = useState(0);
    const [pos, setPos] = useState(randomPos());
    const [blocked, setBlocked] = useState(false);
    const [message, setMessage] = useState('');
    const [showFinalButton, setShowFinalButton] = useState(false);

    const currentLevel = levels[level];

    // Движение сердечка на всех уровнях
    useEffect(() => {
        if (!currentLevel) {
            onNext();
            return;
        }

        const interval = setInterval(() => {
            // обычные уровни двигаются, финальный уровень тоже
            if (!blocked || currentLevel.impossible) setPos(randomPos());
        }, currentLevel.speed);

        let timeout;
        if (currentLevel.impossible) {
            // финальный уровень-шутка
            setBlocked(true);
            timeout = setTimeout(() => {
                setMessage('Ладно, это шутка 😏');
                setShowFinalButton(true);
            }, 4000);
        }

        return () => {
            clearInterval(interval);
            if (timeout) clearTimeout(timeout);
        };
    }, [level, blocked]);

    const click = () => {
        if (blocked) return;
        if (!currentLevel) return;
        if (currentLevel.impossible) return;

        const c = count + 1;
        setCount(c);
        setPos(randomPos());

        if (c >= currentLevel.total) {
            setBlocked(true);
            setTimeout(() => {
                if (level < levels.length - 1) {
                    setLevel(level + 1);
                    setCount(0);
                    setBlocked(false);
                    setPos(randomPos());
                    setMessage('');
                    setShowFinalButton(false);
                } else {
                    onNext();
                }
            }, 500);
        }
    };

    const goToFinal = () => {
        onNext();
    };

    if (!currentLevel) return null;

    return (
        <Screen>
            <h2>Маладец! Уже близко</h2>
            <h2>Тут тебе надо поймать сердчеко 💗</h2>

            {currentLevel.impossible ? (
                <>

                </>
            ) : (
                <>
                    <p>Уровень {level + 1} / {levels.length}</p>
                    <p>{count} / {currentLevel.total}</p>
                </>
            )}

            <div className="catch">
                <div
                    className="heart"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        cursor: blocked ? 'not-allowed' : 'pointer',
                    }}
                    onClick={click}
                >
                    ❤️
                </div>
            </div>

            {message && (
                <p style={{ marginTop: 20, fontSize: '1.2em', color: '#ff4081' }}>
                    {message}
                </p>
            )}

            {showFinalButton && (
                <button
                    className="btn"
                    style={{ marginTop: 20 }}
                    onClick={goToFinal}
                >
                    Финал 🎉
                </button>
            )}
        </Screen>
    );
}

function randomPos() {
    return {
        top: Math.random() * 75 + '%',
        left: Math.random() * 75 + '%',
    };
}
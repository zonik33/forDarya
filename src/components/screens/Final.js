import { useEffect, useState, useRef } from 'react';
import Screen from '../ui/Screen';

const messages = [
    'Я люблю тебя больше, чем ты думаешь 💫',
    'Ты делаешь мой мир лучше 🌍',
    'Даже в самые обычные дни ✨',
    'Ладно… тыкать можно бесконечно 😏',
    'Но это уже секрет 🤫',
    'Ты — мой самый любимый человек ❤️',
];

const finalMessage = 'С 8 марта :) ';

export default function Final() {
    const [show, setShow] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [activated, setActivated] = useState(false);
    const [index, setIndex] = useState(0);
    const [text, setText] = useState('');
    const [finished, setFinished] = useState(false);

    const typingRef = useRef(null);


    useEffect(() => {
        const t = setTimeout(() => setShow(true), 3000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!activated || finished) return;
        typeMessage(messages[index]);
    }, [index, activated]);

    const typeMessage = (message) => {
        clearInterval(typingRef.current);
        let i = 0;

        typingRef.current = setInterval(() => {
            setText(message.slice(0, i + 1));
            i++;

            if (i === message.length) {
                clearInterval(typingRef.current);
            }
        }, 40);
    };


    const eraseAndNext = () => {
        clearInterval(typingRef.current);
        let i = text.length;

        typingRef.current = setInterval(() => {
            setText(prev => prev.slice(0, -1));
            i--;

            if (i <= 0) {
                clearInterval(typingRef.current);

                if (index < messages.length - 1) {
                    setIndex(prev => prev + 1);
                } else {
                    showFinal();
                }
            }
        }, 20);
    };

    const showFinal = () => {
        setFinished(true);
        setText('');
        setShowVideo(false);

        let i = 0;
        clearInterval(typingRef.current);

        typingRef.current = setInterval(() => {
            setText(prev => {
                const next = prev + finalMessage[i];
                i++;

                if (i >= finalMessage.length) {
                    clearInterval(typingRef.current);

                    // небольшая пауза и показываем видео
                    setTimeout(() => {
                        setShowVideo(true);
                    }, 600);
                }

                return next;
            });
        }, 50);
    };

    return (
        <Screen>
            {!show ? (
                <>
                    <h2>Ты почти у цели 💝</h2>
                    <p>Прислушайся к сердцу…</p>
                </>
            ) : (
                <>
                    <h1>Подарок ждёт тебя 🎁</h1>


                    {!finished && (
                        <>
                            <h1
                                className={`heart-hint ${activated ? 'active' : ''}`}
                                onClick={() => {
                                    if (!activated) {
                                        setActivated(true);
                                        setText('');
                                        return;
                                    }
                                    eraseAndNext();
                                }}
                            >
                                💖
                            </h1>

                            {!activated && (
                                <p style={{ opacity: 0.8, marginTop: 10 }}>
                                </p>
                            )}
                        </>
                    )}

                    <p
                        style={{
                            marginTop: 24,
                            fontSize: '1.2em',
                            minHeight: 60,
                            transition: 'opacity 0.3s',
                        }}
                    >
                        {text}
                    </p>

                    {finished && (
                        <>
                            <div  className="final-video" style={{ fontSize: '48px', marginTop: 20 }}>
                                {showVideo && (
                                    <div
                                        style={{
                                            marginTop: 30,
                                            width: '100%',
                                            maxWidth: 720,
                                            borderRadius: 20,
                                            overflow: 'hidden',
                                            boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                                        }}
                                    >
                                        <video
                                            src="/videos/final.mp4"
                                            controls
                                            playsInline
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block',
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn"
                                style={{ marginTop: 30 }}
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}
                            >
                                Вернуться в начало
                            </button>
                        </>
                    )}
                </>
            )}
        </Screen>
    );
}
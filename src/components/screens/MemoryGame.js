import { useEffect, useState } from 'react';
import Screen from '../ui/Screen';

// 8 пар = 16 карточек
const cardsData = Array.from({ length: 10 }, (_, i) => ([
    { id: i * 2 + 1, img: `/images/${i + 1}.jpg` },
    { id: i * 2 + 2, img: `/images/${i + 1}.jpg` },
])).flat();

export default function MemoryGame({ onNext }) {
    const [cards, setCards] = useState([]);
    const [opened, setOpened] = useState([]);
    const [matched, setMatched] = useState([]);
    const [errors, setErrors] = useState(0);
    const [time, setTime] = useState(0);

    // перемешиваем карты
    useEffect(() => {
        setCards(cardsData.sort(() => Math.random() - 0.5));
    }, []);

    // таймер
    useEffect(() => {
        const timer = setInterval(() => setTime(t => t + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    // проверка открытых карточек
    useEffect(() => {
        if (opened.length === 2) {
            const [a, b] = opened;
            if (a.img === b.img) {
                setMatched(prev => [...prev, a.img]);
            } else {
                setErrors(prev => prev + 1);
            }
            setTimeout(() => setOpened([]), 800);
        }
    }, [opened]);

    // проверка конца игры
    useEffect(() => {
        if (matched.length === cardsData.length / 2) {
            setTimeout(onNext, 1000);
        }
    }, [matched, onNext]);

    const click = card => {
        if (
            opened.length === 2 ||
            opened.includes(card) ||
            matched.includes(card.img)
        ) return;
        setOpened(prev => [...prev, card]);
    };

    return (
        <Screen>
            <h2>Молодец, полиглог!💕</h2>
            <h3>Теперь тебе предстоит найти пары 💕</h3>
            <p>Кол-во ошибок: {errors} | Время: {time}s</p>

            <div className="memory-grid">
                {cards.map(card => {
                    const open = opened.includes(card) || matched.includes(card.img);
                    return (
                        <div
                            key={card.id}
                            className={`card ${open ? 'open' : ''}`}
                            onClick={() => click(card)}
                        >
                            {open ? <img src={card.img} alt="" /> : '💗'}
                        </div>
                    );
                })}
            </div>
        </Screen>
    );
}
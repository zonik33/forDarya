import Screen from '../ui/Screen';

export default function Intro({ onNext }) {
    return (
        <Screen>
            <h1>Привет, Дашка! 💖</h1>
            <p>
                Пройди этот путь и узнай<br />
                 что там в конце ✨
            </p>
            <button className="btn" onClick={onNext}>
                Начать
            </button>
        </Screen>
    );
}
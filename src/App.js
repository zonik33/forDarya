import { useState } from 'react';
import Intro from './components/screens/Intro';
import MemoryGame from './components/screens/MemoryGame';
import Riddle from './components/screens/Riddle';
import CatchHeart from './components/screens/CatchHeart';
import Final from './components/screens/Final';
import BuildPhrase from "./components/screens/BuildPhrase";
import useMusic from './hooks/useMusic';
import MusicControl from './components/ui/MusicControl';
import ConfirmPopup from './components/ui/ConfirmPopup';
import './App.css';

export default function App() {
    const music = useMusic();
    const [step, setStep] = useState(Number(localStorage.getItem('step')) || 0);

    const [popup, setPopup] = useState(null); // { message, onConfirm }

    const steps = [
        <Intro onNext={nextStep} />,
        <BuildPhrase onNext={nextStep} />,
        <MemoryGame onNext={nextStep} />,
        <Riddle onNext={nextStep} />,
        <CatchHeart onNext={nextStep} />,
        <Final />
    ];

    function nextStep() {
        setStep(prev => {
            const newStep = prev + 1;
            localStorage.setItem('step', newStep);
            return newStep;
        });
    }

    function prevStep() {
        setPopup({
            message: 'Ты уверена, что хочешь вернуться назад?',
            onConfirm: () => {
                setStep(prev => {
                    const newStep = Math.max(prev - 1, 0);
                    localStorage.setItem('step', newStep);
                    return newStep;
                });
                setPopup(null);
            }
        });
    }

    function skipStep() {
        setPopup({
            message: 'Ты уверена, что хочешь пропустить этот шаг?',
            onConfirm: () => {
                nextStep();
                setPopup(null);
            }
        });
    }

    return (
        <div className="app">

            {/* Видео на заднем фоне */}
            <video className="background-video" autoPlay loop muted playsInline>
                <source src="/videos/background.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео
            </video>

            {/* Музыка */}
            <MusicControl {...music} />

            {/* Лепестки */}
            <div className="petals">
                {[...Array(15)].map((_, i) => (
                    <span key={i} className="petal" />
                ))}
            </div>

            {/* кнопка назад */}
            {step > 0 && step < steps.length && (
                <button
                    className="btn back-btn"
                    onClick={prevStep}
                    style={{ position: 'fixed', top: 0, left: 20, zIndex: 10 }}
                >
                    ← <span>Назад</span>
                </button>
            )}

            {/* кнопка вперёд / пропустить */}
            {step < steps.length - 1 && (
                <button
                    className="btn skip-btn"
                    onClick={skipStep}
                    style={{ position: 'fixed', top: 0, right: 20, zIndex: 10 }}
                >
                    → <span>Вперёд</span>
                </button>
            )}

            {/* Текущий экран */}
            {steps[step]}

            {/* Попап */}
            {popup && <ConfirmPopup
                message={popup.message}
                onConfirm={popup.onConfirm}
                onCancel={() => setPopup(null)}
            />}
        </div>
    );
}
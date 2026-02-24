import { useEffect, useRef, useState } from 'react';

export default function useMusic() {
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.25);
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        audioRef.current = new Audio('/music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = volume;

        const start = () => {
            if (enabled) audioRef.current.play().catch(() => {});
            window.removeEventListener('click', start);
        };

        window.addEventListener('click', start);
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = volume;

        if (enabled) {
            audioRef.current.play().catch(() => {});
        } else {
            audioRef.current.pause();
        }
    }, [volume, enabled]);

    return { volume, setVolume, enabled, setEnabled };
}
export default function MusicControl({ volume, setVolume, enabled, setEnabled }) {
    return (
        <div className="music-control">
            <button
                className="music-btn"
                onClick={() => setEnabled(e => !e)}
            >
                {enabled ? '🔊' : '🔇'}
            </button>

            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
            />
        </div>
    );
}
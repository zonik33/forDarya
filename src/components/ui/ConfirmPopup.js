// components/ui/ConfirmPopup.jsx
export default function ConfirmPopup({ message, onConfirm, onCancel }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
        }}>
            <div style={{
                background: 'white',
                padding: '20px 30px',
                borderRadius: '20px',
                textAlign: 'center',
                maxWidth: '90%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                fontSize: '1rem',
            }}>
                <p style={{ marginBottom: 20 }}>{message}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                    <button
                        className="btn"
                        onClick={onConfirm}
                    >Да</button>
                    <button
                        className="btn"
                        onClick={onCancel}
                        style={{ background: '#aaa' }}
                    >Отмена</button>
                </div>
            </div>
        </div>
    )
}
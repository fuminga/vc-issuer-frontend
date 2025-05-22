import { useState } from 'react'
import * as QRCode from 'qrcode'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', did: '' })
  const [vc, setVC] = useState('')
  const [qr, setQR] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:4000/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json()
    console.log('🧾 VC URL received from backend:', data.vc);
    setVC(data.vc)
    const qrData = await QRCode.toDataURL(data.vc)
    setQR(qrData)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧾 VC 発行フォーム</h2>
      <input name="name" placeholder="名前" onChange={handleChange} />
      <input name="did" placeholder="受取人のDID" onChange={handleChange} />
      <button onClick={handleSubmit}>発行</button>

      {vc && (
        <>
          <h3>✅ 発行されたVC</h3>
          <pre>{vc}</pre>
          <h3>📱 QRコード</h3>
          <img src={qr} alt="VC QR" />
        </>
      )}
    </div>
  )
}
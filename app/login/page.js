'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setMessage('प्रक्रिया सुरू आहे...')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage('त्रुटी: ' + error.message)
      else setMessage('खाते तयार झाले! कृपया ईमेल व्हेरिफाय करा.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage('त्रुटी: ' + error.message)
      else setMessage('लॉगिन यशस्वी झाले!')
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '400px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>{isSignUp ? 'संशोधक साईनअप' : 'संशोधक लॉगिन'}</h2>
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="email" 
          placeholder="तुमचा ईमेल" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '0.5rem' }}
        />
        <input 
          type="password" 
          placeholder="पासवर्ड" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>
          {isSignUp ? 'साईनअप करा' : 'लॉगिन करा'}
        </button>
      </form>
      
      {message && <p style={{ marginTop: '1rem', color: 'blue' }}>{message}</p>}

      <button 
        onClick={() => setIsSignUp(!isSignUp)} 
        style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'gray', cursor: 'pointer' }}
      >
        {isSignUp ? 'आधीच खाते आहे? लॉगिन करा' : 'नवीन आहात? खाते तयार करा'}
      </button>
    </main>
  )
}


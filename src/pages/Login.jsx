import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const initialState = { email: '', password: '' }

export default function Login() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const nextErrors = {}
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Please enter a valid email.'
    if (!form.password) nextErrors.password = 'Password is required.'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const result = login(form)
    if (!result.success) {
      setErrors({ general: result.message })
      return
    }

    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign In</h1>
        <p className="auth-subtitle">Welcome back to StreamFlix.</p>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Email</span>
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            {errors.email ? <small>{errors.email}</small> : null}
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            {errors.password ? <small>{errors.password}</small> : null}
          </label>
          {errors.general ? <p className="form-error">{errors.general}</p> : null}
          <button type="submit" className="primary-btn">Sign In</button>
          <button type="button" className="secondary-btn secondary-btn--full">Continue with Google</button>
          <button type="button" className="text-btn">Forgot Password</button>
        </form>
        <p className="auth-switch">
          New to StreamFlix? <Link to="/signup">Sign up now.</Link>
        </p>
      </div>
    </div>
  )
}

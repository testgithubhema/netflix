import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const initialState = { name: '', email: '', password: '', confirmPassword: '' }

export default function Signup() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const { signup } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Full name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.password) nextErrors.password = 'Password is required.'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const result = signup({ name: form.name, email: form.email, password: form.password })
    if (!result.success) {
      setErrors({ general: result.message })
      return
    }

    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="auth-subtitle">Start your StreamFlix membership.</p>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Full Name</span>
            <input type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            {errors.name ? <small>{errors.name}</small> : null}
          </label>
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
          <label>
            <span>Confirm Password</span>
            <input type="password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} />
            {errors.confirmPassword ? <small>{errors.confirmPassword}</small> : null}
          </label>
          {errors.general ? <p className="form-error">{errors.general}</p> : null}
          <button type="submit" className="primary-btn">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in.</Link>
        </p>
      </div>
    </div>
  )
}

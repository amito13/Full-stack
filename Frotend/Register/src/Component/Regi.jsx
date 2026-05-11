import React from 'react'
import { useState } from 'react'
import './Regi.css'

const Regi = () => {
   console.log("Registration");
     const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        
        const email = e.target.email.value.trim().toLowerCase();
        if (!email) {
            setError('Email is required');
            return;
        }
        
        const name = e.target.name.value.trim().toLowerCase();
        if (!name) {
            setError('Name is required');
            return;
        }
        
        if (name.length < 3) {
            setError('Name must be at least 3 characters long');
            return;
        }
        
        const password = e.target.password.value;
        if (!password) {
            setError('Password is required');
            return;
        }
        
        try {
            setLoading(true);
            const response = await fetch(import.meta.env.VITE_REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, name, password})
            });
            console.log(response);
            setSuccess(true);
            setLoading(false);
        } catch(err) {
            setError('Failed to register. Please try again later.');
            console.log("error while registering", err);
            setLoading(false);
        }
    }
    
  return (
    <section className="auth-shell">
      <div className="auth-card auth-card--register">
        <div className="auth-brand">
          <h1 className="auth-title">✨ Create Account</h1>
          <p className="auth-subtitle">Join us today and get started</p>
        </div>
        
        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully.</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className={`auth-field ${focusedField === 'email' ? 'focused' : ''}`}>
              <label htmlFor="email">📧 Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="email@example.com"
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className={`auth-field ${focusedField === 'name' ? 'focused' : ''}`}>
              <label htmlFor="name">👤 Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your name" 
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className={`auth-field ${focusedField === 'password' ? 'focused' : ''}`}>
              <label htmlFor="password">🔐 Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••"
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {error && (
              <div className="error-alert">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <button 
              className="auth-button auth-button--primary" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Registering...
                </>
              ) : (
                '🚀 Register'
              )}
            </button>

            <p className="auth-footer">
              Already have an account? <a href="#login">Sign in</a>
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

export default Regi

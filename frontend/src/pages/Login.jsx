import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, pass);
    }

    return (
        <div>
            <form className='login' onSubmit={handleSubmit}>
                <h3>Login</h3>

                <label>Email:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                />
                <button disabled={isLoading}>Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login

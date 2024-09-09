import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useContext(AuthContext)

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={() => logout()}>Log out</button>
                        </div>
                    )}

                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
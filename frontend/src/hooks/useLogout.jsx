import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { WorkoutsContext } from "../context/WorkoutContext"

export const useLogout = () => {
    const { dispatch } = useContext(AuthContext)
    const { dispatch: workoutsDispatch } = useContext(WorkoutsContext)

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: "LOGOUT" })
        workoutsDispatch({ type: "SET_WORKOUTS", payload: null })
        console.log('user logged out');
    }

    return { logout }
}
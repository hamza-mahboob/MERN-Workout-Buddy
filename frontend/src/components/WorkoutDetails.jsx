import React, { useContext } from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'
import formateDistanceToNow from 'date-fns/formatDistanceToNow'
import { AuthContext } from '../context/AuthContext'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useContext(WorkoutsContext)
    const { user } = useContext(AuthContext)

    const handleDelete = async () => {
        if (!user)
            return

        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formateDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className='material-icons' onClick={handleDelete}>delete</span>
        </div>
    )
}

export default WorkoutDetails

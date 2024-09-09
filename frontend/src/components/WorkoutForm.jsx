import React, { useContext, useState } from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'
import { AuthContext } from '../context/AuthContext'

const WorkoutForm = () => {
    const { dispatch } = useContext(WorkoutsContext)
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [fields, setFields] = useState([])
    const { user } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError("You must be logged in")
            return
        }

        const workout = { title, load, reps }

        const response = await fetch('http://localhost:4000/api/workouts/', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        // console.log(json);

        if (!response.ok) {
            console.log(json.err);
            setError(json.err)
            setFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setLoad(0)
            setReps(0)
            setError(null)
            setFields([])
            dispatch({ type: "CREATE_WORKOUT", payload: json })
            console.log("Workout added");
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Excersize: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={fields?.includes('title') ? 'error' : ''}
            />

            <label>Load: </label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={fields?.includes('load') ? 'error' : ''}
            />

            <label>Reps: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={fields?.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm

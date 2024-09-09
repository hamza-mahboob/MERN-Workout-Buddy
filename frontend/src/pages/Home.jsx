import React, { useContext, useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { WorkoutsContext } from '../context/WorkoutContext'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
    // const [workouts, setWorkouts] = useState(null)
    const { workouts, dispatch } = useContext(WorkoutsContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("http://localhost:4000/api/workouts/", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_WORKOUTS", payload: json })
            }
            // console.log('context workouts', workouts);
        }
        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])

    return (
        <div className='home'>
            <div className='workouts'>
                {workouts?.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home


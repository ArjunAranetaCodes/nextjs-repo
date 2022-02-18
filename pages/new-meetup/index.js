import { useRouter } from 'next/router'
import NewMeetForm from '../../components/meetups/NewMeetupForm'

function NewMeetupPage() {
    const router = useRouter();
    async function addMeetUpHandler(enteredMeetupData) {
        const res = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type':'application/json'
            }
        })

        const data = await res.json()
        console.log(data)

        router.replace('/')
    }
    return <NewMeetForm onAddMeetup={addMeetUpHandler}/>
}


export default NewMeetupPage;
import { Fragment } from "react/cjs/react.production.min";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetailsPage(props) {
  return (
    <MeetupDetails
      title={props.meetupdata.title}
      image= {props.meetupdata.image}
      address={props.meetupdata.address}
      description={props.meetupdata.description}
    ></MeetupDetails>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://arjunaraneta:2DQH92uX7hsEjakL@cluster0.v16z0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://arjunaraneta:2DQH92uX7hsEjakL@cluster0.v16z0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  
  const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})

  client.close();

  return {
    props: {
      meetupdata: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          address: selectedMeetup.address,
          image: selectedMeetup.image,
          description: selectedMeetup.description,
      },
    },
    revalidate: 10,
  };
}

export default MeetupDetailsPage;

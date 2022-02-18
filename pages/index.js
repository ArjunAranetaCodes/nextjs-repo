import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://i.picsum.photos/id/80/500/500.jpg?hmac=tEpOED_FcKMSuTddr1p-AcxhrhrX0hqGDrEB2YyLRkc",
    address: "Some Address",
    description: "Meetup Meetup!",
  },

  {
    id: "m2",
    title: "A First Meetup",
    image:
      "https://i.picsum.photos/id/80/500/500.jpg?hmac=tEpOED_FcKMSuTddr1p-AcxhrhrX0hqGDrEB2YyLRkc",
    address: "Some Address",
    description: "Meetup Meetup!",
  },

  {
    id: "m3",
    title: "A First Meetup",
    image:
      "https://i.picsum.photos/id/80/500/500.jpg?hmac=tEpOED_FcKMSuTddr1p-AcxhrhrX0hqGDrEB2YyLRkc",
    address: "Some Address",
    description: "Meetup Meetup!",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://arjunaraneta:2DQH92uX7hsEjakL@cluster0.v16z0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString()
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;

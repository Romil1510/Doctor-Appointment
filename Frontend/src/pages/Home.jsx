import Biography from "../components/Biography"
import Departments from "../components/Departments"
import Hero from "../components/Hero"
import MessageForm from "../components/MessageForm"
const Home = () => {
  return (
    <>
      <Hero
        title={
          "Book Appointments with Trusted Doctors in Seconds"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"}/>
      <Departments/>
      <MessageForm/>
    </>
  )
}

export default Home;

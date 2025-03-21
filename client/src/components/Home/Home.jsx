import Hero from '../Hero'
import Mentor from '../Mentor/Mentor'
import Feature from '../Feature/Feature'
import Testimonial from '../Testimonial'
import FAQ from '../FAQ/FAQ'
import Newsletter from '../Newsletter/Newsletter'
import AddpopUp from '../AddpopUP/Addpop'



export default function Home() {
  return (
    <div>
      <Hero />
      <AddpopUp />
      <Feature />
      <Mentor />
      <Newsletter />
      {/* <Helpsection /> */}
      <Testimonial />
      <FAQ />
    </div>
  );
}
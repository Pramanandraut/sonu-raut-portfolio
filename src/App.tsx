import { useReveal } from './hooks'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Education, Achievements, Projects, Skills, Platforms } from './components/Sections'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <div className="orbs" aria-hidden="true"><i className="orb o1" /><i className="orb o2" /><i className="orb o3" /></div>
      <Navbar />
      <main><Hero /><About /><Education /><Achievements /><Projects /><Skills /><Contact /><Platforms /></main>
      <Footer />
    </>
  )
}

import Hero from './Hero'
import About from './About'
import Demos from './Demos'
import Projects from './Projects'

import { useEffect, useState } from 'react'

function App() {
  const [hideRest, setHeroLoaded] = useState<string>('hidden')

  useEffect(() => {
    setTimeout(() => setHeroLoaded(''), 4000)
  })

  return <>
    <Hero />
    <div className={hideRest}>
      <About />
      <Demos />
      <Projects />
    </div>

  </>
}

export default App

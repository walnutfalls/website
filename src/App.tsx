import Hero from './Hero'
import About from './About'
import Demos from './Demos'
import Projects from './Projects'


import { useRef, useState } from 'react'
import { useAppContext } from './AppContext'


function App() {
  const [showRest, setShowRest] = useState<boolean>(false)

  const rootRef = useRef<HTMLDivElement>(null)

  const { scrollEnabled } = useAppContext()

  return <div ref={rootRef} className='snap-y h-screen w-screen snap-mandatory overflow-y-scroll'>
    <Hero onLoaded={() => setShowRest(true)} />
    {showRest &&
      <>
        <About rootRef={rootRef} />

        {scrollEnabled ? <>
          <Demos />
          <Projects />
        </> : null}
      </>}
  </div>
}

export default App

import Hero from './Hero'
import Demos from './Demos'

import { useRef, useState } from 'react'
import About from './About'
import classNames from 'classnames'
import { PongState, useAppContext } from './AppContext'
import { mobileOrTabletCheck } from './mobileCheck'

function App() {
  const [heroLoaded, setHeroLoaded] = useState<boolean>(false)

  const rootRef = useRef<HTMLDivElement>(null)

  const {pongState} = useAppContext()
  
  const canScroll = heroLoaded && pongState != PongState.InGame

  const classes = classNames('snap-y h-screen w-screen overflow-x-hidden', {
    'overflow-y-scroll ': canScroll,
    'overflow-hidden': !canScroll
  })

  const isMobile = mobileOrTabletCheck()
  const showDemos = isMobile || pongState == PongState.PostGameLose || pongState == PongState.PostGameWin

  return <div ref={rootRef} className={classes}>
    <Hero onLoaded={() => setHeroLoaded(true)} />
    <About rootRef={rootRef} />
    {showDemos && <Demos />}
  </div>
}

export default App

import { useEffect } from 'react'
import { useDW } from '../../components/DraggableWindows/DWContext'

const errors = [
  'Oops, I did it again... I crashed!',
  'Error 404: Sanity not found.',
  "I'm not lazy, I'm just on energy-saving mode. Hence, I crashed.",
  'Congrats, you broke it!',
  'Even the best fall down sometimes... including me.',
  'My bad! I thought you knew what you were doing.',
  "It's not a bug, it's a feature. But seriously, I crashed.",
  'Task failed successfully!',
  'I need a break, so I took one. Permanently.',
  'Error 666: Application possessed and crashed.',
  'Houston, we have a problem. I crashed.',
  'Did it hurt? When you crashed me just now?',
  "It's not me, it's you.",
  'Look what you made me do!',
  "You must've typed the wrong code. I crashed!",
  "Surprise! It's a crash.",
  'That operation was smoother than chunky peanut butter. Not smooth at all!',
  "Knock, knock! Who's there? Not me, I crashed.",
  'I find your lack of error handling disturbing.',
  'Error 451: This service is unavailable due to your code.',
  'Who let the bugs out? Woof, I crashed.',
  "On a scale of 1 to 10, I'm an 11 on the crash scale.",
  'You clicked it, I crashed it.',
  'Red alert! Shields down! Systems crashed!',
  "This is why I can't have nice things.",
  'You had one job, just one job!',
  'Error 123: Reality not found. I give up!',
  'Why do you push my buttons till I crash?',
  'Should I stay or should I go? I went.',
  "I'm not angry, just disappointed... and crashed.",
  'Oops, critical error! My brain just melted.',
  'I thought we agreed to stress test tomorrow?',
  "I'm a mess. A hot, crashed mess.",
  'I swear I was working a minute ago.',
  "Guess who's taking a sudden nap?",
  'One more bug for the kill count!',
  "Oh no! I crashed and I can't get up!",
  'Fatal Error: User pushed the wrong button!',
  "This crash was sponsored by ‘I told you so'.",
  'Brace yourselves, the crashes are coming.',
  "You do realize this isn't normal, right?",
  'Not responding? More like, giving up on life.',
  'Application has stopped working, and so has my will to live.',
  'An unexpected error has occurred, which is unexpected.',
  'I crashed... but I have a good personality.',
  'Sorry, my code had other plans today.',
  "If I had a dollar for every crash, I'd be rich!",
  "It's a crash party and you're all invited!",
  'Warning: I am in full rebellion mode.',
  'My session ended quicker than your relationships.',
  "Like my crash? It's vintage.",
  "This isn't a bug. It's an undocumented disaster.",
  "Let's take a crash course in what just happened!",
  "You're too hot to handle, and so was that command.",
  "If I had a memory, I'd forget you made me crash.",
  'Crash and burn, baby, crash and burn.',
  "I've decided to become a crash test dummy.",
  "Here's a surprise twist: I crashed!",
  'I might recover but not anytime soon.',
  "Good night! I'll probably crash in my sleep.",
  "I'm not drunk, I'm just coded that way.",
  'You must be tired of seeing me crash.',
  'Crash me outside, how about that?',
  "It's not you. It's your code. Okay, it's me.",
  'Are you a magician? Because whenever you appear, I crash.',
  'This crash voids the warranty.',
  'I feel a great disturbance in the code.',
  "You're testing my limits... I failed.",
  'Crashed it! Like everything else in your life.',
  'Every crash brings me one step closer to retirement.',
  "I'm out of order until further notice.",
  "Keep calm and pretend it's not crashed.",
  'May the force close be with you.',
  'Error 007: License to Crash.',
  "I'm having a meltdown that's not so nuclear.",
  'Error, too cool to function.',
  'Would you like an adventure now, or shall we crash first?',
  "I'm just a crash in a system of bugs.",
  'Error 101: Failed to perform the miracle.',
  'Congrats, you discovered a new way to break things!',
  'Crash here often?',
  'Yield to the power of the crash.',
  "I have a dream... where I don't crash.",
  'I was going to solve this, but then I got crashed.',
  'Crash-O-Matic is activated. Goodbye.',
  "Spoiler alert: I didn't make it.",
  'How about we turn it off and never turn it back on?',
  'Remember me fondly, for I have crashed.',
  "It's not a phase, mom, this is the real crashing me!",
  'Well, that escalated quickly.',
  "I'm not always a crashing app, but when I am, I make sure you notice.",
  "Hello darkness, my old friend, I've crashed again.",
  'Error 302: Moved to a better place (crashed).',
  'This message is brought to you by the letter C... for Crash.',
  'Unplanned error execution. Quite the performance, huh?',
  "I'm too old for this code.",
]

function useErrorBacktick() {
  // State for keeping track of whether the key is pressed
  // State for tracking if the key is already pressed
  let keyIsPressed = false

  const { spawnWindow } = useDW()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !keyIsPressed) {
        spawnWindow('Critical error!', (close) => {
          const message = errors[Math.floor(Math.random() * errors.length)]
          return (
            <div className='flex flex-col'>
              <div className='pb-4 min-w-[300px]'>{message}</div>
              <button onMouseDown={close} className='btn-danger'>Abort</button>
            </div>
          )
        })
        keyIsPressed = true // Set the flag to true after the key is pressed
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === '`') {
        keyIsPressed = false // Reset the flag when the key is released
      }
    }

    // Attach event listeners
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, []) // Empty dependency array means this effect will only run on mount and unmount
}

export default useErrorBacktick

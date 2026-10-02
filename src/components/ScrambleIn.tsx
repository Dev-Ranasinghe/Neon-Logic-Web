import { useEffect, useRef, useState } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

interface ScrambleInProps {
  text: string
  delay: number
  triggered: boolean
}

export function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState('')
  const [started, setStarted] = useState(false)
  const revealRef = useRef(0)

  useEffect(() => {
    if (!triggered) return
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [triggered, delay])

  useEffect(() => {
    if (!started) return
    revealRef.current = 0

    const interval = setInterval(() => {
      revealRef.current += 0.5
      const revealCount = Math.floor(revealRef.current)

      if (revealCount >= text.length) {
        setDisplay(text)
        clearInterval(interval)
        return
      }

      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === ' ') {
          out += ' '
        } else if (i < revealCount) {
          out += ch
        } else if (i < revealCount + 3) {
          out += randomChar()
        } else {
          out += ''
        }
      }
      setDisplay(out)
    }, 25)

    return () => clearInterval(interval)
  }, [started, text])

  if (!triggered && !started) {
    return <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
  }

  return <span>{display}</span>
}

import { useEffect, useRef, useState } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

interface ScrambleTextProps {
  text: string
  isHovered: boolean
  className?: string
}

export function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(0)

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text)
      frameRef.current = 0
      return
    }

    frameRef.current = 0
    const interval = setInterval(() => {
      frameRef.current += 1
      const revealCount = Math.floor(frameRef.current / 4)

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
        } else {
          out += randomChar()
        }
      }
      setDisplay(out)
    }, 25)

    return () => clearInterval(interval)
  }, [isHovered, text])

  return <span className={className}>{display}</span>
}

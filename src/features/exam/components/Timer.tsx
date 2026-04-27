import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  duration: number
  onTimeout: () => void
}

const EXAM_TIMER_DEADLINE_KEY = 'gplx_exam_timer_deadline_v1'

export const Timer = ({ duration, onTimeout }: Props) => {
  const timeoutCalledRef = useRef(false)

  const deadline = useMemo(() => {
    const savedDeadline = localStorage.getItem(EXAM_TIMER_DEADLINE_KEY)

    if (savedDeadline) {
      return Number(savedDeadline)
    }

    const newDeadline = Date.now() + duration * 60 * 1000
    localStorage.setItem(EXAM_TIMER_DEADLINE_KEY, String(newDeadline))

    return newDeadline
  }, [duration])

  const getRemainingSeconds = () => {
    return Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
  }

  const [remainingSeconds, setRemainingSeconds] = useState(getRemainingSeconds)

  useEffect(() => {
    const interval = window.setInterval(() => {
      const nextRemainingSeconds = getRemainingSeconds()

      setRemainingSeconds(nextRemainingSeconds)

      if (nextRemainingSeconds <= 0 && !timeoutCalledRef.current) {
        timeoutCalledRef.current = true
        localStorage.removeItem(EXAM_TIMER_DEADLINE_KEY)
        onTimeout()
      }
    }, 1000)

    return () => window.clearInterval(interval)
  }, [deadline, onTimeout])

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60

  return (
    <div className="rounded-xl bg-yellow-100 px-4 py-2 text-sm font-black text-yellow-800">
      Thời gian:{' '}
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}
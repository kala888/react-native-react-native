import { useEffect, useRef, useState } from 'react'

// boolean类型的控制属性，show，close，toggle
export function useVisible(initial = false) {
  const [visible, setVisible] = useState(initial)
  const show = () => setVisible(true)
  const close = () => setVisible(false)
  const toggle = () => setVisible(!visible)
  return {
    visible,
    show,
    close,
    toggle,
  }
}

export function useLoading(initial = false) {
  const [loading, setLoading] = useState(initial)
  const closeLoading = () => setLoading(false)
  const showLoading = (timeout) => {
    setLoading(true)
    if (timeout) {
      setTimeout(() => closeLoading(), timeout)
    }
  }
  return {
    loading,
    showLoading,
    closeLoading,
  }
}

// 倒计时
export function useCountdown(maxCount = 60) {
  const [second, setSecond] = useState(maxCount)
  const [counting, setCounting] = useState(false)
  const interval = useRef()

  const startCount = (cb) => {
    setCounting(true)
    if (cb) {
      cb()
    }
  }
  const stopCount = (cb) => {
    setCounting(false)
    clearInterval(interval.current)
    if (cb) {
      cb()
    }
  }

  useEffect(() => {
    if (!counting) {
      return
    }
    setCounting(true)
    console.log('countdown....run')
    interval.current = setInterval(() => {
      setSecond((t) => {
        const result = t - 1
        console.log('countdown....run....', result)
        if (result === 0) {
          clearInterval(interval.current)
          setCounting(false)
          return maxCount
        }
        return result
      })
    }, 1000)
    return () => clearInterval(interval.current)
  }, [counting, maxCount])
  return {
    second,
    counting,
    startCount,
    stopCount,
  }
}

import styles from '@/styles/AnimateGB.module.css'

function AnimateBG({ top, left, right }) {
  const position = {
    top: top,
    left: left,
    right: right
  }

  return (
    <div className="absolute -z-10" style={position}>
      <div
        className={`w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${styles.animateBlob}`}
      ></div>
      <div
        className={`relative right-28 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${styles.animateBlob} styles.animation-delay-2000`}
      ></div>
      <div
        className={`relative left-24 bottom-32 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${styles.animateBlob} styles.animation-delay-4000`}
      ></div>
    </div>
  )
}

export default AnimateBG

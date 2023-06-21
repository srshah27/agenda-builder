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
        className={`h-48 w-48 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter ${styles.animateBlob}`}
      ></div>
      <div
        className={`relative right-28 h-48 w-48 rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter ${styles.animateBlob} styles.animation-delay-2000`}
      ></div>
      <div
        className={`relative left-24 bottom-32 h-48 w-48 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter ${styles.animateBlob} styles.animation-delay-4000`}
      ></div>
    </div>
  )
}

export default AnimateBG

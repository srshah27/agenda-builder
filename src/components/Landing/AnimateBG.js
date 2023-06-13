import styles from '@/styles/AnimateGB.module.css'

function AnimateBG() {
  return (
    <div className="absolute -z-10">
      <div className={`absolute -top-20 right-16 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${styles.animateBlob}`}></div>
      <div className={`absolute -top-20 right-64 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${styles.animateBlob} styles.animation-delay-2000`}></div>
      <div className={`absolute -top-60 right-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${styles.animateBlob} styles.animation-delay-4000`}></div>
    </div >
  )
}

export default AnimateBG
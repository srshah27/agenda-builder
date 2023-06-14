import styles from '../../styles/utils/CustomInput.module.css'
import clsx from 'clsx';

const CustomInput = ({ required = "false", placeholder = "", center = false }) => {
  return (
    <div className={`${styles.waveGroup}`} >
      <input required={required} type="text" className={clsx(styles.input, center && 'text-center')} placeholder={placeholder} />
      <span className={styles.bar}></span>
    </div >
  )
}

export default CustomInput
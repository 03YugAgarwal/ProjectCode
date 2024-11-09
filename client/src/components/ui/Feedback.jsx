import styles from './Feedback.module.css'

const Feedback = (props) => {
  return (
    <p className={`${styles.message} ${props.type === 'success' ? styles.success : styles.error}`}>{props.children}</p>
  )
}

export default Feedback
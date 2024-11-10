import styles from "./Input.module.css";
const Input = (props) => {
  return (
    <input
      placeholder={props.placeholder ? props.placeholder : ""}
      type={props.type ? props.type : 'text'}
      value={props.value}
      onChange={props.onChange}
      className={styles.input}
      
    >
      {props.children}
    </input>
  );
};

export default Input;

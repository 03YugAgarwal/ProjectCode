import {LANGUAGE_VERSIONS} from "../../constants"

const languages = Object.entries(LANGUAGE_VERSIONS)

import styles from './Assignment.module.css'

const CodingLanguage = ({language,onSelect}) => {
    // console.log(languages);
    
  return (
    <div className={styles.selectContainer}>
      <option value=""></option>
      <span>Language: </span>
      <select name="language">
        {
            languages.map(([language,version]) => {
                return <option key={language} onClick={()=>{
                  onSelect(language)
                }} value={language}>{language} {version}</option>
            })
        }
      </select>
    </div>
  );
};

export default CodingLanguage;

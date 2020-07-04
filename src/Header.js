import React from "react"
import styles from "./styles.module.css"

function Header(){
    return(
        <div className={styles.header}><h2 className={styles.title}>Meme Generator</h2></div>
    )
}

export default Header
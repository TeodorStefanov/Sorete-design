import React, { useState } from 'react'
import styles from './index.module.css'
import {
    Link
} from 'react-router-dom'
const LinkComponent = ({ link, title }) => {
    const [clicked, setClicked] = useState(false)
    return (
        <div className={styles['list-item']}>
            <Link to={link} className={styles.link}>{title}</Link>
        </div>
    )
}
export default LinkComponent
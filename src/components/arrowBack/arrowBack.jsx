import arrow from '../../assets/icons/arrow_left_big.svg'
import { Link } from 'react-router-dom'
import classes from './arrowBack.module.css'

export default function ArrowBack(props) {
    return(
        <Link to={props.target} className={classes.mainFrame}>
            <img src={arrow} alt="icon" />
        </Link>
    )
}
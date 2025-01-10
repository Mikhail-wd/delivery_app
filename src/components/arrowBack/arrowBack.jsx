import arrow from '../../assets/icons/arrow_left_big.svg'
import { Link } from 'react-router-dom'
import classes from './arrowBack.module.css'

export default function ArrowBack(props) {
    return (
        <div className={classes.backWrapper}>
            <Link to={props.target} className={classes.mainFrame + ' regular-padding'}>
                <img src={arrow} alt="icon" />
            </Link>
            <h1 className={classes.title + ' regular-padding'}>{props.name}</h1>
        </div>
    )
}
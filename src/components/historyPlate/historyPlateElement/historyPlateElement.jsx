import box_icon from '../../../assets/icons/box_icon.svg'
import arrow from '../../../assets/icons/arrow_right_grey.svg'
import classes from './historyPlateElement.module.css'

export default function HistoryPlateElement(props) {
    return (
        <div className={classes.plateElem}>
            <div>
                <div className="icon-box-small">
                </div>
            </div>
            <div>
                <h3 className={classes.title}>{props.name}</h3>
                <p className={classes.context}>Tracking ID:{props.context}</p>
            </div>
            <div>
                <img src={arrow} alt="arrow" />
            </div>
        </div>
    )
}
import arrow from '../../assets/icons/arrow_right_grey_small.svg'
import classes from './historyPlate.module.css'
import HistoryPlateElement from './historyPlateElement/historyPlateElement'


const mockArr = [
    {
        name: "Kitties in slippers",
        context: "234234234234"
    },
    {
        name: "Kitties in slippers",
        context: "234234234234"
    },
]

export default function HistoryPlate() {
    return (
        <div className={classes.historyHeaderWrapper +" regular-padding"}>
            <div className={classes.historyHeader}>
                <p>Tracking History</p>
                <span>See all <img src={arrow} alt="arrow" /></span>
            </div>
            <div className={classes.platesElems}>
                {mockArr.map((element, index) => {
                    return <HistoryPlateElement name={element.name} context={element.context} />
                })}
            </div>
        </div>
    )
}
import CurrentShipmentElement from './currentShipmentElement/currentShipmentElement'
import arrow from '../../assets/icons/arrow_right_grey_small.svg'
import classes from './currentShipment.module.css'

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

export default function CurrentShipment() {
    return (
        <div className={classes.headerWrapper }>
            <div className={classes.currentHeader}>
                {/* <p>Current Shipment</p>
                <span>See all <img src={arrow} alt="icon" /></span> */}
            </div>
            <CurrentShipmentElement name={mockArr[0].name} context={mockArr[0].context} />
        </div>
    )
}
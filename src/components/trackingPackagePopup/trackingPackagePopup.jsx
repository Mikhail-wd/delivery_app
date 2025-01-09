import { AppContext } from '../../routes/Root'
import { useContext } from 'react'
import cross from '../../assets/icons/cross.svg'
import classes from './trackingPackagePopup.module.css'
import CurrentShipment from '../currentShipment/currentShipment'

export default function TrackingPackagePopup() {
    const context = useContext(AppContext)

    function closeModal(event) {
        context.dispatch({ type: "CLOSE_TRACK_MODAL" })
    }
    return (
        <>
            <div className={classes.modalWrapper} >
            </div>
            <div className={classes.mainFraim + " regular-padding"}>
                <span className={classes.inputHeader}>
                    <img src={cross} alt="icon" className={classes.closeCross}
                        onClick={(e) => closeModal(e)} />
                </span>
                <div className={classes.currentShippiment}>
                    <CurrentShipment />
                </div>
            </div>
        </>
    )
}
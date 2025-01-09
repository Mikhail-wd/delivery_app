import profile from '../../assets/icons/profile.svg'
import bell from '../../assets/icons/bell.svg'
import add_delivery from '../../assets/icons/adding_delivery.svg'
import list from '../../assets/icons/list.svg'
import home_active from '../../assets/icons/home_active.svg'
import { Link } from 'react-router-dom'
import classes from './footer.module.css'
import { AppContext } from '../../routes/Root'
import { useContext } from 'react'

export default function Footer() {
    const context = useContext(AppContext)
    return (
        <div className={classes.footer}>
            <div className={classes.footerNav}>
                <div className={classes.footerActiveElem}>
                    <img src={home_active} alt="icon" />
                    <p>Home</p>
                </div>
                <Link className={classes.footerPassivElem} to="/check_rates">
                    <img src={list} alt="icon" />
                    <p>Check Rates</p>
                </Link>
                <div className={classes.footerAddDelivery} onClick={() => { context.dispatch({ type: "ERROR_POPUP", payload: "Page is under service" }) }}>
                    <img src={add_delivery} alt="icon" />
                    <p>Add Shipment</p>
                </div>
                <div className={classes.footerPassivElem} onClick={() => { context.dispatch({ type: "ERROR_POPUP", payload: "Page is under service" }) }}>
                    <img src={bell} alt="icon" />
                    <p>Notifications</p>
                </div>
                <div className={classes.footerPassivElem} onClick={() => { context.dispatch({ type: "ERROR_POPUP", payload: "Page is under service" }) }}>
                    <img src={profile} alt="icon" />
                    <p>Acount</p>
                </div>
            </div>
        </div>
    )
}
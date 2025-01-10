import classes from './HomePage.module.css'
import { Link } from 'react-router-dom'
import search from '../../assets/icons/search.svg'
import hand from '../../assets/icons/payment.svg'
import truck from '../../assets/icons/truck.svg'
import box from "../../assets/icons/box.svg"
import history from "../../assets/icons/history.svg"
import MainSwiper from '../../components/sliderMainPage/swiperMain'
import HistoryPlate from '../../components/historyPlate/historyPlate'
import CurrentShipment from '../../components/currentShipment/currentShipment'
import Footer from '../../components/footer/footer'
import axios from "axios"
import axiosRetry from "axios-retry"
import { AppContext } from '../../routes/Root'
import { useContext, useLayoutEffect, useState, useRef } from 'react'
import TrackingPackagePopup from '../../components/trackingPackagePopup/trackingPackagePopup'

export default function HomePage() {
    const input = useRef()
    const context = useContext(AppContext)
    const [trackNumber, setTrackNumber] = useState(null)

    function checkPackage(value) {
        value.preventDefault()
        if (trackNumber !== null) {
            axios.get(`https://delivery.sjp-asia.group/api/v2/parcel_info/${trackNumber.replace(/\s/, "")}?language_code=en`)
                .then(response => {
                    if (response.data.status === "error") {
                        context.dispatch({ type: "ERROR_POPUP", payload: "Enter valid number" })
                    } if (response.data.data.fromCountry.length === 0) {
                        context.dispatch({ type: "ERROR_POPUP", payload: "Please, enter valid tracking number." })
                    } else {
                        input.current.blur()
                        context.dispatch({ type: "SET_TRACK_PACKAGE", payload: response.data })
                        context.dispatch({ type: "OPEN_TRACK_MODAL" })
                    }
                })
                .catch(error => {
                    if (error.status === 404) {
                        context.dispatch({ type: "ERROR_POPUP", payload: error.response.data.detail })
                    } if (error.status === 400)
                        context.dispatch({ type: "ERROR_POPUP", payload: error.response.data.detail })
                })
        } else {
            context.dispatch({ type: "ERROR_POPUP", payload: "Please, enter valid tracking number." })
        }
    }

    function selectTrack(event) {
        setTrackNumber(event.target.value)
    }

    useLayoutEffect(() => {
        context.dispatch({ type: "CLEAN_CITIES" })
    }, [])
    return (
        <div className={classes.mainWrapper}>
            {context.state.track_modal ? <TrackingPackagePopup /> : null}
            <header className={classes.header + " regular-padding"}>
                <h1>Let's track your package</h1>
                <p>Please enter your tracking number</p>
                <div className={classes.inputWrapper}>
                    <form action="submit" className={classes.headerForm} onSubmit={(e) => checkPackage(e)}>
                        <img src={search} alt="search" className={classes.inputWrapperImage} />
                        <input type="text" className={classes.headerinput}
                            ref={input}
                            placeholder='Enter tracking number'
                            onChange={(e) => selectTrack(e)} />
                    </form>
                </div>
            </header>
            <nav className={classes.headerNav + " regular-padding"}>
                <Link className={classes.navMainPageElem} to="/delivery_app/check_rates">
                    <div className='btn-medium'>
                        <img src={hand} alt="payment" />
                    </div>
                    <p>Check Rates</p>
                </Link>
                <div className={classes.navMainPageElem} onClick={() => { context.dispatch({ type: "ERROR_POPUP", payload: "Page is under service" }) }}>
                    <div className='btn-medium'>
                        <img src={truck} alt="payment" />
                    </div>
                    <p>Pick Up</p>
                </div>
                <div className={classes.navMainPageElem} onClick={() => { context.dispatch({ type: "ERROR_POPUP", payload: "Page is under service" }) }}>
                    <div className='btn-medium'>
                        <img src={box} alt="payment" />
                    </div>
                    <p>Drop Off</p>
                </div>
                <div className={classes.navMainPageElem} onClick={() => { context.dispatch({ type: "ERROR_POPUP", payload: "Page is under service" }) }}>
                    <div className='btn-medium'>
                        <img src={history} alt="payment" />
                    </div>
                    <p>History</p>
                </div>
            </nav>
            <HistoryPlate />
            <MainSwiper />
            <Footer />
        </div >
    )
}
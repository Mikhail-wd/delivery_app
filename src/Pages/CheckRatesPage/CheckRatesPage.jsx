import mark from "../../assets/icons/marker_small_grey.svg"
import box_grey_icon from '../../assets/icons/box_small_grey.svg'
import gps from '../../assets/icons/gps.svg'
import lines from '../../assets/icons/line.svg'
import minus from '../../assets/icons/minus.svg'
import plus from '../../assets/icons/plus.svg'
import classes from './CheckRatesPage.module.css'
import { Link } from 'react-router-dom'
import ArrowBack from '../../components/arrowBack/arrowBack'
import WeightPlate from "../../components/weightPlate/weightPlate"
import InputPopup from "../../components/inputPopup/inputPopup"
import axios from "axios"
import axiosRetry from "axios-retry"
import { AppContext } from "../../routes/Root"
import { useLayoutEffect, useState, useRef, useContext } from "react"

export default function CheckRatesPage() {
    axiosRetry(axios, {
        retries: 15,
        retryDelay: (retryCount) => {
            return retryCount * 1500;
        },
    });
    const city = useRef()
    const country = useRef()
    const context = useContext(AppContext)
    const [buttonState, setButtonState] = useState(0)
    const [calcPrice, setCalcPrice] = useState(null)
    const [selectedWeight, setSelectedWeight] = useState("")
    const [selectKilos, setSelectKilos] = useState(1)
    const [matchetCitiesStart, setMatchetCitiesStart] = useState([])
    const [pickCountry, setPickCountry] = useState("")
    const [dropOffPoint, setDropOffPoint] = useState(null)

    function selectWeight(value) {
        if (value === "small") {
            setSelectedWeight(value);
            setSelectKilos(1);
        }
        if (value === "medium") {
            setSelectedWeight(value);
            setSelectKilos(1);
        }
        if (value === "big") {
            setSelectedWeight(value);
            setSelectKilos(5);
        }
        if (value === "huge") {
            setSelectedWeight(value);
            setSelectKilos(51);
        }
    }

    function setWeigth(value) {
        if (value <= 4) {
            setSelectedWeight("medium")
        } if (value >= 5 && value <= 50) {
            setSelectedWeight("big")
        } if (value >= 51) {
            setSelectedWeight("huge")
        }
    }

    function selectingWeight(value) {
        if (value === "dec" && selectKilos > 1) {
            setWeigth(selectKilos - 1)
            setSelectKilos(selectKilos - 1)
        }
        if (value === "inc") {
            setWeigth(selectKilos + 1)
            setSelectKilos(selectKilos + 1)
        }
    }
    function switchButtons() {
        switch (buttonState) {
            case 0:
                return <div className={classes.footer + ' regular-padding'}>
                    <div className='btn-regular' onClick={() => checkPrice()}>Check Rates</div>
                </div>
            case 1:
                return <div className={classes.footer + ' regular-padding'}>
                    <div className='btn-regular-alter' >Please wait...</div>
                </div>
            case 2:
                return <div className={classes.footer + ' regular-padding'}>
                    <div className='btn-regular-alter' >{calcPrice} USD</div>
                </div>
            default:
                console.warn("Switching buttons Error")
        }
    }
    function selectCityStart(value) {
        startCityRef.current.value = value
        setStartCity(value)
        setMatchetCitiesStart([])
    }
    function selectPickUp(value) {
        setPickCountry(value.target.value)
    }
    function openModalCities() {
        context.dispatch({ type: "TOGGLE_CITIESMODAL" })
    }

    function checkPrice() {
        if (context.state.checkRates.selectedCity !== null && pickCountry.length > 1) {
            setButtonState(1)
            axios.get(`https://delivery.sjp-asia.group/api/v1/get_price_cost?to_address=${context.state.checkRates.selectedCity.country}%2C${context.state.checkRates.selectedCity.city}&weight=${selectKilos}`)
                .then(response => {
                    setCalcPrice(response.data.cost)
                    setButtonState(2)
                }).catch(error => {
                    context.dispatch({ type: "ERROR_POPUP", payload: error.response.data.detail })
                    setButtonState(0)
                }
                )
        } else {
            context.dispatch({ type: "ERROR_POPUP", payload: "Make sure your selected all fields." })
        }
    }
    useLayoutEffect(() => {
        axios.get("https://delivery.sjp-asia.group/api/v2/cities").then(
            response => {
                context.dispatch({ type: "SET_CITIES", payload: response.data.cities })
            }
        ).catch(error => {
        })
        axios.get("https://delivery.sjp-asia.group/api/v2/countries").then(
            response => {
                context.dispatch({ type: "SET_COUNTRIS", payload: (response.data.countries) })
            }
        ).catch(error => {
        })
    }, [])
    useLayoutEffect(() => {
        setDropOffPoint(context.state.checkRates.selectedCity)
        if (context.state.checkRates.selectedCity !== null) {
            city.current.value = `${context.state.checkRates.selectedCity.country}, ${context.state.checkRates.selectedCity.city}`
        }
    }, [context.state.checkRates.selectedCity])
    return (
        <>
            <ArrowBack target={"/delivery_app/"} />
            {context.state.checkRates.modalCities ? < InputPopup select="cities" /> : null}
            <h1 className={classes.title + ' regular-padding'}>Check Rates</h1>
            <div className={classes.points + ' regular-padding'}>
                <div className={classes.pickPoint}>
                    <p className={classes.titleChek}>Pickup Point</p>
                    <div className={classes.pointPick}>
                        <div className={classes.icon}>
                            <img src={box_grey_icon} alt="icon" />
                            <img src={lines} alt="icon" className={classes.lines} />
                        </div>
                        <div>
                            <input type="text" className={classes.inputCheck}
                                onChange={(e) => selectPickUp(e)}
                                placeholder='Pickup Location'
                            />
                            <img src={gps} alt="gps" className={classes.iconGps} />
                        </div>
                    </div>
                </div>
                <div className={classes.dropPoint}>
                    <p className={classes.titleChek}>Drop Off Point</p>
                    <div className={classes.pointDrop}>
                        <div className={classes.icon}>
                            <img src={mark} alt="icon" />
                        </div>
                        <div>
                            <input type="text" className={classes.inputCheck}
                                placeholder='Package Destination'
                                ref={city}
                                onClick={() => { openModalCities() }}
                            />
                            <img src={gps} alt="gps" className={classes.iconGps} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.wheigth + ' regular-padding'}>
                <p>Weight</p>
                <div className={classes.weightElements}>
                    {/* < span onClick={() => selectWeight("small")}>
                        <WeightPlate size={"small"}
                            selected={selectedWeight === "small" ? true : false} />
                    </span> */}
                    < span onClick={() => selectWeight("medium")}>
                        <WeightPlate size={"medium"}
                            selected={selectedWeight === "medium" ? true : false} />
                    </span>
                    < span onClick={() => selectWeight("big")}>
                        <WeightPlate size={"big"}
                            selected={selectedWeight === "big" ? true : false} />
                    </span>
                    < span onClick={() => selectWeight("huge")}>
                        <WeightPlate size={"huge"}
                            selected={selectedWeight === "huge" ? true : false} />
                    </span>
                </div>
            </div>
            <div className={classes.pakageQuaintity + ' regular-padding'}>
                <p>Packege Weight</p>
                <div className={classes.packegeController}>
                    <div><p>{selectKilos} {selectKilos > 1 ? "Kilograms" : "Kilogram"}</p></div>
                    <div>
                        <span className={classes.round}
                            onClick={() => selectingWeight("dec")}
                        ><img src={minus} alt="icon" /></span>
                        <span className={classes.round}
                            onClick={() => selectingWeight("inc")}
                        ><img src={plus} alt="icon" /></span>
                    </div>
                </div>
            </div>
            {switchButtons()}
        </>
    )
}
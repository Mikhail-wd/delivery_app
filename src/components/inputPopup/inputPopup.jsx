import { AppContext } from '../../routes/Root'
import cross from "../../assets/icons/cross.svg"
import { useContext, useLayoutEffect, useState, useRef } from 'react'
import classes from './inputPopup.module.css'

export default function inputPopup({ select = "cities" }) {
    const input = useRef()
    const context = useContext(AppContext)
    const [searchInput, setSearchInput] = useState("")
    const [processedCities, setProcessedCities] = useState([])
    const [cities, setCities] = useState(null)
    const [countris, setCountris] = useState(null)

    function closeModal() {
        if (select === "cities") {
            context.dispatch({ type: "TOGGLE_CITIESMODAL" })
        } if (select === "countris") {
            context.dispatch({ type: "TOGGLE_COUNTRISMODAL" })
        }
        input.current.blur()
    }
    function selectCity(value) {
        context.dispatch({ type: "SELECT_CITY", payload: value })
        if (select === "cities") {
            context.dispatch({ type: "TOGGLE_CITIESMODAL" })
        } if (select === "countris") {
            context.dispatch({ type: "TOGGLE_COUNTRISMODAL" })
        }
    }
    function selectCountry(value) {
        context.dispatch({ type: "SELECT_COUNTRY", payload: value })
        if (select === "cities") {
            context.dispatch({ type: "TOGGLE_CITIESMODAL" })
        } if (select === "countris") {
            context.dispatch({ type: "TOGGLE_COUNTRISMODAL" })
        }
    }
    function choseCountry(value) {
        let formatedInput = value.target.value.toLowerCase().replace(/\s/, "")
        let tempArray = []
        if (value.target.value.length > 0) {
            input.current.value = value.target.value[0].toUpperCase() + value.target.value.slice(1)
            for (let element in cities) {
                let formatedTag = cities[element].tag.toLowerCase().replace(/\s/, "")
                if (formatedTag.match(`${formatedInput}`) !== null && input.current.value.length !== 0) {
                    tempArray.push({ city: element, country: cities[element].country })
                }
            }
        }
        setProcessedCities(tempArray)
    }
    function switchSelector(value) {
        if (cities !== null) {
            switch (value) {
                case "cities":
                    return processedCities.map((element, index) => {
                        return <span key={index} className={classes.modalElement} onClick={() => { selectCity(element) }}>{element.city} {`(${element.country})`}</span>
                    })
                default:
                    console.warn("No selectors for RateModale")
            }
        } else {
            return null
        }
    }
    useLayoutEffect(() => {
        setCities(context.state.checkRates.cities)
        setCountris(context.state.checkRates.countris)
    }, [])
    return (
        <div className={classes.modalWrapper}>
            <div className={classes.mainFraim + " regular-padding"}>
                <span className={classes.inputHeader}>
                    <input type="text" className={classes.inputCheck}
                        placeholder='Package Destination'
                        ref={input}
                        onChange={(e) => { choseCountry(e) }} />
                    <img src={cross} alt="icon" className={classes.closeCross}
                        onClick={() => closeModal()} />
                </span>
                <div className={classes.cities}>
                    {switchSelector(select)}
                </div>
            </div>

        </div>)
}
import { Outlet } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, createContext, useReducer } from "react"

const initialState = {
    checkRates: {
        cities: [],
        countris: [],
        modalCities: false,
        modalCountris: false,
        selectedCity: null,
        selectedCountry: null
    },
    package: null,
    track_modal: false
}

function reducer(state, action) {
    switch (action.type) {
        case "ERROR_POPUP":
            toast.error(action.payload, { autoClose: 2000 })
            return { ...state }
        case "CLOSE_TRACK_MODAL":
            return { ...state, track_modal: false }
        case "OPEN_TRACK_MODAL":
            return { ...state, track_modal: true }
        case "TOGGLE_CITIESMODAL":
            return { ...state, checkRates: { ...state.checkRates, modalCities: !state.checkRates.modalCities } }
        case "TOGGLE_COUNTRISMODAL":
            return { ...state, checkRates: { ...state.checkRates, modalCountris: !state.checkRates.modalCountris } }
        case "SET_CITIES":
            return { ...state, checkRates: { ...state.checkRates, cities: action.payload } }
        case "SET_TRACK_PACKAGE":
            return { ...state, package: action.payload }
        case "CLEAN_CITIES":
            return { ...state, checkRates: { ...state.checkRates, selectedCity: null } }
        case "SELECT_CITY":
            return { ...state, checkRates: { ...state.checkRates, selectedCity: action.payload } }
        case "SET_COUNTRIS":
            return { ...state, checkRates: { ...state.checkRates, countris: action.payload } }
        case "SELECT_COUNTRY":
            return { ...state, checkRates: { ...state.checkRates, selectedCountry: action.payload } }
        case "SUCCESS_POPUP":
            toast(action.payload, { autoClose: 2000 })
            return { ...state }
        default:
            console.warn("Error in app reducer")
    }
}

export const AppContext = createContext(initialState)


export default function Root() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            <AppContext.Provider value={{ state: state, dispatch: dispatch }}>
                <div className="regulator">
                    <h1>You'r resolution isn't supported. Please use mobile device.</h1>
                </div>
                <div className="mobileFrame">
                    <ToastContainer
                        position="top-left"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover={false}
                        theme="Light"
                    />
                    <Outlet />
                </div>
            </AppContext.Provider>
        </>
    )
}
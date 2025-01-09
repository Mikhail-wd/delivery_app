import small from '../../assets/icons/box_PCh_small_grey.svg'
import small_active from '../../assets/icons/box_PCh_small_orange.svg'
import medium from '../../assets/icons/box_PCh_medium_grey.svg'
import medium_active from '../../assets/icons/box_PCh_medium_orange.svg'
import big from '../../assets/icons/box_PCh_big_grey.svg'
import big_active from '../../assets/icons/box_PCh_big_orange.svg'
import huge from '../../assets/icons/box_PCh_huge_grey.svg'
import huge_active from '../../assets/icons/box_PCh_huge_orange.svg'
import classes from "./weightPlate.module.css"

export default function WeightPlate({ size = "small", selected = false }) {

    function changeValue() {
        switch (size) {
            case "small": {
                return (
                    <>
                        <p>  &lt; 1 Kg</p>
                        <img src={selected ? small_active : small} alt="icon" />
                        <p>Small</p>
                    </>
                )
            }
            case "medium": {
                return (
                    <>
                        <p> {"<"} 5 Kg</p>
                        <img src={selected ? medium_active : medium} alt="icon" />
                        <p>Medium</p>
                    </>
                )
            }
            case "big": {
                return (
                    <>
                        <p>5-50 Kg</p>
                        <img src={selected ? big_active : big} alt="icon" />
                        <p>Large</p>
                    </>
                )
            }
            case "huge": {
                return (
                    <>
                        <p>50 Kg  {">"}</p>
                        <img src={selected ? huge_active : huge} alt="icon" />
                        <p>X Large</p>
                    </>
                )
            }
            default:
                console.warn("Error in package change")
        }
    }
    return (
        <div className={selected ? classes.weightPlateActive : classes.weightPlate}>
            {changeValue()}
        </div>
    )
}
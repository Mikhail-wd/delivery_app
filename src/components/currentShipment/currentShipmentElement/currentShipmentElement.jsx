import start from '../../../assets/icons/point_start.svg'
import end from '../../../assets/icons/point_end.svg'
import dots from '../../../assets/icons/tri_dot.svg'
import line from '../../../assets/icons/line.svg'
import classes from './CurrentShipmentElement.module.css'
import { AppContext } from '../../../routes/Root'
import { useContext } from 'react'

export default function CurrentShipmentElement() {
    const context = useContext(AppContext)
    return (
        <div className={classes.currentElement}>
            <div className={classes.plateElem}>
                <div>
                    <div className="icon-box-small">
                    </div>
                </div>
                <div>
                    <h3 className={classes.title}>{context.state.package.data.trackCode}</h3>
                    <p className={classes.context}>Tracking ID:{context.state.package.id}</p>
                </div>
                <div>
                    <img src={dots} alt="icons" />
                </div>
            </div>
            <div className={classes.currentElementContext}>
                {/* <div className={classes.pointDestStart}>
                    <div>
                        <img src={start} alt="icon" className={classes.start} />
                        <img src={line} alt="icon" className={classes.line} />
                    </div>
                    <div>
                        <p className={classes.titleCont}>From</p>
                        <p className={classes.content}> 750 Kearny St, SanFrancisco, CA</p>
                    </div>
                </div>
                <div className={classes.pointDestEnd}>
                    <div>
                        <img src={end} alt="icon" />
                    </div>
                    <div>
                        <p className={classes.titleCont}>Shippet to</p>
                        <p className={classes.content}> 750 Kearny St, SanFrancisco, CA</p>
                    </div>
                </div> */}
                <hr />
                <p>Status: {context.state.package.deliveredStat === null ? "Your package is in transit." : "Awaiting"}</p>
            </div>
        </div>
    )
}
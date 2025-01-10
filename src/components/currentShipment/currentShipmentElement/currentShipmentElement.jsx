import start from '../../../assets/icons/point_start.svg'
import end from '../../../assets/icons/point_end.svg'
import dots from '../../../assets/icons/tri_dot.svg'
import line from '../../../assets/icons/line.svg'
import classes from './CurrentShipmentElement.module.css'
import { AppContext } from '../../../routes/Root'
import { useContext, useState, useLayoutEffect } from 'react'

export default function CurrentShipmentElement() {
    const context = useContext(AppContext)

    const [eventsArray, setEventsArray] = useState([])

    useLayoutEffect(() => {
        let tempArr = []
        for (let element in context.state.package.data.events) {
            tempArr.push(context.state.package.data.events[element])
        }
        setEventsArray(tempArr)
    }, [])

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
                <div className={classes.leftColIcons}>
                    <div>
                        <img src={start} alt="icon" className={classes.start} />
                    </div>
                    <div className={classes.line}></div>
                    <div>
                        <img src={end} alt="icon" className={classes.end}/>
                    </div>
                </div>
                <div className={classes.rightColContent}>
                    <div className={classes.pointDestStart}>
                        <div>
                            <p className={classes.titleCont}>From</p>
                            <p className={classes.content}>
                                {context.state.package.data.fromCountry}
                            </p>
                        </div>
                    </div>
                    <ul className={classes.listWrapper}>
                        {eventsArray.length !== 0 ?
                            eventsArray.map((element, index) => {
                                return <li key={index}><span className={classes.dateForming}>{element.operationDateTime.split(" ")[0]}</span> {element.operationAttribute}</li>
                            }) : null}
                    </ul>
                    <div className={classes.pointDestEnd}>
                        <div>
                            <p className={classes.titleCont}>Shippet to</p>
                            <p className={classes.content}>
                                {context.state.package.data.destinationPostalAddress} </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.formFooter + " regular-padding"}>
                <hr />
                <p>Status: {context.state.package.data.lastPoint.operationAttributeOriginal}</p>
            </div>
        </div>
    )
}
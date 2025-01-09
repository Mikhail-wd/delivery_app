import classes from './slide.module.css'

export default function Slide() {
    return (
        <div>
            <div className={classes.gradientWrapper}>
                <div className={classes.textInfo}>
                    <h4>Special Offer</h4>
                    <p>50% Off On First <br /> Online Payment </p>
                    <span>Until the end of January 2025</span>
                </div>
                <div className={classes.saleMark}>
                    <div><h1>50%</h1><p>off</p></div>
                </div>
                <div className={classes.slider}>
                </div>
            </div>
        </div>
    )
}
import React from "react"
import "./CardDashboard.css"

export default props => { 


    return(
        <div className="card-dashboard">
            <h5>{props.title}</h5>
            <h3>{props.total}</h3>
            <p>{props.subtotal}</p>
        </div>
    )
}
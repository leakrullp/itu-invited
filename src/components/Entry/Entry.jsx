import React from "react";


export default function Entry(props){
    return(
        <article className="Card">
            <img src={props.img} alt={props.name} className="Image" />
            <h2 className="Organisation">{props.organisation} </h2>
            <h2 className="Headline">{props.headline}</h2>
            <h2 className="Date">{props.date}</h2>
            <h2 className="Time">{props.time}</h2>
            <h2 className="Tags">{props.tags}</h2>
        </article>
    )
}
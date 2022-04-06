import React from "react";
import { useParams, useHistory } from "react-router-dom";

const Detail=(props)=>{
    const { id } = useParams();
    console.log(id)
    
    return(
        <div >
             <h1>Hello Detail!!</h1>
        </div>
    )
}
export default Detail
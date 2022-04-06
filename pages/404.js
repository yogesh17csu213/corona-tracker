import React from "react"

const NotFound=(props)=>{
    return (
      <div>
            <div className={'header_border'}>
                <a href="/">
                    Go to Home
                </a>
            </div>
            <div className={'error_heading'}>
                <h1> 404 </h1>
                <h3>We are sorry, page not found</h3>
                <p>It may be temporarily unavailable, moved or no longer exist. </p>
            </div>
      </div>
    )
  }
  
export default NotFound
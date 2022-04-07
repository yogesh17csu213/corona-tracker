
function ServerError(props) {
    return (
      <div>
           <div className={'header_border'}>
                <a href="/">
                    Go to Home
                </a>
            </div>
            
            <div className={'error_heading'}>
                <h1> 500 </h1>
                <h3>Internal Server Error</h3>
                <p>It may be temporarily unavailable, moved or no longer exist. </p>
            </div>
      </div>
    )
  }
  
export default ServerError
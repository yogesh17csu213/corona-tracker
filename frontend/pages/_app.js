import React, {useEffect}  from 'react'
import axios from 'axios'
import { Provider } from 'react-redux'
import { useStore } from 'store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'assets/css/global.css'
import { StaticRouter }  from 'react-router'
import { BrowserRouter } from 'react-router-dom'

const isServer = typeof window === 'undefined';

export default function App({ Component,pageProps, router }) {

  const store = useStore(pageProps.initialReduxState)
  useEffect(()=>{
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
          .catch(err => console.error("Service worker registration failed", err))
  } else {
      console.log("Service worker not supported");
  }

  },[])
  if (isServer) {
      return (
        <Provider store={store}>
            <StaticRouter location={router.asPath} >
                <Component {...pageProps} />
            </StaticRouter>
        </Provider>
      );
    }
    return (
      <Provider store={store}>
        <BrowserRouter>
              <Component {...pageProps} />
        </BrowserRouter>
      </Provider>
    )
    
  
}

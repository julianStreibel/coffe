import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [status, setStatus] = useState()

  useEffect(() => {
    getStatus().then(res => setStatus(res))
  }, [])

  const getStatus = async () => {
    try {
      const res = await fetch('http://192.168.0.104:8080/Status')
      const json = await res.json()
      return await json.status
    } catch (error) {
      console.error(error)
    }
  }

  const start = async () => {
    try {
      await fetch('http://192.168.0.104:8080/On')
      setStatus(3)
    } catch (error) {
      console.error(error)
    }
  }

  const stop = async () => {
    try {
      await fetch('http://192.168.0.104:8080/Off')
      setStatus(0)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div class="header">Coffee 3000</div>
      <div class="container">
        <div class="coffee-header">
          <div class="coffee-header__buttons coffee-header__button-one"></div>
          <div class="coffee-header__buttons coffee-header__button-two"></div>
          <div
            class="coffee-header__display"
            onClick={status ? () => stop() : () => start()}
          >
            {status ? 'Stop' : 'Start'}
          </div>
          <div class="coffee-header__details"></div>
        </div>
        <div class="coffee-medium">
          <div class="coffe-medium__exit"></div>
          <div class="coffee-medium__arm"></div>
          {status !== 0 &&
            <>
              {status !== 1 && <div class="coffee-medium__liquid"></div>}
              <div class="coffee-medium__smoke coffee-medium__smoke-one"></div>
              <div class="coffee-medium__smoke coffee-medium__smoke-two"></div>
              <div class="coffee-medium__smoke coffee-medium__smoke-three"></div>
              <div class="coffee-medium__smoke coffee-medium__smoke-for"></div>
            </>}
          <div class="coffee-medium__cup"></div>
        </div>
        <div class="coffee-footer"></div>
      </div>
      <div class="footer"></div>
    </>
  );
}


export default App;

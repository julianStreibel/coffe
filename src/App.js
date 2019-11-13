import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import DateTimePicker from 'react-datetime-picker';

const URL = "http://rp.local:8080"

function App() {

  const [status, setStatus] = useState(0)
  const [position, setPosition] = useState(0)
  const [onDate, setOnDate] = useState(new Date())
  const [offDate, setOffDate] = useState(new Date())

  useEffect(() => {
    let today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(8)
    tomorrow.setMinutes(0)
    tomorrow.setSeconds(0)
    setOnDate(tomorrow)
    let today1 = new Date()
    let tomorrow1 = new Date(today1)
    tomorrow1.setDate(tomorrow.getDate())
    tomorrow1.setHours(11)
    tomorrow1.setMinutes(0)
    tomorrow1.setSeconds(0)
    setOffDate(tomorrow1)
    getStatus().then(res => setStatus(res))
  }, [])

  const getStatus = async () => {
    try {
      const res = await fetch(`${URL}/Status`)
      const json = await res.json()
      return await json.status
    } catch (error) {
      return 0
    }
  }

  const startAt = async (date) => {
    try {
      const res = await fetch(`${URL}/OnAt/${date}`)
      const json = await res.json()
      console.log(await json)
    } catch (error) {
      console.error(error)
    }
  }

  const stopAt = async (date) => {
    try {
      const res = await fetch(`${URL}/OffAt/${date}`)
      const json = await res.json()
      console.log(await json)
    } catch (error) {
      console.log(date)
      console.error(error)
    }
  }

  const stop = async () => {
    try {
      await fetch(`${URL}/Off`)
      setStatus(0)
    } catch (error) {
      console.error(error)
    }
  }

  const start = async () => {
    try {
      await fetch(`${URL}/On`)
      setStatus(3)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div class="header">Coffee 3000</div>
      <div class="container">
        <div class="coffee-header">
          <Rotater onClick={() => setPosition((position + 1) % 3)} position={position} />
          <Menu>
            <MenuObj on={position === 0}>Now</MenuObj>
            <MenuObj on={position === 1}>On</MenuObj>
            <MenuObj on={position === 2}>Off</MenuObj>
          </Menu>
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
      <div class="footer">
        {position > 0 && <>
          <h2>{position === 2 ? 'Shut off' : 'Turn on'} the Coffee Machine at </h2>
          {position === 2 ?
            <DateTimePicker
              onChange={setOffDate}
              value={offDate}
            />
            :
            <DateTimePicker
              onChange={setOnDate}
              value={onDate}
            />
          }
          <GoButton onClick={position === 1 ? () => { startAt(Math.round((onDate - new Date()) / 1000)) } : () => { stopAt(Math.round((offDate - new Date()) / 1000)) }}>
            <h2>Go</h2>
          </GoButton>
        </>}
      </div>
    </>
  );
}

const GoButton = styled.div`
  margin: auto;
  cursor: pointer;
  width: 50px;
  :hover{
    transform: scale(1.03)
  }
`;

const Rotater = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 25px;
  background-color: #282323;
  border-radius: 50%;
  left: 15px;
	cursor: pointer;
  &:after {
    content: "";
    width: 8px;
    height: 8px;
    position: absolute;
    bottom: -8px;
    left: calc(50% - 4px);
    background-color: #615e5e;
  }
 ${props => {
    if (props.position === 1) {
      return 'transform: rotate(270deg);'
    } else if (props.position === 2) {
      return 'transform: rotate(300deg);'
    } else {
      return 'transform: rotate(240deg);'
    }
  }} 
`;

const Menu = styled.div`
    width: 40px;
    height: 65px;
    position: absolute;
    top: 8px;
    background-color: rgb(160, 160, 160);
    left: 55px;
    border-radius: 7%;
`;

const MenuObj = styled.div`
  margin: 1.5px 0 0 2px;
  ${props => props.on ? 'color: rgb(230, 50, 50)' : 'color: rgb(200, 200, 200);'}
`;

export default App;

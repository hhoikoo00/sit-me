import React, { useState } from "react";

//TODO Get URL to vary based on local or cloud hosting
const apiURL = "https://europe-west2-imperial-drp-sit-me.cloudfunctions.net/api/dbsamples/"

const App = () => {

  const [seats, setSeats] = useState({})

  const [code, setCode] = useState("")

  const [doBook, setDoBook] = useState(true)

  const fetchData = () => {
    fetch(apiURL)
      .then(res => res.json())
      .then((seatData) => {
        const newSeats = {}
        seatData.forEach((entry) => newSeats[entry["id"]] = entry["isBooked"])
        setSeats(newSeats);
      })
      .catch(console.log)
  }

  const entries = () => Object.keys(seats).map((seatCode) =>{ 

    const entryStyle = {
      "backgroundColor": seats[seatCode] ? "red" : "green", 
      "padding": "10%",
      "margin": "5%",
      "fontSize": "200%",
      "textAlign": "center"
    }

      return (
      <div style={entryStyle} key={seatCode}>
          {seatCode}
        </div>
      )
    }
  )

  const bookingForm = () => {
    const formStyle = {
      "padding": "0px",
      "textAlign": "center",
      "fontSize": "150%",
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      alert((doBook ? "Booking" : "Cancelling booking on")  + " seat "  + code)
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBooked: doBook })
      };
      
      await fetch(apiURL + code, requestOptions)
        .then(response => response.json());
    }

    return (
      <form onSubmit={handleSubmit}>
      <div style={formStyle}>
        <label>
          Book Seat:   
          <input type="text" onChange={e => setCode(e.target.value)} />
        </label>
        <br/>
        <label>
          { doBook ? "Create" : "Cancel" } booking 
          <input type="checkbox" checked={doBook} onClick={e => setDoBook(e.target.checked)}/>
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </div>
    </form>
    )
  }

  fetchData();

  return (
    <div>
      Hello DRP 19
      { bookingForm() }
      { entries() }
    </div>
  )
}
export default App;

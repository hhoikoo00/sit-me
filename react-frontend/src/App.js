import React, { Component } from "react";

//TODO Get URL to vary based on local or cloud hosting
const apiURL = "https://europe-west2-imperial-drp-sit-me.cloudfunctions.net/api/dbsamples/"

class CodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { code: "" , doBook: true }
  }

  editCode = (event) => {
    this.setState({ code: event.target.value });
  }

  editBookType = (event) => {
    this.setState({ doBook: event.target.checked });
  }


  handleSubmit = async (event) => {
    event.preventDefault();

    alert((this.state.doBook ? "Booking" : "Cancelling booking on")  + " seat "  + this.state.code)
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBooked: this.state.doBook })
    };

    await fetch(apiURL + this.state.code, requestOptions)
      .then(response => response.json());

    this.setState(this.state);

  }

  render = () => {
    const style = {
      "padding": "0px",
      "textAlign": "center",
      "fontSize": "150%",
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={style}>
          <label>
            Book Seat:   
            <input type="text" value={this.state.value} onChange={this.editCode} />
          </label>
          <br/>
          <label>
            { this.state.doBook ? "Create" : "Cancel" } booking 
            <input type="checkbox" checked={this.state.doBook} onChange={this.editBookType}/>
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { seats:  {} };
  }

  componentDidMount() {
    this.fetchAvailability();
  }

  fetchAvailability = () => {
      fetch(apiURL)
          .then(res => res.json())
          .then((data) => {
            var seatAvail = {};
            data.forEach(seat => seatAvail[seat["id"]] = seat["isBooked"])
            this.setState({ seats: seatAvail })
          })
          .catch(console.log);
   }

  // seatEntry = (id, isBooked) => {
  //   const style = { 
  //     "backgroundColor": isBooked ? "red" : "green", 
  //     "padding": "10%",
  //     "margin": "5%"
  //   }

  //   return (
  //     <div style={style}>
  //       Seat: { id }
  //     </div>
  //   )
  // }

  render = () => {
    const style = {
      "padding": "0px",
      "textAlign": "center",
      "fontSize": "150%",
    }
    
    const entries = Object.keys(this.state.seats).map(
      (key) => {
        const entry = (id, isBooked) => {
          const entryStyle = { 
            "backgroundColor": isBooked ? "red" : "green", 
            "padding": "10%",
            "margin": "5%"
          }
          return (<div style={entryStyle}>
            Seat: { id }
          </div>
        )}
        return entry(key, this.state.seats[key]);
      }
    )
    return (
        <div>
          <CodeForm />
          <div style={style}>
            {entries}
          </div>
        </div>
      );
  }
}

export default App;

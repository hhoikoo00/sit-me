import React, { Component } from "react";

class CodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { code: "" , doBook: true }
  }

  editCode = (event) => {
    this.setState({ code: event.target.value });
  }

  editBookType = (event) => {
    console.log(event.target.checked);
    this.setState({ doBook: event.target.checked });
  }


  handleSubmit = (event) => {
    alert((this.state.doBook ? "Booking" : "Cancelling booking on") + " chair: " + this.state.code)
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBooked: true })
    };

    //TODO: Add correct URL
    fetch("http://localhost:5000/imperial-drp-sit-me/europe-west2/api/hello/" + this.state.code, requestOptions)
      .then(response => response.json())
      .then(console.log);

    event.preventDefault();
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
      // fetch("http://localhost:5000/imperial-drp-sit-me/europe-west2/api/hello")
      //     .then(res => res.text())
      //     .then(res => this.setState({ seats: res }))
      //     .catch(console.log);
      
      this.setState({
        seats: {
          "A0": true,
          "A1": false,
          "A2": true,
          "A3": false,
          "A4": true,
          "B0": false,
          "B1": true,
          "B2": true,
          "B3": false,
          "B4": false,
          "B5": false,
        }
      });
   }

  seatEntry = (id, isFree) => {
    const style = { 
      "backgroundColor": isFree ? "green" : "red", 
      "padding": "10%",
      "margin": "5%"
    }

    return (
      <div style={style}>
        Seat: { id }
      </div>
    )
  }

  seatEntries = () => {
    const style = {
      "padding": "0px",
      "textAlign": "center",
      "fontSize": "150%",
    }
    const entries = Object.keys(this.state.seats).map(
      (key) => {
        return this.seatEntry(key, this.state.seats[key]);
      }
    )
    return (
      <div style={style}>
        { entries }
      </div>
    )
  }
  


  render = () => {
    return (
        <div>
          <CodeForm />
          <this.seatEntries />
        </div>
      );
  }
}

export default App;

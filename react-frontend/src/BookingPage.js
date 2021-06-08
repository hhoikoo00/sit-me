import React, { useState, useEffect } from "react";
import axios from "axios";
//TODO Get URL to vary based on local or cloud hosting
const apiURL = "https://europe-west2-imperial-drp-sit-me.cloudfunctions.net/api/dbsamples";

const Entries = ({ seats }) => Object.entries(seats)
  .map(([id, { isBooked }]) => {
    const entryStyle = {
      "backgroundColor": isBooked ? "red" : "green", 
      "padding": "10%",
      "margin": "5%",
      "fontSize": "200%",
      "textAlign": "center"
    }

    return (
      <div key={id} style={entryStyle}>
        {id}
      </div>
    )
  });

const SeatInput = ({ setCode }) => (
  <label>
    Book Seat:
    <input type="text" onChange={e => setCode(e.target.value)} />
  </label>
);

const DoBookInput = ({ doBook, setDoBook }) => (
  <label>
    { doBook ? "Create" : "Cancel"} booking
    <input
      type="checkbox"
      value={doBook}
      onClick={e => setDoBook(e.target.checked)}
    />
  </label>
);

const BookingForm = ({ doBook, setDoBook, code, setCode }) => {
  const bookingFormStyle = {
    "padding": "0px",
    "textAlign": "center",
    "fontSize": "150%",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    alert(`${doBook ? "Booking" : "Cancelling booking on"} seat ${code}`);

    await axios.put(`apiURL/${code}`, {
      isBooked: doBook,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={bookingFormStyle}>
        <SeatInput setCode={setCode} />
        <br />
        <DoBookInput doBook={doBook} setDoBook={setDoBook} />
        <br />
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

const BookingPage = () => {
  const [seats, setSeats] = useState({});
  const [code, setCode] = useState("");
  const [doBook, setDoBook] = useState(true);

  useEffect(() => {
    const fetchSeatData = async () => {
      const seatData = await axios.get(apiURL);

      const newSeats = {};
      seatData.data.forEach((entry) => newSeats[entry.id] = entry.isBooked);
      setSeats(newSeats);
    };

    fetchSeatData();
  }, []);

  return (
    <div>
      Hello DRP 19
      <BookingForm
        doBook={doBook}
        setDoBook={setDoBook}
        code={code}
        setCode={setCode}
      />
      <Entries
        seats={seats}
      />
    </div>
  );
};

export default BookingPage;
// Seat booking logic using closures
const createTheater = (rows, cols) => {
    const seats = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ booked: false }))
    );
  
    return {
      bookSeat: (row, col) => {
        if (!seats[row][col].booked) {
          seats[row][col].booked = true;
          return true;
        }
        return false;
      },
      cancelSeat: (row, col) => {
        if (seats[row][col].booked) {
          seats[row][col].booked = false;
          return true;
        }
        return false;
      },
      getSeats: () => seats,
    };
  };
  
  const theater = createTheater(5, 10);
  
  // Render seats dynamically
  const renderSeats = () => {
    const seatsContainer = document.getElementById("seats");
    seatsContainer.innerHTML = "";
  
    theater.getSeats().forEach((row, rowIndex) => {
      row.forEach((seat, colIndex) => {
        const seatButton = document.createElement("button");
        seatButton.className = `p-2 rounded ${
          seat.booked ? "bg-red-500" : "bg-green-500"
        }`;
        seatButton.textContent = `${rowIndex + 1}-${colIndex + 1}`;
        seatButton.title = seat.booked ? "Booked" : "Available";
        seatButton.addEventListener("click", () => toggleSeat(rowIndex, colIndex));
        seatsContainer.appendChild(seatButton);
      });
    });
  };
  
  // Toggle seat booking
  const toggleSeat = (row, col) => {
    const seat = theater.getSeats()[row][col];
    if (seat.booked) {
      theater.cancelSeat(row, col);
    } else {
      theater.bookSeat(row, col);
    }
    renderSeats();
  };
  
  // Confirm booking
  document.getElementById("confirm-booking").addEventListener("click", async () => {
    alert("Booking confirmed!");
  });
  
  // Cancel all bookings
  document.getElementById("cancel-booking").addEventListener("click", () => {
    theater.getSeats().forEach((row, rowIndex) =>
      row.forEach((_, colIndex) => theater.cancelSeat(rowIndex, colIndex))
    );
    renderSeats();
  });
  
  // Initialize
  document.addEventListener("DOMContentLoaded", renderSeats);
  
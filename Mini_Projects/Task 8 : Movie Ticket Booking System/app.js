// Seat Class
class Seat {
    constructor(id, price) {
      this.id = id;
      this.price = price;
      this.isBooked = false;
    }
  
    toggleBooking() {
      this.isBooked = !this.isBooked;
    }
  }
  
  // Initialize Seats
  const seatCount = 25;
  const seatPrice = 10;
  const seats = [];
  for (let i = 1; i <= seatCount; i++) {
    seats.push(new Seat(i, seatPrice));
  }
  
  // State for Selected Seats
  let selectedSeats = [];
  
  // Render Seats
  function renderSeats() {
    const seatLayout = document.getElementById("seatLayout");
    seatLayout.innerHTML = ""; // Clear existing seats
  
    seats.forEach(seat => {
      const seatElement = document.createElement("div");
      seatElement.className = `p-4 rounded-lg text-center cursor-pointer ${
        seat.isBooked ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      }`;
      seatElement.textContent = `Seat ${seat.id}`;
      seatElement.onclick = () => toggleSeatSelection(seat.id);
      seatLayout.appendChild(seatElement);
    });
  }
  
  // Toggle Seat Selection
  function toggleSeatSelection(seatId) {
    const seat = seats.find(s => s.id === seatId);
    if (seat) {
      if (seat.isBooked) {
        alert("This seat is already booked.");
        return;
      }
  
      const isSelected = selectedSeats.includes(seatId);
      if (isSelected) {
        selectedSeats = selectedSeats.filter(id => id !== seatId);
      } else {
        selectedSeats.push(seatId);
      }
  
      updateSummary();
      renderSeats();
    }
  }
  
  // Update Booking Summary
  function updateSummary() {
    const selectedSeatDetails = seats.filter(s => selectedSeats.includes(s.id));
    const totalPrice = selectedSeatDetails.reduce((sum, seat) => sum + seat.price, 0);
  
    document.getElementById("selectedSeats").textContent =
      selectedSeats.length > 0
        ? `Selected Seats: ${selectedSeats.join(", ")}`
        : "Selected Seats: None";
    document.getElementById("totalPrice").textContent = `Total Price: $${totalPrice}`;
  }
  
  // Confirm Booking
  document.getElementById("confirmBooking").addEventListener("click", () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to book.");
      return;
    }
  
    selectedSeats.forEach(seatId => {
      const seat = seats.find(s => s.id === seatId);
      if (seat) {
        seat.toggleBooking();
      }
    });
  
    selectedSeats = [];
    updateSummary();
    renderSeats();
    alert("Booking Confirmed!");
  });
  
  // Initial Render
  renderSeats();
  
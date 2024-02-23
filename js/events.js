let eventsData;

// Function to create HTML for events
function createEventHTML(date, event) {
  return `<tr class="event" data-event="${event.replace(
    /\s+/g,
    "-"
  )}"><td class="event-date">${date}</td><td class="link"> ${event}</td></tr>`;
}

// Function to display events for a given month
function displayEvents(month, events) {
  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = ""; // Clear previous events
  const tableHTML = `
  <table class="event-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Event</th>
        </tr>
      </thead>
      <tbody>
        ${events
          .map((event) => createEventHTML(event.date, event.event))
          .join("")}
      </tbody>
    </table>
  `;
  calendarDiv.innerHTML += tableHTML;

  // Add event listeners to each event row
  document.querySelectorAll(".event").forEach((row) => {
    row.addEventListener("click", (event) => {
      const eventName = event.currentTarget.dataset.event;
      window.location.href = `./event.html#${eventName}`;
    });
  });
}

// Function to show events for a specific month
function showMonth(month) {
  // Replace spaces with dashes in the month
  const urlFriendlyMonth = month.replace(/\s+/g, "-");

  const monthData = eventsData.find((item) => item.month === month);
  if (monthData) {
    displayEvents(monthData.month, monthData.dates);
    document.getElementById("current-month").innerText = month; // Update current month text
    // Update URL with current month (replaced spaces with dashes)
    history.pushState({}, "", `?month=${urlFriendlyMonth}`);
  } else {
    console.error("Month data not found.");
  }
}

// Function to handle navigation to previous month
document.getElementById("prev-month").addEventListener("click", () => {
  const currentMonth = document.getElementById("current-month").innerText;
  const monthIndex = eventsData.findIndex(
    (item) => item.month === currentMonth
  );
  const prevMonthData = eventsData[monthIndex - 1];
  if (prevMonthData) {
    showMonth(prevMonthData.month);
  }
});

// Function to handle navigation to next month
document.getElementById("next-month").addEventListener("click", () => {
  const currentMonth = document.getElementById("current-month").innerText;
  const monthIndex = eventsData.findIndex(
    (item) => item.month === currentMonth
  );
  const nextMonthData = eventsData[monthIndex + 1];
  if (nextMonthData) {
    showMonth(nextMonthData.month);
  }
});

// Fetch the JSON file and display events for January by default
fetch("../resources/events.json")
  .then((response) => response.json())
  .then((data) => {
    eventsData = data;
    const initialMonth = eventsData[0].month; // Use the first month by default
    showMonth(initialMonth);
  })
  .catch((error) => console.error("Error fetching data:", error));

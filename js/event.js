// Fetch the JSON file
fetch("../resources/events.json")
  .then(response => response.json())
  .then(eventsData => {
    // Function to parse event name from URL hash
    function getEventNameFromUrl() {
      var eventNameEncoded = window.location.hash.substring(1);
      return decodeURIComponent(eventNameEncoded);
    }

    // Function to get event details by name
    function getEventDetails(eventName) {
      for (var month of eventsData) {
        for (var event of month.dates) {
          if (event.event.replace(/\s+/g, '-') === eventName) {
            return event;
          }
        }
      }
      return null;
    }

    // Function to display event details
    function displayEventDetails() {
      var eventName = getEventNameFromUrl();
      var eventDetailsContainer = document.getElementById('event-details');
      var event = getEventDetails(eventName);

      if (event) {
        var eventHTML = `
          <div>
            <p><strong>Event Name:</strong> ${event.event}</p>
            <p><strong>Description:</strong> ${event.description}</p>
          </div>
        `;
        eventDetailsContainer.innerHTML = eventHTML;
      } else {
        eventDetailsContainer.innerHTML = '<p>Event details not found.</p>';
      }
    }

    // Call the function to display event details
    displayEventDetails();
  })
  .catch(error => console.error('Error fetching data:', error));

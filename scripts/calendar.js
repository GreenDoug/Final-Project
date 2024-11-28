const calendar = document.getElementById("calendar");
const eventsList = document.getElementById("events");
const eventForm = document.getElementById("event-form");
const eventTitleInput = document.getElementById("event-title");
const eventDateInput = document.getElementById("event-date");

// Store events locally
let events = JSON.parse(localStorage.getItem("calendarEvents")) || [];

// Render events in the list
const renderEvents = () => {
  eventsList.innerHTML = events
    .map(event => `<li><strong>${event.date}:</strong> ${event.title}</li>`)
    .join("") || "<p>No events yet. Add one above!</p>";
};

// Add a new event
eventForm.addEventListener("submit", e => {
  e.preventDefault();
  const title = eventTitleInput.value.trim();
  const date = eventDateInput.value;

  if (!title || !date) return alert("Please fill out both fields.");

  events.push({ title, date });
  localStorage.setItem("calendarEvents", JSON.stringify(events));
  renderEvents();
  eventForm.reset();
});

// Render calendar placeholder
const renderCalendar = () => {
  const now = new Date();
  calendar.innerHTML = `<p>Today's date is <strong>${now.toDateString()}</strong>.</p>`;
};

// Initialize page
renderCalendar();
renderEvents();

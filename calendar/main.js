// main.js

// Initialize Bryntum Calendar
const calendar = new bryntum.calendar.Calendar({
    appendTo: 'calendar',  // This matches the div ID in index.html
    mode: 'month',         // Set the default view mode to month
    events: []             // Empty initially; will populate with Google Calendar events
});

// Function to set events in Bryntum Calendar
function setCalendarEvents(events) {
    // Map Google Calendar event format to Bryntum Calendar format
    const formattedEvents = events.map(event => ({
        id: event.id,
        name: event.summary || 'No Title',  // Default to 'No Title' if the event has no summary
        startDate: event.start.dateTime || event.start.date,
        endDate: event.end.dateTime || event.end.date
    }));
    
    // Update the calendar's event store with the fetched events
    calendar.eventStore.data = formattedEvents;
}

// Function to fetch Google Calendar events
async function fetchGoogleCalendarEvents(token) {
    try {
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch events from Google Calendar.");
        }

        const data = await response.json();
        setCalendarEvents(data.items);  // Pass the events to Bryntum Calendar
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

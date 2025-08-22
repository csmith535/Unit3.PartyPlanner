// CONSTANTS
let API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2507/events";

// STATE
let events = [];
let selectedEvent;

// Update events state
async function getEvents() {
  try {
    let $response = await fetch(API);
    let $responseData = await $response.json();

    events = $responseData.data;
    console.log(events);
    render();
    return events;
  } catch (e) {
    console.error(e);
  }
}

// List of party names
function eventListItem(events) {
  const $li = document.createElement("li");
  const $a = document.createElement("a");
  $a.href = "#selected";
  $a.textContent = events.name;
  $a.addEventListener("click", (event) => {
    event.preventDefault();
    getEvent(events.id);
  });
  $li.appendChild($a);
  return $li;
}

function eventList() {
  const $ul = document.createElement("ul");
  $ul.className = `lineup`;

  for (let i = 0; i < events.length; ++i) {
    $ul.appendChild(eventListItem(events[i]));
  }

  return $ul;
}

async function getEvent(id) {
  try {
    let $response = await fetch(`${API}/${id}`);
    let $data = await $response.json();
    selectedEvent = $data.data;
    render();
    return selectedEvent;
  } catch (e) {
    console.error(`Failed to fetch event with id ${id}.`);
  }
}

// Detailed information about the selected event
function eventDetails() {
  if (!selectedEvent) {
    let $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  let $details = document.createElement("div");
  $details.innerHTML = `
  <section class="event">
     <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
     <p>${selectedEvent.description}</p>
     <h1>${selectedEvent.date} @ ${selectedEvent.location}</h1>
   </section>`;
  return $details;
}

// RENDER
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>events R us</h1>
    <main>
      <section>
        <h2>Lineup</h2>
        <eventList></eventList>
      </section>
      <section id="selected">
        <h2>Event Details</h2>
        <eventDetails></eventDetails>
      </section>
    </main>
  `;
  $app.querySelector("eventList").replaceWith(eventList());
  $app.querySelector("eventDetails").replaceWith(eventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();

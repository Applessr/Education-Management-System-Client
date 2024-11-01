import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const ClassSchedule = () => {
  return (
    <div>
      <h2>TimeGrid View Example</h2>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek" // or "timeGridDay"
        events={[
          {
            title: "Meeting",
            start: "2024-10-30T10:00:00",
            end: "2024-10-30T11:00:00",
          },
          {
            title: "Lunch Break",
            start: "2024-10-31T12:00:00",
            end: "2024-10-31T13:00:00",
          },
          {
            title: "Workshop",
            start: "2024-11-01T14:00:00",
            end: "2024-11-01T16:00:00",
          },
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek",
        }}
        height="auto"
      />
    </div>
  );
};

export default ClassSchedule;

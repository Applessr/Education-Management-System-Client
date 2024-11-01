import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function ExamSchedule() {
  return (
    <div>
      <h2>Month View Example</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "Conference", start: "2024-11-05" },
          {
            title: "Meeting",
            start: "2024-11-12T10:00:00",
            end: "2024-11-12T12:00:00",
          },
          { title: "Workshop", start: "2024-11-20" },
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        height="auto"
      />
    </div>
  );
}

export default ExamSchedule;

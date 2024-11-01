import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const examEvents = [
  {
    title: "MATH101 Final Exam",
    start: "2024-11-05T14:00:00",
    end: "2024-11-05T16:00:00",
    location: "Exam Hall A",
    courseCode: "MATH101",
    instructor: "Dr. Smith",
    type: "Final Exam",
    backgroundColor: "#EF4444",
    borderColor: "#DC2626"
  },
  {
    title: "SCI201 Midterm",
    start: "2024-11-12T10:00:00",
    end: "2024-11-12T12:00:00",
    location: "Lab 1",
    courseCode: "SCI201",
    instructor: "Dr. Johnson",
    type: "Midterm Exam",
    backgroundColor: "#EF4444",
    borderColor: "#DC2626"
  },
  {
    title: "HIS301 Final Exam",
    start: "2024-11-20T09:00:00",
    end: "2024-11-20T11:00:00",
    location: "Exam Hall B",
    courseCode: "HIS301",
    instructor: "Prof. Williams",
    type: "Final Exam",
    backgroundColor: "#EF4444",
    borderColor: "#DC2626"
  }
];

function ExamSchedule() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const calendarRef = React.useRef(null);

  const handleYearChange = (yearDelta) => {
    const newYear = selectedYear + yearDelta;
    setSelectedYear(newYear);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(`${newYear}-01-01`);
    }
  };

  const jumpToCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    setSelectedYear(currentYear);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(`${currentYear}-01-01`);
    }
  };

  const renderEventContent = (eventInfo) => {
    const event = eventInfo.event;
    return (
      <div className="p-2">
        <div className="font-semibold text-red-600">{event.title}</div>
        <div className="text-sm text-gray-600">
          <div>{event.extendedProps.type}</div>
          <div>{event.extendedProps.location}</div>
          <div>{event.extendedProps.instructor}</div>
          <div>{new Date(event.start).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })} - {new Date(event.end).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Exam Schedule</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleYearChange(-10)}
              className="p-2 rounded hover:bg-gray-100"
              title="Previous 10 years"
            >
              <ChevronsLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleYearChange(-1)}
              className="p-2 rounded hover:bg-gray-100"
              title="Previous year"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={jumpToCurrentYear}
              className="px-3 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium"
            >
              Current Year
            </button>
            <button
              onClick={() => handleYearChange(1)}
              className="p-2 rounded hover:bg-gray-100"
              title="Next year"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleYearChange(10)}
              className="p-2 rounded hover:bg-gray-100"
              title="Next 10 years"
            >
              <ChevronsRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Viewing exams for year: {selectedYear}
        </div>
      </div>
      
      <FullCalendar
        ref={calendarRef}
        plugins={[listPlugin]}
        initialView="listYear"
        initialDate={`${selectedYear}-01-01`}
        events={examEvents.map(event => ({
          ...event,
          display: new Date(event.start).getFullYear() === selectedYear ? 'auto' : 'none'
        }))}
        headerToolbar={{
          left: '',
          center: '',
          right: ''
        }}
        height="auto"
        eventContent={renderEventContent}
        eventDidMount={(info) => {
          info.el.querySelector('.fc-list-event-time').style.width = '0';
          info.el.querySelector('.fc-list-event-time').style.display = 'none';
        }}
        listDayFormat={{
          month: 'long',
          day: '2-digit',
          year: 'numeric'
        }}
        listDaySideFormat={{
          weekday: 'long'
        }}
        noEventsContent={() => (
          <div className="p-4 text-center text-gray-500">
            No exams scheduled for {selectedYear}
          </div>
        )}
      />
    </div>
  );
}

export default ExamSchedule;
import React from 'react';

// Sample data structure matching backend datetime format
const classes = [
  {
    name: "Math",
    code: "MATH101",
    instructor: "Dr. Smith",
    location: "Room 101",
    startTime: "2024-11-01T09:00:00",
    endTime: "2024-11-01T10:30:00",
    dayOfWeek: 1, // 1 = Monday
    color: "bg-blue-50 hover:bg-blue-100"
  },
  {
    name: "Science",
    code: "SCI201", 
    instructor: "Dr. Johnson",
    location: "Lab 1",
    startTime: "2024-11-01T10:30:00",
    endTime: "2024-11-01T12:00:00",
    dayOfWeek: 3, // 3 = Wednesday
    color: "bg-green-50 hover:bg-green-100"
  },
  {
    name: "History",
    code: "HIS301",
    instructor: "Prof. Williams",
    location: "Room 202",
    startTime: "2024-11-01T13:00:00",
    endTime: "2024-11-01T14:30:00",
    dayOfWeek: 5, // 5 = Friday
    color: "bg-purple-50 hover:bg-purple-100"
  }
];

const times = Array.from({ length: 19 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"];

const isWithinClassTime = (classStartTime, classEndTime, slotTime) => {
  const [slotHour, slotMinute] = slotTime.split(":").map(Number);
  const startDate = new Date(classStartTime);
  const endDate = new Date(classEndTime);
  const slotMinutes = slotHour * 60 + slotMinute;
  const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
  const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();

  return slotMinutes >= startMinutes && slotMinutes < endMinutes;
};

const getColSpan = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMinutes = (end - start) / (1000 * 60);
  return durationMinutes / 30;
};

const formatTimeDisplay = (dateTimeString) => {
  return new Date(dateTimeString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const getDayIndex = (dayOfWeek) => {
  return dayOfWeek - 1; // Convert 1-based to 0-based index
};

const ClassSchedule = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Weekly Class Schedule</h2>
      </div>
      <div className="min-w-[800px] overflow-x-auto">
        <table className="w-full border-collapse" role="grid" aria-label="Class Schedule">
          <thead>
            <tr>
              <th 
                className="border border-gray-200 px-4 py-2 bg-gray-100 text-left font-semibold"
                scope="col"
              >
                Day
              </th>
              {times.map((time) => (
                <th
                  key={time}
                  className="border border-gray-200 px-4 py-2 bg-gray-100 text-center font-semibold text-sm"
                  scope="col"
                >
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIndex) => (
              <tr key={day}>
                <th
                  className="border border-gray-200 px-4 py-2 bg-gray-50 font-medium text-left"
                  scope="row"
                >
                  {day}
                </th>
                {times.map((time) => {
                  const classDetails = classes.find(
                    (cls) =>
                      getDayIndex(cls.dayOfWeek) === dayIndex &&
                      isWithinClassTime(cls.startTime, cls.endTime, time)
                  );

                  if (classDetails && `${new Date(classDetails.startTime).getHours().toString().padStart(2, '0')}:${new Date(classDetails.startTime).getMinutes().toString().padStart(2, '0')}` === time) {
                    const colSpan = getColSpan(
                      classDetails.startTime,
                      classDetails.endTime
                    );
                    return (
                      <td
                        key={time}
                        className={`border border-gray-200 px-2 py-1 text-center transition-colors duration-200 ${classDetails.color}`}
                        colSpan={colSpan}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-blue-700">
                            {classDetails.name}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {classDetails.code}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {classDetails.instructor}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {classDetails.location}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {`${formatTimeDisplay(classDetails.startTime)} - ${formatTimeDisplay(classDetails.endTime)}`}
                          </span>
                        </div>
                      </td>
                    );
                  }

                  return classDetails ? null : (
                    <td
                      key={time}
                      className="border border-gray-200 px-4 py-2 bg-white"
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassSchedule;
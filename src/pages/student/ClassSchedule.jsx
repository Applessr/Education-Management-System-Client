import useStudent from '@/src/hooks/useStudent';
import React, { useEffect, useState } from 'react';

// Sample data structure matching backend datetime format

const times = Array.from({ length: 19 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
  const date = new Date(dateTimeString);
  date.setHours(date.getHours());

  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
const getDayIndex = (dayOfWeek) => {
  return dayOfWeek - 1; // Convert 1-based to 0-based index
};

const ClassSchedule = () => {
  const { getClassSchedule, classSchedule } = useStudent();
  const token = localStorage.getItem('token');
  const semester = '1/2024';
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getClassSchedule(token, semester).finally(() => setLoaded(true));
  }, [token, semester]);

  const subtractSevenHours = (dateTimeString) => {
    const date = new Date(dateTimeString);
    date.setHours(date.getHours() - 7); // Subtract 7 hours
    return date;
  };

  const classes = (classSchedule || []).map((item) => {
    const classSchedules = item?.course?.classSchedules || [];

    return classSchedules.map((schedule) => ({
      name: item?.course?.courseName,
      code: item?.course?.courseCode,
      instructor: `${item?.course?.teacher?.firstName} ${item?.course?.teacher?.lastName}`,
      location: schedule.room,
      startTime: subtractSevenHours(schedule.startTime),
      endTime: subtractSevenHours(schedule.endTime),
      dayOfWeek: schedule.day,
      color: "bg-blue-50 hover:bg-blue-100",
    }));
  }).flat();


  console.log('classSchedule :>> ', classSchedule);

  if (!loaded) {
    return <div>Loading...</div>;
  }


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
              {times?.map((time) => (
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
            {days?.map((day, dayIndex) => (
              <tr key={day}>
                <th
                  className="border border-gray-200 px-4 py-2 bg-gray-50 font-medium text-left"
                  scope="row"
                >
                  {day}
                </th>
                {times.map((time) => {
                  const classDetails = classes?.find(
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
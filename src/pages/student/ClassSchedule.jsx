//////////////////////////////no2

// import React from "react";

// // Sample data for classes with start and end times
// const classes = [
//   {
//     name: "Math",
//     code: "MATH101",
//     location: "Room 101",
//     day: "Monday",
//     startTime: "9:00",
//     endTime: "10:30",
//   },
//   {
//     name: "Science",
//     code: "SCI201",
//     location: "Lab 1",
//     day: "Wednesday",
//     startTime: "10:30",
//     endTime: "12:00",
//   },
//   {
//     name: "History",
//     code: "HIS301",
//     location: "Room 202",
//     day: "Friday",
//     startTime: "13:00",
//     endTime: "14:30",
//   },
// ];

// // Days and 30-minute time slots from 7:00 to 17:00 for the grid
// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// const times = Array.from({ length: 20 }, (_, i) => {
//   const hour = 7 + Math.floor(i / 2);
//   const minutes = i % 2 === 0 ? "00" : "30";
//   return `${hour}:${minutes}`;
// });

// // Helper function to check if a time slot is within the class time range
// const isWithinClassTime = (classStart, classEnd, slotTime) => {
//   const [classStartHour, classStartMinutes] = classStart.split(":").map(Number);
//   const [classEndHour, classEndMinutes] = classEnd.split(":").map(Number);
//   const [slotHour, slotMinutes] = slotTime.split(":").map(Number);

//   const slotTimeInMinutes = slotHour * 60 + slotMinutes;
//   const classStartInMinutes = classStartHour * 60 + classStartMinutes;
//   const classEndInMinutes = classEndHour * 60 + classEndMinutes;

//   return (
//     slotTimeInMinutes >= classStartInMinutes &&
//     slotTimeInMinutes < classEndInMinutes
//   );
// };

// // Helper function to calculate the number of slots a class spans
// const getRowSpan = (classStart, classEnd) => {
//   const [classStartHour, classStartMinutes] = classStart.split(":").map(Number);
//   const [classEndHour, classEndMinutes] = classEnd.split(":").map(Number);

//   const startInMinutes = classStartHour * 60 + classStartMinutes;
//   const endInMinutes = classEndHour * 60 + classEndMinutes;

//   return (endInMinutes - startInMinutes) / 30; // 30 minutes per slot
// };

// const ClassSchedule = () => {
//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <table className="w-full border border-gray-200 shadow-md">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
//               Time
//             </th>
//             {days.map((day) => (
//               <th
//                 key={day}
//                 className="border border-gray-300 px-4 py-2 bg-gray-100 text-center"
//               >
//                 {day}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {times.map((time, timeIndex) => (
//             <tr key={time}>
//               <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">
//                 {time}
//               </td>
//               {days.map((day) => {
//                 // Find class that matches the day and includes the current time slot
//                 const classDetails = classes.find(
//                   (cls) =>
//                     cls.day === day &&
//                     isWithinClassTime(cls.startTime, cls.endTime, time)
//                 );

//                 // Check if this is the first slot for the class to apply rowSpan
//                 if (classDetails && time === classDetails.startTime) {
//                   const rowSpan = getRowSpan(
//                     classDetails.startTime,
//                     classDetails.endTime
//                   );
//                   return (
//                     <td
//                       key={day}
//                       className="border border-gray-300 px-4 py-2 text-center bg-blue-50"
//                       rowSpan={rowSpan}
//                     >
//                       <div>
//                         <span className="block font-semibold text-blue-700">
//                           {classDetails.name}
//                         </span>
//                         <span className="text-gray-600 text-sm">
//                           {classDetails.code}
//                         </span>
//                         <span className="text-gray-500 text-sm block">
//                           {classDetails.location}
//                         </span>
//                         <span className="text-gray-500 text-xs block">{`${classDetails.startTime} - ${classDetails.endTime}`}</span>
//                       </div>
//                     </td>
//                   );
//                 }

//                 // Return empty cell if it's within the time range of an already rendered class
//                 return classDetails ? null : (
//                   <td
//                     key={day}
//                     className="border border-gray-300 px-4 py-2 bg-white"
//                   ></td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClassSchedule;

/////////////////////////////////no3

import React from "react";

// Sample data for classes with start and end times
const classes = [
  {
    name: "Math",
    code: "MATH101",
    location: "Room 101",
    day: "Monday",
    startTime: "9:00",
    endTime: "10:30",
  },
  {
    name: "Science",
    code: "SCI201",
    location: "Lab 1",
    day: "Wednesday",
    startTime: "10:30",
    endTime: "12:00",
  },
  {
    name: "History",
    code: "HIS301",
    location: "Room 202",
    day: "Friday",
    startTime: "13:00",
    endTime: "14:30",
  },
];

// Time slots from 7:00 to 17:00 in 30-minute increments
const times = Array.from({ length: 19 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minutes}`;
});
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Helper functions
const isWithinClassTime = (classStart, classEnd, slotTime) => {
  const [classStartHour, classStartMinutes] = classStart.split(":").map(Number);
  const [classEndHour, classEndMinutes] = classEnd.split(":").map(Number);
  const [slotHour, slotMinutes] = slotTime.split(":").map(Number);

  const slotTimeInMinutes = slotHour * 60 + slotMinutes;
  const classStartInMinutes = classStartHour * 60 + classStartMinutes;
  const classEndInMinutes = classEndHour * 60 + classEndMinutes;

  return (
    slotTimeInMinutes >= classStartInMinutes &&
    slotTimeInMinutes < classEndInMinutes
  );
};

const getRowSpan = (classStart, classEnd) => {
  const [classStartHour, classStartMinutes] = classStart.split(":").map(Number);
  const [classEndHour, classEndMinutes] = classEnd.split(":").map(Number);

  const startInMinutes = classStartHour * 60 + classStartMinutes;
  const endInMinutes = classEndHour * 60 + classEndMinutes;

  return (endInMinutes - startInMinutes) / 30;
};

const ClassSchedule = () => {
  return (
    <div className="p-4 max-w-5xl ">
      <table className="min-w-full table-auto border border-gray-200 shadow-md">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
              Day
            </th>
            {times.map((time) => (
              <th
                key={time}
                className="border border-gray-300 px-4 py-2 bg-gray-100 text-center"
              >
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">
                {day}
              </td>
              {times.map((time) => {
                const classDetails = classes.find(
                  (cls) =>
                    cls.day === day &&
                    isWithinClassTime(cls.startTime, cls.endTime, time)
                );

                if (classDetails && time === classDetails.startTime) {
                  const colSpan = getRowSpan(
                    classDetails.startTime,
                    classDetails.endTime
                  );
                  return (
                    <td
                      key={time}
                      className="border border-gray-300 px-4 py-2 text-center bg-blue-50"
                      colSpan={colSpan}
                    >
                      <div className="whitespace-normal overflow-hidden">
                        <span className="block font-semibold text-blue-700">
                          {classDetails.name}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {classDetails.code}
                        </span>
                        <span className="text-gray-500 text-sm block">
                          {classDetails.location}
                        </span>
                        <span className="text-gray-500 text-xs block">{`${classDetails.startTime} - ${classDetails.endTime}`}</span>
                      </div>
                    </td>
                  );
                }

                return classDetails ? null : (
                  <td
                    key={time}
                    className="border border-gray-300 px-4 py-2 bg-white"
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassSchedule;

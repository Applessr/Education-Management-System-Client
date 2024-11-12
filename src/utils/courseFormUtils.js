// utils/courseFormUtils.js
export const initialFormState = {
    courseCode: '',
    courseName: '',
    credits: '',
    seat: '',
    section: '',
    teacherId: '',
    majorId: '',
    classSchedules: [{ day: '', startTime: '', endTime: '', room: '' }],
    examSchedule: [
        { examType: 'MIDTERM', examDate: '', startTime: '', endTime: '', room: '' },
        { examType: 'FINAL', examDate: '', startTime: '', endTime: '', room: '' }
    ]
};

export const validateForm = (formData) => {
    const errors = {};
    
    // Basic validations
    const requiredFields = ['courseCode', 'courseName', 'credits', 'seat', 'section', 'teacherId', 'majorId'];
    requiredFields.forEach(field => {
        if (!formData[field]) errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    });

    // Schedule validations
    formData.classSchedules.forEach((schedule, index) => {
        ['day', 'startTime', 'endTime', 'room'].forEach(field => {
            if (!schedule[field]) errors[`classSchedule${index}${field}`] = `${field} is required`;
        });
    });

    // Exam validations
    formData.examSchedule.forEach((exam, index) => {
        ['examDate', 'startTime', 'endTime', 'room'].forEach(field => {
            if (!exam[field]) errors[`exam${index}${field}`] = `${field} is required`;
        });
    });

    return errors;
};

export const formatCourseData = (course) => {
    if (!course) return initialFormState;

    return {
        ...course,
        credits: course.credits.toString(),
        seat: course.seat.toString(),
        section: course.section.toString(),
        teacherId: course.teacher?.id?.toString(),
        majorId: course.major?.id?.toString(),
        classSchedules: formatClassSchedules(course.classSchedules),
        examSchedule: formatExamSchedules(course.examSchedule)
    };
};

const formatClassSchedules = (schedules) => {
    if (!schedules?.length) return initialFormState.classSchedules;
    
    return schedules.map(schedule => ({
        day: schedule.day.toString(),
        startTime: new Date(schedule.startTime).toTimeString().slice(0, 5),
        endTime: new Date(schedule.endTime).toTimeString().slice(0, 5),
        room: schedule.room
    }));
};

const formatExamSchedules = (schedules) => {
    if (!schedules?.length) return initialFormState.examSchedule;
    
    return schedules.map(exam => ({
        examType: exam.examType,
        examDate: new Date(exam.examDate).toISOString().split('T')[0],
        startTime: new Date(exam.startTime).toTimeString().slice(0, 5),
        endTime: new Date(exam.endTime).toTimeString().slice(0, 5),
        room: exam.room
    }));
};
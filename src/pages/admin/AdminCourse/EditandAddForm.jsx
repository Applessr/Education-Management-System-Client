// CourseFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';
import { adminGetTeacher } from '@/src/api/admin';
import { employeeCreateCourse, employeeEditCourse } from '@/src/api/course';
import { FormField, ClassScheduleFields, ExamScheduleFields } from './CourseForm';
import { initialFormState, validateForm } from '@/src/utils/courseFormUtils';
const CourseFormModal = ({ isOpen, onClose, onSuccess, course, faculties, majors }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [filteredMajors, setFilteredMajors] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [teachers, setTeachers] = useState([]);

    const isEditMode = course !== null && course !== undefined;

    // Initialize form with course data when editing
    useEffect(() => {
        if (course && isOpen) {
            const formattedData = {
                ...course,
                credits: course.credits.toString(),
                seat: course.seat.toString(),
                section: course.section.toString(),
                teacherId: course.teacher?.id?.toString(),
                majorId: course.major?.id?.toString(),
                classSchedules: course.classSchedules?.map(schedule => ({
                    day: schedule.day.toString(),
                    startTime: new Date(schedule.startTime).toTimeString().slice(0, 5),
                    endTime: new Date(schedule.endTime).toTimeString().slice(0, 5),
                    room: schedule.room
                })) || initialFormState.classSchedules,
                examSchedule: course.examSchedule?.map(exam => ({
                    examType: exam.examType,
                    examDate: new Date(exam.examDate).toISOString().split('T')[0],
                    startTime: new Date(exam.startTime).toTimeString().slice(0, 5),
                    endTime: new Date(exam.endTime).toTimeString().slice(0, 5),
                    room: exam.room
                })) || initialFormState.examSchedule
            };
            setFormData(formattedData);
            setSelectedFaculty(course.major?.faculty?.name);
        } else {
            setFormData(initialFormState);
            setSelectedFaculty(null);
        }
    }, [course, isOpen]);

    // Load teachers
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await adminGetTeacher(token);
                setTeachers(response.data.filter(teacher => teacher.employeeRole === 'TEACHER'));
            } catch (err) {
                toast.error("Failed to load teachers");
            }
        };
        fetchTeachers();
    }, []);

    // Filter majors based on selected faculty
    useEffect(() => {
        if (selectedFaculty) {
            const facultyObj = faculties.find(f => f.name === selectedFaculty);
            setFilteredMajors(majors.filter(major => major.facultyId === facultyObj?.id));
        }
    }, [selectedFaculty, majors, faculties]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fill in all required fields correctly');
            return;
        }

        try {
            setIsSubmitting(true);
            const token = localStorage.getItem('token');

            const apiData = {
                ...formData,
                credits: parseInt(formData.credits),
                seat: parseInt(formData.seat),
                section: parseInt(formData.section),
                teacherId: parseInt(formData.teacherId),
                majorId: parseInt(formData.majorId),
                classSchedules: formData.classSchedules.map(schedule => ({
                    ...schedule,
                    day: parseInt(schedule.day)
                })),
                // Ensure exam schedule data is properly formatted
                examSchedule: formData.examSchedule.map(exam => ({
                    ...exam,
                    examDate: new Date(exam.examDate).toISOString()
                }))
            };

            if (isEditMode) {
                await employeeEditCourse(token, course.id, apiData);
                toast.success('Course updated successfully');
            } else {
                await employeeCreateCourse(token, apiData);
                toast.success('Course created successfully');
            }

            onSuccess?.();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save course');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddClassSchedule = () => {
        if (formData.classSchedules.length >= 3) return;
        setFormData(prev => ({
            ...prev,
            classSchedules: [...prev.classSchedules, { day: '', startTime: '', endTime: '', room: '' }]
        }));
    };

    const handleAddExamSchedule = () => {
        if (formData.examSchedule.length >= 2) {
            toast.warning('Only Midterm and Final exams are allowed');
            return;
        }
        
        const existingTypes = formData.examSchedule.map(exam => exam.examType);
        const newType = !existingTypes.includes('MIDTERM') ? 'MIDTERM' : 'FINAL';
    
        setFormData(prev => ({
            ...prev,
            examSchedule: [
                ...prev.examSchedule,
                { examType: newType, examDate: '', startTime: '', endTime: '', room: '' }
            ]
        }));
    };
    const handleRemoveExamSchedule = (index) => {
        if (formData.examSchedule.length <= 1) {
            toast.warning('At least one exam schedule is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            examSchedule: prev.examSchedule.filter((_, i) => i !== index)
        }));
    };


    const handleRemoveClassSchedule = (index) => {
        setFormData(prev => ({
            ...prev,
            classSchedules: prev.classSchedules.filter((_, i) => i !== index)
        }));
    };

    const handleScheduleChange = (index, field, value, type) => {
        setFormData(prev => ({
            ...prev,
            [type]: prev[type].map((schedule, i) =>
                i === index ? { ...schedule, [field]: value } : schedule
            )
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Course' : 'Add New Course'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Course Information */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Course Code*"
                            error={errors.courseCode}>
                            <Input
                                value={formData.courseCode}
                                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                                disabled={isSubmitting}
                            />
                        </FormField>

                        <FormField label="Course Name*" error={errors.courseName}>
                            <Input
                                value={formData.courseName}
                                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                                disabled={isSubmitting}
                            />
                        </FormField>

                        <FormField label="Credits*" error={errors.credits}>
                            <Input
                                type="number"
                                value={formData.credits}
                                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                                disabled={isSubmitting}
                            />
                        </FormField>

                        <FormField label="Seats*" error={errors.seat}>
                            <Input
                                type="number"
                                value={formData.seat}
                                onChange={(e) => setFormData({ ...formData, seat: e.target.value })}
                                disabled={isSubmitting}
                            />
                        </FormField>

                        <FormField label="Section*" error={errors.section}>
                            <Input
                                type="number"
                                value={formData.section}
                                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                disabled={isSubmitting}
                            />
                        </FormField>

                        <FormField label="Faculty*" error={errors.faculty}>
                            <Select
                                value={selectedFaculty || undefined}
                                onValueChange={(value) => {
                                    setSelectedFaculty(value);
                                    setFormData(prev => ({ ...prev, majorId: undefined }));
                                }}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Faculty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {faculties.map(faculty => (
                                        <SelectItem key={faculty.id} value={faculty.name}>
                                            {faculty.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>

                        <FormField label="Major*" error={errors.majorId}>
                            <Select
                                value={formData.majorId || undefined}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, majorId: value }))}
                                disabled={!selectedFaculty || isSubmitting}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Major" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredMajors.map(major => (
                                        <SelectItem key={major.id} value={major.id.toString()}>
                                            {major.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>

                        <FormField label="Teacher*" error={errors.teacherId}>
                            <Select
                                value={formData.teacherId || undefined}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, teacherId: value }))}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.map(teacher => (
                                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                            {`${teacher.firstName} ${teacher.lastName}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>
                    </div>

                    {/* Class Schedules */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Class Schedules</h3>
                            <Button
                                type="button"
                                onClick={handleAddClassSchedule}
                                disabled={formData.classSchedules.length >= 3 || isSubmitting}
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add Schedule
                            </Button>
                        </div>

                        {formData.classSchedules.map((schedule, index) => (
                            <ClassScheduleFields
                                key={index}
                                schedule={schedule}
                                index={index}
                                onUpdate={(i, field, value) => handleScheduleChange(i, field, value, 'classSchedules')}
                                onRemove={handleRemoveClassSchedule}
                                canRemove={formData.classSchedules.length > 1}
                                isSubmitting={isSubmitting}
                            />
                        ))}
                    </div>

                    {/* Exam Schedules */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Exam Schedules</h3>
                            <Button
                                type="button"
                                onClick={handleAddExamSchedule}
                                disabled={formData.examSchedule.length >= 3 || isSubmitting}
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add Exam Schedule
                            </Button>
                        </div>
                        {formData.examSchedule.map((exam, index) => (
                            <div key={index} className="relative">
                                <ExamScheduleFields
                                    exam={exam}
                                    index={index}
                                    onUpdate={(i, field, value) => handleScheduleChange(i, field, value, 'examSchedule')}
                                    isSubmitting={isSubmitting}
                                    canRemove={formData.examSchedule.length > 1}
                                    onRemove={() => handleRemoveExamSchedule(index)}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Form Actions */}
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Course' : 'Create Course'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CourseFormModal;
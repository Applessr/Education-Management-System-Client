// components/CourseFormComponents.jsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FormField = ({ label, error, children }) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        {children}
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export const ClassScheduleFields = ({ schedule, index, onUpdate, onRemove, canRemove, isSubmitting }) => (
    <div className="grid grid-cols-5 gap-4 p-4 border rounded-lg bg-gray-50">
        <FormField label="Day">
            <Select
                value={schedule.day || undefined}
                onValueChange={(value) => onUpdate(index, 'day', value)}
                disabled={isSubmitting}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                        .map((day, i) => (
                            <SelectItem key={i} value={i.toString()}>{day}</SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </FormField>

        <FormField label="Start Time">
            <Input
                type="time"
                value={schedule.startTime}
                onChange={(e) => onUpdate(index, 'startTime', e.target.value)}
                disabled={isSubmitting}
            />
        </FormField>

        <FormField label="End Time">
            <Input
                type="time"
                value={schedule.endTime}
                onChange={(e) => onUpdate(index, 'endTime', e.target.value)}
                disabled={isSubmitting}
            />
        </FormField>

        <FormField label="Room">
            <Input
                value={schedule.room}
                onChange={(e) => onUpdate(index, 'room', e.target.value)}
                placeholder="Room number"
                disabled={isSubmitting}
            />
        </FormField>

        {canRemove && (
            <div className="flex items-end">
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => onRemove(index)}
                    disabled={isSubmitting}
                    className="mb-2"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        )}
    </div>
);

export const ExamScheduleFields = ({ exam, index, onUpdate, isSubmitting }) => (
    <div className="grid grid-cols-5 gap-4 p-4 border rounded-lg bg-gray-50">
        <FormField label={`${exam.examType} Date`}>
            <Input
                type="date"
                value={exam.examDate}
                onChange={(e) => onUpdate(index, 'examDate', e.target.value)}
                disabled={isSubmitting}
            />
        </FormField>

        <FormField label="Start Time">
            <Input
                type="time"
                value={exam.startTime}
                onChange={(e) => onUpdate(index, 'startTime', e.target.value)}
                disabled={isSubmitting}
            />
        </FormField>

        <FormField label="End Time">
            <Input
                type="time"
                value={exam.endTime}
                onChange={(e) => onUpdate(index, 'endTime', e.target.value)}
                disabled={isSubmitting}
            />
        </FormField>

        <FormField label="Room" className="col-span-2">
            <Input
                value={exam.room}
                onChange={(e) => onUpdate(index, 'room', e.target.value)}
                placeholder="Exam room number"
                disabled={isSubmitting}
            />
        </FormField>
    </div>
);
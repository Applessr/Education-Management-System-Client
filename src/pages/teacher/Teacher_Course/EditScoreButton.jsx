

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CourseScoreEdit from "@/src/components/teacher/CourseScoreEdit";
import { useState } from "react";

const EditScoreButton = ({ student, courseId,onScoreUpdate }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        if (onScoreUpdate) {
            onScoreUpdate();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Edit Score</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit score for student ID: {student?.studentId}</DialogTitle>
                    <DialogDescription>
                        Select a score component from the list below, then edit its details
                    </DialogDescription>
                </DialogHeader>
                <CourseScoreEdit 
                    studentId={student?.studentId} 
                    courseId={courseId}
                    onClose={handleClose}
                />
            </DialogContent>
        </Dialog>
    );
};

export default EditScoreButton;
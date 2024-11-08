import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { teacherAddScore } from "@/src/api/grade";
import { useState } from "react";
import { toast } from "react-toastify";

const AddScoreButton = ({ student, courseId, onScoreUpdate }) => {
    const [open, setOpen] = useState(false);
    const [topic, setTopic] = useState('');
    const [score, setScore] = useState('');
    const [semester, setSemester] = useState('');
    // Add loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const SEMESTER_OPTIONS = [
        "1/2024",
        "2/2024",
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const token = localStorage.getItem('token');

        try {
            const body = {
                studentId: student.id,
                semester,
                type: topic,
                point: parseInt(score)
            };

            const response = await teacherAddScore(token, courseId, body);
            console.log('Score added successfully:', response.data);

            // Clear form
            setTopic('');
            setScore('');
            setSemester('');
            setOpen(false);

            if(onScoreUpdate){
                onScoreUpdate();
            }
            // Optional: Add some success feedback
            // You might want to add a toast notification here
            toast.success('Score added successfully');
        } catch (err) {
            console.error('Error adding score:', err);
            setError(err.response?.data?.message || 'Failed to add score');
            toast.error(err.response?.data?.message || 'Failed to add score');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="success" size="sm">Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add score for student ID: {student.studentId}</DialogTitle>
                    <DialogDescription>Add semester, topic and score then click Add</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="semester" className="text-right">Semester:</Label>
                            <select
                                id="semester"
                                className="col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                required
                            >
                                <option value="">Select semester</option>
                                {SEMESTER_OPTIONS.map((sem) => (
                                    <option key={sem} value={sem}>{sem}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="topic" className="text-right">Topic:</Label>
                            <Input
                                id="topic"
                                className="col-span-3"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="score" className="text-right">Score:</Label>
                            <Input
                                id="score"
                                className="col-span-3"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                type="number"
                                min="0"
                                max="100"
                                required
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            {error}
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddScoreButton;
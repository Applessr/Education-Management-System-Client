

import { studentViewScorePerSub, teacherEditScore } from "@/src/api/grade";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

function CourseScoreEdit({ studentId, courseId, onClose }) {
  // Data fetching states
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Edit form states
  const [selectedRow, setSelectedRow] = useState(null);
  const [topic, setTopic] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await studentViewScorePerSub(token, courseId);

        if (response?.data?.[0]?.components) {
          setScores(response.data[0].components);
        } else {
          setScores([]);
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message || 'Failed to fetch scores');
        toast.error('Failed to fetch scores');
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchScores();
    }
  }, [courseId]);

  const handleRowClick = (row) => {
    const newSelected = selectedRow?.id === row.id ? null : row;
    console.log(newSelected);
    setSelectedRow(newSelected);
    if (newSelected) {
      setTopic(newSelected.type);
      setScore(newSelected.point.toString());
    } else {
      setTopic('');
      setScore('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRow) {
      toast.error('Please select a score component to edit');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const body = {
        type: topic,
        point: parseInt(score)
      };

      await teacherEditScore(token, selectedRow.id, body);
      
      // Refresh scores after update
      const response = await studentViewScorePerSub(token, courseId);
      console.log(response.data)
      if (response?.data?.[0]?.components) {
        setScores(response.data[0].components);
      }
      
      toast.success('Score updated successfully');
      
      // Reset selection
      setSelectedRow(null);
      setTopic('');
      setScore('');
      
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error('Error updating score:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update score';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !scores.length) {
    return <div className="p-4 text-center">Loading scores...</div>;
  }

  if (error && !scores.length) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Scores for Student ID: {studentId}
      </h2>
      
      <div className="space-y-4">
        {/* Score Table */}
        <div className="border rounded">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr
                  key={score.id}
                  onClick={() => handleRowClick(score)}
                  className={`cursor-pointer hover:bg-gray-50 ${
                    selectedRow?.id === score.id ? "bg-blue-100" : ""
                  }`}
                >
                  <td className="py-2 px-4 border-b text-center">{score.id}</td>
                  <td className="py-2 px-4 border-b">{score.type}</td>
                  <td className="py-2 px-4 border-b text-center">{score.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        {selectedRow && (
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex justify-end space-x-2">
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Score'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CourseScoreEdit;
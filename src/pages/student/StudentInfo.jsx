import React, { useEffect, useState } from "react";
import {
  UserRound,
  School,
  BookAudio,
  Smartphone,
  Mail,
  UserRoundSearch,
  ChartArea,
} from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import useStudent from "@/src/hooks/useStudent";

function StudentInfo() {
  const { getStudentProfile, studentInfo } = useStudent()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {

    getStudentProfile()
  }, [])

  console.log(studentInfo)

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log("New Password:", newPassword);
      console.log("Confirm Password:", confirmPassword);
      closeModal();
    } else {
      setErrorMessage("Passwords do not match.");
    }
  };

  return (
    <div className="border flex flex-col gap-10">
      <div className="flex justify-between">
        {/* Student Info Display */}
        <div>
          <div className="flex">
            Student Code <UserRound /> :
          </div>
          <div>{studentInfo?.studentId}</div>
        </div>
        <div>
          <div className="flex">
            Name-Surname(Thai) <UserRound /> :
          </div>
          <div>xxxxxxxxxxxxx</div>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <div className="flex">
            Name-Surname(English) <UserRound /> :
          </div>
          <div>{studentInfo?.firstName} {studentInfo?.lastName}</div>
        </div>
        <div>
          <div className="flex">
            Faculty <School /> :
          </div>
          <div>{studentInfo?.major?.faculty?.name}</div>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <div className="flex">
            Field Of Study <BookAudio /> :
          </div>
          <div>{studentInfo?.major?.name}</div>
        </div>
        <div>
          <div className="flex">
            Phone number <Smartphone /> :
          </div>
          <div>{studentInfo?.phone}</div>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <div className="flex">
            Email <Mail /> :
          </div>
          <div>{studentInfo?.email}</div>
        </div>
        <div>
          <div className="flex">
            Adviser <UserRoundSearch /> :
          </div>
          <div>{studentInfo?.adviser?.firstName} {studentInfo?.adviser?.lastName}</div>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <div className="flex">
            Status <ChartArea /> :
          </div>
          <div>{studentInfo?.status}</div>
        </div>
        <div>
          <div className="flex">
            Password Change request <ChartArea /> :
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="border">Request Change</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password Request</DialogTitle>
                <DialogDescription>
                  Fill in your current password, then enter your new password.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label>Current Password:</label>
                  <input
                    className="border w-full p-2 rounded-md"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label>New Password:</label>
                  <input
                    className="border w-full p-2 rounded-md"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label>Confirm New Password:</label>
                  <input
                    className="border w-full p-2 rounded-md"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-500 mb-4">{errorMessage}</p>
                )}

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default StudentInfo;

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
import headerImage from '../../assets/HeaderBarContainer.png'
import InfoBox from "@/src/components/box-tools/InfoBox";

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
    <div className=" flex flex-col h-auto rounded-2xl">
      <div className="w-full min-h-20 " style={{
        backgroundImage: `url(${headerImage})`,
        backgroundSize: 'cover'
      }}></div>

      <div className="w-full h-full flex flex-col gap-14 bg-white py-6 rounded-b-2xl">

        <div className="flex h-[6rem] mx-14 gap-6 items-center">
          <div className=" w-28 h-28 rounded-full overflow-hidden">
            <img src="https://res.cloudinary.com/djudr1vzc/image/upload/v1730954704/student_Women_icon_lzt9mr.png" alt="" />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-2xl font-bold">{studentInfo?.firstName} {studentInfo?.lastName}</div>
            <div className="text-sm font-light opacity-70">{studentInfo?.status}</div>
          </div>
        </div>

        <div className="flex flex-col gap-8 px-14">
          <div className="flex w-full gap-5 ">
            <InfoBox title={<span className="flex gap-3">  <UserRound /> Student ID  </span>} detail={studentInfo?.studentId} />
          </div>

          <div className="flex w-full gap-5 ">
            <InfoBox title={<span className="flex gap-3"><UserRound /> First Name</span>} detail={studentInfo?.firstName} />
            <InfoBox title={<span className="flex gap-3"> <UserRound />Last Name </span>} detail={studentInfo?.lastName} />
          </div>

          <div className="flex w-full gap-5">
            <InfoBox title={<span className="flex gap-3"><School /> Faculty </span>} detail={studentInfo?.major?.faculty?.name} />
            <InfoBox title={<span className="flex gap-3"> <BookAudio /> Field Of Study </span>} detail={studentInfo?.major?.name} />
          </div>

          <div className="flex w-full gap-5">
            <InfoBox title={<span className="flex gap-3">  <Mail /> Email </span>} detail={studentInfo?.email} />
            <InfoBox title={<span className="flex gap-3"> <Smartphone /> Phone number </span>} detail={studentInfo?.phone} />
          </div>

          <div className="flex w-full gap-5">
            <InfoBox title={<span className="flex gap-3"><UserRoundSearch /> Adviser </span>} detail={`${studentInfo?.adviser?.firstName} ${studentInfo?.adviser?.lastName}`} />
          </div>

          <div className="flex flex-col justify-center items-center">

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="font-bold text-xl text-[#2726AD] underline">change password</button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-[#272988] font-bold text-2xl">Change Password Request</DialogTitle>
                  <DialogDescription >
                    Fill in your current password, then enter your new password.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 mt-4">
                    <label className="text-sm text-black font-medium">Current Password :</label>
                    <input
                      className="border w-full p-2 rounded-md bg-[#F2F2F2] placeholder:font-light placeholder:text-sm"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-black font-medium">New Password:</label>
                    <input
                      className="border w-full p-2 rounded-md bg-[#F2F2F2] placeholder:font-light placeholder:text-sm"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="new password"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-black font-medium">Confirm New Password:</label>
                    <input
                      className="border w-full p-2 rounded-md bg-[#F2F2F2] placeholder:font-light placeholder:text-sm"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="confirm new password"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-red-500 mb-4">{errorMessage}</p>
                  )}

                  <div className="mt-8 flex justify-end gap-4">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#272988] text-white px-4 py-2 rounded-lg"
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
    </div>
  );
}

export default StudentInfo;




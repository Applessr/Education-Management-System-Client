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
import PaymentCard from "@/src/components/student/PaymentCard";

function StudentPayment() {
  const { getStudentProfile, studentInfo } = useStudent()
  const [confirmPassword, setConfirmPassword] = useState("");

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


  return (
    <div className=" flex flex-col h-auto rounded-2xl">
      <div className="w-full min-h-20 " style={{
        backgroundImage: `url(${headerImage})`,
        backgroundSize: 'cover'
      }}></div>

      <div className="w-full h-full flex flex-col gap-14 bg-white py-6 rounded-b-2xl">

        <div className="flex flex-col gap-8 px-14">
          <div className="flex w-full gap-5 ">
            <InfoBox title={<span className="flex gap-3"> Student ID  </span>} detail={studentInfo?.studentId} />
          </div>

          <div className="flex w-full gap-5 ">
            <InfoBox title={<span className="flex gap-3">Name</span>} detail={`${studentInfo?.firstName} ${studentInfo?.lastName}`} />
            <InfoBox title={<span className="flex gap-3"> Faculty </span>} detail={studentInfo?.major?.faculty?.name} />
          </div>

          <div className="flex w-full gap-5">
            <InfoBox title={<span className="flex gap-3"> Major </span>} detail={studentInfo?.major?.name} />
            <InfoBox title={<span className="flex gap-3"> Tuition fee</span>} detail={studentInfo?.major?.tuitionFee ?? 'n/a'}
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-2xl mb-6">Payment Method</h1>
            <PaymentCard/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPayment;

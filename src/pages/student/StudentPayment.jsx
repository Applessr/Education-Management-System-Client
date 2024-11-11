import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../../components/ui/dialog";
import useStudent from "@/src/hooks/useStudent";
import headerImage from '../../assets/HeaderBarContainer.png'
import InfoBox from "@/src/components/box-tools/InfoBox";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PaymentCard from "@/src/components/student/PaymentCard";
import PaymentSuccess from "@/src/components/animations/PaymentSuccess";
import Success from "@/src/components/animations/Success";
import { Printer } from "lucide-react";

function StudentPayment() {
  const { getStudentProfile, studentInfo, getStudentPayMentStatus, studentPayMent } = useStudent();
  const token = localStorage.getItem('token');
  const semester = '1/2024';

  const [paymentStatus, setPaymentStatus] = useState('');
  const [showPaymentCard, setShowPaymentCard] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    getStudentProfile(token);
    getStudentPayMentStatus(token, semester);
  }, [token]);

  useEffect(() => {
    if (studentPayMent) {
      if (studentPayMent) {
        setPaymentStatus('Student has already paid for this semester');
        setShowPaymentCard(false);
        setPaymentDetails(studentPayMent);
      } else if (studentPayMent.message === 'No payment found for this semester') {
        setPaymentStatus('No payment found for this semester');
        setShowPaymentCard(true);
      }
    }
  }, [studentPayMent]);

  const collectorInfo = {
    name: "John Doe",
    position: "Finance Officer"
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const generateReceiptPDF = () => {
    try {
      if (!paymentDetails || !studentInfo) {
        throw new Error('Payment or student details not found');
      }

      const doc = new jsPDF();
      const logoURL = "https://res.cloudinary.com/djudr1vzc/image/upload/v1730788865/Pierre_LOGO_rgsgob.png";
      const imageWidth = 25;
      const imageHeight = 25;

      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      doc.addImage(logoURL, "PNG", 15, 10, imageWidth, imageHeight);

      doc.setFontSize(14);
      doc.text("Receipt", pageWidth / 2, 20, { align: "center" });
      doc.setFontSize(12);
      doc.text("Pierre University", pageWidth / 2, 30, { align: "center" });
      doc.setFontSize(10);
      doc.text("OFFICE OF EDUCATIONAL ADMINISTRATION", pageWidth / 2, 40, { align: "center" });
      doc.text("BANGKOK 10900, THAILAND", pageWidth / 2, 50, { align: "center" });

      const startY = 65;
      const leftX = 15;
      const rightX = 105;

      doc.text(`Name: ${studentInfo.firstName} ${studentInfo.lastName}`, leftX, startY);
      doc.text(`Student ID: ${studentInfo.studentId}`, rightX, startY);
      doc.text(`Faculty: ${studentInfo.major.faculty.name}`, leftX, startY + 10);
      doc.text(`Program: ${studentInfo.major.name}`, rightX, startY + 10);

      doc.text(`Date: ${new Date(paymentDetails.payDate).toLocaleDateString()}`, leftX, startY + 20);

      const tableStartY = startY + 30;
      doc.autoTable({
        startY: tableStartY,
        head: [['Description', 'Amount (Baht)']],
        body: [
          [{ content: `Academic year 1/2024\n\nTuition Fees\n\n\n\n\n\n\n\n\n`, styles: { halign: 'left' } }, formatCurrency(paymentDetails.amount)],
          [{ content: 'Total', styles: { fontStyle: 'bold' } }, formatCurrency(paymentDetails.amount)],
        ],
        theme: 'grid',
        headStyles: { fillColor: [238, 220, 181] },
        columnStyles: { 1: { halign: 'right' } },
      });

      const tableEndY = doc.lastAutoTable.finalY + 10;

      const footerY = tableEndY + 30;
      doc.text(`Collector ${collectorInfo.name}`, pageWidth - 15, footerY, { align: "right" });
      doc.text(`Position ${collectorInfo.position}`, pageWidth - 15, footerY + 10, { align: "right" });

      // Save PDF
      doc.save("payment_receipt.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(error.message || "Error generating PDF. Please try again.");
    }
  };


  return (
    <div className="flex flex-col h-auto rounded-2xl">
      <div className="w-full min-h-20" style={{
        backgroundImage: `url(${headerImage})`,
        backgroundSize: 'cover'
      }}></div>

      <div className="w-full h-full flex flex-col gap-14 bg-white py-6 rounded-b-2xl">
        <div className="flex flex-col gap-8 px-14">
          <div className="flex w-full gap-5 ">
            <InfoBox title={<span className="flex gap-3"> Student ID </span>} detail={studentInfo?.studentId} />
          </div>

          <div className="flex w-full gap-5 ">
            <InfoBox title={<span className="flex gap-3">Name</span>} detail={`${studentInfo?.firstName} ${studentInfo?.lastName}`} />
            <InfoBox title={<span className="flex gap-3"> Faculty </span>} detail={studentInfo?.major?.faculty?.name} />
          </div>

          <div className="flex w-full gap-5">
            <InfoBox title={<span className="flex gap-3"> Major </span>} detail={studentInfo?.major?.name} />
            <InfoBox title={<span className="flex gap-3"> Tuition fee</span>} detail={studentInfo?.major?.tuitionFee ?? 'n/a'} />
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            {/* Show PaymentCard only if not already paid */}
            {showPaymentCard ? (
              <div className="flex flex-col items-center">
                <h1 className="text-2xl mb-6">Payment Method</h1>
                <PaymentCard />
              </div>
            ) : (
              <div className="flex justify-center">
                <div><Success/></div>
                <div className="flex flex-col">
                  <h1 className="text-2xl text-[#181D27] mb-6 font-bold"> You payment for tuition has been received.</h1>
                  <h1 className="text-xl text-[#535862] mb-6">  Every subject learned with curiosity is a step toward unlocking your potential</h1>
                  <button
                    onClick={generateReceiptPDF}
                    className="flex  gap-2 self-end px-6 py-3 bg-[#039855] text-white rounded hover:bg-[#039855ac] transition-colors duration-200"
                  >
                    <Printer />
                    Download Payment Receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPayment;
import useTeacher from '@/src/hooks/useTeacher';
import React, { useEffect, useState } from 'react';
import { KeyRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { teacherChangePassword } from '@/src/api/teacher';
import { toast } from 'react-toastify';

const TeacherInfo = () => {
  const { getTeacherProfile, teacherInfo } = useTeacher();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem('token');

  useEffect(() => {
    getTeacherProfile();
  }, []);

  console.log(teacherInfo);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    try {
      await teacherChangePassword(token, {
        currentPassword,
        newPassword,
        confirmPassword
      });

      toast.success("Password changed successfully");
      closeModal();

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const InfoField = ({ label, value }) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-600">{label}</label>
      <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
        <span className="text-gray-900">{value || '-'}</span>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl text-amber-700">Profile</h1>

      {/* Main Card */}
      <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="w-full h-32 bg-gradient-to-r from-blue-200 to-amber-50" />

        {/* Content */}
        <div className="p-8">
          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-12">
            <img
              src="https://res.cloudinary.com/djudr1vzc/image/upload/v1731404272/teacher_icon2_ulmeuc.png"
              alt="Professor avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-100"
            />
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                {teacherInfo?.firstName} {teacherInfo?.lastName}
              </h2>
              <p className="text-gray-500">Professor</p>
            </div>
          </div>

          {/* Information Display */}
          <div className="space-y-6">
            <InfoField
              label="Professor ID"
              value={teacherInfo?.id}
            />

            <div className="grid grid-cols-2 gap-6">
              <InfoField
                label="First Name"
                value={teacherInfo?.firstName}
              />
              <InfoField
                label="Last Name"
                value={teacherInfo?.lastName}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InfoField
                label="Faculty"
                value={teacherInfo?.major?.faculty?.name}
              />
              <InfoField
                label="Mobile"
                value={teacherInfo?.phone}
              />
            </div>

            <InfoField
              label="E-mail"
              value={teacherInfo?.email}
            />

            <div className="pt-4">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <button
                    className="flex items-center px-4 py-2 rounded-md border border-amber-200 text-amber-600 hover:text-amber-700 hover:bg-amber-50 hover:border-amber-300 transition-colors duration-200"
                  >
                    <KeyRound className="w-4 h-4 mr-2" />
                    Reset password
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900">Reset Password</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleResetPassword} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                      <input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <DialogFooter className="mt-6 space-x-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                      >
                        Reset Password
                      </button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
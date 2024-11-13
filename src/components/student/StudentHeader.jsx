import useStudent from '@/src/hooks/useStudent'
import { Bell, X } from 'lucide-react'
import React, { useEffect, useState, useMemo } from 'react'
import Nodata from '../animations/Nodata'

const StudentHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalClosing, setIsModalClosing] = useState(false)
    const { getNotification, notification } = useStudent()
    const token = localStorage.getItem('token')

    const [readNotificationIds, setReadNotificationIds] = useState(
        JSON.parse(localStorage.getItem('readNotificationIds') || '[]')
    )

    useEffect(() => {
        getNotification(token)
    }, [token])

    const toggleModal = () => {
        if (isModalOpen) {
            setIsModalClosing(true)
            setTimeout(() => {
                setIsModalOpen(false)  
                setIsModalClosing(false)
            }, 300)
        } else {
            const newReadNotificationIds = notification?.map(noti => noti.id) || []
            setReadNotificationIds(newReadNotificationIds)
            localStorage.setItem('readNotificationIds', JSON.stringify(newReadNotificationIds))
            setIsModalOpen(true)
        }
    }

    const groupedNotifications = useMemo(() => {
        return notification?.reduce((acc, noti) => {
            const { course } = noti
            if (!acc[course.courseCode]) {
                acc[course.courseCode] = {
                    courseName: course.courseName,
                    announcements: [],
                }
            }

            course.announcements.forEach(announcement => {
                const announcementExists = acc[course.courseCode].announcements.some(
                    (existingAnnouncement) => existingAnnouncement.title === announcement.title
                )

                if (!announcementExists) {
                    acc[course.courseCode].announcements.push({
                        title: announcement.title,
                        content: announcement.content,
                        createdAt: announcement.createdAt,
                        isRead: readNotificationIds.includes(noti.id),
                    })
                }
            })
            return acc
        }, {})
    }, [notification, readNotificationIds])

    const unreadNotifications = notification?.filter(
        (noti) => !readNotificationIds.includes(noti.id)
    )

    return (
        <div>
            <header className="h-16 border-b bg-white flex items-center justify-end px-4 sticky top-0 z-10">
                <button className="p-2 mr-8 hover:bg-gray-100 rounded-full relative" onClick={toggleModal}>
                    <Bell size={24} />
                    {unreadNotifications?.length > 0 && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                </button>
            </header>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 transition-opacity ${isModalClosing ? 'opacity-0' : 'opacity-100'}`}
                    style={{ transitionDuration: '300ms' }} 
                >
                    <div className="bg-white rounded-lg shadow-lg w-[50%] h-[50%] p-4 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold mt-3">Notifications</h3>
                            <button onClick={toggleModal} className="text-gray-500 hover:bg-slate-200 rounded-full">
                                <X />
                            </button>
                        </div>
                        <div>
                            {groupedNotifications ? (
                                Object.entries(groupedNotifications).map(([courseCode, { courseName, announcements }]) => (
                                    <div key={courseCode} className="mb-4">
                                        <h4 className="text-lg font-bold text-[#2C0076]">{courseName}</h4>
                                        <ul className="max-h-[300px] overflow-y-auto">
                                            {announcements.map((announcement, index) => (
                                                <li
                                                    key={index}
                                                    className={`my-2 border-b hover:bg-[#ededed] ${announcement.isRead ? 'opacity-70' : 'bg-blue-100'}`} 
                                                >
                                                    <h5 className="font-semibold text-[#18661f]">{announcement.title}</h5>
                                                    <p>{announcement.content}</p>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(new Date(announcement.createdAt).setHours(new Date(announcement.createdAt).getHours() - 7)).toLocaleString()}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <div className='flex justify-center items-center m-auto'><Nodata /></div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudentHeader
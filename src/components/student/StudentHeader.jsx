import useStudent from '@/src/hooks/useStudent'
import { Bell } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const StudentHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { getNotification, notification } = useStudent()
    const token = localStorage.getItem('token')

    useEffect(() => {
        getNotification(token)
    }, [token])

    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState)
    }


    const groupedNotifications = notification?.reduce((acc, noti) => {
        const { course } = noti;
        if (!acc[course.courseCode]) {
            acc[course.courseCode] = {
                courseName: course.courseName,
                announcements: [],
            };
        }
        acc[course.courseCode].announcements.push({
            title: noti.title,
            content: noti.content,
            createdAt: noti.createdAt,
        });

        return acc;
    }, {});

    console.log('groupedNotifications :>> ', groupedNotifications);

    return (
        <div>
            <header className="h-16 border-b bg-white flex items-center justify-end px-4 sticky top-0 z-10">
                <button className="p-2 hover:bg-gray-100 rounded-full" onClick={toggleModal}>
                    <Bell size={24} />
                </button>
            </header>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Notifications</h3>
                            <button onClick={toggleModal} className="text-gray-500">
                                X
                            </button>
                        </div>
                        <div>
                            {groupedNotifications ? (
                                Object.entries(groupedNotifications).map(([courseCode, { courseName, announcements }]) => (
                                    <div key={courseCode} className="mb-4">
                                        <h4 className="text-lg font-bold">{courseName}</h4>
                                        <ul>
                                            {announcements.map((announcement, index) => (
                                                <li key={index} className="py-2 border-b">
                                                    <h5 className="font-semibold">{announcement.title}</h5>
                                                    <p>{announcement.content}</p>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(announcement.createdAt).toLocaleString()}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p>No notifications available</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudentHeader
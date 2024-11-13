import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useUser from '@/src/hooks/useUser'
import useAdmin from '@/src/hooks/useAdmin'
import CourseSyllabus from '@/src/components/admin/CourseSyllabus'

const AdminCourseSyllabus = () => {
    const token = localStorage.getItem('token');
    const { getFaculty, allFaculty, getMajorByFac, selectMajor } = useUser()
    const { getCourseSyllabus, courseSyllabus, setYear } = useAdmin()
    const [major, seMajor] = useState(null)


    console.log('allFaculty', allFaculty)

    useEffect(() => {
        getFaculty()
    }, [])


    const handleSelect = (facultyId) => {
        console.log('Selected Faculty ID:', facultyId)
        getMajorByFac(facultyId)
    }

    const handleSelectMajor = (majorId) => {
        console.log('Selected major ID:', majorId)
        seMajor(majorId)
    }

    const handClick = (num) => {
        setYear(num);
        getCourseSyllabus(token, major, num);
        console.log(courseSyllabus);
        console.log(token, major, num);
    };

    return (
        <div className='flex justify-center pt-6'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold'>Course Syllabus</h1>
                <div className='mt-8'>
                    <Select onValueChange={handleSelect}>
                        <SelectTrigger className="w-[300px] text-lg bg-white">
                            <SelectValue placeholder="Faculty" />
                        </SelectTrigger>
                        <SelectContent>
                            {allFaculty?.map(faculty => (
                                <SelectItem key={faculty.id} value={faculty.id}>
                                    {faculty.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='mt-8 bg-white'>
                    <Select onValueChange={handleSelectMajor}>
                        <SelectTrigger className="w-[300px] text-lg">
                            <SelectValue placeholder="Major" />
                        </SelectTrigger>
                        <SelectContent>
                            {selectMajor?.map(major => (
                                <SelectItem key={major.id} value={major.id}>
                                    {major.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex gap-3 mt-4 mb-4'>
                    <button className='btn bg-white' onClick={() => handClick('1')} >First Year</button>
                    <button className='btn  bg-white' onClick={() => handClick('2')}>Second Year</button>
                    <button className='btn  bg-white' onClick={() => handClick('3')}>Third Year</button>
                    <button className='btn  bg-white' onClick={() => handClick('4')}>Forth Year</button>
                </div>
                <CourseSyllabus />
            </div>
        </div>
    )
}

export default AdminCourseSyllabus
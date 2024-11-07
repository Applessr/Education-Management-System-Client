import React from 'react'

export default function InfoBox({ title, detail }) {
    return (
        <div className="w-1/2 flex flex-col gap-2">
            <div className="flex font-semibold">
             {title}
            </div>
            <div className="p-3 rounded-md bg-[#F9F9F9] opacity-65">
                {detail}
            </div>
        </div>
    )
}

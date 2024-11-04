/* eslint-disable react/prop-types */
const SidebarItem = ({ icon, text = "", active, onClick }) => {
    return (
        <li
            className={`text-2xl mt-10 relative flex items-center py-3 px-4 my-1 font-medium rounded-md cursor-pointer transition-colors
            ${
                active
                    ? "bg-[#ab842e] text-white"  // Dark blue background when active
                    : "text-[#ab842e] hover:bg-blue-50"  // Blue text with light blue hover
            }`}
            onClick={onClick}
        >
            {/* Icon wrapper with consistent color styling */}
            <span className={`${active ? 'text-white' : 'text-[#ab842e]'}`}>
                {icon()}
            </span>
            
            {/* Text with spacing and consistent styling */}
            {text && (
                <span className={`ml-4 ${active ? 'text-white' : 'text-[#ab842e]'}`}>
                    {text}
                </span>
            )}
        </li>
    );
};

export default SidebarItem;
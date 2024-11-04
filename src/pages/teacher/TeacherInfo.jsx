import React from 'react';

const TeacherInfo = () => {
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
              src="https://i.pinimg.com/236x/f3/c6/ee/f3c6ee1321d3e96270da512e44e0f30b.jpg" 
              alt="Professor avatar" 
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-lg font-medium">Hi Mr.Bobby</h2>
              <p className="text-gray-500">Professor</p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700">Professor ID</label>
              <input 
                type="text"
                placeholder="Your ID"
                className="w-full p-3 border rounded-md bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-gray-700">First Name</label>
                <input 
                  type="text"
                  placeholder="Your First Name"
                  className="w-full p-3 border rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Last Name</label>
                <input 
                  type="text"
                  placeholder="Your Last Name"
                  className="w-full p-3 border rounded-md bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-gray-700">Faculty</label>
                <input 
                  type="text"
                  placeholder="Your Faculty"
                  className="w-full p-3 border rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Mobile</label>
                <input 
                  type="tel"
                  placeholder="Your First Name"
                  className="w-full p-3 border rounded-md bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">E-mail</label>
              <input 
                type="email"
                placeholder="Your First Name"
                className="w-full p-3 border rounded-md bg-gray-50"
              />
            </div>

            <div className="pt-4">
              <button className="text-amber-600 hover:text-amber-700">
                Reset password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
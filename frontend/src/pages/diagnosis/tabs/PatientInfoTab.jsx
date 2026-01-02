function PatientInfoTab() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Patient Information</h3>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Edit Information
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">P-2024-001234</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">John Doe</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">January 15, 1975</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">49 years</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">Male</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Contact Information</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">+1 (555) 123-4567</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">john.doe@email.com</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">123 Main Street, City, State 12345</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">Jane Doe - +1 (555) 987-6543</p>
            </div>
          </div>

          {/* Medical Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Medical Details</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">O+</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">175 cm (5'9")</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">80 kg (176 lbs)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">BMI</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">26.1 (Overweight)</p>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Insurance Information</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">HealthCare Plus</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">HCP-2024-567890</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Number</label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">GRP-12345</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Status</label>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientInfoTab


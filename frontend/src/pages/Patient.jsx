function Patient() {
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 55,
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      condition: 'Diabetic Retinopathy',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 62,
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      condition: 'Glaucoma',
      lastVisit: '2024-01-14',
      nextAppointment: '2024-02-14',
      status: 'Monitoring',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      age: 68,
      email: 'robert.j@email.com',
      phone: '+1 (555) 345-6789',
      condition: 'Cataract',
      lastVisit: '2024-01-13',
      nextAppointment: '2024-01-25',
      status: 'Scheduled',
    },
    {
      id: 4,
      name: 'Emily Davis',
      age: 75,
      email: 'emily.d@email.com',
      phone: '+1 (555) 456-7890',
      condition: 'AMD',
      lastVisit: '2024-01-12',
      nextAppointment: '2024-02-12',
      status: 'Critical',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-1">View and manage all patient records</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
          + Add New Patient
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Conditions</option>
            <option>Diabetic Retinopathy</option>
            <option>Glaucoma</option>
            <option>Cataract</option>
            <option>AMD</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Monitoring</option>
            <option>Scheduled</option>
            <option>Critical</option>
          </select>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-500">Age: {patient.age}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                patient.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                patient.status === 'Monitoring' ? 'bg-yellow-100 text-yellow-800' :
                patient.status === 'Scheduled' ? 'bg-purple-100 text-purple-800' :
                'bg-red-100 text-red-800'
              }`}>
                {patient.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {patient.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {patient.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {patient.condition}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Last Visit:</span>
                <span className="font-medium text-gray-900">{patient.lastVisit}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Next Appointment:</span>
                <span className="font-medium text-blue-600">{patient.nextAppointment}</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                  View Details
                </button>
                <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Patient


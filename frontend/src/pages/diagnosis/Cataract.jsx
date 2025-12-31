function Cataract() {
  const patients = [
    { id: 1, name: 'Robert Johnson', age: 68, type: 'Nuclear', severity: 'Moderate', lastCheck: '2024-01-10', status: 'Scheduled' },
    { id: 2, name: 'Mary Anderson', age: 72, type: 'Cortical', severity: 'Mild', lastCheck: '2024-01-12', status: 'Monitoring' },
    { id: 3, name: 'James Taylor', age: 65, type: 'Nuclear', severity: 'Severe', lastCheck: '2024-01-08', status: 'Surgery Recommended' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cataract Monitoring</h1>
        <p className="text-gray-600 mt-1">Track cataract progression and surgery scheduling</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Total Cases</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">67</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Surgery Scheduled</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Under Monitoring</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">55</p>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Patient Cases</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Check</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">Age: {patient.age}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.severity}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.lastCheck}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      patient.status === 'Surgery Recommended' ? 'bg-red-100 text-red-800' :
                      patient.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Cataract


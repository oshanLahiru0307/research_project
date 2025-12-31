function Glaucoma() {
  const patients = [
    { id: 1, name: 'Jane Smith', age: 58, iop: '22 mmHg', lastCheck: '2024-01-11', status: 'Monitoring' },
    { id: 2, name: 'Robert Lee', age: 65, iop: '18 mmHg', lastCheck: '2024-01-13', status: 'Stable' },
    { id: 3, name: 'Patricia Garcia', age: 71, iop: '28 mmHg', lastCheck: '2024-01-09', status: 'Critical' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Glaucoma Monitoring</h1>
        <p className="text-gray-600 mt-1">Monitor intraocular pressure and optic nerve health</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Total Cases</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">32</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Average IOP</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">20.5</p>
          <p className="text-sm text-gray-500 mt-1">mmHg</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Critical Cases</p>
          <p className="text-3xl font-bold text-red-600 mt-2">5</p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IOP</th>
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
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.iop}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.lastCheck}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      patient.status === 'Critical' ? 'bg-red-100 text-red-800' :
                      patient.status === 'Monitoring' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
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

export default Glaucoma


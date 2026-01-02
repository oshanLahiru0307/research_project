function PastDiagnosesTab() {
  const pastDiagnoses = [
    {
      id: 1,
      date: '2024-01-15',
      diagnosis: 'Mild NPDR',
      disease: 'Diabetic Retinopathy',
      confidence: 78,
      doctor: 'Dr. Sarah Johnson',
      notes: 'Early signs detected. Regular monitoring recommended.',
    },
    {
      id: 2,
      date: '2023-11-20',
      diagnosis: 'Normal',
      disease: 'General Eye Exam',
      confidence: 95,
      doctor: 'Dr. Michael Chen',
      notes: 'No abnormalities detected. Follow-up in 6 months.',
    },
    {
      id: 3,
      date: '2023-08-10',
      diagnosis: 'Mild Cataract',
      disease: 'Cataract Screening',
      confidence: 65,
      doctor: 'Dr. Emily Davis',
      notes: 'Early stage cataract formation. Monitor progression.',
    },
  ]

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Past Diagnoses</h3>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            View All Records
          </button>
        </div>

        <div className="space-y-4">
          {pastDiagnoses.map((diagnosis) => (
            <div
              key={diagnosis.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{diagnosis.diagnosis}</h4>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {diagnosis.disease}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span> {new Date(diagnosis.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">Confidence</p>
                  <p className="text-lg font-bold text-indigo-600">{diagnosis.confidence}%</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Doctor:</span> {diagnosis.doctor}
                    </p>
                    <p className="text-sm text-gray-700">{diagnosis.notes}</p>
                  </div>
                  <button className="ml-4 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Summary Statistics</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Diagnoses</p>
              <p className="text-2xl font-bold text-blue-600">{pastDiagnoses.length}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Average Confidence</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(pastDiagnoses.reduce((sum, d) => sum + d.confidence, 0) / pastDiagnoses.length)}%
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Last Diagnosis</p>
              <p className="text-sm font-semibold text-purple-600">
                {new Date(pastDiagnoses[0].date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PastDiagnosesTab


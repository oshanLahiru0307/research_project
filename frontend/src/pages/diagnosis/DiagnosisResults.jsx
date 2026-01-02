import { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

function DiagnosisResults() {
  const navigate = useNavigate()
  const location = useLocation()
  const { disease, type } = useParams()
  const [activeTab, setActiveTab] = useState('results')
  const [prescribedMedicine, setPrescribedMedicine] = useState('')
  const [recommendedTests, setRecommendedTests] = useState([''])
  const [clinicalNotes, setClinicalNotes] = useState('')

  // Get image from navigation state or use placeholder
  const image = location.state?.image || 'https://via.placeholder.com/400x400?text=Medical+Scan'

  // Mock AI Assessment data
  const aiAssessment = {
    diagnosis: 'PDR',
    confidence: 92,
    recommendation: 'Advanced signs detected. Immediate specialist consultation recommended.',
  }

  const handleNewScan = () => {
    navigate(`/diagnose/${disease}/${type}`)
  }

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    alert('PDF export functionality will be implemented')
  }

  const handleAddTest = () => {
    setRecommendedTests([...recommendedTests, ''])
  }

  const handleTestChange = (index, value) => {
    const newTests = [...recommendedTests]
    newTests[index] = value
    setRecommendedTests(newTests)
  }

  const handleRemoveTest = (index) => {
    if (recommendedTests.length > 1) {
      const newTests = recommendedTests.filter((_, i) => i !== index)
      setRecommendedTests(newTests)
    }
  }

  const handleSavePrescription = () => {
    // TODO: Implement save functionality
    const prescriptionData = {
      prescribedMedicine,
      recommendedTests: recommendedTests.filter((test) => test.trim() !== ''),
      clinicalNotes,
    }
    console.log('Saving prescription:', prescriptionData)
    alert('Prescription saved successfully!')
  }

  const tabs = [
    { id: 'results', name: 'Diagnosis Results', icon: '📊' },
    { id: 'patient', name: 'Patient Info', icon: '👤' },
    { id: 'history', name: 'Medical History', icon: '📋' },
    { id: 'past', name: 'Past Diagnoses', icon: '📄' },
  ]

  return (
    <div className="space-y-6">
      {/* Top Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={handleNewScan}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>New Scan</span>
        </button>
        <button
          onClick={handleExportPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Export PDF</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'results' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Eye Scan Image */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Scan Image</h3>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt="Medical Scan"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* AI Assessment */}
              <div className="bg-pink-50 rounded-xl shadow-sm border border-pink-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">AI Assessment</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Diagnosis</p>
                    <p className="text-xl font-bold text-gray-900">{aiAssessment.diagnosis}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600">Confidence Level</p>
                      <p className="text-sm font-semibold text-gray-900">{aiAssessment.confidence}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-500 h-3 rounded-full transition-all"
                        style={{ width: `${aiAssessment.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-pink-200">
                    <p className="text-sm text-gray-700">{aiAssessment.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Doctor's Prescription */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Doctor's Prescription</h3>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quick Save</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Prescribed Medicine */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prescribed Medicine
                  </label>
                  <input
                    type="text"
                    value={prescribedMedicine}
                    onChange={(e) => setPrescribedMedicine(e.target.value)}
                    placeholder="e.g. Insulin, Metformin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Recommended Tests */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Recommended Tests
                    </label>
                    <button
                      onClick={handleAddTest}
                      className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add Test</span>
                    </button>
                  </div>
                  {recommendedTests.map((test, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <select
                        value={test}
                        onChange={(e) => handleTestChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Test {index + 1}</option>
                        <option value="CT Scan">CT Scan</option>
                        <option value="MRI Scan">MRI Scan</option>
                        <option value="Ultrasound">Ultrasound</option>
                        <option value="X-Ray">X-Ray</option>
                        <option value="Blood Test">Blood Test</option>
                        <option value="Biopsy">Biopsy</option>
                        <option value="Endoscopy">Endoscopy</option>
                        <option value="Liver Function Test">Liver Function Test</option>
                      </select>
                      {recommendedTests.length > 1 && (
                        <button
                          onClick={() => handleRemoveTest(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Clinical Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinical Notes
                  </label>
                  <textarea
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    placeholder="Add important notes about the diagnosis, treatment plan, or follow-up instructions..."
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSavePrescription}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Save Prescription</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patient' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h3>
            <p className="text-gray-600">Patient information will be displayed here.</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Medical History</h3>
            <p className="text-gray-600">Medical history will be displayed here.</p>
          </div>
        )}

        {activeTab === 'past' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Past Diagnoses</h3>
            <p className="text-gray-600">Past diagnoses will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiagnosisResults


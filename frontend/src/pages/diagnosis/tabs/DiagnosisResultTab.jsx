import { LinearProgress, Box } from '@mui/material'

<<<<<<< HEAD
function DiagnosisResultTab({ 
  image, 
  aiAssessment, 
  animatedConfidence, 
  prescribedMedicine, 
=======
function DiagnosisResultTab({
  image,
  aiAssessment,
  animatedConfidence,
  prescribedMedicine,
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
  setPrescribedMedicine,
  recommendedTests,
  handleAddTest,
  handleTestChange,
  handleRemoveTest,
  clinicalNotes,
  setClinicalNotes,
<<<<<<< HEAD
  handleSavePrescription 
=======
  handleSavePrescription
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      {/* Left Column - Eye Scan Image */}
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex-1 flex flex-col min-h-0">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Medical Scan Image</h3>
<<<<<<< HEAD
          <div className="flex-1 rounded-lg overflow-hidden bg-gray-100 min-h-0">
=======
          <div className={`flex-1 rounded-lg overflow-hidden bg-gray-100 min-h-0 border-4 ${aiAssessment.diagnosis?.toLowerCase().includes('no')
            ? 'border-green-500'
            : 'border-red-500'
            }`}>
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
            <img
              src={image}
              alt="Medical Scan"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* AI Assessment */}
<<<<<<< HEAD
        <div className="bg-pink-50 rounded-xl shadow-sm border border-pink-200 p-4 flex-shrink-0">
          <div className="flex items-center space-x-2 mb-3">
            <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-base font-semibold text-gray-900">AI Assessment</h3>
=======
        <div className={`rounded-xl shadow-sm border p-4 flex-shrink-0 transition-colors duration-300 ${aiAssessment.diagnosis?.toLowerCase().includes('no')
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
          }`}>
          <div className="flex items-center space-x-2 mb-3">
            <svg className={`w-5 h-5 ${aiAssessment.diagnosis?.toLowerCase().includes('no') ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-base font-semibold text-gray-900">Doctor Referral Validation</h3>
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Diagnosis</p>
<<<<<<< HEAD
              <p className={`text-lg font-bold ${
                aiAssessment.diagnosis?.toLowerCase().includes('no') ||
                aiAssessment.diagnosis?.toLowerCase().includes('healthy') ||
                aiAssessment.diagnosis?.toLowerCase().includes('normal')
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
=======
              <p className={`text-lg font-bold ${aiAssessment.diagnosis?.toLowerCase().includes('no')
                ? 'text-green-600'
                : 'text-red-600'
                }`}>
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
                {aiAssessment.diagnosis}
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-xs text-gray-600">Confidence Level</p>
                <p className="text-xs font-semibold text-gray-900">{Math.round(animatedConfidence)}%</p>
              </div>
              <Box sx={{ width: '100%', position: 'relative' }}>
                <LinearProgress
                  variant="determinate"
                  value={animatedConfidence}
                  sx={{
                    height: 8,
                    borderRadius: '9999px',
                    backgroundColor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: '9999px',
<<<<<<< HEAD
                      background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
=======
                      background: aiAssessment.diagnosis?.toLowerCase().includes('no')
                        ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                        : 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
                      transition: 'transform 0.1s linear',
                    },
                  }}
                />
              </Box>
            </div>
<<<<<<< HEAD
            <div className="bg-white rounded-lg p-2.5 border border-pink-200">
              <p className="text-xs text-gray-700">{aiAssessment.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
=======

            {/* AI Expert Observation (Doctor Validation Model Report) - Simplified Summary for Results Tab */}
            {aiAssessment.diagnosis?.toLowerCase().includes('liver') && (
              <div className="bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 p-4 mt-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-tight">Expert Pathology Insight</h3>
                  </div>
                  <button
                    onClick={() => document.querySelector('[data-tab-id="liver_expert"]')?.click()}
                    className="text-[10px] bg-white text-indigo-600 px-3 py-1.5 rounded-md border border-indigo-200 font-black hover:bg-indigo-50 transition-all shadow-sm active:scale-95"
                  >
                    VIEW FULL BREAKDOWN
                  </button>
                </div>
                <div className="bg-white/60 rounded-lg p-3 border border-indigo-100 italic">
                  <p className="text-[11px] text-indigo-800 leading-snug font-medium">
                    {aiAssessment.validation_report
                      ? "Advanced pathology patterns and symptoms have been identified for this liver scan. Click above to view the structured expert visual analysis."
                      : "Generating specialized visual insights based on identified liver pathology patterns..."}
                  </p>
                </div>
              </div>
            )}
          </div> {/* End space-y-3 */}
        </div> {/* End AI Assessment */}
      </div> {/* End Left Column */}
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64

      {/* Right Column - Doctor's Prescription */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-base font-semibold text-gray-900">Doctor's Prescription</h3>
          </div>
          <button className="flex items-center space-x-1 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Quick Save</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-0">
          {/* Prescribed Medicine */}
          <div className="flex-shrink-0">
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Prescribed Medicine
            </label>
            <input
              type="text"
              value={prescribedMedicine}
              onChange={(e) => setPrescribedMedicine(e.target.value)}
              placeholder="e.g. Insulin, Metformin"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Recommended Tests */}
          <div className="flex-shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Recommended Tests
              </label>
              <button
                onClick={handleAddTest}
                className="flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-700"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Test</span>
              </button>
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {recommendedTests.map((test, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <select
                    value={test}
                    onChange={(e) => handleTestChange(index, e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="flex-1 flex flex-col min-h-0">
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Clinical Notes
            </label>
            <textarea
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="Add important notes about the diagnosis, treatment plan, or follow-up instructions..."
              className="flex-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none min-h-0"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSavePrescription}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md text-sm flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Save Prescription</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DiagnosisResultTab
<<<<<<< HEAD

=======
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64

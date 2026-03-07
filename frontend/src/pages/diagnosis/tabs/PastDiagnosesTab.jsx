import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiagnosesThunk } from '../../../state/diagnosesSlice'

function PastDiagnosesTab() {
  const dispatch = useDispatch()
  const { items: pastDiagnoses, status, error } = useSelector((state) => state.diagnoses)
  const [openActions, setOpenActions] = useState(null)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDiagnosesThunk())
    }
  }, [dispatch, status])

  const handleViewClick = (id, e) => {
    e.stopPropagation()
    setOpenActions(openActions === id ? null : id)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.actions-dropdown')) {
        setOpenActions(null)
      }
    }

    if (openActions) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openActions])

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-900">Diagnosis History</h3>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">IMAGE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">DISEASE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">DIAGNOSIS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">EYE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">DATE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CONFIDENCE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {status === 'loading' && pastDiagnoses.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-sm text-gray-500">
                    Loading diagnoses...
                  </td>
                </tr>
              )}
              {status === 'succeeded' && pastDiagnoses.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-sm text-gray-500">
                    No past diagnoses found.
                  </td>
                </tr>
              )}
              {pastDiagnoses.map((diagnosis) => {
                const imageSrc = diagnosis.imageUrl || 'https://via.placeholder.com/64x64?text=Scan'
                const date = diagnosis.createdAt
                  ? new Date(diagnosis.createdAt).toLocaleDateString()
                  : ''
                return (
                <tr key={diagnosis._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                      <img
                        src={imageSrc}
                        alt="Eye scan"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64x64?text=Eye+Scan'
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{diagnosis.disease}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{diagnosis.diagnosis}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <svg 
                        className="w-4 h-4 text-gray-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{diagnosis.eye}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{date}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        diagnosis.status === 'Checked' ? 'text-green-600' : 'text-orange-600'
                      }`}
                    >
                      {diagnosis.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {diagnosis.confidence != null ? `${diagnosis.confidence}%` : 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap relative actions-dropdown">
                    <button
                      onClick={(e) => handleViewClick(diagnosis._id, e)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      View
                      <svg
                        className={`w-4 h-4 transition-transform ${openActions === diagnosis.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openActions === diagnosis._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg transition-colors"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Download Report
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PastDiagnosesTab


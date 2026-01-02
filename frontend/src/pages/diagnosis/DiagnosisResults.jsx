import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import DiagnosisResultTab from './tabs/DiagnosisResultTab'
import PatientInfoTab from './tabs/PatientInfoTab'
import MedicalHistoryTab from './tabs/MedicalHistoryTab'
import PastDiagnosesTab from './tabs/PastDiagnosesTab'

function DiagnosisResults() {
  const navigate = useNavigate()
  const location = useLocation()
  const { disease, type } = useParams()
  const [activeTab, setActiveTab] = useState('results')
  const [prescribedMedicine, setPrescribedMedicine] = useState('')
  const [recommendedTests, setRecommendedTests] = useState([''])
  const [clinicalNotes, setClinicalNotes] = useState('')
  const [animatedConfidence, setAnimatedConfidence] = useState(0)

  // Get image from navigation state or use placeholder
  const image = location.state?.image || 'https://via.placeholder.com/400x400?text=Medical+Scan'

  // Mock AI Assessment data
  const aiAssessment = {
    diagnosis: 'PDR',
    confidence: 92,
    recommendation: 'Advanced signs detected. Immediate specialist consultation recommended.',
  }

  const confidenceValue = aiAssessment.confidence

  const animationRef = useRef(null)
  const hasAnimatedRef = useRef(false)

  // Animate confidence bar on mount
  useEffect(() => {
    if (activeTab === 'results' && !hasAnimatedRef.current) {
      // Cancel any existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      // Start animation after a brief delay
      const timeoutId = setTimeout(() => {
        // Animate from 0 to target value over 2 seconds
        const duration = 2000 // 2 seconds
        const startTime = Date.now()
        
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Ease-out animation function
          const easeOut = 1 - Math.pow(1 - progress, 3)
          setAnimatedConfidence(easeOut * confidenceValue)
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate)
          } else {
            animationRef.current = null
            hasAnimatedRef.current = true
          }
        }
        
        animationRef.current = requestAnimationFrame(animate)
      }, 100)

      return () => {
        clearTimeout(timeoutId)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    } else if (activeTab !== 'results') {
      // Reset when switching away from results tab
      hasAnimatedRef.current = false
      setTimeout(() => {
        setAnimatedConfidence(0)
      }, 0)
    }
  }, [activeTab, confidenceValue])

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
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Top Action Buttons */}
      <div className="flex justify-end space-x-3 mb-4">
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
      <div className="border-b border-gray-200 flex-shrink-0">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
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
      <div className="flex-1 overflow-hidden mt-4">
        {activeTab === 'results' && (
          <DiagnosisResultTab
            image={image}
            aiAssessment={aiAssessment}
            animatedConfidence={animatedConfidence}
            prescribedMedicine={prescribedMedicine}
            setPrescribedMedicine={setPrescribedMedicine}
            recommendedTests={recommendedTests}
            handleAddTest={handleAddTest}
            handleTestChange={handleTestChange}
            handleRemoveTest={handleRemoveTest}
            clinicalNotes={clinicalNotes}
            setClinicalNotes={setClinicalNotes}
            handleSavePrescription={handleSavePrescription}
          />
        )}

        {activeTab === 'patient' && <PatientInfoTab />}

        {activeTab === 'history' && <MedicalHistoryTab />}

        {activeTab === 'past' && <PastDiagnosesTab />}
      </div>
    </div>
  )
}

export default DiagnosisResults


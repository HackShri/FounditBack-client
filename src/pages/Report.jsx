import { Link } from "react-router-dom"
import ReportItemForm from "../components/ReportItemForm"

const Report = ({ type }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ReportItemForm type={type} />
      </div>
    </div>
  )
}

export default Report

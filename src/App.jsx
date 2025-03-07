import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, DollarSign, FileText, Activity, PieChart, Search } from 'lucide-react';

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Jane Smith", role: "Registered Nurse", hourlyRate: 45, hoursWorked: 37.5, overtime: 2.5 },
    { id: 2, name: "John Davis", role: "Home Health Aide", hourlyRate: 22, hoursWorked: 40, overtime: 5 },
    { id: 3, name: "Maria Garcia", role: "Physical Therapist", hourlyRate: 55, hoursWorked: 32, overtime: 0 },
    { id: 4, name: "David Chen", role: "Caregiver", hourlyRate: 25, hoursWorked: 38, overtime: 0 },
  ]);
  
  const [payPeriod, setPayPeriod] = useState("March 1-15, 2025");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  useEffect(() => {
    // Simulating AI analysis when employees data changes
    const generateAiInsights = () => {
      return {
        timePatterns: "3 employees consistently work overtime on weekends",
        costSaving: "Scheduling optimization could save $750/month",
        compliance: "All employees are within legal working hour limits",
        suggestion: "Consider adjusting staffing for weekend shifts"
      };
    };
    
    setAiSuggestions(generateAiInsights());
  }, [employees]);

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculatePay = (hourlyRate, hoursWorked, overtime) => {
    const regularPay = hourlyRate * hoursWorked;
    const overtimePay = overtime * hourlyRate * 1.5;
    return regularPay + overtimePay;
  };

  const generatePayroll = () => {
    alert("Payroll generated and ready for approval");
  };

  const automateSchedule = () => {
    alert("AI is optimizing the schedule based on historical patterns");
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CarePayroll AI</h1>
          <div className="flex space-x-4">
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-100">
              Help
            </button>
            <button className="bg-indigo-800 px-4 py-2 rounded-md font-medium hover:bg-indigo-700">
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Payroll Dashboard</h2>
            <p className="text-gray-600">Pay Period: {payPeriod}</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={generatePayroll}
              className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 flex items-center"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Generate Payroll
            </button>
            <button 
              onClick={automateSchedule}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 flex items-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              AI Schedule
            </button>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees by name or role..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* AI Insights Card */}
          <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-3">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-indigo-600" />
              AI Insights
            </h3>
            {aiSuggestions && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-indigo-50 p-3 rounded-md">
                  <h4 className="font-medium text-indigo-800">Time Patterns</h4>
                  <p className="text-sm text-gray-700">{aiSuggestions.timePatterns}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="font-medium text-green-800">Cost Saving Opportunity</h4>
                  <p className="text-sm text-gray-700">{aiSuggestions.costSaving}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-blue-800">Compliance Check</h4>
                  <p className="text-sm text-gray-700">{aiSuggestions.compliance}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md">
                  <h4 className="font-medium text-purple-800">AI Suggestion</h4>
                  <p className="text-sm text-gray-700">{aiSuggestions.suggestion}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Employee List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-600" />
              Caregiver Payroll Details
            </h3>
            <div className="text-sm text-gray-600">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr 
                  key={employee.id} 
                  className={`hover:bg-gray-50 ${selectedEmployee?.id === employee.id ? 'bg-indigo-50' : ''}`}
                  onClick={() => handleEmployeeSelect(employee)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {employee.hoursWorked}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {employee.overtime > 0 ? 
                      <span className="text-yellow-600">{employee.overtime}</span> : 
                      <span>0</span>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    ${employee.hourlyRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${calculatePay(employee.hourlyRate, employee.hoursWorked, employee.overtime).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Selected Employee Details */}
        {selectedEmployee && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Employee Details: {selectedEmployee.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-600">Time Analysis</h4>
                <p className="font-medium text-gray-800">Regular: {selectedEmployee.hoursWorked}h</p>
                <p className="font-medium text-gray-800">Overtime: {selectedEmployee.overtime}h</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-2" 
                    style={{ width: `${(selectedEmployee.hoursWorked / (selectedEmployee.hoursWorked + selectedEmployee.overtime)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-600">Payment Calculation</h4>
                <p className="font-medium text-gray-800">Regular: ${(selectedEmployee.hourlyRate * selectedEmployee.hoursWorked).toFixed(2)}</p>
                <p className="font-medium text-gray-800">Overtime: ${(selectedEmployee.overtime * selectedEmployee.hourlyRate * 1.5).toFixed(2)}</p>
                <p className="font-medium text-indigo-700 mt-1">Total: ${calculatePay(selectedEmployee.hourlyRate, selectedEmployee.hoursWorked, selectedEmployee.overtime).toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-600">AI Recommendations</h4>
                <p className="text-sm text-gray-700">Based on historical data, this employee could benefit from a more balanced schedule with fewer weekend shifts.</p>
                <button className="mt-2 text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                  Generate Optimal Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 p-4 border-t mt-6">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <p>CarePayroll AI © 2025 - Streamlining healthcare workforce management</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
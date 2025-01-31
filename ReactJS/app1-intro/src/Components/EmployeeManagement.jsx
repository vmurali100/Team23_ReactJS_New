import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// MongoDB API URLs
const MONGO_API_URL = 'https://data.mongodb-api.com/app/data-vkcqn/endpoint/data/v1/action'; // Replace with your MongoDB Data API endpoint
const API_KEY = 'c02a1317-2127-416c-8616-a207c4c237e1'; // Replace with your actual MongoDB Atlas Data API Key

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formValues, setFormValues] = useState({ name: '', department: '', role: '', salary: '', status: '' });

  // Fetch employees from MongoDB API
  useEffect(() => {
    const fetchEmployees = async () => {
      console.log(MONGO_API_URL)
      const response = await fetch(MONGO_API_URL + '/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY,  // MongoDB Data API Key
          mode: 'no-cors'
        },
        body: JSON.stringify({
          dataSource: 'Cluster0', // Replace with your cluster name
          database: 'myDatabase', // Your database name
          collection: 'employees', // Your collection name
        }),
      });
      const data = await response.json();
      setEmployees(data.documents); // Assuming "documents" is the key containing the results
    };

    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormValues(employee);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await fetch(MONGO_API_URL + '/deleteOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY,
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'myDatabase',
          collection: 'employees',
          filter: { id }, // Assuming you use "id" to uniquely identify employees
        }),
      });
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleSave = async () => {
    const newEmployee = { ...formValues };

    if (editingEmployee) {
      // Update employee
      await fetch("mongodb+srv://vishal:vishal2806@cluster0.mmqwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" + '/updateOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': "mongodb+srv://vishal:vishal2806@cluster0.mmqwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'myDatabase',
          collection: 'employees',
          filter: { id: editingEmployee.id }, // Filter for the specific employee
          update: { $set: newEmployee }, // Use MongoDB update syntax
        }),
      });
      setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? { ...emp, ...newEmployee } : emp)));
    } else {
      // Add new employee
      await fetch("mongodb+srv://vishal:vishal2806@cluster0.mmqwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"+ '/insertOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key':"mongodb+srv://vishal:vishal2806@cluster0.mmqwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'myDatabase',
          collection: 'employees',
          document: newEmployee,
        }),
      });
      setEmployees([...employees, newEmployee]);
    }

    setEditingEmployee(null);
    setFormValues({ name: '', department: '', role: '', salary: '', status: '' });
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (departmentFilter ? emp.department === departmentFilter : true) &&
    (!statusFilter || emp.status === 'Active')
  );

  const columns = [
    { headerName: 'Employee ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Department', field: 'department', sortable: true, filter: true },
    { headerName: 'Role', field: 'role', sortable: true, filter: true },
    { headerName: 'Salary', field: 'salary', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRendererFramework: (params) => (
        <>
          <button onClick={() => handleEdit(params.data)}>Edit</button>
          <button onClick={() => handleDelete(params.data.id)}>Delete</button>
        </>
      )
    }
  ];

  return (
    <div style={{ padding: '20px', background: '#f4f4f4', minHeight: '100vh' }}>
      <div>
        <h2>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
        <input type="text" placeholder="Name" value={formValues.name} onChange={e => setFormValues({ ...formValues, name: e.target.value })} />
        <input type="text" placeholder="Department" value={formValues.department} onChange={e => setFormValues({ ...formValues, department: e.target.value })} />
        <input type="text" placeholder="Role" value={formValues.role} onChange={e => setFormValues({ ...formValues, role: e.target.value })} />
        <input type="number" placeholder="Salary" value={formValues.salary} onChange={e => setFormValues({ ...formValues, salary: e.target.value })} />
        <select value={formValues.status} onChange={e => setFormValues({ ...formValues, status: e.target.value })}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={handleSave}>{editingEmployee ? 'Save' : 'Add'}</button>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <input type="text" placeholder="Search by name" onChange={e => setSearchText(e.target.value)} />
        <select onChange={e => setDepartmentFilter(e.target.value)}>
          <option value="">Filter by Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
        </select>
        <label>
          <input type="checkbox" checked={statusFilter} onChange={e => setStatusFilter(e.target.checked)} /> Active Only
        </label>
      </div>
      
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact rowData={filteredEmployees} columnDefs={columns} pagination={true} paginationPageSize={5} />
      </div>
    </div>
  );
};

export default EmployeeManagement;
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Search, Users, UserCheck, UserX, TrendingUp, Calendar, Mail, Phone, MapPin, Eye, Plus, Save, X } from 'lucide-react'

interface Student {
  id: number
  name: string
  rollNumber: string
  className: string
  email: string
  phone: string
  address: string
  photo?: string
  dateOfBirth: string
  parentName: string
  parentPhone: string
  marks: {
    subject: string
    score: number
    maxMarks: number
    grade: string
  }[]
  attendance: {
    totalDays: number
    presentDays: number
    absentDays: number
    percentage: number
  }
  recentAttendance: {
    date: string
    status: 'present' | 'absent'
  }[]
}

// New interface for adding students
interface NewStudent {
  name: string
  rollNumber: string
  className: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  parentName: string
  parentPhone: string
}

export const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showAddStudent, setShowAddStudent] = useState(false)

  // New student form state
  const [newStudent, setNewStudent] = useState<NewStudent>({
    name: '',
    rollNumber: '',
    className: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    parentName: '',
    parentPhone: ''
  })

  // Form validation errors
  const [formErrors, setFormErrors] = useState<Partial<NewStudent>>({})

  // Mock data - replace with actual API calls
  const mockStudents: Student[] = [
    {
      id: 1,
      name: 'John Doe',
      rollNumber: '001',
      className: 'Class 10-A',
      email: 'john.doe@email.com',
      phone: '+91 9876543210',
      address: '123 Main St, City, State 12345',
      photo: '/api/placeholder/150/150',
      dateOfBirth: '2008-05-15',
      parentName: 'Robert Doe',
      parentPhone: '+91 9876543211',
      marks: [
        { subject: 'Mathematics', score: 85, maxMarks: 100, grade: 'A' },
        { subject: 'Science', score: 92, maxMarks: 100, grade: 'A+' },
        { subject: 'English', score: 78, maxMarks: 100, grade: 'B' },
        { subject: 'History', score: 88, maxMarks: 100, grade: 'A' },
        { subject: 'Geography', score: 82, maxMarks: 100, grade: 'A' },
      ],
      attendance: {
        totalDays: 180,
        presentDays: 165,
        absentDays: 15,
        percentage: 91.67
      },
      recentAttendance: [
        { date: '2025-07-18', status: 'present' },
        { date: '2025-07-17', status: 'present' },
        { date: '2025-07-16', status: 'absent' },
        { date: '2025-07-15', status: 'present' },
        { date: '2025-07-14', status: 'present' },
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNumber: '002',
      className: 'Class 10-A',
      email: 'jane.smith@email.com',
      phone: '+91 9876543220',
      address: '456 Oak Ave, City, State 12345',
      photo: '/api/placeholder/150/150',
      dateOfBirth: '2008-03-22',
      parentName: 'Mary Smith',
      parentPhone: '+91 9876543221',
      marks: [
        { subject: 'Mathematics', score: 95, maxMarks: 100, grade: 'A+' },
        { subject: 'Science', score: 88, maxMarks: 100, grade: 'A' },
        { subject: 'English', score: 94, maxMarks: 100, grade: 'A+' },
        { subject: 'History', score: 90, maxMarks: 100, grade: 'A' },
        { subject: 'Geography', score: 87, maxMarks: 100, grade: 'A' },
      ],
      attendance: {
        totalDays: 180,
        presentDays: 175,
        absentDays: 5,
        percentage: 97.22
      },
      recentAttendance: [
        { date: '2025-07-18', status: 'present' },
        { date: '2025-07-17', status: 'present' },
        { date: '2025-07-16', status: 'present' },
        { date: '2025-07-15', status: 'present' },
        { date: '2025-07-14', status: 'present' },
      ]
    },
    {
      id: 3,
      name: 'Bob Johnson',
      rollNumber: '003',
      className: 'Class 10-B',
      email: 'bob.johnson@email.com',
      phone: '+91 9876543230',
      address: '789 Pine Rd, City, State 12345',
      photo: '/api/placeholder/150/150',
      dateOfBirth: '2008-08-10',
      parentName: 'Lisa Johnson',
      parentPhone: '+91 9876543231',
      marks: [
        { subject: 'Mathematics', score: 75, maxMarks: 100, grade: 'B' },
        { subject: 'Science', score: 82, maxMarks: 100, grade: 'A' },
        { subject: 'English', score: 70, maxMarks: 100, grade: 'B' },
        { subject: 'History', score: 78, maxMarks: 100, grade: 'B' },
        { subject: 'Geography', score: 72, maxMarks: 100, grade: 'B' },
      ],
      attendance: {
        totalDays: 180,
        presentDays: 152,
        absentDays: 28,
        percentage: 84.44
      },
      recentAttendance: [
        { date: '2025-07-18', status: 'present' },
        { date: '2025-07-17', status: 'absent' },
        { date: '2025-07-16', status: 'present' },
        { date: '2025-07-15', status: 'absent' },
        { date: '2025-07-14', status: 'present' },
      ]
    },
    {
      id: 4,
      name: 'Alice Brown',
      rollNumber: '004',
      className: 'Class 9-A',
      email: 'alice.brown@email.com',
      phone: '+91 9876543240',
      address: '321 Elm St, City, State 12345',
      photo: '/api/placeholder/150/150',
      dateOfBirth: '2009-12-05',
      parentName: 'David Brown',
      parentPhone: '+91 9876543241',
      marks: [
        { subject: 'Mathematics', score: 88, maxMarks: 100, grade: 'A' },
        { subject: 'Science', score: 85, maxMarks: 100, grade: 'A' },
        { subject: 'English', score: 92, maxMarks: 100, grade: 'A+' },
        { subject: 'History', score: 86, maxMarks: 100, grade: 'A' },
        { subject: 'Geography', score: 89, maxMarks: 100, grade: 'A' },
      ],
      attendance: {
        totalDays: 180,
        presentDays: 168,
        absentDays: 12,
        percentage: 93.33
      },
      recentAttendance: [
        { date: '2025-07-18', status: 'present' },
        { date: '2025-07-17', status: 'present' },
        { date: '2025-07-16', status: 'present' },
        { date: '2025-07-15', status: 'present' },
        { date: '2025-07-14', status: 'absent' },
      ]
    }
  ]

  const classes = ['Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B', 'Class 11-A', 'Class 11-B', 'Class 12-A', 'Class 12-B']
  const classesForFilter = ['all', ...classes]

  // Load students
  useEffect(() => {
    setStudents(mockStudents)
    setFilteredStudents(mockStudents)
  }, [])

  // Filter students
  useEffect(() => {
    let filtered = students

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.includes(searchTerm) ||
        student.className.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by class
    if (selectedClass !== 'all') {
      filtered = filtered.filter(student => student.className === selectedClass)
    }

    setFilteredStudents(filtered)
  }, [searchTerm, selectedClass, students])

  const openProfile = (student: Student) => {
    setSelectedStudent(student)
    setShowProfile(true)
  }

  const openAddStudent = () => {
    setShowAddStudent(true)
    setFormErrors({})
    setNewStudent({
      name: '',
      rollNumber: '',
      className: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      parentName: '',
      parentPhone: ''
    })
  }

  const closeAddStudent = () => {
    setShowAddStudent(false)
    setFormErrors({})
  }

  // Handle form input changes
  const handleInputChange = (field: keyof NewStudent, value: string) => {
    setNewStudent(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<NewStudent> = {}
    
    if (!newStudent.name.trim()) errors.name = 'Name is required'
    if (!newStudent.rollNumber.trim()) errors.rollNumber = 'Roll number is required'
    if (!newStudent.className) errors.className = 'Class is required'
    if (!newStudent.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(newStudent.email)) errors.email = 'Invalid email format'
    if (!newStudent.phone.trim()) errors.phone = 'Phone number is required'
    if (!newStudent.address.trim()) errors.address = 'Address is required'
    if (!newStudent.dateOfBirth) errors.dateOfBirth = 'Date of birth is required'
    if (!newStudent.parentName.trim()) errors.parentName = 'Parent/Guardian name is required'
    if (!newStudent.parentPhone.trim()) errors.parentPhone = 'Parent phone number is required'

    // Check if roll number already exists
    if (newStudent.rollNumber && students.some(student => student.rollNumber === newStudent.rollNumber)) {
      errors.rollNumber = 'Roll number already exists'
    }

    // Check if email already exists
    if (newStudent.email && students.some(student => student.email === newStudent.email)) {
      errors.email = 'Email already exists'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Create new student object
    const studentToAdd: Student = {
      id: Math.max(...students.map(s => s.id)) + 1,
      ...newStudent,
      photo: '/api/placeholder/150/150',
      marks: [], // Empty initially
      attendance: {
        totalDays: 0,
        presentDays: 0,
        absentDays: 0,
        percentage: 0
      },
      recentAttendance: []
    }

    // Add student to the list
    const updatedStudents = [...students, studentToAdd]
    setStudents(updatedStudents)
    setFilteredStudents(updatedStudents)

    // Close dialog and show success message
    setShowAddStudent(false)
    // You can add a toast notification here
    alert('Student added successfully!')
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'A':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'B':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'C':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      default:
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    }
  }

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400'
    if (percentage >= 75) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const StudentProfile = ({ student }: { student: Student }) => {
    const totalMarks = student.marks.reduce((sum, mark) => sum + mark.score, 0)
    const maxTotalMarks = student.marks.reduce((sum, mark) => sum + mark.maxMarks, 0)
    const overallPercentage = maxTotalMarks > 0 ? (totalMarks / maxTotalMarks) * 100 : 0

    return (
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {/* Basic Info */}
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={student.photo} alt={student.name} />
              <AvatarFallback className="text-lg">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Roll Number</p>
                  <p className="font-medium">{student.rollNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <p className="font-medium">{student.className}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Overall Percentage</p>
                  <p className="font-medium">{overallPercentage.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{student.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parent/Guardian</p>
                  <p className="font-medium">{student.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parent Phone</p>
                  <p className="font-medium">{student.parentPhone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{student.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Performance */}
          {student.marks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Academic Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.marks.map((mark, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <p className="font-medium">{mark.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {mark.score} / {mark.maxMarks} marks
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="font-medium">{((mark.score / mark.maxMarks) * 100).toFixed(1)}%</p>
                        </div>
                        <Badge className={getGradeColor(mark.grade)}>
                          {mark.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Attendance */}
          {student.attendance.totalDays > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Attendance Record
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{student.attendance.totalDays}</p>
                    <p className="text-sm text-muted-foreground">Total Days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {student.attendance.presentDays}
                    </p>
                    <p className="text-sm text-muted-foreground">Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {student.attendance.absentDays}
                    </p>
                    <p className="text-sm text-muted-foreground">Absent</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${getAttendanceColor(student.attendance.percentage)}`}>
                      {student.attendance.percentage.toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Percentage</p>
                  </div>
                </div>
                
                {student.recentAttendance.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Recent Attendance</p>
                    <div className="grid grid-cols-5 gap-2">
                      {student.recentAttendance.map((record, index) => (
                        <div key={index} className="text-center p-2 border rounded">
                          <p className="text-xs text-muted-foreground">
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                          <Badge 
                            variant={record.status === 'present' ? 'default' : 'destructive'}
                            className="mt-1"
                          >
                            {record.status === 'present' ? 'P' : 'A'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Show message for new students */}
          {student.marks.length === 0 && student.attendance.totalDays === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Academic records and attendance will be available once the student starts attending classes.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    )
  }

  // Add Student Form Component
  const AddStudentForm = () => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Student</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={newStudent.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter student's full name"
                className={formErrors.name ? 'border-red-500' : ''}
              />
              {formErrors.name && <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <Label htmlFor="rollNumber">Roll Number *</Label>
              <Input
                id="rollNumber"
                value={newStudent.rollNumber}
                onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                placeholder="Enter roll number"
                className={formErrors.rollNumber ? 'border-red-500' : ''}
              />
              {formErrors.rollNumber && <p className="text-sm text-red-500 mt-1">{formErrors.rollNumber}</p>}
            </div>
            <div>
              <Label htmlFor="className">Class *</Label>
              <Select value={newStudent.className} onValueChange={(value) => handleInputChange('className', value)}>
                <SelectTrigger className={formErrors.className ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.className && <p className="text-sm text-red-500 mt-1">{formErrors.className}</p>}
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={newStudent.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={formErrors.dateOfBirth ? 'border-red-500' : ''}
              />
              {formErrors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{formErrors.dateOfBirth}</p>}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newStudent.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="student@email.com"
                className={formErrors.email ? 'border-red-500' : ''}
              />
              {formErrors.email && <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={newStudent.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 9876543210"
                className={formErrors.phone ? 'border-red-500' : ''}
              />
              {formErrors.phone && <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={newStudent.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter full address"
              className={formErrors.address ? 'border-red-500' : ''}
              rows={3}
            />
            {formErrors.address && <p className="text-sm text-red-500 mt-1">{formErrors.address}</p>}
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parentName">Parent/Guardian Name *</Label>
              <Input
                id="parentName"
                value={newStudent.parentName}
                onChange={(e) => handleInputChange('parentName', e.target.value)}
                placeholder="Enter parent/guardian name"
                className={formErrors.parentName ? 'border-red-500' : ''}
              />
              {formErrors.parentName && <p className="text-sm text-red-500 mt-1">{formErrors.parentName}</p>}
            </div>
            <div>
              <Label htmlFor="parentPhone">Parent Phone Number *</Label>
              <Input
                id="parentPhone"
                value={newStudent.parentPhone}
                onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                placeholder="+91 9876543210"
                className={formErrors.parentPhone ? 'border-red-500' : ''}
              />
              {formErrors.parentPhone && <p className="text-sm text-red-500 mt-1">{formErrors.parentPhone}</p>}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button type="button" variant="outline" onClick={closeAddStudent}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </form>
    </DialogContent>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Students</h2>
          <p className="text-muted-foreground">
            View and manage student information, marks, and attendance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-3 py-1">
            {filteredStudents.length} students
          </Badge>
          <Button onClick={openAddStudent}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, roll number, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classesForFilter.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls === 'all' ? 'All Classes' : cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.photo} alt={student.name} />
                  <AvatarFallback>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
                  <p className="text-sm text-muted-foreground">{student.className}</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Attendance</p>
                  {student.attendance.totalDays > 0 ? (
                    <p className={`font-medium ${getAttendanceColor(student.attendance.percentage)}`}>
                      {student.attendance.percentage.toFixed(1)}%
                    </p>
                  ) : (
                    <p className="text-muted-foreground text-xs">Not available</p>
                  )}
                </div>
                <div>
                  <p className="text-muted-foreground">Overall Grade</p>
                  {student.marks.length > 0 ? (
                    <Badge className={getGradeColor(
                      student.marks.reduce((sum, mark) => sum + mark.score, 0) / 
                      student.marks.reduce((sum, mark) => sum + mark.maxMarks, 0) >= 0.9 ? 'A+' :
                      student.marks.reduce((sum, mark) => sum + mark.score, 0) / 
                      student.marks.reduce((sum, mark) => sum + mark.maxMarks, 0) >= 0.8 ? 'A' : 'B'
                    )}>
                      {student.marks.reduce((sum, mark) => sum + mark.score, 0) / 
                       student.marks.reduce((sum, mark) => sum + mark.maxMarks, 0) >= 0.9 ? 'A+' :
                       student.marks.reduce((sum, mark) => sum + mark.score, 0) / 
                       student.marks.reduce((sum, mark) => sum + mark.maxMarks, 0) >= 0.8 ? 'A' : 'B'}
                    </Badge>
                  ) : (
                    <Badge variant="outline">New</Badge>
                  )}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => openProfile(student)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No students found */}
      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Students Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={openAddStudent}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Student
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Student Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        {selectedStudent && <StudentProfile student={selectedStudent} />}
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
        <AddStudentForm />
      </Dialog>
    </div>
  )
}

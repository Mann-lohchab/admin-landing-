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
import { Checkbox } from '@/components/ui/checkbox'
import { Search, Users, GraduationCap, BookOpen, Calendar, Mail, Phone, MapPin, Eye, Star, Award, Plus, Save, X } from 'lucide-react'

interface Teacher {
  id: number
  name: string
  employeeId: string
  email: string
  phone: string
  address: string
  photo?: string
  dateOfBirth: string
  joiningDate: string
  qualification: string
  experience: number
  department: string
  specialization: string[]
  subjects: string[]
  classes: string[]
  salary: number
  performance: {
    rating: number
    reviews: {
      academic_year: string
      rating: number
      feedback: string
    }[]
  }
  schedule: {
    day: string
    periods: {
      time: string
      subject: string
      class: string
    }[]
  }[]
  achievements: string[]
}

interface NewTeacher {
  name: string
  employeeId: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  joiningDate: string
  qualification: string
  experience: number
  department: string
  specialization: string[]
  subjects: string[]
  classes: string[]
  salary: number
}

export const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showAddTeacher, setShowAddTeacher] = useState(false)

  const [newTeacher, setNewTeacher] = useState<NewTeacher>({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    joiningDate: '',
    qualification: '',
    experience: 0,
    department: '',
    specialization: [],
    subjects: [],
    classes: [],
    salary: 0
  })

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NewTeacher, string>>>({})

  const departments = ['Science', 'Languages', 'Mathematics', 'Social Studies', 'Arts', 'Physical Education']
  const departmentsForFilter = ['all', ...departments]
  
  const allSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'History', 'Geography', 'Computer Science', 'Physical Education', 'Art', 'Music']
  const subjectsForFilter = ['all', ...allSubjects]
  
  const availableClasses = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A', 'Class 8-B', 'Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B', 'Class 11-A', 'Class 11-B', 'Class 12-A', 'Class 12-B']
  
  const specializationOptions = {
    'Science': ['Advanced Mathematics', 'Calculus', 'Statistics', 'Quantum Physics', 'Thermodynamics', 'Electronics', 'Organic Chemistry', 'Laboratory Management', 'Chemical Analysis'],
    'Languages': ['Creative Writing', 'Literature Analysis', 'Public Speaking', 'Grammar', 'Linguistics'],
    'Mathematics': ['Advanced Calculus', 'Applied Mathematics', 'Statistics', 'Geometry', 'Algebra'],
    'Social Studies': ['Ancient History', 'Modern History', 'Political Science', 'Economics', 'Sociology'],
    'Arts': ['Fine Arts', 'Music Theory', 'Dance', 'Drama', 'Visual Arts'],
    'Physical Education': ['Sports Training', 'Fitness', 'Yoga', 'Athletics', 'Team Sports']
  }

  const mockTeachers: Teacher[] = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      employeeId: 'T001',
      email: 'sarah.wilson@school.com',
      phone: '+91 9876543210',
      address: '123 Teacher Colony, Education District, City 12345',
      photo: '/api/placeholder/150/150',
      dateOfBirth: '1985-03-15',
      joiningDate: '2018-08-20',
      qualification: 'M.Sc Mathematics, B.Ed',
      experience: 8,
      department: 'Science',
      specialization: ['Advanced Mathematics', 'Calculus', 'Statistics'],
      subjects: ['Mathematics', 'Applied Mathematics'],
      classes: ['Class 10-A', 'Class 11-A', 'Class 12-A'],
      salary: 65000,
      performance: {
        rating: 4.8,
        reviews: [
          { academic_year: '2023-24', rating: 4.8, feedback: 'Excellent teaching methods and student engagement' },
          { academic_year: '2022-23', rating: 4.7, feedback: 'Great improvement in student performance' },
          { academic_year: '2021-22', rating: 4.6, feedback: 'Very dedicated and knowledgeable teacher' }
        ]
      },
      schedule: [
        {
          day: 'Monday',
          periods: [
            { time: '9:00-10:00', subject: 'Mathematics', class: 'Class 10-A' },
            { time: '10:00-11:00', subject: 'Applied Math', class: 'Class 11-A' },
            { time: '2:00-3:00', subject: 'Mathematics', class: 'Class 12-A' }
          ]
        }
      ],
      achievements: ['Best Teacher Award 2023', 'Mathematics Excellence Award', '100% Board Result Achievement']
    },
    {
      id: 2,
      name: 'Prof. Robert Johnson',
      employeeId: 'T002',
      email: 'robert.johnson@school.com',
      phone: '+91 9876543220',
      address: '456 Faculty Residency, Academic Zone, City 12345',
      photo: '/api/placeholder/150/150',
      dateOfBirth: '1978-11-22',
      joiningDate: '2015-06-15',
      qualification: 'M.Sc Physics, PhD, B.Ed',
      experience: 12,
      department: 'Science',
      specialization: ['Quantum Physics', 'Thermodynamics', 'Electronics'],
      subjects: ['Physics', 'Applied Physics'],
      classes: ['Class 11-A', 'Class 11-B', 'Class 12-A', 'Class 12-B'],
      salary: 75000,
      performance: {
        rating: 4.9,
        reviews: [
          { academic_year: '2023-24', rating: 4.9, feedback: 'Outstanding research-based teaching approach' },
          { academic_year: '2022-23', rating: 4.8, feedback: 'Exceptional laboratory guidance' },
          { academic_year: '2021-22', rating: 4.9, feedback: 'Inspiring students towards science careers' }
        ]
      },
      schedule: [
        {
          day: 'Monday',
          periods: [
            { time: '9:00-10:00', subject: 'Physics', class: 'Class 11-A' },
            { time: '11:00-12:00', subject: 'Physics', class: 'Class 12-A' },
            { time: '1:00-2:00', subject: 'Applied Physics', class: 'Class 12-B' }
          ]
        }
      ],
      achievements: ['Science Teacher of the Year 2022', 'Research Publication Award', 'Innovation in Teaching Award']
    },
    {
      id: 3,
      name: 'Ms. Emily Davis',
      employeeId: 'T003',
      email: 'emily.davis@school.com',
      phone: '+91 9876543230',
      address: '789 Education Avenue, Teacher Town, City 12345',
      photo: '/api/placeholder/150/150',
      dateOfBirth: '1990-07-08',
      joiningDate: '2019-04-10',
      qualification: 'MA English Literature, B.Ed',
      experience: 6,
      department: 'Languages',
      specialization: ['Creative Writing', 'Literature Analysis', 'Public Speaking'],
      subjects: ['English', 'English Literature'],
      classes: ['Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B'],
      salary: 55000,
      performance: {
        rating: 4.7,
        reviews: [
          { academic_year: '2023-24', rating: 4.7, feedback: 'Excellent in developing writing skills' },
          { academic_year: '2022-23', rating: 4.6, feedback: 'Great enthusiasm for literature' },
          { academic_year: '2021-22', rating: 4.5, feedback: 'Innovative teaching methods' }
        ]
      },
      schedule: [
        {
          day: 'Monday',
          periods: [
            { time: '9:00-10:00', subject: 'English', class: 'Class 9-A' },
            { time: '10:00-11:00', subject: 'Literature', class: 'Class 10-A' },
            { time: '2:00-3:00', subject: 'English', class: 'Class 9-B' }
          ]
        }
      ],
      achievements: ['Creative Writing Excellence', 'Drama Club Mentor Award', 'Young Teacher Award 2023']
    },
    {
      id: 4,
      name: 'Mr. Michael Brown',
      employeeId: 'T004',
      email: 'michael.brown@school.com',
      phone: '+91 9876543240',
      address: '321 Scholar Street, Knowledge Park, City 12345',
      photo: '/api/placeholder/150/150',
      dateOfBirth: '1982-12-03',
      joiningDate: '2016-01-18',
      qualification: 'M.Sc Chemistry, B.Ed',
      experience: 10,
      department: 'Science',
      specialization: ['Organic Chemistry', 'Laboratory Management', 'Chemical Analysis'],
      subjects: ['Chemistry', 'Applied Chemistry'],
      classes: ['Class 11-A', 'Class 11-B', 'Class 12-A'],
      salary: 68000,
      performance: {
        rating: 4.6,
        reviews: [
          { academic_year: '2023-24', rating: 4.6, feedback: 'Excellent practical knowledge sharing' },
          { academic_year: '2022-23', rating: 4.5, feedback: 'Great lab safety and management' },
          { academic_year: '2021-22', rating: 4.7, feedback: 'Outstanding board exam results' }
        ]
      },
      schedule: [
        {
          day: 'Monday',
          periods: [
            { time: '10:00-11:00', subject: 'Chemistry', class: 'Class 11-A' },
            { time: '11:00-12:00', subject: 'Chemistry', class: 'Class 12-A' },
            { time: '1:00-2:00', subject: 'Applied Chemistry', class: 'Class 11-B' }
          ]
        }
      ],
      achievements: ['Laboratory Excellence Award', 'Chemistry Olympiad Mentor', 'Safety Champion Award']
    }
  ]

  useEffect(() => {
    setTeachers(mockTeachers)
    setFilteredTeachers(mockTeachers)
  }, [])

  useEffect(() => {
    let filtered = teachers

    if (searchTerm) {
      filtered = filtered.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.employeeId.includes(searchTerm) ||
        teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(teacher => teacher.department === selectedDepartment)
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(teacher => 
        teacher.subjects.some(subject => subject === selectedSubject)
      )
    }

    setFilteredTeachers(filtered)
  }, [searchTerm, selectedDepartment, selectedSubject, teachers])

  const openProfile = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setShowProfile(true)
  }

  const openAddTeacher = () => {
    setShowAddTeacher(true)
    setFormErrors({})
    setNewTeacher({
      name: '',
      employeeId: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      joiningDate: '',
      qualification: '',
      experience: 0,
      department: '',
      specialization: [],
      subjects: [],
      classes: [],
      salary: 0
    })
  }

  const closeAddTeacher = () => {
    setShowAddTeacher(false)
    setFormErrors({})
  }

  const handleInputChange = (field: keyof NewTeacher, value: string | number | string[]) => {
    setNewTeacher(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleArrayChange = (field: 'subjects' | 'classes' | 'specialization', value: string, checked: boolean | string) => {
    const currentArray = newTeacher[field] as string[]
    const isChecked = Boolean(checked)
    const newArray = isChecked
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value)
    
    handleInputChange(field, newArray)
  }

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof NewTeacher, string>> = {}
    
    if (!newTeacher.name.trim()) errors.name = 'Name is required'
    if (!newTeacher.employeeId.trim()) errors.employeeId = 'Employee ID is required'
    if (!newTeacher.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(newTeacher.email)) errors.email = 'Invalid email format'
    if (!newTeacher.phone.trim()) errors.phone = 'Phone number is required'
    if (!newTeacher.address.trim()) errors.address = 'Address is required'
    if (!newTeacher.dateOfBirth) errors.dateOfBirth = 'Date of birth is required'
    if (!newTeacher.joiningDate) errors.joiningDate = 'Joining date is required'
    if (!newTeacher.qualification.trim()) errors.qualification = 'Qualification is required'
    if (!newTeacher.department) errors.department = 'Department is required'
    if (newTeacher.subjects.length === 0) errors.subjects = 'At least one subject is required'
    if (newTeacher.classes.length === 0) errors.classes = 'At least one class assignment is required'
    if (!newTeacher.salary || newTeacher.salary <= 0) errors.salary = 'Valid salary is required'
    if (newTeacher.experience < 0) errors.experience = 'Valid experience is required'

    if (newTeacher.employeeId && teachers.some(teacher => teacher.employeeId === newTeacher.employeeId)) {
      errors.employeeId = 'Employee ID already exists'
    }

    if (newTeacher.email && teachers.some(teacher => teacher.email === newTeacher.email)) {
      errors.email = 'Email already exists'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const teacherToAdd: Teacher = {
      id: Math.max(...teachers.map(t => t.id)) + 1,
      ...newTeacher,
      photo: '/api/placeholder/150/150',
      performance: {
        rating: 0,
        reviews: []
      },
      schedule: [],
      achievements: []
    }

    const updatedTeachers = [...teachers, teacherToAdd]
    setTeachers(updatedTeachers)
    setFilteredTeachers(updatedTeachers)

    setShowAddTeacher(false)
    alert('Teacher added successfully!')
  }

  const getExperienceColor = (years: number) => {
    if (years >= 10) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    if (years >= 5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 dark:text-green-400'
    if (rating >= 4.0) return 'text-blue-600 dark:text-blue-400'
    if (rating >= 3.5) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const TeacherProfile = ({ teacher }: { teacher: Teacher }) => {
    return (
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Teacher Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={teacher.photo} alt={teacher.name} />
              <AvatarFallback className="text-lg">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{teacher.name}</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="font-medium">{teacher.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{teacher.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{teacher.experience} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  {teacher.performance.rating > 0 ? (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{teacher.performance.rating}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Not yet rated</span>
                  )}
                </div>
              </div>
            </div>
          </div>

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
                  <p className="font-medium">{teacher.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{teacher.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joining Date</p>
                  <p className="font-medium">{new Date(teacher.joiningDate).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{teacher.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Qualification</p>
                  <p className="font-medium">{teacher.qualification}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Salary</p>
                  <p className="font-medium">₹{teacher.salary.toLocaleString()}</p>
                </div>
                {teacher.specialization.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground">Specialization</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {teacher.specialization.map((spec, index) => (
                        <Badge key={index} variant="outline">{spec}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Subjects Teaching</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {teacher.subjects.map((subject, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Classes Assigned</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {teacher.classes.map((cls, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {teacher.performance.reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Performance Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacher.performance.reviews.map((review, index) => (
                    <div key={index} className="flex items-start justify-between p-3 border rounded">
                      <div className="flex-1">
                        <p className="font-medium">{review.academic_year}</p>
                        <p className="text-sm text-muted-foreground mt-1">{review.feedback}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{review.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {teacher.achievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Achievements & Awards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teacher.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {teacher.schedule.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacher.schedule.map((daySchedule, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">{daySchedule.day}</h4>
                      <div className="grid gap-2">
                        {daySchedule.periods.map((period, periodIndex) => (
                          <div key={periodIndex} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                            <span>{period.time}</span>
                            <span className="font-medium">{period.subject}</span>
                            <Badge variant="outline">{period.class}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {teacher.performance.reviews.length === 0 && teacher.achievements.length === 0 && teacher.schedule.length === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <GraduationCap className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Performance reviews, achievements, and schedule will be available once the teacher starts teaching.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    )
  }

  const AddTeacherForm = () => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Teacher</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={newTeacher.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter teacher's full name"
                className={formErrors.name ? 'border-red-500' : ''}
              />
              {formErrors.name && <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input
                id="employeeId"
                value={newTeacher.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                placeholder="Enter employee ID"
                className={formErrors.employeeId ? 'border-red-500' : ''}
              />
              {formErrors.employeeId && <p className="text-sm text-red-500 mt-1">{formErrors.employeeId}</p>}
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={newTeacher.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={formErrors.dateOfBirth ? 'border-red-500' : ''}
              />
              {formErrors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{formErrors.dateOfBirth}</p>}
            </div>
            <div>
              <Label htmlFor="joiningDate">Joining Date *</Label>
              <Input
                id="joiningDate"
                type="date"
                value={newTeacher.joiningDate}
                onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                className={formErrors.joiningDate ? 'border-red-500' : ''}
              />
              {formErrors.joiningDate && <p className="text-sm text-red-500 mt-1">{formErrors.joiningDate}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newTeacher.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="teacher@school.com"
                className={formErrors.email ? 'border-red-500' : ''}
              />
              {formErrors.email && <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={newTeacher.phone}
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
              value={newTeacher.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter full address"
              className={formErrors.address ? 'border-red-500' : ''}
              rows={3}
            />
            {formErrors.address && <p className="text-sm text-red-500 mt-1">{formErrors.address}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Professional Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="qualification">Qualification *</Label>
              <Input
                id="qualification"
                value={newTeacher.qualification}
                onChange={(e) => handleInputChange('qualification', e.target.value)}
                placeholder="e.g., M.Sc Physics, B.Ed"
                className={formErrors.qualification ? 'border-red-500' : ''}
              />
              {formErrors.qualification && <p className="text-sm text-red-500 mt-1">{formErrors.qualification}</p>}
            </div>
            <div>
              <Label htmlFor="experience">Experience (Years) *</Label>
              <Input
                id="experience"
                type="number"
                value={newTeacher.experience}
                onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || 0)}
                min="0"
                className={formErrors.experience ? 'border-red-500' : ''}
              />
              {formErrors.experience && <p className="text-sm text-red-500 mt-1">{formErrors.experience}</p>}
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select value={newTeacher.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger className={formErrors.department ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.department && <p className="text-sm text-red-500 mt-1">{formErrors.department}</p>}
            </div>
            <div>
              <Label htmlFor="salary">Monthly Salary *</Label>
              <Input
                id="salary"
                type="number"
                value={newTeacher.salary}
                onChange={(e) => handleInputChange('salary', parseInt(e.target.value) || 0)}
                min="0"
                placeholder="50000"
                className={formErrors.salary ? 'border-red-500' : ''}
              />
              {formErrors.salary && <p className="text-sm text-red-500 mt-1">{formErrors.salary}</p>}
            </div>
          </div>
        </div>

        {newTeacher.department && specializationOptions[newTeacher.department as keyof typeof specializationOptions] && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Specialization (Optional)</h3>
            <div className="grid grid-cols-2 gap-2">
              {specializationOptions[newTeacher.department as keyof typeof specializationOptions].map((spec) => (
                <div key={spec} className="flex items-center space-x-2">
                  <Checkbox
                    id={`spec-${spec}`}
                    checked={newTeacher.specialization.includes(spec)}
                    onCheckedChange={(checked: boolean | string) => handleArrayChange('specialization', spec, Boolean(checked))}
                  />
                  <Label htmlFor={`spec-${spec}`} className="text-sm cursor-pointer">{spec}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subjects to Teach *</h3>
          <div className="grid grid-cols-3 gap-2">
            {allSubjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={`subject-${subject}`}
                  checked={newTeacher.subjects.includes(subject)}
                  onCheckedChange={(checked: boolean | string) => handleArrayChange('subjects', subject, Boolean(checked))}
                />
                <Label htmlFor={`subject-${subject}`} className="text-sm cursor-pointer">{subject}</Label>
              </div>
            ))}
          </div>
          {formErrors.subjects && <p className="text-sm text-red-500">{formErrors.subjects}</p>}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Class Assignments *</h3>
          <div className="grid grid-cols-4 gap-2">
            {availableClasses.map((className) => (
              <div key={className} className="flex items-center space-x-2">
                <Checkbox
                  id={`class-${className}`}
                  checked={newTeacher.classes.includes(className)}
                  onCheckedChange={(checked: boolean | string) => handleArrayChange('classes', className, Boolean(checked))}
                />
                <Label htmlFor={`class-${className}`} className="text-sm cursor-pointer">{className}</Label>
              </div>
            ))}
          </div>
          {formErrors.classes && <p className="text-sm text-red-500">{formErrors.classes}</p>}
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button type="button" variant="outline" onClick={closeAddTeacher}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </form>
    </DialogContent>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Teachers</h2>
          <p className="text-muted-foreground">
            View and manage teacher information, performance, and schedules
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-3 py-1">
            {filteredTeachers.length} teachers
          </Badge>
          <Button onClick={openAddTeacher}>
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, employee ID, subject, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departmentsForFilter.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectsForFilter.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={teacher.photo} alt={teacher.name} />
                  <AvatarFallback>
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {teacher.employeeId}</p>
                  <p className="text-sm text-muted-foreground">{teacher.department}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Subjects</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {teacher.subjects.slice(0, 2).map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {teacher.subjects.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{teacher.subjects.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Experience</p>
                    <Badge className={getExperienceColor(teacher.experience)}>
                      {teacher.experience} years
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rating</p>
                    {teacher.performance.rating > 0 ? (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className={`font-medium ${getRatingColor(teacher.performance.rating)}`}>
                          {teacher.performance.rating}
                        </span>
                      </div>
                    ) : (
                      <Badge variant="outline">New</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => openProfile(teacher)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Teachers Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={openAddTeacher}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Teacher
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        {selectedTeacher && <TeacherProfile teacher={selectedTeacher} />}
      </Dialog>

      <Dialog open={showAddTeacher} onOpenChange={setShowAddTeacher}>
        <AddTeacherForm />
      </Dialog>
    </div>
  )
}

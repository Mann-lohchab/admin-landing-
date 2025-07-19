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
import { Search, Users, GraduationCap, BookOpen, Calendar, Eye, Plus, Save, X, Edit, Trash2, UserPlus, UserMinus, Settings, School, Clock, MapPin } from 'lucide-react'

// ... (interfaces for Class, Teacher, Student, NewClass remain the same)

interface Class {
  id: number
  name: string
  grade: string
  section: string
  roomNumber: string
  capacity: number
  currentStrength: number
  classTeacher: {
    id: number
    name: string
    photo?: string
  } | null
  subjects: {
    subject: string
    teacher: {
      id: number
      name: string
    }
  }[]
  schedule: {
    day: string
    periods: {
      time: string
      subject: string
      teacher: string
    }[]
  }[]
  students: {
    id: number
    name: string
    rollNumber: string
  }[]
}


interface Teacher {
  id: number
  name: string
  employeeId: string
  subjects: string[]
  photo?: string
}


interface Student {
  id: number
  name: string
  rollNumber: string
  currentClass?: string
}


interface NewClass {
  name: string
  grade: string
  section: string
  roomNumber: string
  capacity: number
  classTeacherId: number | null
  subjectAssignments: {
    subject: string
    teacherId: number | null
  }[]
}


export const Classes: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([])
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [showClassDetails, setShowClassDetails] = useState(false)
  const [showAddClass, setShowAddClass] = useState(false)
  const [showEditClass, setShowEditClass] = useState(false)
  const [showAssignStudents, setShowAssignStudents] = useState(false)


  const [newClass, setNewClass] = useState<NewClass>({
    name: '',
    grade: '',
    section: '',
    roomNumber: '',
    capacity: 30,
    classTeacherId: null,
    subjectAssignments: []
  })


  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NewClass, string>>>({})


  // Available options
  const grades = ['6', '7', '8', '9', '10', '11', '12']
  const sections = ['A', 'B', 'C', 'D']
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'History', 'Geography', 'Computer Science', 'Physical Education']
  const gradesForFilter = ['all', ...grades]


  // Mock data
  const mockTeachers: Teacher[] = [
    { id: 1, name: 'Dr. Sarah Wilson', employeeId: 'T001', subjects: ['Mathematics'], photo: '/api/placeholder/150/150' },
    { id: 2, name: 'Prof. Robert Johnson', employeeId: 'T002', subjects: ['Physics'], photo: '/api/placeholder/150/150' },
    { id: 3, name: 'Ms. Emily Davis', employeeId: 'T003', subjects: ['English'], photo: '/api/placeholder/150/150' },
    { id: 4, name: 'Mr. Michael Brown', employeeId: 'T004', subjects: ['Chemistry'], photo: '/api/placeholder/150/150' }
  ]


  const mockStudents: Student[] = [
    { id: 1, name: 'John Doe', rollNumber: '001', currentClass: 'Class 10-A' },
    { id: 2, name: 'Jane Smith', rollNumber: '002', currentClass: 'Class 10-A' },
    { id: 3, name: 'Bob Johnson', rollNumber: '003', currentClass: 'Class 10-B' },
    { id: 4, name: 'Alice Brown', rollNumber: '004' }
  ]


  const mockClasses: Class[] = [
    {
      id: 1,
      name: 'Class 10-A',
      grade: '10',
      section: 'A',
      roomNumber: 'R101',
      capacity: 35,
      currentStrength: 32,
      classTeacher: { id: 1, name: 'Dr. Sarah Wilson', photo: '/api/placeholder/150/150' },
      subjects: [
        { subject: 'Mathematics', teacher: { id: 1, name: 'Dr. Sarah Wilson' } },
        { subject: 'Physics', teacher: { id: 2, name: 'Prof. Robert Johnson' } },
        { subject: 'English', teacher: { id: 3, name: 'Ms. Emily Davis' } }
      ],
      schedule: [
        {
          day: 'Monday',
          periods: [
            { time: '9:00-10:00', subject: 'Mathematics', teacher: 'Dr. Sarah Wilson' },
            { time: '10:00-11:00', subject: 'Physics', teacher: 'Prof. Robert Johnson' },
            { time: '11:00-12:00', subject: 'English', teacher: 'Ms. Emily Davis' }
          ]
        }
      ],
      students: [
        { id: 1, name: 'John Doe', rollNumber: '001' },
        { id: 2, name: 'Jane Smith', rollNumber: '002' }
      ]
    },
    {
      id: 2,
      name: 'Class 10-B',
      grade: '10',
      section: 'B',
      roomNumber: 'R102',
      capacity: 35,
      currentStrength: 30,
      classTeacher: { id: 2, name: 'Prof. Robert Johnson', photo: '/api/placeholder/150/150' },
      subjects: [
        { subject: 'Mathematics', teacher: { id: 1, name: 'Dr. Sarah Wilson' } },
        { subject: 'Chemistry', teacher: { id: 4, name: 'Mr. Michael Brown' } },
        { subject: 'English', teacher: { id: 3, name: 'Ms. Emily Davis' } }
      ],
      schedule: [
        {
          day: 'Monday',
          periods: [
            { time: '9:00-10:00', subject: 'Chemistry', teacher: 'Mr. Michael Brown' },
            { time: '10:00-11:00', subject: 'Mathematics', teacher: 'Dr. Sarah Wilson' },
            { time: '11:00-12:00', subject: 'English', teacher: 'Ms. Emily Davis' }
          ]
        }
      ],
      students: [
        { id: 3, name: 'Bob Johnson', rollNumber: '003' }
      ]
    },
    {
      id: 3,
      name: 'Class 9-A',
      grade: '9',
      section: 'A',
      roomNumber: 'R201',
      capacity: 30,
      currentStrength: 28,
      classTeacher: { id: 3, name: 'Ms. Emily Davis', photo: '/api/placeholder/150/150' },
      subjects: [
        { subject: 'Mathematics', teacher: { id: 1, name: 'Dr. Sarah Wilson' } },
        { subject: 'English', teacher: { id: 3, name: 'Ms. Emily Davis' } }
      ],
      schedule: [],
      students: []
    }
  ]


  useEffect(() => {
    setClasses(mockClasses)
    setFilteredClasses(mockClasses)
    setTeachers(mockTeachers)
    setStudents(mockStudents)
  }, [])


  useEffect(() => {
    let filtered = classes


    if (searchTerm) {
      filtered = filtered.filter(cls => 
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cls.classTeacher && cls.classTeacher.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }


    if (selectedGrade !== 'all') {
      filtered = filtered.filter(cls => cls.grade === selectedGrade)
    }


    setFilteredClasses(filtered)
  }, [searchTerm, selectedGrade, classes])


  const openClassDetails = (classItem: Class) => {
    setSelectedClass(classItem)
    setShowClassDetails(true)
  }


  const openAddClass = () => {
    setShowAddClass(true)
    setFormErrors({})
    setNewClass({
      name: '',
      grade: '',
      section: '',
      roomNumber: '',
      capacity: 30,
      classTeacherId: null,
      subjectAssignments: subjects.map(subject => ({ subject, teacherId: null }))
    })
  }


  const openEditClass = (classItem: Class) => {
    setSelectedClass(classItem)
    setNewClass({
      name: classItem.name,
      grade: classItem.grade,
      section: classItem.section,
      roomNumber: classItem.roomNumber,
      capacity: classItem.capacity,
      classTeacherId: classItem.classTeacher?.id || null,
      subjectAssignments: subjects.map(subject => {
        const assignment = classItem.subjects.find(s => s.subject === subject)
        return {
          subject,
          teacherId: assignment?.teacher.id || null
        }
      })
    })
    setShowEditClass(true)
  }


  const handleInputChange = (field: keyof NewClass, value: string | number | null) => {
    setNewClass(prev => ({
      ...prev,
      [field]: value
    }))


    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }


    if (field === 'grade' || field === 'section') {
      const grade = field === 'grade' ? value : newClass.grade
      const section = field === 'section' ? value : newClass.section
      if (grade && section) {
        setNewClass(prev => ({
          ...prev,
          name: `Class ${grade}-${section}`
        }))
      }
    }
  }


  const handleSubjectAssignment = (subject: string, teacherId: number | null) => {
    setNewClass(prev => ({
      ...prev,
      subjectAssignments: prev.subjectAssignments.map(assignment =>
        assignment.subject === subject
          ? { ...assignment, teacherId }
          : assignment
      )
    }))
  }


  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof NewClass, string>> = {}
    
    if (!newClass.grade) errors.grade = 'Grade is required'
    if (!newClass.section) errors.section = 'Section is required'
    if (!newClass.roomNumber) errors.roomNumber = 'Room number is required'
    if (!newClass.capacity || newClass.capacity < 1) errors.capacity = 'Valid capacity is required'


    const isDuplicate = classes.some(cls => 
      cls.grade === newClass.grade && 
      cls.section === newClass.section &&
      (!selectedClass || cls.id !== selectedClass.id)
    )
    if (isDuplicate) {
      errors.grade = 'This class already exists'
    }


    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return


    const classToSave: Class = {
      id: selectedClass?.id || Math.max(0, ...classes.map(c => c.id)) + 1,
      name: newClass.name,
      grade: newClass.grade,
      section: newClass.section,
      roomNumber: newClass.roomNumber,
      capacity: newClass.capacity,
      classTeacher: newClass.classTeacherId 
        ? teachers.find(t => t.id === newClass.classTeacherId) || null
        : null,
      subjects: newClass.subjectAssignments
        .filter(assignment => assignment.teacherId !== null)
        .map(assignment => ({
          subject: assignment.subject,
          teacher: teachers.find(t => t.id === assignment.teacherId)!
        })),
      currentStrength: selectedClass?.currentStrength || 0,
      schedule: selectedClass?.schedule || [],
      students: selectedClass?.students || []
    }


    if (selectedClass) {
      const updatedClasses = classes.map(cls => 
        cls.id === selectedClass.id ? classToSave : cls
      )
      setClasses(updatedClasses)
      setFilteredClasses(updatedClasses)
      setShowEditClass(false)
    } else {
      const updatedClasses = [...classes, classToSave]
      setClasses(updatedClasses)
      setFilteredClasses(updatedClasses)
      setShowAddClass(false)
    }


    alert(`Class ${selectedClass ? 'updated' : 'added'} successfully!`)
    setSelectedClass(null)
  }


  const deleteClass = (classId: number) => {
    if (confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      const updatedClasses = classes.filter(cls => cls.id !== classId)
      setClasses(updatedClasses)
      setFilteredClasses(updatedClasses)
      alert('Class deleted successfully!')
    }
  }


  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = capacity > 0 ? (current / capacity) * 100 : 0
    if (percentage >= 90) return 'text-red-600 dark:text-red-400'
    if (percentage >= 75) return 'text-orange-600 dark:text-orange-400'
    return 'text-green-600 dark:text-green-400'
  }

  // Sub-components for dialogs
  const ClassDetails = ({ classItem }: { classItem: Class }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <span>Class Details - {classItem.name}</span>
          <Button variant="outline" size="sm" onClick={() => openEditClass(classItem)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Class
          </Button>
        </DialogTitle>
      </DialogHeader>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><School className="mr-2 h-5 w-5" />Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-muted-foreground">Class Name</p><p className="font-medium">{classItem.name}</p></div>
              <div><p className="text-sm text-muted-foreground">Grade & Section</p><p className="font-medium">Grade {classItem.grade} - Section {classItem.section}</p></div>
              <div><p className="text-sm text-muted-foreground">Room Number</p><div className="flex items-center"><MapPin className="mr-1 h-4 w-4 text-muted-foreground" /><span className="font-medium">{classItem.roomNumber}</span></div></div>
              <div><p className="text-sm text-muted-foreground">Capacity</p><p className={`font-medium ${getCapacityColor(classItem.currentStrength, classItem.capacity)}`}>{classItem.currentStrength} / {classItem.capacity}</p></div>
            </div>
          </CardContent>
        </Card>

        {classItem.classTeacher && (
          <Card>
            <CardHeader><CardTitle className="flex items-center"><GraduationCap className="mr-2 h-5 w-5" />Class Teacher</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12"><AvatarImage src={classItem.classTeacher.photo} alt={classItem.classTeacher.name} /><AvatarFallback>{classItem.classTeacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                <div><p className="font-medium">{classItem.classTeacher.name}</p><p className="text-sm text-muted-foreground">Class Teacher</p></div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle className="flex items-center"><BookOpen className="mr-2 h-5 w-5" />Subject Teachers</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {classItem.subjects.map((assignment, index) => (
                <div key={index} className="p-3 border rounded-lg"><div className="flex justify-between items-start"><div><p className="font-medium">{assignment.subject}</p><p className="text-sm text-muted-foreground">{assignment.teacher.name}</p></div><Badge variant="outline">{assignment.subject}</Badge></div></div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center justify-between"><span className="flex items-center"><Users className="mr-2 h-5 w-5" />Students ({classItem.students.length})</span><Button variant="outline" size="sm"><UserPlus className="mr-2 h-4 w-4" />Manage Students</Button></CardTitle></CardHeader>
          <CardContent>
            {classItem.students.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {classItem.students.map((student) => (<div key={student.id} className="flex items-center justify-between p-2 border rounded"><div><p className="font-medium text-sm">{student.name}</p><p className="text-xs text-muted-foreground">Roll: {student.rollNumber}</p></div></div>))}
              </div>
            ) : (<p className="text-muted-foreground text-center py-4">No students assigned</p>)}
          </CardContent>
        </Card>

        {classItem.schedule.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="flex items-center"><Clock className="mr-2 h-5 w-5" />Class Schedule</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classItem.schedule.map((daySchedule, index) => (<div key={index}><h4 className="font-medium mb-2">{daySchedule.day}</h4><div className="grid gap-2">{daySchedule.periods.map((period, periodIndex) => (<div key={periodIndex} className="flex items-center justify-between p-2 bg-muted rounded text-sm"><span>{period.time}</span><span className="font-medium">{period.subject}</span><span className="text-muted-foreground">{period.teacher}</span></div>))}</div></div>))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DialogContent>
  )

  const ClassForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader><DialogTitle>{isEdit ? 'Edit Class' : 'Add New Class'}</DialogTitle></DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="grade">Grade *</Label><Select value={newClass.grade} onValueChange={(value) => handleInputChange('grade', value)}><SelectTrigger className={formErrors.grade ? 'border-red-500' : ''}><SelectValue placeholder="Select grade" /></SelectTrigger><SelectContent>{grades.map((grade) => (<SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>))}</SelectContent></Select>{formErrors.grade && <p className="text-sm text-red-500 mt-1">{formErrors.grade}</p>}</div>
            <div><Label htmlFor="section">Section *</Label><Select value={newClass.section} onValueChange={(value) => handleInputChange('section', value)}><SelectTrigger className={formErrors.section ? 'border-red-500' : ''}><SelectValue placeholder="Select section" /></SelectTrigger><SelectContent>{sections.map((section) => (<SelectItem key={section} value={section}>Section {section}</SelectItem>))}</SelectContent></Select>{formErrors.section && <p className="text-sm text-red-500 mt-1">{formErrors.section}</p>}</div>
            <div><Label htmlFor="roomNumber">Room Number *</Label><Input id="roomNumber" value={newClass.roomNumber} onChange={(e) => handleInputChange('roomNumber', e.target.value)} placeholder="e.g., R101" className={formErrors.roomNumber ? 'border-red-500' : ''} />{formErrors.roomNumber && <p className="text-sm text-red-500 mt-1">{formErrors.roomNumber}</p>}</div>
            <div><Label htmlFor="capacity">Capacity *</Label><Input id="capacity" type="number" value={newClass.capacity} onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 0)} min="1" className={formErrors.capacity ? 'border-red-500' : ''} />{formErrors.capacity && <p className="text-sm text-red-500 mt-1">{formErrors.capacity}</p>}</div>
          </div>
          {newClass.name && (<div><Label>Generated Class Name</Label><div className="p-2 bg-muted rounded-md"><span className="font-medium">{newClass.name}</span></div></div>)}
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Class Teacher</h3>
          <div><Label htmlFor="classTeacher">Assign Class Teacher</Label><Select value={newClass.classTeacherId?.toString() || ''} onValueChange={(value) => handleInputChange('classTeacherId', value ? parseInt(value) : null)}><SelectTrigger><SelectValue placeholder="Select class teacher (optional)" /></SelectTrigger><SelectContent><SelectItem value="">No class teacher</SelectItem>{teachers.map((teacher) => (<SelectItem key={teacher.id} value={teacher.id.toString()}>{teacher.name} ({teacher.employeeId})</SelectItem>))}</SelectContent></Select></div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subject Teachers</h3>
          <div className="grid grid-cols-1 gap-4">
            {subjects.map((subject) => {
              const assignment = newClass.subjectAssignments.find(a => a.subject === subject)
              const availableTeachers = teachers.filter(t => t.subjects.includes(subject))
              return (
                <div key={subject} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="w-32"><Label className="font-medium">{subject}</Label></div>
                  <div className="flex-1"><Select value={assignment?.teacherId?.toString() || ''} onValueChange={(value) => handleSubjectAssignment(subject, value ? parseInt(value) : null)}><SelectTrigger><SelectValue placeholder="Select teacher" /></SelectTrigger><SelectContent><SelectItem value="">No teacher assigned</SelectItem>{availableTeachers.map((teacher) => (<SelectItem key={teacher.id} value={teacher.id.toString()}>{teacher.name}</SelectItem>))}</SelectContent></Select></div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex justify-end space-x-2 pt-6 border-t"><Button type="button" variant="outline" onClick={() => isEdit ? setShowEditClass(false) : setShowAddClass(false)}><X className="mr-2 h-4 w-4" />Cancel</Button><Button type="submit"><Save className="mr-2 h-4 w-4" />{isEdit ? 'Update Class' : 'Create Class'}</Button></div>
      </form>
    </DialogContent>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Class Management</h2>
          <p className="text-muted-foreground">Manage classes, assign teachers, and organize student sections</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-3 py-1">{filteredClasses.length} classes</Badge>
          <Button onClick={openAddClass}><Plus className="mr-2 h-4 w-4" />Add Class</Button>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Filter Classes</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by class name, room number, or teacher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" /></div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}><SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Select grade" /></SelectTrigger><SelectContent>{gradesForFilter.map((grade) => (<SelectItem key={grade} value={grade}>{grade === 'all' ? 'All Grades' : `Grade ${grade}`}</SelectItem>))}</SelectContent></Select>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div><h3 className="font-semibold text-lg text-foreground">{classItem.name}</h3><div className="flex items-center text-sm text-muted-foreground mt-1"><MapPin className="mr-1 h-3 w-3" />{classItem.roomNumber}</div></div>
                <div className="flex space-x-1"><Button variant="ghost" size="sm" onClick={() => openEditClass(classItem)}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="sm" onClick={() => deleteClass(classItem.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button></div>
              </div>
              {classItem.classTeacher && (<div className="flex items-center space-x-3 mb-4"><Avatar className="h-8 w-8"><AvatarImage src={classItem.classTeacher.photo} alt={classItem.classTeacher.name} /><AvatarFallback className="text-xs">{classItem.classTeacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar><div><p className="text-sm font-medium">{classItem.classTeacher.name}</p><p className="text-xs text-muted-foreground">Class Teacher</p></div></div>)}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><p className="text-xs text-muted-foreground">Students</p><p className={`font-medium ${getCapacityColor(classItem.currentStrength, classItem.capacity)}`}>{classItem.currentStrength}/{classItem.capacity}</p></div>
                <div><p className="text-xs text-muted-foreground">Subjects</p><p className="font-medium">{classItem.subjects.length} assigned</p></div>
              </div>
              <div className="mb-4"><div className="flex flex-wrap gap-1">{classItem.subjects.slice(0, 3).map((subject, index) => (<Badge key={index} variant="secondary" className="text-xs">{subject.subject}</Badge>))}{classItem.subjects.length > 3 && (<Badge variant="outline" className="text-xs">+{classItem.subjects.length - 3}</Badge>)}</div></div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => openClassDetails(classItem)}><Eye className="mr-2 h-4 w-4" />View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredClasses.length === 0 && (
        <Card><CardContent className="flex items-center justify-center py-12"><div className="text-center"><School className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><h3 className="text-lg font-medium text-foreground mb-2">No Classes Found</h3><p className="text-muted-foreground mb-4">Try adjusting your search criteria or create a new class</p><Button onClick={openAddClass}><Plus className="mr-2 h-4 w-4" />Add First Class</Button></div></CardContent></Card>
      )}
      <Dialog open={showClassDetails} onOpenChange={setShowClassDetails}>{selectedClass && <ClassDetails classItem={selectedClass} />}</Dialog>
      <Dialog open={showAddClass} onOpenChange={setShowAddClass}><ClassForm /></Dialog>
      <Dialog open={showEditClass} onOpenChange={setShowEditClass}><ClassForm isEdit={true} /></Dialog>
    </div>
  )
}

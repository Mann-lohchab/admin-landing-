import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Search, Save, Download, Calendar as CalendarIcon, Check, X, Users, UserCheck, UserX, Clock, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface Student {
  id: number
  name: string
  rollNumber: string
  profileImage?: string
  isPresent: boolean | null // null = not marked, true = present, false = absent
}

interface AttendanceRecord {
  id: number
  className: string
  subject: string
  date: string
  totalStudents: number
  presentStudents: number
  absentStudents: number
  attendancePercentage: number
}

interface Class {
  id: string
  name: string
  subject: string
  totalStudents: number
}

export const Attendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const classes: Class[] = [
    { id: '1', name: 'Class 10-A', subject: 'Mathematics', totalStudents: 30 },
    { id: '2', name: 'Class 10-B', subject: 'Mathematics', totalStudents: 28 },
    { id: '3', name: 'Class 9-A', subject: 'Science', totalStudents: 32 },
    { id: '4', name: 'Class 9-B', subject: 'Science', totalStudents: 29 },
    { id: '5', name: 'Class 8-A', subject: 'English', totalStudents: 25 },
  ]

  const attendanceHistory: AttendanceRecord[] = [
    {
      id: 1,
      className: 'Class 10-A',
      subject: 'Mathematics',
      date: '2024-01-15',
      totalStudents: 30,
      presentStudents: 28,
      absentStudents: 2,
      attendancePercentage: 93.33
    },
    {
      id: 2,
      className: 'Class 10-B',
      subject: 'Mathematics',
      date: '2024-01-15',
      totalStudents: 28,
      presentStudents: 25,
      absentStudents: 3,
      attendancePercentage: 89.29
    },
    {
      id: 3,
      className: 'Class 9-A',
      subject: 'Science',
      date: '2024-01-14',
      totalStudents: 32,
      presentStudents: 30,
      absentStudents: 2,
      attendancePercentage: 93.75
    }
  ]

  // Mock student data - in real app, this would come from API based on selected class
  const mockStudents: Student[] = [
    { id: 1, name: 'John Doe', rollNumber: '001', isPresent: null },
    { id: 2, name: 'Jane Smith', rollNumber: '002', isPresent: null },
    { id: 3, name: 'Bob Johnson', rollNumber: '003', isPresent: null },
    { id: 4, name: 'Alice Brown', rollNumber: '004', isPresent: null },
    { id: 5, name: 'Charlie Davis', rollNumber: '005', isPresent: null },
    { id: 6, name: 'Diana Wilson', rollNumber: '006', isPresent: null },
    { id: 7, name: 'Edward Miller', rollNumber: '007', isPresent: null },
    { id: 8, name: 'Fiona Garcia', rollNumber: '008', isPresent: null },
    { id: 9, name: 'George Martinez', rollNumber: '009', isPresent: null },
    { id: 10, name: 'Hannah Anderson', rollNumber: '010', isPresent: null },
    { id: 11, name: 'Ian Taylor', rollNumber: '011', isPresent: null },
    { id: 12, name: 'Julia Thomas', rollNumber: '012', isPresent: null },
    { id: 13, name: 'Kevin Jackson', rollNumber: '013', isPresent: null },
    { id: 14, name: 'Laura White', rollNumber: '014', isPresent: null },
    { id: 15, name: 'Michael Harris', rollNumber: '015', isPresent: null },
    { id: 16, name: 'Nancy Martin', rollNumber: '016', isPresent: null },
    { id: 17, name: 'Oliver Thompson', rollNumber: '017', isPresent: null },
    { id: 18, name: 'Paula Garcia', rollNumber: '018', isPresent: null },
    { id: 19, name: 'Quinn Rodriguez', rollNumber: '019', isPresent: null },
    { id: 20, name: 'Rachel Lewis', rollNumber: '020', isPresent: null },
    { id: 21, name: 'Samuel Lee', rollNumber: '021', isPresent: null },
    { id: 22, name: 'Tina Walker', rollNumber: '022', isPresent: null },
    { id: 23, name: 'Victor Hall', rollNumber: '023', isPresent: null },
    { id: 24, name: 'Wendy Allen', rollNumber: '024', isPresent: null },
    { id: 25, name: 'Xavier Young', rollNumber: '025', isPresent: null },
    { id: 26, name: 'Yara Hernandez', rollNumber: '026', isPresent: null },
    { id: 27, name: 'Zachary King', rollNumber: '027', isPresent: null },
    { id: 28, name: 'Amy Wright', rollNumber: '028', isPresent: null },
    { id: 29, name: 'Brian Lopez', rollNumber: '029', isPresent: null },
    { id: 30, name: 'Cathy Hill', rollNumber: '030', isPresent: null },
  ]

  // Load students when class is selected
  useEffect(() => {
    if (selectedClass) {
      const selectedClassData = classes.find(c => c.id === selectedClass)
      if (selectedClassData) {
        // In real app, you would fetch students for this class from API
        const classStudents = mockStudents.slice(0, selectedClassData.totalStudents)
        setStudents(classStudents)
      }
    } else {
      setStudents([])
    }
  }, [selectedClass])

  const markAttendance = (studentId: number, status: boolean) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, isPresent: status }
          : student
      )
    )
    setHasChanges(true)
  }

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, isPresent: true })))
    setHasChanges(true)
  }

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, isPresent: false })))
    setHasChanges(true)
  }

  const clearAll = () => {
    setStudents(prev => prev.map(student => ({ ...student, isPresent: null })))
    setHasChanges(true)
  }

  const saveAttendance = async () => {
    if (!selectedClass || students.length === 0) return

    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In real app, you would send attendance data to API
    const attendanceData = {
      classId: selectedClass,
      date: format(selectedDate, 'yyyy-MM-dd'),
      students: students.map(s => ({
        studentId: s.id,
        isPresent: s.isPresent
      }))
    }
    
    console.log('Saving attendance:', attendanceData)
    
    setIsSaving(false)
    setHasChanges(false)
    
    // Show success message (you can add a toast notification here)
    alert('Attendance saved successfully!')
  }

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  )

  const getAttendanceStats = () => {
    const total = students.length
    const present = students.filter(s => s.isPresent === true).length
    const absent = students.filter(s => s.isPresent === false).length
    const notMarked = students.filter(s => s.isPresent === null).length
    
    return { total, present, absent, notMarked }
  }

  const stats = getAttendanceStats()

  const AttendanceHistoryDialog = () => (
    <Dialog open={showHistory} onOpenChange={setShowHistory}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Attendance History</DialogTitle>
          <DialogDescription>
            View past attendance records for all classes
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{format(new Date(record.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{record.className}</TableCell>
                  <TableCell>{record.subject}</TableCell>
                  <TableCell>{record.totalStudents}</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">{record.presentStudents}</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">{record.absentStudents}</TableCell>
                  <TableCell>
                    <Badge variant={record.attendancePercentage >= 90 ? 'default' : record.attendancePercentage >= 80 ? 'secondary' : 'destructive'}>
                      {record.attendancePercentage.toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button onClick={() => setShowHistory(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Attendance</h2>
          <p className="text-muted-foreground">
            Mark student attendance for your classes
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowHistory(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View History
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Class and Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class and Date</CardTitle>
          <CardDescription>
            Choose the class and date for attendance marking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} - {cls.subject} ({cls.totalStudents} students)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      {selectedClass && students.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <p className="text-xs text-muted-foreground">In class</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.present}</div>
              <p className="text-xs text-muted-foreground">Students present</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.absent}</div>
              <p className="text-xs text-muted-foreground">Students absent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Not Marked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.notMarked}</div>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Student List */}
      {selectedClass && students.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Student Attendance</CardTitle>
                <CardDescription>
                  Mark attendance for {classes.find(c => c.id === selectedClass)?.name} on {format(selectedDate, 'PPP')}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={markAllPresent}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  All Present
                </Button>
                <Button variant="outline" size="sm" onClick={markAllAbsent}>
                  <UserX className="mr-2 h-4 w-4" />
                  All Absent
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  Clear All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search */}
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Student List */}
              <div className="grid gap-2">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={cn(
                      "flex items-center justify-between p-3 border rounded-lg transition-colors",
                      student.isPresent === true && "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
                      student.isPresent === false && "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800",
                      student.isPresent === null && "bg-muted/50"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{student.name}</div>
                        <div className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={student.isPresent === true ? "default" : "outline"}
                        size="sm"
                        onClick={() => markAttendance(student.id, true)}
                        className={cn(
                          "h-8 w-8 p-0",
                          student.isPresent === true && "bg-green-600 hover:bg-green-700 text-white"
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={student.isPresent === false ? "default" : "outline"}
                        size="sm"
                        onClick={() => markAttendance(student.id, false)}
                        className={cn(
                          "h-8 w-8 p-0",
                          student.isPresent === false && "bg-red-600 hover:bg-red-700 text-white"
                        )}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Save Button */}
              {hasChanges && (
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={clearAll}>
                    Clear All
                  </Button>
                  <Button onClick={saveAttendance} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Attendance
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show message when no class is selected */}
      {!selectedClass && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Class Selected</h3>
              <p className="text-muted-foreground">Please select a class to start marking attendance</p>
            </div>
          </CardContent>
        </Card>
      )}

      <AttendanceHistoryDialog />
    </div>
  )
}

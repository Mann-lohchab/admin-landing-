import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Save, Users, BookOpen, TrendingUp, Award } from 'lucide-react'

interface Student {
  id: number
  name: string
  rollNumber: string
  marks: {
    [subject: string]: number | null
  }
}

interface Class {
  id: string
  name: string
  students: Student[]
}

interface Subject {
  id: string
  name: string
  maxMarks: number
}

export const Marks: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [students, setStudents] = useState<Student[]>([])
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock data - replace with actual API calls
  const classes: Class[] = [
    {
      id: '1',
      name: 'Class 10-A',
      students: [
        { id: 1, name: 'John Doe', rollNumber: '001', marks: {} },
        { id: 2, name: 'Jane Smith', rollNumber: '002', marks: {} },
        { id: 3, name: 'Bob Johnson', rollNumber: '003', marks: {} },
        { id: 4, name: 'Alice Brown', rollNumber: '004', marks: {} },
        { id: 5, name: 'Charlie Davis', rollNumber: '005', marks: {} },
        { id: 6, name: 'Diana Wilson', rollNumber: '006', marks: {} },
        { id: 7, name: 'Edward Miller', rollNumber: '007', marks: {} },
        { id: 8, name: 'Fiona Garcia', rollNumber: '008', marks: {} },
        { id: 9, name: 'George Martinez', rollNumber: '009', marks: {} },
        { id: 10, name: 'Hannah Anderson', rollNumber: '010', marks: {} },
      ]
    },
    {
      id: '2',
      name: 'Class 10-B',
      students: [
        { id: 11, name: 'Ian Taylor', rollNumber: '011', marks: {} },
        { id: 12, name: 'Julia Thomas', rollNumber: '012', marks: {} },
        { id: 13, name: 'Kevin Jackson', rollNumber: '013', marks: {} },
        { id: 14, name: 'Laura White', rollNumber: '014', marks: {} },
        { id: 15, name: 'Michael Harris', rollNumber: '015', marks: {} },
      ]
    },
    {
      id: '3',
      name: 'Class 9-A',
      students: [
        { id: 16, name: 'Nancy Martin', rollNumber: '016', marks: {} },
        { id: 17, name: 'Oliver Thompson', rollNumber: '017', marks: {} },
        { id: 18, name: 'Paula Garcia', rollNumber: '018', marks: {} },
        { id: 19, name: 'Quinn Rodriguez', rollNumber: '019', marks: {} },
        { id: 20, name: 'Rachel Lewis', rollNumber: '020', marks: {} },
      ]
    }
  ]

  const subjects: Subject[] = [
    { id: 'math', name: 'Mathematics', maxMarks: 100 },
    { id: 'science', name: 'Science', maxMarks: 100 },
    { id: 'english', name: 'English', maxMarks: 100 },
    { id: 'history', name: 'History', maxMarks: 100 },
    { id: 'geography', name: 'Geography', maxMarks: 100 },
  ]

  // Load students when class is selected
  useEffect(() => {
    if (selectedClass) {
      const classData = classes.find(c => c.id === selectedClass)
      if (classData) {
        setStudents(classData.students)
      }
    } else {
      setStudents([])
    }
  }, [selectedClass])

  // Update marks for a student
  const updateMarks = (studentId: number, subject: string, marks: number) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { 
              ...student, 
              marks: { ...student.marks, [subject]: marks }
            }
          : student
      )
    )
    setHasChanges(true)
  }

  // Save marks to database
  const saveMarks = async () => {
    if (!selectedClass || !selectedSubject) return

    setIsSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In real app, send data to API
      const marksData = {
        classId: selectedClass,
        subject: selectedSubject,
        marks: students.map(student => ({
          studentId: student.id,
          marks: student.marks[selectedSubject] || 0
        }))
      }
      
      console.log('Saving marks:', marksData)
      
      setHasChanges(false)
      alert('Marks saved successfully!')
      
    } catch (error) {
      console.error('Error saving marks:', error)
      alert('Error saving marks. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  // Calculate statistics
  const getStatistics = () => {
    if (!selectedSubject || students.length === 0) {
      return { average: 0, highest: 0, lowest: 0, passed: 0 }
    }

    const validMarks = students
      .map(s => s.marks[selectedSubject])
      .filter(mark => mark !== null && mark !== undefined) as number[]

    if (validMarks.length === 0) {
      return { average: 0, highest: 0, lowest: 0, passed: 0 }
    }

    const average = validMarks.reduce((sum, mark) => sum + mark, 0) / validMarks.length
    const highest = Math.max(...validMarks)
    const lowest = Math.min(...validMarks)
    const passed = validMarks.filter(mark => mark >= 40).length

    return { average, highest, lowest, passed }
  }

  const stats = getStatistics()
  const selectedSubjectData = subjects.find(s => s.id === selectedSubject)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Marks Entry</h2>
          <p className="text-muted-foreground">
            Select a class and subject to enter marks for students
          </p>
        </div>
        <div className="flex space-x-2">
          {hasChanges && (
            <Button onClick={saveMarks} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Save className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Marks
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Class and Subject Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class and Subject</CardTitle>
          <CardDescription>
            Choose the class and subject for marks entry
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
                      {cls.name} ({cls.students.length} students)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name} (Max: {subject.maxMarks})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      {selectedClass && selectedSubject && students.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats.average.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Class average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Award className="mr-2 h-4 w-4" />
                Highest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.highest}
              </div>
              <p className="text-xs text-muted-foreground">Best score</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Lowest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.lowest}
              </div>
              <p className="text-xs text-muted-foreground">Needs improvement</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Passed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.passed}
              </div>
              <p className="text-xs text-muted-foreground">Students passed</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Marks Entry Table */}
      {selectedClass && selectedSubject && students.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Enter Marks - {selectedSubjectData?.name}</CardTitle>
            <CardDescription>
              Enter marks for {classes.find(c => c.id === selectedClass)?.name} 
              {selectedSubjectData && ` (Maximum: ${selectedSubjectData.maxMarks} marks)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => {
                  const marks = student.marks[selectedSubject] || null
                  const grade = marks !== null ? 
                    marks >= 90 ? 'A+' :
                    marks >= 80 ? 'A' :
                    marks >= 70 ? 'B' :
                    marks >= 60 ? 'C' :
                    marks >= 40 ? 'D' : 'F'
                    : '-'
                  
                  const status = marks !== null ? 
                    marks >= 40 ? 'Pass' : 'Fail' : 'Not Entered'

                  return (
                    <TableRow key={student.id}>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max={selectedSubjectData?.maxMarks || 100}
                          value={marks || ''}
                          onChange={(e) => {
                            const value = e.target.value
                            const numValue = value === '' ? null : parseInt(value)
                            if (numValue !== null) {
                              updateMarks(student.id, selectedSubject, numValue)
                            }
                          }}
                          placeholder="Enter marks"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          grade === 'A+' || grade === 'A' ? 'default' :
                          grade === 'B' || grade === 'C' ? 'secondary' :
                          grade === 'D' ? 'outline' : 'destructive'
                        }>
                          {grade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          status === 'Pass' ? 'default' :
                          status === 'Fail' ? 'destructive' : 'outline'
                        }>
                          {status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Show message when no class/subject is selected */}
      {(!selectedClass || !selectedSubject) && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Select Class and Subject
              </h3>
              <p className="text-muted-foreground">
                Please select both a class and subject to start entering marks
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

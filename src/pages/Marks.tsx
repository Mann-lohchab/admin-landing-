import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Plus, Edit, Trash2, Download, Upload } from 'lucide-react'

interface Student {
  id: number
  name: string
  rollNumber: string
  mathematics: number
  science: number
  english: number
  history: number
  total: number
  percentage: number
  grade: string
}

export const Marks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [showAddMarks, setShowAddMarks] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const students: Student[] = [
    {
      id: 1,
      name: 'John Doe',
      rollNumber: '001',
      mathematics: 85,
      science: 92,
      english: 78,
      history: 88,
      total: 343,
      percentage: 85.75,
      grade: 'A'
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNumber: '002',
      mathematics: 90,
      science: 88,
      english: 95,
      history: 92,
      total: 365,
      percentage: 91.25,
      grade: 'A+'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      rollNumber: '003',
      mathematics: 75,
      science: 82,
      english: 70,
      history: 78,
      total: 305,
      percentage: 76.25,
      grade: 'B'
    },
    {
      id: 4,
      name: 'Alice Brown',
      rollNumber: '004',
      mathematics: 88,
      science: 85,
      english: 92,
      history: 90,
      total: 355,
      percentage: 88.75,
      grade: 'A'
    },
    {
      id: 5,
      name: 'Charlie Davis',
      rollNumber: '005',
      mathematics: 65,
      science: 70,
      english: 68,
      history: 72,
      total: 275,
      percentage: 68.75,
      grade: 'C'
    }
  ]

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

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  )

  const MarksDialog = ({ student, onSave }: { student?: Student; onSave: (student: Student) => void }) => {
    const [formData, setFormData] = useState({
      name: student?.name || '',
      rollNumber: student?.rollNumber || '',
      mathematics: student?.mathematics || 0,
      science: student?.science || 0,
      english: student?.english || 0,
      history: student?.history || 0,
    })

    const handleSubmit = () => {
      const total = formData.mathematics + formData.science + formData.english + formData.history
      const percentage = (total / 4)
      let grade = 'F'
      
      if (percentage >= 90) grade = 'A+'
      else if (percentage >= 80) grade = 'A'
      else if (percentage >= 70) grade = 'B'
      else if (percentage >= 60) grade = 'C'
      else if (percentage >= 50) grade = 'D'

      onSave({
        ...formData,
        id: student?.id || Date.now(),
        total,
        percentage,
        grade
      })
    }

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{student ? 'Edit' : 'Add'} Student Marks</DialogTitle>
          <DialogDescription>
            {student ? 'Update the marks for this student' : 'Enter marks for a new student'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rollNumber" className="text-right">Roll Number</Label>
            <Input
              id="rollNumber"
              value={formData.rollNumber}
              onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mathematics" className="text-right">Mathematics</Label>
            <Input
              id="mathematics"
              type="number"
              value={formData.mathematics}
              onChange={(e) => setFormData({...formData, mathematics: parseInt(e.target.value) || 0})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="science" className="text-right">Science</Label>
            <Input
              id="science"
              type="number"
              value={formData.science}
              onChange={(e) => setFormData({...formData, science: parseInt(e.target.value) || 0})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="english" className="text-right">English</Label>
            <Input
              id="english"
              type="number"
              value={formData.english}
              onChange={(e) => setFormData({...formData, english: parseInt(e.target.value) || 0})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="history" className="text-right">History</Label>
            <Input
              id="history"
              type="number"
              value={formData.history}
              onChange={(e) => setFormData({...formData, history: parseInt(e.target.value) || 0})}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Marks Management</h2>
          <p className="text-muted-foreground">
            View and manage student marks and grades
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={showAddMarks} onOpenChange={setShowAddMarks}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Marks
              </Button>
            </DialogTrigger>
            <MarksDialog onSave={(student) => {
              console.log('Adding student:', student)
              setShowAddMarks(false)
            }} />
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">82.0%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Jane Smith</div>
            <p className="text-xs text-muted-foreground">91.25% average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">100%</div>
            <p className="text-xs text-muted-foreground">Students passing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Grade A+</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1</div>
            <p className="text-xs text-muted-foreground">Excellent students</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Marks</CardTitle>
          <CardDescription>
            View and manage marks for all students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Mathematics</TableHead>
                <TableHead>Science</TableHead>
                <TableHead>English</TableHead>
                <TableHead>History</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.mathematics}</TableCell>
                  <TableCell>{student.science}</TableCell>
                  <TableCell>{student.english}</TableCell>
                  <TableCell>{student.history}</TableCell>
                  <TableCell className="font-medium">{student.total}</TableCell>
                  <TableCell>{student.percentage.toFixed(2)}%</TableCell>
                  <TableCell>
                    <Badge className={getGradeColor(student.grade)}>
                      {student.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <MarksDialog 
                          student={student} 
                          onSave={(updatedStudent) => {
                            console.log('Updating student:', updatedStudent)
                          }} 
                        />
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the marks for {student.name}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => console.log('Deleting student:', student.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

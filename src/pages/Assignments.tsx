import React, { useState } from 'react'
import { AssignmentForm } from '@/components/assignments/AssignmentForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Calendar, Users } from 'lucide-react'

export const Assignments: React.FC = () => {
  const [showForm, setShowForm] = useState(false)

  const assignments = [
    {
      id: 1,
      title: 'Math Homework Chapter 5',
      description: 'Complete exercises 1-20 from chapter 5',
      dueDate: '2024-01-15',
      subject: 'Mathematics',
      submissions: 23,
      totalStudents: 30,
      status: 'active'
    },
    {
      id: 2,
      title: 'Science Lab Report',
      description: 'Write a detailed report on the chemistry experiment',
      dueDate: '2024-01-20',
      subject: 'Science',
      submissions: 15,
      totalStudents: 30,
      status: 'active'
    },
    {
      id: 3,
      title: 'History Essay',
      description: 'Write about World War II causes and effects',
      dueDate: '2024-01-10',
      subject: 'History',
      submissions: 30,
      totalStudents: 30,
      status: 'completed'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Assignments</h2>
          <p className="text-muted-foreground">
            Manage and track your class assignments
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Assignment</CardTitle>
            <CardDescription>
              Fill out the form below to create a new assignment for your students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssignmentForm 
              onSubmit={(assignment) => {
                console.log('Assignment created:', assignment)
                setShowForm(false)
              }}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {assignment.description}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(assignment.status)}>
                  {assignment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {assignment.submissions}/{assignment.totalStudents} submitted
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

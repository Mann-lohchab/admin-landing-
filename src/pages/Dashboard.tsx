import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, BarChart3, Bell } from 'lucide-react'

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '156',
      description: 'Active students',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Active Assignments',
      value: '12',
      description: 'Due this week',
      icon: BookOpen,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Pending Grades',
      value: '8',
      description: 'Need attention',
      icon: BarChart3,
      color: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'Notifications',
      value: '3',
      description: 'Unread messages',
      icon: Bell,
      color: 'text-red-600 dark:text-red-400',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening in your classroom today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest classroom activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">New assignment submitted</p>
                  <p className="text-xs text-muted-foreground">Math homework by John Doe</p>
                </div>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Grade updated</p>
                  <p className="text-xs text-muted-foreground">Science quiz results published</p>
                </div>
                <div className="text-xs text-muted-foreground">4 hours ago</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Reminder sent</p>
                  <p className="text-xs text-muted-foreground">Assignment due tomorrow</p>
                </div>
                <div className="text-xs text-muted-foreground">1 day ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">Create Assignment</Button>
            <Button variant="outline" className="w-full">Add Student</Button>
            <Button variant="outline" className="w-full">Send Notification</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

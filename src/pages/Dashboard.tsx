import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, BarChart3, Bell, UserCheck, Calendar, TrendingUp, AlertCircle, Clock, Plus } from 'lucide-react'
import { format } from 'date-fns'

interface DashboardStats {
  totalStudents: number
  totalClasses: number
  pendingAssignments: number
  todayAttendance: number
  unreadNotifications: number
  averageMarks: number
}

interface RecentActivity {
  id: number
  type: 'assignment' | 'attendance' | 'marks' | 'notice'
  title: string
  description: string
  time: string
  class?: string
  priority?: 'low' | 'medium' | 'high'
}

interface UpcomingEvent {
  id: number
  title: string
  type: 'exam' | 'assignment' | 'meeting' | 'holiday'
  date: string
  class?: string
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color: string
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalClasses: 0,
    pendingAssignments: 0,
    todayAttendance: 0,
    unreadNotifications: 0,
    averageMarks: 0
  })

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([])

  // Mock data - replace with actual API calls
  const mockStats: DashboardStats = {
    totalStudents: 156,
    totalClasses: 5,
    pendingAssignments: 12,
    todayAttendance: 89,
    unreadNotifications: 3,
    averageMarks: 82.5
  }

  const mockActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'assignment',
      title: 'Math Assignment Submitted',
      description: 'John Doe submitted Math homework',
      time: '2 hours ago',
      class: 'Class 10-A'
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Attendance Marked',
      description: 'Class 10-B attendance completed',
      time: '3 hours ago',
      class: 'Class 10-B'
    },
    {
      id: 3,
      type: 'marks',
      title: 'Science Test Graded',
      description: 'Published results for 28 students',
      time: '4 hours ago',
      class: 'Class 9-A'
    },
    {
      id: 4,
      type: 'notice',
      title: 'Notice Sent',
      description: 'Parent meeting reminder sent',
      time: '1 day ago',
      priority: 'high'
    }
  ]

  const mockEvents: UpcomingEvent[] = [
    {
      id: 1,
      title: 'Mathematics Unit Test',
      type: 'exam',
      date: '2025-07-20',
      class: 'Class 10-A'
    },
    {
      id: 2,
      title: 'Science Project Due',
      type: 'assignment',
      date: '2025-07-22',
      class: 'Class 10-B'
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      type: 'meeting',
      date: '2025-07-25'
    },
    {
      id: 4,
      title: 'Summer Break',
      type: 'holiday',
      date: '2025-07-28'
    }
  ]

  const quickActions: QuickAction[] = [
    {
      id: 'attendance',
      title: 'Mark Attendance',
      description: 'Take attendance for your classes',
      icon: UserCheck,
      href: '/attendance',
      color: 'bg-blue-500'
    },
    {
      id: 'assignments',
      title: 'Create Assignment',
      description: 'Create new assignment for students',
      icon: BookOpen,
      href: '/assignments',
      color: 'bg-green-500'
    },
    {
      id: 'marks',
      title: 'Enter Marks',
      description: 'Enter marks for your students',
      icon: BarChart3,
      href: '/marks',
      color: 'bg-purple-500'
    },
    {
      id: 'notice',
      title: 'Send Notice',
      description: 'Send notice to students or parents',
      icon: Bell,
      href: '/notifications',
      color: 'bg-orange-500'
    }
  ]

  useEffect(() => {
    setStats(mockStats)
    setRecentActivities(mockActivities)
    setUpcomingEvents(mockEvents)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <BookOpen className="h-4 w-4" />
      case 'attendance':
        return <UserCheck className="h-4 w-4" />
      case 'marks':
        return <BarChart3 className="h-4 w-4" />
      case 'notice':
        return <Bell className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'assignment':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'meeting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'holiday':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's your teaching overview for today.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {format(new Date(), 'EEEE, MMMM dd, yyyy')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4 text-blue-600" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across {stats.totalClasses} classes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserCheck className="mr-2 h-4 w-4 text-green-600" />
              Today's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.todayAttendance}%</div>
            <p className="text-xs text-muted-foreground">Average across classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-orange-600" />
              Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.pendingAssignments}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-purple-600" />
              Average Marks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.averageMarks}%</div>
            <p className="text-xs text-muted-foreground">Class performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions for daily tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => window.location.href = action.href}
              >
                <div className={`p-2 rounded-full ${action.color}`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className="flex-shrink-0 p-2 bg-muted rounded-full">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    {activity.class && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {activity.class}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {format(new Date(event.date), 'MMM dd, yyyy')}
                  </div>
                  {event.class && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {event.class}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

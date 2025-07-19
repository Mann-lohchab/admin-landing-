import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, GraduationCap, BookOpen, Bell, UserPlus, UserCheck, Calendar, TrendingUp, AlertCircle, Clock, Plus, Settings, School, Activity } from 'lucide-react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  totalNotices: number
  newEnrollments: number
  activeTeachers: number
}

interface RecentActivity {
  id: number
  type: 'student' | 'teacher' | 'class' | 'notice' | 'system'
  title: string
  description: string
  time: string
  class?: string
  priority?: 'low' | 'medium' | 'high'
}

interface UpcomingEvent {
  id: number
  title: string
  type: 'enrollment' | 'meeting' | 'holiday' | 'evaluation'
  date: string
  department?: string
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
  const navigate = useNavigate()
  
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalNotices: 0,
    newEnrollments: 0,
    activeTeachers: 0
  })

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([])

  // Mock data - replace with actual API calls
  const mockStats: DashboardStats = {
    totalStudents: 2847,
    totalTeachers: 156,
    totalClasses: 42,
    totalNotices: 8,
    newEnrollments: 23,
    activeTeachers: 148
  }

  const mockActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'student',
      title: 'New Student Enrolled',
      description: 'Alice Johnson enrolled in Class 10-A',
      time: '2 hours ago',
      class: 'Class 10-A'
    },
    {
      id: 2,
      type: 'teacher',
      title: 'Teacher Added',
      description: 'Dr. Sarah Wilson joined Mathematics department',
      time: '3 hours ago',
      class: 'Mathematics'
    },
    {
      id: 3,
      type: 'class',
      title: 'Class Assignment Updated',
      description: 'Mr. Robert Johnson assigned to Class 12-B',
      time: '4 hours ago',
      class: 'Class 12-B'
    },
    {
      id: 4,
      type: 'notice',
      title: 'School Notice Published',
      description: 'Parent-teacher meeting notice sent to all',
      time: '1 day ago',
      priority: 'high'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      description: 'Database backup completed successfully',
      time: '1 day ago',
      priority: 'low'
    }
  ]

  const mockEvents: UpcomingEvent[] = [
    {
      id: 1,
      title: 'New Student Orientation',
      type: 'enrollment',
      date: '2025-07-20',
      department: 'All Departments'
    },
    {
      id: 2,
      title: 'Staff Meeting',
      type: 'meeting',
      date: '2025-07-22',
      department: 'Administration'
    },
    {
      id: 3,
      title: 'Teacher Performance Review',
      type: 'evaluation',
      date: '2025-07-25',
      department: 'HR Department'
    },
    {
      id: 4,
      title: 'Summer Break',
      type: 'holiday',
      date: '2025-07-28',
      department: 'All Departments'
    }
  ]

  const quickActions: QuickAction[] = [
    {
      id: 'add-student',
      title: 'Add Student',
      description: 'Enroll new student to the school',
      icon: UserPlus,
      href: '/students/add',
      color: 'bg-blue-500'
    },
    {
      id: 'add-teacher',
      title: 'Add Teacher',
      description: 'Add new teacher to faculty',
      icon: GraduationCap,
      href: '/teachers/add',
      color: 'bg-green-500'
    },
    {
      id: 'manage-classes',
      title: 'Manage Classes',
      description: 'Assign teachers to classes',
      icon: School,
      href: '/classes',
      color: 'bg-purple-500'
    },
    {
      id: 'send-notice',
      title: 'Send Notice',
      description: 'Broadcast notice to school',
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

  const handleQuickAction = (href: string) => {
    navigate(href)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'student':
        return <Users className="h-4 w-4" />
      case 'teacher':
        return <GraduationCap className="h-4 w-4" />
      case 'class':
        return <School className="h-4 w-4" />
      case 'notice':
        return <Bell className="h-4 w-4" />
      case 'system':
        return <Settings className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'enrollment':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'evaluation':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'meeting':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'holiday':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'student':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
      case 'teacher':
        return 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
      case 'class':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
      case 'notice':
        return 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
      case 'system':
        return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400'
      default:
        return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, Administrator! Here's your school management overview.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {format(new Date(), 'EEEE, MMMM dd, yyyy')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/students')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4 text-blue-600" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-green-600">+{stats.newEnrollments} new this month</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/teachers')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-green-600" />
              Total Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">{stats.activeTeachers} active teachers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/classes')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <School className="mr-2 h-4 w-4 text-purple-600" />
              Total Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">Across all grades</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/notifications')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bell className="mr-2 h-4 w-4 text-orange-600" />
              Active Notices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalNotices}</div>
            <p className="text-xs text-muted-foreground">School-wide notices</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Frequently used administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
                onClick={() => handleQuickAction(action.href)}
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
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activities</span>
              <Button variant="ghost" size="sm" onClick={() => navigate('/activities')}>
                View All
              </Button>
            </CardTitle>
            <CardDescription>Latest administrative updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className={`flex-shrink-0 p-2 rounded-full ${getActivityTypeColor(activity.type)}`}>
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
                    {activity.priority && (
                      <Badge 
                        variant={activity.priority === 'high' ? 'destructive' : 'secondary'}
                        className="mt-1 ml-1 text-xs"
                      >
                        {activity.priority}
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
            <CardDescription>Important administrative dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {format(new Date(event.date), 'MMM dd, yyyy')}
                  </div>
                  {event.department && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {event.department}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate('/events')}>
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Admin Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
            <CardDescription>Current system health and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Database Status</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Online
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Last Backup</span>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Users</span>
                <span className="text-sm font-medium">47</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Student-Teacher Ratio</span>
                <span className="text-sm font-medium">18:1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Class Size</span>
                <span className="text-sm font-medium">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Departments</span>
                <span className="text-sm font-medium">6</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

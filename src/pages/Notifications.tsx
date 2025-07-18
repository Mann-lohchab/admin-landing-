import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Send, Bell, Clock, Users, Mail, Trash2, Eye } from 'lucide-react'

interface Notification {
  id: number
  title: string
  message: string
  type: 'announcement' | 'assignment' | 'reminder' | 'urgent'
  recipient: 'all' | 'students' | 'parents' | 'specific'
  status: 'draft' | 'sent' | 'scheduled'
  sentAt?: string
  scheduledFor?: string
  readCount: number
  totalRecipients: number
  createdAt: string
}

export const Notifications: React.FC = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  const notifications: Notification[] = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      message: 'Dear parents, we have scheduled a parent-teacher meeting for next Friday at 2:00 PM. Please confirm your attendance.',
      type: 'announcement',
      recipient: 'parents',
      status: 'sent',
      sentAt: '2024-01-15T10:00:00Z',
      readCount: 25,
      totalRecipients: 30,
      createdAt: '2024-01-15T09:30:00Z'
    },
    {
      id: 2,
      title: 'Assignment Due Reminder',
      message: 'This is a reminder that your Math homework is due tomorrow. Please submit your work on time.',
      type: 'reminder',
      recipient: 'students',
      status: 'sent',
      sentAt: '2024-01-16T14:00:00Z',
      readCount: 28,
      totalRecipients: 30,
      createdAt: '2024-01-16T13:45:00Z'
    },
    {
      id: 3,
      title: 'School Closure Notice',
      message: 'Due to severe weather conditions, the school will be closed tomorrow. All classes are cancelled.',
      type: 'urgent',
      recipient: 'all',
      status: 'sent',
      sentAt: '2024-01-17T16:00:00Z',
      readCount: 55,
      totalRecipients: 60,
      createdAt: '2024-01-17T15:30:00Z'
    },
    {
      id: 4,
      title: 'Science Fair Announcement',
      message: 'We are excited to announce our annual science fair next month. More details will follow soon.',
      type: 'announcement',
      recipient: 'all',
      status: 'draft',
      readCount: 0,
      totalRecipients: 60,
      createdAt: '2024-01-18T11:00:00Z'
    },
    {
      id: 5,
      title: 'Weekly Progress Report',
      message: 'Your weekly progress report is ready. Please review your child\'s performance and contact us if you have any questions.',
      type: 'assignment',
      recipient: 'parents',
      status: 'scheduled',
      scheduledFor: '2024-01-22T09:00:00Z',
      readCount: 0,
      totalRecipients: 30,
      createdAt: '2024-01-18T12:00:00Z'
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'announcement':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'assignment':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'reminder':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true
    return notification.status === selectedFilter
  })

  const CreateNotificationDialog = () => {
    const [formData, setFormData] = useState({
      title: '',
      message: '',
      type: 'announcement',
      recipient: 'all',
      scheduleFor: '',
      sendNow: true
    })

    const handleSubmit = () => {
      console.log('Creating notification:', formData)
      setShowCreateDialog(false)
      // Reset form
      setFormData({
        title: '',
        message: '',
        type: 'announcement',
        recipient: 'all',
        scheduleFor: '',
        sendNow: true
      })
    }

    return (
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
          <DialogDescription>
            Compose and send a notification to your recipients
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="col-span-3"
              placeholder="Enter notification title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="reminder">Reminder</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipient" className="text-right">Recipients</Label>
            <Select value={formData.recipient} onValueChange={(value) => setFormData({...formData, recipient: value})}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All (Students & Parents)</SelectItem>
                <SelectItem value="students">Students Only</SelectItem>
                <SelectItem value="parents">Parents Only</SelectItem>
                <SelectItem value="specific">Specific Recipients</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="message" className="text-right pt-2">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="col-span-3"
              placeholder="Enter your message here..."
              rows={4}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="schedule" className="text-right">Schedule</Label>
            <div className="col-span-3 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="sendNow"
                  name="schedule"
                  checked={formData.sendNow}
                  onChange={() => setFormData({...formData, sendNow: true})}
                />
                <Label htmlFor="sendNow">Send Now</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="scheduleFor"
                  name="schedule"
                  checked={!formData.sendNow}
                  onChange={() => setFormData({...formData, sendNow: false})}
                />
                <Label htmlFor="scheduleFor">Schedule For Later</Label>
              </div>
              {!formData.sendNow && (
                <Input
                  type="datetime-local"
                  value={formData.scheduleFor}
                  onChange={(e) => setFormData({...formData, scheduleFor: e.target.value})}
                  className="mt-2"
                />
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {formData.sendNow ? (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Now
              </>
            ) : (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Schedule
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Notifications</h2>
          <p className="text-muted-foreground">
            Send announcements and updates to students and parents
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Notification
            </Button>
          </DialogTrigger>
          <CreateNotificationDialog />
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">87%</div>
            <p className="text-xs text-muted-foreground">Average read rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground">Pending notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2</div>
            <p className="text-xs text-muted-foreground">Future notifications</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>
                View and manage all your notifications
              </CardDescription>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{notification.title}</h3>
                        <Badge className={getTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {notification.recipient}
                        </div>
                        {notification.status === 'sent' && (
                          <div className="flex items-center">
                            <Eye className="mr-1 h-3 w-3" />
                            {notification.readCount}/{notification.totalRecipients} read
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.sentAt ? 
                            `Sent ${new Date(notification.sentAt).toLocaleDateString()}` :
                            notification.scheduledFor ?
                            `Scheduled for ${new Date(notification.scheduledFor).toLocaleDateString()}` :
                            `Created ${new Date(notification.createdAt).toLocaleDateString()}`
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {notification.status === 'draft' && (
                        <Button variant="ghost" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this notification? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Send, Calendar as CalendarIcon, Users, BookOpen, AlertCircle, CheckCircle, Clock, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'

interface CalendarEvent {
  id: number
  date: string
  title: string
  type: 'exam' | 'assignment' | 'holiday' | 'meeting' | 'event'
  description?: string
  class?: string
}

interface Notice {
  id: number
  title: string
  message: string
  targetClass: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'draft' | 'sent' | 'scheduled'
  sentAt?: string
  scheduledFor?: string
  readCount: number
  totalRecipients: number
  createdAt: string
}

// Custom Calendar Component
const CustomCalendar: React.FC<{
  selectedDate: Date
  onDateSelect: (date: Date) => void
  events: CalendarEvent[]
}> = ({ selectedDate, onDateSelect, events }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const dateFormat = "d"
  const rows = []

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const onDateClick = (day: Date) => {
    onDateSelect(day)
  }

  // Header with month navigation
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <Button variant="ghost" size="sm" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  // Days of week header
  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return (
      <div className="grid grid-cols-7 border-b">
        {days.map((day, index) => (
          <div key={index} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
    )
  }

  // Calendar cells
  const renderCells = () => {
    let day = startDate
    const today = new Date()

    while (day <= endDate) {
      const week = []
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat)
        const cloneDay = day
        const dayEvents = getEventsForDate(day)
        
        week.push(
          <div
            key={day.toString()}
            className={`
              min-h-[80px] p-2 border-r border-b cursor-pointer transition-colors hover:bg-accent
              ${!isSameMonth(day, monthStart) ? 'text-muted-foreground bg-muted/30' : 'bg-background'}
              ${isSameDay(day, selectedDate) ? 'bg-primary/10 border-primary' : ''}
              ${isSameDay(day, today) ? 'font-bold' : ''}
            `}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isSameDay(day, today) ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                {formattedDate}
              </span>
              {dayEvents.length > 0 && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={`
                    text-xs px-1 py-0.5 rounded truncate
                    ${event.type === 'exam' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : ''}
                    ${event.type === 'assignment' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' : ''}
                    ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' : ''}
                    ${event.type === 'holiday' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : ''}
                    ${event.type === 'event' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' : ''}
                  `}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {week}
        </div>
      )
    }
    return <div>{rows}</div>
  }

  return (
    <div className="border rounded-lg bg-background">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export const Notifications: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showCreateNotice, setShowCreateNotice] = useState(false)
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [notices, setNotices] = useState<Notice[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])

  // Mock data for events
  const mockEvents: CalendarEvent[] = [
    {
      id: 1,
      date: '2025-07-18',
      title: 'Mathematics Unit Test',
      type: 'exam',
      description: 'Unit test on algebra and geometry',
      class: 'Class 10-A'
    },
    {
      id: 2,
      date: '2025-07-20',
      title: 'Science Project',
      type: 'assignment',
      description: 'Physics project deadline',
      class: 'Class 10-B'
    },
    {
      id: 3,
      date: '2025-07-22',
      title: 'Parent Meeting',
      type: 'meeting',
      description: 'Quarterly progress discussion'
    },
    {
      id: 4,
      date: '2025-07-25',
      title: 'Summer Break',
      type: 'holiday',
      description: 'Last day of classes'
    },
    {
      id: 5,
      date: '2025-07-28',
      title: 'English Literature Exam',
      type: 'exam',
      description: 'Final examination',
      class: 'Class 9-A'
    },
    {
      id: 6,
      date: '2025-07-19',
      title: 'Sports Day',
      type: 'event',
      description: 'Annual sports competition'
    },
    {
      id: 7,
      date: '2025-07-21',
      title: 'Chemistry Lab',
      type: 'assignment',
      description: 'Lab report submission',
      class: 'Class 10-A'
    }
  ]

  // Mock data for notices
  const mockNotices: Notice[] = [
    {
      id: 1,
      title: 'Mathematics Test Postponed',
      message: 'The mathematics unit test scheduled for tomorrow has been postponed to next Monday due to unforeseen circumstances.',
      targetClass: 'Class 10-A',
      priority: 'high',
      status: 'sent',
      sentAt: '2025-07-18T10:00:00Z',
      readCount: 28,
      totalRecipients: 30,
      createdAt: '2025-07-18T09:45:00Z'
    },
    {
      id: 2,
      title: 'Science Lab Safety Guidelines',
      message: 'Please ensure all students bring their safety goggles and lab coats for tomorrow\'s chemistry experiment.',
      targetClass: 'Class 10-B',
      priority: 'medium',
      status: 'sent',
      sentAt: '2025-07-17T14:30:00Z',
      readCount: 25,
      totalRecipients: 28,
      createdAt: '2025-07-17T14:15:00Z'
    },
    {
      id: 3,
      title: 'Field Trip Permission Forms',
      message: 'Please submit signed permission forms for the upcoming museum visit by Friday.',
      targetClass: 'Class 9-A',
      priority: 'medium',
      status: 'draft',
      readCount: 0,
      totalRecipients: 32,
      createdAt: '2025-07-18T11:30:00Z'
    }
  ]

  const classes = ['Class 10-A', 'Class 10-B', 'Class 9-A', 'Class 9-B', 'Class 8-A']

  useEffect(() => {
    setEvents(mockEvents)
    setNotices(mockNotices)
  }, [])

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(new Date(event.date), date)
    )
  }

  // Get events for selected date
  const selectedDateEvents = getEventsForDate(selectedDate)

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
      case 'event':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
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

  // Add Event Dialog and Create Notice Dialog components remain the same...
  const CreateNoticeDialog = () => {
    const [formData, setFormData] = useState({
      title: '',
      message: '',
      targetClass: '',
      priority: 'medium',
      sendNow: true,
      scheduleFor: ''
    })

    const handleSubmit = () => {
      const newNotice: Notice = {
        id: Date.now(),
        title: formData.title,
        message: formData.message,
        targetClass: formData.targetClass,
        priority: formData.priority as 'low' | 'medium' | 'high' | 'urgent',
        status: formData.sendNow ? 'sent' : 'scheduled',
        sentAt: formData.sendNow ? new Date().toISOString() : undefined,
        scheduledFor: !formData.sendNow ? formData.scheduleFor : undefined,
        readCount: formData.sendNow ? 0 : 0,
        totalRecipients: 30,
        createdAt: new Date().toISOString()
      }

      setNotices(prev => [newNotice, ...prev])
      setShowCreateNotice(false)
      
      setFormData({
        title: '',
        message: '',
        targetClass: '',
        priority: 'medium',
        sendNow: true,
        scheduleFor: ''
      })
    }

    return (
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send Notice to Students</DialogTitle>
          <DialogDescription>
            Create and send a notice to your selected class
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
              placeholder="Enter notice title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class" className="text-right">Class</Label>
            <Select value={formData.targetClass} onValueChange={(value) => setFormData({...formData, targetClass: value})}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
                <SelectItem value="all">All Classes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">Priority</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
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
              placeholder="Enter your notice message..."
              rows={4}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Send Options</Label>
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
          <Button variant="outline" onClick={() => setShowCreateNotice(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {formData.sendNow ? (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Notice
              </>
            ) : (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Schedule Notice
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    )
  }

  const AddEventDialog = () => {
    const [eventData, setEventData] = useState({
      title: '',
      type: 'event',
      description: '',
      class: '',
      date: format(selectedDate, 'yyyy-MM-dd')
    })

    const handleSubmit = () => {
      const newEvent: CalendarEvent = {
        id: Date.now(),
        title: eventData.title,
        type: eventData.type as 'exam' | 'assignment' | 'holiday' | 'meeting' | 'event',
        description: eventData.description,
        class: eventData.class || undefined,
        date: eventData.date
      }

      setEvents(prev => [...prev, newEvent])
      setShowAddEvent(false)
      
      setEventData({
        title: '',
        type: 'event',
        description: '',
        class: '',
        date: format(selectedDate, 'yyyy-MM-dd')
      })
    }

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Calendar Event</DialogTitle>
          <DialogDescription>
            Add a new event or exam to the calendar
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventTitle" className="text-right">Title</Label>
            <Input
              id="eventTitle"
              value={eventData.title}
              onChange={(e) => setEventData({...eventData, title: e.target.value})}
              className="col-span-3"
              placeholder="Event title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventType" className="text-right">Type</Label>
            <Select value={eventData.type} onValueChange={(value) => setEventData({...eventData, type: value})}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exam">Exam</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
                <SelectItem value="event">Event</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventDate" className="text-right">Date</Label>
            <Input
              id="eventDate"
              type="date"
              value={eventData.date}
              onChange={(e) => setEventData({...eventData, date: e.target.value})}
              className="col-span-3"
            />
          </div>
          {(eventData.type === 'exam' || eventData.type === 'assignment') && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventClass" className="text-right">Class</Label>
              <Select value={eventData.class} onValueChange={(value) => setEventData({...eventData, class: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="eventDescription" className="text-right pt-2">Description</Label>
            <Textarea
              id="eventDescription"
              value={eventData.description}
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
              className="col-span-3"
              placeholder="Event description (optional)"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddEvent(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </DialogFooter>
      </DialogContent>
    )
  }

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Notifications & Calendar</h2>
          <p className="text-muted-foreground">
            Manage events, exams, and send notices to students
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <AddEventDialog />
          </Dialog>
          <Dialog open={showCreateNotice} onOpenChange={setShowCreateNotice}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Send Notice
              </Button>
            </DialogTrigger>
            <CreateNoticeDialog />
          </Dialog>
        </div>
      </div>

      {/* Enhanced Calendar Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Academic Calendar
              </CardTitle>
              <CardDescription>
                Click on dates to view events. Today is highlighted with a blue circle.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <CustomCalendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                events={events}
              />
            </CardContent>
          </Card>
        </div>

        {/* Events for Selected Date */}
        <Card>
          <CardHeader>
            <CardTitle>Events on {format(selectedDate, 'EEEE, MMM dd, yyyy')}</CardTitle>
            <CardDescription>
              {selectedDateEvents.length} event(s) scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground">{event.title}</h4>
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                        )}
                        {event.class && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <BookOpen className="mr-1 h-3 w-3" />
                            {event.class}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No events scheduled for this date</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setShowAddEvent(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notice Board Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="mr-2 h-5 w-5" />
            Notice Board
          </CardTitle>
          <CardDescription>
            Recent notices sent to students and parents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notices.map((notice) => (
              <Card key={notice.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{notice.title}</h3>
                        <Badge className={getPriorityColor(notice.priority)}>
                          {notice.priority}
                        </Badge>
                        <Badge className={getStatusColor(notice.status)}>
                          {notice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {notice.message}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {notice.targetClass}
                        </div>
                        {notice.status === 'sent' && (
                          <div className="flex items-center">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {notice.readCount}/{notice.totalRecipients} read
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {notice.sentAt ? 
                            `Sent ${format(new Date(notice.sentAt), 'MMM dd, HH:mm')}` :
                            notice.scheduledFor ?
                            `Scheduled for ${format(new Date(notice.scheduledFor), 'MMM dd, HH:mm')}` :
                            `Created ${format(new Date(notice.createdAt), 'MMM dd, HH:mm')}`
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {notice.status === 'draft' && (
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
                            <AlertDialogTitle>Delete Notice</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this notice? This action cannot be undone.
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

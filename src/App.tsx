import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SidebarProvider } from '@/components/ui/sidebar'
import { DesktopLayout } from '@/components/layout/DesktopLayout'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Dashboard } from '@/pages/Dashboard'
import { Assignments } from '@/pages/Assignments'
import { Marks } from '@/pages/Marks'
import { Notifications } from '@/pages/Notifications'
import { Attendance } from '@/pages/Attendance'
import { Home, BookOpen, Users, Bell, BarChart3, UserCheck } from 'lucide-react'

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Assignments', href: '/assignments', icon: BookOpen },
  { name: 'Attendance', href: '/attendance', icon: UserCheck },
  { name: 'Marks', href: '/marks', icon: BarChart3 },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Notifications', href: '/notifications', icon: Bell },
]

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <SidebarProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <DesktopLayout 
              navigation={navigationItems}
              themeToggle={<ThemeToggle />}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/marks" element={<Marks />} />
                <Route path="/notifications" element={<Notifications />} />
              </Routes>
            </DesktopLayout>
          </div>
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App

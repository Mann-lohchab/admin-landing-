import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SidebarProvider } from '@/components/ui/sidebar'
import { DesktopLayout } from '@/components/layout/DesktopLayout'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Dashboard } from '@/pages/Dashboard'
import { Teachers } from '@/pages/Teacher'
import { Notifications } from '@/pages/Notifications'
import { Students } from '@/pages/Students'
import { Classes } from '@/pages/Classes' // This should work fine now

import { Home, Users, UserCheck, Bell, School } from 'lucide-react'

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Teachers', href: '/teachers', icon: UserCheck },
  { name: 'Classes', href: '/classes', icon: School },
  { name: 'Notifications', href: '/notifications', icon: Bell },
]

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <SidebarProvider>
          <div className="min-h-screen w-full bg-background font-sans antialiased">
            <DesktopLayout 
              navigation={navigationItems}
              themeToggle={<ThemeToggle />}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/add" element={<Students />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/teachers/add" element={<Teachers />} /> 
                <Route path="/classes" element={<Classes />} />
                {/* <Route path="/classes" element={<Classes />} />
                <Route path="/classes/add" element={<Classes />} /> */}
                <Route path="/notifications" element={<Notifications />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DesktopLayout>
          </div>
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  )
}

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-4">Page not found</p>
        <a 
          href="/" 
          className="text-primary hover:text-primary/80 underline"
        >
          Go back to Dashboard
        </a>
      </div>
    </div>
  )
}

export default App

import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { StudentList } from "@/components/students/StudentList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, List, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const recentActivities = [
    {
      id: '1',
      type: 'assignment',
      message: 'New assignment "Algebra Quiz" created for Grade 10A',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'student',
      message: 'Emma Johnson submitted English essay',
      time: '3 hours ago'
    },
    {
      id: '3',
      type: 'notification',
      message: 'Parent-teacher meeting scheduled for Friday',
      time: '5 hours ago'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-primary text-primary-foreground rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Ms. Anderson!</h1>
        <p className="text-primary-light">Here's what's happening in your classes today.</p>
      </div>

      {/* Dashboard Cards */}
      <section>
        <DashboardCards />
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/students">
            <Button variant="outline" className="h-20 flex-col gap-2 p-4 w-full">
              <Users className="h-6 w-6" />
              <span className="text-sm">View Students</span>
            </Button>
          </Link>
          <Link to="/assignments">
            <Button variant="outline" className="h-20 flex-col gap-2 p-4 w-full">
              <List className="h-6 w-6" />
              <span className="text-sm">Assignments</span>
            </Button>
          </Link>
          <Link to="/marks">
            <Button variant="outline" className="h-20 flex-col gap-2 p-4 w-full">
              <Bell className="h-6 w-6" />
              <span className="text-sm">Add Marks</span>
            </Button>
          </Link>
          <Link to="/notifications">
            <Button variant="outline" className="h-20 flex-col gap-2 p-4 w-full">
              <Bell className="h-6 w-6" />
              <span className="text-sm">Notifications</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Students */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Students</h2>
          <Link to="/students">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        <StudentList students={[]} />
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 last:pb-0 border-b last:border-b-0 border-border">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

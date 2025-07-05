import { useState } from "react";
import { NotificationsList } from "@/components/notifications/NotificationsList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Filter, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Notifications() {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleMarkAsRead = (id: string) => {
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };

  const handleMarkAllAsRead = () => {
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const notificationStats = {
    total: 12,
    unread: 5,
    high: 2,
    medium: 4,
    low: 6
  };

  const filters = [
    { id: "all", label: "All", count: notificationStats.total },
    { id: "unread", label: "Unread", count: notificationStats.unread },
    { id: "high", label: "High Priority", count: notificationStats.high },
    { id: "medium", label: "Medium Priority", count: notificationStats.medium }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground">Stay updated with important alerts</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="min-h-touch"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" size="icon" className="min-h-touch">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notification Summary */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notification Center</h3>
              <p className="text-sm text-muted-foreground">
                You have {notificationStats.unread} unread notifications
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{notificationStats.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{notificationStats.unread}</div>
              <div className="text-xs text-muted-foreground">Unread</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">{notificationStats.high}</div>
              <div className="text-xs text-muted-foreground">High Priority</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{notificationStats.medium}</div>
              <div className="text-xs text-muted-foreground">Medium Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Options */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter.id)}
            className="flex-shrink-0"
          >
            {filter.label}
            <Badge 
              variant="secondary" 
              className="ml-2 text-xs"
            >
              {filter.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div>
        <NotificationsList onMarkAsRead={handleMarkAsRead} />
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-3">Notification Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Assignment reminders</span>
              <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Student absence alerts</span>
              <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">System updates</span>
              <div className="w-10 h-6 bg-muted rounded-full flex items-center justify-start px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { StudentList } from "@/components/students/StudentList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Students() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleEditStudent = (student: any) => {
    toast({
      title: "Edit Student",
      description: `Opening editor for ${student.name}`,
    });
  };

  const handleAddStudent = () => {
    toast({
      title: "Add Student",
      description: "Opening new student form",
    });
  };

  const attendanceStats = {
    present: 78,
    absent: 12,
    late: 8,
    total: 98
  };

  const filters = [
    { id: "all", label: "All Students", count: 98 },
    { id: "present", label: "Present", count: 78 },
    { id: "absent", label: "Absent", count: 12 },
    { id: "late", label: "Late", count: 8 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-sm text-muted-foreground">Manage your class roster and attendance</p>
        </div>
        <Button 
          onClick={handleAddStudent}
          className="bg-primary text-primary-foreground hover:bg-primary-dark min-h-touch"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Attendance Overview */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-3">Today's Attendance</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{attendanceStats.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-status-present">{attendanceStats.present}</div>
              <div className="text-xs text-muted-foreground">Present</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-status-late">{attendanceStats.late}</div>
              <div className="text-xs text-muted-foreground">Late</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-status-absent">{attendanceStats.absent}</div>
              <div className="text-xs text-muted-foreground">Absent</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

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
      </div>

      {/* Students List */}
      <div>
        <StudentList onEditStudent={handleEditStudent} />
      </div>
    </div>
  );
}

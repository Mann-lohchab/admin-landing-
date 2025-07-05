import { useState } from "react";
import { AssignmentForm } from "@/components/assignments/AssignmentForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, BookOpen, Users, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  grade: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: 'active' | 'draft' | 'completed';
  description: string;
  points: number;
}

export default function Assignments() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  const mockAssignments: Assignment[] = [
    {
      id: '1',
      title: 'Algebra Quiz Chapter 5',
      subject: 'Mathematics',
      grade: '10A',
      dueDate: '2024-12-15',
      submissions: 18,
      totalStudents: 25,
      status: 'active',
      description: 'Quiz covering linear equations and graphing',
      points: 100
    },
    {
      id: '2',
      title: 'Science Lab Report',
      subject: 'Science',
      grade: '10B',
      dueDate: '2024-12-20',
      submissions: 12,
      totalStudents: 22,
      status: 'active',
      description: 'Report on chemical reactions experiment',
      points: 150
    },
    {
      id: '3',
      title: 'Essay: World War II',
      subject: 'History',
      grade: '10A',
      dueDate: '2024-12-10',
      submissions: 25,
      totalStudents: 25,
      status: 'completed',
      description: 'Analysis of major events during WWII',
      points: 200
    },
    {
      id: '4',
      title: 'Poetry Analysis',
      subject: 'English',
      grade: '10B',
      dueDate: '2024-12-25',
      submissions: 0,
      totalStudents: 22,
      status: 'draft',
      description: 'Analysis of modern poetry techniques',
      points: 120
    }
  ];

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'draft':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: Assignment['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'draft':
        return 'Draft';
      default:
        return 'Unknown';
    }
  };

  const handleCreateAssignment = () => {
    setEditingAssignment(null);
    setShowForm(true);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setShowForm(true);
  };

  const handleSaveAssignment = (assignment: any) => {
    // Handle save logic here
    setShowForm(false);
    setEditingAssignment(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAssignment(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  if (showForm) {
    return (
      <div className="p-mobile">
        <AssignmentForm
          assignment={editingAssignment || undefined}
          onSave={handleSaveAssignment}
          onCancel={handleCancelForm}
          isEditing={!!editingAssignment}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
          <p className="text-sm text-muted-foreground">Create and manage class assignments</p>
        </div>
        <Button 
          onClick={handleCreateAssignment}
          className="bg-primary text-primary-foreground hover:bg-primary-dark min-h-touch"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Assignment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">3</div>
            <div className="text-xs text-muted-foreground">Due Soon</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">12</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {mockAssignments.map((assignment) => (
          <Card key={assignment.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{assignment.title}</h3>
                      <Badge className={`text-xs ${getStatusColor(assignment.status)}`}>
                        {getStatusText(assignment.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{assignment.subject}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Grade {assignment.grade}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(assignment.dueDate)}</span>
                  </div>
                </div>

                {/* Progress and Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium text-foreground">
                        {assignment.submissions}/{assignment.totalStudents}
                      </span>
                      <span className="text-muted-foreground"> submissions</span>
                    </div>
                    <div className="text-sm text-warning font-medium">
                      {getDaysUntilDue(assignment.dueDate)}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditAssignment(assignment)}
                    className="min-h-touch"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

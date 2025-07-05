import { useState } from "react";
import { MultiSubjectMarksTable } from "@/components/marks/MultiSubjectMarksTable";
import { MultiSubjectMarksModal } from "@/components/marks/MultiSubjectMarksModal";
import { BulkUploadModal } from "@/components/marks/BulkUploadModal";
import { MarksFilters } from "@/components/marks/MarksFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, FileDown } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export interface StudentMarks {
  id: string;
  studentName: string;
  rollNo: string;
  class: string;
  subjects: Record<string, { obtained: number; total: number }>;
}

const sampleMarks: StudentMarks[] = [
  {
    id: '1',
    studentName: 'Emma Johnson',
    rollNo: '001',
    class: 'Grade 10A',
    subjects: {
      'Math': { obtained: 85, total: 100 },
      'Science': { obtained: 90, total: 100 },
      'English': { obtained: 78, total: 100 },
      'Social Studies': { obtained: 82, total: 100 },
      'Hindi': { obtained: 88, total: 100 },
      'Computer': { obtained: 92, total: 100 },
    }
  },
  {
    id: '2',
    studentName: 'Michael Chen',
    rollNo: '002',
    class: 'Grade 10A',
    subjects: {
      'Math': { obtained: 92, total: 100 },
      'Science': { obtained: 88, total: 100 },
      'English': { obtained: 85, total: 100 },
      'Social Studies': { obtained: 79, total: 100 },
      'Hindi': { obtained: 90, total: 100 },
      'Computer': { obtained: 87, total: 100 },
    }
  },
  {
    id: '3',
    studentName: 'Sarah Williams',
    rollNo: '003',
    class: 'Grade 10B',
    subjects: {
      'Math': { obtained: 78, total: 100 },
      'Science': { obtained: 85, total: 100 },
      'English': { obtained: 90, total: 100 },
      'Social Studies': { obtained: 88, total: 100 },
      'Hindi': { obtained: 82, total: 100 },
      'Computer': { obtained: 85, total: 100 },
    }
  },
];

export default function Marks() {
  const [marks, setMarks] = useState<StudentMarks[]>(sampleMarks);
  const [filteredMarks, setFilteredMarks] = useState<StudentMarks[]>(sampleMarks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingMarks, setEditingMarks] = useState<StudentMarks | null>(null);
  const [deleteMarkId, setDeleteMarkId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddMarks = (newMarks: Omit<StudentMarks, 'id'>) => {
    const marksData = {
      ...newMarks,
      id: Date.now().toString(),
    };
    const updatedMarks = [...marks, marksData];
    setMarks(updatedMarks);
    setFilteredMarks(updatedMarks);
    setIsModalOpen(false);
    toast({
      title: "Marks Added",
      description: `Marks for ${newMarks.studentName} have been added successfully.`,
    });
  };

  const handleEditMarks = (updatedMarks: StudentMarks) => {
    const newMarks = marks.map(mark => 
      mark.id === updatedMarks.id ? updatedMarks : mark
    );
    setMarks(newMarks);
    setFilteredMarks(newMarks);
    setEditingMarks(null);
    setIsModalOpen(false);
    toast({
      title: "Marks Updated",
      description: `Marks for ${updatedMarks.studentName} have been updated successfully.`,
    });
  };

  const handleDeleteMarks = (id: string) => {
    const studentMarks = marks.find(m => m.id === id);
    const updatedMarks = marks.filter(mark => mark.id !== id);
    setMarks(updatedMarks);
    setFilteredMarks(updatedMarks);
    setDeleteMarkId(null);
    toast({
      title: "Marks Deleted",
      description: `Marks for ${studentMarks?.studentName} have been deleted.`,
      variant: "destructive",
    });
  };

  const handleBulkUpload = (uploadedMarks: StudentMarks[]) => {
    const updatedMarks = [...marks, ...uploadedMarks];
    setMarks(updatedMarks);
    setFilteredMarks(updatedMarks);
    setIsBulkUploadOpen(false);
    toast({
      title: "Bulk Upload Successful",
      description: `${uploadedMarks.length} student records have been uploaded.`,
    });
  };

  const handleGenerateReport = (studentId: string) => {
    const studentMarks = marks.find(m => m.id === studentId);
    if (studentMarks) {
      // Simulate PDF generation
      toast({
        title: "Report Generated",
        description: `Report card for ${studentMarks.studentName} is being prepared for download.`,
      });
      // In real implementation, this would generate and download a PDF
    }
  };

  const handleFilter = (filters: { class: string; subject: string; grade: string }) => {
    let filtered = marks;
    
    if (filters.class && filters.class !== 'all') {
      filtered = filtered.filter(mark => mark.class === filters.class);
    }
    
    // For multi-subject marks, we need to convert to old format for filtering
    if (filters.subject && filters.subject !== 'all') {
      filtered = filtered.filter(mark => 
        Object.keys(mark.subjects).includes(filters.subject)
      );
    }
    
    if (filters.grade && filters.grade !== 'all') {
      filtered = filtered.filter(mark => {
        const totalObtained = Object.values(mark.subjects).reduce((sum, subject) => sum + subject.obtained, 0);
        const totalPossible = Object.values(mark.subjects).reduce((sum, subject) => sum + subject.total, 0);
        const percentage = (totalObtained / totalPossible) * 100;
        const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';
        return grade === filters.grade;
      });
    }
    
    setFilteredMarks(filtered);
  };

  // Convert marks for legacy filter component
  const convertedMarks = marks.map(studentMarks => {
    const totalObtained = Object.values(studentMarks.subjects).reduce((sum, subject) => sum + subject.obtained, 0);
    const totalPossible = Object.values(studentMarks.subjects).reduce((sum, subject) => sum + subject.total, 0);
    const percentage = (totalObtained / totalPossible) * 100;
    const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';
    
    return {
      id: studentMarks.id,
      studentName: studentMarks.studentName,
      subject: 'All Subjects', // Since we have multiple subjects
      marksObtained: totalObtained,
      totalMarks: totalPossible,
      grade: grade,
      class: studentMarks.class
    };
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Student Marks Management</h1>
        <p className="text-primary-light">Manage and track student performance across all subjects.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Student Marks
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setIsBulkUploadOpen(true)}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Bulk Upload
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            toast({
              title: "Export Started",
              description: "All marks are being exported to Excel format.",
            });
          }}
          className="flex items-center gap-2"
        >
          <FileDown className="h-4 w-4" />
          Export All
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marks.length}</div>
            <p className="text-xs text-muted-foreground">with recorded marks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marks.length > 0 ? Math.round(
                marks.reduce((sum, studentMarks) => {
                  const totalObtained = Object.values(studentMarks.subjects).reduce((s, subject) => s + subject.obtained, 0);
                  const totalPossible = Object.values(studentMarks.subjects).reduce((s, subject) => s + subject.total, 0);
                  return sum + ((totalObtained / totalPossible) * 100);
                }, 0) / marks.length
              ) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">across all subjects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Subjects Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">core subjects</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <MarksFilters marks={convertedMarks} onFilter={handleFilter} />

      {/* Marks Table */}
      <MultiSubjectMarksTable 
        marks={filteredMarks}
        onEdit={(marks) => {
          setEditingMarks(marks);
          setIsModalOpen(true);
        }}
        onDelete={(id) => setDeleteMarkId(id)}
        onGenerateReport={handleGenerateReport}
      />

      {/* Add/Edit Modal */}
      <MultiSubjectMarksModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMarks(null);
        }}
        onSubmit={editingMarks ? handleEditMarks : handleAddMarks}
        editingMarks={editingMarks}
      />

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        onUpload={handleBulkUpload}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteMarkId} onOpenChange={() => setDeleteMarkId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student Marks</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all marks for this student? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteMarkId && handleDeleteMarks(deleteMarkId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

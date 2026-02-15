import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, GraduationCap } from 'lucide-react';

export default function CoursesExamsPage() {
  const classes = [
    {
      name: 'Class 9th',
      description: 'Foundation building for board exams with comprehensive subject coverage.',
      subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
    },
    {
      name: 'Class 10th',
      description: 'Board exam preparation with focused practice and concept clarity.',
      subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
    },
    {
      name: 'Class 11th',
      description: 'Advanced learning for science and commerce streams.',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Accountancy'],
    },
    {
      name: 'Class 12th',
      description: 'Final board exam preparation with career guidance.',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Accountancy'],
    },
  ];

  const exams = [
    {
      name: 'NDA (National Defence Academy)',
      description: 'Comprehensive preparation for NDA entrance exam covering Mathematics and General Ability Test.',
      duration: '6-12 months',
    },
    {
      name: 'CDSE (Combined Defence Services Examination)',
      description: 'Focused training for CDS exam including English, General Knowledge, and Elementary Mathematics.',
      duration: '6-12 months',
    },
    {
      name: 'AFCAT (Air Force Common Admission Test)',
      description: 'Specialized coaching for Air Force entry covering General Awareness, Verbal Ability, Numerical Ability, and Reasoning.',
      duration: '4-8 months',
    },
    {
      name: 'Airforce Exam',
      description: 'Complete preparation for various Airforce recruitment exams including technical and non-technical positions.',
      duration: '4-8 months',
    },
    {
      name: 'Navy Exam',
      description: 'Comprehensive coaching for Indian Navy entrance exams covering all required subjects and physical fitness guidance.',
      duration: '4-8 months',
    },
  ];

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Courses & Exams</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive academic programs and competitive exam preparation courses designed to help you achieve your goals.
        </p>
      </div>

      {/* Classes Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="h-8 w-8 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Academic Classes</h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Quality education for school students with experienced faculty and proven teaching methods.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{classItem.name}</CardTitle>
                <CardDescription>{classItem.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Subjects Covered:</p>
                  <div className="flex flex-wrap gap-2">
                    {classItem.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Competitive Exams Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Award className="h-8 w-8 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Competitive Exam Preparation</h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Specialized coaching for defence and armed forces entrance examinations with expert guidance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Card key={exam.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{exam.name}</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Duration:</span>
                  <span>{exam.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join Keep Going Classes today and take the first step towards achieving your academic and career goals.
            </p>
            <a href="/admissions">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Apply for Admission
              </button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

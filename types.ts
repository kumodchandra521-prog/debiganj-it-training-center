export interface Course {
  id: string;
  titleBn: string;
  titleEn: string;
  icon: string;
  duration: string;
  fee: number;
  descriptionBn: string;
  descriptionEn: string;
  featuresBn: string[];
  featuresEn: string[];
  syllabusBn: string[];
  syllabusEn: string[];
  seatsLeft: number;
  totalSeats: number;
}

export interface StudentRegistration {
  id: string;
  name: string;
  fatherName: string;
  phone: string;
  email?: string;
  address: string;
  gender: string;
  courseId: string;
  courseNameBn: string;
  regDate: string;
  rollNumber: string;
  status: 'Pending' | 'Approved' | 'Completed';
  paymentStatus: 'Pending' | 'Paid';
}

export interface TypingLesson {
  id: string;
  language: 'bn' | 'en';
  difficulty: 'Beginner' | 'Medium' | 'Advanced';
  text: string;
  titleBn: string;
  titleEn: string;
}

export interface ExcelRow {
  id: number;
  name: string;
  bangla: number;
  english: number;
  math: number;
  total?: number;
  average?: number;
  grade?: string;
}

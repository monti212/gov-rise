import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Users, Star, BookOpen, CheckCircle, Award, Download } from 'lucide-react';

export const CourseDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get course info from URL params
  const searchParams = new URLSearchParams(location.search);
  const courseTitle = searchParams.get('title') || 'Course';

  const [enrolledLessons, setEnrolledLessons] = useState<number[]>([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleStartCourse = () => {
    navigate(`/no-data?action=${encodeURIComponent(`Enroll in ${courseTitle}`)}&source=course-detail`);
  };

  const handleStartLesson = (lessonId: number) => {
    navigate(`/no-data?action=${encodeURIComponent(`Start Lesson ${lessonId}`)}&source=course-detail`);
  };

  // Mock course data
  const getCourseData = (title: string) => {
    const courses = {
      'Australian Family Visa Essentials': {
        title: 'Australian Family Visa Essentials',
        description: 'Learn the fundamental principles and processes of family reunification in Australia, including visa types, requirements, and application procedures.',
        instructor: 'Immigration Team',
        duration: '3 hours',
        lessons: 12,
        students: 1245,
        rating: 4.8,
        level: 'Beginner',
        price: 'Free',
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        objectives: [
          'Understand different types of Australian family visas',
          'Learn about eligibility requirements and criteria',
          'Master the application process step-by-step',
          'Identify common challenges and how to avoid them',
          'Understand processing times and what to expect'
        ],
        syllabus: [
          {
            id: 1,
            title: 'Introduction to Australian Immigration',
            duration: '15 min',
            type: 'Video',
            description: 'Overview of Australia\'s immigration system and family reunification programs'
          },
          {
            id: 2,
            title: 'Partner Visas Overview',
            duration: '20 min',
            type: 'Video',
            description: 'Detailed explanation of partner visa subclasses 309/100 and 820/801'
          },
          {
            id: 3,
            title: 'Child and Dependent Visas',
            duration: '18 min',
            type: 'Video',
            description: 'Requirements and processes for child visa applications'
          },
          {
            id: 4,
            title: 'Parent Visa Options',
            duration: '25 min',
            type: 'Video',
            description: 'Understanding contributory and non-contributory parent visas'
          },
          {
            id: 5,
            title: 'Humanitarian Program Overview',
            duration: '12 min',
            type: 'Video',
            description: 'Split family provisions under the humanitarian program'
          },
          {
            id: 6,
            title: 'Eligibility Assessment',
            duration: '10 min',
            type: 'Quiz',
            description: 'Test your understanding of visa eligibility requirements'
          },
          {
            id: 7,
            title: 'Document Preparation',
            duration: '22 min',
            type: 'Video',
            description: 'Essential documents and preparation strategies'
          },
          {
            id: 8,
            title: 'Application Submission',
            duration: '16 min',
            type: 'Video',
            description: 'Step-by-step guide to submitting your application'
          },
          {
            id: 9,
            title: 'After Submission',
            duration: '14 min',
            type: 'Video',
            description: 'What happens after you submit your application'
          },
          {
            id: 10,
            title: 'Common Challenges',
            duration: '18 min',
            type: 'Video',
            description: 'Avoiding common mistakes and handling challenges'
          },
          {
            id: 11,
            title: 'Practice Exercise',
            duration: '15 min',
            type: 'Exercise',
            description: 'Hands-on practice with sample applications'
          },
          {
            id: 12,
            title: 'Final Assessment',
            duration: '20 min',
            type: 'Quiz',
            description: 'Comprehensive test of course material'
          }
        ],
        resources: [
          'Course handbook (PDF)',
          'Document checklist templates',
          'Sample application forms',
          'Glossary of immigration terms',
          'Useful websites and contacts'
        ]
      }
    };

    return courses[title as keyof typeof courses] || {
      title: title,
      description: 'A comprehensive course covering important aspects of Australian immigration and family reunification.',
      instructor: 'Immigration Team',
      duration: '2 hours',
      lessons: 8,
      students: 500,
      rating: 4.5,
      level: 'Intermediate',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      objectives: [
        'Understand key concepts',
        'Learn practical applications',
        'Develop necessary skills',
        'Pass assessment requirements'
      ],
      syllabus: [
        { id: 1, title: 'Introduction', duration: '15 min', type: 'Video', description: 'Course overview and objectives' },
        { id: 2, title: 'Core Concepts', duration: '20 min', type: 'Video', description: 'Essential knowledge and principles' },
        { id: 3, title: 'Practical Applications', duration: '25 min', type: 'Video', description: 'Real-world examples and case studies' },
        { id: 4, title: 'Assessment', duration: '15 min', type: 'Quiz', description: 'Test your understanding' }
      ],
      resources: [
        'Course materials',
        'Reference guides',
        'Practice exercises'
      ]
    };
  };

  const courseData = getCourseData(courseTitle);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Play className="h-4 w-4" />;
      case 'Quiz':
        return <CheckCircle className="h-4 w-4" />;
      case 'Exercise':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Video':
        return 'text-blue-600 bg-blue-50';
      case 'Quiz':
        return 'text-green-600 bg-green-50';
      case 'Exercise':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleGoBack}
            className="mb-4 p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{courseData.title}</h1>
              <p className="text-gray-600 text-lg mb-6">{courseData.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium text-gray-900">{courseData.rating}</span>
                  <span className="text-gray-600 ml-1">rating</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{courseData.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-5 w-5 mr-1" />
                  <span>{courseData.lessons} lessons</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  courseData.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  courseData.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {courseData.level}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleStartCourse}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Course - {courseData.price}
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Preview Course
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <img 
                  src={courseData.image} 
                  alt={courseData.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Course Instructor</h3>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{courseData.instructor}</h4>
                      <p className="text-gray-600 text-sm">Immigration Specialists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Objectives */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h2>
              <div className="space-y-3">
                {courseData.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-4">
                {courseData.syllabus.map((lesson, index) => (
                  <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <div className={`p-2 rounded-md mr-4 ${getTypeColor(lesson.type)}`}>
                          {getTypeIcon(lesson.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500 text-sm">{lesson.duration}</span>
                        <button
                          onClick={() => handleStartLesson(lesson.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          {lesson.type === 'Quiz' ? 'Take Quiz' : 'Start'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Resources */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Resources</h3>
              <div className="space-y-3">
                {courseData.resources.map((resource, index) => (
                  <div key={index} className="flex items-center">
                    <Download className="h-4 w-4 text-blue-600 mr-3" />
                    <button className="text-blue-600 hover:text-blue-800 text-sm hover:underline text-left">
                      {resource}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-50 rounded-full mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate of Completion</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Earn a certificate upon successful completion of this course.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    Complete all lessons and pass the final assessment to earn your certificate.
                  </p>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Student Satisfaction</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
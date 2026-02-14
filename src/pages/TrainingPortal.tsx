import React, { useState } from 'react';
import { Search, BookOpen, Clock, Award, PlayCircle, Star, Filter, ChevronDown, CheckCircle, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Course data for Australian immigration
const courses = [
  {
    id: 1,
    title: 'Australian Family Visa Essentials',
    description: 'Learn the fundamental principles and processes of family reunification in Australia.',
    level: 'Beginner',
    duration: '3 hours',
    rating: 4.8,
    students: 1245,
    progress: 0,
    instructor: 'Immigration Team',
    category: 'Fundamentals',
    tags: ['basics', 'overview', 'introduction'],
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    title: 'Australian Partner Visa Documentation Guide',
    description: 'A comprehensive guide to all documentation and legal requirements for successful partner visa applications.',
    level: 'Intermediate',
    duration: '4.5 hours',
    rating: 4.6,
    students: 892,
    progress: 0,
    instructor: 'Immigration Team',
    category: 'Legal',
    tags: ['legal', 'documents', 'requirements'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    title: 'Australian Embassy Interview Preparation',
    description: 'Prepare for embassy interviews with this comprehensive course on commonly asked questions and best practices.',
    level: 'Intermediate',
    duration: '2.5 hours',
    rating: 4.9,
    students: 1563,
    progress: 0,
    instructor: 'Immigration Team',
    category: 'Preparation',
    tags: ['interview', 'preparation', 'embassy'],
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    title: 'Cultural Integration in Australia',
    description: 'Learn effective strategies for cultural integration before and after moving to Australia.',
    level: 'All Levels',
    duration: '6 hours',
    rating: 4.7,
    students: 756,
    progress: 0,
    instructor: 'Immigration Team',
    category: 'Integration',
    tags: ['culture', 'integration', 'adaptation'],
    image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 5,
    title: 'Financial Planning for Australian Migration',
    description: 'Develop a solid financial plan to support your family through the Australian visa process.',
    level: 'Intermediate',
    duration: '3.5 hours',
    rating: 4.5,
    students: 621,
    progress: 0,
    instructor: 'Immigration Team',
    category: 'Financial',
    tags: ['finance', 'planning', 'budgeting'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 6,
    title: 'Mental Health During Migration to Australia',
    description: 'Strategies for maintaining good mental health during family separation and the visa process for Australia.',
    level: 'All Levels',
    duration: '2 hours',
    rating: 4.9,
    students: 1102,
    progress: 0,
    instructor: 'Immigration Team',
    category: 'Well-being',
    tags: ['mental health', 'well-being', 'coping'],
    image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

// Categories with updated counts
const categories = [
  { id: 'all', name: 'All Courses', count: 6 },
  { id: 'fundamentals', name: 'Fundamentals', count: 1 },
  { id: 'legal', name: 'Legal', count: 1 },
  { id: 'preparation', name: 'Preparation', count: 1 },
  { id: 'integration', name: 'Integration', count: 1 },
  { id: 'financial', name: 'Financial', count: 1 },
  { id: 'wellbeing', name: 'Well-being', count: 1 }
];

// Australian learning paths
const learningPaths = [
  {
    id: 1,
    title: 'Complete Australian Partner Visa Path',
    description: 'A comprehensive pathway covering all aspects of the partner visa process for Australia',
    courses: 5,
    duration: '15 hours',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    title: 'Australian Documentation Specialist',
    description: 'Focus on mastering all legal documentation requirements for Australian visas',
    courses: 3,
    duration: '10 hours',
    image: 'https://images.unsplash.com/photo-1423592707957-3b212afa6733?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

interface CourseCardProps {
  course: typeof courses[0];
  onStartCourse: (courseTitle: string) => void;
}

const CourseCard = ({ course, onStartCourse }: CourseCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
            {course.level}
          </span>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-700 ml-1">{course.rating}</span>
          </div>
        </div>
        <h3 className="font-medium text-gray-900 mb-1">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
        <div className="flex items-center text-gray-500 text-xs mb-3">
          <Clock size={14} className="mr-1" />
          <span>{course.duration}</span>
          <span className="mx-2">•</span>
          <UserCheck size={14} className="mr-1" />
          <span>{course.students} learners</span>
        </div>
        <button 
          onClick={() => onStartCourse(course.title)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
        >
          Start Course
        </button>
      </div>
    </div>
  );
};

export const TrainingPortal = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  
  // Filter courses based on search term and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      course.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort courses based on selection
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'highest-rated':
        return b.rating - a.rating;
      case 'most-popular':
        return b.students - a.students;
      case 'newest':
        return b.id - a.id;
      default:
        return 0; // recommended - keep original order
    }
  });

  const handleStartCourse = (courseTitle: string) => {
    navigate(`/course-detail?title=${encodeURIComponent(courseTitle)}`);
  };

  const handleStartLearningPath = (pathTitle: string) => {
    navigate(`/no-data?action=${encodeURIComponent(`Start Learning Path: ${pathTitle}`)}&source=training-portal`);
  };

  const handleViewAll = () => {
    navigate(`/no-data?action=View All Learning Paths&source=training-portal`);
  };

  const handleExploreCourses = () => {
    // Scroll to courses section or show courses
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMoreCertification = () => {
    navigate(`/no-data?action=Australian Immigration Specialist Certification&source=training-portal`);
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Australian Immigration Training Portal</h1>
        <p className="text-gray-600">Enhance your knowledge and skills with our comprehensive training courses on Australia's family reunification process.</p>
      </div>
      
      {/* Featured Learning Paths */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Australian Visa Learning Paths</h2>
          <button 
            onClick={handleViewAll}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map(path => (
            <div key={path.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 h-40 md:h-auto overflow-hidden">
                  <img 
                    src={path.image} 
                    alt={path.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="font-medium text-lg text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{path.description}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <BookOpen size={16} className="mr-1" />
                    <span>{path.courses} courses</span>
                    <span className="mx-2">•</span>
                    <Clock size={16} className="mr-1" />
                    <span>{path.duration}</span>
                  </div>
                  <button 
                    onClick={() => handleStartLearningPath(path.title)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Start Learning Path
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="md:flex justify-between">
          <div className="relative mb-4 md:mb-0 md:w-1/3">
            <input
              type="text"
              placeholder="Search Australian visa courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex space-x-4">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recommended">Recommended</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="most-popular">Most Popular</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Grid */}
      <div id="courses-section" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Australian Visa Courses</h2>
          <div className="text-sm text-gray-600">{sortedCourses.length} courses found</div>
        </div>
        
        {sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map(course => (
              <CourseCard key={course.id} course={course} onStartCourse={handleStartCourse} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <div className="mb-3">
              <Search className="h-12 w-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Your Progress Section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Your Learning Progress
          </h2>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <div className="mb-4">
              <PlayCircle className="h-16 w-16 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Start your Australian visa learning journey</h3>
            <p className="text-gray-500 mb-4">Enroll in a course to track your progress and earn certificates</p>
            <button 
              onClick={handleExploreCourses}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>
      
      {/* Certification Options */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
        <div className="md:flex items-center justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Australian Immigration Specialist Certification
            </h3>
            <p className="text-blue-700 mb-4">
              Complete all Australian visa courses in the learning path to earn a certificate demonstrating your knowledge of the Australian immigration process.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-blue-800">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Professional development</span>
              </div>
              <div className="flex items-center text-blue-800">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Verified digital credential</span>
              </div>
            </div>
          </div>
          <div>
            <button 
              onClick={handleLearnMoreCertification}
              className="bg-white text-blue-600 border border-blue-300 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors"
            >
              Learn More About Certification
            </button>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">What Our Australian Students Say</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-3">
              <div className="mr-3 flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                  JD
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">John Davies</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              "The Australian Partner Visa course was incredibly helpful in navigating the complex application process. The clear explanations and practical advice made a significant difference in our successful application."
            </p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-3">
              <div className="mr-3 flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                  MP
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Maria Patel</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              "The interview preparation course was a game-changer. I felt confident and prepared for my Australian embassy interview, and our family's application was approved much faster than we expected."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
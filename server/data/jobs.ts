export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // 'Full Time' | 'Part Time' | 'Contract' | 'Remote' | 'Internship'
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  postedDate: string;
}

export let initialJobs: Job[] = [
  {
    id: "job-001",
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Hyderabad, India",
    type: "Full Time",
    experience: "0-2 years",
    salary: "₹6 - ₹10 LPA",
    description: "Join TechNova as a Frontend Developer building responsive, state-of-the-art web applications using React, TypeScript, and Tailwind CSS.",
    responsibilities: [
      "Develop user-facing features using React.js and modern JavaScript",
      "Build reusable components and front-end libraries for future use",
      "Translate designs and wireframes into high quality code",
      "Optimize components for maximum performance across web devices"
    ],
    requirements: [
      "Proficiency in React, HTML5, CSS3, and JavaScript (ES6+)",
      "Understanding of REST APIs and client-side data handling",
      "Familiarity with Git and version control workflows",
      "Good problem-solving skills and attention to UI details"
    ],
    skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "REST API"],
    postedDate: "2026-08-01"
  },
  {
    id: "job-002",
    title: "Backend Developer",
    company: "CodeSphere Tech",
    location: "Bengaluru, India",
    type: "Full Time",
    experience: "2-4 years",
    salary: "₹10 - ₹16 LPA",
    description: "CodeSphere is seeking a Backend Engineer to architect scalable RESTful microservices and manage server-side logic in Express and Node.js.",
    responsibilities: [
      "Design and maintain high-performance REST APIs",
      "Integrate server-side logic with front-end applications",
      "Implement security and data protection measures",
      "Optimize backend architecture for speed and efficiency"
    ],
    requirements: [
      "Strong proficiency in Node.js, Express.js, and JavaScript",
      "Experience with database design and API endpoint security",
      "Familiarity with asynchronous programming and event loops",
      "Bachelor's degree in Computer Science or equivalent practical experience"
    ],
    skills: ["Node.js", "Express.js", "REST API", "JavaScript", "System Design"],
    postedDate: "2026-08-03"
  },
  {
    id: "job-003",
    title: "Full Stack Developer",
    company: "NextGen Labs",
    location: "Remote",
    type: "Full Time",
    experience: "1-3 years",
    salary: "₹8 - ₹14 LPA",
    description: "NextGen Labs is hiring a versatile Full Stack Developer capable of building end-to-end features from database APIs to client interfaces.",
    responsibilities: [
      "Develop both frontend and backend modules for cloud web applications",
      "Ensure cross-platform optimization for mobile and desktop screens",
      "Collaborate with product designers to create seamless user journeys",
      "Write clean, maintainable, and well-tested code"
    ],
    requirements: [
      "Hands-on experience with Node.js, Express, React, and REST APIs",
      "Understanding of web performance optimization and security principles",
      "Ability to work independently in an agile remote environment",
      "Excellent communication and teamwork skills"
    ],
    skills: ["React", "Node.js", "Express.js", "Axios", "REST API", "Tailwind CSS"],
    postedDate: "2026-08-04"
  },
  {
    id: "job-004",
    title: "React Developer",
    company: "InnovateX Studio",
    location: "Pune, India",
    type: "Contract",
    experience: "2-5 years",
    salary: "₹12 - ₹18 LPA",
    description: "InnovateX Studio requires an expert React Developer to engineer custom component libraries and dashboard web portals for SaaS clients.",
    responsibilities: [
      "Architect complex component state management systems",
      "Build real-time interactive charts and analytics dashboards",
      "Collaborate with UX designers to craft high-conversion landing interfaces",
      "Refactor existing codebases for modularity and scalability"
    ],
    requirements: [
      "3+ years building production web apps in React.js",
      "Deep understanding of Hooks, Context API, and state optimization",
      "Experience with CSS frameworks like Bootstrap and Tailwind",
      "Proven track record of delivering responsive SaaS interfaces"
    ],
    skills: ["React", "Redux", "TypeScript", "Bootstrap", "Tailwind CSS"],
    postedDate: "2026-08-05"
  },
  {
    id: "job-005",
    title: "Node.js Developer",
    company: "CloudForge Systems",
    location: "Mumbai, India",
    type: "Full Time",
    experience: "3-5 years",
    salary: "₹14 - ₹20 LPA",
    description: "CloudForge Systems is looking for a Senior Node.js Developer to craft robust REST APIs, handle asynchronous workflows, and optimize backend throughput.",
    responsibilities: [
      "Architect microservice communication routes using REST standards",
      "Implement authentication middleware, logging, and error handling",
      "Conduct code reviews and mentor junior developers",
      "Ensure API endpoints meet strict low-latency response criteria"
    ],
    requirements: [
      "Extensive experience with Express.js and Node.js frameworks",
      "Proficiency in HTTP status codes, error handling, and API design",
      "Solid knowledge of asynchronous JavaScript and event handling",
      "Experience in automated API testing and documentation"
    ],
    skills: ["Node.js", "Express.js", "REST API", "Middleware", "JavaScript"],
    postedDate: "2026-08-06"
  },
  {
    id: "job-006",
    title: "Data Analyst",
    company: "DataPulse Analytics",
    location: "Gurgaon, India",
    type: "Part Time",
    experience: "0-2 years",
    salary: "₹5 - ₹8 LPA",
    description: "DataPulse is seeking a detail-oriented Data Analyst to turn raw business data into actionable dashboard insights and executive reports.",
    responsibilities: [
      "Clean, process, and analyze complex datasets",
      "Create interactive visual summaries and reporting metrics",
      "Collaborate with engineering teams to validate data accuracy",
      "Present findings to cross-functional stakeholders"
    ],
    requirements: [
      "Strong analytical and logical reasoning capabilities",
      "Experience with data visualization tools and spreadsheets",
      "Basic knowledge of JavaScript data structures and JSON parsing",
      "Bachelor's degree in Mathematics, Statistics, CS or related fields"
    ],
    skills: ["Data Analysis", "JSON", "Spreadsheets", "Statistics", "Reporting"],
    postedDate: "2026-08-07"
  },
  {
    id: "job-007",
    title: "AI/ML Intern",
    company: "AI Dynamics Labs",
    location: "Remote",
    type: "Internship",
    experience: "0-1 years",
    salary: "₹3 - ₹5 LPA",
    description: "Gain hands-on experience at AI Dynamics Labs building intelligent software tools, fine-tuning prompts, and integrating web API endpoints.",
    responsibilities: [
      "Assist senior engineers in testing AI model integration pipelines",
      "Prepare and preprocess evaluation datasets for model training",
      "Build web interfaces to demonstrate prototype machine learning features",
      "Document API payload formats and benchmark response times"
    ],
    requirements: [
      "Basic understanding of Machine Learning concepts and Python/JS",
      "Enthusiasm for emerging artificial intelligence technologies",
      "Ability to write clean code and learn new frameworks quickly",
      "Currently pursuing or recently completed CS degree"
    ],
    skills: ["Python", "JavaScript", "AI/ML", "REST API", "Data Preprocessing"],
    postedDate: "2026-08-07"
  },
  {
    id: "job-008",
    title: "Software Engineer",
    company: "CyberCore Technologies",
    location: "Chennai, India",
    type: "Full Time",
    experience: "1-3 years",
    salary: "₹7 - ₹12 LPA",
    description: "CyberCore Technologies is hiring a Software Engineer to contribute to enterprise cloud software solutions and maintain client API services.",
    responsibilities: [
      "Develop high quality full-stack code for enterprise web modules",
      "Participate in daily standups and agile sprint planning",
      "Investigate and fix software defects identified in QA testing",
      "Write thorough documentation for internal API routes"
    ],
    requirements: [
      "Solid knowledge of computer science fundamentals and data structures",
      "Hands-on practice with modern Web development (React/Express/Node)",
      "Strong debugging and logical skills",
      "Degree in Computer Science, IT, or equivalent engineering stream"
    ],
    skills: ["JavaScript", "React", "Express.js", "Node.js", "Git", "REST API"],
    postedDate: "2026-08-08"
  }
];

// In-memory jobs array that gets modified by CRUD operations
export let jobsData: Job[] = [...initialJobs];

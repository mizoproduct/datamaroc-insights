// Mock data for DataMaroc dashboard
export interface JobData {
  title: string;
  company_name: string;
  location: string;
  via: string;
  description: string;
  job_highlights: string[];
  related_links: string[];
  thumbnail: string;
  extensions: string[];
  detected_extensions: { type: string; value: string }[];
  job_id: string;
  created_at: string;
  source: string;
  posted_date: string;
  job_type: string;
  company_website: string;
  Extracted_Keywords: string[];
  seniority_level: string;
  extracted_job_title: string;
  latitude: number;
  longitude: number;
  is_llm_used: boolean;
  salary?: number; // Mock salary data
}

// Moroccan cities with coordinates
const moroccanCities = [
  { name: "Casablanca", lat: 33.5731, lng: -7.5898 },
  { name: "Rabat", lat: 34.0209, lng: -6.8416 },
  { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
  { name: "Tangier", lat: 35.7595, lng: -5.8340 },
  { name: "Agadir", lat: 30.4278, lng: -9.5981 },
  { name: "Fez", lat: 34.0331, lng: -5.0003 },
  { name: "Salé", lat: 34.0531, lng: -6.7985 },
  { name: "Meknes", lat: 33.8935, lng: -5.5473 },
  { name: "Oujda", lat: 34.6814, lng: -1.9086 },
  { name: "Tetouan", lat: 35.5889, lng: -5.3626 }
];

const companies = [
  { name: "Attijariwafa Bank", logo: "https://images.unsplash.com/photo-1560472354-c79891b6e0f9?w=100&h=100&fit=crop&crop=center", website: "https://attijariwafabank.com" },
  { name: "BMCE Bank", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center", website: "https://bmcebank.ma" },
  { name: "CGI Morocco", logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=center", website: "https://cgi.com" },
  { name: "Capgemini", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop&crop=center", website: "https://capgemini.com" },
  { name: "IBM Morocco", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center", website: "https://ibm.com" },
  { name: "Orange Morocco", logo: "https://images.unsplash.com/photo-1560472354-c79891b6e0f9?w=100&h=100&fit=crop&crop=center", website: "https://orange.ma" },
  { name: "Maroc Telecom", logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=center", website: "https://iam.ma" },
  { name: "SQLI Morocco", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop&crop=center", website: "https://sqli.com" },
  { name: "Sopra Steria", logo: "https://images.unsplash.com/photo-1560472354-c79891b6e0f9?w=100&h=100&fit=crop&crop=center", website: "https://soprasteria.com" },
  { name: "Accenture Morocco", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center", website: "https://accenture.com" }
];

const jobTitles = [
  "Data Scientist", "Data Engineer", "Data Analyst", "BI Analyst", 
  "Machine Learning Engineer", "Business Intelligence Developer", 
  "Data Architect", "Analytics Manager", "Big Data Engineer", "Research Analyst"
];

const skills = [
  "Python", "SQL", "R", "Tableau", "Power BI", "Excel", "Spark", "Hadoop",
  "TensorFlow", "Pandas", "NumPy", "Scikit-learn", "PostgreSQL", "MongoDB",
  "AWS", "Azure", "Docker", "Kubernetes", "Git", "Jupyter", "Apache Airflow",
  "Snowflake", "dbt", "Looker", "Qlik", "SAS", "SPSS", "Matplotlib", "Seaborn"
];

// Generate mock job data
export const generateMockJobs = (count: number = 150): JobData[] => {
  const jobs: JobData[] = [];
  
  for (let i = 0; i < count; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const city = moroccanCities[Math.floor(Math.random() * moroccanCities.length)];
    const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const seniorityLevels = ["junior", "mid", "senior"];
    const jobTypes = ["Full Time", "Part Time", "Contract", "Internship"];
    
    // Generate random skills (3-8 skills per job)
    const numSkills = Math.floor(Math.random() * 6) + 3;
    const jobSkills = [];
    const skillsCopy = [...skills];
    for (let j = 0; j < numSkills; j++) {
      const randomIndex = Math.floor(Math.random() * skillsCopy.length);
      jobSkills.push(skillsCopy.splice(randomIndex, 1)[0]);
    }
    
    // Generate salary based on seniority and role
    const seniority = seniorityLevels[Math.floor(Math.random() * seniorityLevels.length)];
    let baseSalary = 180000; // Base in MAD (Moroccan Dirham)
    if (seniority === "junior") baseSalary = 180000;
    else if (seniority === "mid") baseSalary = 280000;
    else if (seniority === "senior") baseSalary = 420000;
    
    // Add randomness to salary
    const salary = baseSalary + Math.floor(Math.random() * 100000);
    
    const job: JobData = {
      title: `${jobTitle} - ${seniority.charAt(0).toUpperCase() + seniority.slice(1)} Level`,
      company_name: company.name,
      location: city.name,
      via: "LinkedIn",
      description: `We are seeking a talented ${jobTitle} to join our growing team in ${city.name}. This role offers exciting opportunities to work with cutting-edge data technologies and drive business insights.`,
      job_highlights: [
        "Competitive salary and benefits",
        "Remote work opportunities",
        "Professional development budget",
        "Modern tech stack"
      ],
      related_links: [company.website],
      thumbnail: company.logo,
      extensions: ["Full-time", "Health insurance", "Dental insurance"],
      detected_extensions: [
        { type: "schedule", value: "Full-time" },
        { type: "benefits", value: "Health insurance" }
      ],
      job_id: `job_${i + 1}_${Date.now()}`,
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      source: "LinkedIn Jobs",
      posted_date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      job_type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      company_website: company.website,
      Extracted_Keywords: jobSkills,
      seniority_level: seniority,
      extracted_job_title: jobTitle.toLowerCase().replace(/\s+/g, '_'),
      latitude: city.lat,
      longitude: city.lng,
      is_llm_used: Math.random() > 0.3,
      salary: salary
    };
    
    jobs.push(job);
  }
  
  return jobs;
};

export const mockJobs = generateMockJobs();

// Helper functions for dashboard stats
export const getJobGrowth = () => {
  // Mock growth calculation
  const currentWeek = mockJobs.filter(job => 
    new Date(job.posted_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  
  const previousWeek = Math.floor(currentWeek * (0.8 + Math.random() * 0.4));
  const growth = ((currentWeek - previousWeek) / previousWeek * 100);
  
  return {
    current: currentWeek,
    growth: Math.round(growth * 10) / 10,
    isPositive: growth > 0
  };
};

export const getTopSkills = (limit: number = 10) => {
  const skillCounts: { [key: string]: number } = {};
  
  mockJobs.forEach(job => {
    job.Extracted_Keywords.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });
  
  return Object.entries(skillCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([skill, count]) => ({
      skill,
      count,
      percentage: Math.round((count / mockJobs.length) * 100)
    }));
};

export const getCompanyStats = () => {
  const companyJobCounts: { [key: string]: number } = {};
  
  mockJobs.forEach(job => {
    companyJobCounts[job.company_name] = (companyJobCounts[job.company_name] || 0) + 1;
  });
  
  return companies.map(company => ({
    ...company,
    jobCount: companyJobCounts[company.name] || 0
  })).sort((a, b) => b.jobCount - a.jobCount);
};

export const getCitiesWithJobCounts = () => {
  const cityJobCounts: { [key: string]: number } = {};
  
  mockJobs.forEach(job => {
    cityJobCounts[job.location] = (cityJobCounts[job.location] || 0) + 1;
  });
  
  return moroccanCities.map(city => ({
    ...city,
    jobCount: cityJobCounts[city.name] || 0
  }));
};

export const getAverageSalaryByRole = () => {
  const roleSalaries: { [key: string]: number[] } = {};
  
  mockJobs.forEach(job => {
    if (job.salary) {
      const role = job.extracted_job_title.replace(/_/g, ' ');
      if (!roleSalaries[role]) roleSalaries[role] = [];
      roleSalaries[role].push(job.salary);
    }
  });
  
  return Object.entries(roleSalaries).map(([role, salaries]) => ({
    role: role.charAt(0).toUpperCase() + role.slice(1),
    averageSalary: Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length),
    count: salaries.length
  })).sort((a, b) => b.averageSalary - a.averageSalary);
};
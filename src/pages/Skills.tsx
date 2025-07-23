import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SkillsChart from '@/components/SkillsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Target } from 'lucide-react';
import { mockJobs } from '@/data/mockData';

const Skills = () => {
  // Calculate skill statistics
  const allSkills = mockJobs.flatMap(job => job.Extracted_Keywords);
  const skillCounts = allSkills.reduce((acc, skill) => {
    acc[skill] = (acc[skill] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSkills = Object.entries(skillCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20);

  const totalJobs = mockJobs.length;
  const avgSkillsPerJob = allSkills.length / totalJobs;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Skills Analysis</h1>
        <p className="text-muted-foreground">
          Deep dive into the most sought-after skills in Morocco's data science market
        </p>
      </div>

      {/* Skills Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Skills</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(skillCounts).length}</div>
            <p className="text-xs text-muted-foreground">Different technologies tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Demanded</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topSkills[0]?.[0] || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {topSkills[0] ? `${((topSkills[0][1] / totalJobs) * 100).toFixed(1)}% of jobs` : 'No data'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Skills/Job</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSkillsPerJob.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Skills required per position</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Skills Chart */}
        <div className="lg:col-span-2">
          <SkillsChart />
        </div>

        {/* Detailed Skills List */}
        <Card>
          <CardHeader>
            <CardTitle>Top Skills Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">
              Demand percentage across all job postings
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSkills.slice(0, 15).map(([skill, count], index) => {
                const percentage = (count / totalJobs) * 100;
                return (
                  <div key={skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                        <span className="font-medium text-sm">{skill}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Categories */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills by Category</CardTitle>
            <p className="text-sm text-muted-foreground">
              Grouped by technology type and expertise area
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Programming Languages */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-primary">Programming Languages</h4>
                <div className="space-y-2">
                  {topSkills
                    .filter(([skill]) => ['Python', 'R', 'SQL', 'Java', 'Scala', 'JavaScript'].includes(skill))
                    .slice(0, 6)
                    .map(([skill, count]) => (
                      <div key={skill} className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{skill}</Badge>
                        <span className="text-xs text-muted-foreground">{count}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Data Tools */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-primary">Data Tools</h4>
                <div className="space-y-2">
                  {topSkills
                    .filter(([skill]) => ['Tableau', 'Power BI', 'Excel', 'Apache Spark', 'Hadoop', 'Kafka'].includes(skill))
                    .slice(0, 6)
                    .map(([skill, count]) => (
                      <div key={skill} className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{skill}</Badge>
                        <span className="text-xs text-muted-foreground">{count}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Machine Learning */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-primary">ML & AI</h4>
                <div className="space-y-2">
                  {topSkills
                    .filter(([skill]) => ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'Machine Learning', 'AI'].includes(skill))
                    .slice(0, 6)
                    .map(([skill, count]) => (
                      <div key={skill} className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{skill}</Badge>
                        <span className="text-xs text-muted-foreground">{count}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Cloud & Infrastructure */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-primary">Cloud & Infrastructure</h4>
                <div className="space-y-2">
                  {topSkills
                    .filter(([skill]) => ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git'].includes(skill))
                    .slice(0, 6)
                    .map(([skill, count]) => (
                      <div key={skill} className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{skill}</Badge>
                        <span className="text-xs text-muted-foreground">{count}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Skills;
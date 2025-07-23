import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getTopSkills } from '@/data/mockData';

const SkillsChart = () => {
  const topSkills = getTopSkills(10);
  const maxCount = Math.max(...topSkills.map(skill => skill.count));

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Top 10 Skills in Demand</span>
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Most requested skills across all job postings
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {topSkills.map((skill, index) => (
          <div key={skill.skill} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <span className="font-medium">{skill.skill}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {skill.count} jobs
                </span>
                <span className="text-sm font-medium">
                  {skill.percentage}%
                </span>
              </div>
            </div>
            <Progress 
              value={(skill.count / maxCount) * 100} 
              className="h-2"
            />
          </div>
        ))}
        
        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Skills analysis based on {topSkills.reduce((acc, skill) => acc + skill.count, 0)} job requirements</span>
            <span>Updated daily</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsChart;
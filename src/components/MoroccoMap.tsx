import React, { useState } from 'react';
import { MapPin, Eye, EyeOff, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCitiesWithJobCounts } from '@/data/mockData';

const MoroccoMap = () => {
  const [showJobCounts, setShowJobCounts] = useState(true);
  const cities = getCitiesWithJobCounts();
  const maxJobs = Math.max(...cities.map(city => city.jobCount));

  // Mock SVG map of Morocco (simplified)
  const MoroccoSVG = () => (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-64 border border-border rounded-lg bg-gradient-to-br from-primary/5 to-accent/5"
    >
      {/* Morocco outline (simplified) */}
      <path
        d="M20 180 L50 150 L80 140 L120 130 L160 125 L200 120 L240 125 L280 130 L320 140 L350 160 L370 180 L360 220 L340 240 L300 250 L260 255 L220 260 L180 255 L140 250 L100 240 L60 220 L30 200 Z"
        fill="hsl(var(--primary))"
        fillOpacity="0.1"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        className="drop-shadow-sm"
      />
      
      {/* City markers */}
      {cities.map((city) => {
        // Convert lat/lng to SVG coordinates (mock conversion)
        const x = ((city.lng + 10) / 15) * 350 + 25;
        const y = ((35 - city.lat) / 10) * 200 + 50;
        const radius = Math.max(4, (city.jobCount / maxJobs) * 12);
        
        return (
          <g key={city.name}>
            {/* City dot */}
            <circle
              cx={x}
              cy={y}
              r={radius}
              fill="hsl(var(--primary))"
              className="cursor-pointer hover:fill-accent transition-colors drop-shadow-md"
            />
            {/* Pulse animation for cities with many jobs */}
            {city.jobCount > 10 && (
              <circle
                cx={x}
                cy={y}
                r={radius + 3}
                fill="hsl(var(--primary))"
                fillOpacity="0.3"
                className="animate-pulse"
              />
            )}
            {/* Job count label */}
            {showJobCounts && city.jobCount > 0 && (
              <text
                x={x}
                y={y - radius - 8}
                textAnchor="middle"
                className="fill-foreground text-xs font-medium"
              >
                {city.jobCount}
              </text>
            )}
            {/* City name */}
            <text
              x={x}
              y={y + radius + 12}
              textAnchor="middle"
              className="fill-muted-foreground text-xs"
            >
              {city.name}
            </text>
          </g>
        );
      })}
      
      {/* Decorative elements */}
      <circle cx="50" cy="50" r="2" fill="hsl(var(--accent))" fillOpacity="0.6" />
      <circle cx="350" cy="80" r="2" fill="hsl(var(--accent))" fillOpacity="0.6" />
      <circle cx="320" cy="240" r="2" fill="hsl(var(--accent))" fillOpacity="0.6" />
    </svg>
  );

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Jobs Across Morocco</span>
            <Zap className="h-4 w-4 text-accent animate-pulse" />
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowJobCounts(!showJobCounts)}
          >
            {showJobCounts ? (
              <>
                <EyeOff className="h-4 w-4 mr-1" />
                Hide counts
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" />
                Show counts
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Interactive map showing job distribution by city
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <MoroccoSVG />
          
          {/* City statistics */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Top Cities by Job Count</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cities
                .sort((a, b) => b.jobCount - a.jobCount)
                .slice(0, 6)
                .map((city) => (
                  <div
                    key={city.name}
                    className="flex items-center justify-between p-2 rounded-md bg-accent/10 border border-accent/20"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{city.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {city.jobCount}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Job locations</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse opacity-30" />
                  <span>High activity</span>
                </div>
              </div>
              <span>Real-time data</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoroccoMap;
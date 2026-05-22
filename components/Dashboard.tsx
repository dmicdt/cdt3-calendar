import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CalendarEvent, EVENT_COLORS } from '../types';

interface DashboardProps {
  events: CalendarEvent[];
}

export const Dashboard: React.FC<DashboardProps> = ({ events }) => {
  // Aggregate data
  const typeCount = events.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(typeCount).map(type => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: typeCount[type],
    color: type === 'core' ? '#3b82f6' : 
           type === 'inclusion' ? '#e11d48' :
           type === 'ai' ? '#9333ea' : 
           type === 'ethics' ? '#0d9488' : 
           type === 'challenge' ? '#f59e0b' : '#9ca3af'
  })).filter(d => d.name !== 'Holiday' && d.name !== 'Research');

  // Monthly workload
  const monthlyDataMap = events.reduce((acc, curr) => {
      if (curr.type === 'holiday' || curr.type === 'research') return acc;
      const month = new Date(curr.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
  }, {} as Record<string, number>);

  const barData = Object.keys(monthlyDataMap).map(m => ({ name: m, sessions: monthlyDataMap[m] }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Distribution Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-[#003366] mb-4">Training Distribution</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Workload Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-[#003366] mb-4">Monthly Workload Intensity</h3>
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="sessions" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="col-span-1 lg:col-span-2 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <span className="text-blue-600 text-xs font-bold uppercase">Total Sessions</span>
              <div className="text-2xl font-bold text-blue-900">{events.filter(e => e.type !== 'holiday').length}</div>
          </div>
          <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
              <span className="text-rose-600 text-xs font-bold uppercase">Inclusion</span>
              <div className="text-2xl font-bold text-rose-900">{typeCount['inclusion'] || 0}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <span className="text-purple-600 text-xs font-bold uppercase">AI Focused</span>
              <div className="text-2xl font-bold text-purple-900">{typeCount['ai'] || 0}</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <span className="text-amber-600 text-xs font-bold uppercase">Challenges</span>
              <div className="text-2xl font-bold text-amber-900">{typeCount['challenge'] || 0} days</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
              <span className="text-teal-600 text-xs font-bold uppercase">Ethics</span>
              <div className="text-2xl font-bold text-teal-900">{typeCount['ethics'] || 0}</div>
          </div>
      </div>

    </div>
  );
};
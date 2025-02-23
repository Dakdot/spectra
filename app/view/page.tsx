'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';

interface Shift {
  id: string;
  employeeName: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export default function ViewPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock shifts data
  const shifts: Shift[] = [
    {
      id: '1',
      employeeName: 'John Doe',
      date: new Date(),
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      date: new Date(),
      startTime: '10:00',
      endTime: '18:00',
    },
  ];

  const selectedDateShifts = shifts.filter(
    (shift) => shift.date.toDateString() === date?.toDateString()
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Schedule View</h2>
      
      <div className="flex space-x-6">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>

        <Card className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-4">
            Shifts for {date?.toLocaleDateString()}
          </h3>
          <div className="space-y-4">
            {selectedDateShifts.map((shift) => (
              <Card key={shift.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{shift.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {shift.startTime} - {shift.endTime}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
            {selectedDateShifts.length === 0 && (
              <p className="text-muted-foreground">No shifts scheduled for this date.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
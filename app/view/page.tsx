'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  availability: {
    [key: string]: {
      available: boolean;
      startTime?: string;
      endTime?: string;
    };
  };
}

interface Shift {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export default function ViewPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock employees data with availability times
  const employees: Employee[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      availability: {
        Monday: { available: true, startTime: '09:00', endTime: '17:00' },
        Tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
        Wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
        Thursday: { available: true, startTime: '09:00', endTime: '17:00' },
        Friday: { available: true, startTime: '09:00', endTime: '17:00' },
        Saturday: { available: false },
        Sunday: { available: false },
      },
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      availability: {
        Monday: { available: true, startTime: '10:00', endTime: '18:00' },
        Tuesday: { available: true, startTime: '10:00', endTime: '18:00' },
        Wednesday: { available: false },
        Thursday: { available: true, startTime: '10:00', endTime: '18:00' },
        Friday: { available: true, startTime: '10:00', endTime: '18:00' },
        Saturday: { available: true, startTime: '12:00', endTime: '20:00' },
        Sunday: { available: false },
      },
    },
  ];

  // Mock shifts data
  const shifts: Shift[] = [
    {
      id: '1',
      day: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: '2',
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '18:00',
    },
    {
      id: '3',
      day: 'Wednesday',
      startTime: '08:00',
      endTime: '16:00',
    },
  ];

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Employee Availability</h2>
        <Card className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                {weekdays.map((day) => (
                  <TableHead key={day}>{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  {weekdays.map((day) => (
                    <TableCell key={day}>
                      {employee.availability[day].available ? (
                        <span className="text-sm">
                          {employee.availability[day].startTime} - {employee.availability[day].endTime}
                        </span>
                      ) : (
                        <span className="text-destructive font-medium">X</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Shifts Schedule</h2>
        <Card className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.day}</TableCell>
                  <TableCell>{shift.startTime}</TableCell>
                  <TableCell>{shift.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Calendar View</h2>
        <div className="flex space-x-6">
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </Card>
          <Card className="p-4">
            <h3 className="text-xl font-semibold mb-4">Shifts for {date?.toLocaleDateString()}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shifts
                  .filter((shift) => shift.day === date?.toLocaleDateString('en-US', { weekday: 'long' }))
                  .map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell>{shift.startTime}</TableCell>
                      <TableCell>{shift.endTime}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
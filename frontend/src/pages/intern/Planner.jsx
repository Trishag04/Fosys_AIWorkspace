import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Calendar } from '../../components/ui/calendar';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { toast } from 'sonner';

const InternPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [events, setEvents] = useState([
    { date: new Date(2025, 0, 16), type: 'SCRUM', title: 'Daily Standup', description: 'Team sync meeting' },
    { date: new Date(2025, 0, 20), type: 'Holiday', title: 'Martin Luther King Jr. Day', description: 'Public Holiday' },
    { date: new Date(2025, 0, 22), type: 'Meeting', title: 'Sprint Planning', description: 'Plan next sprint tasks' },
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', type: 'Personal' });

  const eventColors = {
    SCRUM: 'bg-emerald-600',
    Holiday: 'bg-rose-600',
    Meeting: 'bg-sky-600',
    Personal: 'bg-violet-600'
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const handleAddEvent = () => {
    if (newEvent.title && selectedDate) {
      setEvents([...events, { date: selectedDate, ...newEvent }]);
      setNewEvent({ title: '', description: '', type: 'Personal' });
      setDialogOpen(false);
      toast.success('Event added successfully!');
    }
  };

  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleYearChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() + direction);
    setCurrentDate(newDate);
  };

  return (
    <DashboardLayout role="intern">
      <div data-testid="intern-planner" className="space-y-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Planner</h1>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  data-testid="prev-year-button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleYearChange(-1)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" /><ChevronLeft className="w-4 h-4 -ml-2" />
                </Button>
                <Button
                  data-testid="prev-month-button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleMonthChange(-1)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  data-testid="next-month-button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleMonthChange(1)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  data-testid="next-year-button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleYearChange(1)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4 -ml-2" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateClick}
              month={currentDate}
              onMonthChange={setCurrentDate}
              className="rounded-lg bg-slate-800/30 border-slate-700 p-4"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium text-white",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-slate-400 rounded-md w-full font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "relative h-16 w-full text-center text-sm p-0 focus-within:relative focus-within:z-20",
                day: "h-full w-full p-0 font-normal aria-selected:opacity-100 hover:bg-slate-700/50 rounded-md flex flex-col items-center justify-start pt-2",
                day_selected: "bg-indigo-600 text-white hover:bg-indigo-700",
                day_today: "bg-slate-700 text-white",
                day_outside: "text-slate-600",
                day_disabled: "text-slate-600",
                day_hidden: "invisible"
              }}
              components={{
                Day: ({ date, ...props }) => {
                  const dayEvents = getEventsForDate(date);
                  return (
                    <div className="h-full w-full" {...props}>
                      <div className="text-white mb-1">{date.getDate()}</div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {dayEvents.slice(0, 3).map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${eventColors[event.type]}`}
                            title={event.title}
                          />
                        ))}
                      </div>
                    </div>
                  );
                }
              }}
            />

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                <span className="text-sm text-slate-300">SCRUM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-600"></div>
                <span className="text-sm text-slate-300">Holiday</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-600"></div>
                <span className="text-sm text-slate-300">Meeting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-600"></div>
                <span className="text-sm text-slate-300">Personal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-white">Add Event</DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedDate && `Create event for ${selectedDate.toLocaleDateString()}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="event-title" className="text-slate-300">Title</Label>
              <Input
                id="event-title"
                data-testid="event-title-input"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event title"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="event-description" className="text-slate-300">Description</Label>
              <Textarea
                id="event-description"
                data-testid="event-description-input"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event description"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="event-type" className="text-slate-300">Event Type</Label>
              <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                <SelectTrigger data-testid="event-type-select" className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="SCRUM">SCRUM</SelectItem>
                  <SelectItem value="Holiday">Holiday</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button data-testid="save-event-button" onClick={handleAddEvent} className="w-full bg-indigo-600 hover:bg-indigo-700">Save Event</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default InternPlanner;

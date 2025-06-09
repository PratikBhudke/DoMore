import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService, Event } from '../services/event.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-event-planner',
  standalone: false,
  templateUrl: './event-planner.component.html',
  styleUrl: './event-planner.component.css'
})
export class EventPlannerComponent implements OnInit {
  eventForm: FormGroup;
  events: Event[] = [];
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  editingEvent: Event | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      location: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  get title() { return this.eventForm.get('title'); }
  get description() { return this.eventForm.get('description'); }
  get date() { return this.eventForm.get('date'); }
  get time() { return this.eventForm.get('time'); }
  get location() { return this.eventForm.get('location'); }
  get priority() { return this.eventForm.get('priority'); }

  loadEvents(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.eventService.getAllEvents()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (events) => {
          this.events = events;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load events. Please try again.';
          console.error('Error loading events:', error);
        }
      });
  }

  onSubmitEvent(): void {
    if (this.eventForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';
    const eventData: Event = this.eventForm.value;

    const request = this.editingEvent
      ? this.eventService.updateEvent(this.editingEvent.id!, eventData)
      : this.eventService.createEvent(eventData);

    request.pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: (event) => {
          if (this.editingEvent) {
            const index = this.events.findIndex(e => e.id === this.editingEvent!.id);
            if (index !== -1) {
              this.events[index] = event;
            }
          } else {
            this.events.push(event);
          }
          this.resetForm();
        },
        error: (error) => {
          this.errorMessage = `Failed to ${this.editingEvent ? 'update' : 'create'} event. Please try again.`;
          console.error('Error saving event:', error);
        }
      });
  }

  editEvent(event: Event): void {
    this.editingEvent = event;
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      priority: event.priority
    });
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.isLoading = true;
      this.errorMessage = '';

      this.eventService.deleteEvent(id)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: () => {
            this.events = this.events.filter(event => event.id !== id);
          },
          error: (error) => {
            this.errorMessage = 'Failed to delete event. Please try again.';
            console.error('Error deleting event:', error);
          }
        });
    }
  }

  resetForm(): void {
    this.eventForm.reset();
    this.editingEvent = null;
    this.errorMessage = '';
  }
}

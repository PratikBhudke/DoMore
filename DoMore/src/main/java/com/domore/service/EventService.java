package com.domore.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.domore.model.Event;
import com.domore.model.User;
import com.domore.repository.EventRepository;
import jakarta.transaction.Transactional;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    public List<Event> getAllEvents(User user) {
        return eventRepository.findByUser(user);
    }
    
    public Event getEventById(Long id, User user) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
            
        if (!event.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized to access this event");
        }
        
        return event;
    }
    
    public Event createEvent(Event event, User user) {
        if (event.getTitle() == null || event.getTitle().trim().isEmpty()) {
            throw new RuntimeException("Event title cannot be empty");
        }
        
        event.setUser(user);
        return eventRepository.save(event);
    }
    
    public Event updateEvent(Long id, Event event, User user) {
        Event existingEvent = getEventById(id, user);
        
        if (event.getTitle() != null && !event.getTitle().trim().isEmpty()) {
            existingEvent.setTitle(event.getTitle());
        }
        
        if (event.getDescription() != null) {
            existingEvent.setDescription(event.getDescription());
        }
        
        if (event.getDate() != null) {
            existingEvent.setDate(event.getDate());
        }
        
        if (event.getTime() != null) {
            existingEvent.setTime(event.getTime());
        }
        
        if (event.getLocation() != null) {
            existingEvent.setLocation(event.getLocation());
        }
        
        if (event.getPriority() != null) {
            existingEvent.setPriority(event.getPriority());
        }
        
        return eventRepository.save(existingEvent);
    }
    
    @Transactional
    public void deleteEvent(Long id, User user) {
        Event event = getEventById(id, user);
        eventRepository.delete(event);
    }
} 
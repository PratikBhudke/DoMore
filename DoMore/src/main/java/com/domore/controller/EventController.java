package com.domore.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.domore.model.Event;
import com.domore.model.User;
import com.domore.service.EventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@PreAuthorize("isAuthenticated()")
public class EventController {
    
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);
    
    @Autowired
    private EventService eventService;
    
    @GetMapping
    public ResponseEntity<?> getAllEvents(Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                logger.error("No authentication found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            User user = (User) authentication.getPrincipal();
            logger.info("Fetching events for user: {}", user.getEmail());
            
            List<Event> events = eventService.getAllEvents(user);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            logger.error("Error fetching events", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching events: " + e.getMessage());
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id, Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            User user = (User) authentication.getPrincipal();
            Event event = eventService.getEventById(id, user);
            return ResponseEntity.ok(event);
        } catch (RuntimeException e) {
            logger.error("Error fetching event with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Event not found: " + e.getMessage());
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event, Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            User user = (User) authentication.getPrincipal();
            Event createdEvent = eventService.createEvent(event, user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
        } catch (Exception e) {
            logger.error("Error creating event", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating event: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(
            @PathVariable Long id,
            @RequestBody Event event,
            Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            User user = (User) authentication.getPrincipal();
            Event updatedEvent = eventService.updateEvent(id, event, user);
            return ResponseEntity.ok(updatedEvent);
        } catch (RuntimeException e) {
            logger.error("Error updating event with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error updating event: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id, Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            User user = (User) authentication.getPrincipal();
            eventService.deleteEvent(id, user);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            logger.error("Error deleting event with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error deleting event: " + e.getMessage());
        }
    }
} 
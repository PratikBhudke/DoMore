package com.domore.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.domore.model.Todo;
import com.domore.repository.TodoRepository;

@Service
public class TodoService {
    
    @Autowired
    private TodoRepository todoRepository;
    
    // Create a new todo
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }
    
    // Get all todos
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
    
    // Get todo by id
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }
    
    // Update todo
    public Todo updateTodo(Long id, Todo todoDetails) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            Todo existingTodo = todo.get();
            existingTodo.setTitle(todoDetails.getTitle());
            existingTodo.setDescription(todoDetails.getDescription());
            existingTodo.setCompleted(todoDetails.isCompleted());
            existingTodo.setPriority(todoDetails.getPriority());
            existingTodo.setDueDate(todoDetails.getDueDate());
            return todoRepository.save(existingTodo);
        }
        return null;
    }
    
    // Delete todo
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
    
    // Toggle todo completion status
    public Todo toggleTodoStatus(Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            Todo existingTodo = todo.get();
            existingTodo.setCompleted(!existingTodo.isCompleted());
            return todoRepository.save(existingTodo);
        }
        return null;
    }
} 
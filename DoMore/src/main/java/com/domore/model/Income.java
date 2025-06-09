package com.domore.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "incomes")
public class Income {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "user_id", nullable = true, foreignKey = @ForeignKey(name = "fk_income_user"))
    private User user;
    
    @NotBlank(message = "Source is required")
    private String source;
    
    @NotNull(message = "Amount is required")
    @Min(value = 0, message = "Amount must be greater than or equal to 0")
    @Column(precision = 10, scale = 2)
    private BigDecimal amount;
    
    @NotNull(message = "Date is required")
    private LocalDate date;
    
    private String description;
    
    // Constructors
    public Income() {
    }
    
    public Income(String source, BigDecimal amount, LocalDate date, String description) {
        this.source = source;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
} 
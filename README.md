# DoMore - Your Personal Productivity Suite

DoMore is a comprehensive full-stack web application designed to help you manage various aspects of your daily life, from task management to financial tracking, all in one place.

## 🌟 Features

### 📝 Todo List
- Create, update, and manage your daily tasks
- Mark tasks as complete
- Organize tasks by categories or priorities

### 📅 Event Planner
- Schedule and manage your events
- Set reminders for important dates
- View your calendar in different formats

### 💰 Money Tracker
- Track your income and expenses
- Categorize transactions
- Generate financial reports
- Set and track financial goals

### ⛅ Weather
- Get real-time weather updates
- View 5-day forecast
- Search weather by location

### 🔗 URL Shortener
- Shorten long URLs for easy sharing
- Track click statistics
- Manage your shortened links

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 19
- **Language**: TypeScript
- **Styling**: CSS3
- **State Management**: RxJS
- **UI Components**: Angular Material

### Backend
- **Framework**: Spring Boot
- **Language**: Java 17+
- **Database**: (To be configured)
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm (v8 or later)
- Java 17 or later
- Maven 3.6.3 or later
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PratikBhudke/DoMore.git
   cd DoMore
   ```

2. **Backend Setup**
   ```bash
   cd DoMore
   mvn clean install
   ```

3. **Frontend Setup**
   ```bash
   cd ../DoMore-F
   npm install
   ```

### Running the Application

1. **Start Backend**
   ```bash
   cd DoMore
   mvn spring-boot:run
   ```
   Backend will be available at `http://localhost:8080`

2. **Start Frontend**
   ```bash
   cd DoMore-F
   ng serve
   ```
   Frontend will be available at `http://localhost:4200`

## 📂 Project Structure

```
DoMore/
├── DoMore/                # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/domore/
│   │   │   │   ├── config/      # Configuration classes
│   │   │   │   ├── controller/  # REST controllers
│   │   │   │   ├── model/      # Entity classes
│   │   │   │   ├── repository/  # Data access layer
│   │   │   │   ├── security/   # Security configuration
│   │   │   │   └── service/    # Business logic
│   │   │   └── resources/      # Application properties
│   │   └── test/               # Test files
│   └── pom.xml                 # Maven configuration
│
└── DoMore-F/               # Frontend (Angular)
    ├── src/
    │   ├── app/
    │   │   ├── components/    # Reusable components
    │   │   ├── guards/        # Route guards
    │   │   ├── services/      # API services
    │   │   └── ...
    │   ├── assets/          # Static assets
    │   └── environments/     # Environment configurations
    └── package.json          # Frontend dependencies
```

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the request header.

## 📝 API Documentation

API documentation is available at `http://localhost:8080/swagger-ui.html` when running in development mode.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using Angular and Spring Boot
- Icons by [Font Awesome](https://fontawesome.com/)
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)

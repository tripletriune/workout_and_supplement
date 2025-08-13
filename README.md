# Workout & Supplement Tracker 💪

A modern, AI-powered fitness companion that helps you design custom workouts, track your fitness journey, and get intelligent supplement recommendations. Built with React and powered by OpenAI's GPT models for personalized fitness guidance.

## ✨ Features

### 🏋️ Workout Designer
- **Custom Workout Creation**: Design personalized workouts based on your fitness goals
- **Exercise Database**: Access a comprehensive library of exercises with detailed instructions
- **Smart Recommendations**: AI-powered exercise suggestions based on your preferences
- **Difficulty Scaling**: Workouts adapt to your fitness level

### 📅 Workout Scheduler
- **Weekly Planning**: Schedule and organize your workout routine
- **Progress Tracking**: Monitor your fitness journey over time
- **Flexible Scheduling**: Easily modify and reschedule workouts
- **Visual Calendar**: Clean, intuitive interface for workout planning

### 💊 Supplement Copilot
- **AI-Powered Recommendations**: Get personalized supplement advice based on your goals
- **Comprehensive Database**: Access information on popular fitness supplements
- **Goal-Based Suggestions**: Recommendations tailored to muscle gain, fat loss, or general health
- **Safety Information**: Important dosage and interaction warnings

### 🤖 AI Assistant
- **Natural Language Interface**: Chat with your fitness AI for instant guidance
- **Personalized Advice**: Get recommendations based on your specific needs and goals
- **Real-time Support**: Ask questions about workouts, nutrition, and supplements
- **Context-Aware**: Remembers your preferences and workout history

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tripletriune/workout_and_supplement.git
   cd workout_and_supplement
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to start using the app!

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API
- **Build Tool**: Vite
- **Code Quality**: ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── WorkoutDesigner.jsx    # Custom workout creation
│   ├── WorkoutSchedule.jsx    # Weekly workout planning
│   ├── SupplementCopilot.jsx  # AI supplement recommendations
│   └── CopilotAssistant.jsx   # AI chat interface
├── data/
│   └── supplementDatabase.js  # Supplement information database
├── config/
│   └── openai.js             # OpenAI API configuration
└── App.jsx                   # Main application component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage Examples

### Creating a Custom Workout
1. Navigate to the Workout Designer
2. Select your fitness goals (strength, cardio, flexibility)
3. Choose your experience level
4. Let the AI generate a personalized workout plan
5. Customize exercises and sets as needed

### Getting Supplement Advice
1. Open the Supplement Copilot
2. Describe your fitness goals and current routine
3. Receive AI-powered supplement recommendations
4. Browse the supplement database for detailed information

### Scheduling Workouts
1. Use the Workout Schedule to plan your week
2. Drag and drop workouts to different days
3. Track your progress and consistency
4. Adjust your schedule based on AI recommendations

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: Keep your API keys secure and never commit them to version control.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- The React and Vite teams for excellent development tools
- Tailwind CSS for beautiful, responsive styling

---

**Ready to transform your fitness journey? Start tracking workouts and optimizing your supplement stack today!** 🚀

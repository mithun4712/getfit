const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateWorkout = async (req, res) => {
    try {
        const { goal, difficulty, duration, equipment } = req.body;
        const user = req.user;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Create a personalized workout plan for a user with the following profile:
      - Goal: ${goal || 'General Fitness'}
      - Difficulty: ${difficulty || 'Intermediate'}
      - Duration: ${duration || '45'} minutes
      - Available Equipment: ${equipment || 'None (Bodyweight)'}
      - User Stats: Age ${user.biometrics?.age || 'N/A'}, Weight ${user.biometrics?.weight || 'N/A'}kg.

      Format the response as a JSON object with the following structure:
      {
        "title": "Workout Name",
        "description": "Short description",
        "exercises": [
          { "name": "Exercise Name", "sets": 3, "reps": 12, "instructions": "How to do it" }
        ],
        "estimatedCaloriesBurned": 300
      }
      Only return the JSON object.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown formatting from AI response
        const jsonString = text.replace(/```json|```/g, "").trim();
        const workoutPlan = JSON.parse(jsonString);

        res.status(200).json({
            status: 'success',
            data: workoutPlan
        });
    } catch (err) {
        console.error("AI Error:", err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to generate workout plan',
            details: err.message
        });
    }
};

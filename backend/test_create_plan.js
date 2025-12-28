
// Native fetch used

async function testCreatePlan() {
    try {
        const response = await fetch('http://localhost:5000/api/fitness/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // No Auth header needed due to backend bypass
            },
            body: JSON.stringify({
                title: "Test Plan",
                description: "Testing backend",
                caloriesBurned: 100,
                exercises: []
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

testCreatePlan();

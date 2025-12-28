const jwt = require('jsonwebtoken');

async function testAuthSwitching() {
    try {
        // Create dummy tokens
        const tokenUserA = jwt.sign({ sub: 'user_A_id_123' }, 'secret');
        const tokenUserB = jwt.sign({ sub: 'user_B_id_456' }, 'secret');

        console.log('Testing User A...');
        const resA = await fetch('http://localhost:5000/api/fitness/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenUserA}`
            },
            body: JSON.stringify({ title: "Plan A", exercises: [] })
        });
        const dataA = await resA.json();
        console.log('User A created workout for:', dataA.data.userId);

        console.log('Testing User B...');
        const resB = await fetch('http://localhost:5000/api/fitness/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenUserB}`
            },
            body: JSON.stringify({ title: "Plan B", exercises: [] })
        });
        const dataB = await resB.json();
        console.log('User B created workout for:', dataB.data.userId);

        if (dataA.data.userId !== dataB.data.userId) {
            console.log('SUCCESS: Users are different!');
        } else {
            console.log('FAIL: Users are the same!');
        }

    } catch (error) {
        console.error('Test Error:', error);
    }
}

testAuthSwitching();

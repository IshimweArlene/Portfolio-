// Simple test script to verify email sending works
const testEmail = async () => {
  try {
    console.log('🧪 Testing email API...');
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        location: 'Test Location',
        subject: 'Test Subject',
        message: 'This is a test message'
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

testEmail();

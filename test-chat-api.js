/**
 * Simple test script for chat API endpoints
 * Run with: node test-chat-api.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
let sessionCookie = '';

async function testChatAPI() {
  console.log('Starting Chat API Tests...\n');

  try {
    // Test 1: Send a chat message
    console.log('Test 1: Sending chat message...');
    const chatResponse = await axios.post(`${BASE_URL}/api/chat`, {
      message: 'What services does Northbound Studio offer?',
      type: 'chatbot'
    });

    console.log('Response:', chatResponse.data);
    console.log('Session ID:', chatResponse.data.sessionId);

    // Extract session cookie
    const cookies = chatResponse.headers['set-cookie'];
    if (cookies) {
      sessionCookie = cookies.find(c => c.startsWith('session_id='));
      console.log('Session Cookie:', sessionCookie?.split(';')[0]);
    }
    console.log('✓ Chat message sent successfully\n');

    // Test 2: Send another message in same session
    console.log('Test 2: Sending follow-up message...');
    const followUpResponse = await axios.post(`${BASE_URL}/api/chat`, {
      message: 'Tell me about RAG systems',
      type: 'rag'
    }, {
      headers: {
        Cookie: sessionCookie
      }
    });

    console.log('Response:', followUpResponse.data);
    console.log('✓ Follow-up message sent successfully\n');

    // Test 3: Retrieve chat history (if session exists)
    if (sessionCookie) {
      console.log('Test 3: Retrieving chat history...');
      try {
        const historyResponse = await axios.get(`${BASE_URL}/api/chat`, {
          headers: {
            Cookie: sessionCookie
          }
        });

        console.log('History:', historyResponse.data);
        console.log('✓ Chat history retrieved successfully\n');
      } catch (error) {
        console.log('⚠ Chat history retrieval:', error.response?.data || error.message);
      }
    }

    // Test 4: Test without session
    console.log('Test 4: Retrieving history without session...');
    try {
      await axios.get(`${BASE_URL}/api/chat`);
      console.log('✗ Should have returned 404\n');
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('✓ Correctly returned 404 for missing session\n');
      } else {
        console.log('⚠ Unexpected error:', error.response?.data || error.message, '\n');
      }
    }

    console.log('All tests completed!');

  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Check if server is running before testing
axios.get(`${BASE_URL}/api/chat`)
  .catch(() => {
    // Expected to fail, just checking if server is up
  })
  .then(() => {
    testChatAPI();
  })
  .catch((error) => {
    console.error('Server is not running. Start it with: npm run dev');
    process.exit(1);
  });

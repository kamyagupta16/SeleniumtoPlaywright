const http = require('http');

const data = JSON.stringify({
  model: 'codellama',
  prompt: 'Return the exact word: "Connected"',
  stream: false
});

const options = {
  hostname: '127.0.0.1',
  port: 11434,
  path: '/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const json = JSON.parse(body);
        if (json.response.trim().includes('Connected')) {
            console.log('✅ Success: Ollama (codellama) is reachable and responding.');
        } else {
            console.log('⚠️  Warning: Ollama responded but not with expected output:', json.response);
        }
      } catch (e) {
        console.error('❌ Error parsing JSON:', e.message);
      }
    } else {
      console.error(`❌ Error: Ollama returned status code ${res.statusCode}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Error: Could not connect to Ollama. Is it running? (${e.message})`);
});

req.write(data);
req.end();

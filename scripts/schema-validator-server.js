const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

// Schema validation endpoint
app.post('/validate', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`🔍 Validating schema for: ${url}`);

    // Fetch the page
    const response = await axios.get(url);
    const html = response.data;

    // Extract JSON-LD scripts
    const jsonLdMatches = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);

    if (!jsonLdMatches) {
      return res.json({
        url,
        valid: false,
        error: 'No JSON-LD structured data found',
        schemaCount: 0,
        schemas: []
      });
    }

    const schemas = [];
    let validSchemas = 0;
    let invalidSchemas = 0;

    for (const match of jsonLdMatches) {
      try {
        const jsonContent = match.replace(/<script type="application\/ld\+json"[^>]*>/, '').replace(/<\/script>/, '').trim();
        const schema = JSON.parse(jsonContent);

        // Basic validation
        const validation = validateSchema(schema);
        schemas.push({
          type: schema['@type'] || 'Unknown',
          valid: validation.valid,
          errors: validation.errors,
          warnings: validation.warnings
        });

        if (validation.valid) {
          validSchemas++;
        } else {
          invalidSchemas++;
        }

      } catch (parseError) {
        schemas.push({
          type: 'Parse Error',
          valid: false,
          errors: [`JSON parse error: ${parseError.message}`],
          warnings: []
        });
        invalidSchemas++;
      }
    }

    res.json({
      url,
      valid: invalidSchemas === 0,
      schemaCount: schemas.length,
      validSchemas,
      invalidSchemas,
      schemas
    });

  } catch (error) {
    console.error('Validation error:', error.message);
    res.status(500).json({
      error: 'Failed to validate schema',
      details: error.message
    });
  }
});

// Schema validation function
function validateSchema(schema) {
  const errors = [];
  const warnings = [];

  // Check @context
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or invalid @context (should be "https://schema.org")');
  }

  // Check @type
  if (!schema['@type']) {
    errors.push('Missing @type property');
  }

  // Type-specific validations
  const type = schema['@type'];

  switch (type) {
    case 'Organization':
      if (!schema.name) errors.push('Organization missing required "name" property');
      if (!schema.url) errors.push('Organization missing required "url" property');
      break;

    case 'WebSite':
      if (!schema.name) errors.push('WebSite missing required "name" property');
      if (!schema.url) errors.push('WebSite missing required "url" property');
      break;

    case 'SoftwareApplication':
      if (!schema.name) errors.push('SoftwareApplication missing required "name" property');
      if (!schema.offers) warnings.push('SoftwareApplication missing "offers" property');
      break;

    case 'Article':
      if (!schema.headline) errors.push('Article missing required "headline" property');
      if (!schema.author) errors.push('Article missing required "author" property');
      if (!schema.publisher) errors.push('Article missing required "publisher" property');
      break;

    case 'FAQPage':
      if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
        errors.push('FAQPage missing or invalid "mainEntity" array');
      }
      break;

    case 'BreadcrumbList':
      if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
        errors.push('BreadcrumbList missing or invalid "itemListElement" array');
      }
      break;
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Schema Validator is running', port: PORT });
});

// Serve a simple web interface
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Schema Validator</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input[type="url"] { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; }
        button { background: #007bff; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
        button:hover { background: #0056b3; }
        .result { margin-top: 30px; padding: 20px; border-radius: 4px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; }
        .schema-item { margin: 10px 0; padding: 10px; border: 1px solid #eee; border-radius: 4px; }
        .valid { border-color: #28a745; background: #d4edda; }
        .invalid { border-color: #dc3545; background: #f8d7da; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🔍 Schema Validator</h1>
        <p>Validate JSON-LD structured data on web pages</p>

        <form id="validateForm">
          <div class="form-group">
            <label for="url">Page URL to Validate:</label>
            <input type="url" id="url" name="url" placeholder="http://localhost:3000/en/" required>
          </div>
          <button type="submit">Validate Schema</button>
        </form>

        <div id="result" style="display: none;"></div>
      </div>

      <script>
        document.getElementById('validateForm').addEventListener('submit', async (e) => {
          e.preventDefault();

          const url = document.getElementById('url').value;
          const resultDiv = document.getElementById('result');
          const button = e.target.querySelector('button');

          button.disabled = true;
          button.textContent = 'Validating...';
          resultDiv.style.display = 'none';

          try {
            const response = await fetch('/validate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url })
            });

            const data = await response.json();

            let html = \`<div class="result \${data.valid ? 'success' : 'error'}">
              <h3>\${data.valid ? '✅' : '❌'} Validation Result</h3>
              <p><strong>URL:</strong> \${data.url}</p>
              <p><strong>Schemas Found:</strong> \${data.schemaCount}</p>
              <p><strong>Valid Schemas:</strong> \${data.validSchemas}</p>
              <p><strong>Invalid Schemas:</strong> \${data.invalidSchemas}</p>
            </div>\`;

            if (data.schemas && data.schemas.length > 0) {
              html += '<div style="margin-top: 20px;">';
              html += '<h4>Schema Details:</h4>';

              data.schemas.forEach((schema, index) => {
                const cssClass = schema.valid ? 'valid' : 'invalid';
                const icon = schema.valid ? '✅' : '❌';

                html += \`<div class="schema-item \${cssClass}">
                  <strong>\${icon} \${schema.type}</strong>\`;

                if (schema.errors && schema.errors.length > 0) {
                  html += '<div style="color: red; margin-top: 5px;">';
                  html += '<strong>Errors:</strong><ul>';
                  schema.errors.forEach(error => {
                    html += \`<li>\${error}</li>\`;
                  });
                  html += '</ul></div>';
                }

                if (schema.warnings && schema.warnings.length > 0) {
                  html += '<div style="color: orange; margin-top: 5px;">';
                  html += '<strong>Warnings:</strong><ul>';
                  schema.warnings.forEach(warning => {
                    html += \`<li>\${warning}</li>\`;
                  });
                  html += '</ul></div>';
                }

                html += '</div>';
              });

              html += '</div>';
            }

            resultDiv.innerHTML = html;
            resultDiv.style.display = 'block';

          } catch (error) {
            resultDiv.innerHTML = \`<div class="result error">
              <h3>❌ Error</h3>
              <p>Failed to validate: \${error.message}</p>
            </div>\`;
            resultDiv.style.display = 'block';
          }

          button.disabled = false;
          button.textContent = 'Validate Schema';
        });
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Schema Validator running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🖥️  Web interface: http://localhost:${PORT}`);
});
/**
 * ZeroDB Project Setup Script for Northbound Studio
 *
 * This script creates a new ZeroDB project and prepares it for the RAG chatbot.
 *
 * Usage:
 *   npm run setup:zerodb
 *
 * What it does:
 *   1. Creates a new "northbound-studio" project in ZeroDB
 *   2. Displays the project ID for .env configuration
 *   3. Provides next steps for seeding the knowledge base
 */

import axios from 'axios';
import * as readline from 'readline';

const API_URL = process.env.NEXT_PUBLIC_AINATIVE_API_URL || 'https://api.ainative.studio';

interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  tier: string;
  status: string;
  database_enabled: boolean;
  vector_dimensions: number;
  created_at: string;
}

async function promptForCredentials(): Promise<{ email: string; password: string }> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Enter your AINative email: ', (email) => {
      rl.question('Enter your AINative password: ', (password) => {
        rl.close();
        resolve({ email: email.trim(), password: password.trim() });
      });
    });
  });
}

async function login(email: string, password: string): Promise<string> {
  console.log('\n🔐 Authenticating with AINative API...\n');

  try {
    const response = await axios.post(
      `${API_URL}/v1/public/auth/login-json`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );

    const { access_token } = response.data;

    if (!access_token) {
      throw new Error('No access token received from API');
    }

    console.log('✅ Authentication successful!\n');
    return access_token;

  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Invalid credentials. Please check your email and password.');
    }
    throw new Error(`Authentication failed: ${error.message}`);
  }
}

async function createProject(accessToken: string): Promise<ProjectResponse> {
  console.log('🚀 Creating new ZeroDB project: "northbound-studio"...\n');

  try {
    const response = await axios.post(
      `${API_URL}/v1/public/projects`,
      {
        name: 'northbound-studio',
        description: 'Northbound Studio website - AI-native digital agency with RAG chatbot and knowledge base',
        tier: 'free',
        database_enabled: true
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    const project: ProjectResponse = response.data;

    console.log('✅ Project created successfully!\n');
    console.log('📊 Project Details:');
    console.log(`   • ID: ${project.id}`);
    console.log(`   • Name: ${project.name}`);
    console.log(`   • Tier: ${project.tier}`);
    console.log(`   • Vector Dimensions: ${project.vector_dimensions}`);
    console.log(`   • Database Enabled: ${project.database_enabled}`);
    console.log(`   • Created: ${new Date(project.created_at).toLocaleString()}\n`);

    return project;

  } catch (error: any) {
    if (error.response?.status === 409) {
      throw new Error('Project "northbound-studio" already exists. Please delete it first or use a different name.');
    }
    throw new Error(`Failed to create project: ${error.response?.data?.error?.message || error.message}`);
  }
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║         ZeroDB Project Setup for Northbound Studio            ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  try {
    // Step 1: Get credentials
    const { email, password } = await promptForCredentials();

    // Step 2: Login
    const accessToken = await login(email, password);

    // Step 3: Create project
    const project = await createProject(accessToken);

    // Step 4: Display next steps
    console.log('\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                        ✅ SETUP COMPLETE                       ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');

    console.log('📝 Next Steps:\n');
    console.log('1. Update your .env file with the new project ID:');
    console.log(`   NEXT_PUBLIC_ZERODB_PROJECT_ID="${project.id}"\n`);

    console.log('2. Seed the knowledge base with vectors:');
    console.log('   npm run seed:kb\n');

    console.log('3. Test the RAG chatbot on your site:\n');
    console.log('   Visit: http://localhost:3456/demos\n');

    console.log('4. Monitor your project:');
    console.log(`   https://ainative.studio/projects/${project.id}\n`);

    console.log('═══════════════════════════════════════════════════════════════\n');

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    console.error('\nPlease check your credentials and try again.\n');
    process.exit(1);
  }
}

// Run the setup
main();

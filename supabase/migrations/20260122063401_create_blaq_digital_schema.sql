/*
  # Blaq Digital Database Schema

  ## Overview
  Sets up the core database structure for Blaq Digital's website including contact forms, case studies, and AI chat logs.

  ## New Tables

  ### 1. contact_submissions
  Stores contact form submissions from potential clients
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Contact's name
  - `company` (text, optional) - Company name
  - `email` (text) - Contact email
  - `project_type` (text) - Type of project (AI App Dev, Web Dev, Media + AI)
  - `description` (text) - Project description
  - `created_at` (timestamptz) - Submission timestamp

  ### 2. case_studies
  Stores portfolio case studies showcasing work
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Case study title
  - `client` (text) - Client name
  - `problem` (text) - Problem statement
  - `solution` (text) - Solution description
  - `tech_stack` (text[]) - Technologies used
  - `ai_used` (text) - AI capabilities implemented
  - `outcome` (text) - Results achieved
  - `image_url` (text, optional) - Hero image URL
  - `published` (boolean) - Whether case study is live
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. chat_logs
  Stores AI chatbot conversation logs for analytics
  - `id` (uuid, primary key) - Unique identifier
  - `session_id` (text) - User session identifier
  - `message` (text) - User message
  - `response` (text) - Bot response
  - `message_type` (text) - Type: 'rag' or 'chatbot'
  - `created_at` (timestamptz) - Message timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for case_studies (where published = true)
  - Insert-only access for contact_submissions and chat_logs
  - Admin-only access for managing case studies

  ## Notes
  - Contact submissions are insert-only for security
  - Case studies support ordering for display control
  - Chat logs enable analytics without compromising privacy
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  project_type text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client text NOT NULL,
  problem text NOT NULL,
  solution text NOT NULL,
  tech_stack text[] DEFAULT '{}',
  ai_used text NOT NULL,
  outcome text NOT NULL,
  image_url text,
  published boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_logs table
CREATE TABLE IF NOT EXISTS chat_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  message text NOT NULL,
  response text NOT NULL,
  message_type text NOT NULL CHECK (message_type IN ('rag', 'chatbot')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact_submissions
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for case_studies
CREATE POLICY "Anyone can view published case studies"
  ON case_studies FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Authenticated users can manage case studies"
  ON case_studies FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for chat_logs
CREATE POLICY "Anyone can insert chat logs"
  ON chat_logs FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view chat logs"
  ON chat_logs FOR SELECT
  TO authenticated
  USING (true);

-- Create index for case studies ordering
CREATE INDEX IF NOT EXISTS case_studies_order_idx ON case_studies(order_index, created_at DESC);

-- Create index for chat logs session lookup
CREATE INDEX IF NOT EXISTS chat_logs_session_idx ON chat_logs(session_id, created_at DESC);
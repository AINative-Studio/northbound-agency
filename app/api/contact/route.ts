import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { zerodb } from '@/lib/zerodb';

/**
 * Contact Form API Route with Resend Email Integration
 *
 * POST /api/contact
 *
 * Receives contact form submissions, stores them in ZeroDB,
 * and sends email notifications via Resend API.
 *
 * Features:
 * - Input validation with detailed error messages
 * - ZeroDB persistence
 * - Email notifications via Resend
 * - Graceful degradation (form submission succeeds even if email fails)
 * - Comprehensive error handling and logging
 */

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  company: string | null;
  email: string;
  ai_workflow: string;
  has_project: 'yes' | 'not_yet';
  project_description: string | null;
  service_preference: 'full_service' | 'self_service';
}

/**
 * Validate contact form data
 */
function validateContactFormData(data: any): { valid: boolean; error?: string } {
  if (!data.name || typeof data.name !== 'string') {
    return { valid: false, error: 'name is required and must be a string' };
  }

  if (!data.email || typeof data.email !== 'string') {
    return { valid: false, error: 'email is required and must be a string' };
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'email must be a valid email address' };
  }

  if (!data.ai_workflow || typeof data.ai_workflow !== 'string') {
    return { valid: false, error: 'ai_workflow is required and must be a string' };
  }

  if (!data.has_project || !['yes', 'not_yet'].includes(data.has_project)) {
    return { valid: false, error: 'has_project must be either "yes" or "not_yet"' };
  }

  if (!data.service_preference || !['full_service', 'self_service'].includes(data.service_preference)) {
    return { valid: false, error: 'service_preference must be either "full_service" or "self_service"' };
  }

  return { valid: true };
}

/**
 * Generate HTML email template
 */
function generateEmailTemplate(formData: ContactFormData, timestamp: string): string {
  const companyDisplay = formData.company || 'Not provided';
  const projectDescriptionDisplay = formData.project_description || 'N/A';
  const hasProjectDisplay = formData.has_project === 'yes' ? 'Yes' : 'Not yet';
  const servicePreferenceDisplay = formData.service_preference === 'full_service'
    ? 'Full-Service Implementation'
    : 'Self-Service Platform';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 6px;
      border-left: 4px solid #667eea;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #667eea;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #555;
      margin-bottom: 4px;
    }
    .field-value {
      color: #333;
      white-space: pre-wrap;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
    }
    .divider {
      height: 1px;
      background: #e0e0e0;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
  </div>

  <div class="content">
    <div class="section">
      <div class="section-title">📋 Contact Information</div>
      <div class="field">
        <div class="field-label">Name:</div>
        <div class="field-value">${formData.name}</div>
      </div>
      <div class="field">
        <div class="field-label">Company:</div>
        <div class="field-value">${companyDisplay}</div>
      </div>
      <div class="field">
        <div class="field-label">Email:</div>
        <div class="field-value">${formData.email}</div>
      </div>
      <div class="field">
        <div class="field-label">Submitted:</div>
        <div class="field-value">${timestamp}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🤖 AI Workflow Assessment</div>
      <div class="field-value">${formData.ai_workflow}</div>
    </div>

    <div class="section">
      <div class="section-title">💼 Project Readiness</div>
      <div class="field">
        <div class="field-label">Has Project:</div>
        <div class="field-value">${hasProjectDisplay}</div>
      </div>
      <div class="field">
        <div class="field-label">Project Description:</div>
        <div class="field-value">${projectDescriptionDisplay}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">⚙️ Service Preference</div>
      <div class="field">
        <div class="field-label">Preferred Service:</div>
        <div class="field-value">${servicePreferenceDisplay}</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <p style="margin: 8px 0;">Built by AINative Dev Team</p>
    <p style="margin: 8px 0;">All Data Services Built on ZeroDB</p>
    <div class="divider"></div>
    <p style="margin: 8px 0; font-style: italic;">Reply to this email to start the conversation with ${formData.name}.</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Send email notification via Resend
 */
async function sendEmailNotification(formData: ContactFormData, timestamp: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const emailHtml = generateEmailTemplate(formData, timestamp);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Blaq Digital <noreply@blaqdigital.com>';
    const toEmail = process.env.CONTACT_EMAIL_TO || 'contact@blaqdigital.com';

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: formData.email,
      subject: `🚀 New Contact Form Submission - ${formData.name}`,
      html: emailHtml,
    });

    console.log('[Contact API] Email sent successfully to:', toEmail);
    return { success: true };
  } catch (error) {
    console.error('[Contact API] Email sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email error',
    };
  }
}

/**
 * POST /api/contact
 *
 * Handle contact form submission
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body',
        },
        { status: 400 }
      );
    }

    // Validate form data
    const validation = validateContactFormData(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
        },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name: body.name,
      company: body.company || null,
      email: body.email,
      ai_workflow: body.ai_workflow,
      has_project: body.has_project,
      project_description: body.project_description || null,
      service_preference: body.service_preference,
    };

    const timestamp = new Date().toISOString();

    // Store in ZeroDB (critical operation - must succeed)
    let dbResult;
    try {
      dbResult = await zerodb.insertTable('contact_submissions', {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        ai_workflow: formData.ai_workflow,
        has_project: formData.has_project,
        project_description: formData.project_description,
        service_preference: formData.service_preference,
        submitted_at: timestamp,
      });

      console.log('[Contact API] Submission stored in ZeroDB:', dbResult.rows[0]?.id);
    } catch (dbError) {
      console.error('[Contact API] ZeroDB insertion failed:', dbError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to store contact submission',
        },
        { status: 500 }
      );
    }

    // Send email notification (non-critical - graceful degradation)
    const emailResult = await sendEmailNotification(formData, timestamp);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        data: {
          id: dbResult.rows[0]?.id,
          name: formData.name,
          email: formData.email,
          email_sent: emailResult.success,
          ...(emailResult.error && { email_error: emailResult.error }),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API] Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

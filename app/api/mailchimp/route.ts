import { NextRequest, NextResponse } from "next/server";

interface MailchimpMember {
  email_address: string;
  status: "subscribed" | "pending";
  merge_fields?: Record<string, string>;
  tags?: string[];
}

interface MailchimpError {
  title?: string;
  detail?: string;
  status?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, tags, mergeFields } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

    // Check if Mailchimp is configured
    if (!apiKey || !audienceId || !serverPrefix) {
      // In development, just return success
      if (process.env.NODE_ENV === "development") {
        console.log("Mailchimp not configured. Would subscribe:", email);
        return NextResponse.json({
          success: true,
          message: "Subscription simulated (Mailchimp not configured)",
        });
      }
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    const memberData: MailchimpMember = {
      email_address: email.toLowerCase(),
      status: "subscribed",
    };

    // Add merge fields if provided
    if (firstName || lastName || mergeFields) {
      memberData.merge_fields = {
        ...(firstName && { FNAME: firstName }),
        ...(lastName && { LNAME: lastName }),
        ...mergeFields,
      };
    }

    // Add tags if provided
    if (tags && tags.length > 0) {
      memberData.tags = tags;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data as MailchimpError;

      // Handle specific Mailchimp errors
      if (error.title === "Member Exists") {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed!",
        });
      }

      if (error.title === "Invalid Resource") {
        return NextResponse.json(
          { error: "Please provide a valid email address" },
          { status: 400 }
        );
      }

      console.error("Mailchimp error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed!",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

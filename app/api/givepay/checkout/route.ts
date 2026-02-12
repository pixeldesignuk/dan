import { NextRequest, NextResponse } from "next/server";

interface CheckoutRequest {
  amount: number; // Amount in pence
  paymentType: "one_time" | "subscription";
  email: string;
  firstName?: string;
  lastName?: string;
  intention?: string;
  project?: string;
  intervalCount?: number; // For subscriptions - number of intervals
}

interface GivePayLineItem {
  quantity: number;
  amount: number;
  intention?: string;
  project?: string;
}

interface GivePayRequest {
  payment_type: "one_time" | "subscription";
  currency: string;
  line_items: GivePayLineItem[];
  payer: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
  return_url?: string;
  subscription?: {
    interval: string;
    interval_count: number;
    name: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { amount, paymentType, email, firstName, lastName, intention, project, intervalCount } = body;

    // Validate required fields
    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Please provide a valid amount (minimum £1)" },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GIVEPAY_API_KEY;

    if (!apiKey) {
      console.error("GivePay API key not configured");
      return NextResponse.json(
        { error: "Payment service not configured" },
        { status: 500 }
      );
    }

    // Build the request payload
    const lineItem: GivePayLineItem = {
      quantity: 1,
      amount: amount,
    };

    if (intention) {
      lineItem.intention = intention;
    }

    if (project) {
      lineItem.project = project;
    }

    const givePayRequest: GivePayRequest = {
      payment_type: paymentType,
      currency: "GBP",
      line_items: [lineItem],
      payer: {
        email: email.toLowerCase(),
        ...(firstName && { first_name: firstName }),
        ...(lastName && { last_name: lastName }),
      },
    };

    // GivePay requires HTTPS for return URLs - only add in production
    // The return URL will receive ?session={session_id} from GivePay
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl && siteUrl.startsWith("https://")) {
      givePayRequest.return_url = `${siteUrl}/success`;
    }

    // Add subscription details if monthly
    if (paymentType === "subscription") {
      givePayRequest.subscription = {
        interval: "month",
        interval_count: intervalCount || 1,
        name: `Monthly Donation - £${(amount / 100).toFixed(2)}`,
      };
    }

    console.log("GivePay request:", JSON.stringify(givePayRequest, null, 2));

    const response = await fetch("https://api.givepay.co/api/v1/payment-session/checkout", {
      method: "POST",
      headers: {
        "Authorization": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(givePayRequest),
    });

    const responseText = await response.text();
    console.log("GivePay response status:", response.status);
    console.log("GivePay response:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("Failed to parse GivePay response:", responseText);
      return NextResponse.json(
        { error: "Invalid response from payment service" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error("GivePay error:", data);

      // In development with sandbox, if provider not configured, provide helpful message
      if (process.env.NODE_ENV === "development" && data.error?.includes("provider configured")) {
        return NextResponse.json(
          {
            error: "GivePay sandbox not fully configured. Please configure a payment provider in your GivePay dashboard.",
            devNote: "The API integration is working correctly. Configure payment providers at app.givepay.co to complete setup."
          },
          { status: response.status }
        );
      }

      return NextResponse.json(
        { error: data.message || data.error || "Failed to create checkout session" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: data.checkout_url,
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

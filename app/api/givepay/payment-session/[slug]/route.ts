import { NextRequest, NextResponse } from "next/server";

interface PaymentSessionResponse {
  id: string;
  status: string;
  amount: number;
  currency: string;
  payment_type: "one_time" | "subscription";
  payer?: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
  line_items?: Array<{
    amount: number;
    intention?: string;
    project?: string;
  }>;
  subscription?: {
    interval: string;
    interval_count: number;
    name: string;
  };
  created_at: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Payment session ID is required" },
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

    const response = await fetch(
      `https://api.givepay.co/api/v1/payment-session/${slug}`,
      {
        method: "GET",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("GivePay fetch error:", response.status);
      return NextResponse.json(
        { error: "Payment session not found" },
        { status: response.status }
      );
    }

    const data: PaymentSessionResponse = await response.json();

    // Return sanitized payment info (no sensitive data)
    return NextResponse.json({
      success: true,
      payment: {
        id: data.id,
        status: data.status,
        amount: data.amount,
        currency: data.currency,
        paymentType: data.payment_type,
        firstName: data.payer?.first_name,
        intention: data.line_items?.[0]?.intention,
        isSubscription: data.payment_type === "subscription",
        subscriptionInterval: data.subscription?.interval,
        createdAt: data.created_at,
      },
    });
  } catch (error) {
    console.error("Payment session fetch error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payment information" },
      { status: 500 }
    );
  }
}

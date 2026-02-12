"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Heart, ArrowRight, Mail, Users, Calendar, Loader2 } from "lucide-react";
import { trackDonateClick } from "@/lib/posthog/events";

interface PaymentInfo {
  id: string;
  status: string;
  amount: number;
  currency: string;
  paymentType: "one_time" | "subscription";
  firstName?: string;
  intention?: string;
  isSubscription: boolean;
  subscriptionInterval?: string;
  createdAt: string;
}

// Impact messages based on donation amount
function getImpactMessage(amountInPence: number): string {
  const amount = amountInPence / 100;
  if (amount >= 500) return "fund a full day of dental care for an entire community";
  if (amount >= 250) return "provide comprehensive treatment for multiple families";
  if (amount >= 100) return "deliver essential dental care to 10 patients";
  if (amount >= 50) return "provide dental care for 5 patients in need";
  if (amount >= 25) return "supply essential dental equipment for a mission";
  return "contribute to life-changing dental care";
}

// Confetti animation component
function Confetti() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number; color: string }>>([]);

  useEffect(() => {
    // Generate particles on client side only to avoid hydration mismatch
    const colors = ['#00CADD', '#96CA2D', '#FF6100', '#DC2626', '#333333'];
    const newParticles = [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 animate-confetti"
          style={{
            left: `${particle.left}%`,
            top: `-20px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Success checkmark animation
function SuccessIcon() {
  return (
    <div className="relative">
      {/* Outer pulse ring */}
      <div className="absolute inset-0 rounded-full bg-brand-green/20 animate-ping" />

      {/* Inner circle with checkmark */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark flex items-center justify-center shadow-elevated">
        <Check
          className="w-12 h-12 md:w-16 md:h-16 text-white animate-scale-in"
          strokeWidth={3}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// Full page loading state
function FullPageLoading() {
  return (
    <section className="min-h-[100svh] flex items-center justify-center bg-surface-warm">
      <div className="text-center">
        {/* Animated loading icon */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-surface-cool" />
          <div className="absolute inset-0 rounded-full border-4 border-brand-green border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-10 h-10 md:w-12 md:h-12 text-brand-green animate-pulse" aria-hidden="true" />
          </div>
        </div>

        {/* Loading text */}
        <h2 className="font-display text-display-sm text-ink mb-2">
          Processing your gift
        </h2>
        <p className="text-body text-ink-secondary flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          Loading your donation details&hellip;
        </p>
      </div>
    </section>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("session") || searchParams.get("slug") || searchParams.get("id");

  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    async function fetchPayment() {
      if (!slug) {
        setIsLoading(false);
        // Still show confetti for generic thank you
        setShowConfetti(true);
        setTimeout(() => setIsVisible(true), 100);
        return;
      }

      try {
        const response = await fetch(`/api/givepay/payment-session/${slug}`);
        const data = await response.json();

        if (data.success && data.payment) {
          setPayment(data.payment);

          // Track successful donation view
          trackDonateClick({
            placement: "success-page",
            destinationUrl: window.location.href,
            contentType: data.payment.paymentType,
          });
        } else {
          setError(data.error || "Could not load payment details");
        }
      } catch {
        setError("Could not load payment details");
      } finally {
        setIsLoading(false);
        // Start confetti and animations after loading
        setShowConfetti(true);
        setTimeout(() => setIsVisible(true), 100);
      }
    }

    fetchPayment();

    // Cleanup confetti after animation
    const confettiTimer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(confettiTimer);
  }, [slug]);

  // Format amount for display
  const formatAmount = (amountInPence: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amountInPence / 100);
  };

  // Show loading state
  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <>
      {/* Confetti celebration */}
      {showConfetti && <Confetti />}

      {/* Hero section */}
      <section className="relative min-h-[70vh] flex items-center bg-surface-warm overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="success-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M40 10c-8 0-14 6-14 14 0 4 2 8 4 12l6 18c1 3 3 5 4 5s3-2 4-5l6-18c2-4 4-8 4-12 0-8-6-14-14-14z"
                  fill="currentColor"
                  className="text-ink"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#success-pattern)" />
          </svg>
        </div>

        <div className="container-editorial relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Success icon */}
            <div
              className={`flex justify-center mb-10 transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <SuccessIcon />
            </div>

            {/* Error state or no session - still show gratitude */}
            {(error || !slug || !payment) && (
              <>
                <h1
                  className={`font-display text-display-xl text-ink transition-all duration-700 delay-200 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  Thank you for your
                  <br />
                  <span className="text-brand-green">generosity</span>
                </h1>
                <p
                  className={`mt-6 text-body-lg text-ink-secondary transition-all duration-700 delay-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  Your donation is making a real difference in the lives of those who need dental care most.
                </p>
              </>
            )}

            {/* Success state with payment details */}
            {payment && (
              <>
                {/* Personalized headline */}
                <h1
                  className={`font-display text-display-xl text-ink transition-all duration-700 delay-200 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  {payment.firstName ? `Thank you, ${payment.firstName}!` : "Thank you!"}
                  <br />
                  <span className="text-brand-green">You&apos;re incredible</span>
                </h1>

                {/* Amount and impact */}
                <div
                  className={`mt-10 transition-all duration-700 delay-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="inline-flex items-baseline gap-2 bg-surface-cool px-8 py-4 rounded-full">
                    <span className="font-display text-display-lg text-brand-blue">
                      {formatAmount(payment.amount)}
                    </span>
                    {payment.isSubscription && (
                      <span className="text-body text-ink-secondary">/ month</span>
                    )}
                  </div>
                </div>

                {/* Impact message */}
                <p
                  className={`mt-8 text-body-lg text-ink-secondary max-w-xl mx-auto transition-all duration-700 delay-400 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  Your {payment.isSubscription ? "monthly" : ""} gift will help us{" "}
                  <span className="text-ink font-medium">
                    {getImpactMessage(payment.amount)}
                  </span>
                  .
                </p>

                {/* Donation type badge */}
                {payment.intention && (
                  <div
                    className={`mt-6 transition-all duration-700 delay-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-edge rounded-full text-body-sm text-ink-secondary">
                      <Heart className="w-4 h-4 text-donate" aria-hidden="true" />
                      {payment.intention}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* Trust indicators */}
            <div
              className={`mt-12 flex flex-wrap items-center justify-center gap-6 text-body-sm text-ink-muted transition-all duration-700 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {["100% goes to care", "Tax deductible", "Confirmation sent"].map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-green" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="section-lg bg-surface">
        <div className="container-editorial">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-overline text-ink-muted">What happens next</span>
            <h2 className="mt-4 text-display-md">
              Your impact <span className="text-brand-blue">begins now</span>
            </h2>
            <p className="mt-6 text-body-lg text-ink-secondary">
              Here&apos;s how your donation will help transform lives and what you can do to stay connected.
            </p>
          </div>

          {/* Timeline cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Mail,
                title: "Confirmation email",
                description: "A receipt has been sent to your email. Keep it for your records and tax purposes.",
                timing: "Sent now",
              },
              {
                icon: Calendar,
                title: "Mission updates",
                description: "We'll share stories and photos from the missions your donation supports.",
                timing: "Monthly",
              },
              {
                icon: Heart,
                title: "Lives changed",
                description: "Your generosity provides dental care to those who've never seen a dentist.",
                timing: "Ongoing",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-surface-card border border-edge p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-medium"
              >
                <div className="w-12 h-12 bg-brand-blue/10 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-brand-blue" aria-hidden="true" />
                </div>
                <span className="text-caption text-brand-blue font-medium uppercase tracking-wider">
                  {item.timing}
                </span>
                <h3 className="mt-2 text-display-sm">{item.title}</h3>
                <p className="mt-3 text-body-sm text-ink-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continue your journey */}
      <section className="section-lg bg-surface-warm">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <span className="text-overline text-ink-muted">Continue your journey</span>
            <h2 className="mt-4 text-display-md">
              More ways to <span className="text-brand-blue">make a difference</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-edge max-w-4xl mx-auto">
            {/* Volunteer card */}
            <Link
              href="/volunteer"
              className="group bg-surface-card p-8 lg:p-12 transition-all duration-500 hover:-translate-y-1 hover:shadow-medium"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-brand-green" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-display-sm group-hover:text-brand-blue transition-colors">
                    Join a mission
                  </h3>
                  <p className="mt-1 text-caption text-ink-muted uppercase tracking-wider">
                    Volunteer with us
                  </p>
                </div>
              </div>
              <p className="mt-6 text-body text-ink-secondary">
                Are you a dental professional? Join our volunteer teams and experience the joy of transforming lives firsthand.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-brand-green font-medium group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Link>

            {/* Missions card */}
            <Link
              href="/missions"
              className="group bg-surface-card p-8 lg:p-12 transition-all duration-500 hover:-translate-y-1 hover:shadow-medium"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-brand-blue"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-display-sm group-hover:text-brand-blue transition-colors">
                    See our impact
                  </h3>
                  <p className="mt-1 text-caption text-ink-muted uppercase tracking-wider">
                    Explore missions
                  </p>
                </div>
              </div>
              <p className="mt-6 text-body text-ink-secondary">
                Discover the communities we serve and the stories of lives transformed through dental care.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-brand-blue font-medium group-hover:gap-3 transition-all">
                View missions
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final heartfelt message */}
      <section className="py-20 bg-surface">
        <div className="container-narrow text-center">
          <Heart className="w-10 h-10 mx-auto text-donate mb-6" aria-hidden="true" />
          <p className="text-body-lg text-ink-secondary italic">
            &ldquo;Because of donors like you, a child who has never smiled without pain can finally experience the joy of a healthy smile. Thank you for being part of this mission.&rdquo;
          </p>
          <p className="mt-4 text-caption text-ink-muted">
            &mdash; The Dental Aid Network Team
          </p>
        </div>
      </section>
    </>
  );
}

// Loading fallback for Suspense (for useSearchParams)
function SuspenseLoading() {
  return <FullPageLoading />;
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuspenseLoading />}>
      <SuccessContent />
    </Suspense>
  );
}

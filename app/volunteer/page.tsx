import type { Metadata } from "next";
import { Heart, Globe, Users, Calendar } from "lucide-react";
import { VolunteerForm } from "@/components/forms/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Join our volunteer team and make a difference. Help us bring dental care to underserved communities worldwide.",
};

const benefits = [
  {
    icon: Globe,
    title: "Travel the World",
    description: "Join missions to diverse locations across the globe, from rural villages to urban communities.",
  },
  {
    icon: Heart,
    title: "Make a Difference",
    description: "Directly impact lives by providing essential dental care to those who need it most.",
  },
  {
    icon: Users,
    title: "Join a Community",
    description: "Connect with like-minded professionals and volunteers who share your passion for service.",
  },
  {
    icon: Calendar,
    title: "Flexible Commitment",
    description: "Choose missions that fit your schedule, from week-long trips to longer placements.",
  },
];

export default function VolunteerPage() {
  return (
    <div className="section-padding">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="heading-1 mb-4">Become a Volunteer</h1>
          <p className="text-lg text-ink-light">
            Whether you&apos;re a dental professional or passionate about making a
            difference, there&apos;s a place for you on our team. Join us in bringing
            smiles to communities in need.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Benefits */}
          <div>
            <h2 className="heading-2 mb-6">Why Volunteer With Us?</h2>
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="shrink-0 rounded-lg bg-brand-green/10 p-3">
                    <benefit.icon className="h-6 w-6 text-brand-green" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-ink-light">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What We're Looking For */}
            <div className="mt-10">
              <h2 className="heading-3 mb-4">Who Can Volunteer?</h2>
              <div className="space-y-4 text-ink-light">
                <p>
                  <strong className="text-ink">Dental Professionals:</strong> Dentists,
                  dental hygienists, dental assistants, and dental students are welcome
                  to join our clinical teams.
                </p>
                <p>
                  <strong className="text-ink">Non-Medical Volunteers:</strong> We need
                  help with logistics, translation, patient coordination, photography,
                  and more. No medical background required!
                </p>
                <p className="text-sm">
                  All volunteers must be 18 or older and able to commit to a minimum
                  1-week mission trip. Some roles may require specific certifications.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="rounded-2xl bg-surface-card p-6 shadow-lg md:p-8">
              <h2 className="heading-3 mb-2">Apply to Volunteer</h2>
              <p className="mb-6 text-sm text-ink-muted">
                Fill out the form below and our volunteer coordinator will get back to
                you within 2-3 business days.
              </p>
              <VolunteerForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

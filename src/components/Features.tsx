
import { Calendar, MessageCircle, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Calendar className="h-10 w-10 text-medical" />,
      title: "Easy Appointment Booking",
      description:
        "Book appointments with specialists in just a few clicks. Choose your preferred time slot and doctor based on availability.",
    },
    {
      icon: <svg className="h-10 w-10 text-medical" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>,
      title: "Secure Health Records",
      description:
        "Store and access your health records securely. Keep track of your medical history all in one place.",
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-medical" />,
      title: "AI Health Assistant",
      description:
        "Get personalized health tips and guidance from our AI assistant. Quick answers to your health queries.",
    },
    {
      icon: <Clock className="h-10 w-10 text-medical" />,
      title: "Appointment Reminders",
      description:
        "Never miss an appointment with timely email and notification reminders before your scheduled visit.",
    },
    {
      icon: <svg className="h-10 w-10 text-medical" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>,
      title: "Prescription Management",
      description:
        "View and manage your prescriptions easily. Get reminders for medication refills and dosage schedules.",
    },
    {
      icon: <svg className="h-10 w-10 text-medical" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>,
      title: "Doctor Communication",
      description:
        "Message your healthcare providers securely. Ask questions and get clarity on your treatment plan.",
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Our <span className="medical-gradient-text">Features</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your healthcare journey in one place
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border card-hover"
            >
              <div className="h-12 w-12 bg-medical/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

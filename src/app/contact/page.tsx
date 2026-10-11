import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

import { Hind } from "next/font/google";

const hindi = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const CONTACT = {
  phone: "011 692 729 38",
  phoneLink: "tel:+911169272938",
  email: "support@ajayctetclasses.in",
  whatsappNumber: "15553341082",
  address: "Gokul Chowk, Gangjala, Saharsa, Bihar 852201",
  workingDays: "सोमवार – शनिवार",
  workingHours: "8:00 AM – 7:00 PM",
};

const mapEmbedUrl =
  "https://maps.google.com/maps?q=Gokul%20Chowk%2C%20Gangjala%2C%20Saharsa%2C%20Bihar%20852201&t=&z=15&ie=UTF8&iwloc=&output=embed";

const mapDirectionsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(CONTACT.address);

const quickActions = [
  {
    title: "सीधे कॉल करें",
    subtitle: "हमसे बात करें",
    icon: Phone,
    href: CONTACT.phoneLink,
    external: false,
    accent: "bg-[#23449B] text-white",
  },
  {
    title: "WhatsApp करें",
    subtitle: "अपना सवाल भेजें",
    icon: MessageCircle,
    href: `https://wa.me/${CONTACT.whatsappNumber}`,
    external: true,
    accent: "bg-[#FFC400] text-[#192958]",
  },
  {
    title: "ईमेल भेजें",
    subtitle: "हमें लिखें",
    icon: Mail,
    href: `mailto:${CONTACT.email}`,
    external: false,
    accent: "bg-[#23449B] text-white",
  },
  {
    title: "लोकेशन देखें",
    subtitle: "Google Maps",
    icon: Navigation,
    href: mapDirectionsUrl,
    external: true,
    accent: "bg-[#FFC400] text-[#192958]",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F9FE] text-[#192958]">

      {/* HERO SECTION */}

      <section className="relative overflow-hidden bg-[#EEF4FF] px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16">

        {/* Decorative shapes */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#FFC400]/15 sm:h-80 sm:w-80"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-60 w-60 rounded-full bg-[#23449B]/5 sm:h-72 sm:w-72"
        />

        <div className="relative mx-auto max-w-5xl">

          {/* Main heading */}

          <div className="mx-auto max-w-4xl text-center">

            <h1
              className={`${hindi.className} text-[2rem] font-bold leading-[1.3] tracking-tight text-[#192958] sm:text-5xl lg:text-6xl`}
            >
              आपके सवालों के जवाब,
              <br />

              <span className="text-[#23449B]">
                हमारी जिम्मेदारी।
              </span>
            </h1>

            <p
              className={`${hindi.className} mx-auto mt-5 max-w-2xl text-base leading-8 text-[#4B5D7A] sm:mt-6 sm:text-lg`}
            >
              Admission, courses, batches या पढ़ाई से जुड़ा कोई सवाल है?
              हमसे जुड़िए। Ajay CTET Classes की टीम आपकी मदद के लिए
              तैयार है।
            </p>

          </div>

          {/* Quick contact actions */}

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">

            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.title}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={
                    action.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex min-h-[132px] flex-col items-start rounded-2xl border border-blue-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#FFC400] hover:shadow-lg sm:min-h-[150px] sm:rounded-3xl sm:p-5"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.accent} transition-transform duration-200 group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span
                    className={`${hindi.className} mt-3 text-sm font-bold leading-snug text-[#192958] sm:text-base`}
                  >
                    {action.title}
                  </span>

                  <span
                    className={`${hindi.className} mt-1 text-xs leading-5 text-[#64748B]`}
                  >
                    {action.subtitle}
                  </span>
                </a>
              );
            })}

          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION, MAP AND WORKING HOURS */}

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        <div className="mx-auto max-w-7xl">

          {/* Section introduction */}

          <div className="mb-6 sm:mb-8">

            <h2
              className={`${hindi.className} text-2xl font-bold tracking-tight text-[#192958] sm:text-3xl`}
            >
              हमसे संपर्क करने के तरीके
            </h2>

            <p
              className={`${hindi.className} mt-2 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base`}
            >
              अपनी सुविधा के अनुसार कॉल करें, WhatsApp पर जुड़ें या हमारे
              इंस्टीट्यूट पर आकर मिलें।
            </p>

          </div>

          <div className="grid grid-cols-1 items-start gap-5 sm:gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">

            {/* CONTACT INFORMATION CARD */}

            <div className="min-w-0">

              <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-7">

                <h3
                  className={`${hindi.className} text-xl font-bold text-[#192958] sm:text-2xl`}
                >
                  संपर्क जानकारी
                </h3>

                <p
                  className={`${hindi.className} mt-2 text-sm leading-7 text-[#64748B]`}
                >
                  Admission, courses, study material और अन्य जानकारी के
                  लिए हमारी टीम से संपर्क करें।
                </p>

                <div className="mt-6 space-y-3">

                  {/* PHONE */}

                  <a
                    href={CONTACT.phoneLink}
                    className="group flex min-w-0 items-center gap-3 rounded-2xl bg-[#EEF4FF] p-3.5 transition hover:bg-[#FFF8D9] sm:gap-4 sm:p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#23449B] text-white transition group-hover:bg-[#FFC400] group-hover:text-[#192958]">
                      <Phone className="h-5 w-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`${hindi.className} block text-xs font-medium text-[#64748B] sm:text-sm`}
                      >
                        फोन नंबर / Phone
                      </span>

                      <span className="mt-1 block break-words text-sm font-bold text-[#192958] sm:text-base">
                        {CONTACT.phone}
                      </span>
                    </span>

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#64748B] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  {/* WHATSAPP */}

                  <a
                    href={`https://wa.me/${CONTACT.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-3 rounded-2xl bg-[#EEF4FF] p-3.5 transition hover:bg-[#FFF8D9] sm:gap-4 sm:p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#23449B] text-white transition group-hover:bg-[#FFC400] group-hover:text-[#192958]">
                      <MessageCircle className="h-5 w-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`${hindi.className} block text-xs font-medium text-[#64748B] sm:text-sm`}
                      >
                        WhatsApp पर जुड़ें
                      </span>

                      <span className="mt-1 block break-words text-sm font-bold text-[#192958] sm:text-base">
                        +1 555-334-1082
                      </span>
                    </span>

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#64748B] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  {/* EMAIL */}

                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="group flex min-w-0 items-center gap-3 rounded-2xl bg-[#EEF4FF] p-3.5 transition hover:bg-[#FFF8D9] sm:gap-4 sm:p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#23449B] text-white transition group-hover:bg-[#FFC400] group-hover:text-[#192958]">
                      <Mail className="h-5 w-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`${hindi.className} block text-xs font-medium text-[#64748B] sm:text-sm`}
                      >
                        ईमेल / Email
                      </span>

                      <span className="mt-1 block break-all text-sm font-bold leading-6 text-[#192958] sm:text-base">
                        {CONTACT.email}
                      </span>
                    </span>

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#64748B] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                </div>
              </section>

            </div>

            {/* GOOGLE MAP AND WORKING HOURS */}

            <div className="min-w-0 space-y-5">

              {/* GOOGLE MAP */}

              <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm sm:rounded-[28px]">

                <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6">

                  <div>
                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#23449B] sm:text-xs">
                      FIND OUR CENTRE
                    </span>

                    <h3
                      className={`${hindi.className} mt-2 text-xl font-bold text-[#192958] sm:text-2xl`}
                    >
                      हमसे मिलने आइए
                    </h3>

                    <p
                      className={`${hindi.className} mt-2 text-sm leading-6 text-[#64748B]`}
                    >
                      सहरसा में हमारे सेंटर तक पहुँचने के लिए मैप देखें।
                    </p>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#23449B]">
                    <MapPin className="h-5 w-5" />
                  </span>

                </div>

                <iframe
                  title="Ajay CTET Classes location in Saharsa"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block h-[280px] w-full border-0 sm:h-[380px] lg:h-[470px]"
                />

                <div className="border-t border-slate-100 p-4 sm:p-5">
                  <a
                    href={mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${hindi.className} flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-[#EEF4FF] px-4 py-3 text-sm font-bold text-[#23449B] transition hover:border-[#FFC400] hover:bg-[#FFF8D9]`}
                  >
                    <Navigation className="h-4 w-4 shrink-0" />

                    Google Maps में पूरा रास्ता खोलें

                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </a>
                </div>

              </section>

              {/* WORKING HOURS — BELOW THE MAP */}

              <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-7">

                <div className="flex items-start gap-4">

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#23449B] text-white">
                    <Clock3 className="h-6 w-6" />
                  </span>

                  <div className="min-w-0 flex-1">

                    <h3 className="text-lg font-bold text-[#192958] sm:text-xl">
                      Working Hours
                    </h3>

                    <p
                      className={`${hindi.className} mt-2 text-sm font-semibold text-[#192958]`}
                    >
                      {CONTACT.workingDays}
                    </p>

                    <p className="mt-1 text-sm text-[#64748B]">
                      {CONTACT.workingHours}
                    </p>

                    <p
                      className={`${hindi.className} mt-3 text-xs leading-6 text-[#64748B]`}
                    >
                      विज़िट करने से पहले कॉल करके जानकारी की पुष्टि कर लें।
                    </p>

                  </div>
                </div>
              </section>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
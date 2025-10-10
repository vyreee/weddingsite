"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "Getting Started",
    faqs: [
      { 
        q: "How does this work?", 
        a: "It's super simple! Pick your package, fill out our information form, send us your photos, and we'll build your beautiful wedding website. You'll get a link to review it, request any changes, and then it goes live for your guests!" 
      },
      { 
        q: "What's the difference between the three packages?", 
        a: "Luxury ($45/₱2,499) - Perfect if you want something beautiful and budget-friendly. Pick from 3 templates, choose 4 sections, 1 revision included. Live in 3-7 days. Elegant ($100/₱4,999) - Our most popular! Pick from 10 templates, get ALL 8 sections included, 2 revisions included, priority support. Live in 3 days. Prestige (Custom Quote) - For couples who want something totally unique. Unlimited revisions, custom design, dedicated support, your own features." 
      },
      { 
        q: "Do I need to know anything about websites or coding?", 
        a: "Not at all! Just fill out our simple form (like filling out a questionnaire), send us your photos, and we handle all the technical stuff." 
      },
    ]
  },
  {
    category: "Website Address & Domains",
    faqs: [
      { 
        q: "What will my website address look like?", 
        a: "Your website will be a subdomain of ours. For example: emmaandjames.fromthisday.com or forever.fromthisday.com - you choose the first part!" 
      },
      { 
        q: "Can I have my own custom domain like 'emmaandjames.com'?", 
        a: "Yes! Custom domain connection is available with our Prestige package. You'll need to purchase your own domain name (around $10-15/year) and we'll connect it for you." 
      },
      { 
        q: "How do I choose my website name?", 
        a: "Pick something memorable! Popular choices: your names together (emmaandjames), a special date (june152025), your hashtag (teamsmith), or something creative (foreverandalways)." 
      },
      { 
        q: "Can I change my website name later?", 
        a: "Yes, but changes after your site goes live have a minimum fee of ₱500 since we have to reconfigure everything." 
      },
    ]
  },
  {
    category: "Templates & Customization",
    faqs: [
      { 
        q: "Can I see the templates before I choose?", 
        a: "Absolutely! We have an interactive demo page where you can preview ALL available templates. The best part? You can type in your own names and wedding date, and see how it would look in real-time! This helps you visualize your actual website before committing. Just visit our demo page or ask us for the link!" 
      },
      { 
        q: "What if I want to mix sections from different templates?", 
        a: "That's only available in our Prestige package where we create custom designs. Luxury and Elegant packages use one template throughout for consistency." 
      },
      { 
        q: "Can I change my template after I've chosen one?", 
        a: "Yes, but only during your revision period. After your site goes live and all revisions are used, changing templates costs ₱1,500." 
      },
      { 
        q: "What sections are included on my website?", 
        a: "We have 8 sections available: Hero/Header (your names and wedding date), Our Story (your love story with photo gallery), Venue (location, map, and directions), Dress Code (what guests should wear), Gift Registry (your registries with links), Countdown (days until your wedding), Event Schedule (timeline of your wedding day), FAQs (answer common guest questions), and Contact (how to reach you). Luxury Package: Choose 4 sections. Elegant Package: Get ALL 8 sections. Prestige Package: All sections + custom sections you create." 
      },
    ]
  },
  {
    category: "Timeline & Delivery",
    faqs: [
      { 
        q: "How long until my website is ready?", 
        a: "Luxury: 3-7 days. Elegant: 3 days. Prestige: Depends on customization, discussed in consultation." 
      },
      { 
        q: "What if my wedding is in 2 days?!", 
        a: "Contact us! We offer rush service for an additional fee. We can often deliver in 24-48 hours if needed." 
      },
      { 
        q: "How long will my website stay live?", 
        a: "Luxury: 30 days (1 month). Elegant: 45 days (can extend for additional fee). Prestige: Extended hosting included." 
      },
      { 
        q: "What happens after my time expires?", 
        a: "You'll get a reminder email before it expires. You can extend hosting for ₱500/month. If you don't extend, your site will go offline but we keep your content for 30 days if you change your mind." 
      },
    ]
  },
  {
    category: "Revisions & Changes",
    faqs: [
      { 
        q: "What counts as a 'revision'?", 
        a: "One round of changes. For example: 'Change the story text, swap out 3 photos, and fix a typo' = 1 revision. Each time you send us a new list of changes counts as one revision." 
      },
      { 
        q: "What if I need more revisions than my package includes?", 
        a: "Additional revisions are ₱500 each." 
      },
      { 
        q: "Can I update my website myself after it goes live?", 
        a: "No, all updates must go through us. This applies to all packages including Prestige. Any changes after your website goes live will require submitting a revision request or paying our maintenance/revision fees. This ensures your website stays secure and maintains its professional quality." 
      },
      { 
        q: "What if I need to change my wedding date or venue?", 
        a: "No problem! Send us the new information. This counts as a revision, but we totally understand things change!" 
      },
    ]
  },
  {
    category: "Photos & Content",
    faqs: [
      { 
        q: "How many photos can I include?", 
        a: "Typically 6-12 photos in your gallery, plus 1 main hero photo. Elegant and Prestige packages can include more if needed." 
      },
      { 
        q: "What kind of photos work best?", 
        a: "High-quality, clear photos! Your main photo should be horizontal/landscape. We'll give you tips on sizing when you sign up." 
      },
      { 
        q: "What if I don't have professional photos?", 
        a: "No problem! Good phone camera photos work perfectly. Just make sure they're clear, well-lit, and not blurry." 
      },
      { 
        q: "Do you write the content for me?", 
        a: "No, you tell us your story, venue details, etc. through our form. But we'll help polish the wording if needed and let you know if something doesn't look right." 
      },
      { 
        q: "Can you translate my website to another language?", 
        a: "Yes! This is available in the Prestige package. Tell us during your consultation." 
      },
    ]
  },
  {
    category: "Payment & Pricing",
    faqs: [
      { 
        q: "Are there any hidden fees?", 
        a: "Nope! The only additional costs might be: Additional revisions beyond what's included (₱500 each), Extending your hosting (₱500/month), Rush service (₱1,000 for 24-48 hour delivery), Password protection (₱500 one-time fee), Your own custom domain if you want one (you purchase this separately, around $10-15/year - Prestige only)." 
      },
      { 
        q: "What's your refund policy?", 
        a: "All sales are final. We don't offer refunds once you've placed your order. However, we're committed to working with you until you're happy with your website! That's why we include revisions in every package." 
      },
    ]
  },
  {
    category: "Technical Questions",
    faqs: [
      { 
        q: "Will my website work on phones?", 
        a: "Yes! All our templates are mobile-friendly and look great on phones, tablets, and computers." 
      },
      { 
        q: "Can guests RSVP on the website?", 
        a: "RSVP functionality is only available in the Prestige package. For Luxury and Elegant, you can include your contact info so guests can RSVP via email or phone." 
      },
      { 
        q: "Can I password-protect my website?", 
        a: "Yes! For an additional ₱500 one-time fee, we can add password protection to your website. You choose the password and share it with your guests. This keeps your wedding details private and only accessible to invited guests." 
      },
      { 
        q: "Will my website show up on Google?", 
        a: "Your website is public once live, but it won't rank on Google searches. It's meant to be shared directly with your guests via your invitation or social media." 
      },
      { 
        q: "Can I download my website after?", 
        a: "You'll receive a PDF version of your website for memories. The actual website files are our property, but photos and content you provided are always yours." 
      },
    ]
  },
  {
    category: "Special Requests",
    faqs: [
      { 
        q: "Can you add a video?", 
        a: "Yes! Available in Elegant and Prestige packages. Just send us a YouTube or Vimeo link." 
      },
      { 
        q: "Can I add music?", 
        a: "Available in Prestige package only." 
      },
      { 
        q: "What if I want something not in your packages?", 
        a: "Reach out! We love custom requests. Small additions might be possible for a small fee, or we can quote you a Prestige package." 
      },
      { 
        q: "Do you create wedding invitations too?", 
        a: "We don't create physical invitations, but we do something even better! We'll design a beautiful, custom digital card/graphic for you that includes a QR code linking directly to your wedding website. This professionally designed image is perfect for: Sharing on social media (Instagram stories, Facebook posts), Sending via WhatsApp, Messenger, or text, Including in your physical invitations, Email announcements. Your guests simply scan the QR code with their phone camera and they're taken straight to your wedding website - no typing needed! This is included FREE with all packages!" 
      },
    ]
  },
  {
    category: "Support",
    faqs: [
      { 
        q: "What if something breaks on my website?", 
        a: "We monitor all our sites! If there's a technical issue on our end, we fix it immediately at no cost." 
      },
      { 
        q: "Can I contact you on weekends?", 
        a: "Yes! Email support is 7 days a week. Priority support (Elegant & Prestige) gets faster response times." 
      },
      { 
        q: "What if I have questions after my site goes live?", 
        a: "Luxury: Email support. Elegant: Priority email support. Prestige: Dedicated support (phone, WhatsApp, email)." 
      },
    ]
  },
];

const faqs = faqCategories.flatMap(cat => cat.faqs);

export default function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-brand-primary text-center"
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-8"
      >
        <Accordion type="single" collapsible className="rounded-xl border border-brand-secondary/30 bg-white/90">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="px-5">
              <AccordionTrigger className="text-base font-medium text-brand-dark hover:text-brand-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-brand-dark/80">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}

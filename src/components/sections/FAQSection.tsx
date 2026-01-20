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
        q: "What's the difference between the two packages?", 
        a: "<ul class='space-y-3 mt-2'><li><strong>Elegant ($100/₱4,999)</strong> - Our most popular! Choose from 5 beautiful templates with ALL sections included. The template design is fixed - only your details, photos, and text change. Perfect for couples who want a stunning website quickly. 2 revisions included, priority support. Live in 3 days. Domain: bridesname&groomsname.withvows.com</li><li><strong>Custom (Price Quotation)</strong> - For couples who want something totally unique. Fully custom layout, custom colors and branding, your own custom domain (e.g., yournames.com). Unlimited revisions, dedicated support. We'll create a personalized price quote based on your needs.</li></ul>" 
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
        a: "Your website will be a subdomain of ours. For example: emmaandjames.withvows.com or forever.withvows.com - you choose the first part!" 
      },
      { 
        q: "Can I have my own custom domain like 'emmaandjames.com'?", 
        a: "Yes! Custom domain connection is available with our Custom package. The Elegant package uses our subdomain format (bridesname&groomsname.withvows.com). For a custom domain, you'll need to purchase your own domain name (around $10-15/year) and we'll connect it for you." 
      },
      { 
        q: "How do I choose my website name?", 
        a: "Pick something memorable! <strong>Popular choices:</strong><ul class='mt-2 space-y-1'><li>• Your names together (emmaandjames)</li><li>• A special date (june152025)</li><li>• Your hashtag (teamsmith)</li><li>• Something creative (foreverandalways)</li></ul>" 
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
        q: "Can I customize the colors or layout in the Elegant package?", 
        a: "The Elegant package uses fixed template designs for consistency and quick delivery. Only your content (names, dates, photos, text) changes. If you need custom colors, layouts, or design modifications, our Custom package is perfect for you - we'll create a personalized quote based on your specific needs." 
      },
      { 
        q: "Can I change my template after I've chosen one?", 
        a: "Yes, but only during your revision period. After your site goes live and all revisions are used, changing templates costs ₱1,500." 
      },
      { 
        q: "What sections are included on my website?", 
        a: "We have <strong>9 sections available:</strong><ul class='mt-2 space-y-1'><li>• <strong>Hero/Header</strong> - Your names and wedding date</li><li>• <strong>Our Story</strong> - Your love story with photo gallery</li><li>• <strong>Venue</strong> - Location, map, and directions</li><li>• <strong>Dress Code</strong> - What guests should wear</li><li>• <strong>Gift Registry</strong> - Your registries with links</li><li>• <strong>Countdown</strong> - Days until your wedding</li><li>• <strong>Event Schedule</strong> - Timeline of your wedding day</li><li>• <strong>FAQs</strong> - Answer common guest questions</li><li>• <strong>Contact</strong> - How to reach you</li></ul><p class='mt-3'><strong>Elegant Package:</strong> ALL sections included<br/><strong>Custom Package:</strong> All sections + custom sections and modifications you create</p>" 
      },
    ]
  },
  {
    category: "Timeline & Delivery",
    faqs: [
      { 
        q: "How long until my website is ready?", 
        a: "<ul class='space-y-1'><li><strong>Elegant:</strong> 3 days</li><li><strong>Custom:</strong> Depends on customization level, timeline discussed during consultation</li></ul>" 
      },
      { 
        q: "What if my wedding is in 2 days?!", 
        a: "Contact us! We offer rush service for an additional fee. We can often deliver in 24-48 hours if needed." 
      },
      { 
        q: "How long will my website stay live?", 
        a: "<ul class='space-y-1'><li><strong>Elegant:</strong> 45 days (can extend for additional fee)</li><li><strong>Custom:</strong> Extended hosting included</li></ul>" 
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
        a: "<strong>One round of changes.</strong> For example: <em>'Change the story text, swap out 3 photos, and fix a typo'</em> = 1 revision. Each time you send us a new list of changes counts as one revision." 
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
        a: "<strong>Nope!</strong> The only additional costs might be:<ul class='mt-2 space-y-1'><li>• Additional revisions beyond what's included (<strong>₱500 each</strong>)</li><li>• Extending your hosting (<strong>₱500/month</strong>)</li><li>• Rush service (<strong>₱1,000</strong> for 24-48 hour delivery)</li><li>• Password protection (<strong>₱500</strong> one-time fee)</li><li>• Your own custom domain if you want one (you purchase this separately, around <strong>$10-15/year</strong> - Prestige only)</li></ul>" 
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
        a: "RSVP functionality is only available in the Custom package. For Elegant, you can include your contact info so guests can RSVP via email or phone." 
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
        a: "We don't create physical invitations, but we do something even better! We'll design a beautiful, <strong>custom digital card/graphic</strong> for you that includes a <strong>QR code</strong> linking directly to your wedding website.<p class='mt-2'>This professionally designed image is perfect for:</p><ul class='mt-2 space-y-1'><li>• Sharing on social media (Instagram stories, Facebook posts)</li><li>• Sending via WhatsApp, Messenger, or text</li><li>• Including in your physical invitations</li><li>• Email announcements</li></ul><p class='mt-2'>Your guests simply scan the QR code with their phone camera and they're taken straight to your wedding website - no typing needed! <strong>This is included FREE with all packages!</strong></p>" 
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
        a: "<ul class='space-y-1'><li><strong>Elegant:</strong> Priority email support</li><li><strong>Custom:</strong> Dedicated support (phone, WhatsApp, email)</li></ul>" 
      },
    ]
  },
];

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
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-brand-dark/70 mt-2 mb-8"
      >
        Everything You Need to Know About Our Service
      </motion.p>
      
      <div className="space-y-8">
        {faqCategories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: catIndex * 0.05, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-brand-primary mb-3 uppercase tracking-wide">
              {category.category}
            </h3>
            <Accordion type="single" collapsible className="rounded-xl border border-brand-secondary/30 bg-white/90">
              {category.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${catIndex}-${i}`} className="px-5">
                  <AccordionTrigger className="text-base font-medium text-brand-dark hover:text-brand-primary text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-brand-dark/80 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: f.a }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-12 p-6 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-xl border border-brand-primary/20"
      >
        <h3 className="text-xl font-semibold text-brand-primary mb-3">Still Have Questions?</h3>
        <p className="text-brand-dark/80 mb-4">We&apos;re here to help! Reach out to us:</p>
        <ul className="space-y-2 text-sm text-brand-dark/80">
          <li><strong>Email:</strong> hello@fromthisday.com</li>
          <li><strong>Response Time:</strong> Within 24 hours (faster for Elegant & Prestige customers)</li>
        </ul>
      </motion.div>
    </section>
  );
}

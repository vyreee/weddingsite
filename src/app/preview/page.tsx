"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Monitor, Smartphone, ArrowLeft } from "lucide-react";
import Link from "next/link";

type TemplateKey = "1" | "2" | "4";
type DeviceView = "desktop" | "mobile";

const TEMPLATES: Record<TemplateKey, { name: string; desc: string; status: string }> = {
  "1": { name: "Classic Elegance", desc: "Timeless & Romantic", status: "Live" },
  "2": { name: "Modern Minimalist", desc: "Clean & Contemporary", status: "Live" },
  "4": { name: "Garden Romance", desc: "Floral & Natural", status: "Live" },
};

export default function PreviewPage() {
  const [template, setTemplate] = React.useState<TemplateKey>("1");
  const [device, setDevice] = React.useState<DeviceView>("desktop");
  const [iframeKey, setIframeKey] = React.useState(0);
  const [brideName, setBrideName] = React.useState("Emma");
  const [groomName, setGroomName] = React.useState("James");
  const [weddingDate, setWeddingDate] = React.useState("2025-06-15");
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const currentTemplate = TEMPLATES[template];

  // Force iframe reload when template changes
  React.useEffect(() => {
    setIframeKey(prev => prev + 1);
  }, [template]);

  // Send customization data to iframe
  const sendDataToIframe = React.useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_WEDDING_DATA',
        bride: brideName,
        groom: groomName,
        date: weddingDate
      }, '*');
    }
  }, [brideName, groomName, weddingDate]);

  React.useEffect(() => {
    // Send after iframe loads
    const timer = setTimeout(sendDataToIframe, 500);
    return () => clearTimeout(timer);
  }, [brideName, groomName, weddingDate, iframeKey, sendDataToIframe]);

  // Format date for display (currently unused but kept for future use)
  // const formatDate = (dateStr: string) => {
  //   if (!dateStr) return '';
  //   const date = new Date(dateStr);
  //   return date.toLocaleDateString('en-US', { 
  //     year: 'numeric', 
  //     month: 'long', 
  //     day: 'numeric' 
  //   });
  // };

  // Generate URL from names
  const generateUrl = () => {
    const bride = brideName.toLowerCase().replace(/\s+/g, '');
    const groom = groomName.toLowerCase().replace(/\s+/g, '');
    return bride && groom ? `${bride}${groom}.wedding.site` : 'yournames.wedding.site';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#98C1D9]/10 via-[#6969B3]/10 to-[#533A7B]/10">
      {/* Header */}
      <header className="border-b border-brand-secondary/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors">
              <ArrowLeft className="size-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-brand-accent/10 rounded-lg p-1">
              <button
                onClick={() => setDevice("desktop")}
                className={`p-2 rounded-md transition-colors ${device === "desktop" ? "bg-white text-brand-primary shadow-sm" : "text-brand-dark/60 hover:text-brand-primary"}`}
                title="Desktop view"
              >
                <Monitor className="size-4" />
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`p-2 rounded-md transition-colors ${device === "mobile" ? "bg-white text-brand-primary shadow-sm" : "text-brand-dark/60 hover:text-brand-primary"}`}
                title="Mobile view"
              >
                <Smartphone className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="rounded-xl border border-brand-secondary/30 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-primary mb-4">Templates</h2>
              <div className="space-y-2">
                {(Object.keys(TEMPLATES) as TemplateKey[]).map((key) => {
                  const t = TEMPLATES[key];
                  const isActive = template === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setTemplate(key)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        isActive 
                          ? "bg-gradient-to-r from-[#533A7B] to-[#6969B3] text-white border-transparent shadow-md" 
                          : "border-brand-secondary/30 hover:bg-brand-accent/10 hover:border-brand-secondary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className={`font-medium ${isActive ? "text-white" : "text-brand-primary"}`}>
                            {t.name}
                          </div>
                          <div className={`text-xs mt-1 ${isActive ? "text-white/80" : "text-brand-dark/60"}`}>
                            {t.desc}
                          </div>
                        </div>
                        {t.status === "Coming Soon" && (
                          <span className={`text-[10px] px-2 py-1 rounded-full ${
                            isActive ? "bg-white/20" : "bg-brand-accent/20"
                          }`}>
                            Soon
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-brand-secondary/20">
                <h3 className="text-sm font-semibold text-brand-primary mb-3">Customize Demo</h3>
                <p className="text-xs text-brand-dark/60 mb-4">Make it more personal!</p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-brand-dark/70 mb-1">
                      Bride&apos;s Name
                    </label>
                    <input
                      type="text"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      placeholder="Emma"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-brand-dark/70 mb-1">
                      Groom&apos;s Name
                    </label>
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      placeholder="James"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-brand-dark/70 mb-1">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-brand-secondary/20">
                <p className="text-xs text-brand-dark/60 mb-3">
                  <strong className="text-brand-primary">Demo Mode:</strong> Interactive preview only. Full customization available after purchase.
                </p>
                <Link 
                  href="/#pricing" 
                  className="block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#533A7B] to-[#6969B3] text-white text-sm font-medium hover:shadow-lg transition-shadow"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.aside>

          {/* Preview Area */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="min-h-[800px]"
          >
            <div className="rounded-xl border border-brand-secondary/30 bg-white shadow-lg overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-brand-secondary/20 bg-gradient-to-r from-brand-accent/5 to-transparent">
                <div className="flex gap-2">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-yellow-400" />
                  <div className="size-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4 px-4 py-1.5 rounded-md bg-white border border-brand-secondary/20 text-xs text-brand-dark/70">
                  {generateUrl()}
                </div>
                <div className="text-xs text-brand-dark/50 font-medium">
                  {currentTemplate.name}
                </div>
              </div>

              {/* Template Preview */}
              <div className="bg-brand-accent/5 p-6 flex items-center justify-center min-h-[calc(100vh-200px)]">
                <motion.div
                  key={`${template}-${device}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white shadow-2xl overflow-hidden ${
                    device === "desktop" 
                      ? "w-full rounded-lg" 
                      : "w-[375px] h-[667px] rounded-[2.5rem] border-8 border-gray-800"
                  }`}
                >
                  <iframe
                    ref={iframeRef}
                    key={iframeKey}
                    src={`/templates/template-${template}.html`}
                    onLoad={sendDataToIframe}
                    className="w-full h-full border-0"
                    style={{
                      height: device === "desktop" ? "calc(100vh - 280px)" : "100%",
                      minHeight: device === "desktop" ? "600px" : "auto"
                    }}
                    title={`${currentTemplate.name} Preview`}
                  />
                </motion.div>
              </div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}

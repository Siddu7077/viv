import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Packages from "./pages/Packages";
import Amenities from "./pages/Amenities";
import Events from "./pages/Events";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Return from "./pages/Return";
import Refund from "./pages/Refund";
import Shipping from "./pages/Shipping";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Global Toasts */}
      <Toaster />
      <Sonner />

      {/* Marquee Banner */}
      {/* <div className="w-full bg-amber-100 py-2 text-center shadow-sm overflow-hidden">
        <div className="whitespace-nowrap animate-marquee font-medium text-vivenza-black">
          🚧 WEBSITE UNDER CONSTRUCTION - COMING SOON! 🚧 Contact us: 040-2222 8888 / +91 969779 8888
        </div>
      </div> */}

      {/* Main Routing */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping-policy" element={<Shipping />} />
          <Route path="/refund-cancellation" element={<Refund />} />
          <Route path="/return-policy" element={<Return />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

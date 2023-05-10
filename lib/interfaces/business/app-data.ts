import AppLegalInfo from "./app-legal-info";
import AppNavLink from "../technical/app-nav-link";
import ContactForm from "../technical/contact-form";
import Image from "../technical/image";
import PricingPlan from "./pricing-plan";
import Testimonial from "./testimonial";

interface AppData {
  contactForm?: ContactForm;
  description: string;
  landingImages: {
    [key: string]: Image;
  };
  legalInfo: AppLegalInfo;
  mainHeadingHighlightedExpression?: string;
  mainHeadingSubText1: string;
  mainHeadingSubText2?: string;
  mainHeadingText: string;
  navLinks: AppNavLink[];
  pricingPlans?: PricingPlan[];
  pricingPlansSectionName?: string;
  testimonials?: Testimonial[];
  testimonialsSectionName?: string;
  title: string;
  theme: string;
  themeColor: string;
  url: string;
}

export default AppData;

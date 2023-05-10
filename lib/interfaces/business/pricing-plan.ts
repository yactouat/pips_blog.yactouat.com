import Image from "../technical/image";

interface PricingPlan {
  basis: string;
  class: "Basic" | "Premium" | "Elite";
  currency: string;
  name: string;
  poster?: Image;
  price: number | "free";
}

export default PricingPlan;

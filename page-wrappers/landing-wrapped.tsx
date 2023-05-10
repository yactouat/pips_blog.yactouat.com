import Head from "next/head";
import { useContext, useEffect } from "react";

import AppDataContext from "@/app-state/app-data/app-data-context";
import AppSection from "@/components/app-section/app-section";
import BlogPostsList from "@/components/blog/blog-posts-list/blog-posts-list";
import Card from "@/components/card/card";
import ContactForm from "@/components/contact-form/contact-form";
import Hr from "@/components/hr";
import MainLayout from "@/components/main-layout/main-layout";
import Testimonial from "@/components/testimonial/testimonial";
import UserProfileContext from "@/app-state/user-profile/user-profile-context";

const LandingWrapped = () => {
  const { data, setAppData } = useContext(AppDataContext);
  const { autoSignIn } = useContext(UserProfileContext);

  useEffect(() => {
    autoSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return <p>... loading</p>;

  return (
    <MainLayout page="home" themeColor={data.themeColor}>
      <Head>
        <title>{data!.title} | Home</title>
        {/* scripts that need to be loaded ASAP should go here */}
        <meta property="og:title" content={data!.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={data!.url} />
        <meta name="description" content={data!.description} />
      </Head>

      {data!.blogPostsList && <BlogPostsList posts={data!.blogPostsList} />}

      {data!.pricingPlans && (
        <>
          <Hr />
          <AppSection
            id="plans"
            title={data!.pricingPlansSectionName ?? "Plans"}
          >
            <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row sm:justify-center items-center gap-8">
              {data!.pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  data={{
                    image: plan.poster ?? undefined,
                    title: plan.name,
                    subtext1:
                      plan.price == "free"
                        ? "free"
                        : `${plan.price} ${plan.currency} / ${plan.basis}`,
                  }}
                />
              ))}
            </ul>
          </AppSection>
        </>
      )}

      {data!.testimonials && (
        <>
          <Hr />
          <AppSection
            id="testimonials"
            title={data!.testimonialsSectionName ?? "Testimonials"}
          >
            {data!.testimonials.map((testimonial) => (
              <Testimonial
                testimonial={testimonial}
                key={testimonial.username}
              />
            ))}
          </AppSection>
        </>
      )}

      {data!.contactForm && (
        <>
          <Hr />
          <AppSection id="contact" title={data!.contactForm.title ?? ""}>
            <ContactForm form={data!.contactForm} theme={data!.theme} />
          </AppSection>
        </>
      )}
    </MainLayout>
  );
};

export default LandingWrapped;

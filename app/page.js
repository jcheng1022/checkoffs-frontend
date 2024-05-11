import Hero from "@/components/landing/Hero";
import FeatureList from "@/components/landing/FeatureList";
// import cookies from 'next/headers'
// import ScrollAnimation from 'react-animate-on-scroll';
export default function Home() {

    return (
    <>
        <Hero />
        {/*<ScrollAnimation animateIn="fadeIn">*/}
            <FeatureList />

        {/*</ScrollAnimation>*/}

        {/*<HomePage />*/}
    </>
  );
}



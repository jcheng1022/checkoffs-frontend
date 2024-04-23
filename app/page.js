import HomePage from "@/components/home";
import Hero from "@/components/landing/Hero";
import FeatureList from "@/components/landing/FeatureList";
// import cookies from 'next/headers'

export default function Home() {

    return (
    <>
        <Hero />
        <FeatureList />
        {/*<HomePage />*/}
    </>
  );
}



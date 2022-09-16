import Head from 'next/head';
// import Image from 'next/image';
// import Script from 'next/script'
import AboutMeSection from '../components/AboutMeSection';
import HomeSection from '../components/HomeSection';
import ProjectSection from '../components/ProjectSection';
import ContactSection from '../components/ContactSection';
import HomeLayout from '../components/layout/HomeLayout';

export default function Home() {
  return (
    <HomeLayout 
          // title="Gallery"
          // metaDesc={project.metaDescription}
          // metaKey={project.metaKeyword}
      >
        <section id="home" >
          <HomeSection/>
        </section>
        <section id="about">
          <AboutMeSection/>
        </section>
        <section id="project">
          <ProjectSection/>
        </section>
        <section id="contact">
          <ContactSection/>
        </section>
    </HomeLayout>
  )
}

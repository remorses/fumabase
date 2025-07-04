import { href, redirect } from 'react-router'
import 'website/src/framer/styles.css'

import { Route } from '../+types/root'
import { getSession } from '../lib/better-auth'
import { prisma } from 'db'
import HeroSectionFramerComponent from 'website/src/framer/hero-section'
import IntroSectionFramerComponent from 'website/src/framer/intro-section'
import BentoSectionFramerComponent from 'website/src/framer/bento-section'
// import FeatureSectionFramerComponent from 'website/src/framer/feature-section'
import BenefitSectionFramerComponent from 'website/src/framer/benefit-section'
import MetricsSectionFramerComponent from 'website/src/framer/metrics-section'
import PricingSectionFramerComponent from 'website/src/framer/pricing-section'
import TestimonialsSectionFramerComponent from 'website/src/framer/testimonials-section'
import FaqSectionFramerComponent from 'website/src/framer/faq-section'
import React, { Suspense } from 'react'
import NavBarFramerComponent from '../framer/nav-bar'
import FooterFramerComponent from '../framer/footer'

export async function loader({ request }: Route.LoaderArgs) {
    const { userId, redirectTo } = await getSession({ request })
    if (redirectTo) {
        return {}
    }
    return {}
}

export default function App() {
    return (
        <div className='flex dark bg-black text-white flex-col items-center '>
            <NavBarFramerComponent.Responsive className='!fixed z-10' />
            <HeroSectionFramerComponent.Responsive />
            {/* <IntroSectionFramerComponent.Responsive />
            <BentoSectionFramerComponent.Responsive />

            <BenefitSectionFramerComponent.Responsive />
            <MetricsSectionFramerComponent.Responsive />
            <PricingSectionFramerComponent.Responsive />
            <TestimonialsSectionFramerComponent.Responsive /> */}
            <FaqSectionFramerComponent.Responsive className='min-h-[900px] flex flex-col justify-start' />
            <FooterFramerComponent.Responsive className='!w-full' />
        </div>
    )
}

import React from 'react'
import SharedLayout from 'components/SharedLayout'
import BackButton from "components/navigation/BackButton";

export default function About() {
    return (
        <SharedLayout>
            <BackButton className="mt-3 mb-2" />
            <h1>About This Tool</h1>
            <p>The #1 obstacle to a survivor’s long-term safety is financial insecurity. This means that we cannot disrupt the cycle of intimate partner violence in the U.S. until we move beyond the current focus on crisis response and prioritize policies that support financial security and long-term safety for survivors and their families. That is, we must prioritize policies that support survivor wealth.</p>
            <p>Our National Survivor Financial Security Policy Map and Scorecard (Policy Map and Scorecard) acts as both a resource and a roadmap for action. For each state, the map outlines the existing laws impacting a survivor’s ability to build and maintain financial security, and provides state-specific policy recommendations that will ensure that all survivors have access to the financial resources and support they need to thrive and live free from abuse.</p>
            <h3>What does it do?</h3>
            <ul className="big-indents">
                <li>Provides accessible and plain language information about the laws in each state that impact a survivor’s ability to build financial security</li>
                <li>Evaluates how well each state supports survivors in building financial security based on these laws</li>
                <li>Offers state-specific and survivor-centered policy recommendations for how each state can better prioritize financial security for survivors</li>
                <li>Provides quick and easy ways for users to take action, contribute to the policy making process, and engage with state lawmakers to pass policies that better support survivors in their state</li>
            </ul>
            <h3>Who is it for?</h3>
            <p>The short answer is: everyone! Our tool is perfect for:</p>
            <ul className="big-indents">
                <li>Folks who want to learn more about the laws in their state and how they compare to others across the U.S.</li>
                <li>Folks who want to take action and advocate for better and more supportive policies for survivors in their state</li>
                <li>Elected officials and those working in legislative offices</li>
                <li>Survivors who are interested in learning more about, and getting engaged in, the policy-making process in their state</li>
            </ul>
            <p>We’ve designed this tool to work for you – so feel free to use it in whatever way feels right!</p>

        </SharedLayout>
    )
}

import React from "react";

import SharedLayout from "components/SharedLayout";
import BackButton from "components/navigation/BackButton";

export default function Acknowledgements() {
    return (
        <SharedLayout>
            <BackButton className="mt-3 mb-2" />
            <h1 className="subpage-header">Acknowledgements</h1>
            <p>We want to take a moment to acknowledge that the Policy Map and Scorecard could not have been made possible without the support and contributions made by the law firms, research volunteers and all those involved in this project! We thank you for all of your work and contribution to making this tool a success!</p>
            <h2>Pro Bono Partners</h2>
            <ul className="no-bullets no-indents">
                <li>Alston & Bird, LLP</li>
                <li>DLA Piper, LLP</li>
                <li>Foley and Lardner, LLP</li>
                <li>Lex Mundi Pro Bono Foundation</li>
                <li>Morrison and Foerester, LLP</li>
                <li>Proskauer Rose, LLP</li>
                <li>Seyfarth Shaw, LLP</li>
                <li>Womble Bond Dickinson (US) LLP</li>
            </ul>
            <h2>Legal Research Volunteers</h2>
            <ul className="no-bullets no-indents">
                <li>Dr. Monica Beard</li>
                <li>Tracy L. Boak, Perlman & Perlman, LLP</li>
                <li>Odinaka Ezeokoli</li>
                <li>Susan Goland</li>
                <li>Meredith Hightower</li>
                <li>Lauren Keefe</li>
                <li>Kathleen Kennedy</li>
                <li>Mary Mabey</li>
                <li>Emily Plowcha, Cozen O'Connor</li>
                <li>Shelley Smith</li>
                <li>Brooke Thacher</li>
                <li>Monica Towarnicky</li>
            </ul>
            <h2>Consultant</h2>
            <ul className="no-bullets no-indents">
                <li>Priyamvada Kumar</li>
            </ul>
            <h2>Design</h2>
            <ul className="no-bullets no-indents">
                <li>Tiffany Hernandez</li>
            </ul>
            <h2>Ragtag.org Tech Volunteers</h2>
            <ul className="no-bullets no-indents">
                <li>Jenn Czeck</li>
                <li>Emily Giurleo</li>
                <li>Sarah Green</li>
                <li>Pratap Jayaram</li>
                <li>Danny Kim</li>
                <li>Brittany Lau</li>
                <li>Landon Reed</li>
                <li>Grant Stromgren</li>
                <li>Thaydryan Sweeney</li>
            </ul>
            <h2>FreeFrom Project Leads</h2>
            <ul className="no-bullets no-indents">
                <li>Sabrina Hamm, Policy and Advocacy Specialist</li>
                <li>Amy Durrence, Director of Systems Change Initiatives</li>
                <li>Sonya Passi, CEO & Founder</li>
            </ul>
            <h2>FreeFrom Outreach and Dissemination Team</h2>
            <ul className="no-bullets no-indents">
                <li>Anakaren Alcocer</li>
                <li>Diana Ayala</li>
                <li>Chriseithia Collins</li>
                <li>Kirkley Doyle</li>
                <li>Pamela Guerra</li>
                <li>Em Jackson</li>
                <li>Dafne Jacobs</li>
                <li>Hye Sun Kim</li>
                <li>Sharon Lim</li>
                <li>Tannia Ventura</li>
                <li>Ana Zimmerman</li>
            </ul>
        </SharedLayout>
    )
}

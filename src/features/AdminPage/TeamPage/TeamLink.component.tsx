import React from 'react';
import facebook from '@assets/images/partners/facebook.png';
import instagram from '@assets/images/partners/instagram.png';
import twitter from '@assets/images/partners/twitter.png';
import youtube from '@assets/images/partners/youtube.png';

import { TeamMemberLinkCreateUpdate } from '@/models/team/team.model';

const LogoType = [twitter, instagram, facebook, youtube];
const TeamLink: React.FC<{ link: TeamMemberLinkCreateUpdate }> = ({ link }) => (
    <a
        rel="noreferrer"
        target="_blank"
        className="sourceLink"
        href={link.targetUrl}
    >
        <img
            key={link.id}
            src={LogoType[link.logoType]}
            alt={link.targetUrl}
        />
    </a>
);
export default TeamLink;

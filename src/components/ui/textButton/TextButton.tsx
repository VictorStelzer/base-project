import React from 'react';

import { Props } from './types';

import { Link as MuiLink } from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import { getSpacingStyles, getHoverStyles, getFlexStyles, getSizeStyles, SPACING_PROPS, HOVER_PROPS, LAYOUT_PROPS, SIZE_PROPS } from '@/components/styles';

const StyledLink = styled(MuiLink as any, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            ...LAYOUT_PROPS,
            ...SIZE_PROPS,
        ] as string[]).includes(prop as string),
})<Props>(({ theme, ...props }) => ({
    cursor: 'pointer',
    ...getSizeStyles(theme, props),
    ...getFlexStyles(theme, props),
    ...getSpacingStyles(theme, props),
    ...getHoverStyles(theme, props.hover),
}));

export const TextButton: React.FC<Props> = ({ href, to, underline = 'none', onClick, ...props }) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href?.startsWith('#')) {
            e.preventDefault();
            const id = href.slice(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
            e.preventDefault();
            navigate(href);
        }
        onClick?.(e as any);
    };

    // External or anchor: use plain <a>; internal routes: use RouterLink
    const isAnchor = href?.startsWith('#');
    const isExternal = href?.startsWith('http') || href?.startsWith('mailto') || href?.startsWith('tel');

    if (isAnchor || isExternal) {
        return (
            <StyledLink
                href={href}
                underline={underline}
                onClick={handleClick}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...props}
            />
        );
    }

    return (
        <StyledLink component={RouterLink} to={to || href || '#'} underline={underline} onClick={onClick} {...props} />
    );
};

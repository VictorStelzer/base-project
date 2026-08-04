import React from 'react';

import { SwitchProps } from './types';

import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import { getSpacingStyles, getVisibilityStyles, SPACING_PROPS, VISIBILITY_PROPS } from '@/components/styles';

const StyledSwitch = styled(MuiSwitch as any, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...VISIBILITY_PROPS,
        ] as string[]).includes(prop as string),
})<SwitchProps>(({ theme, ...props }) => {
    return {
        ...getSpacingStyles(theme, props),
        ...getVisibilityStyles(theme, props),
    } as CSSObject;
}) as React.FC<SwitchProps>;

export const Switch: React.FC<SwitchProps> = ({ label, ...props }) => {
    if (label) {
        return <FormControlLabel control={<StyledSwitch {...props} />} label={label} />;
    }

    return <StyledSwitch {...props} />;
};

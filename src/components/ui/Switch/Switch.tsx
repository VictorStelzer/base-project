import React from 'react';

import { SwitchProps } from './types';

import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import { Box } from '@/components';

import { getSpacingStyles, getVisibilityStyles, SPACING_PROPS, VISIBILITY_PROPS } from '@/components/styles';

const StyledSwitch = styled(MuiSwitch, {
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
});

export const Switch: React.FC<SwitchProps> = ({ label, hideUp, hideDown, ...props }) => {
    if (label) {
        // hideUp/hideDown precisam envolver o FormControlLabel inteiro, senão só o switch
        // some no breakpoint e o texto do label fica órfão na tela.
        return (
            <Box hideUp={hideUp} hideDown={hideDown} sx={{ display: 'inline-flex' }}>
                <FormControlLabel disabled={props.disabled} control={<StyledSwitch {...props} />} label={label} />
            </Box>
        );
    }

    return <StyledSwitch hideUp={hideUp} hideDown={hideDown} {...props} />;
};

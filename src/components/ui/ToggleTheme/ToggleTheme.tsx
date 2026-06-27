    import React from 'react';
import { styled } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useThemeMode } from '@/hooks/useThemeMode';
import { IconButton, Box, Icon } from '@/components';
import { ToggleThemeProps } from './types';

// Wrapper para rotacionar o ícone no modo normal (IconButton)
const AnimatedIconWrapper = styled('span', {
    shouldForwardProp: (prop) => prop !== 'isDark',
})<{ isDark: boolean }>(({ isDark }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isDark ? 'rotate(360deg)' : 'rotate(0deg)',
}));

// Estilos customizados para o Switch
const SwitchTrack = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isDark',
})<{ isDark: boolean }>(({ isDark }) => ({
    width: 60,
    height: 32,
    borderRadius: 16,
    padding: 3,
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.4s ease-in-out, box-shadow 0.4s ease',
    background: isDark
        ? 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)' // Céu noturno escuro gradiente
        : "#70A1FF",
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
}));

const SwitchThumb = styled('div', {
    shouldForwardProp: (prop) => prop !== 'isDark',
})<{ isDark: boolean }>(({ isDark }) => ({
    width: 26,
    height: 26,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 3,
    transform: `translateX(${isDark ? 28 : 0}px)`,
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease, box-shadow 0.4s ease',
    backgroundColor: isDark ? '#FFF9C4' : '#FFFFFF',
    boxShadow: isDark
        ? '0 2px 4px rgba(0,0,0,0.4), 0 0 8px rgba(255, 235, 59, 0.6)'
        : '0 2px 4px rgba(0,0,0,0.2)',
}));

const AnimatedSwitchIconWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'isDark',
})<{ isDark: boolean }>(({ isDark }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isDark ? 'rotate(360deg)' : 'rotate(0deg)',
}));

export const ToggleTheme: React.FC<ToggleThemeProps> = ({ switch: isSwitch, ...props }) => {
    const { mode, toggleTheme } = useThemeMode();
    const isDark = mode === 'dark';

    if (isSwitch) {
        return (
            <SwitchTrack isDark={isDark} onClick={toggleTheme} {...props}>
                <SwitchThumb isDark={isDark}>
                    <AnimatedSwitchIconWrapper isDark={isDark}>
                        {isDark ? (
                            <Icon size={16} color="#424242" icon={<DarkModeIcon />} />
                        ) : (
                            <Icon size={16} color="#F59E0B" icon={<LightModeIcon />} />
                        )}
                    </AnimatedSwitchIconWrapper>
                </SwitchThumb>
            </SwitchTrack>
        );
    }

    return (
        <IconButton
            onClick={toggleTheme}
            color='text.secondary'
            {...props}
        >
            <AnimatedIconWrapper isDark={isDark}>
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </AnimatedIconWrapper>
        </IconButton>
    );
};

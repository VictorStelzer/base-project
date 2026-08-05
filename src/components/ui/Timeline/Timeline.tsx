import React from 'react';
import {
    Timeline as MuiTimeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from '@mui/lab';
import { styled, useTheme } from '@mui/material/styles';

import { TimelineProps, TimelineItemProps } from './types';
import { Box } from '../Box';
import { Text } from '../Text';
import {
    getColor,
    getSpacingStyles,
    getSizeStyles,
    getVisibilityStyles,
    getPositionStyles,
    SPACING_PROPS,
    SIZE_PROPS,
    VISIBILITY_PROPS,
    POSITION_PROPS,
} from '@/components/styles';

const StyledTimeline = styled(MuiTimeline, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...SIZE_PROPS,
            ...VISIBILITY_PROPS,
            ...POSITION_PROPS,
            'bulletColor',
            'lineColor',
            'bulletVariant',
            'bulletIcon',
            'icon',
            'hideConnector',
            'isLast',
            'oppositeContent',
            'color',
            'size',
            'items',
        ] as string[]).includes(prop as string),
})<TimelineProps>(({ theme, ...props }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- descarta `position` de propósito antes de repassar o resto pros getXStyles
    const { position: _position, ...styleProps } = props;
    return {
        padding: 0,
        margin: 0,
        ...getSpacingStyles(theme, styleProps),
        ...getSizeStyles(theme, styleProps),
        ...getVisibilityStyles(theme, styleProps),
        ...getPositionStyles(theme, styleProps),
    };
});

/** Helper interno para renderizar 1 item da Timeline */
export const SingleTimelineItem: React.FC<TimelineItemProps & { isLastItem?: boolean }> = ({
    title,
    children,
    oppositeContent,
    bulletColor,
    bulletIcon,
    icon,
    bulletVariant = 'filled',
    lineColor,
    color,
    size,
    hideConnector = false,
    isLast = false,
    isLastItem = false,
    className,
    style,
}) => {
    const theme = useTheme();

    // Cor padrão: 'text.secondary' (cinza da imagem de referência)
    const resolvedBulletColor = bulletColor || color || 'text.secondary';
    const finalBulletColor = getColor(theme, resolvedBulletColor);

    const resolvedLineColor = lineColor || color || 'text.secondary';
    const finalLineColor = getColor(theme, resolvedLineColor);

    const activeIcon = bulletIcon || icon;

    // Tamanho padrão maior conforme pedido ("deixar tudo bem maior")
    const numericSize = typeof size === 'number'
        ? size
        : (typeof size === 'string' && !isNaN(Number(size.replace('px', '')))
            ? Number(size.replace('px', ''))
            : undefined);

    const defaultSize = activeIcon ? 28 : 16;
    const effectiveSize = numericSize || (typeof size === 'number' ? size : defaultSize);

    const bulletSizeStyle = {
        width: effectiveSize,
        height: effectiveSize,
        minWidth: effectiveSize,
        minHeight: effectiveSize,
        p: 0,
        fontSize: Math.round(effectiveSize * 0.65),
    };

    const connectorWidth = numericSize ? Math.max(3, Math.round(numericSize / 6)) : 3;
    const shouldHide = hideConnector || isLast || isLastItem;

    return (
        <TimelineItem
            className={className}
            style={style}
            sx={{
                minHeight: 'auto',
                '&::before': oppositeContent ? undefined : { display: 'none' },
            }}
        >
            {oppositeContent && (
                <TimelineOppositeContent sx={{ py: 0, pb: 3, px: 2, flex: 0.3, textAlign: 'right' }}>
                    {typeof oppositeContent === 'string' ? (
                        <Text variant="body1" color="text.secondary" fontWeight={500}>
                            {oppositeContent}
                        </Text>
                    ) : (
                        oppositeContent
                    )}
                </TimelineOppositeContent>
            )}

            <TimelineSeparator sx={{ alignItems: 'center' }}>
                <TimelineDot
                    variant={bulletVariant}
                    sx={{
                        backgroundColor: bulletVariant === 'outlined' ? 'transparent' : finalBulletColor,
                        borderColor: finalBulletColor,
                        borderWidth: bulletVariant === 'outlined' ? 2 : 0,
                        borderStyle: 'solid',
                        color: bulletVariant === 'outlined'
                            ? finalBulletColor
                            : (theme.palette.getContrastText ? theme.palette.getContrastText(finalBulletColor || '#757575') : '#fff'),
                        boxShadow: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        m: 0,
                        mt: '4px',
                        ...bulletSizeStyle,
                    }}
                >
                    {activeIcon}
                </TimelineDot>

                {!shouldHide && (
                    <TimelineConnector
                        sx={{
                            backgroundColor: finalLineColor,
                            width: connectorWidth,
                            m: 0,
                            mt: 0,
                            mb: '-4px',
                            flexGrow: 1,
                        }}
                    />
                )}
            </TimelineSeparator>

            <TimelineContent sx={{ py: 0, pb: 3, px: 2.5, flex: 1 }}>
                {title && (
                    <Box mb={children ? 0.75 : 0}>
                        {typeof title === 'string' ? (
                            <Text variant="h6" fontWeight={700} color="text.primary" sx={{ fontSize: '1.2rem', lineHeight: 1.3 }}>
                                {title}
                            </Text>
                        ) : (
                            title
                        )}
                    </Box>
                )}
                {children && (
                    typeof children === 'string' ? (
                        <Text variant="body1" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.5 }}>
                            {children}
                        </Text>
                    ) : (
                        children
                    )
                )}
            </TimelineContent>
        </TimelineItem>
    );
};

export const Timeline: React.FC<TimelineProps> & { Item: React.FC<TimelineItemProps> } = ({
    items,
    title,
    children,
    oppositeContent,
    bulletColor,
    bulletIcon,
    icon,
    bulletVariant,
    lineColor,
    color,
    size,
    hideConnector,
    isLast,
    position = 'right',
    className,
    style,
    sx,
    ...props
}) => {
    // 1. Se foi passada a prop `items`, renderiza todos os itens em um único container contínuo
    if (items && items.length > 0) {
        return (
            <StyledTimeline position={position} className={className} style={style} sx={sx} {...props}>
                {items.map((item, index) => (
                    <SingleTimelineItem
                        key={index}
                        {...item}
                        oppositeContent={item.oppositeContent ?? oppositeContent}
                        bulletIcon={item.bulletIcon ?? bulletIcon}
                        icon={item.icon ?? icon}
                        bulletVariant={item.bulletVariant ?? bulletVariant}
                        bulletColor={item.bulletColor || bulletColor}
                        lineColor={item.lineColor || lineColor}
                        color={item.color || color}
                        size={item.size || size}
                        hideConnector={item.hideConnector ?? hideConnector}
                        isLast={item.isLast ?? isLast}
                        isLastItem={index === items.length - 1 || item.hideConnector || item.isLast}
                    />
                ))}
            </StyledTimeline>
        );
    }

    // 2. Se foram passados filhos React (ex: <Timeline.Item /> ou múltiplos filhos sem prop title no pai)
    if (React.Children.count(children) > 0 && !title) {
        const childrenArray = React.Children.toArray(children);
        return (
            <StyledTimeline position={position} className={className} style={style} sx={sx} {...props}>
                {childrenArray.map((child, index) => {
                    const isLastItem = index === childrenArray.length - 1;
                    if (React.isValidElement<TimelineItemProps & { isLastItem?: boolean }>(child)) {
                        return React.cloneElement(child, {
                            key: child.key || index,
                            oppositeContent: child.props.oppositeContent ?? oppositeContent,
                            bulletIcon: child.props.bulletIcon ?? bulletIcon,
                            icon: child.props.icon ?? icon,
                            bulletVariant: child.props.bulletVariant ?? bulletVariant,
                            isLastItem: child.props.hideConnector || child.props.isLast || isLastItem,
                            bulletColor: child.props.bulletColor || bulletColor,
                            lineColor: child.props.lineColor || lineColor,
                            color: child.props.color || color,
                            size: child.props.size || size,
                            hideConnector: child.props.hideConnector ?? hideConnector,
                            isLast: child.props.isLast ?? isLast,
                        });
                    }
                    return child;
                })}
            </StyledTimeline>
        );
    }

    // 3. Caso de uso como item único standalone
    return (
        <StyledTimeline position={position} className={className} style={style} sx={sx} {...props}>
            <SingleTimelineItem
                title={title}
                oppositeContent={oppositeContent}
                bulletColor={bulletColor}
                bulletIcon={bulletIcon}
                icon={icon}
                bulletVariant={bulletVariant}
                lineColor={lineColor}
                color={color}
                size={size}
                hideConnector={hideConnector}
                isLast={isLast}
                // Item único solto: por padrão não desenha linha abaixo dele, mas só quando
                // hideConnector/isLast não foram informados — hideConnector/isLast (acima)
                // já são repassados direto pro SingleTimelineItem e decidem via `shouldHide`.
                isLastItem={hideConnector === undefined && isLast === undefined}
            >
                {children}
            </SingleTimelineItem>
        </StyledTimeline>
    );
};

Timeline.Item = SingleTimelineItem;

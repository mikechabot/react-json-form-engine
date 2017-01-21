import React from 'react';

export default function Flex ({
    id,
    style,
    className,
    column,
    vAlignCenter,
    hAlignCenter,
    flex,
    width,
    height,
    color,
    margin,
    padding,
    backgroundColor,
    onMouseOver,
    children
}) {
    return (
        <div
            id={id}
            className={className}
            onMouseOver={onMouseOver}
            style={{
                ...{ display: 'flex', ...column ? { flexDirection: 'column' } : {} },
                ...vAlignCenter ? column ? { justifyContent: 'center' } : { alignItems: 'center' } : {},
                ...hAlignCenter ? column ? { alignItems: 'center' } : { justifyContent: 'center' } : {},
                ...{ color, backgroundColor, width, height, margin, padding, flex },
                ...style
            }}>
            { children }
        </div>
    );
}

Flex.propTypes = {
    id             : React.PropTypes.string,
    style          : React.PropTypes.object,
    className      : React.PropTypes.string,
    column         : React.PropTypes.bool,
    vAlignCenter   : React.PropTypes.bool,
    hAlignCenter   : React.PropTypes.bool,
    flex           : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    width          : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    height         : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    color          : React.PropTypes.string,
    margin         : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    padding        : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    backgroundColor: React.PropTypes.string,
    onMouseOver    : React.PropTypes.func,
    children       : React.PropTypes.node
};

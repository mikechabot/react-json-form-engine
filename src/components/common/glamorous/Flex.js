import glamorous from 'glamorous';

const ALLOWED_FLEX_PROPS = [
    'alignItems',
    'background',
    'backgroundColor',
    'border',
    'borderRadius',
    'boxShadow',
    'color',
    'cursor',
    'flex',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'fontSize',
    'height',
    'justifyContent',
    'margin',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'overflow',
    'overflowX',
    'overflowY',
    'padding',
    'width'
];

function _getExplicitStyles(props, propKeys) {
    if (!propKeys) throw new Error('Missing required propKeys');
    if (!Array.isArray(propKeys)) throw new Error('propKeys must be an Array');
    return propKeys
        .map(
            prop => (props[prop] !== null && props[prop] !== undefined ? { [prop]: props[prop] } : null)
        )
        .filter(rule => rule);
}

function _getImplicitProps(props) {
    const implicit = [];
    if (props.column) {
        implicit.push({ flexDirection: 'column ' });
    }
    if (props.hAlignCenter) {
        implicit.push(props.column ? { alignItems: 'center' } : { justifyContent: 'center' });
    }

    if (props.vAlignCenter) {
        implicit.push(props.column ? { justifyContent: 'center' } : { alignItems: 'center' });
    }
    return implicit;
}

const Flex = glamorous.div(
    {
        display: 'flex'
    },
    props => {
        return [..._getImplicitProps(props), ..._getExplicitStyles(props, ALLOWED_FLEX_PROPS)];
    }
);

export default Flex;

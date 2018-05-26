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

export const Flex = glamorous.div(
    {
        display: 'flex'
    },
    props => {
        return [..._getImplicitProps(props), ..._getExplicitStyles(props, ALLOWED_FLEX_PROPS)];
    }
);

const mediaQueries = {
    Desktop: '@media screen and (min-width: 1088px)',
    Tablet: '@media screen and (min-width: 769px), print',
    Mobile: '@media screen and (max-width: 768px)'
};

export const Button = glamorous.button({
    userSelect: 'none',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    alignItems: 'center',
    cursor: 'pointer',
    border: '1px solid transparent',
    boxShadow: 'none',
    display: 'inlineFlex',
    justifyContent: 'center',
    fontSize: '1rem',
    height: '2.25em',
    lineHeight: 1.5,
    backgroundColor: '#3273dc',
    color: '#ffffff',
    borderWidth: '1px',
    paddingBottom: 'calc(0.375em - 1px)',
    paddingLeft: '0.75em',
    paddingRight: '0.75em',
    paddingTop: 'calc(0.375em - 1px)',
    textAlign: 'center',
    whiteApace: 'nowrap',
    ':hover': {
        backgroundColor: '#276cda',
        borderColor: 'transparent',
        color: '#ffffff'
    },
    ':focus': {
        outline: 'none',
        borderColor: 'transparent',
        color: '#ffffff'
    },
    ':active': {
        outline: 'none',
        backgroundColor: '#2366d1',
        borderColor: 'transparent',
        color: '#ffffff'
    },
    [mediaQueries.Mobile]: {
        fontSize: '0.75rem !important'
    }
});

// .navbar .is-dark
export const Navbar = glamorous.div({
    backgroundColor: '#363636',
    color: 'whitesmoke',
    minHeight: '3.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 30
});

export const NavbarBrand = glamorous.div({
    alignItems: 'stretch',
    display: 'flex',
    flexShrink: 0,
    minHeight: '3.25rem'
});

export const NavbarItemEnd = glamorous.div({
    padding: '0.5rem 0.75rem'
});

export const NavbarItem = glamorous.a(
    {
        color: 'whitesmoke',
        lineHeight: 1.5,
        padding: '0.5rem 0.75rem',
        flexGrow: 0,
        flexShrink: 0,
        alignItems: 'center',
        display: 'flex',
        ':hover': {
            backgroundColor: '#292929',
            color: 'whitesmoke'
        },
        [mediaQueries.Mobile]: {
            fontSize: '1rem !important'
        },
        [mediaQueries.Tablet]: {
            fontSize: '1.25rem !important'
        },
        [mediaQueries.Desktop]: {
            fontSize: '1.5rem !important'
        }
    },
    ({ isActive }) => {
        let styles = [];
        if (isActive) {
            styles.push({
                backgroundColor: '#292929',
                color: 'whitesmoke'
            });
        }
    }
);

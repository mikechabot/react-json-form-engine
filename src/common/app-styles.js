export const xgBlue = '#00A6E0';
export const xgGreen = '#92D30A';

// Material colors
// https://www.google.com/design/spec/style/color.html#color-color-palette
const grey = {
    300: '#E0E0E0',
    400: '#BDBDBD',
    700: '#616161',
    900: '#212121'
};

export const xgTable = {
    container: {
        marginBottom: 20
    },
    table: {
        fontSize      : '85%',
        borderCollapse: 'collapse',
        width         : '100%'
    },
    header: {
        borderBottom : `2px solid ${grey['300']}`,
        color        : grey['900'],
        opacity      : 0.9,
        textAlign    : 'left',
        fontWeight   : 300,
        fontSize     : '120%',
        textTransform: 'uppercase',
        padding      : '5px 10px'
    },
    cell: {
        padding     : '7px 10px',
        fontSize    : '115%',
        color       : grey['700'],
        fontWeight  : 300,
        borderBottom: `1px solid ${grey['300']}`
    }
};

export default {
    xgBlue,
    xgGreen,
    xgTable
};

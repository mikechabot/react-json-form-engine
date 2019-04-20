const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
];

const presets = [['@babel/env'], ['@babel/preset-react']];

module.exports = { presets, plugins };

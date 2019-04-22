const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const postcss = require('postcss');
const prefixer = require('postcss-prefix-selector');

const FILENAME = 'styles';
const RELATIVE_OUTPUT = '/dist/css';
const INPUT_PATH = path.join(__dirname, `/src/sass/${FILENAME}.scss`);
const PREFIX = '.__rjfe__';
const EXCLUDED_SELECTORS = ['*', '*::before', '*::after', 'html', 'body', 'a', 'a:hover'];

const outputs = [
    { filepath: path.join(__dirname, `${RELATIVE_OUTPUT}/${FILENAME}.css`), style: 'nested' },
    { filepath: path.join(__dirname, `${RELATIVE_OUTPUT}/${FILENAME}.min.css`), style: 'compressed' }
];

// Make the directory if it doesn't exist
fs.mkdirSync(path.join(__dirname, RELATIVE_OUTPUT), { recursive: true });

// Generate CSS from SASS
outputs.forEach(output => {
    sass.render(
        {
            file: INPUT_PATH,
            outFile: output.filepath,
            omitSourceMapUrl: true,
            outputStyle: output.style
        },
        (error, result) => {
            if (!error) {
                console.log('Rendering Complete, saving .css file...\n');
                fs.writeFile(output.filepath, result.css, err => {
                    if (!err) {
                        console.log(`Wrote ${output.style} CSS file to ${output.filepath}\n`);
                        prefixCss(output.filepath);
                    }
                });
            }
        }
    );
});

// Scope compiled CSS with a custom prefix
function prefixCss(filepath) {
    const input = fs.readFileSync(filepath, 'utf-8');
    postcss()
        .use(
            prefixer({
                prefix: PREFIX,
                transform: (prefix, selector, prefixedSelector) => {
                    if (EXCLUDED_SELECTORS.includes(selector)) {
                        return selector;
                    } else {
                        return prefixedSelector;
                    }
                }
            })
        )
        .process(input, { from: filepath, to: filepath })
        .then(result => {
            fs.writeFile(filepath, result.css, err => {
                if (!err) {
                    console.log(`Wrote prefixes to ${filepath}\n`);
                }
            });
        });
}

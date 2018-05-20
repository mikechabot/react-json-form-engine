import React from 'react';
import PropTypes from 'prop-types';

const regex = /^(.+)(.*\n)*(You passed:)((.*\n)*)(With the types:)((.*\n)*)(The API calls for:)((.*\n)*.)/g;

const APICheckError = ({ error }) => {
    let details = __parseAPICheckErrorMessage(error);
    return (
        <div>
            {_renderTitle(details ? details.shift() : 'Error initializing FormEngine')}
            {_renderDetails(details || [JSON.stringify(error)])}
        </div>
    );
};

const _renderTitle = title => {
    return (
        <div className="alert alert-danger paper-1">
            <h3>{title}</h3>
        </div>
    );
};

const _renderDetails = details => {
    return details
        .map((detail, index) => {
            const lines = detail.split('\n');
            if (lines.length === 1) return __renderInfoTitle(detail, index);
            if (detail.length > 1) return __renderJSONBlock(lines, index);
            return null;
        })
        .filter(detail => detail);
};

const __renderInfoTitle = (title, index) => {
    return (
        <div key={index} className="alert alert-info paper-1">
            <h4>{title}</h4>
        </div>
    );
};

const __renderJSONBlock = (lines, index) => {
    return (
        <div
            key={index}
            className="paper-1"
            style={{ maxHeight: 500, overflowY: 'auto', marginBottom: 20 }}
        >
            <pre>{lines.map(_renderLine)}</pre>
        </div>
    );
};

const _renderLine = (line, index) => {
    return (
        <div key={index} className="line">
            {line}
        </div>
    );
};

const __parseAPICheckErrorMessage = error => {
    if (!error.message) return null;
    const matches = regex.exec(error.message);
    if (matches) {
        matches.shift(); // Remove the full match
        matches.pop(); // Remove the last match (a trailing "}")
    }
    return matches;
};

APICheckError.propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default APICheckError;

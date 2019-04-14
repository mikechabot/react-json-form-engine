import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faSquare, faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons';
import {
    faAsterisk,
    faAngleRight,
    faExclamationTriangle,
    faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faSquare,
    faCheckSquare,
    faAngleRight,
    faAsterisk,
    faExclamationTriangle,
    faCircle,
    faDotCircle,
    faQuestionCircle
);

export { default as Asterisk } from './Asterisk';
export { default as Icon } from './Icon';
export { default as Flex } from './Flex';

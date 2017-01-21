export const INITIAL_STATE = {
    model: {},
    modal: {
        modalType : null,
        modalProps: {}
    },
    user: null
};

export const UNIQUE_CONSTRAINT = 'UNIQUE_CONSTRAINT';
export const CJR = 'cjr';
export const CJR_OFFICE = 'office';
export const CJR_CASE_MANAGEMENT = 'case';
export const ADMIN = 'admin';
export const USER_PROFILE = 'userProfile';

export const CASE_STATUSES = {
    REFERRED  : 'Referred',
    IDENTIFIED: 'Identified',
    IN_PROCESS: 'In Process',
    ENROLLED  : 'Enrolled',
    DECLINED  : 'Declined',
    CLOSED    : 'Closed',
    DELETED   : 'Deleted'
};

export const MODAL_TYPES = {
    'goal'        : 'GOAL_MODAL',
    'memberInfo'  : 'MEMBER_INFO_MODAL',
    'note'        : 'NOTE_MODAL',
    'todo'        : 'TODO_MODAL',
    'intervention': 'INTERVENTION_MODAL',
    'end-case'    : 'END_CASE_MODAL',
    'assessment'  : 'ASSESSMENT_MODAL'
};

export const GENDERS = {
    M: 'male',
    F: 'female'
};

export const MIN_PASSWORD_LENGTH = 10;

export const APP_ROUTES = [
    '/' + ADMIN,
    '/' + CJR_OFFICE,
    '/' + CJR_CASE_MANAGEMENT,
    '/' + USER_PROFILE

];

export const VALIDATION_STATES = {
    SUCCESS: 'success',
    ERROR  : 'error'
};

export const ADMIN_ACTIONS = {
    ADD                  : 'Add',
    EDIT                 : 'Edit',
    DELETE               : 'Delete',
    VIEW_USER_ROLES      : 'View User Roles',
    VIEW_ROLE_PERMISSIONS: 'View Role Permissions',
    VIEW_USER_SITES      : 'View User Sites',
    CHANGE_PASSWORD      : 'Change Password'
};

/**
 * Domain objects stored in MongoDB will contain at least the following properties:
 * @type {{CREATED_AT: string, CREATED_BY: string, ID: string, TENANT_ID: string, UPDATED_AT: string, UPDATED_BY: string, VERSION: string}}
 */
export const DOMAIN_OBJECT_PROPERTIES = {
    CREATED_AT: '_createdAt',
    CREATED_BY: '_createdBy',
    ID        : '_id',
    TENANT_ID : '_tenantId',
    UPDATED_AT: '_updatedAt',
    UPDATED_BY: '_updatedBy',
    VERSION   : '__v'
};

/**
 * Versioned objects will contain at least the following properties:
 * @type {{EXTERNAL_ID: string, PROJECT_ID: string, VERSION_ID: string, VERSION_NAME: string}}
 */
export const VERSION_PROPERTIES = {
    ...DOMAIN_OBJECT_PROPERTIES,
    EXTERNAL_ID : '_externalId',
    PROJECT_ID  : 'projectId',
    VERSION_ID  : 'versionId',
    VERSION_NAME: 'versionName'
};

/**
 * Question definition objects will contain at least the following properties
 * @type {{PARENT_QUESTION_ID: string, CHILD_QUESTION_ID: string}}
 */
export const QUESTION_PROPERTY = {
    ...VERSION_PROPERTIES,
    PARENT_QUESTION_ID: 'parentQuestionId',
    CHILD_QUESTION_ID : 'childQuestionId'
};
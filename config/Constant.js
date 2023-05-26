import Cookies from "js-cookie";

export const SERVER_URL = `https://${Cookies.get('beHostname')}`;
export const API_BASE_URL = `${SERVER_URL}/api/v1`;
export const APP_URL = `https://${Cookies.get('feHostname')}`;

export const API_BASE_URL_BEFORE_LOGIN = () => `https://${Cookies.get('beHostname')}/api/v1`;

export const FIREBASE_MASTER_PATH = (orgId,id) => {
    return `/notifications/org_${orgId}_user_id_${id}`;
}; //original

export const DATE_FORMAT = 'DD-MM-YYYY';
export const DISPLAY_DATE_FORMAT = "DD MMM, YYYY hh:mmA"

/**Status Codes */
export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    UNPROCESSABLE_ENTITY: 422,
    TO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    VALIDATION: 100
};

/**Regex for validations */
export const PASSWORD_WEIGHT_REGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@`~#^_$!%*?&])[A-Za-z\S]{6,}$/;
export const PASSWORD_MINLENGTH_REGX = /^[A-Za-z\S]{8,}$/;
export const VALIDATE_GSTIN = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
export const VALIDATE_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const VALIDATE_OTP_LENGTH = /^[0-9]{6}$/i;
export const VALIDATE_ZIP_CODE = /^[0-9]{6}$/i;
export const VALIDATE_CHEQUE_NUMBER = /^[0-9]{6}$/i;
export const VALIDATE_NUMBER = /^[0-9]*$/i;
export const VALIDATE_FLOAT_NUMBER = /^(\d*\.)?\d+$/i;
export const VALIDATE_MOBILE_NUMBER_LENGTH = /^[0-9]{10}$/i;
export const VALIDATE_ADHAR_CARD = /^\d{4}\d{4}\d{4}$/i;
export const VALIDATE_IFSC_CODE = /[A-Z|a-z]{4}[0][\d]{6}$/i;
export const VALIATE_PAN_CARD = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/i;
export const VALIDATE_VEHICLE_NUMBER = /^(([A-Za-z]){2,3}(|-)(?:[0-9]){1,2}(|-)(?:[A-Za-z]){2}(|-)([0-9]){1,4})|(([A-Za-z]){2,3}(|-)([0-9]){1,4})/i;

export const columns = [
    {
        title: 'Name',
        dataIndex: 'company',
        key: 'company'
    },
    {
        title: 'Status',
        dataIndex: 'statusName',
        key: 'statusName'
    },
    {
        title: 'Branch',
        dataIndex: 'branchEmirateName',
        key: 'branchEmirateName'
    },
    {
        title: 'Total',
        dataIndex: 'totalAmount',
        key: 'totalAmount'
    }
];
export const itemsColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit'
    },
    {
        title: 'Price',
        dataIndex: 'purchaseRate',
        key: 'purchaseRate'
    }
];

/**predefined user roles */
export const USER_ROLES = {
    OWNER: { name: 'owner'},
    BUYER: { name: 'buyer'},
    SELLER: { name: 'seller'},
    RETAILER: { name: 'buyer'},
    DSP: { name: 'sales_person'},
    DISTRIBUTOR: { name: 'seller'}
};

/**Type of notification messages */
export const NOTIFICATION_TYPE = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info',
    DO_NOT_REFRESH: 'do not refresh'
};

export const ORDER_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SUBMITTED: 'submitted',
    COMPLETED: 'completed',
    CANCELLED: 'canceled',
    FAILED: 'failed'
};

/**Api error messages */
export const ERROR_MESSAGE = {
    ERROR: 'Error',
    NETWORK_ERROR: 'Network error.',
    UNAUTHORIZED_ERROR: 'You are unauthorized, please login again.',
    RESPOND_SLOW_ERROR: 'Server is responding slow, please check your net connection.',
    SOMETHING_WRONG_ERROR: 'Some thing went wrong, please try again later.'
};

/** Type of addresses */
export const ADDRESS_TYPE = [
    {
        label: 'Billing',
        value: 'billing',
        id: 1
    },
    {
        label: 'Shipping',
        value: 'shipping',
        id: 2
    }
];

/**Country list for address */
export const COUNTRY_LIST = [
    {
        label: 'India',
        value: 103
    }
];

/**user type for getting users list via api*/
export const USER_TYPE = {
    RETAILER: 1,
    DSP: 2
};

export const COUNTRY_CODE = {
    INDIA: '91'
};

/**initial data of pagination */
export const paginationMeta = {
    pagination: {
        total: 0,
        count: 0,
        per_page: 1,
        current_page: 1,
        total_pages: 1
    }
};

/**status */
export const USER_STATUS = {
    ACTIVE: 1,
    DEACTIVE: 0
};

//Off-field
export const OFF_FIELD_OPTIONS = [
    { name: "Holiday", value: "HOLIDAY" },
    { name: "Half Day Leave", value: "HALF_DAY_LEAVE" },
    { name: "Full Day Leave", value: "FULL_DAY_LEAVE" },
    { name: "HO", value: "HO" }
];

export const PLAN_FILTER_OPTIONS = [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Completed", value: "Completed" },
    { label: "Off-Field", value: "Off-Field" },
]
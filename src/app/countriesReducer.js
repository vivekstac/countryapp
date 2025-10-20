import { COUNTRY_DETAILS, COUNTRY_DETAILS_REQUESTING, COUNTRY_DETAILS_UNKNOWN, REGION_LISTS } from "./actionType";

const initialState = {
    countriesData: [],
    isRequesting: false,
    error: null,
    regionLists: []
};

export default function countriesReducer(state = initialState, action) {
    switch (action.type) {
        case COUNTRY_DETAILS_REQUESTING:
            return {
                ...state,
                isRequesting: true,
                error: null,
            };

        case COUNTRY_DETAILS:
            return {
                ...state,
                isRequesting: false,
                countriesData: action.payload,
            };

        case COUNTRY_DETAILS_UNKNOWN:
            return {
                ...state,
                isRequesting: false,
                error: action.error.message,
            };
        case REGION_LISTS:
            return {
                ...state,
                regionLists: action.payload
            }

        default:
            return state;
    }
}

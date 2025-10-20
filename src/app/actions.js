import { fetchData } from '../utils/fetchData';
import { COUNTRY_DETAILS, COUNTRY_DETAILS_REQUESTING, COUNTRY_DETAILS_UNKNOWN, REGION_LISTS } from './actionType';

export const fetchCountries = (url) => async (dispatch) => {
    dispatch({ type: COUNTRY_DETAILS_REQUESTING });

    try {
        const data = await fetchData(url);
        const uniqueRegions = [...new Set(data.map((country) => country.region).filter(Boolean))];
        if (!data) throw new Error('No data found');
        dispatch({ type: COUNTRY_DETAILS, payload: data });
        dispatch({ type: REGION_LISTS, payload: uniqueRegions })
    } catch (error) {
        dispatch({ type: COUNTRY_DETAILS_UNKNOWN, payload: error.message });
    }
};

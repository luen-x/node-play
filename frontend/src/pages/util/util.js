export * from '@lawrence666/le-util';
import { RegEx } from '@lawrence666/le-util';
import dayjs from 'dayjs';

RegEx.set({
	telOrMobile: {
		// eslint-disable-next-line max-len
		value: /(^([0][0-9]{2,3}-?)?[2-8]{1}[0-9]{6,7}$)|(^(13[0-9]|14[5|7]|15[^4|^\D]|17[0-9]|19[1|8|9]|16[5-7]|18[0-9])\d{8}$)|(^[48][0-9]{2,3}-?[0-9]{3,4}-?[0-9]{2,4}$)/,
		msg: "请填写正确的电话号码"
	},

});

export const filterQuery = (query) => {
	query = { ...query };
	Object.keys(query).forEach(key => {
		const value = query[key];
		if (value === null || value === false || value === undefined || value === '') {
			delete query[key];
		}
	});
	return query;
};
export const setData = (to, from) => {
	Object.keys(to).forEach(key => {
		from[key] !== undefined && ( to[key] = from[key]);
		
	});
};
export const formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
	return (time && dayjs(time).format(format)) || '';
};


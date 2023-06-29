import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	if (
		param === 'horizontal.svg'
		|| param === 'vertical.svg'
		|| param === 'horizontal'
		|| param === 'vertical'
	) return true;
	else return false;
}) satisfies ParamMatcher;

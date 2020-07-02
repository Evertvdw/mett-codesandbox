export function createQueryStringFromObject(feed: any) {
	let queryString = "";

	if (feed) {
		queryString = "?";

		for (const currentKey in feed) {
			if (feed[currentKey]) {
				if (queryString != "?") queryString += "&";

				queryString += currentKey + "=" + feed[currentKey].toString();
			}
		}
	}

	return queryString;
}

export function safeStringify(obj: unknown, indent = 2) {
	const cache: any[] = [];
	const retVal = JSON.stringify(
		obj,
		(key, value) =>
			typeof value === "object" && value !== null
				? cache.includes(value)
					? undefined // Duplicate reference found, discard key
					: cache.push(value) && value // Store value in our collection
				: value,
		indent
	);
	return retVal;
}

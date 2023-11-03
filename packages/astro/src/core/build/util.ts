export function getTimeStat(timeStart: number, timeEnd: number) {
	const buildTime = timeEnd - timeStart;
	return buildTime < 750 ? `${Math.round(buildTime)}ms` : `${(buildTime / 1000).toFixed(2)}s`;
}

export function encodeName(name: string): string {
	// Detect if the chunk name has as % sign that is not encoded.
	// This is borrowed from Node core: https://github.com/nodejs/node/blob/3838b579e44bf0c2db43171c3ce0da51eb6b05d5/lib/internal/url.js#L1382-L1391
	// We do this because you cannot import a module with this character in it.
	for(let i = 0; i < name.length; i++) {
		if(name[i] === '%') {
			const third = name.codePointAt(i + 2)! | 0x20;
			if (name[i + 1] !== '2' || third !== 102) {
				return `${name.replace(/%/g, '_percent_')}`;
			}
		}
	}

	return name;
}

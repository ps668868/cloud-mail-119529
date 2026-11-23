const encoder = new TextEncoder();
const codeKeyUtils = {
	async genCodeKey(env, email) {
		const data = encoder.encode((env.JWT_SECRET || '') + ':' + email.toLowerCase());
		const hashBuffer = await crypto.subtle.digest('SHA-256', data);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
		return hex.slice(0, 32);
	},
	async verifyCodeKey(env, email, key) {
		if (!key || typeof key !== 'string') {
			return false;
		}
		const expect = await codeKeyUtils.genCodeKey(env, email);
		return key.length === expect.length && key.toLowerCase() === expect;
	}
};
export default codeKeyUtils;

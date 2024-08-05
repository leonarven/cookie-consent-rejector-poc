const env = {};

Object.defineProperties( env, {
  CLAUDE_API_KEY: {
    get: () => {
        let { CLAUDE_API_KEY } = process.env;

        if (!CLAUDE_API_KEY) {
            throw new Error('CLAUDE_API_KEY is not set');
        }
        return CLAUDE_API_KEY;
    }
  }
});

export default env as { CLAUDE_API_KEY: string };
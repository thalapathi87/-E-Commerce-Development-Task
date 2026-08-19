process.on('uncaughtException', (err) => {
    console.error('Vercel entrypoint uncaughtException:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Vercel entrypoint unhandledRejection:', err);
});

try {
    const app = require("../server");
    module.exports = app;
} catch (error) {
    console.error('Failed to load backend app:', error);
    throw error;
}
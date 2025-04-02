const run = async () => {
    console.log("Hello, world!");
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});

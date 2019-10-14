console.log("What is your name.");
process.stdin.on('readable', function () {
name = process.stdin.read();
    if (name !== null) {
        console.log(`Hello ${name}`);
        console.log("Hello " + name);
        // used to exit from the code
        process.exit();
    }
});

console.log("something else happens while waiting for the name to be entered, due to callback function, hence not slowing down the process");

setTimeout(function () {
    console.log("Hello after 3 seconds");
    }, 3000);


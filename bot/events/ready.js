exports.run = async (Client) => { // on event run, take the client we passed in earlier and use it
    const fetch = require("node-fetch")
    Client.user.setActivity("I'm Alive!") // on ready, it will change the bots status to "I'm Alive!"
    await fetch("https://ajnicoloff.me/code/stationlist/index.json")
        .then(res => res.json())
        .then(json => {
            Client.music.stations = json.map(stream => [stream.name, stream.url, stream.statspos, stream.genre, stream.website, stream.donate, stream.description, stream.outdated])
        })
}
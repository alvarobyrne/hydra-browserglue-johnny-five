await import("https://unpkg.com/browserglue")
// console.log(browserglue)

// hush()
//const { Client, Message } = browserglue;

window.bg = new browserglue.Client();

// Subscribe to all server events
// bg.on('connect', (() => console.log("[connect]")));
// bg.on('disconnect', (() => console.log("[disconnect]")));

// await bg.removeAllChannels();

channel = await bg.addChannel("/foo", 4000);

pot=0
norm = 1/1024;
channel.on('message', async msg => {
  console.log('msg: ', msg.args[0]);
  pot = msg.args[0]*norm;
  
});

//channel.remove()

osc(()=>1+pot*200).out()


const { MessageChannel, MessagePort } = require("worker_threads");
const { TextEncoder, TextDecoder } = require("util");

global.MessageChannel = MessageChannel;
global.MessagePort = MessagePort;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

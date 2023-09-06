const congig = {
    vk: {
        maxSymbols: 4096,
        standardDisplay: {
            maxKeys: 40,
            maxMessageLength: Infinity,
            allowKeysLink: 40
        },
        inlineDisplay: {
            maxKeys: 10,
            maxMessageLength: Infinity,
            allowKeysLink: 10
        }
   },
   
   whatsapp: {
        maxSymbols: 1000,
        standardDisplay: {
            maxKeys: 10,
            maxMessageLength: 20,
            allowKeysLink: 0
        },
        inlineDisplay: {
            maxKeys: 3,
            maxMessageLength: 20,
            allowKeysLink: 1
        }
   },

   telegram: {
        maxSymbols: 4096,
        standardDisplay: {
            maxKeys: Infinity,
            maxMessageLength: Infinity,
            allowKeysLink: 0
        },
        inlineDisplay: {
            maxKeys: Infinity,
            maxMessageLength: 64,
            allowKeysLink: Infinity
        }
   },

   sms: {
        maxSymbols: 10,
        standardDisplay: {
            maxKeys: 0,
            maxMessageLength: 0,
            allowKeysLink: 0
        },
        inlineDisplay: {
            maxKeys: 0,
            maxMessageLength: 0,
            allowKeysLink: 0
        }
   }
}

export default congig;
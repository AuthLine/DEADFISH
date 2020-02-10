
// GUI Routes

module.exports = {

    // GUI

    '/ui'      : {

        // GUI Content

        'get|/'                          :  'gui:main',             // Main GUI Loader
        'get|/chart'                     :  'gui:chart',            // Show chart from TradingView 
        'get|/register'                  :  'gui:register',         // Register User
        'get|/login'                     :  'gui:login',            // Login Page
        'get|/content/:key'              :  'gui:content',          // Get Content
        'get|/data/:key'                 :  'gui:data',             // Get Data

    },

}

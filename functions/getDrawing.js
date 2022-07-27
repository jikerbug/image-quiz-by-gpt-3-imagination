
// const url = "https://main-dalle-server-scy6500.endpoint.ainize.ai/generate"
const url = "https://hf.space/embed/multimodalart/latentdiffusion/+/api/predict/"
var request = require('request');

module.exports = async function getDrawing(text) {
    const options = {
        headers: {'content-type' : 'application/json'},
        url:     url,
        body:    JSON.stringify(  {
              "data": [text, 50, '256', '384', 2, 5]
          
            }),
    }
 
    console.log(text);
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          body = JSON.parse(body)
          var base64Data = body["data"][0]
          base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
          resolve(base64Data);
        }
      })
    })
  }
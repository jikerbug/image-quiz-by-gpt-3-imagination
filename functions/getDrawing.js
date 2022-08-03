
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
      request.post(options, async function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          //여기서 제대로 못받았을 경우 봇이 꺼지지 않도록 오류처리 할 수 있어야함 (100번중에 한번정도 발생?(이거 포함 3번정도 봄) 원인불명... 서버쪽 오류?...)
          // 지나치게 긴 입력에 대해서 가끔씩 에러가 니오는 것 같기도 하다 => 아니면 입력 몰렸을때 서버쪽에서 터지는 건가?
          /*/Users/jibaek/markinmars/functions/getDrawing.js:26
          base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
          TypeError: Cannot read properties of null (reading 'replace')
              at Request._callback (/Users/jibaek/markinmars/functions/getDrawing.js:26:35)
              at processTicksAndRejections (node:internal/process/task_queues:96:5)
          (base) jibaek@jibaekui-MacBookPro markinmars % 
          */
          body = JSON.parse(body);
          var base64Data = await body["data"][0];
          base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
          resolve(base64Data);
        }
      })
    })
  }
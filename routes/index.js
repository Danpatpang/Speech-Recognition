var express = require('express');
var request = require('request');
var router = express.Router();

/**
 * .env 파일은 보안 상의 문제로 공개하지 않습니다.
 * package.json이 위치한 디렉터리에 .env 파일을 생성해주세요.
 * .env 파일에 다음과 같이 작성해주세요.
 * CLIENT_ID=발급받은아이디
 * CLIENT_PASSWORD=발급받은비밀번호
 */
require('dotenv').config();
var clientId = process.env.CLIENT_ID;
var clientPassword = process.env.CLIENT_PASSWORD;

/* 메인 페이지 */
router.get('/', function (req, res) {
    res.render('index');
});

/* 번역 처리 */
router.post('/translation', function (req, res) {
    let query = req.body.data;
    const api_url = 'https://openapi.naver.com/v1/language/translate';
    let options = {
        url: api_url,
        form: {'source': 'ko', 'target': 'en', 'text': query},
        headers: {'X-Naver-Client-Id': clientId, 'X-Naver-Client-Secret': clientPassword}
    };

    request.post(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var parseBody = JSON.parse(body);
            var result = parseBody.message.result.translatedText;
            res.json({"result" : result});
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

module.exports = router;

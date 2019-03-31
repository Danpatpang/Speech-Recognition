let speechButton = document.querySelector("#speech");
let stopButton = document.querySelector("#stop");
let message = document.querySelector("#message");

let voiceRecognition = document.querySelector("#voice-recognition");
let voiceTranslation = document.querySelector("#voice-translation");

let isSupportRecognition = false;
let isRecognizing = false;
let result = null;

// 브라우저가 음성 인식을 지원하는지 확인
if ('webkitSpeechRecognition' in window) {
    isSupportRecognition = true;
    message.innerHTML = "음성 인식을 지원하지 않는 브라우저입니다.";
    console.log("음성 인식을 지원하는 브라우저입니다.");
} else {
    message.innerHTML = "음성 인식을 지원하지 않는 브라우저입니다.";
    console.log("음성 인식을 지원하지 않는 브라우저입니다.");
}

// SpeechRecognition 초기 설정
if (isSupportRecognition) {
    let recognition = new window.webkitSpeechRecognition();
    // recognition.lang = 'en-US'; // 영어만 인식
    recognition.lang = `ko-KR`;
    recognition.continuous = false;
    recognition.interimResults = false;     // 중간 결과 반환 여부.
    recognition.maxAlternatives = 5;    // 최대 반환 문장.
}

// 음성 인식 시작
function startSpeechRecognition() {
    recognition.start();
    isRecognizing = true;

    recognition.onstart = () => {
        console.log("인식 시작");
        message.innerHTML = "음성 인식 중입니다!!!";
        voiceRecognition.innerHTML = null;
        speechButton.disabled = true;
        stopButton.disabled = false;
    }

    recognition.onresult = (event) => {
        /**
         * event.results의 모습
         *
         * results: SpeechRecognitionResultList
         * 0: SpeechRecognitionResult
         * 0: SpeechRecognitionAlternative {transcript: "한번 더 실행", confidence: 0.9236595630645752}
         * 1: SpeechRecognitionAlternative {transcript: "한번더 실행", confidence: 0}
         * isFinal: true
         * length: 2
         * __proto__: SpeechRecognitionResult
         * length: 1
         * __proto__: SpeechRecognitionResultList
         */
        result = event.results[0][0].transcript;
        console.log(result);
        voiceRecognition.innerHTML = result;
    }
}

// 음성 인식 종료
function stopRecognition() {
    recognition.stop();
    isRecognizing = false;
    message.innerHTML = "음성 인식 끝!!!";
    speechButton.disabled = false;
}

window.onload = () => {
    speechButton.onclick = startSpeechRecognition;
    stopButton.onclick = stopRecognition;
};
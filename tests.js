document.addEventListener('DOMContentLoaded', () => {
    // Helper Function to Display Results
    function displayTestResult(testName, success, message = '') {
        const resultsDiv = document.getElementById('testResults');
        if (!resultsDiv) {
            console.error('Test results div not found!');
            return;
        }
        const resultP = document.createElement('p');
        resultP.textContent = `${testName}: ${success ? 'PASSED' : 'FAILED'} ${message ? '- ' + message : ''}`;
        resultP.style.color = success ? 'green' : 'red';
        resultsDiv.appendChild(resultP);
    }

    // Simple Assertion Function
    function assertEquals(expected, actual, testName) {
        if (expected === actual) {
            displayTestResult(testName, true);
        } else {
            displayTestResult(testName, false, `Expected "${expected}", but got "${actual}"`);
        }
    }

    // Get references to video and button elements
    const video = document.getElementById('myVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');

    if (!video || !playPauseBtn) {
        displayTestResult('Setup', false, 'Video or Button element not found in test_runner.html');
        return; // Stop tests if elements are not found
    }

    // Test 1: Initial State
    displayTestResult('Test Suite: Initial State', true, 'Running...');
    assertEquals(true, video.paused, 'Test Initial State: Video Paused');
    assertEquals("Play", playPauseBtn.textContent, 'Test Initial State: Button Text "Play"');

    // Test 2: First Click (should trigger play)
    displayTestResult('Test Suite: First Click (Play)', true, 'Running...');
    playPauseBtn.click();
    // The video_player.js script updates the button text synchronously.
    assertEquals("Pause", playPauseBtn.textContent, 'Test First Click: Button Text "Pause"');
    // video.play() is async and its effect on video.paused might not be immediate,
    // especially due to autoplay policies. video_player.js attempts to play,
    // and we trust it calls video.play(). For this test, we check the *intended* state
    // if video_player.js logic is `video.play()`. The actual `video.paused` state
    // might be true if autoplay is prevented by the browser.
    // However, video_player.js will set the button to "Pause" regardless.
    // The instruction for video_player.js was:
    // if (video.paused) { video.play(); playPauseBtn.textContent = 'Pause'; }
    // So, after a click, if it was paused, video.play() is called.
    // We'll check `video.paused`. If it's `false`, great. If `true`, it might be due to autoplay restrictions.
    // The most reliable check here is the button text, which `video_player.js` controls directly.
    // For the `video.paused` state, let's consider what `video_player.js` *would try* to achieve.
    // Given `video_player.js` is:
    // if (video.paused) { video.play(); playPauseBtn.textContent = 'Pause'; }
    // else { video.pause(); playPauseBtn.textContent = 'Play'; }
    // After the first click, `video.play()` is called. The `paused` state *should* become false.
    assertEquals(false, video.paused, 'Test First Click: Video Not Paused (intended state after play())');


    // Test 3: Second Click (should trigger pause)
    displayTestResult('Test Suite: Second Click (Pause)', true, 'Running...');
    playPauseBtn.click();
    // The video_player.js script updates the button text synchronously.
    assertEquals("Play", playPauseBtn.textContent, 'Test Second Click: Button Text "Play"');
    // video.pause() is synchronous.
    assertEquals(true, video.paused, 'Test Second Click: Video Paused');

});

## YouTube Transcript to SRT
Convert **YouTube timedtext API** responses into **SubRip Subtitle (SRT)** format.

### How to Use
1. **Open the Video:** Go to the YouTube video in your browser and open the Network Inspector (usually found in the developer tools).

2. **Enable Subtitles:** Click the CC button on the video to turn on or off subtitles. Watch the Network tab for a request to `timedtext?v=`.

3. **Copy the Response:** Locate the request to `timedtext?v=` and copy its response.

4. **Open the Tool:** Open [index.html](https://kulotsystems.github.io/yt-srt/) in your web browser.

5. **Paste the Response:** Paste the copied timedtext API response into the input box on the left.

6. **Save the Output:** Copy the converted SRT output from the tool and paste it into your preferred text editor. Save the file with a **.srt** extension.
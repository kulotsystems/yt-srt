/***
 * ytSrt INSTANCE
 */
var ytSrt = null;
document.addEventListener('DOMContentLoaded',function() { const ytSrtApp = Vue.createApp({
    /*** NAME */
    name: 'ytSrt',

    /*** DATA */
    data() {
        return {
            input: {
                text: '',
                obj : {}
            },
            output: {
                arr : [],
                text: ''
            },
            error: {
                message: ''
            },
            copying: false
        }
    },

    /*** COMPUTED */
    computed: {
        /**
         * Computed has error or not.
         * @returns boolean
         */
        hasError() {
            return this.error.message !== '';
        }
    },

    /*** METHODS */
    methods: {
        /**
         * @method processTimedText
         * @description Process the input timedtext response to get the output.
         */
        processTimedText() {
            if(this.input.text === '')
                this.error.message = '';
            else {
                let obj = null;
                try {
                    obj = JSON.parse(this.input.text);
                }
                catch(e) {
                    this.error.message = e.message;
                }
                if(obj != null) {
                    this.input.obj   = obj;
                    this.output.arr  = [];
                    this.output.text = '';
                    if(this.input.obj.hasOwnProperty('events')) {
                        const totalEvents = this.input.obj.events.length;
                        for(let i = 0; i < totalEvents; i++) {
                            const event = this.input.obj.events[i];

                            // get event time
                            const msStart = event?.tStartMs ?? 0;
                            const msDuration = event?.dDurationMs ?? 0;
                            const msEnd = msStart + msDuration;
                            const start = this.getSrtTime(msStart);
                            const end = this.getSrtTime(msEnd);

                            // get event lines
                            const arrLines = [];
                            if(event.hasOwnProperty('segs')) {
                                let line = '';
                                for(let j = 0; j < event.segs.length; j++) {
                                    const seg = event.segs[j];
                                    if(seg.hasOwnProperty('utf8'))
                                        line += seg.utf8;
                                }
                                if(line !== '' && line.replaceAll('\n', '') !== '')
                                    arrLines.push(line);
                            }
                            if(arrLines.length > 0) {
                                const strLines = arrLines.join("\n");

                                // push output
                                this.output.arr.push({
                                    time: { start, end },
                                    line: strLines
                                });
                                this.output.text += `${i+1}\n${start} --> ${end}\n${strLines}${i < (totalEvents - 1) ? '\n\n' : ''}`;
                            }
                        }
                    }
                }
            }
        },

        /**
         * @method getSrtTime
         * @description Format given number of milliseconds to hh:mm:ss,ms.
         * @param {number} ms
         * @returns {string}
         */
        getSrtTime(ms) {
            const hours        = Math.floor(ms / 3600000);
            const minutes      = Math.floor((ms % 3600000) / 60000);
            const seconds      = Math.floor((ms % 60000) / 1000);
            const milliseconds = ms % 1000;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds.toString().padStart(3, '0')}`;
        },

        /**
         * @method copyOutput
         * @description Copy the output to clipboard.
         */
        copyOutput() {
            this.copying = true;
            const txtResult = this.$refs['txt-result'];
            txtResult.select();
            document.execCommand('copy');
            setTimeout(() => {
                txtResult.setSelectionRange(0, 0);
                txtResult.blur();
                this.copying = false
            }, 100);
        }
    },

    /*** CREATED */
    created() {

    },

    /*** MOUNTED */
    mounted() {
        this.$nextTick(() => {

        });
    }
});
try { if(!document.querySelector('#yt-srt')?.__vue__) ytSrt = ytSrtApp.mount('#yt-srt'); } catch(e) { console.log('Unable to mount ytSrt: ', e) } });
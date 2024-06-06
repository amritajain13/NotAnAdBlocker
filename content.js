chrome.storage.sync.get('isEnabled', (data) => {
    if (data.isEnabled) {
        const MAX_PLAYBACK_RATE = 16;
        let originalMuted = false;
        let originalPlaybackRate = 1;

        function handleAdSpeed(video) {
            const observerCallback = (mutations) => {
                const skipAd = () => {
                    //logic for finding and clicking skip button
                    const skipContainers = [
                        ".ytp-ad-skip-button-container .ytp-ad-skip-button-modern",
                        ".ytp-skip-ad .ytp-skip-ad-button"
                    ];
                    skipContainers.forEach(selector => {
                        const skipButton = document.querySelector(selector);
                        if (skipButton) {
                            skipButton.click();
                        }
                    });
                };

                // The MutationObserver is a JavaScript API that provides a way to watch for changes being made to the DOM tree.
                // It is designed to react to DOM mutations (such as when nodes are added, removed, or changed) and allows you to execute
                // callback functions when such changes occur. This is particularly useful for monitoring dynamic content changes in a web page.

                
                
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === "style") {
                        skipAd();
                    }
                });
                
                if (video.playbackRate !== MAX_PLAYBACK_RATE) {
                    originalMuted = video.muted;  
                    originalPlaybackRate = video.playbackRate;
                }
                
                //it detect is there ad or not on load
                const isAd = moviePlayer.classList.contains("ad-showing") || moviePlayer.classList.contains("ad-interrupting");
                //it make noise when a ad is playing at 16x speed so...... muting is a good optin
                video.muted = isAd ? true : originalMuted;   
                video.playbackRate = isAd ? MAX_PLAYBACK_RATE : originalPlaybackRate;
            };
            
            
            //for the capability to skip ad in between videos, but it consume so much resource but not that much hehe
            const moviePlayer = document.querySelector("#movie_player");
            new MutationObserver(observerCallback).observe(moviePlayer, {
                attributeFilter: ["class", "style"],
                attributes: true,
                subtree: true,
            });
        }

        function init() {
            const video = document.querySelector("#movie_player video");
            if (video) {
                handleAdSpeed(video);
            } else {
                setTimeout(init, 300);
            }
        }

        init();
    }
});

chrome.storage.sync.get(
	['axes', 'buttons', 'disableCloudGamepad'],
	function (settings) {
		window.addEventListener('DOMContentLoaded', (event) => {
			console.log('YO');
			if (settings.disableCloudGamepad) return;

			const injScript = document.createElement('script');
			injScript.src = chrome.runtime.getURL('cloudgamepad.js');
			injScript.onload = function () {
				window.dispatchEvent(
					new CustomEvent('startConfig', {detail: settings}),
				);
				console.log(settings);
			};

			const container =
				document.body || document.head || document.documentElement;
			container.appendChild(injScript);
		});
	},
);

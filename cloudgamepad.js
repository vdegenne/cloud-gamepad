function main() {
	let config = null;
	// window.addEventListener(
	// 	'startConfig',
	// 	function (e) {
	// 		config = e.detail;
	// 		setupCloudGamepad();
	// 	},
	// 	false,
	// );
	const setupCloudGamepad = function () {
		console.log('CloudGamepad: Injected!');
		console.log(config);
		const buttonCount = 17;
		const axisCount = 4;

		// const emulatedGamepad = {
		// 	id: 'CloudGamepad emulated gamepad',
		// 	index: 0,
		// 	connected: true,
		// 	timestamp: 0,
		// 	mapping: 'standard',
		// 	axes: [0, 0, 0, 0],
		// 	buttons: Array.from({length: buttonCount}, () => ({
		// 		pressed: false,
		// 		touched: false,
		// 		value: 0,
		// 	})),
		// };
		// console.log(emulatedGamepad);
		//
		// let indicesFound = false;
		// const findGamepadIndices = function (originalGamepads) {
		// 	for (let i = 0; i < buttonCount; i++) {
		// 		if (typeof config.buttons[i].dstID !== 'undefined') {
		// 			for (
		// 				let gamepadIndex = 0;
		// 				gamepadIndex < originalGamepads.length;
		// 				gamepadIndex++
		// 			) {
		// 				if (
		// 					originalGamepads[gamepadIndex] !== null &&
		// 					originalGamepads[gamepadIndex].id === config.buttons[i].dstID
		// 				) {
		// 					config.buttons[i].gamepadIndex = gamepadIndex;
		// 					break;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	for (let i = 0; i < axisCount; i++) {
		// 		if (typeof config.axes[i].dstID !== 'undefined') {
		// 			for (
		// 				let gamepadIndex = 0;
		// 				gamepadIndex < originalGamepads.length;
		// 				gamepadIndex++
		// 			) {
		// 				if (
		// 					originalGamepads[gamepadIndex] !== null &&
		// 					originalGamepads[gamepadIndex].id === config.axes[i].dstID
		// 				) {
		// 					config.axes[i].gamepadIndex = gamepadIndex;
		// 					break;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	console.log('CloudGamepad: Gamepad indicies found!');
		// 	indicesFound = true;
		// };

		const originalGetGamepads = navigator.getGamepads;

		Object.defineProperty(navigator, 'getGamepads', {
			get() {
				return function () {
					const gamepads = originalGetGamepads.apply(navigator);
					if (gamepads[0] && !gamepads[0]._patched) {
						const originalButtons = gamepads[0].buttons;

						Object.defineProperty(gamepads[0], 'buttons', {
							get() {
								// Inverse A (0) et B (1)
								const swappedButtons = [...originalButtons];
								[swappedButtons[0], swappedButtons[1]] = [
									swappedButtons[1],
									swappedButtons[0],
								];
								return swappedButtons;
							},
						});

						gamepads[0]._patched = true; // Empêche de redéfinir plusieurs fois
					}
					return gamepads;
				};
			},
		});

		// let modifiedGamepad;
		//
		// if (gamepads[0]) {
		// 	modifiedGamepad = {
		// 		...gamepads[0], // Clone l'objet
		// 		buttons: gamepads[0].buttons.map((btn, index) => {
		// 			if (index === 0) return {...gamepads[0].buttons[1]}; // Remplace A par B
		// 			if (index === 1) return {...gamepads[0].buttons[0]}; // Remplace B par A
		// 			return btn; // Garde les autres boutons inchangés
		// 		}),
		// 	};
		// }
		// console.log(modifiedGamepad);
		// return [modifiedGamepad, gamepads[1], gamepads[2], gamepads[3]];
	};
	/*navigator.getGamepads = function () {
			// The magic happens here
			if (typeof config.buttons !== 'undefined') {
				const originalGamepads = originalGetGamepads.apply(navigator);
				if (!indicesFound) {
					const gamepadFound = Array.from(originalGamepads).some(
						(gamepad) => gamepad !== null,
					);
					if (gamepadFound) findGamepadIndices(originalGamepads);
				}

				for (let i = 0; i < buttonCount; i++) {
					if (
						typeof config.buttons[i] === 'undefined' ||
						typeof config.buttons[i].gamepadIndex === 'undefined'
					)
						continue;
					const selectedConfigButton = config.buttons[i];
					const gamepadIndex = selectedConfigButton.gamepadIndex;
					const dstIndex = selectedConfigButton.dstIndex;
					if (selectedConfigButton.dstType) {
						//Axis
						const button = emulatedGamepad.buttons[i];
						button.pressed = button.touched =
							originalGamepads[gamepadIndex].axes[dstIndex] +
								selectedConfigButton.offset !==
							0;
						button.value = Math.min(
							Math.max(
								originalGamepads[gamepadIndex].axes[dstIndex] *
									selectedConfigButton.scale +
									selectedConfigButton.offset,
								-1,
							),
							1,
						);
					} else {
						//Button
						emulatedGamepad.buttons[i] =
							originalGamepads[gamepadIndex].buttons[dstIndex];
					}
					emulatedGamepad.timestamp = originalGamepads[gamepadIndex].timestamp;
				}
				for (let i = 0; i < axisCount; i++) {
					if (
						typeof config.axes[i] === 'undefined' ||
						typeof config.axes[i].gamepadIndex === 'undefined'
					)
						continue;
					const selectedConfigAxis = config.axes[i];
					const gamepadIndex = selectedConfigAxis.gamepadIndex;
					emulatedGamepad.axes[i] = Math.min(
						Math.max(
							originalGamepads[gamepadIndex].axes[selectedConfigAxis.dstIndex] *
								selectedConfigAxis.scale +
								selectedConfigAxis.offset,
							-1,
						),
						1,
					);
					emulatedGamepad.timestamp = originalGamepads[gamepadIndex].timestamp;
				}
			}
			return [emulatedGamepad, null, null, null];
		}; */
	setupCloudGamepad();
}
main();

const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		KVM_Active_Input: {
			name: 'Active KVM Input',
			type: 'boolean',
			label: 'Active KVM Input',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'input',
					type: 'number',
					label: 'Input',
					default: 1,
					min: 1,
					max: 8
				}
			],
			callback: async (feedback, context) => {
				// Note: make sure to use `parseVariablesInString` from `context`. That lets Companion know what feedback the call was for
				const input = await context.parseVariablesInString(feedback.options.input)

				console.log("Testing KVM Input");

				let status = fetch(`http://${self.config.host}/cgi-bin/status.json`).then(
					(result) =>
					{
						console.log(result);

						try {
							resultData = JSON.parse(result)
						} catch (error) {
							console.log(error);
							return false
						}

						return true
					},
					() => {
						return false
					});
			}
		},
		SPK_Active_Input: {
			name: 'Active SPK Input',
			type: 'boolean',
			label: 'Active SPK Input',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'input',
					type: 'number',
					label: 'Input',
					default: 1,
					min: 1,
					max: 8
				}
			],
			callback: async (feedback, context) => {
				// Note: make sure to use `parseVariablesInString` from `context`. That lets Companion know what feedback the call was for
				const input = await context.parseVariablesInString(feedback.options.input)

				console.log("Testing SPK Input");

				let status = fetch(`http://${self.config.host}/cgi-bin/status.json`).then(
					(result) =>
					{
						console.log(result);

						try {
							resultData = JSON.parse(result)
						} catch (error) {
							console.log(error);
							return false
						}

						return true
					},
					() => {
						return false
					});
			}
		},
		USB1_Active_Input: {
			name: 'Active USB1 Input',
			type: 'boolean',
			label: 'Active USB1 Input',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'input',
					type: 'number',
					label: 'Input',
					default: 1,
					min: 1,
					max: 8
				}
			],
			callback: async (feedback, context) => {
				// Note: make sure to use `parseVariablesInString` from `context`. That lets Companion know what feedback the call was for
				const input = await context.parseVariablesInString(feedback.options.input)

				console.log("Testing USB1 Input");

				let status = fetch(`http://${self.config.host}/cgi-bin/status.json`).then(
					(result) =>
					{
						console.log(result);

						try {
							resultData = JSON.parse(result)
						} catch (error) {
							console.log(error);
							return false
						}

						return true
					},
					() => {
						return false
					});
			}
		},
		USB2_Active_Input: {
			name: 'Active USB2 Input',
			type: 'boolean',
			label: 'Active USB2 Input',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'input',
					type: 'number',
					label: 'Input',
					default: 1,
					min: 1,
					max: 8
				}
			],
			callback: async (feedback, context) => {
				// Note: make sure to use `parseVariablesInString` from `context`. That lets Companion know what feedback the call was for
				const input = await context.parseVariablesInString(feedback.options.input)

				console.log("Testing USB2 Input");

				let status = fetch(`http://${self.config.host}/cgi-bin/status.json`).then(
					(result) =>
					{
						console.log(result);

						try {
							resultData = JSON.parse(result)
						} catch (error) {
							console.log(error);
							return false
						}

						return true
					},
					() => {
						return false
					});
			}
		}
	})
}

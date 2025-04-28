const { combineRgb } = require('@companion-module/base')

// Json response example: [{"psu1":"Inactive"},{"psu2":"Active"},{"temp":"30"},{"km":"3"},{"spk":"1"},{"usb1":"1"},{"usb2":"1"}]

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
				const input = await context.parseVariablesInString(feedback.options.input);
				let status = (self.config.status["km"] == input);
				return status;
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
				let status = (self.config.status["spk"] == input);
				return status;
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
				let status = (self.config.status["usb1"] == input);
				return status;
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
				let status = (self.config.status["usb2"] == input);
				return status;
			}
		}
	})
}

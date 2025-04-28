module.exports = function (self) {
	self.setActionDefinitions({
		select_kvm: {
			name: 'Update KM Input',
			description: 'Change the active input of the Keyboard and Mouse module',
			options: [
				{
					id: 'actionExplanation',
					type: 'static-text',
					value: `<p>Select which input to change the KVM to`
				},
				{
					id: 'kvm',
					type: 'number',
					label: 'Input (KVM)',
					default: 1,
					min: 1,
					max: 8,
				},
			],
			callback: async (event) => {
				// send http command to swap to input
				return fetch(`http://${self.config.host}/cgi-bin/channel?km=${event.options.kvm}`).then(() => {
					self.config.status["km"] = event.options.kvm;
					self.checkFeedbacks('KVM_Active_Input')
				}, () => {
					console.log("Update failed");
				})
			}
		},
		select_spk: {
			name: 'Update SPK Input',
			description: 'Change the active input of the Speaker module',
			options: [
				{
					id: 'actionExplanation',
					type: 'static-text',
					value: `<p>Select which input to change the SPK to`
				},
				{
					id: 'spk',
					type: 'number',
					label: 'Input (SPK)',
					default: 1,
					min: 1,
					max: 8,
				},
			],
			callback: async (event) => {
				// send http command to swap to input
				return fetch(`http://${self.config.host}/cgi-bin/channel?spk=${event.options.spk}`).then(() => {
					self.checkFeedbacks('SPK_Active_Input')
				}, () => {
					console.log("Update failed");
				})
			}
		},
		select_usb1: {
			name: 'Update USB1 Input',
			description: 'Change the active input of the USB1 module',
			options: [
				{
					id: 'actionExplanation',
					type: 'static-text',
					value: `<p>Select which input to change the USB1 to`
				},
				{
					id: 'usb1',
					type: 'number',
					label: 'Input (USB1)',
					default: 1,
					min: 1,
					max: 8,
				},
			],
			callback: async (event) => {
				// send http command to swap to input
				return fetch(`http://${self.config.host}/cgi-bin/channel?usb1=${event.options.usb1}`).then(() => {
					self.checkFeedbacks('USB1_Active_Input')
				}, () => {
					console.log("Update failed");
				})
			}
		},
		select_usb2: {
			name: 'Update USB2 Input',
			description: 'Change the active input of the USB2 module',
			options: [
				{
					id: 'actionExplanation',
					type: 'static-text',
					value: `<p>Select which input to change the USB2 to`
				},
				{
					id: 'usb2',
					type: 'number',
					label: 'Input (USB2)',
					default: 1,
					min: 1,
					max: 8,
				},
			],
			callback: async (event) => {
				// send http command to swap to input
				return fetch(`http://${self.config.host}/cgi-bin/channel?usb2=${event.options.usb2}`).then(() => {
					self.checkFeedbacks('USB2_Active_Input')
				}, () => {
					console.log("Update failed");
				})
			}
		},
		select_all: {
			name: 'Update All Inputs',
			description: 'Change the active input of the eacg module',
			options: [
				{
					id: 'actionExplanation',
					type: 'static-text',
					value: `<p>Select which input to change the inputs to.</p><p>Leave as zero (0) to ignore this input.</p>`
				},
				{
					id: 'kvm',
					type: 'number',
					label: 'Input (KVM)',
					default: 0,
					min: 0,
					max: 8,
				},
				{
					id: 'spk',
					type: 'number',
					label: 'Input (SPK)',
					default: 0,
					min: 0,
					max: 8,
				},
				{
					id: 'usb1',
					type: 'number',
					label: 'Input (USB1)',
					default: 0,
					min: 0,
					max: 8,
				},
				{
					id: 'usb2',
					type: 'number',
					label: 'Input (USB1)',
					default: 0,
					min: 0,
					max: 8,
				},
			],
			callback: async (event) => {
				// send http command to swap to input
				let queries = "?";

				if (event.options.kvm !== 0)
				{
					queries += `kvm=${event.options.kvm}&`;
				}

				if (event.options.spk !== 0)
				{
					queries += `spk=${event.options.spk}&`;
				}

				if (event.options.usb1 !== 0)
				{
					queries += `usb1=${event.options.usb1}&`;
				}

				if (event.options.usb2 !== 0)
				{
					queries += `usb2=${event.options.usb2}&`;
				}

				queries = queries.slice(0, -1);

				if (queries === ""){
					return
				}

				return fetch(`http://${self.config.host}/cgi-bin/channel${queries}`).then(() => {
					// Call to update feedbacks
				}, () => {
					console.log("Update failed");
				})
			}
		}
	})
}

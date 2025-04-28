const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const { refreshState } = require('./state.js')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		config.status = [];
		this.config = config;

  		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

		if(this.config.poll){this.startPolling()}
	}

	// When module gets deleted
	async destroy() {
		await this.stopPolling();
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config

		//start/stop polling
		if(!this.config.poll){
			this.stopPolling();
		}else{
			this.startPolling();
		}
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'number',
				id: 'pollInterval',
				tooltip: "Refresh feedbacks for each buttons selected channel (in seconds)",
				label: "Input Poll Interval",
				width: 4,
				default: 0
			},
			{
				type: 'checkbox',
				id: 'poll',
				label: 'Poll',
				tooltip: "Enable input polling. Allows for keeping input feedback updated.",
				width: 2,
				default: false
			}
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
	
	async startPolling() {
		//Don't start polling if already polling
		if (this.pollData) {
			// If already running, check if interval needs updating
			if (this.config.pollInterval !== this.currentPollInterval) {
				clearInterval(this.pollData);
			} else {
				return;
			}
		}

		//Only poll if inteval is above 0 and checkbox
		if (this.config.pollInterval && this.config.poll) {
			this.currentPollInterval = this.config.pollInterval; // Store the current interval
			this.pollData = setInterval(() => {
				refreshState(this);
			}, this.config.pollInterval * 1000);
		}
	}

	async stopPolling() {
		if (this.pollData) {
			clearInterval(this.pollData);
			this.pollData = null;

			this.config.status = [];
			this.saveConfig(config);
			
			setTimeout(function() {
				self.checkFeedbacks('KVM_Active_Input', 'SPK_Active_Input', 'USB1_Active_Input', 'USB2_Active_Input');
			  }, 1000);
		}
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)

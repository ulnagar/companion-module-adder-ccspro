async function refreshState(self){
    // Json response example: [{"psu1":"Inactive"},{"psu2":"Active"},{"temp":"30"},{"km":"3"},{"spk":"1"},{"usb1":"1"},{"usb2":"1"}]
    let status = (await fetch(`http://${self.config.host}/status.json`)).text().then(
        (result) =>
        {
            try {
                resultData = JSON.parse(result);

                for (const [index, item] of Object.entries(resultData)) {
                    Object.keys(item).forEach(key => {
                        self.config.status[key] = item[key];
                    });
                }

                self.config.status.auto = true;
            } catch (error) {
                console.log("Error!!!!");
                console.log(error);
                return
            }
        },
        () => {
            self.config.status = null;
            return
        });

    self.checkFeedbacks('KVM_Active_Input', 'SPK_Active_Input', 'USB1_Active_Input', 'USB2_Active_Input');
}

module.exports = { refreshState }
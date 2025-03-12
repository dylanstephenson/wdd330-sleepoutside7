export default class Alert {
    constructor() {
        this.path = "../json/alerts.json/";
    }
    getAlertData() {
        const res = fetch(this.path)
        if (res.ok) {
            return res.json()
        } else {
            throw new Error("Bad Response");
          }
    }
    async createAlert() {
        const main = document.querySelector("main");
        const data = await this.getAlertData();
        if (!data.trim()){
            console.log("json file is empty");
        } else {
            const alertSection = `<section class="alert-list"></section>`;
            data.forEach(alert => {
                let newAlert = `<p>${alert.message}<p>`
                alertSection.appendChild(newAlert);
            })
            alertSection.style.backgroundColor = data.background;
            alertSection.style.border = data.border;
            alertSection.style.color = data.color;
            main.appendChild(alertSection);
        }
    }
}
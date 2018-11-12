// Common class for a game stream which handles selecting streams for each of the four boxes on this page.

// Set your common prefix for your stream keys here.
// The shortcut buttons will be for <prefix>-1, <prefix>-2, etc.
const PREFIX = "puwp";

class GameStream {
    constructor(owner, width = 1280, height = 720) {
        this.isVisible = true;
        this.toggleVisiblityButton = document.createElement("button");
        this.width = width;
        this.height = height;
        $(this.toggleVisiblityButton).text("Hide").hide();
        this.buildTable();
        owner.appendChild(this.toggleVisiblityButton);
        owner.appendChild(this.table);
        $(this.streamNameField).val("");
    }

    buildTable() {
        this.table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let row1 = document.createElement("tr");
        let row2 = document.createElement("tr");
        let row3 = document.createElement("tr");
        this.streamEmbed = document.createElement("iframe");
        this.streamEmbed.setAttribute("width", this.width);
        this.streamEmbed.setAttribute("height", this.height);
        this.streamEmbed.setAttribute("frameborder", "0");
        this.streamEmbed.setAttribute("scrolling", "no");
        this.streamNameField = document.createElement("input");
        this.rtmpButton = document.createElement("button");
        $(this.rtmpButton).text("RTMP");
        this.rtmpButton.style.width = "75";
        this.twitchButton = document.createElement("button");
        $(this.twitchButton).text("Twitch");
        this.twitchButton.style.width = "75";
        this.bonDefault1Button = document.createElement("button");
        $(this.bonDefault1Button).text(`${PREFIX}-1`);
        this.bonDefault2Button = document.createElement("button");
        $(this.bonDefault2Button).text(`${PREFIX}-2`);
        this.bonDefault3Button = document.createElement("button");
        $(this.bonDefault3Button).text(`${PREFIX}-3`);
        this.bonDefault4Button = document.createElement("button");
        $(this.bonDefault4Button).text(`${PREFIX}-4`);
        this.clearButton = document.createElement("button");
        $(this.clearButton).text("Clear");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        td1.appendChild(this.streamEmbed);
        td2.appendChild(this.streamNameField);
        td2.appendChild(this.rtmpButton);
        td2.appendChild(this.twitchButton);
        td2.appendChild(this.bonDefault1Button);
        td2.appendChild(this.bonDefault2Button);
        td2.appendChild(this.bonDefault3Button);
        td2.appendChild(this.bonDefault4Button);
        td2.appendChild(this.clearButton);
        row1.appendChild(td1);
        row2.appendChild(td2);
        row3.appendChild(td3);
        tbody.appendChild(row1);
        tbody.appendChild(row2);
        tbody.appendChild(row3);
        this.table.appendChild(tbody);
        this.createEvents();
    }

    createEvents() {
        this.toggleVisiblityButton.onclick = () => {
            if (this.isVisible) {
                $(this.streamEmbed).attr("src", "");
                $(this.toggleVisiblityButton).text("Show");
                $(this.table).hide();
            }
            else {
                $(this.toggleVisiblityButton).text("Hide");
                $(this.table).show();
            }
            this.isVisible = !this.isVisible;
        };

        this.rtmpButton.onclick = () => {
            let streamName = $(this.streamNameField).val();
            this.setStreamSource(this.getRTMPUrl(streamName));
        };

        this.twitchButton.onclick = () => {
            let streamName = $(this.streamNameField).val();
            this.setStreamSource(GameStream.getTwitchUrl(streamName));
        };

        this.bonDefault1Button.onclick = () => {
            $(this.streamNameField).val(`${PREFIX}-1`);
            this.setStreamSource(this.getRTMPUrl(`${PREFIX}-1`));
        };

        this.bonDefault2Button.onclick = () => {
            $(this.streamNameField).val(`${PREFIX}-2`);
            this.setStreamSource(this.getRTMPUrl(`${PREFIX}-2`));
        };

        this.bonDefault3Button.onclick = () => {
            $(this.streamNameField).val(`${PREFIX}-3`);
            this.setStreamSource(this.getRTMPUrl(`${PREFIX}-3`));
        };

        this.bonDefault4Button.onclick = () => {
            $(this.streamNameField).val(`${PREFIX}-4`);
            this.setStreamSource(this.getRTMPUrl(`${PREFIX}-4`));
        };

        this.clearButton.onclick = () => {
            $(this.streamNameField).val("");
            this.setStreamSource("");
        };
    }

    static getTwitchUrl(streamName) {
        return `http://www.twitch.tv/${streamName}/embed`;
    }

    getRTMPUrl(streamName) {
        return `viewer.html?app=runners&stream=${streamName}&width=${this.width}&height=${this.height}`;
    }

    setStreamSource(url) {
        $(this.streamEmbed).attr("src", url);
    };
}

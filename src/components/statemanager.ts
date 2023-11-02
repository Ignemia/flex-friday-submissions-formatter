import $ from "jquery"

export enum COLORS {
    WHITE, BLACK
}

export enum SUBMISSION_TYPE {
    FLEX, FAIL
}

export class StateManager {
    private static __Instance?: StateManager;

    gameLink: string = "";
    playerName: {
        ign: string,
        twitch: string
    } = {
        ign: "",
        twitch: ""
    };
    playerColor: COLORS = COLORS.WHITE;
    submimssionType: SUBMISSION_TYPE = SUBMISSION_TYPE.FLEX;
    playerMessage: string = "";

    private constructor() {
        this.registerListeners();
    }

    private registerListeners() {
        $("#url").on("input", (e)=>{
            this.setGameLink($(e.target).val() as string);
            $(e.target).val(this.gameLink);
        });
        $(".color-select button.btn").on("click", (e)=>{
            $(".color-select button.btn").removeClass("active");
            $(e.target).addClass("active");
            this.setColor($(e.target).text().toLowerCase());
        });
        $("#ign").on("input", (e)=>this.setIGN($(e.target).val() as string));
        $("#twitch").on("input", (e)=>this.setTwitchName($(e.target).val() as string));
        $("#pl-input").on("input", (e)=>this.setPlayerMessage($(e.target).val() as string));
        $("nav button.btn").on("click", (e)=>{
            $("nav button.btn").removeClass("active");
            $(e.target).addClass("active");
            this.setSubmissionType($(e.target).text().toLowerCase());
        });
        $("#submit").on("click", (e)=>{
            const out = this.exportData();
            $("#output").text(out);

            var TempText = document.createElement("textarea");
            TempText.value = out.replace(/\n/gi, "<br />");
            document.body.appendChild(TempText);
            TempText.select();
            
            document.execCommand("copy");
            document.body.removeChild(TempText);
        });
    }

    public setGameLink(newGameLink:string) {
        if (newGameLink.includes(".com/game/live/")) return this.gameLink = newGameLink.substring(newGameLink.lastIndexOf("/")+1);
        if (newGameLink.includes("analysis")) return this.gameLink = newGameLink.substring(newGameLink.lastIndexOf("/")+1, newGameLink.indexOf("?"));
        throw new ReferenceError("Invalid link");
    }

    public setColor(newColor: string) {
        switch (newColor) {
            case "white":
                this.playerColor = COLORS.WHITE;
                break;
            case "black":
                this.playerColor = COLORS.BLACK;
                break;
            default:
                throw new ReferenceError("Invalid color");
        }
    }

    public setTwitchName(newName: string) {
        this.playerName.twitch = newName;
    }
    
    public setIGN(newName: string) {
        this.playerName.ign = newName;
    }

    public setSubmissionType(newType: string) {
        switch (newType) {
            case "flex":
                this.submimssionType = SUBMISSION_TYPE.FLEX;
                break;
            case "fail":
                this.submimssionType = SUBMISSION_TYPE.FAIL;
                break;
            default:
                throw new ReferenceError("Invalid submission type");
        }
    }

    public setPlayerMessage(newMessage: string) {
        this.playerMessage = newMessage;
    }

    public static Get() {
        if (!this.__Instance) this.__Instance = new StateManager();
        return this.__Instance;
    }

    public exportData() {
        let out: string = "";

        out += `**[${this.submimssionType == SUBMISSION_TYPE.FLEX ? 'FLEX' : 'FAIL'}]**\n\n`;
        out += `_I played as ${this.playerColor == COLORS.WHITE ? 'WHITE' : 'BLACK'}_\n\n`;

        for (const paragraph of this.playerMessage.split("\n")) {
            out+=`> ${paragraph}\n`;
        }
        out += "\n";

        if (this.playerName.ign != "") out += `IGN: **${this.playerName.ign}**\n`;
        if (this.playerName.twitch != "") out += `Twitch: **${this.playerName.ign}**\n`;

        out += `\n_Link to game: https://www.chess.com/game/live/${this.gameLink}_`;

        return out;
    }    
}
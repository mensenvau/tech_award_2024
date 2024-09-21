const prompts = require("prompts");

const promptUser = async (text) => {
    const { value } = await prompts({
        type: "text",
        name: "value",
        message: text,
    });
    return value;
};

const selectMethod = async () => {
    const { value } = await prompts({
        type: "select",
        name: "value",
        message: "Select function",
        choices: [
            { title: "Load Channel List", value: "loadChannelList" },
            { title: "Login Client", value: "loginClient" },
            { title: "Log Out Client", value: "logoutClient" },
        ],
        initial: 0,
    });
    return value;
};

let entityToMarkdown = (input) => {
    let text = input.text;
    let result = "";
    let lastIndex = 0;

    const sortedEntities = (input.entities || []).sort((a, b) => a.offset - b.offset);

    sortedEntities.forEach((entity) => {
        const { offset, length, type } = entity;
        let entityText = text.slice(offset, offset + length);

        result += text.slice(lastIndex, offset);

        switch (type._) {
            case "textEntityTypeBold":
                result += "**" + entityText + "**";
                break;
            case "textEntityTypeItalic":
                result += "*" + entityText + "*";
                break;
            case "textEntityTypeUnderline":
                result += "__" + entityText + "__";
                break;
            case "textEntityTypeStrikethrough":
                result += "~~" + entityText + "~~";
                break;
            case "textEntityTypeCode":
                result += "`" + entityText + "`";
                break;
            case "textEntityTypePre":
            case "textEntityTypePreCode":
                result += "```\n" + entityText + "\n```";
                break;
            case "textEntityTypeBlockQuote":
                result += "> " + entityText;
                break;
            case "textEntityTypeTextUrl":
                const url = type.url;
                result += `[${entityText}](${url})`;
                break;
            case "textEntityTypeMention":
            case "textEntityTypeHashtag":
            case "textEntityTypeCashtag":
            case "textEntityTypeBotCommand":
            case "textEntityTypeUrl":
            case "textEntityTypeEmailAddress":
            case "textEntityTypePhoneNumber":
            case "textEntityTypeBankCardNumber":
            case "textEntityTypeMentionName":
            case "textEntityTypeCustomEmoji":
            case "textEntityTypeMediaTimestamp":
            default:
                result += entityText;
                break;
        }

        lastIndex = offset + length;
    });

    result += text.slice(lastIndex);
    return result;
};

module.exports = {
    promptUser,
    selectMethod,
    entityToMarkdown,
};

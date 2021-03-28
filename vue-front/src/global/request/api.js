const PREFIX = "/api";
export default {
    talk: PREFIX + "/talk",
    talkInfo: id => `${PREFIX}/talk/${id}`
};
var Mp3 = (function () {
    function Mp3(url, label) {
        this.url = url;
        this.label = label.trim();
    }
    Mp3.prototype.getDuration = function () {
        return null;
    };
    Mp3.prototype.getSize = function () {
        return null;
    };
    Mp3.prototype.getLabel = function () {
        return this.label;
    };
    Mp3.prototype.getUrl = function () {
        return this.url;
    };
    return Mp3;
})();
module.exports = Mp3;

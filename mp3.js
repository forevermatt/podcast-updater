var Mp3 = (function () {
    function Mp3(urlPath, label) {
        this.urlPath = urlPath.trim();
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
    Mp3.prototype.getUrlPath = function () {
        return this.urlPath;
    };
    return Mp3;
})();
module.exports = Mp3;

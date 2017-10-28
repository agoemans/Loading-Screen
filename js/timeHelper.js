var TimeHelper = function(){
    this.dateStart = Date.now();
    this.dateThen = Date.now();

};

TimeHelper.prototype.getElapsedSeconds = function () {
    var now = Date.now();
    var delta = (now - this.dateStart) / 1000;
    return delta;
};

TimeHelper.prototype.getDeltaSeconds = function () {
    var now = Date.now();
    var delta = (now - this.dateThen) / 1000;

    this.dateThen = Date.now();

    return Math.min(delta, 0.33);
};
var TimeHelper = function() {
    this.dateStart = Date.now(), this.dateThen = Date.now();
};

TimeHelper.prototype.getElapsedSeconds = function() {
    return (Date.now() - this.dateStart) / 1e3;
}, TimeHelper.prototype.getDeltaSeconds = function() {
    var delta = (Date.now() - this.dateThen) / 1e3;
    return this.dateThen = Date.now(), Math.min(delta, .33);
};

var Arc = function(ctx, canvas, radius, startAngle, endAngle, dynamicSpeed, color, isFirst) {
    this.context = ctx, this.width = canvas.width, this.height = canvas.height, this.color = color, 
    this.x = canvas.width / 2, this.y = canvas.height / 2, this.radius = radius, this.arcRadian = 180, 
    this.angle = 0, this.startAngle = startAngle, this.endAngle = endAngle, this.minSpeed = 450, 
    this.dynamicSpeed = dynamicSpeed;
};

Arc.prototype.getRadians = function(degrees) {
    return Math.PI / 180 * degrees;
}, Arc.prototype.draw = function(speedPerSecond) {
    this.startAngle = this.getRadians(this.angle), this.endAngle = this.getRadians(this.angle) + this.getRadians(this.arcRadian), 
    this.context.beginPath(), this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, !1), 
    this.context.lineWidth = 10, this.angle += speedPerSecond, this.context.strokeStyle = "#" + this.color, 
    this.context.stroke();
}, Arc.prototype.update = function(elapsedSeconds, deltaSeconds) {
    var speedPerSecond = (this.minSpeed + this.dynamicSpeed * Math.sin(elapsedSeconds)) * deltaSeconds;
    this.draw(speedPerSecond);
};

var app = function() {
    function init() {
        function startApp() {
            canvas = document.getElementById("myApp"), context = canvas.getContext("2d"), dateStart = Date.now(), 
            dateThen = Date.now(), arcOne = new Arc(context, canvas, 78, 0, 0, 360, "df151a", !0), 
            arcTwo = new Arc(context, canvas, 66, 10, 10, 300, "fd8603", !1), arcThree = new Arc(context, canvas, 54, 20, 20, 240, "f4f328", !1), 
            arcFour = new Arc(context, canvas, 42, 30, 30, 180, "00da3c", !1), arcFive = new Arc(context, canvas, 30, 40, 40, 140, "00cbe7", !1), 
            requestAnimationFrame(update);
        }
        function update() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            var deltaSeconds = timeHelper.getDeltaSeconds(), elapsedSeconds = timeHelper.getElapsedSeconds();
            arcOne.update(elapsedSeconds, deltaSeconds), arcTwo.update(elapsedSeconds, deltaSeconds), 
            arcThree.update(elapsedSeconds, deltaSeconds), arcFour.update(elapsedSeconds, deltaSeconds), 
            arcFive.update(elapsedSeconds, deltaSeconds), requestAnimationFrame(update);
        }
        return {
            start: function() {
                startApp();
            }
        };
    }
    var instance, canvas, context, dateStart, dateThen, arcOne, arcTwo, arcThree, arcFour, arcFive, timeHelper = new TimeHelper();
    return {
        getInstance: function() {
            return instance || (instance = init()), instance;
        }
    };
}();
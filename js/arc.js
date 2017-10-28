var Arc = function(ctx, canvas, radius, startAngle, endAngle, dynamicSpeed, color, isFirst){
    this.context = ctx;

    this.width = canvas.width;
    this.height = canvas.height;

    this.color = color;

    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = radius;

    this.arcRadian = 180;
    this.angle = 0;

    this.startAngle = startAngle;
    this.endAngle = endAngle;

    this.minSpeed = 450;
    this.dynamicSpeed = dynamicSpeed;
};

Arc.prototype.getRadians = function (degrees) {
    return (Math.PI / 180) * degrees;
};

Arc.prototype.draw = function(speedPerSecond){
    this.startAngle = this.getRadians(this.angle);
    this.endAngle = this.getRadians(this.angle) + this.getRadians(this.arcRadian);

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);

    this.context.lineWidth = 10;

    this.angle += speedPerSecond;

    this.context.strokeStyle = '#' + this.color;
    this.context.stroke();
};

Arc.prototype.update = function (elapsedSeconds, deltaSeconds){
    // need varying speed (with a min speed) for rotating arc
    // formula = minSpeed + (changing speed * sin (time));
    //sin formula is >>> y = a * sin (bx + c)
    var speed = this.minSpeed + (this.dynamicSpeed  * Math.sin(elapsedSeconds));
    var speedPerSecond = speed * deltaSeconds;

    this.draw(speedPerSecond);
};


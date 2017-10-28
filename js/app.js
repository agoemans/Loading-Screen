var app = (function(){
    var instance;
    var canvas;
    var context;

    var dateStart;
    var dateThen;

    var arcOne;
    var arcTwo;
    var arcThree;
    var arcFour;
    var arcFive;

    var timeHelper = new TimeHelper();

    function init(){
        function startApp(){
            canvas = document.getElementById('myApp');
            context = canvas.getContext('2d');

            dateStart = Date.now();
            dateThen = Date.now();

            arcOne = new Arc(context, canvas, 78, 0, 0, 360, 'df151a', true);
            arcTwo = new Arc(context, canvas, 66, 10, 10, 300, 'fd8603', false);
            arcThree = new Arc(context, canvas, 54, 20, 20, 240, 'f4f328', false);
            arcFour = new Arc(context, canvas, 42, 30, 30, 180, '00da3c', false);
            arcFive = new Arc(context, canvas, 30, 40, 40, 140, '00cbe7', false);

            requestAnimationFrame(update);
        }

        function update(){
            context.clearRect(0, 0, canvas.width, canvas.height);

            var deltaSeconds = timeHelper.getDeltaSeconds();
            var elapsedSeconds = timeHelper.getElapsedSeconds();

            arcOne.update(elapsedSeconds, deltaSeconds);
            arcTwo.update(elapsedSeconds, deltaSeconds);
            arcThree.update(elapsedSeconds, deltaSeconds);
            arcFour.update(elapsedSeconds, deltaSeconds);
            arcFive.update(elapsedSeconds, deltaSeconds);

            requestAnimationFrame(update);
        }
        return {
            start: function(){
                startApp();
            }
        }
    }
    return {
        getInstance: function(){
            if(!instance){
                instance = init()
            }
            return instance;
        }
    }
})();
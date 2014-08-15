
 var stage1 = new swiffy.Stage(document.getElementById('start-graphic'),swiffyobjectStart);
stage1.setBackground(null);
stage1.start();
$(document).ready(function() {
   
    
    var stage2 = new swiffy.Stage(document.getElementById('character-swim'),swiffyobjectCharacter);
    stage2.setBackground(null);
    stage2.start();

    $('#start').click(function() {
        TweenMax.to('#ingame',1,{opacity:1, onComplete: function() {
        $('#start-screen').hide();
        }});
        
        
        var height = $('#game-container').height();
        $('#life-bar').css({ fontSize : height - 100 });
        var postion = $('#game-contents').height() - height;
        var maxPostion = postion;
        var interval = null;
        
        TweenMax.to('#character',4,{ top : '80%', delay : 8 });
        TweenMax.to('#game-container', 10, { 
            scrollTop : postion, 
            onComplete : function(){
            var lastPositon = postion;
                
            var positonInterval = setInterval(function() {
                var diff =  postion - lastPositon;
                if(diff === 0) {
                    return;
                } else if (diff > 0) {
                    //going down
                    $('#character-swim').hide();
                    $('#character-body').show();
                    lastPositon += Math.round( diff / 2);
                } else {
                    //going up
                    $('#character-body').hide();
                    $('#character-swim').show();
                    lastPositon += Math.round( diff / 2 );
                }
                if (lastPositon <= 0) {
                    clearGame(true);
                } else {
                    TweenMax.to('#game-container',0.01, {scrollTop :lastPositon });
                }
            },10);
            var clearGame = function(complete) {
                clearInterval(listInterval);
                clearInterval(positonInterval);
                clearInterval(interval);
                if (complete) {
                    TweenMax.to('#character',2,{ top : '-200px', delay : 8 });
                    alert('Yay!');
                } else {
                    lastPositon = postion = 0;
                    TweenMax.to('#game-container',0.01, {scrollTop :0 });
                    alert("You're Dead. Restating");
                }
            };
            var life = 20;
            var listInterval = setInterval(function() {
                life--;
                if (life < 5) {
                    $('#life-bar').text(life);
                }
                if (life === 0) {
                    clearGame();
                }
            },1000);

            $(document).click(function() {
                postion -= 100;
            });

            interval = setInterval(function() {
                if (postion >= maxPostion) { return; }
                postion += 10;
            },100);
        }});

    });
});

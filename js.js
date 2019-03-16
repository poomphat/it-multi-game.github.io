            var canvas, context;
            var scene, player1, player2;
            const BLOCK_WIDTH = BLOCK_HEIGHT = 10;
            var stopDraw;
            gamestart();

            function gamestart(){
                //the cavas is the drawing space
                canvas = document.getElementById("canvas");
                context = canvas.getContext("2d");
                // กำหนดขนาดของกำเเพง
                canvas.style.width ='70%';
                canvas.width = window.innerWidth;
                canvas.style.height ='70%';
                canvas.height = window.innerHeight;
                // สีของเส้น
                context.fillStyle = "black";

                scene = [];

                player1 = new Player1(100,350,'W','S','A','D');
                player1.check();
                player2 = new Player2(1500,350,'I','K','J','L');
                player2.check();

                //ตำเเหน่งของกำเเพง
                var minX = 10;
                var maxX = canvas.width - canvas.width%10-20;
                var minY = 10;
                var maxY = canvas.height - canvas.height%10-20;
                for(var x=minX; x<=maxX; x+=1){
                    wallcash(x,minY);
                    wallcash(x,maxY);
                    }
                for(var y=minY; y<=maxY; y+=1){
                    wallcash(minX,y);
                    wallcash(maxX,y);
                    }
                window.addEventListener('keydown',keyPress,false);
                    stopDraw = setInterval(draw,40);
    
                
            }
            
            // เช็อการอยู้รอกเเละวาดเส้น
            function draw(){
                player1.check()
                if(!player1.alive) {
                    gamestart()
                    clearInterval(stopDraw);
                    return;
                }
                player2.check()
                if(!player2.alive) {
                    gamestart()
                    clearInterval(stopDraw);
                    return;
                }
                for(var i=0; i<scene.length; i++){
                    var block = scene[i];
                    context.fillRect(block.x, block.y, BLOCK_WIDTH, BLOCK_HEIGHT);
                }
            }
            
            function keyPress(e) {
                // ควมคุมเป็น char
                e.preventDefault();
                var key = String.fromCharCode(e.which);
                player1.keyPress(key);
                player2.keyPress(key);
            }
            // ตำเเหน่งของ player เเละการควบคุม
            function Player1(startX,startY,upKey, downKey,leftKey,rightKey){
                this.alive = true;
                this.x = startX;
                this.y = startY;
                this.up = upKey;
                this.down = downKey;
                this.left = leftKey;
                this.right = rightKey;
                this.direction = this.right;

                this.keyPress = function(key){
                    if(key == this.up) {
                        if(this.direction != this.down)
                            this.direction = this.up;
                    }
                    else if(key == this.down) {
                        if(this.direction != this.up)
                            this.direction = this.down;
                    }
                    else if(key == this.left){
                        if(this.direction != this.right)
                            this.direction = this.left;
                    }
                    else if(key == this.right) {
                    if(this.direction != this.left)
                            this.direction = this.right;
                    }
                }

                this.check = function(){
                    if(this.direction == this.up) 
                        this.y -= BLOCK_HEIGHT;
                    else if(this.direction == this.down) 
                        this.y += BLOCK_HEIGHT;
                    else if(this.direction == this.left) 
                        this.x -= BLOCK_WIDTH;
                    else if(this.direction == this.right) 
                        this.x += BLOCK_WIDTH;
                    for(var i=0; i<scene.length; i++){
                        var block = scene[i];
                        if(block.x==this.x && block.y==this.y)
                            this.alive = false;
                    }
                    wallcash(this.x,this.y);
                }
            }
            function Player2(startX,startY,upKey, downKey,leftKey,rightKey){
                this.alive = true;
                this.x = startX;
                this.y = startY;
                this.up = upKey;
                this.down = downKey;
                this.left = leftKey;
                this.right = rightKey;
                this.direction = this.left;

                this.keyPress = function(key){
                    if(key == this.up) {
                        if(this.direction != this.down)
                            this.direction = this.up;
                    }
                    else if(key == this.down) {
                        if(this.direction != this.up)
                            this.direction = this.down;
                    }
                    else if(key == this.left){
                        if(this.direction != this.right)
                            this.direction = this.left;
                    }
                    else if(key == this.right) {
                    if(this.direction != this.left)
                            this.direction = this.right;
                    }
                }

                this.check = function(){
                    if(this.direction == this.up) 
                        this.y -= BLOCK_HEIGHT;
                    else if(this.direction == this.down) 
                        this.y += BLOCK_HEIGHT;
                    else if(this.direction == this.left) 
                        this.x -= BLOCK_WIDTH;
                    else if(this.direction == this.right) 
                        this.x += BLOCK_WIDTH;
                    for(var i=0; i<scene.length; i++){
                        var block = scene[i];
                        if(block.x==this.x && block.y==this.y)
                            this.alive = false;
                    }
                    wallcash(this.x,this.y);
                    
                }
               
            } 
            function wallcash(x,y){
                scene.push({x:x,y:y})
            }

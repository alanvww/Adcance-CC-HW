import * as PIXI from 'pixi.js'
import { Container, Sprite, Texture } from 'pixi.js';

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader
        .add('base', './assets/base.png')
        .add('socks', './assets/socks.png')
        .add('legWarmers', './assets/legWarmers.png')
        .add('converse', './assets/converse.png')
        .add('dunks', './assets/dunks.png')
        .add('boots', './assets/boots.png')
        .add('skirt', './assets/skirt.png')
        .add('blackPants', './assets/blackPants.png')
        .add('brownPants', './assets/brownPants.png')
        .add('whiteTN', './assets/whiteTN.png')
        .add('hoodie', './assets/hoodie.png')
        .add('sweater', './assets/sweater.png')
        .add('mask', './assets/mask.png')
        .add('hairDown', './assets/hairDown.png')
        .add('bun', './assets/bun.png')
        .add('braid', './assets/braid.png')
        .add('accessoriesIcon', './assets/accessoriesIcon.png')
        .add('bottomIcon', './assets/bottomIcon.png')
        .add('topIcon', './assets/topIcon.png')
        .add('hairIcon', './assets/hairIcon.png')
        .add('shoeIcon', './assets/shoeIcon.png')
        .load(() => {
          resolve();
        });
    });
};

const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true, backgroundColor: 0xbac9e0});


    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);

    //create container for character
    let charContainer = new Container();

   


    //draw character rect
    let charRect = new PIXI.Graphics();
    charRect.lineStyle(2,0x7177a8);
    charRect.beginFill(0xfafafa);
    charRect.drawRoundedRect(-200,-325,400,650,20);
    charContainer.addChild(charRect);



 
    //load assets as sprites
    let base = new PIXI.Sprite(app.loader.resources['base'].texture);
    let socks = new PIXI.Sprite(app.loader.resources['socks'].texture);
    let legWarmers = new PIXI.Sprite(app.loader.resources['legWarmers'].texture);
    let converse = new PIXI.Sprite(app.loader.resources['converse'].texture);
    let dunks = new PIXI.Sprite(app.loader.resources['dunks'].texture);
    let boots = new PIXI.Sprite(app.loader.resources['boots'].texture);
    let skirt = new PIXI.Sprite(app.loader.resources['skirt'].texture);
    let blackPants = new PIXI.Sprite(app.loader.resources['blackPants'].texture);
    let brownPants = new PIXI.Sprite(app.loader.resources['brownPants'].texture);
    let whiteTN = new PIXI.Sprite(app.loader.resources['whiteTN'].texture);
    let hoodie = new PIXI.Sprite(app.loader.resources['hoodie'].texture);
    let sweater = new PIXI.Sprite(app.loader.resources['sweater'].texture);
    let mask = new PIXI.Sprite(app.loader.resources['mask'].texture);
    let hairDown = new PIXI.Sprite(app.loader.resources['hairDown'].texture);
    let bun = new PIXI.Sprite(app.loader.resources['bun'].texture);
    let braid = new PIXI.Sprite(app.loader.resources['braid'].texture);
    let hairIcon = new PIXI.Sprite(app.loader.resources['hairIcon'].texture);
    let shoeIcon = new PIXI.Sprite(app.loader.resources['shoeIcon'].texture);
    let topIcon = new PIXI.Sprite(app.loader.resources['topIcon'].texture);
    let bottomIcon = new PIXI.Sprite(app.loader.resources['bottomIcon'].texture);
    let accessoriesIcon = new PIXI.Sprite(app.loader.resources['accessoriesIcon'].texture);


    //anchor sprites
    base.anchor.set(0.5,0.5)
    socks.anchor.set(0.5, 0.5)
    legWarmers.anchor.set(0.5, 0.5)
    converse.anchor.set(0.5,0.5)
    dunks.anchor.set(0.5, 0.5)
    boots.anchor.set(0.5, 0.5)
    skirt.anchor.set(0.5,0.5)
    blackPants.anchor.set(0.5, 0.5)
    brownPants.anchor.set(0.5, 0.5)
    whiteTN.anchor.set(0.5,0.5)
    hoodie.anchor.set(0.5, 0.5)
    sweater.anchor.set(0.5, 0.5)
    mask.anchor.set(0.5,0.5)
    hairDown.anchor.set(0.5, 0.5)
    bun.anchor.set(0.5, 0.5)
    braid.anchor.set(0.5,0.5)

 
    //add base
    charContainer.addChild(base);


    charContainer.x = window.innerWidth/2 + 400;
    charContainer.y = window.innerHeight/2;

    // //add clothes
    // itemContainer.x = window.innerWidth/2 + 300;
    // itemContainer.y = window.innerHeight/2;

 

    let butX = 500
    let butY = 100 
    let butWidth = 100
    let butHeight = 100


    //add stripes to bg
    let stripes = new PIXI.Graphics();

    for (let i=0; i<window.innerHeight; i+=20){
        stripes.lineStyle(5, 0xcfcae6);

        stripes.moveTo(0,i);
        stripes.lineTo(window.innerWidth,i);
        stripes.lineTo(0,i)
    }

    app.stage.addChild(stripes);
    app.stage.addChild(charContainer);
    //app.stage.addChild(itemContainer)

    //hair

    let button = new PIXI.Graphics;
    button.beginFill(0xe6e9f0);         
    button.drawRoundedRect(butX+200,butY,butWidth,butHeight,15);   
    
    //u can now hover over button
    button.interactive = true;
    button.buttonMode = true;

    //specify interaction, corresponding reaction
    button.on("pointerdown", onClickHair);     
    let counterHair = 0;

    function onClickHair(){
        button.clear();         
        button.beginFill(0xa9a4eb);         
        button.drawRoundedRect(butX+200,butY,butWidth,butHeight,15);   
        
        if (counterHair == 0){
            charContainer.removeChild(braid);
            charContainer.addChild(hairDown);}
        else if (counterHair == 1){
            charContainer.removeChild(hairDown);
            charContainer.addChild(bun);
        }
        else if (counterHair == 2){
            charContainer.removeChild(bun);
            charContainer.addChild(braid);
        }
        
        counterHair ++;

    }          

    
    //top

    let buttonTop = new PIXI.Graphics;
    buttonTop.beginFill(0xe6e9f0);         
    buttonTop.drawRoundedRect(butX,butY,butWidth,butHeight,15); 
    
    function onClickTop(){
        buttonTop.clear();         
        buttonTop.beginFill(0xa9a4eb);         
        buttonTop.drawRoundedRect(butX,butY,butWidth,butHeight,15);   
        
        if (counterTop == 0){
            charContainer.removeChild(whiteTN);
            charContainer.addChild(sweater);}
        else if (counterTop == 1){
            charContainer.removeChild(sweater);
            charContainer.addChild(hoodie);
        }
        else if (counterTop == 2){
            charContainer.removeChild(hoodie);
            charContainer.addChild(whiteTN);

        }
    
        counterTop ++;

    }    
    
    //u can now hover over button
    buttonTop.interactive = true;
    buttonTop.buttonMode = true;

    //specify interaction, corresponding reaction
    buttonTop.on("pointerdown", onClickTop);     
    let counterTop = 0;


    

    //bottom
    let buttonBottom = new PIXI.Graphics;
    buttonBottom.beginFill(0xe6e9f0);         
    buttonBottom.drawRoundedRect(butX,butY+150,butWidth,butHeight,15);   
    
    buttonBottom.interactive = true;
    buttonBottom.buttonMode = true;

    buttonBottom.on("pointerdown", onClickBottom);     
    let counterBottom = 0;

    function onClickBottom(){
        buttonBottom.clear();         
        buttonBottom.beginFill(0xa9a4eb);         
        buttonBottom.drawRoundedRect(butX,butY+150,butWidth,butHeight,15);   
        
        if (counterBottom == 0){
            charContainer.removeChild(skirt);
            charContainer.addChild(brownPants);}
        else if (counterBottom == 1){
            charContainer.removeChild(brownPants);
            charContainer.addChild(blackPants);
        }
        else if (counterBottom == 2){
            charContainer.removeChild(blackPants);
            charContainer.addChild(skirt);

        }
        
        counterBottom ++;
        

    }          

    //shoes
    let buttonShoes = new PIXI.Graphics;
    buttonShoes.beginFill(0xe6e9f0);         
    buttonShoes.drawRoundedRect(butX,butY+300,butWidth,butHeight,15);   
    
    buttonShoes.interactive = true;
    buttonShoes.buttonMode = true;

    buttonShoes.on("pointerdown", onClickShoes);     
    let counterShoes = 0;

    function onClickShoes(){
        buttonShoes.clear();         
        buttonShoes.beginFill(0xa9a4eb);         
        buttonShoes.drawRoundedRect(butX,butY+300,butWidth,butHeight,15);   
        
        if (counterShoes == 0){
            charContainer.removeChild(dunks);
            charContainer.addChild(boots);}
        else if (counterShoes == 1){
            charContainer.removeChild(boots);
            charContainer.addChild(converse);
        }
        else if (counterShoes == 2){
            charContainer.removeChild(converse);
            charContainer.addChild(dunks);

        }
        
        counterShoes ++;
   
    }    

    //accessories
    let buttonAccessories = new PIXI.Graphics;
    buttonAccessories.beginFill(0xe6e9f0);         
    buttonAccessories.drawRoundedRect(butX+200,butY +150,butWidth,butHeight,15);   
    
    buttonAccessories.interactive = true;
    buttonAccessories.buttonMode = true;

    buttonAccessories.on("pointerdown", onClickAccessories);     
    let counterAccessories = 0;


    function onClickAccessories(){
        buttonAccessories.clear();         
        buttonAccessories.beginFill(0xa9a4eb);         
        buttonAccessories.drawRoundedRect(butX+200,butY +150,butWidth,butHeight,15);   
        
        if (counterAccessories == 0){
            charContainer.removeChild(legWarmers);
            charContainer.addChild(mask);}
        else if (counterAccessories == 1){
            charContainer.removeChild(mask);
            charContainer.addChild(socks);
        }
        else if (counterAccessories == 2){
            charContainer.removeChild(socks);
            charContainer.addChild(legWarmers);

        }
        
        counterAccessories ++;
    }          

    app.stage.addChild(buttonTop);
    app.stage.addChild(buttonBottom);
    app.stage.addChild(button);
    app.stage.addChild(buttonShoes);
    app.stage.addChild(buttonAccessories);


    accessoriesIcon.x = butX+200;
    accessoriesIcon.y = butY+150;

    bottomIcon.x = butX;
    bottomIcon.y = butY+150;

    hairIcon.x = butX+200;
    hairIcon.y = butY;

    shoeIcon.x = butX;
    shoeIcon.y = butY+300;

    topIcon.x = butX;
    topIcon.y = butY;

    app.stage.addChild(accessoriesIcon);
    app.stage.addChild(bottomIcon);
    app.stage.addChild(hairIcon);
    app.stage.addChild(shoeIcon);
    app.stage.addChild(topIcon);

    //box
    let box = new PIXI.Graphics;
    box.beginFill(0xe6e9f0);         
    box.drawRoundedRect(0,0,400,window.innerHeight,15);   
    app.stage.addChild(box);
   

    app.stage.interactive = true
    
    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.hitArea = new PIXI.Polygon([
            0,0,
            window.innerWidth, 0,
            window.innerWidth, window.innerHeight,
            0, window.innerHeight
        ]);
    });


    document.body.appendChild(app.view);

    app.ticker.add(update);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(delta: number) {

    }

main();


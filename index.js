const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-946011727382-931097051394-bxiy6HaBvIQnuzgZhPmxTip4',
  name: 'bot'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel('general', 'A Bot rendszer betöltve és használatra készen áll!', params);
});

//ERROR Handler
bot.on('error', (err) => console.log(err));

//Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message'){
        return;
    }
    console.log(data);
    handleMessage(data.text, data.username, data.user, data.cgannel);
});

//respond to data
function handleMessage(message, username, usersender, channelidforbot){
    //respond to shopping list command
    if(message.includes(' bevásárlólista')){
        let darabok = message.split(" ");
        //respond to add command
        if(darabok[2] === 'hozzáad'){
            //chenck if there  are items to add
            if(darabok.length > 3){
                let kuldeni = [];
                for (let i = 3; i < darabok.length; i++) {
                    kuldeni.push(darabok[i]);
                }
                AddToShoppingList(kuldeni);
            }
            else{
                const params = {
                    icon_emoji: ':face_with_rolling_eyes:'
                };
                bot.postMessageToChannel('general', `Nem adtál meg elemet a hozzáadáshoz!`, params);
            }
        }
        //respond to chenck command
        else if(darabok[2] === 'megnéz'){
            ShoppingListView();
        }
        //respond to reove command
        else if(darabok[2] === 'töröl'){
            //check if there are items to delete
            if(darabok.length > 3){
                //check if shopping list   is empty ot not
                if(bevasarlolista.length !== 0){
                    let kuldeni = [];
                    for (let i = 3; i < darabok.length; i++) {
                        kuldeni.push(darabok[i]);
                    }
                    DeleteFromShoppingList(kuldeni);
                }
                else{
                    const params = {
                        icon_emoji: ':face_with_rolling_eyes:'
                    };
                    bot.postMessageToChannel('general', `A bevásárlólistának nincsenek elemei!`, params);
                }
            }
            else{
                const params = {
                    icon_emoji: ':face_with_rolling_eyes:'
                };
                bot.postMessageToChannel('general', `Nem adtál meg elemet a törléshez!`, params);
            }
        }
        else{
            const params = {
                icon_emoji: ':face_with_rolling_eyes:'
            };
            bot.postMessageToChannel('general', `A bevásárlólistának nincs ilyen parancsa: ${darabok[2]}`, params);
        }
    }
    //respandto help  command
    else if(message.includes(' segítség')){
        Help();
    }
    else if(message.includes(' teszt 2002')){

    }
    else if((message.includes(' idő') || message.includes(' dátum')) && username !== 'bot'){
        let date = new Date().toString();
        let darab = date.split(" ");
        const params = {
            icon_emoji: ':timer_clock:'
        }
        bot.postMessageToChannel('general', `A dátum: ${darab[3]}-${darab[1]}-${darab[2]} Az idő: ${darab[4]}`, params);
    }
    else if(message.includes(' szia') || message.includes(' helló')){
        const params = {
            icon_emoji: ':wave:'
        };
        bot.getUserById(usersender).then((data) => {
            let name = data.real_name;
            bot.postMessageToChannel('general', `Szia ${name} a botnak a következő parancsai vannak *@Bot segítség*`, params);
        });
    }
    else if(message.includes(' emlékeztető')){
        let darabok = message.split(" ");
        //respond to add command
        if(darabok[2] === 'hozzáad'){
            //chenck if there  are items to add
            if(darabok.length > 3){
                let kuldeni = [];
                for (let i = 3; i < darabok.length; i++) {
                    kuldeni.push(darabok[i]);
                }
                AddToReminder(kuldeni);
            }
            else{
                const params = {
                    icon_emoji: ':face_with_rolling_eyes:'
                };
                bot.postMessageToChannel('general', `Nem adtál meg elemet a hozzáadáshoz!`, params);
            }
        }
        //respond to chenck command
        else if(darabok[2] === 'megnéz'){
            ViewReminder();
        }
        //respond to reove command
        else if(darabok[2] === 'töröl'){
            //check if there are items to delete
            if(darabok.length > 3){
                //check if shopping list   is empty ot not
                if(bevasarlolista.length !== 0){
                    let kuldeni = [];
                    for (let i = 3; i < darabok.length; i++) {
                        kuldeni.push(darabok[i]);
                    }
                    RemoveFromReminder(kuldeni);
                }
                else{
                    const params = {
                        icon_emoji: ':face_with_rolling_eyes:'
                    };
                    bot.postMessageToChannel('general', `Az emlékeztetőnek nincsenek elemei!`, params);
                }
            }
            else{
                const params = {
                    icon_emoji: ':face_with_rolling_eyes:'
                };
                bot.postMessageToChannel('general', `Nem adtál meg elemet a törléshez!`, params);
            }
        }
        else{
            const params = {
                icon_emoji: ':face_with_rolling_eyes:'
            };
            bot.postMessageToChannel('general', `A emlékeztetőnek nincs ilyen parancsa: ${darabok[2]}`, params);
        }
    }
    else if(username !== 'bot'){
        bot.getUserId('bot').then(res => {
            let user = res;
            if(message.startsWith("<@" + user + ">")){
                const params = {
                    icon_emoji: ':interrobang:'
                };
                let darabok = message.split(" ");
                bot.postMessageToChannel('general', `Ennek a Botnak nincs ilyen parancsa: ${darabok[1]}`, params);
            }
        });
        
    }
}

let bevasarlolista = [];

//add to shopping list
function AddToShoppingList(targyak = []){
    for(let i = 0; i < targyak.length; i++){
        bevasarlolista.push(targyak[i]);
    }
    const params = {
        icon_emoji: ':shopping_bags:'
    };
    bot.postMessageToChannel('general', `A bevásárló lista hossza: ${bevasarlolista.length}`, params);
}

//checklist
function ShoppingListView(){
    if(bevasarlolista.length !== 0){
        const params = {
            icon_emoji: ':shopping_trolley:'
        };
    
        let kimeno = 'A bevásárlólistának tartalma: ';
        for (let i = 0; i < bevasarlolista.length; i++) {
            kimeno += bevasarlolista[i] + ', ';
        }
        bot.postMessageToChannel('general', kimeno, params);
    }
    else{
        const params = {
            icon_emoji: ':face_with_rolling_eyes:'
        };
        bot.postMessageToChannel('general', `A bevásárlólistának nincsenek elemei`, params);
    }
}

//remove item  from list
function DeleteFromShoppingList(torolnivalok = []){
    let tempList = []
    let torolt = 0;
    for(let i = 0; i < bevasarlolista.length; i++){
        for(let j = 0; j < torolnivalok.length; j++){
            if(bevasarlolista[i] !== torolnivalok[j]){
                tempList.push(bevasarlolista[i]);
            }
            else{
                torolt++;
            }
        }
    }
    bevasarlolista = [];
    bevasarlolista = tempList;
    const params = {
        icon_emoji: ':negative_squared_cross_mark:'
    };
    bot.postMessageToChannel('general', `A bevásárló listáról törölve lett: ${torolt} elem`, params);
}

//help  function
function Help(){
    const params = {
        icon_emoji: ':information_source:'
    };
    let szokozok = "----";
    bot.postMessageToChannel('general', `A @Bot jelenleg elérhető parancsai: `, params).then((data) => {
        console.log("1");
        bot.postMessageToChannel('general', `${szokozok}Bevásárlólista: `, params).then((data) => {
            console.log("2");
            bot.postMessageToChannel('general', `${szokozok}${szokozok}hozzáad *tárgyak listája szóközzel elválasztva*`, params).then((data) => {
                console.log("3");
                bot.postMessageToChannel('general', `${szokozok}${szokozok}törlés *tárgyak listája szóközzel elválasztva*`, params).then((data) => {
                    console.log("4");
                    bot.postMessageToChannel('general', `${szokozok}${szokozok}megnézés`, params).then((data) => {
                        console.log("5");
                    });
                });
            });
        });
    });
}

let reminder = [];

function AddToReminder(hozzaadni = []){
    for(let i = 0; i < hozzaadni.length; i++){
        reminder.push(hozzaadni[i]);
    }
    const params = {
        icon_emoji: ':package:'
    };
    bot.postMessageToChannel('general', `Az emlékeztetőben lévő jelenlegi elemek: *@Bot emlékeztető megnéz*`, params);
}

function RemoveFromReminder(torolnivalo = []){
    let tempList = []
    let torolt = 0;
    for(let i = 0; i < reminder.length; i++){
        for(let j = 0; j < torolnivalo.length; j++){
            if(reminder[i] !== torolnivalo[j]){
                tempList.push(reminder[i]);
            }
            else{
                torolt++;
            }
        }
    }
    reminder = [];
    reminder = tempList;
    const params = {
        icon_emoji: ':negative_squared_cross_mark:'
    };
    bot.postMessageToChannel('general', `Az emlékeztetőről töröltél: ${torolt} elemet`, params);
}
function ViewReminder(){
    if(reminder.length !== 0){
        const params = {
            icon_emoji: ':shopping_trolley:'
        };
    
        let kimeno = 'Teendők az emlékeztetőben: ';
        for (let i = 0; i < reminder.length; i++) {
            kimeno += reminder[i] + ', ';
        }
        bot.postMessageToChannel('general', kimeno, params);
    }
    else{
        const params = {
            icon_emoji: ':thumbsup:'
        };
        bot.postMessageToChannel('general', `Nincsenek teendők az emlékeztetőben`, params);
    }
}
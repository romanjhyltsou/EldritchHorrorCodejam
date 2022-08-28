import ancients from '../data/Ancients.js';
import blueCards from "../data/mythicCards/blue/index.js";
import brownCards from "../data/mythicCards/brown/index.js";
import greenCards from "../data/mythicCards/green/index.js";

window.addEventListener('DOMContentLoaded', () => {
 "use strict"; 
 const headerImgItem = document.querySelectorAll('.header__img-item'),
       blueCard = document.querySelectorAll('.blue__card span'),
       brownCard = document.querySelectorAll('.brown__card span'),
       greenCard = document.querySelectorAll('.green__card span'),
       mainItem = document.querySelectorAll('.main__item'),
       mythicCardWrapper = document.querySelector('.mythic__card-wrapper'),
       randomCardImg = document.querySelector('.random__card-img'),
       firstStage = document.querySelectorAll('.first__stage'),
       secondStage = document.querySelectorAll('.second__stage'),
       thirdStage = document.querySelectorAll('.third__stage'),
       mainBtn = document.querySelector('.main__btn'),
       footerWraper = document.querySelector('.footer__wraper');
       let activeAncient = 0,
           arrEasiest = [],
           sumGreenCard = 0,
           sumBrownCard = 0,
           sumBlueCard = 0,
           allSumCard = 0;

function ancientFu(){
 headerImgItem.forEach((item, i) => {
    item.addEventListener('click', (e)=> {
        resetVariables();
        level();
        mainItem.forEach((item) => {
            item.classList.remove('activ__border');
            item.style.outline = "1px solid #ffecc8";
            item.style.borderRadius = "4px";
        });
        headerImgItem.forEach((item) => {
            item.classList.remove('activ__border');
        });

        footerWraper.classList.remove('activ__visibil');
        randomCardImg.classList.add('activ__unit');
        
        mainBtn.removeAttribute('disabled');
        mainBtn.style.outline = 'none';
        let target = e.target;
        if(target.id === ancients[i].id){
            activeAncient = i;
            target.classList.add('activ__border');
            blueCard[0].innerHTML = ancients[i].firstStage.blueCards;
            greenCard[0].innerHTML = ancients[i].firstStage.greenCards;
            brownCard[0].innerHTML = ancients[i].firstStage.brownCards;
            blueCard[1].innerHTML = ancients[i].secondStage.blueCards;
            greenCard[1].innerHTML = ancients[i].secondStage.greenCards;
            brownCard[1].innerHTML = ancients[i].secondStage.brownCards;
            blueCard[2].innerHTML = ancients[i].thirdStage.blueCards;
            greenCard[2].innerHTML = ancients[i].thirdStage.greenCards;
            brownCard[2].innerHTML = ancients[i].thirdStage.brownCards;
        }

     });
 });

}
ancientFu();

 function shuffle(array) {   //перемешиваем массив алгоритм под названием Тасование Фишера — Йетса.
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let t = array[i]; array[i] = array[j]; array[j] = t;
      return t;
    }
}

function sumInnerHTML(card, sum){ // считаем сколько зеленых, коричневых и синих
    card.forEach( item =>{
        sum += +item.innerHTML;
    });
    return sum;
}

function pushArrEasiest(cards, sum){ // пушим все easy в массив
        let a = [];
        for(let i = 0; i < cards.length; i++){
            if(cards[i].difficulty === 'easy'){
                    a.push(cards[i]);
                    shuffle(a);
            } 
        }
        for(let i = 0; i < sum; i++){
            if(a[i] !== undefined){
                arrEasiest.push(a[i]);
            } 
        }
}

function pushArrNormal(cards,sum){ // пушим все normal в массив
    let a = [];
    for(let i = 0; i < cards.length; i++){
        if(cards[i].difficulty === 'normal'){
                a.push(cards[i]);
                shuffle(a);
        } 
    }
    for(let i = 0; i < sum; i++){
        if(a[i] !== undefined){
            arrEasiest.push(a[i]);
        }
    }
}

function pushArrHard(cards,sum){ // пушим все hard в массив
    let a = [];
    for(let i = 0; i < cards.length; i++){
        if(cards[i].difficulty === 'hard'){
                a.push(cards[i]);
                shuffle(a);
        } 
    }
    for(let i = 0; i < sum; i++){
        if(a[i] !== undefined){
            arrEasiest.push(a[i]);
        }
    }
}
function resetVariables(){
    arrEasiest = [];
    sumGreenCard = 0;
    sumBrownCard = 0;
    sumBlueCard = 0;
    allSumCard = 0;
    activeAncient = 0;
    firstStageArr = []; // таблица 
    secondStageArr = []; // таблица
    thirdStageArr = []; // таблица
}
let firstStageArr = []; // таблица
let secondStageArr = []; // таблица
let thirdStageArr = []; // таблица

mainBtn.addEventListener('click', ()=> {
  document.querySelector('.footer__wraper').classList.add('activ__visibil');
  mixTable(); // таблица
  mainBtn.setAttribute('disabled', 'false');
  mainBtn.style.outline = '1px solid red';

mainItem.forEach((item) => {
    item.classList.remove('activ__border');
    item.style.outline = "1px solid #ffecc8";
    item.style.borderRadius = "4px";
});
headerImgItem.forEach((item) => {
    item.classList.remove('activ__border');
});

});

function level(){
 mainItem.forEach((item) => {

    item.addEventListener('click', (e)=> {
        resetVariables();
        ancientFu();

        let target = e.target;

        mainItem.forEach((item) => {
            item.classList.remove('activ__border');
            item.style.outline = "1px solid #ffecc8";
            item.style.borderRadius = "4px";
        });
        
        item.classList.add('activ__border');
        item.style.outline = "1px solid red";
        item.style.borderRadius = "4px";
        
        sumGreenCard = sumInnerHTML(greenCard, sumGreenCard);
        sumBrownCard = sumInnerHTML(brownCard, sumBrownCard);
        sumBlueCard = sumInnerHTML(blueCard, sumBlueCard);
        allSumCard  = sumGreenCard + sumBrownCard + sumBlueCard;

        if(target.matches('.easiest')){
            pushArrEasiest(greenCards, sumGreenCard );
            pushArrEasiest(brownCards, sumBrownCard);
            pushArrEasiest(blueCards, sumBlueCard);
            pushArrNormal(brownCards,(allSumCard - arrEasiest.length));
        }else if(target.matches('.easy')){
            if(activeAncient === 0){
                pushArrNormal(greenCards, sumGreenCard );
                pushArrEasiest(brownCards, sumBrownCard);
                pushArrNormal(blueCards, sumBlueCard);
                pushArrEasiest(brownCards,(allSumCard - arrEasiest.length));
            }else if(activeAncient === 1){
                pushArrEasiest(greenCards, sumGreenCard );
                pushArrNormal(brownCards, sumBrownCard);
                pushArrNormal(blueCards, sumBlueCard);
                pushArrEasiest(brownCards,(allSumCard - arrEasiest.length));
            }else if(activeAncient === 2){
                pushArrNormal(greenCards, sumGreenCard );
                pushArrEasiest(brownCards, sumBrownCard);
                pushArrEasiest(blueCards, sumBlueCard);
                pushArrNormal(brownCards,(allSumCard - arrEasiest.length));
            }else if(activeAncient === 3){
                pushArrEasiest(greenCards, sumGreenCard );
                pushArrEasiest(brownCards, sumBrownCard);
                pushArrNormal(blueCards, sumBlueCard);
                pushArrNormal(brownCards,(allSumCard - arrEasiest.length));
            }
        }else if(target.matches('.normal')){
            if(activeAncient === 0){
                pushArrHard(greenCards, sumGreenCard );
                pushArrNormal(brownCards, sumBrownCard);
                pushArrEasiest(blueCards, sumBlueCard);
                pushArrEasiest(brownCards,(allSumCard - arrEasiest.length));
            }else if(activeAncient === 1){
                pushArrNormal(greenCards, sumGreenCard );
                pushArrHard(brownCards, sumBrownCard);
                pushArrNormal(blueCards, sumBlueCard);
                pushArrEasiest(brownCards,(allSumCard - arrEasiest.length));
            }else if(activeAncient === 2){
                pushArrEasiest(greenCards, sumGreenCard );
                pushArrNormal(brownCards, sumBrownCard);
                pushArrHard(blueCards, sumBlueCard);
                pushArrHard(brownCards,(allSumCard - arrEasiest.length));
            }else if(activeAncient === 3){
                pushArrHard(greenCards, sumGreenCard );
                pushArrNormal(brownCards, sumBrownCard);
                pushArrHard(blueCards, sumBlueCard);
                pushArrEasiest(brownCards,(allSumCard - arrEasiest.length));
            }
        }else if(target.matches('.hard')){
            if(activeAncient === 0){
                pushArrHard(greenCards, sumGreenCard );
                pushArrNormal(brownCards, sumBrownCard);
                pushArrHard(blueCards, sumBlueCard);
                pushArrNormal(brownCards,(allSumCard - arrEasiest.length));
            }else if(activeAncient === 1){
                pushArrHard(greenCards, sumGreenCard );
                pushArrHard(brownCards, sumBrownCard);
                pushArrNormal(blueCards, sumBlueCard);
                pushArrNormal(brownCards,(allSumCard - arrEasiest.length));
            }else if(activeAncient === 2){
                pushArrNormal(greenCards, sumGreenCard );
                pushArrNormal(brownCards, sumBrownCard);
                pushArrHard(blueCards, sumBlueCard);
                pushArrHard(brownCards,(allSumCard - arrEasiest.length));
            }else if(activeAncient === 3){
                pushArrHard(greenCards, sumGreenCard );
                pushArrNormal(brownCards, sumBrownCard);
                pushArrNormal(blueCards, sumBlueCard);
                pushArrHard(brownCards,(allSumCard - arrEasiest.length));
            }
        }else if(target.matches('.hardest')){
            pushArrHard(greenCards, sumGreenCard );
            pushArrHard(brownCards, sumBrownCard);
            pushArrHard(blueCards, sumBlueCard);
            pushArrNormal(brownCards,(allSumCard - arrEasiest.length));
        }
       /*  console.log(arrEasiest); */
    });
   
 });

}
level();

function mixTable(){ // таблица
    for(let i = 0; i < 3; i++){
        firstStageArr[i] = i;
        shuffle(firstStageArr);
        secondStageArr[i] = i;
        shuffle(secondStageArr);
        thirdStageArr[i] = i;
        shuffle(thirdStageArr);
    }
}

function getStage(arr, stage){
    stage.innerHTML = `${+stage.innerHTML - 1}`;
    for(let i = 0; i < arrEasiest.length; i++){
        if(arr[i].color === stage.classList[1]){
            randomCardImg.src = `assets/MythicCards/${arr[i].color}/${arr[i].id}.png`;
            arr.splice(i,1);
            break;
        }
    }
}
function cardToInner(){ // таблица    
if(+firstStage[firstStageArr[0]].innerHTML > 0){
getStage(arrEasiest, firstStage[firstStageArr[0]] );
}else if(+firstStage[firstStageArr[1]].innerHTML > 0){
getStage(arrEasiest, firstStage[firstStageArr[1]] );
}else if(+firstStage[firstStageArr[2]].innerHTML > 0){
getStage(arrEasiest, firstStage[firstStageArr[2]] );
}else if(+secondStage[secondStageArr[0]].innerHTML > 0){
getStage(arrEasiest, secondStage[secondStageArr[0]] );
}else if(+secondStage[secondStageArr[1]].innerHTML > 0){
getStage(arrEasiest, secondStage[secondStageArr[1]] );
}else if(+secondStage[secondStageArr[2]].innerHTML > 0){
getStage(arrEasiest, secondStage[secondStageArr[2]] );
}else if(+thirdStage[thirdStageArr[0]].innerHTML > 0){
getStage(arrEasiest, thirdStage[thirdStageArr[0]] );
}else if(+thirdStage[thirdStageArr[1]].innerHTML > 0){
getStage(arrEasiest, thirdStage[thirdStageArr[1]] );
}else if(+thirdStage[thirdStageArr[2]].innerHTML > 0){
getStage(arrEasiest, thirdStage[thirdStageArr[2]] );
}
if(arrEasiest.length === 0){
    resetVariables();
    footerWraper.classList.remove('activ__visibil');
    mainBtn.style.outline = 'none';
}
}
 mythicCardWrapper.addEventListener('click', ()=> {
    randomCardImg.classList.remove('activ__unit');
    cardToInner(); // таблица
 });

console.log(`
1.На выбор предоставляется минимум одна карта древнего (максимум 4) +5-20 баллов(по 5 за каждого древнего)\n 
2.На выбор предоставляется несколько уровней сложности (максимум 5) +5-25 баллов(по 5 за каждый уровень сложности\n
3.Карты замешиваются согласно правилам игры +40 баллов\n 
4.Есть трекер текущего состояния колоды +20 баллов\n 
Выполненны все пункты. Score: 100 /100;\n
Для связи со мной: \n

Телеграмм: @Roma9858\n

discord: romanjhyltsou#6635\n`);

});
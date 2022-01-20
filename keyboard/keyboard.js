
import en from './ENlayout.js';
// import language from './index.js';

const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: [],
      MainLayout: [],
      textArea: null,
      shiftKey: null,
      CapsKey: null
    },

    eventHandlers: {
        oninput: null, // (currentValue) =>
        onclose: null
    },

    properties: {
      value: "",
      capsLock: false,
      shift: false,
      shiftDown: false,
      language: false,
    },

    layout: {
        english: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "done", "space", "en/ru"],
        russian: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "enter",
            "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
            "done", "space", "en/ru"],
        englishShift: [ "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "/",
            "done", "space", "en/ru"],
        russianShift: [ "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "enter",
            "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",",
            "done", "space", "en/ru"],
        rowsOrder:  [
            ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Backspace'],
            [ 'done', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight'],
            [ 'CapsLock','KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL',  'Quote', 'Enter'],
            ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash',],
            [ 'en/ru', 'Space', 'ArrowLeft', 'ArrowRight'],
        ]
    },

    init(){

        //Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.elements.textArea =  document.querySelector(".use-keyboard-input");
        console.log(this.elements.textArea)
        this.focus();
        this.selection();

        //this.elements.MainLayout = this.layout.english;
        //Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());  //???

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");  //???

        //Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        this.selectPosition = 0;

        //Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            // console.log('element', element)
            element.addEventListener("focus", (() => {
               // focus();

                this.open(element.value, (currentValue) => {
                    //????
                    element.value = currentValue;

                });
            }))


        })
    },

    focus(){
        this.elements.textArea.focus();
        this.elements.textArea.onblur = () => {
            console.log('focus funcion')
            this.elements.textArea.focus();
        }
    },

    selection() {
        document.body.onclick = () => {
            this.elements.textArea.selectionStart = this.elements.textArea.selectionEnd
                = this.selectPosition + this.elements.textArea.value.length;
        }
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();


        //Create HTML for an icon
          const createIconHTML = (icon_name) => {
              return `<i class="material-icons">${icon_name}</i>`
        };

          this.layout.rowsOrder.forEach(row => {

              const keyboardRow = document.createElement('div');
              keyboardRow.className = 'keyboard__row';

              row.forEach(key => {
                  const keyElement = document.createElement("button");

                  let small;
                  en.forEach(object => {
                      if(key === object.code) {
                          small = object.small;

                      }
                  });
                  keyElement.innerHTML = small;

                  //Add attributes/classes
                  keyElement.setAttribute("type", "button");
                  keyElement.classList.add("keyboard__key");
                 //  console.log("ForEach", keyElement.textContent);
                  //Set Even with animation
                  const audio = document.createElement('audio');
                  switch (keyElement.textContent) {

                      case "backspace":
                          keyElement.classList.add("keyboard__key--wide");
                          keyElement.innerHTML = createIconHTML("backspace");

                          audio.src = './assets/sound/virtual-keyboard_assets_sound_backspace.mp3';

                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1) // Удаляет последний элемент. Как работает? Почему Вызывется только при нажатии если тут foreach или только добав событие
                              this._triggerEvent("oninput")  //???
                          });

                          break;

                      case "caps":
                          this.elements.CapsKey = keyElement;
                          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                          keyElement.innerHTML = createIconHTML("keyboard_capslock");


                          audio.src = './assets/sound/virtual-keyboard_assets_sound_capslock.mp3';

                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this._toggleCapsLock();
                              keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock)
                          });

                          break;

                      case "Shift":
                          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                          this.elements.shiftKey = keyElement;

                          audio.src = './assets/sound/virtual-keyboard_assets_sound_shift.mp3';

                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this._toggleShift();
                              keyElement.classList.toggle("keyboard__key--active", this.properties.shift)
                          });
                          break;
                      case "enter":
                          keyElement.classList.add("keyboard__key--wide");
                          keyElement.innerHTML = createIconHTML("keyboard_return");

                          audio.src = './assets/sound/virtual-keyboard_assets_sound_enter.mp3';

                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this.properties.value += "\n"
                              this._triggerEvent("oninput")
                          });

                          break;

                      case "space":
                          keyElement.classList.add("keyboard__key--extra-wide");
                          keyElement.innerHTML = createIconHTML("space_bar");

                          audio.src = './assets/sound/virtual-keyboard_assets_sound_special.mp3';

                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this.properties.value += " "
                              this._triggerEvent("oninput")   //?????
                          });

                          break;

                      case "done":
                          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                          keyElement.innerHTML = createIconHTML("check_circle");

                          audio.src = './assets/sound/nioce.mp3';


                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this.close();
                              this._triggerEvent("onclose")
                          });

                          break;
                      case "en":
                          keyElement.classList.add("keyboard__key--wide");

                          audio.src = './assets/sound/virtual-keyboard_assets_sound_russian.mp3';

                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this._toggleLang();

                          });
                          break;
                      case "←":
                          audio.src = './assets/sound/Sound_tic-tac.mp3';

                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this.selectPosition -= 1;

                          });
                          break;
                      case "→":
                          audio.src = './assets/sound/Sound_tic-tac.mp3';

                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this.selectPosition += 1;
                              if(this.selectPosition > 0)
                                  this.selectPosition = 0;

                          });
                          break;
                      default:

                          audio.src = './assets/sound/virtual-keyboard_assets_sound_english.mp3';

                          keyElement.addEventListener("click", () => {
                              audio.currentTime = 0;
                              audio.play();
                              this.properties.value += keyElement.textContent;
                              this._triggerEvent("oninput")
                          });

                          break;
                  }

                  keyboardRow.appendChild(keyElement);
              });

              fragment.append(keyboardRow);
          });

        this.elements.textArea.addEventListener('keyup', (e) => {               // событие при отпускании физической клавиши
            console.log(e);
            for (const key of this.elements.keys){
                if (key.innerHTML === e.key){
                    key.classList.remove("button-active");
                }
            }

            if (e.key === "Shift" && this.properties.shiftDown === true){
                console.log("NON SHIFT")
                this.properties.shiftDown = false;
                this._toggleShift();
                this.elements.shiftKey.classList.toggle("keyboard__key--active", this.properties.shift)

            }
        });

        this.elements.textArea.addEventListener('keydown', (e) => {             // собыие при нажатии на физическую клавишу
            console.log(e);

            for (const key of this.elements.keys){
                if (key.innerHTML === e.key){
                    key.classList.add("button-active");
                }

            }
            if (e.key === "Shift" && this.properties.shiftDown === false){
                console.log("SHIFT")
                this._toggleShift();
                this.properties.shiftDown = true;
                this.elements.shiftKey.classList.toggle("keyboard__key--active", this.properties.shift)
            } else

            if (e.key === "CapsLock"){
                console.log(e.getModifierState("CapsLock"))
                this.properties.capsLock = !e.getModifierState("CapsLock");
                console.log( this.properties.capsLock)
                this._toggleCapsLock();
                this.elements.CapsKey.classList.toggle("keyboard__key--active", this.properties.capsLock)
            }
        })


            // this._triggerEvent("oninput")

        return fragment;
    },
    _triggerEvent(handlerName){
     if (typeof this.eventHandlers[handlerName] == "function"){             // проверка на null или функцию

         this.eventHandlers[handlerName](this.properties.value); //???
     }
    },

    _toggleLang(){
        this.properties.language = !this.properties.language;
        let i = 0;
        let lang;
        for (const key of this.elements.keys){
            if (!key.classList.contains("keyboard__key--wide") && !key.classList.contains("keyboard__key--extra-wide")){
                en.forEach(object => {
                    if (!this.properties.shift){
                        if (key.textContent === object.small){
                            console.log(object.ruSmall)
                            lang = object.ruSmall
                        } else if (key.textContent === object.ruSmall){
                            lang = object.small
                        }
                    } else {
                        if (key.textContent === object.shift){
                            lang = object.ruShift
                        } else if (key.textContent === object.ruShift){
                            lang = object.shift
                        }
                    }

                })
                key.innerHTML = lang;
            }
            i++;
        }
    },
    _toggleShift(){          //Переключение режимов Shift

        this.properties.shift = !this.properties.shift;
        let i = 0;
        let shift;

        for (const key of this.elements.keys){
             if (!key.classList.contains("keyboard__key--wide") && !key.classList.contains("keyboard__key--extra-wide"))
             {
                 en.forEach(object => {
                     if (!this.properties.language){        // если язык английский
                         if (key.textContent === object.small){     //сравнить с обьектом из англ словаря строчными
                             shift = object.shift
                         } else if (key.textContent === object.shift){       //если не сходится со строчным значением обьекта то сравниваем его с шифт значением
                             shift = object.small
                         }
                     } else {                                   // иначе ищем в русском словаре
                         if (key.textContent === object.ruSmall){
                             shift = object.ruShift
                         } else if (key.textContent === object.ruShift){
                             shift = object.ruSmall
                         }
                     }
                 });
                 key.innerHTML = shift;
                 this.check(key)
             }

             i++;
        }
         console.log(this.properties.capsLock + "caps")
    },

    check(key){                                                     // Изменение регистра в зависимости от нажатой клавиши
        if (this.properties.capsLock !== this.properties.shift){
            key.textContent = key.textContent.toUpperCase();
        } else {
            key.textContent = key.textContent.toLowerCase();
        }

    },



    _toggleCapsLock(){          //Переключение режимов CapsLock
       this.properties.capsLock = !this.properties.capsLock;
        console.log(this.properties.shift + "shift")
       for (const key of this.elements.keys){
           if (key.childElementCount === 0 && key.textContent !== "Shift" &&  key.textContent !== "en" &&  key.textContent !== "ru"){
               this.check(key);
          }
       }
    },


    open(initialValue, oninput, onclose){                  //фунция которая говорит что делать клавиатуре при нажатии на поле ввода
        this.properties.value = initialValue || "";         //????
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close(){
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden")
    }
};

window.addEventListener("DOMContentLoaded", function(){
    Keyboard.init()
});

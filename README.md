# javascript30-01
> JavaScript Drum Kit
기본파일 설정

📄 app.js
```js
//js
```
📄 index.html
```html
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>javascript30-01</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>



  <script src="app.js"></script>
</body>

</html>
```
📄 sounds/boom.wav
```wav

```
📄 sounds/clap.wav
```wav

```
📄 sounds/hihat.wav
```wav

```
📄 sounds/kick.wav
```wav

```
📄 sounds/openhat.wav
```wav

```
📄 sounds/ride.wav
```wav

```
📄 sounds/snare.wav
```wav

```
📄 sounds/tink.wav
```wav

```
📄 sounds/tom.wav
```wav

```
📄 style.css
```css

```
## 마크업 추가

📄 index.html
```diff
  </head>
  <body>
  
- 
+   <div class="keys">
+     <div data-key="65" class="key">
+       <kbd>A</kbd>
+       <span class="sound">clap</span>
+     </div>
+     <div data-key="83" class="key">
+       <kbd>S</kbd>
+       <span class="sound">hihat</span>
+     </div>
+     <div data-key="68" class="key">
+       <kbd>D</kbd>
+       <span class="sound">kick</span>
+     </div>
+     <div data-key="70" class="key">
+       <kbd>F</kbd>
+       <span class="sound">openhat</span>
+     </div>
+     <div data-key="71" class="key">
+       <kbd>G</kbd>
+       <span class="sound">boom</span>
+     </div>
+     <div data-key="72" class="key">
+       <kbd>H</kbd>
+       <span class="sound">ride</span>
+     </div>
+     <div data-key="74" class="key">
+       <kbd>J</kbd>
+       <span class="sound">snare</span>
+     </div>
+     <div data-key="75" class="key">
+       <kbd>K</kbd>
+       <span class="sound">tom</span>
+     </div>
+     <div data-key="76" class="key">
+       <kbd>L</kbd>
+       <span class="sound">tink</span>
+     </div>
+   </div>
  
    <script src="app.js"></script>
  </body>

```
## style 추가

📄 style.css
```diff
+ html {
+   font-size: 10px;
+   background: url(http://i.imgur.com/b9r5sEL.jpg) bottom center;
+   background-size: cover;
+ }
+ body,html {
+   margin: 0;
+   padding: 0;
+   font-family: sans-serif;
+ }
+ 
+ .keys {
+   display: flex;
+   flex: 1;
+   min-height: 100vh;
+   align-items: center;
+   justify-content: center;
+ }
+ 
+ .key {
+   border: .4rem solid black;
+   border-radius: .5rem;
+   margin: 1rem;
+   font-size: 1.5rem;
+   padding: 1rem .5rem;
+   transition: all .07s ease;
+   width: 10rem;
+   text-align: center;
+   color: white;
+   background: rgba(0,0,0,0.4);
+   text-shadow: 0 0 .5rem black;
+ }
+ 
+ 
+ kbd {
+   display: block;
+   font-size: 4rem;
+ }
+ 
+ .sound {
+   font-size: 1.2rem;
+   text-transform: uppercase;
+   letter-spacing: .1rem;
+   color: #ffc600;
+ }
```
window keydown 이벤트리스터 만들기

📄 app.js
```diff
- //js+ //js
+ 
+ function playSound(){
+ 
+   
+ }
+ 
+ window.addEventListener('keydown', playSound);

```
audio태그로 재생할 사운드 불러오기

📄 index.html
```diff
        <span class="sound">tink</span>
      </div>
    </div>
+   
+   <audio data-key="65" src="sounds/clap.wav"></audio>
+   <audio data-key="83" src="sounds/hihat.wav"></audio>
+   <audio data-key="68" src="sounds/kick.wav"></audio>
+   <audio data-key="70" src="sounds/openhat.wav"></audio>
+   <audio data-key="71" src="sounds/boom.wav"></audio>
+   <audio data-key="72" src="sounds/ride.wav"></audio>
+   <audio data-key="74" src="sounds/snare.wav"></audio>
+   <audio data-key="75" src="sounds/tom.wav"></audio>
+   <audio data-key="76" src="sounds/tink.wav"></audio>
  
    <script src="app.js"></script>
  </body>

```
keydown발생시마다 맞는 오디오dom을 찾아서 play()

📄 app.js
```diff
  //js
  
- function playSound(){
+ function playSound(e) {
+   //e.keyCode는 keydown시에  keyCode값이 들어감
+   console.log(e.keyCode);
+   const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
+   const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
+   if (!audio) return;
  
-   
+   audio.currentTime = 0;
+   audio.play();
  }
  
  window.addEventListener('keydown', playSound);

```
해당 dom에도 시각적인 반응효과  style로 추가

📄 app.js
```diff
  
    audio.currentTime = 0;
    audio.play();
+ 
+   key.classList.add('playing');
  }
  
  window.addEventListener('keydown', playSound);

```
📄 style.css
```diff
    text-transform: uppercase;
    letter-spacing: .1rem;
    color: #ffc600;
- }+ }
+ 
+ .playing {
+   transform: scale(1.1);
+   border-color: #ffc600;
+   box-shadow: 0 0 1rem #ffc600;
+ }

```
반응효과가 끝날때(transitionend) 다시 원래 key모양으로 원복

📄 app.js
```diff
  }
  
  window.addEventListener('keydown', playSound);
+ 
+ const keys = Array.from(document.querySelectorAll('.key'));
+ keys.forEach(key => key.addEventListener('transitionend', removeTransition));
+ 
+ function removeTransition(e) {
+   if (e.propertyName !== 'transform') return;
+   e.target.classList.remove('playing');
+ }
```